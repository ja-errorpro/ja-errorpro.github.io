---
title: C++筆記-物件(結構體)
tags:
  - C-Cpp
keywords:
  - struct
  - class
  - object
  - member
  - encapsulation
  - c++
  - cpp
  - 結構體
  - 類別
  - 物件
  - 成員
  - 封裝
  - 程式設計
  - 物件導向
url: "/posts/cpp/cpp-struct"
---

- [C++筆記-目錄](/posts/cpp-index)

## 物件(結構體)

### Struct

現在我們要幫銀行寫一個管理系統，管理每個帳戶的資料，資料要含有：名字、身分證號、戶籍地、性別、出生年月日、存額。

我們發現每個資料需要的型態好像不一樣，不適合用陣列，但要存的資料數量卻都一樣，
這時我們可以建立一種物件了，其實就是自訂資料型態！

```cpp
struct Account{ // 建立"帳戶"這個型態
   string name; // 名字
   string ID; // 身分證號
   string Living; // 戶籍地
   bool gender; // 性別(大多數情況就男女之分(? 所以用bool)
   long long birthday; // 出生日期
   long long balance; // 帳戶餘額
}; //要分號
```

這樣，我們就能把它當成一種型態來操作了，假設要開新帳戶：

```cpp
Account a;
```

如果要存取帳戶內容，

```cpp
a.name = "吉娃娃";
a.ID = "A12345678";
...
```

當然如果有很多帳戶，也能直接宣告陣列

```cpp
Account Arr[100];
Arr[0].name = "吉娃娃";
```

我們也可以在結構體裡宣告函式，比如計算一點跟它自己的距離：

```cpp
struct point{
    int x,y;
    int distance(int _x,int _y){ return hypot(x-_x,y-_y); }
};
```

### 建構與解構

Struct有很特別的初始化方式，稱為建構子，我們只要使用跟該struct相同名稱加上括號。

```cpp
struct Account{
    Account(){
	    cout << "開了新的帳戶" << endl;
    }
};
```

當後面宣告了新的Struct，就會觸發建構函式，由此進行初始化各種東西。

初始化Struct的成員變數可以這樣寫

```cpp
#include<bits/stdc++.h>
using namespace std;
struct Account{
    bool gender;
    int balance;
	string name;
	// 根據常數初始化
    Account(): gender(0),balance(0),name("") {}
	// 根據參數初始化
	Account(bool gender_,int bal_,string Na_): gender(gender_),balance(bal_),name(Na_){}
};
int main(){
   Account *A = new Account(1,10000,"Bob");
   Account *B = new Account();
   cout << A->gender << " " << A->balance << " " << A->name << endl;
   // 可以把 p->x 當成 (*p).x
   cout << B->gender << " " << B->balance << " " << B->name << endl;
}
```

而解構函式就是建構函式前面加上 ~，當遇到delete的動作時就會觸發。

```cpp
#include<bits/stdc++.h>
using namespace std;
struct Account{
    bool gender;
    int balance;
	string name;
	// 根據常數初始化
    Account(): gender(0),balance(0),name("") {}
	// 根據參數初始化
	Account(bool gender_,int bal_,string Na_): gender(gender_),balance(bal_),name(Na_){}
	~Account(){
	    cout << "已刪除帳戶" << endl;
	}
};
int main(){
   Account *A = new Account(1,10000,"Bob");
   Account *B = new Account();
   cout << A->gender << " " << A->balance << " " << A->name << endl;
   // 可以把 p->x 當成 (*p).x
   cout << B->gender << " " << B->balance << " " << B->name << endl;
   delete A;
   delete B;
}
```

### 重載運算子

有時候我們要直接輸出輸入自訂型態、做五則運算時，可以透過重載運算子(operator)實現。

比如高中所學的矩陣加法，可以重載加號運算符，即"讓程式知道自訂型態的加法要如何加"

```cpp
#include<bits/stdc++.h>
using namespace std;
struct Matrix{
    int val[2][2]; // 二階矩陣
    /*
	(返回型態) operator 運算子(參數){
	    各種操作;
	}
	*/
	Matrix operator+(const Matrix &B) const{ // 加const就能避免不小心改到資料
	    Matrix ret;
		for(int i=0;i<2;i++){
		    for(int j=0;j<2;j++){
			    ret.val[i][j] = val[i][j] + B.val[i][j];
			}
		}
		return ret;
	} // 重載 加號運算子，讓我可以在後面程式直接將Struct相加
};
int main(){
    Matrix A,B;
	for(int i=0;i<2;i++){
		for(int j=0;j<2;j++){
			cin >> A.val[i][j];
		}
	}
	for(int i=0;i<2;i++){
		for(int j=0;j<2;j++){
			cin >> B.val[i][j];
		}
	}

    Matrix Ret = A+B; // *

	for(int i=0;i<2;i++){
		for(int j=0;j<2;j++){
			cout << Ret.val[i][j];
		}
		cout << endl;
	}
}
```

當然也能實作看看 +=、-、\*、\/ 等各種運算子。

如果要對自訂型態排序(排序在算法筆記)，可以重載 < 運算子。

```cpp
struct dat{
   int a,b;
   bool const operator < (dat &y){
       return b < y.b;
   }
};
```

### 型態參數化

有時候我們需要使用兩個不同型態的變數加法器

```cpp
int a = 1;
double b = 2;
cout << sum(a,b) << endl;// Compile Error
```

但這些型態都是我們已經指定好了，如果兩個交換或要其他型態就又要再寫一個，
於是C++提供了template樣板工具

```cpp
template<class T,class T1,...>
T max(T a,T b){
    return (a>b?a:b);
}
```

這樣一來這個T就會自動換成我們輸入的型態
Template也可以用於自訂類別/型態

```cpp
template<class T>
struct B{
    T a;
	T output(){
	  cout << a << endl;
	  return a;
	}
};

```

而如果要對特定型態指定不同行為，可以這樣寫

```cpp
#include<iostream>
using namespace std;

template<class T>
struct B{
	B(T a){
	  cout << a << " is not a char" << endl;
	}
};

template< > //裡面放空格
struct B<char>{ // 如果宣告類別是char
    B(char k){
	  cout << k << " is a char" << endl;
    }
};

int main(){
    B<int> o1(3);
	B<char> o2('s');
}

```
