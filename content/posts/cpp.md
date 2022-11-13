---
title: C++筆記-語法
tags:
  - C-Cpp
url: "/posts/cpp/"
---

*所有內容將以Windows 10+,MinGW-w64 GNU 8.1.0 C++17為主

## 程式碼運作原理

我們知道其實電腦只懂0與1，因此想跟電腦溝通就需要透過一些轉譯，

在人類的世界中所使用的語言叫高階語言，而只由0與1數字組成的語言稱為機器語言，我們很難看懂，

要將高階語言轉成機器語言，就需要藉由編譯器與組譯器的幫忙，編譯器可以幫我們把程式碼轉成所謂的組合語言，此時階段

就會有很多人開始看不懂了，當然如果有學過還是能稍微看懂，但組合語言經過組譯器就會變成0跟1，只有電腦才看得懂。


## 基礎C++模板



附上STL標頭檔：

```cpp
#include<bits/stdc++.h>
```

**注意，比競程時再用他，如果是其他用途(大型專案)的話最好是不要引入這個**

這個標頭檔包含了之後會使用到的任何輸入輸出、資料結構，還藏有很多很方便的函式像是 ``<algorithm>`` 裡的__gcd(計算最大公因數)

不過有些編譯器不包含這個標頭檔，可以自己Google找到對應的解決方法。

有時候看別人的Code還會看到一個標頭檔 ``<bits/extc++.h>`` ，那是內建紅黑樹、雜湊表的標頭檔等更進階的東西，現在暫時不理他。

為了方便，會在下面定義名稱空間 ``using namespace std;`` ，為什麼要加這個？因為我們需要將程式的幾乎所有東西都被定義到一個叫std的名稱空間裡，這樣在做像是輸入輸出(cin、cout)等操作時
不需要在每個句子前面加上 ``std::`` 這種東西，也就是這段程式是起到了類似宣告成了全域變數的作用。
打個比喻，如果說標頭檔是圖書館，那std就是你想找的書。

而每個程式都會需要一個叫做main的主函式，這個函式就是整個程式的起點跟終點：
```cpp
int main(){
	return 0; // 函式結束後，要使用這句話回傳一個值，來告訴程式已經執行完了。
}
```

在這裡就是將main函式宣告成int(整數)，因此結束後也要回傳一個整數才行，而它也可以被宣告為signed(我習慣宣告成這個)，這個等下會提到。

注意到，有些程式句後面加了分號有些卻沒有，這是C++中規定的，以分號作為一段程式的結束(句點)，而當在引入標頭檔以及有大括號時則不需要分號，因為在C++，"引入標頭檔"這個行為就是以換行為這段程式碼的結束。同樣地，只要編譯器讀完大括號，就算是將這裡面的東西執行完了。

### 總結程式碼(模板)：
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
	cout << "Hello World"; // 你會看到電腦跟你說Hello World
	return 0;
}
```

### 註解

在上面兩個程式碼中，會看到裡面寫了 \// 後面接上說明，稱為"註解"，註解的內容不會被編譯器讀取，註解有兩種模式：
單行註解及多行註解，在C++裡的語法是這樣的

```cpp
// 這是單行註解

