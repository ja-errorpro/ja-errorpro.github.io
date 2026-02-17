---
title: 107年彰雲嘉p3 - GCD & LCM
date: 2021-09-11
tags:
  - algorithms
keywords:
  - gcd
  - lcm
  - algorithm
  - number theory
  - greatest common divisor
  - least common multiple
  - cpp
  - chang-yun-chia
  - programming contest
  - 最大公因數
  - 最小公倍數
  - 數論
  - 演算法
  - 程式競賽
  - 彰雲嘉
  - 考古題
  - 題解
  - 數學
---

# **題目：**
	給你一堆數字(>=0)，求他們的GCD(最大公因數)與LCM(最小公倍數)

# 輸入：
	一堆數字以空格分開，最後以0結束

# 輸出：
	所有數字(除了0以外)的GCD跟LCM，以空格分開
	
#### Ex 1 Input:
	10 20 30 0

#### Ex 2 Input:
	3 5 7 9 12 0

#### Ex 3 Input:
	100 100 200 0

#### Ex 1 Output:
	10 60
	
#### Ex 2 Output:
	1 1260

#### Ex 3 Output:
	100 200
	
	
# 題解：	

	
就是一題簡單的數論題，		  
可以根據歐幾里得算法 gcd(a,b-a) = gcd(a,b mod a), gcd(a,0) = |a| 		  
(輾轉相除)來求GCD，	  	  
那LCM要怎麼求？我們知道 a | (a\*b) 且 b | (a\*b) (a\*b必為ab公倍數)		  
如果要得到最小公倍數，只要除以gcd(a,b)就行。		  
	
當我們在計算mod時，要注意有沒有負數問題，因為C++的算法會使負數模運算出差錯，	  	
建議使用((a%b)+b)%b 來取代 a%b，這樣就能簡單避開負數取模的問題了。		  
還好這題輸入並沒有負數，但之後做模運算時請稍加注意。		  
	
輸入的部分，剛會語法的人應該就是直接開陣列然後輸入，	  	  
雖然不是必要，但這裡介紹一個STL容器 \<vector>(向量)  
他真的比陣列好用很多，  
比如說，陣列的容量必須在一開始就宣告，還要宣告一個整數維護放了幾個數字  

 	
vector只要一個一個往後面塞就好。 
   
關於vector的用法，之後會在  [算法筆記](../../algo)  提到  

另外，gcd其實在 \<algorithm> 裡已經有定義了(__gcd(a,b)，注意是兩個底線)，因此我們也不需要再寫一個輾轉相除法的函式

上程式碼：

```cpp
#include<bits/stdc++.h>
using namespace std;
signed main(){
	ios_base::sync_with_stdio(false);
	cin.tie(0);
	vector<int> v;
	int x;
	while(cin >> x){
		if(x==0) break;
		v.push_back(x);
	}
	if(v.size()==0) exit(0);
	int gcd=v[0],lcm=v[0];
	for(int i=1;i<v.size();++i){
		gcd = __gcd(gcd,v[i]);
		lcm = (lcm*v[i])/__gcd(lcm,v[i]);
	}
	cerr << gcd << ' ' << lcm << '\n';

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