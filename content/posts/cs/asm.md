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

## 指令集

- 複雜指令集：CISC(Complex Instruction Set Computer)
    - x86, x86-64
- 精簡指令集：RISC(Reduced Instruction Set Computer)
    - ARM, MIPS

以下以 x86 與 x86-64 為主

## 語法風格

| AT&T | Intel |
| --- | --- |
| 暫存器前面加 `%` | 暫存器前無號 |
| 目標運算元在後面 | 目標運算元在前面 |
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

## Stack

如同資料結構所學的堆疊，LIFO。

特性是由高位址往低位址長。

### 暫存器

* ESP(32), RSP(64) -> 堆疊頂端

### 操作

- push

這個指令會對堆疊暫存器減掉 4(32) 或 8(64)，然後寫資料到暫存器所指的記憶體

```asm
push eax ; 把 eax 的值 push 進堆疊
```

- pop

這個指令會先把堆疊暫存器所指的記憶體的內容寫到其他位址或暫存器，然後把暫存器加 4 或 8。

```asm
pop eax ; eax = stack.top(), stack.pop()
```

### 呼叫函式

用 call 讓程式跳到其他位址，先把 return address push 到堆疊，然後做 jmp。

結束時用 ret 根據 return address 跳回去。即先 pop return address 後做 jmp。

虛擬指令 PROC, ENDP 用來定義子函式，並且要給有效的 Identifier。

除了 main 以外都需要 ret 做返回。

```asm
main PROC
...
call Foo
...
main ENDP
...
Foo PROC
...
ret
Foo ENDP
```


## Stack Frame(Activation Record)

- ebp(rbp)

用在堆疊上劃分函式、函式內的區域變數。


## Calling Convention

x86 使用 cdecl(C declaration)。

x86-64 參考 System V AMD64 ABI。

### Caller

* 參數從右到左丟堆疊
* 前六個參數(由左到右)依序放 edi(rdi), esi(rsi), edx(rdx), ecx(rcx), r8, r9，多的丟堆疊
* 浮點數丟 st0-st7
* Return Result 丟 eax(rax)，如果是浮點數丟 st0
* eax, ecx, edx, st0-st7 會被影響，要自己備份(放堆疊)
* 先做完參數再 call，返回後要自己清堆疊

### Callee

* 備份 ebp(rbp)，然後 ebp(rbp) 指到 esp(rbp)

```asm
push ebp
mov ebp, esp
```

* 備份 ebx(rbx), edi(rdi), esi(rsi)
* 返回時
	* 把 eax(rax) 設 return result
	* 恢復 edi(rdi), esi(rsi)
	* 把堆疊空間還給系統 ( mov esp, ebp )
	* 恢復 ebp
	* 做 ret

### 微軟的 x86-64

* 前四個參數(由左到右)依序放 rcx, rdx, r8, r9，多的丟堆疊(由右到左)
* 浮點數丟 XMM0-XMM3
* Return Result 丟 rax，如果是浮點數丟 XMM0

## System Call

* System Call number 放 eax(rax)
* 前六個參數(由左到右)依序放 edi(rdi), esi(rsi), edx(rdx), ecx(r10), r8, r9，多的丟堆疊
	* x64 的 rcx 要換成 r10，因為 rcx 被拿去存 return address
* Return Result 會在 eax(rax)
* x86 用 `int 0x80` 做軟體中斷，x64 用 `syscall`

```asm
section .text
    global _start

_start:
mov edx,len ;length
mov ecx,msg ;message
mov ebx,1   ;stdout
mov eax,4   ;sys_write
int 0x80
mov eax,1   ;exit
int 0x80

section .data

msg     db      'Hello, world!',0xa,0xd,0
len       equ     $ - msg
```

```c
sys_write(STDOUT, "Hello, world!", len);
sys_exit();
```