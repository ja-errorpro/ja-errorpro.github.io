---
title: 【AIS3】IDA 不只有 F5 可以按 IDA 101, Reverse 101
date: 2024-07-30
tags:
  - CTF
---

# IDA 不只有 F5 可以按 IDA 101, Reverse 101

`-undefined 戰隊 林祐聖 ＆ 陳兆閔 ＆ TeamT5杜浦數位安全 RD 林哲宇`

## IDA 介紹

* IDAFree/IDAPro/IDATeam

### 如何使用 IDA(新手)

* 開 binary
* 一路按 ok
* F5 沒反應

### IDA Free@ubuntu Fix
Qt套件更新

```
sudo apt install libxcb-xinerama0
```

### IDA Free - load
- ELF/PE/MachO
- hex view
- disassemble
- decompile


### function

- 藍 library func
- 紫 external symbol
- 白 regular func

搜尋:
- 直接輸入:從頭匹配
- \[ctrl+f5\]:模糊搜尋
- option-> general

### disassembly view (graph)

- 圖形化


若case夠多，會變成 jump table

### disassembly view (text)
優點:
- 簡潔
- 方便看opcode
- 顯示資訊

space 切換


### decompile view

編譯(C->ASM)
反編譯 (ASM->C)
F5 神奇按鈕

有時候會出錯 > 乖乖回去看 disassembly code
逆向時不相信任何輸出


### decompile + disassembly

1. F5 或 Tab 叫出 decompile view
2. 按住pseudocode-A

syncronize with

### 存檔

\[pack database(store)\]：存成db

\[DON'T SAVE the database\]：不會存任何東西

### 視窗不見

1. menu bar
2. 點開view
3. open subviews
4. 你要的view

### goto

\[G\] : 輸入Address

### Mapping 位置

### Dark Theme
Menu bar
Option>Color 
Current theme 選擇 dark

### Mark code

- text view
- c
- 錯誤地方解錯 decompile 會壞掉
- x64指令集密度高，可能會解錯，影響語意
- function prologue / epilogue
    - P / 右鍵 create function

### mark data

- d
    - db/dw/dd/dq
    - 1/2/4/8
- option -> set data type

### mark data - array

- 設定第一個元素的大小
- \* / 右鍵 array
- dup
    - 重複元素摺疊
    - 文字處理建議關掉

### mark data - string literal

- a
- option -> string literal
- golang / rust 要裝套件

### mark enum

- m

### fixup

- u (undefine)

## binary 分析

### IDA workspace

## 標記各種東西

## Lab - fix idb

## ELF 格式

- readelf
- elf header
    - E_IDENT: .ELF
    - E_TYPE: DT_DYN
    - E_ENTRY
    - E_PHOFF: program header
    - E_PHENTSIZE: program header size
    - E_SHOFF: section header
    - E_SHSTRNDX: string table
- program header
    - p_type
    - p_flag: PHDR 權限
    - p_offset: 檔案 offset
    - p_vaddr: 虛擬記憶體 offset
    - p_filesz: 檔案大小
    - p_memsz: 映射記憶體大小
    - 一個 segment 有多個 section
- section header
    - .text RX
    - .data RW
    - .rodata R
    - .bss RW

IDA view -> subview

### import / export

- PE: import / export table
- ELF: .dynsym

#### import

- 使用到的外部 function
- 特殊的
    - mprotect
    - mmap

#### export

- 給別人用的 function
- library

## x64 calling convention

- 傳參慣例
- x86 Parameters 往 Stack 堆
- x64 依賴 Register
    - syscall
        - syscall no: rax
        - parameter: rdi, rsi, rdx, rcx
    - c abi

## local debugger

- idafree: local debugger
    - windows: debug PE
    - linux: debug wlf
- idapro: remote debugger
- process -> options
    - cwd
    - argument
    - envp
- F9 執行
- **不要執行來路不明的程式**

## Binary patching

- 通過 Patch 去修改 opcode 去改變 executable 的行為
- Edit > Patch Program
- 更改完後需要 Apply (建議備份原檔)

## structure recovery
### type

- [u]int[8/16/32/64]_t

### alignment

- 開始位置必須是 x 的倍數
- padding
    - |c|　　　　　|
    - |　uint64_t　|
    - |　int　|　 　|

### pointer

- 指標的⼤⼩無論型別都⼀樣⼤

### structure

- 區域變數順序可能會變
- structure
    - 連續記憶體空間
- ida auto create structure
    - 右鍵 -> create new structure type
    - 不保證正確
    - subview -> local types
        - 存放已經定義的structure
        - add type
        - d
- 人工閱讀重點
    - 資料位置、資料大小、存取方式
    
### Poke A Hole Tool

- pahole
- 需有詳細的debug description
- 在編譯時加上 -g 參數

## inheritance

- 沒有 virtual
    - 和一般的 call function 一樣
- 有
    - 透過 **VTable** 來讓繼承物件的method可以被正確呼叫

### vtable

取出 function 再呼叫
影響：
- 不是直接跳轉位置，而是從結構體取出才跳轉
- 動態分析麻煩 (不好抓Control-Flow)
- 靜態分析麻煩
    - 繼承關係複雜時，難還原結構
    - Method 數量多時，難還原結構




