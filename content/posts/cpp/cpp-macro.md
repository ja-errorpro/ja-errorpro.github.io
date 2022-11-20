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

有時候如果定義的巨集是變數型態也可以用`typedef`
```cpp
typedef long long ll
//之後宣告long long就打ll就好
```