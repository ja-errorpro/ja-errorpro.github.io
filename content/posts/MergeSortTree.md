---
title: 區間詢問比K小的數量
date: 2021-09-25
---

今天是資訊能競校內初選，沒把經典題做出來真的很可惜。  

所以來刻點線段樹緩下心情(?  

順便測試一下在網站中使用 $ \LaTeX $

# 先要基礎：
[線段樹](../algo-segtree)、二分搜、排序

# 合併排序樹  
	合併排序樹是一種線段樹，節點上都是一個向量(Vector)，  
	比如節點的範圍是[l,r]，則節點上向量就是已排序過的array[l~r]。  
	
# 題目：

輸入 $n$ 個數到陣列 $A$，然後輸入一個 $q$ 代表詢問次數。  
接著每次詢問有三個數 $l,r,k$ 代表詢問的區間$[l,r]$ 有幾個數比 $k$ 小。  

其中，$ 1 \le n,q \le 2*10^5$，且陣列中沒有重複數字。

# 輸入：

首先輸入一整數 $n$，  
再來一行有$n$個數代表 $a_i(1 \le a_i \le 10^9)$。  
接下來一行輸入整數$q$，  
接著有 $q$ 行分別輸入 $l,r,k$。

# 輸出：

一個整數代表在 $[l,r]$ 區間內有幾個數比 $k$ 小。  

#### Ex 1 Input:
	10
	5 2 1 9 10 4 8 7 6 3
	5
	1 10 6
	4 8 7
	6 9 4
	1 8 5
	2 7 10
	
#### Ex 1 Output:
	5
	1
	0
	3
	5
	
#### Note:

第一個詢問區間 $[1,10]，k=6$，其中比k小的元素有:$ \{5,2,1,4,3\} $，共$5$個。  
第二個詢問區間 $[4,8]，k=7$，其中比k小的元素有:$ \{4\} $，只有$1$個。


# 題解：

建好一棵類型為向量的線段樹，子節點就是 $arr[l]$ push進去。  
維護方式是將兩個兒子跟自己合併，利用 `merge()` 可以解決。  

而詢問就是利用二分搜找出位置。  

上程式碼:

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
#define ALL(va) va.begin(),va.end()
#define printv(va) {fr(i,0,size((va))){cout<<(va)[i]<< ' ';}cendl;}
#define printa(va) {fr(i,0,sizeof((va))/sizeof((va)[0])){cout << (va)[i] << ' ';}cendl;}

//#define getpos(va,v) lower_bound((v).begin(),(v).end(),(va)) - (v).begin()

#define pb emplace_back
typedef pair<int,int> pii;
#define fi first
#define se second
//#define int long long
const int MAX=1e9+7;
const int MOD=998244353;
inline int nextint(){
	int x=0,w=1;char ch=0;
  	while(ch<'0'||ch>'9'){
    	if(ch == '-')w=-1;
    	ch=getchar();
  	}
  	while(ch>='0'&&ch<='9')x=x*10+(ch-'0'),ch=getchar();
  	return x*w;
}
const int N = 100011;
vector<int> T[4*N];
int a[N];
void build(int l,int r,int idx){
	if(l==r){
		T[idx].pb(a[l]);
		return;
	}
	int mid=l+r>>1;
	build(l,mid,idx<<1);
	build(mid+1,r,(idx<<1)|1);
	merge(ALL(T[idx<<1]),ALL(T[(idx<<1)|1]),back_inserter(T[idx]));
}
int query(int ql,int qr,int l,int r,int idx,int k){
	if(ql>r||qr<l) return 0;
	if(ql<=l&&r<=qr) return lower_bound(ALL(T[idx]),k) - T[idx].begin();
	int mid = l+r>>1;
	int rt=0;
	rt+=query(ql,qr,l,mid,idx<<1,k);
 	rt+=query(ql,qr,mid+1,r,(idx<<1)|1,k);
 	return rt;
}
inline void solve(){
	int n;
	cin >> n;
	frc(i,1,n) cin >> a[i];
	build(1,n,1);
	int q;
	cin >> q;
	while(q--){
		int x,y,k;
		cin >> x >> y >> k;
		int ans = query(x,y,1,n,1,k);
		cout << ans << endl;
	}
}
signed main(){
	IO;
	GETOUT;
	int t;
	t=1;
	while(t--)solve();
	return 0;
}
```