/*
這是多行註解
*/
```

之後會有很多透過註解說明程式碼的部分。

---

## 變數概論

當我們要進行複雜運算時，變數成為很重要的東西，你可以用變數儲存各種資料，讓電腦記住它。

要如何宣告一個變數？格式為 ``(變數型態) (變數名稱)``，我們可以一次宣告很多變數： ``(型態) (名稱),(名稱),(名稱)...;``

ex: ``int a,b,c;``

要注意的是，變數的名稱在同作用範圍下不可重複，只能為英數字、底線(_)、開頭不可為數字、且不能是C++裡面已經定義的名稱(ex:int,char,double,long...)

### 變數型態：

根據型態的不同，儲存所需容量也會不同，依照平台而有所差異，如果想知道該型態佔了多少空間，可以使用sizeof()，
以下所提的空間都是在多數32位元機器上佔有空間

### 一、整數

每種整數資料型態都會有一定的值域，若超過的話會發生溢位，使得答案出錯
而signed/unsigned表示型態含不含符號，而負數前面都會有一個 "-" ，因此當型態為unsigned時，是將所有負值的空間加到正值，讓正值值域更大

| 型態 | 空間 | 範圍 | 描述 |
|---------|---------|---------|---------|
| short/short int | 2 Bytes | -2^15~2^15-1 | 短整數 |
| unsigned short/unsigned short int | 2 Bytes | 0~2^16-1 | 無符號短整數 |
| int/long int/signed/signed long int/long | 4 Bytes | -2^31~2^31-1 | 整數 |
| unsigned int/unsigned long int/unsigned | 4 Bytes | 0~2^32-1 | 無符號整數 |
| long long/long long int | 8 Bytes | -2^63~2^63-1 | 長整數 |
| unsigned long long/unsigned long long int | 8 Bytes | 0~2^64-1 | 無符號長整數 |

### 二、浮點數

就是有小數點的變數

| 型態 | 空間 | 範圍 | 描述 |
|---------|---------|---------|---------|
| float | 4 Bytes | -3.4E38~3.4E38 | 單精度浮點數 |
| double/long double | 8 Bytes | -1.7E308~1.7E308 | 倍精度浮點數 |

**在競技程式中，建議用double為主，因為double在計算上的精準度比float來得高很多。**

### 三、字串與字元

用來儲存文字的東西

| 型態 | 空間 | 範圍 | 描述 |
|---------|---------|---------|---------|
| char | 1 Bytes | 0~277 | 字元 |
| string | 不定 | 每個0~277 | 字串 |

string 其實可以說是字元的組合，在c++它是比char好用的東西，之後會在講陣列/字串操作時提到。

### 四、布林值

用來判斷條件的變數

| 型態 | 空間 | 範圍 | 描述 |
|---------|---------|---------|---------|
| bool | 1 Bytes | 0/1、true/false | 布林值 |

它只能存true(真)或者false(假)，通常用於判斷條件的成立

---

### 作用範圍

我們可以將變數的作用範圍分為 **全域性變數**、**區域性變數**、當然還有**靜態變數**、**常數**

定義：
- 全域性變數：在程式任何地方都可以調用
- 區域性變數：在特定的記憶體範圍中可以調用
- 靜態變數：宣告之後可作為全域性變數使用
- 常數：宣告之後不可再更動其值

這樣說可能還是有點模糊，看看這個程式碼：

```cpp
#include<bits/stdc++.h>
using namespace std;
const int s=0; //s是常數，如果在程式的某個地方修改它的值，會報錯
int a; // a是全域變數，可以在f函式也可以在main裡使用
int f(){
	return 1;
}
int main(){
	static int b; //b是靜態變數，可以拿到main函式以外的地方使用
	int c;// c是區域變數，只能在main裡用
	return 0;
}
```

我們程式是**由上往下**讀的，因此如果在上面程式碼中的f函式、main函式中間再加一個變數m，則這個變數只能在m下面的程式中也就是main函式中調用。

---

### 溢值

試試這支有bug的乘法程式，看看它有沒有符合想要的結果：

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int a = 100000;
    int b = 400000;
    int mul = a*b;
    cout << mul;//輸出 40000000000
    return 0;
}
```

這是因為int只能儲存$-2147483647\sim2147483647$範圍的值，如果超出範圍，會造成不可預期的結果

### 強制轉換類型

C++具有任意強制轉換變數型態的方法，分成隱式轉換跟強制轉換，兩者差別在前者是由編譯器自動轉換，後者由程式設計師強制轉型

```cpp
int a = 7;
double b = 1.2;
int c = a*b;
```

在這支程式中，編譯器會先把整數a轉成浮點數(小轉大)，計算完後，把結果轉成整數(大轉小)直接去掉小數點後的值再賦值給c
，最後c會是8，這就是隱式轉換。

```cpp
int a = 7;
double b = 1.2;
cout << a*(int)b;
```

這次在b前面加了(int)，是將b先轉成整數再進行運算輸出，此為強制轉換。

## 除法運算

考慮以下程式片段

```cpp
int a = 3;
int b = 10;
double c = a/b;
cout << a/b << ' ' << c;
```

將得到輸出為`0 0`，在C/C++對int除法時，需特別注意結果只會是商數 $0$ 而不會出現 $0.3$，
直接去掉小數點，此為**截斷取整**，或稱向零取整。

而在一些其他語言(例如Python)的整數除法是向下取整，即 -10 / 3 在數學上結果是-3.333...，在C++中會得到 -3，若是向下取整會得到 -4

