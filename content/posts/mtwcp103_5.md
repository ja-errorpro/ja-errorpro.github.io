---
title: 103年彰雲嘉P5 - Infix to Postfix
date: 2021-09-11
tags:
  - algorithms
---

# **題目：**
	一般我們在表示運算式時，是使用中序式，是將運算子放在兩運算元中間，  
	比如 (A+B)*(C+D)。而在電腦中，需要將中序式轉成後序式以方便運算。  
	
	(A+B)*(C+D)的後序式為 AB+CD+*；  
	A*(B+C)-D*E+F 的後序式為 ABC+*DE*-F+ 。  
	請寫一程式將中序式轉成後序式。

# 輸入：
	輸入一個中序運算式，其中運算元為A~Z等26個單一字母表示，運算子只包含+、-、*、/。  
	運算式中可有任意多個括號，且保證輸入的式子合法。

# 輸出：
	輸出後序式。
	
#### Ex 1 Input:
	中置式: (A+B*(C-D)+E)* ((F+G)/(H*I)+J)  

#### Ex 1 Output:
	後置式: ABCD-*+E+FG+HI*/J+*
	
# 題解：	

需要注意的是四則運算的優先序(括號先算，由左到右，先乘除，後加減)。  
這題是非常經典的堆疊資料結構應用題，用 `getline` 輸入，遇到運算子就加入堆疊，  
先看括號，然後看加減乘除，如果遇到 `)` 的話，就把堆疊的運算子都輸出直到碰到 `(` 為止。

而運算元則直接輸出就行。  

(我的編譯器因為格式問題輸出不了中文...反正程式碼對就好)

這問題可以再延伸，比如以中序式進行四則運算輸出結果，  
跟這題做法很像只要把中序轉成後序然後讀一遍，  
遇到運算子就把前面讀到的數字做運算後放入堆疊，注意運算子可能有多位數。  

補充：這種需要stack的題目通常能用遞迴完成，因為遞迴本身就是一種堆疊。

上程式碼：

```cpp
#pragma GCC optimize("Ofast")
#pragma loop_opt(on)
#include<bits/stdc++.h>
using namespace std;
template<class T> long long Mod(T a,T b){return ((a%b)+b)%b;}
#define endl '\n'
#define ll long long
#define IO ios_base::sync_with_stdio(0); cin.tie(0);
#define GETOUT cout.tie(0);
#define gc getchar()
#define cendl cout << endl;
#define fr(bob,n,l) for(int bob=(n);bob<(l);++bob)
#define fra(ns,a) for(auto (ns):a)
#define frc(bot,ns,l) for(int bot=(ns);bot<=(l);++bot)
#define frx(i,ns,l) for(int i=(ns);i<(l);++i)
#define mem(arr,initn) memset(arr,initn,sizeof(arr))
#define getpos(va,v) lower_bound((v).begin(),(v).end(),(va)) - (v).begin()
#define arrpos(i,va) distance((va),find(ALLa((va)),i))
#define pb emplace_back
#define fi first
#define se second
//#define int long long
const int MAX=1e9+7;
const int MOD=998244353;
int priority(char c){
	switch(c){
		case '+': 
		case '-': 
			return 1;
		case '*': 
		case '/': 
			return 2;
		default: 
			return 0;
	}
}
string s;
stack<char> sgn;
vector<char> ans;
void postfix(string s){
	sgn.push('\0');
	int len = s.size();
	for(int i=0;i<len;i++){
		if(s[i]=='('){
			sgn.push(s[i]);
		}
		else if(s[i]=='+'||s[i]=='-'||s[i]=='*'||s[i]=='/'){
			while(priority(sgn.top())>=priority(s[i])){
				ans.pb(sgn.top());sgn.pop();
			}
			sgn.push(s[i]);
		}
		else if(s[i]==')'){
			while(sgn.top()!='('){
				ans.pb(sgn.top());
				sgn.pop();
			}
			sgn.pop();
		}
		else if(s[i]>='A'&&s[i]<='Z'){
			ans.pb(s[i]);
		}
	}
	while(!sgn.empty()){
		ans.pb(sgn.top());sgn.pop();
	}
	cout << "後置式: ";
	for(auto i:ans){
		cout << i ;
	}
}
inline void solve(){
	getline(cin,s);
	postfix(s);
}
signed main(){
	//IO;
	//GETOUT;
	int t;
	t=1;
	while(t--)solve();
	return 0;
}
```

	
	
	
	
<style>

.back-to-top {

display: none; /* 默認是隱藏的，這樣在第一屏才不顯示 */

position: fixed; /* 位置是固定的 */

bottom: 20px; /* 顯示在頁面底部 */

right: 30px; /* 顯示在頁面的右邊 */

z-index: 99; /* 確保不被其他功能覆蓋 */

border: 1px solid #5cb85c; /* 顯示邊框 */

outline: none; /* 不顯示外框 */

background-color: #fff; /* 設置背景背景顏色 */

color: #5cb85c; /* 設置文本顏色 */

cursor: pointer; /* 滑鼠移到按鈕上顯示手型 */

padding: 10px 15px 15px 15px; /* 增加一些內邊距 */

border-radius: 10px; /* 增加圓角 */

}

.back-to-top:hover {

background-color: #5cb85c; /* 滑鼠移上去時，反轉顏色 */

color: #fff;

}

</style>

<button class="js-back-to-top back-to-top" title="回到頭部">&#65085;</button>

<script src="https://cdn.staticfile.org/jquery/2.2.4/jquery.min.js"></script>

<script>

$(function () {

var $win = $(window);

var $backToTop = $('.js-back-to-top');

// 當用戶滾動到離頂部100像素時，展示回到頂部按鈕

$win.scroll(function () {

if ($win.scrollTop() > 100) {

$backToTop.show();

} else {

$backToTop.hide();

}

});

// 當用戶點擊按鈕時，通過動畫效果返回頭部

$backToTop.click(function () {

$('html, body').animate({scrollTop: 0}, 200);

});

});

</script>
<script type="text/javascript">
	$(document).ready(function() {
	    //所有連結會在新分頁開啟
		$('a[href^="http"]').each(function() {
			$(this).attr('target', '_blank');
		});
	});
</script>