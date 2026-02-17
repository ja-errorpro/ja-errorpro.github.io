---
title: 【系統安全】Stack Overflow
date: 2024-07-05
tags:
  - ctf
  - security
keywords:
  - stack overflow
  - buffer overflow
  - pwn
  - binary exploitation
  - ret2libc
  - shellcode
  - 堆疊溢位
  - 緩衝區溢位
  - 漏洞利用
  - 系統安全
  - 二進制弱點
---

# 先備知識

- [【系統安全】組合語言](/posts/2023/asm/)
- [【系統安全】Linux 安全機制](/posts/2023/linux_system_security/)

# Stack Overflow

## Stack

回顧 Memory Layout，Stack 是一種後進先出的資料結構，在記憶體上由高位址往低位址長，上面會保存函式呼叫的資訊、區域變數。

注意 32 位元與 64 位元 的差別：

- x86: 函式參數會放在 return address 上方
- x64: System V AMD64 ABI，前 6 個整數參數依序放在 rdi, rsi, rdx, rcx, r8, r9, 後面如果還有才會放在 stack 上。

## Stack Overflow

當程式輸入資料的大小超過 buffer 的大小，會蓋到該 buffer 之後的記憶體，稱為 Overflow，而 Stack Overflow 表示在 stack 上發生了 Overflow。另外還有 Heap Overflow 表示在 heap 上發生了 Overflow。

## Concept

- 尋找危險函式，可以確認是否有 buffer overflow，常見的危險函式有 gets, scanf, strcpy, strcat, sprintf, vsprintf
- 確定 padding 長度，計算要蓋到的地址離 buffer 的距離
- 如果要蓋 return address，直接看 frame pointer 位置然後找出偏移
- 如果要蓋 stack 上特定資料，需要先觀察 stack 上的資料再找出偏移
- 希望透過覆蓋記憶體位址來控制程式的執行流程

## ROP

- 用於繞過 NX 保護的漏洞利用技術
- 利用程式碼已有的片段，拼出想要的功能，而控制程式執行流程
- 這些片段稱為 gadget，通常以 ret 結尾
- 可使用 ROPgadget, ropper, pwntools 來找 gadget

## ret2win

## ret2shellcode

## ret2syscall

## ret2libc

## GOT
