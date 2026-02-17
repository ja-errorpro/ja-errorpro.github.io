---
title: C++筆記-增加程式可讀性
tags:
  - C-Cpp
keywords:
  - simplify
  - typedef
  - using
  - type alias
  - auto
  - code readability
  - c++
  - cpp
  - 簡化
  - 型別別名
  - 自動推導
  - 程式可讀性
  - 程式設計
  - 語法糖
url: "/posts/cpp/cpp-simplify"
---

- [C++筆記-目錄](/posts/cpp-index)

## 簡化程式可讀性

現在基礎語法已經學得差不多了，現在來談談如何讓別人更容易看懂自己的程式，之後若跟別人合寫也讓人比較容易除錯。

我認為要讓人容易看懂自己的程式碼，有以下幾點需要注意

- 善用註解，說明邏輯
- 變數名稱取名有意義的文字會更好
- 如果有沒有用到的函式、變數就不用多寫
- 可以在每次操作完輸出變數檢查
- 避免跳來跳去的結構，像是goto
- 重複的程式碼可以濃縮成函式或迴圈