此部分常是程式設計上一大陷阱，若遇到除法、模運算(取餘)應注意是否需先轉換成浮點數型態。



## 邏輯與運算子

學程式語言，必定要會的是邏輯與位元運算，  
以下是之後會超常使用的運算子，請熟記它們的功能。  

| 優先度 | 運算子 | 描述 | 閱讀順序 | 例子 |
|---------|---------|---------|---------|---------|
| 1 | :: | 作用域，當你的程式複雜起來再用它，目前暫時都用不到 | -> | std::cout << endl; |
| 2 | ++/\--<br>()<br>[]<br>.<br>-> | 先回傳再加減1<br>函式呼叫\\陣列存取\\物件存取成員\\指標存取成員 | -> | i++/i\--  int a = f(x);<br> int a[10];<br>obj.cmp = 0;<br>ptr->val = 0; |
| 3 | ++/\--<br>+/-<br>!<br>~<br>(Type)<br>\*<br>&<br>sizeof | 先加/減1再回傳<br>正負號<br>邏輯NOT<br>位元取反<br>強制轉換類型<br>指標指向的值<br>指標位址<br>所佔位元組大小 | <- | ++i/\--i<br>+/-1<br>while(!true)<br>a = ~a;<br>int i=int(doublex);<br>int k = \*a;<br>int \*k = &a;<br>cout << sizeof(int);//4 |
| 4 | \*<br>/<br>% | 乘<br>除<br>取模 | -> | int a = 8\*8;<br>int a = 20/6;<br>int a = 6%4; |
| 5 | +/- | 加/減 | -> | int a = 6+4; |
| 6 | >>/<< | 位元右/左移(除/乘2的n次方) | -> | int a = 4 >> 3; |
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


---

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
緩衝區的定義是 `用作中介的內存塊`，這樣說可能沒人懂，  
它就是先把資料全部移到一個地方(內存)，再去慢慢讀取的概念。  
因為程式只能一個字一個字讀，如果直接讀，程式會變超慢，   
也就是當程式頻繁進行IO操作，會頻繁把高速的部分打斷，  
造成性能下降。  

緩衝區的功用就在於避開頻繁操作，只要讀取緩衝區的資料就好。  
只有需要時再刷新緩衝區進行IO操作，讓程式性能提升。  

以下狀況會刷新緩衝區：  
* 使用cin  
* 釋放cout的資源
* 使用endl、fflush
* 程式正常結束


關於IO優化等操作，可查閱[算法筆記](./algo)


### 輸入  
在C++，我們使用cin(音：西印)輸入文字，  
方法很簡單，不像C語言還要指定型別， `cin >> x;` 就是輸入資料到x。  
當要輸入多筆資料，只要在後面繼續加就好 `cin >> x >> y >> z;`。  

如果不想使用bits/stdc++.h，需要include \<iostream>

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

而cin的好處同時也是壞處就是若輸入空格會自動斷開，  
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
如果不使用bits/stdc++.h，則要include \<sstream>才能使用stringstream  
```cpp
string s;
getline(cin,s);
stringstream ss(s); //初始化s放到字串流裡
```

然後就可以去切割它了，用陣列把這些資料儲存起來。  
這裡使用到stol()可以將字串轉成整數。

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

