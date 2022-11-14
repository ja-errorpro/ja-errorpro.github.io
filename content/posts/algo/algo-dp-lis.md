---
title: 算法筆記-DP-LIS
tags: 
  - algorithms
---

* [算法筆記目錄](/posts/1/algo-index/)

## 最長遞增子列(Longest Increasing Subsequence)

考慮以下問題：

給一個序列，求一個最長的遞增子序列，如 [1,3,2,2,4,0] 中，最長的遞增子序列為 [1,3,4] 或 [1,2,4]。

定義狀態： $dp_i$ 代表掃到第$i$個數時的LIS長度

轉移式： $dp_i = max(dp_j\ \| j<i \land a_j<i) + 1$ 表示當發現$a_j < a_i$，則LIS長度+1

邊界狀況： 最小的遞增子列至少為1

```cpp
// Top-Down
#include<bits/stdc++.h>
using namespace std;
const int MAXN = 1005
int a[MAXN],dp[MAXN];
int DP(int i){
    if(dp[i]>0) return dp[i];
	dp[i] = 1;
	for(int j=0;j<i;++j) if(a[j]<a[i]) 
	    dp[i] = max(dp[i],DP(j)+1);
	
	return dp[i];

}
int main(){
    int n;
	cin >> n;
	for(int i=0;i<n;++i) cin >> a[i];
	int ans = 0;
	for(int i=0;i<n;++i) ans = max(ans,DP(i));
	cout << ans << endl;
    return 0;
}
```

```cpp
// Buttom-Up
#include<bits/stdc++.h>
using namespace std;
const int MAXN = 1005
int a[MAXN],dp[MAXN];
int main(){
    int n;
	cin >> n;
	for(int i=0;i<n;++i) cin >> a[i];

	for(int i=0;i<n;++i)
		for(int j=0;j<i;++j) if(a[j]<a[i])
			dp[i] = max(dp[i],dp[j]+1);
	
	int ans = 0;
	for(int i=0;i<n;++i) ans = max(ans,dp[i]);
	cout << ans << endl;
    return 0;
}
```

總複雜度： $O(n^2)$

而我們如果要將LIS優化，事實上可以壓到$O(NlogN)$，

根據LIS的性質，可以發現越大的數放越後面越好，

我們先把$a_1$ 放進LIS，接著對LIS二分搜原數列的每個數，

並將搜到的位置的下一個位置取代掉，而如果這個數是LIS最大的就放到後面

其實就是Greedy、滾動dp的概念

```cpp
int LIS(vector<int>& a){
	if(a.size()==0) return 0;
	
	vector<int> lis;
	lis.push_back(a[0]);
	for(int i=1;i<a.size();++i){
	    if(a[i]>lis.back()) lis.push_back(a[i]);
		else *lower_bound(lis.begin(),lis.end(),a[i]) = a[i];
	}
	return lis.size();
}
```


如果是非嚴格遞增，把判斷式加個等號就行。

如果求的是遞減，把數列倒過來做。

## 最長共同子列(LCS) 轉化 LIS

給兩序列，求最長共同子序列，
如果有一個數列元素互不相同，則可將問題轉成LIS，

因為不重複，一一對應後可以離散化，並將兩序列中只出現在其中一個序列的數刪除，
就成功轉化成盡量多的A序列元素，讓他在B序列對應的元素單調遞增，即LIS。



