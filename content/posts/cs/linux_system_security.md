---
title: 【系統安全】Linux 安全機制
date: 2023-10-22
tags:
  - ctf
  - security
keywords:
  - linux security
  - hardening
  - system administration
  - permissions
  - security audit
  - 系統安全
  - 權限管理
  - 安全稽核
  - 防護機制
  - 漏洞防禦
---

## Address space layout randomization(ASLR):

記憶體隨機載入，會把.stack section, .so section, mmap()隨機化，可以防止攻擊者跳到指定記憶體任意利用

繞過：目前沒有很好的繞過方法，只能靠運氣猜記憶體在哪

## Stack Canary:

金絲雀，在以前礦工在挖礦的時候會帶一隻金絲雀下去，如果金絲雀暈倒表示可能挖到有毒氣體了，要趕快跑，在程式裡面也會有這樣的機制，每次執行一個函數會先養一隻金絲雀(一個隨機數)，如果攻擊者傷害到那隻金絲雀(覆寫掉隨機數)就表示受到攻擊，程式在函式離開前檢查到就會直接停止

繞過：只要不碰到金絲雀，或推算出金絲雀長什麼樣子就能繞過

## No-eXecute(NX):

堆疊不可執行，把記憶體的stack標記為不可執行，可以防止攻擊者跳到堆疊任意寫程式

繞過：不要跳到stack，那跳到text就好了

## PIE(Position Independent Executable):

記憶體隨機化，跟ASLR很像，但是是在編譯器上做好，會把.text section, .data section, .bss section隨機化

繞過：讓程式執行的過程中洩露記憶體然後就能推算

程式實際位址 = 程式加載位址 + 偏移位址

## Fortify Source:

在編譯時檢查是否存在buffer overflow，並將危險函式替換成安全函式，例如strcpy()會被替換成strncpy()

## RELRO(RELocation Read-Only):

在Lazy Binding時，會將.got.plt section設為read-only，可以防止攻擊者修改.got.plt section
