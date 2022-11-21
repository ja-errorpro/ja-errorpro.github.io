---
title: C++筆記-(補充)巨集
tags:
  - C-Cpp
url: "/posts/cpp/cpp-macro"
---

* [C++筆記-目錄](/posts/cpp-index)

### 補充 - 巨集：
有時候，我們不想打那麼多字，為節省時間，可以在前面先定義  
一個巨集： `#define`
```cpp
#define int long long 
//讓所有整數都變成長整數，之後用int宣告的話都會宣告成long long
#define pb push_back
//把指令縮短，之後要用就打pb就好
```

我們也可以用巨集來定義函式：
```cpp
#define add(a,b) a+b
//定義一個函式，參數為a,b，回傳a+b
```

有時候如果定義的巨集是變數型態也可以用`typedef`
```cpp
typedef long long ll
//之後宣告long long就打ll就好
```

定義陣列巨集：
```cpp
typedef char str[100];
//之後宣告字串就打str就好

str s; // 宣告 char 陣列
```