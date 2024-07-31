---
title: "【AIS3】網頁動態安全檢測與報戶 (RASP)"
date: 2024-07-31
tags:
  - CTF
---

# 網頁動態安全檢測與報戶 (RASP)

`-中華資安國際 資安研究員 zodius`

Lab: [https://github.com/zodius/rasp-lab](https://github.com/zodius/rasp-lab)

## Introduction

### 防護邊界

* firewall
* WAF
* IPS

### 攻擊

* 內部攻擊
* 感染設備
* 雲端服務

### 傳統網路防護模型

* 外部檢查
    * DDOS
    * IPS/IDS
    * WAF
    * firewall
* 應用程式
    * code effort
* 端點防護
    * EDR/MDR
* SOC
* 預防 vs 偵測
    * prevention
        * 偵測特徵
        * 缺點：混淆、新型態攻擊
    * detection
        * 發生傷害
        * 應變

### RASP

* Real-time Application Self-Protection
    * hook 系統底層的 instruction
    * 執行前做檢核
    * 四個特性
        * 避免混淆或序列化
        * 精準阻擋 - 執行前先判斷，避免誤殺
        * 偵測未知漏洞 - 不使用特徵偵測
    * 結合 SIEM

### 回顧計算機組織

Source -> Transform -> Intermediate -> Execution

* Source
    * Source Code
    * Serialized code
* Transform
    * Compile
    * Interpret
        * bytecode
* Intermediate
    * IL(中間碼) <- RASP
* Execution
    * VM
    * JIT
    * Machine code <- RASP

偵測 IL、Machine code

### RASP 機制

執行 execve 前 -> hook 檢查 -> forward/deny

### Hook Instruction

* Hook OS
    * 修改 syscall table
        * 透過 kernel module 改寫 syscall table 指標
        * 指向客製化 function
    * Hook VM syscall
        * hypervisor
            * interface 修改 syscall/instruction 行為 (like s2e)
        * qemu
* Hook Application
    * DBI(Dynamic binary instruction)
        * 申請存取目標程式的記憶體空間
        * 指向 hook 再跳回去
        * 修改 text segment
        * Intel Pin/Frida
        * Fork-base
            * 親代程式可 fork 子程式
        * Shared Library Injection
            * 載入自己的 DLL
    * Language specific hook
        * Csharp .NET Hook
            * 因為沒 doc，沒什麼人做
        * Java javaagent
            * java reflection 特性
        * PHP extension
        * Python audit
        * 程式碼自己提供的 hook api

## RASP in PHP

### PHP Zend Engine

PHP File -> Check, Parse, Compile -> OP Code -> Execute(Zend Engine)

1. Compile
    * 把語法轉成 AST
    * 變數存在 symbol table
    * compile 成 Zend OP Code

### Zend OP Code

結構

```c
struct _zend_op{
    uint8_t opcode;
    const void *handler;
    znode_op op1;
    uint8_t op1_type;
    znode_op op2;
    uint8_t op2_type;
    znode_op result;
    uint8_t result_type;
};
```

PHP 是弱型別，opcode 不知道型別，所以需要 pointer 去指向 handler

```php
<?php
    $a = 10;
    $b = $a + 20;
    echo $b;
?>
```

```shell
php -d opcache.opt_debug_level=0x10000 test.php # Opcache, since PHP 7.1
phpdbg -p* test.php # since PHP 5.6
php -d vid.active=1 text.php # vld, use 3rd party extension
```

[vld Github Repo](https://github.com/derickr/vld)

Internal function call

```php
<?php
    namespace test;
    $a = "Hello world";
    echo strlen($a);
?>
```

[handler example](https://github.com/php/php-src/blob/3c68661ec993f349cb7539330a7191258870ff4b/Zend/zend_vm_def.h#L1679)

* zend_set_user_opcode
* ZEND_USER_OPCODE_DISPATCH: 跳回原本的 handler
* ZEND_USER_OPCODE_CONTINUE: 繼續執行
* ZEND_USER_OPCODE_DISPATCH_TO: goto

### Zend lifecyle

```
MINIT() # module init, hook opcode handler
    RINIT() # user request init
    ...
    RSHUTDOWN()
    RINIT()
    ...
    RSHUTDOWN()
    ...
MSHUTDOWN()
```

### lab

照 readme 設定完環境

php 編譯

```shell
phpize
./configure
make -j4
```

```shell
ls "$PWD/modules/rasp.so"
```

```shell
cd rasp-lab/example
php -d extension="$PWD/modules/rasp.so" -S 127.0.0.1:8080
```

Request `http://127.0.0.1:8080/xss.php?name=...`

```shell
[Wed Jul 31 11:39:11 2024] PHP 8.1.2-1ubuntu2.18 Development Server (http://127.0.0.1:8080) started
[Wed Jul 31 11:39:21 2024] 127.0.0.1:33278 Accepted
[Wed Jul 31 11:39:21 2024] PHP Warning:  Undefined array key "name" in /home/ais3/rasp-lab/example/xss.php on line 3
Payload: Hello, 
[Wed Jul 31 11:39:21 2024] 127.0.0.1:33278 [200]: GET /xss.php
[Wed Jul 31 11:39:21 2024] 127.0.0.1:33278 Closing
[Wed Jul 31 11:39:21 2024] 127.0.0.1:33286 Accepted
[Wed Jul 31 11:39:21 2024] 127.0.0.1:33290 Accepted
Payload: Hello, 123
[Wed Jul 31 11:39:41 2024] 127.0.0.1:33286 [200]: GET /xss.php?name=123
[Wed Jul 31 11:39:41 2024] 127.0.0.1:33286 Closing
[Wed Jul 31 11:39:41 2024] 127.0.0.1:37486 Accepted
Payload: Hello, <script>alert(1)</script>
```

* php 使用 macro 加速
    * zval 取型態

* RT
* CT
* EX
* EG
* CG

### Detect backdoor obfuscation

不管怎麼混淆，都會執行到 eval

案例：Laravel CVE-2021-3129

### Deploy to cloud

* 換掉 base container
* 可帶入 CI/CD
* 偵測 SSRF、攻擊路徑
* 定位漏洞程式碼位置

## Wargame

### Rules

* 不動 php code，修改 rasp code
* docker compose up -d 把環境跑起來
* 五個 case
    * 如果使用者無法存取，會收到客訴信
    * 如果攻擊者攻擊成功，會收到勒索信
    * 如果全部正常，會收到系統通知


## Epilogue

- 補足實體設備的盲區
- 沒有穩定的產品
    - OpenRASP
    - Imperva
- 輔助檢測
- symbolic execution

