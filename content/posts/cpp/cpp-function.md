---
title: C++筆記-函式與遞迴
tags:
  - C-Cpp
keywords:
  - function
  - recursion
  - parameter
  - return value
  - c++
  - cpp
  - procedural programming
  - 函式
  - 遞迴
  - 參數
  - 回傳值
  - 程序化程式設計
  - 函數
url: "/posts/cpp/cpp-function"
---

* [C++筆記-目錄](/posts/cpp-index)

## 函式與遞迴

之前有在講變數作用範圍時偷偷寫了一個函式，現在將會說明如何使用。

到目前，我們都只用到main函式而已，假設我們有需要重複使用的程式碼，可以寫成函式，

只要丟參數進去，就能得到傳回值。

先以最基礎的線性函數(y=ax+b)開始，可以這樣寫

```cpp
int f(int x){
    return a*x+b;
}
```

只要我們帶x進去，函式就會傳回計算後的值，使用函式的過程稱為呼叫

```cpp
cout << f(0) << endl;
int y = f(2);
cout << y << endl;
```

而函式可以選擇接受或不接受參數，也能自訂型態

```cpp
void f(){ // 不接受參數
   可以做任何事;
   return; // 使用void就不會回傳值
}
```

而上一章字串介紹的empty()，其實也是一個布林函式

```cpp
bool empty(){
    if (字串沒東西) return true;
    else return false;
}

```

而遞迴就是函式自己呼叫自己而已，

現在利用遞迴概念，我們試著寫寫看計算階乘(n乘到1)的函式

```cpp
long long f(int n){ //計算 n!
    if(n<0) return -1;
    if(n==0||n==1) return 1; // 0! = 1! = 1 基底狀態
    return n*f(n-1);
}
```

記得在寫遞迴時我們要留意基底狀態，否則程式將會不斷計算下去直到電腦爆掉。

但這個函式最後可能會因為n太大而發生錯誤(堆疊溢位)，但現在我們還不知道如何解決，因為這是算法的部分了。

練習：

* 寫出計算 $C^n_k$ 的函式
* 寫出計算費氏數列第n項的函式
* 寫出計算最大公因數的函式
* 寫出計算最小公倍數的函式