---
title: 【CTF-WriteUp】EasyCTF-adder
date: 2022-03-12
tags:
  - ctf
---

題目：

    給你一個加法程式，找出Flag
	

[adder](/file/adder)

# 概念：
  - 反編譯

# 題解

在linux執行程式，看到要你輸入三個數，先隨意輸入，發現輸出nope。

開啟反編譯工具Ghidra對檔案反編譯，發現在main函式中的flag前綴，

而只要讓該行上面的if條件成立應該就能得到flag，顯然我們只要輸入三個數讓他加起來等於 0x539 即可。

透過簡單的進位換算，得$539_{16}\ =\ 1337_{10}$

開啟程式輸入1337 0 0 就可以拿到flag了~

