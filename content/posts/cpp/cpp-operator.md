---
title: C++筆記-邏輯與運算子
tags:
  - C-Cpp
url: "/posts/cpp/cpp-operator"
---

* [C++筆記-目錄](/posts/cpp-index)

## 邏輯與運算子

學程式語言，必定要會的是邏輯與位元運算，  
以下是之後會超常使用的運算子，請熟記它們的功能。  

| 優先度 | 運算子 | 描述 | 閱讀順序 | 例子 |
|---------|---------|---------|---------|---------|
| 1 | :: | 作用域 | -> | std::cout << endl; |
| 2 | ++/\-- () \[\] . -> | 先回傳再加減1 \\ 函式呼叫 \\ 陣列存取 \\ 物件存取成員 \\ 指標存取成員 | -> | i++/i\--;  int a = f(x); int a[10];  obj.cmp = 0;  ptr->val = 0; |
| 3 | ++/\-- +/- ! ~ (Type) \* & sizeof | 先加/減1再回傳 \\ 正負號 \\ 邏輯NOT \\ 位元取反 \\ 強轉類型 \\ 指標取值 \\ 取址 \\ 佔用位元組大小 | <- | ++i/\--i +/-1 if(!true) a = ~a; int i=int(doublex); int k = \*a; int \*k = &a; cout << sizeof(int);//4 |
| 4 | \* / % | 乘 \\ 除 \\ 取模 | -> | int a = 8\*8; int a = 20/6; int a = 6%4; |
| 5 | +/- | 加 \\ 減 | -> | int a = 6+4; |
| 6 | >>/<< | 位元右 \\ 左移 | -> | int a = 4 >> 3; |
| 7 | </<=/>/>= | 大小等於 | -> | if(a < 0) |
| 8 | ==/!= | 等於/不等於 | -> | while(a!=0) |
| 9 | & | 位元AND運算 | -> | n = x&1 |
| 10 | ^ | 位元XOR運算 | -> | n = x^1 |
| 11 | \| | 位元OR運算 | -> | n = x\|1 |
| 12 | && | 邏輯AND | -> | if(1==3 && 2==2) |
| 13 | \|\| | 邏輯OR | -> | if(1==3 \|\| 2==2) |
| 14 | c?p1:p2 | 三元條件運算(可當成if-else) | <- | int i = a>b?a:b; |
| 15 | =/+=/-=/\*=//=/%=/<<=/>>=/&=/^=/\|= | 賦值 | <- | a+=3;b&=1; |
| 16 | , | 逗號 | -> | int i,j,k; |

這裡我們先特別關注邏輯運算AND、OR、XOR，  
它們的運算方式都要從二進位表示法來看，  
並一個一個位數來做計算。  

使用AND運算結果如下：  

| P | Q | 結果 |
|---------|---------|---------|
| 0 | 0 | 0 |
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 1 | 1 |

舉例：

$9_{10}\ \\&\ 8_{10}= 1001_2\ \\&\ 1000_2=1000_2=8_{10}$


可觀察只有當兩位元都是1時輸出才是1。  

我們可以將它應用在判斷奇偶數： 
```cpp
cout << (x&1?"Yes":"No") ;
```

使用OR運算結果如下：  

| P | Q | 結果 |
|---------|---------|---------|
| 0 | 0 | 0 |
| 1 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 1 | 1 |

舉例：  
$ 10_{10}\ |\ 8_{10} = 1010_2\ |\ 1000_2 = 1010_2 = 10_{10} $$

只要有位元為1，則輸出就是1。  

使用XOR運算結果如下：  

| P | Q | 結果 |
|---------|---------|---------|
| 0 | 0 | 0 |
| 1 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 1 | 0 |

舉例：  

$ 10_{10} \oplus 8_{10} = 1010_2 \oplus 1000_2 = 0010_2 = 2_{10} $

兩個位元只能有一個是1，其他情況都回傳0。  

它的用途更廣，你可以用它將兩個數交換：  
```cpp
a^=b;
b^=a;
a^=b;
```

可以判別一個陣列中哪個數缺少：  

```cpp
int a[]={1,2,3,5,6,7,8,9};
int n=0;
for(int i=0;i<9;i++) n^=i;
for(int i=0;i<9;i++) n^=a[i];
cout << n;
```

可以做大小寫轉換：  

```cpp
char tolower(char c){
	return (c>='A'&&c<='Z')?c^32:c;
}
char toupper(char c){
	return (c>='a'&&c<='z')?c^32:c;
}
```

另外再介紹位元左右移，就是將數寫成二進位後乘十或除十，相當於十進位中乘二或除二。  

```cpp
int a=8;
cout << a << endl;
cout << (a<<1) << endl; // 注意括號，以免跟輸出的<<混淆
cout << (a>>1) << endl;
```