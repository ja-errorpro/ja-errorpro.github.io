---
title: 107年彰雲嘉P6 - 統一發票對獎程式
date: 2021-09-11
tags:
  - algorithms
---

# **題目：**
![1](/images/6_1.png)

#### Ex 1 Input:
	73372972
	22315462
	91903003
	16228722
	03270598
	163
	983
	814
	73372971
	22315461
	91903001
	16228722
	13210598
	03210163
	0

#### Ex 1 Output:
	201200
	
# 題解：

前三個獎直接判別，後面判別如果你用int，就 `mod pow(10,i)`；  
如果你用字串，直接複製 `string s1(s.begin()+i,s.end())`。

這裡使用字串判別。

判定順序可以任意，總之記得符合條件就一定要break不然會多算。

增開六獎跟持有號碼數量雖然不一定，但他們長度都是固定的，  
string直接s.size()，而int你可以透過除以1000 == 0? 判別。  

這裡直接把六獎當增開六獎判定，反正結果一樣。

官方測資的獎金不會超過$2^{31}$，所以不會溢位。  

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
#define fr(bob,n,l) for(int bob=n;bob<l;bob++)
#define frc(bot,n,l) for(int bot=n;bot<=l;bot++)
#define frx(i,n,l) for(int i=n;i<l;i++)
#define mem(arr,initn) memset(arr,initn,sizeof(arr))

//#define int long long
const int MAX=1e9+7;
const int MOD=998244353;
string s1,s2,s3,s4,s5;
vector<string> six;
int rewards[]={0,40000,10000,4000,1000};
int ans=0;
inline void solve(string s){
	frc(i,1,5){
		string ts(s.begin()+i,s.end());
		string ta(s3.begin()+i,s3.end());
		string tb(s4.begin()+i,s4.end());
		string tc(s5.begin()+i,s5.end());
		if((ts==ta||ts==tb||ts==tc) &&i<5 ){
			ans+=rewards[i];
			break;
		}
		else if(i==5){
			for(auto j:six){
				if(ts==j){
					ans+=200;
					return;
				}
			}
		}
	}
}
signed main(){
	IO;
	GETOUT;
	cin >> s1 >> s2 >> s3 >> s4 >> s5;
	string a(s3.begin()+5,s3.end());
	string b(s4.begin()+5,s4.end());
	string c(s5.begin()+5,s5.end());
	six.push_back(a);six.push_back(b);six.push_back(c);
	while(1){
		string s;
		cin >> s;
		if(s.size()==3) six.push_back(s);
		if(s.size()==8){
			if(s==s1) ans+=10000000;
			else if(s==s2) ans+=2000000;
			else if(s==s3||s==s4||s==s5) ans+=200000;
			else solve(s);
		}
		if(s=="0") break;
	}
	cerr << ans << endl;
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