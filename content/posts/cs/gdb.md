---
title: gdb 除錯工具學習
date: 2022-09-26
tags:
  - ctf
---

# What is GDB?

gdb全名為gnu debugger，是一種動態Debug的工具。

# 使用

我們可以先寫一個簡易的Hello World，並宣告一些變數

```cpp
# include<stdio.h>
int main(){
    int a = 5;
    int b = a * 6;
    int c = b + 4;
    printf("Hello World\n");
    return 0;
}
```

記得在編譯時加上參數 `-g`，否則gdb將提示找不到除錯符，加了只差在程式大小會變大。

```cmd
$ gcc -g hello.c -o hello 
$ gdb ./hello
```

# 指令

| 指令 | 簡寫 | 簡述 |
| ------ | ------ | ------ |
| help | h | 查看指令說明 |
| list | l | 印出程式碼 |
| file |   | 開啟檔案 |
| run | r | 執行程式 |
| kill |   | 停止程式 |
| breakpoint | b, bre, break | 設定斷點 `ex: b 15`表示執行到第15行 | 
| continue | c, cont | 繼續執行 |
| next | n | 步過(遇到呼叫函式會將該函式當成一條指令執行) |
| step | s | 步入(遇到呼叫函式會進入函式一步一步執行) |
| print | p | 印出變數的值 `ex: p num` |
| display |   | 每次步過/入後印出變數值 `ex: display num` |
| info |   | 查看特定資訊 `ex: info break`查看設了哪些斷點，不輸入參數可查詢指令 |
| quit | q | 離開gdb，或按Ctrl+C |
| \<Click> Enter |   | 執行上一條指令 |
