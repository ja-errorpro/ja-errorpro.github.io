---
title: 【系統安全】ELF檔案格式
date: 2023-10-25
tags:
  - ctf
  - security
keywords:
  - elf
  - executable and linkable format
  - linux
  - binary analysis
  - reverse engineering
  - 執行檔格式
  - 二進制分析
  - 逆向工程
  - 系統程式設計
  - 連結器
---

# ELF檔案格式

## ELF(Executable and Linkable Format)

- 可執行可連結格式
- 定義：`/usr/include/elf.h`

## 類型

```sh
> gcc a.c -o a.o
> gcc b.c -static -o b.o
> gcc c.c -c -o c.o
> gcc d.c -fPIC d.c -o d.o && gcc d.o -shared -o d.so
#####
> file a.o
a.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), dynamically linked, not stripped

> file b.o
b.o: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, not stripped

> file c.o
c.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped

> file d.o
d.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), dynamically linked, not stripped
```

- 可執行檔(Executable)
  - 程式
- 可重定位檔(Relocatable)
  - 還沒連結的目的檔
- 共用目的檔(Shared Object)
  - 動態連結檔案

## 檔案結構

- File Header
  - 描述基本資訊(檔案類型、機器架構、entry point、段表、節表)
  - Magic Number
    - 0x7F 0x45 0x4C 0x46
    - `\x7FELF`
    - 存在開頭

- .text section

- .data section
  - 已初始化的全域變數
  - 已初始化的靜態變數

- .rodata section
  - 可讀不可寫
  - 常數、字串

- .bss section
  - 未初始化的全域變數
  - 未初始化的靜態變數

### 其他常見section

- .plt section
  - Procedure Linkage Table
  - 用來lazy binding

- .got section
  - Global Offset Table
  - 全域變數引用位址

- .got.plt section
  - Global Offset Table for Procedure Linkage Table
  - 存函式引用位址

- .hash section
  - 符號雜湊表

- .dynsym section
  - 動態連結符號表

- .dynstr section
  - 動態連結字串表

- .strtab section
  - 字串表

- .symtab section
  - 符號表

- .comment section
  - 版本資訊

## Lazy binding

- 延遲綁定
- 第一次呼叫到函式才找位址、重定位
