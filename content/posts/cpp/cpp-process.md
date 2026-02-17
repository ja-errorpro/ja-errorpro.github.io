---
title: C++筆記-流程控制
tags:
  - C-Cpp
keywords:
  - control flow
  - if else
  - loop
  - for loop
  - while loop
  - switch case
  - c++
  - cpp
  - 流程控制
  - 判斷式
  - 迴圈
  - 條件分支
  - 程式設計
  - 基礎語法
url: "/posts/cpp/cpp-process"
---

- [C++筆記-目錄](/posts/cpp-index)

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

- for迴圈的格式為：
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