在最一開始的[模板](#總結程式碼模板)，就可以看到輸出的方法了(cout)，
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

Q:如果使用cerr輸出會發生什麼事？

cerr是用來除錯的，注意有些Judge不會把它當成輸出，你可以用來測試你的程式哪裡寫錯



---

## 字面常數

程式中的0,1,1.1都叫字面常數，代表程式的符號，

整型字面常數包含2,8,10,16進位，其中2進位是C++14才加入的

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int base10 = 1234; // 十進位
    int base8 = 0373; // 八進位
    int base16 = 0xf1; // 十六進位
    int base2 = 0b1010; // 二進位
}
```

對於整數，cout都會以十進位輸出，試試看輸出上面程式中的變數會出現什麼數值。

有時要做運算時可能發現直接使用數字計算，編譯器會報錯，比如要某個型態為long long的值加上10，這時可以在10後面加上LL，編譯器就會把10看作long long型態計算了。

對於浮點數，有很方便的科學記號，1000000000可以寫成1e9，0.0008可以寫成8e-4。

如果要表示字元，可以使用單引號，像是'a','1'，而如果需要用到引號或反斜線的字元時，在前面再加上一條反斜線即可。

字串的字面常量是雙引號，像 "Hello World" 整句是一個字串。

這裡提供一些常用的字元常量：

| 字面常量 | 功能 |
| ------ | ------ |
| \\n | 換行 |
| \\t | 水平定位 |
| \\v | 垂直定位 |
| \\b | 退回 |
| \\r | 回到行首 |
| \\\\\ | 反斜線 |
| \\? | 問號 |
| \\' | 單引號 |
| \\" | 雙引號 |


C++換行有兩種方式，一是使用\\n，另一種則是endl，而布林值中的true, false也是字面常量。

---
## 流程控制


### 選擇結構

藉由前面那些知識，可以做出基本的運算跟輸出輸入了，現在我們可以給程式"做選擇"，實現更多功能。

題目：

	輸入一個正整數，如果他是偶數則輸出Yes，否則輸出No。
	
這時我們可以使用 if(如果)， 用法：
```cpp
if(條件式(condition) ){
    //當條件成立要做的事
}
```

而這題的寫法如：

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin >> n;
    if(n%2==0){ // 當 n 除以 2 的餘數為0
	    cout << "Yes" << endl;
	}
	if(n%2!=0){ // 當 n 除以 2 的餘數不為0
	    cout << "No" << endl;
	}
}
```

在條件式中，我們判斷 n \% 2 是否等於 0，% 是取模運算符號，又稱取餘數， n % 2 意思是 n 除以 2 的餘數。


這時我們發現其實上面程式的兩個if一定恰有一個成立，因此可以使用else(否則)代替後面的if

```cpp
if(條件式(condition) ){
    //當條件成立要做的事
}
else{
    //當條件不成立要做的事
}
```

C++還提供了switch結構，用來比較數值或字元

```cpp
switch(變數名稱或運算式){
    case 數字或字元:
	    任務;
		break;
	case 數字或字元:
	    任務;
		break;
	default:
	    任務;
		break;
}
```

switch會把括號裡的變數由上往下跟case設定的數值比對，成功就會執行該case下的任務，然後遇到break離開，
其中default是當沒找到符合的數值字元就會執行，可以省略。


---

### 循環結構

計算機的優勢在於它可以執行大量操作，看看這題：

	輸出1到1000，每個佔一行。
	
我們可以這樣寫：
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    cout << "1\n" << "2\n" << "3\n" << "4\n" ...
}
```

顯然你的手指或鍵盤會先掛掉，那如果是輸入n，輸出1到n，就不能這樣解了，

這時可以使用for-loop：

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    for(int i=1;i<=1000;i++){
	    cout << i << endl;
    }
}
```

* for迴圈的格式為：
	for(初始化;條件式;更新式)循環體;

上面的程式中，初始化 i=1，再來程式會檢查i是否<=1000，只要符合，就進到循環體中執行裡面的任務。
當任務做完後，執行更新式(i++)，這時i就會+1，再判斷條件式是否符合，符合就再執行，直到不符合條件時整個for迴圈才會停止。

for迴圈中初始化、條件式、更新式可以視情況省略，但分號必須留著。

```cpp
for(;;){} //無窮迴圈，執行到永遠
```

另外一種迴圈是while，只要記得迴圈必須包含**初始化、終止條件、更新條件才不會寫出無窮**
，而while則必須把更新條件寫在循環體

```cpp
while(條件式)循環體;
```

考慮這個題目：

考拉茲猜想: 對於任何大於$1$的自然數$n$，若$n$為奇數，將$n$變成$3n+1$，否則變成$\frac{n}{2}$，經過若干次變換，$n$最終會變成$1$，
輸入$n(n \le 10^9)$，求$n$會更新幾次。

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    long long n,cnt=0LL;
	cin >> n;
	while(n>1){
	    if(n%2==0) n=n*3+1;
		else n /= 2;
		cnt++;
	}
	cout << cnt << endl;
	return 0;
}

