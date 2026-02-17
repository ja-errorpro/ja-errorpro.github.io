---
title: C++筆記-指標
tags:
  - C-Cpp
keywords:
  - pointer
  - address
  - reference
  - memory management
  - dereference
  - c++
  - cpp
  - 指標
  - 位址
  - 參考
  - 記憶體管理
  - 取值
  - 程式設計
  - 進階語法
url: "/posts/cpp/cpp-pointer"
---

- [C++筆記-目錄](/posts/cpp-index)

## 指標

### 觀念

現在我們要寫一個交換兩個數的函式，如果這樣寫會發生什麼事呢

```cpp
#include<bits/stdc++.h>
using namespace std;
void swap(int x,int y){
    int t=x;x=y;y=t;
}
int main(){

    int a=1,b=2;
	swap(a,b);
	cout << a << " " << b << endl;
    return 0;
}

```

Output: `1 2`

奇怪，ab沒有被交換，

其實，這程式相當於我們又宣告了xy並交換xy，ab跟xy並沒有關係，這時我們就需要用到指標了。

要取得變數的指標，只需在它前面加上 & 就好，如果我們輸出 &a，會得到它的記憶體位址。

而指標的型態，取決於它從哪種變數取得指標，int指標型別就是 int\*，double指標型別是double\*

宣告指標的方式也很簡單

```cpp
int a;
int *b = &a; // *放在靠int或是靠變數名稱都可以
```

上面程式代表b是a的指標

![anya](/images/cpp/anya_pointer.jpg)

如果不初始化指標，建議將值設為0或者nullptr(空指標)，避免造成不可預期的結果

```cpp
int *a;
*a = nullptr;
```

現在來修改交換函式

```cpp
#include<bits/stdc++.h>
using namespace std;
void swap(int &x,int &y){
    int t=x;x=y;y=t;
}
int main(){

    int a=1,b=2;
	swap(a,b);
	cout << a << " " << b << endl;
    return 0;
}
```

或是這樣寫

```cpp
#include<bits/stdc++.h>
using namespace std;
void swap(int *x,int *y){
    int t=x;x=y;y=t;
}
int main(){

    int a=1,b=2;
	swap(&a,&b);
	cout << a << " " << b << endl;
    return 0;
}
```

### 指標陣列

其實如果我們直接使用陣列變數，會得到該陣列第一個元素的位址，即輸出arr等同輸出&arr[0]，
而陣列索引其實就是位址位移量。

我們有兩種方法計算陣列長度

```cpp
int arr[10]={1};
cout << sizeof(arr)/sizeof(arr[0]) << endl; // 利用記憶體占用大小計算
cout << end(arr) - begin(arr) << endl;//end,begin是C++11提供的函式，可以得到陣列位址
```

而C++11還提供for range，利用指標來循序走訪

```cpp
for(auto i:arr){
    cout << i << " ";
}
```

其實就是把i初始化成陣列首項**位址**，然後一直+1加到最後一項，也可以寫成

```cpp
for(auto i=begin(arr);i!=end(arr);++i){
    cout << *i << " ";
}
```

### 配置記憶體

我們運行程式時，每個變數都會有段生命週期，只存在於程式運行時，放在記憶體的堆疊區，
程式停止就會自動刪除，現在我們試著手動管理記憶體，它將被放在記憶體堆積區，等我們到最後再手動刪除。

配置記憶體可以這樣宣告

```cpp
int *p1 = new int; // 配置int需要的空間
int *p2 = new int(123); // 配置後順便初始化儲存值
*p1 = 321;
cout << p1 << " " << *p1 << endl;
cout << p2 << " " << *p2 << endl;
```

而沒有要用時我們一定要記得刪除，否則記憶體空間會耗盡

```cpp
delete p1;
delete p2;
```

我們還能配置連續空間

```cpp
int *p1 = new int[100];
int *p2 = new int[5]{1,2,3,4,5}; // 初始化
int *p3 = new int[10](); // 全部初始化為0

delete [] p1;
delete [] p2;
delete [] p3;
// 最後一定要全部還給電腦
```

如果要動態配置連續空間，可以當成二維陣列

```cpp
int **arr = new int*[10];
for(int i=0;i<10;i++) arr[i] = new int[12]{1};
```

最後程式宣告的是10\*12的二維陣列，並初始化為1。
也一定要記得在最後用迴圈把陣列delete還給電腦。
