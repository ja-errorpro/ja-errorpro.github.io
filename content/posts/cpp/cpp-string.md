---
title: C++筆記-字元字串
tags:
  - C-Cpp
url: "/posts/cpp/cpp-string"
---

* [C++筆記-目錄](/posts/cpp-index)

## 字元字串

之前提到了字元宣告，但未提及如何利用，現在我們試試這個程式碼：

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	int a='a',b='z';
    for(int i=a;i<=b;i++) cout << i << endl;
}

```

你會發現它輸出了97~122，注意我使用了整數型態，卻用字元初始化，

沒錯，經過型態轉換，'a'會變成97，'z'會變成122，其實這就是ascii碼，因此我們其實可以用字元做計算，
現在可以試試看如果改成'A'~'Z'會對應到哪些ascii碼呢。


字元的宣告要用char，而字串就是字元型態的陣列啦~

，不過這次我們使用在C++比較常用的`string`(字串)來講解，

如果不使用萬能函式庫，必須include \<string>。

string可以這樣宣告

```cpp
string s1; //空字串
string s2("abcde"); //用字面常量宣告初始化
string s3(s2); // 複製s2
string s4 = "edasd"; // 用字面常量宣告初始化
```

string可以用size()或length()直接查看字數(字串長度)，用empty()確認是否是空字串，甚至可以直接用==比較字串內容是否相同，

```cpp
string s1 = "abcde";
string s2;

cout << s1 << endl;
cout << "字串1長度="<<s1.size() << endl;
if(s2.empty()) cout << "字串2是空的" << endl;
else cout << "字串2不是空的" << endl;

s1 = s2;
cout << s2 << endl;
```

因為字串即字元陣列，我們也可以直接使用[ ]存取每個值。


如果要循序走訪，我們可以

```cpp
for(auto i:S){
    cout << i << endl;
}
```

至於原理會在指標中提到。