```

為何這裡用long long不用int？注意題目給了範圍$(n \le 10^9)$，試試如果使用int並輸入99999999會發生什麼，
n是奇數，因此程式會將他乘3，但$99999999 \times 3 > 2^{31}-1$，已經超出int範圍了([變數溢值](#溢值))。



最後是do-while，

```cpp
do{
  循環體;
}while(條件式); //記得分號
```

跟while不同的是，do-while會先執行循環體，再判斷條件。


### 控制(break,continue,goto)

break可以離開它上面的switch、for、while、do-while區塊，如果沒把break寫在迴圈裡，會得到
編譯錯誤，

```cpp
int n=0;
while(1){ // 無窮迴圈
  n++;
  if(n>5) break; // n大於5就停止迴圈
}
```

continue跟break不同之處在於它是停下目前任務，直接進到下一個循環，

```cpp
for(int i=0;i<=10;i++){
  if(i%2==0) continue;
  cout << i << endl;
}
// 只會輸出奇數
```

goto可以在程式中任意跳躍，只要指定好目標就行，

```cpp
start:{
    ...;
    goto Error;
}
Error:{
    ...;
	goto start;
}

```

goto應避免使用，否則會讓程式難以閱讀，而且沒有goto也能寫出相同功能的程式。

---

## 陣列

現在寫個小程式，輸入N，然後輸入N個數字，最後把N個數字顛倒輸出，

如果我們輸入的N達到幾千幾萬，那宣告幾千幾萬個變數太不切實際了。我們其實可以一次宣告很多變數，

宣告方式： `資料型態 名稱[長度];`

這裡的長度需要是編譯時期的常數，像是

```cpp
int a[100];
double b[100];
```

只有在GCC的編譯環境我們可以使用 
```cpp 
int a[n]; 
```

如果要動態宣告，要用到其他資料結構跟動態記憶體宣告，之後會在講指標提到。

再來我們就能使用a[0],a[1],a[2]...a[n-1]當作每個變數了，

在[ ]中的數字，我們稱之為"索引值"，索引值對應的值，稱為"元素"，特別注意，

**索引值是從0開始的，即0代表第1個變數，1代表第2個變數**

宣告完的陣列是沒有初始化的，如果貿然存取會出現無法預測的情況，因此我們可以一次初始化全部元素，

```cpp
int a[100]={0}; // 將這100個元素全部初始化為0
```

或者直接初始化每個陣列值

```cpp
int a[5]={1,5,4,3,2};
```

最後我們可以寫出剛剛那題的程式了

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
  int n;
  cin >> n;
  int a[n]; // GCC
  for(int i=0;i<n;i++) cin >> a[i]; //利用上次講的for迴圈輸入每個變數值，注意從0開始
  
  for(int i=n-1;i>=0;i--) cout << a[i] << endl; //倒序輸出，注意最後一個索引值是n-1

}

```

如果要宣告二維陣列存更多東西，其實就是每個元素都是一個陣列
```cpp
int arr[10][10];// 宣告10*10的二維陣列
```

多維以此類推

---

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

至於原理會在指標中介紹。

---

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

現在利用遞迴概念，我們試著寫寫看計算階乘(n乘到1)的函式

```cpp
long long f(int n){ //計算 n!
    if(n<0) return -1;
    if(n==0||n==1) return 1; // 0! = 1! = 1 基底狀態
    return n*f(n-1);
}
```

記得在寫遞迴時我們要留意基底狀態，否則程式將會不斷計算下去直到電腦爆掉。

但這個函式最後可能會因為n太大而發生錯誤，如果要解決還請自行查閱資料。

練習：

* 寫出計算 $C^n_k$ 的函式
* 寫出計算費氏數列第n項的函式
* 寫出計算最大公因數的函式
* 寫出計算最小公倍數的函式

---

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

而指標的型態，取決於它從哪種變數取得指標，int指標型別就是 int\*，double指標型別是double*

宣告指標的方式也很簡單

```cpp
int a;
int *b = &a; // *放在靠int或是靠變數名稱都可以
```

上面程式代表b是a的指標

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

---

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


---


## 簡化程式可讀性

現在基礎語法已經學得差不多了，現在來談談如何讓別人更容易看懂自己的程式，之後若跟別人合寫也讓人比較容易除錯。

我認為要讓人容易看懂自己的程式碼，有以下幾點需要注意

* 善用註解，說明邏輯
* 變數名稱取名有意義的文字會更好
* 如果有沒有用到的函式、變數就不用多寫
* 可以在每次操作完輸出變數檢查
* 避免跳來跳去的結構，像是goto
* 重複的程式碼可以濃縮成函式或迴圈
