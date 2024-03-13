---
title: C++筆記-IO
tags:
  - C-Cpp
url: "/posts/cpp/cpp-io"
---

* [C++筆記-目錄](/posts/cpp-index)

## 輸入/輸出與流Buffer概念

### 流
在c++我們需要了解一下流跟緩衝區的概念，  
C++這個語言本來是沒有IO功能的，  
基本的輸入輸出定義於`<iostream>`與`<fstream>`這兩個標準模板庫(std)裡，  
它們被分成了三個標準：  
istream/ cin、wcin ： 標準輸入流  
ostream/ cout、wcout ： 標準輸出流  
ostream/ cerr、wcerr ： 標準錯誤輸出流(無緩衝)  
ostream/ clog、wclog ： 標準錯誤輸出流(有緩衝)  

輸入的方式，是使用(>>)從輸入流中擷取資料，而輸出則是用(<<)將資料擷取到輸出流。  
這就是一開始學校在教程式時會說輸入就是 `cin >> x;`，輸出是 `cout << x;`，箭號方向不能交換。  

### 緩衝區  
緩衝區的定義是 `用作中介的內存塊`，簡單來說，  
它就是先把資料全部移到一個地方(內存)，再去慢慢讀取的概念。  
因為程式只能一個字一個字讀，如果直接讀，程式會變超慢，   
也就是當程式頻繁進行 IO 操作，會頻繁把高速的部分打斷，  
造成性能下降。  

緩衝區的功用就在於避開頻繁操作，只要讀取緩衝區的資料就好。  
只有需要時再刷新緩衝區進行 IO 操作，讓程式性能提升。  

以下狀況會刷新緩衝區：  
* 使用cin  
* 釋放cout的資源
* 使用endl、fflush
* 程式正常結束


關於 IO 優化等操作，可查閱[算法筆記](/posts/algo-index)


### 輸入  
在 C++，我們使用 cin(音：西印) 輸入文字，  
方法很簡單，不像 C 語言還要指定型別， `cin >> x;` 就是輸入資料到x。  
當要輸入多筆資料，只要在後面繼續加就好 `cin >> x >> y >> z;`。  

如果不想使用 bits/stdc++.h，需要include \<iostream>

範例程式：
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int x;
    cin >> x;
    int y,z;
    cin >> y >> z;
    return 0;
}
```

而 cin 的好處同時也是壞處就是若輸入空格會自動斷開，  
當想輸入一句話 `This is a Simple Sentence.` 進一個字串，  
如果使用cin，最後字串可能只會存到 `This` 而已。

因此這裡介紹另一種輸入 `getline()`，  
它的功能是直接讀取整行資料，也就是它會連空格一起讀進去，  
直到換行為止。  

```cpp
getline(cin,s,' ') //getline(輸入流, 字串,切割字元(可以不填))
```
注意這個函式只能輸入字串。  

輸入完後通常要將字串切成好幾份資料，  
這時就會用到字串流 `stringstream`  
可以把它想成另一種cin，只是它必須存字串。
如果不使用 bits/stdc++.h，則要 include \<sstream> 才能使用 stringstream  
```cpp
string s;
getline(cin,s);
stringstream ss(s); //初始化s放到字串流裡
```

然後就可以去切割它了，用陣列把這些資料儲存起來。  
這裡使用到 stol() 可以將字串轉成整數。

```cpp
string s,t;
getline(cin,s);
stringstream ss(s);
int a[1000],i=0;
while(getline(ss,t,' ')){
	a[i++] = stol(t);
}
```

### 輸出

在最一開始的[模板](/posts/cpp/cpp-init/#總結程式碼模板)，就可以看到輸出的方法了(cout)，
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int x;
    cin >> x;
	cout << x;
    int y,z;
    cin >> y >> z;
	cout << y << " " << z;
    return 0;
}
```


### 補充

Q:如果使用 cerr 輸出會發生什麼事？

cerr 是用來除錯的，注意有些 Judge 不會把它當成輸出，你可以用來測試你的程式哪裡寫錯