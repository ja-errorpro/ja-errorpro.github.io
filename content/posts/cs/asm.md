---
title: 【系統安全】組合語言
date: 2023-10-22
tags:
  - ctf
---

# 組合語言

## 編譯流程

1. 詞法分析 (Lexical Analysis)

切token -> 詞素 (Lexeme)

2. 語法分析 (Syntax Analysis)

建立語法樹 (Syntax Tree)

3. 語意分析 (Semantic Analysis)

用語法樹跟符號表 (Symbol Table) 來檢查語意

4. 中間碼產生 (Intermediate Code Generation)

5. 最佳化 (Optimization)

6. 目標碼產生 (Code Generation)

## GCC編譯流程

|  | 前置處理 (Preprocessing) | -> 編譯 (Compilation) | -> 組譯 (Assembly) | -> 連結 (Linking) |
| --- | --- | --- | --- | --- |
| 檔案副檔名 | (.i) | (.s) | (.o) | (.out) |
| 指令參數 | -E | -S | -c |  |

### 前置處理 (Preprocessing)

- 遞迴處理所有 `#include`
- 遞迴展開所有 `#define`
- 刪除所有註解
- 處理所有 `#if` `#ifdef` `#ifndef` `#else` `#endif`
- 行號記錄

### 編譯 (Compilation)

組語格式：預設 AT&T 語法，可用 `-masm=intel` 改成 Intel 語法

printf()：只有一個參數會換成 `puts()`

### 組譯 (Assembly)

- 按機器指令表翻譯組語
- 產生目標檔 (.o)，又叫可重定位檔 (Relocatable File)
- 可用 `objdump` 查看內容

### 連結 (Linking)

- 預設動態連結 (Dynamic Linking)，可用 `-static` 改成靜態連結 (Static Linking)
- 把所有不確定的位址都修正

---

待補：ELF檔案格式

---

## 指令集

- 複雜指令集：CISC(Complex Instruction Set Computer)
    - x86, x86-64
- 精簡指令集：RISC(Reduced Instruction Set Computer)
    - ARM, MIPS

## 語法風格

| AT&T | Intel |
| --- | --- |
| 暫存器前面加 `%` | 暫存器前無號 |
| 目的地在前，來源在後 | 來源在前，目的地在後 |
| 16進位數字前面加 `$` | 16進位數字以h結尾 |
| 立即數字前面加 `$` | 立即數字前面無號 |
| 間接定址用 `()` | 間接定址用 `[]` |
| 操作位元語法 `b` `w` `l` | 操作位元語法 `byte` `word` `dword` |

## 暫存器

| 位元 | 可用暫存器 |
| --- | --- |
| 8 | `al` `bl` `cl` `dl` `sil` `dil` `bpl` `spl` ... |
| 16 | `ax` `bx` `cx` `dx` `si` `di` `bp` `sp` ... |
| 32 | `eax` `ebx` `ecx` `edx` `esi` `edi` `ebp` `esp` ... |
| 64 | `rax` `rbx` `rcx` `rdx` `rsi` `rdi` `rbp` `rsp` ... |

## 位元組序

- 小端序 (Little Endian)：低位元在前

0x12345678 -> 0x78563412

- 大端序 (Big Endian)：高位元在前

0x12345678 -> 0x12345678

## 資料存取

- mov

```asm
mov dest, src ; dest = src
```

## 運算

- inc, dec

```asm
inc dest ; dest++
dec dest ; dest--
```

- add, sub

```asm
add dest, src ; dest += src
sub dest, src ; dest -= src
```

## 跳躍

- jmp

```asm
jmp label ; 無條件跳躍
```

以下待補