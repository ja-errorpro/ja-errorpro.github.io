---
title: 算法筆記-初階資料結構
tags: 
  - algorithms
---

* [算法筆記目錄](/posts/algo-index/)

# 初階資料結構  

## 1.Segment Tree - 線段樹  
  
Segment Tree是一種二元樹，適合解決RMQ問題(查詢區間極值)、區間和， 
適合用於單點修改、區間修改。  
成功實現Sparse Table做不到的事。

每個節點可以存一種區間的數據(比如區間和)，  
根節點存[1,n]的數據，每個左子節點編號是index\*2，右邊為index*2+1，  
左邊紀錄[l,(l+r)/2)，右邊紀錄[(l+r)/2+1,r]。

通常，線段樹會開4倍大
```cpp
int T[4*N],a[N]; // int T[N<<2];
```
### 建立線段樹，若l==r，此節點即a[l]
子樹建完後就把資料合併
```cpp
void build(int l,int r,int index){
	if(l==r){
		T[l] = a[l];
	}
	else{
		int mid = l+(r-l)/2; // 避免 (l+r)/2 溢位 
		build(index*2,l,mid); // build(index<<1,l,mid);
		build(index*2+1,mid+1,r);
		T[index] = T[index*2] + T[index*2+1] ;
	}
}
```

### 詢問區間(ql,qr:要查的區間 l,r:此節點儲存的左右界)
```cpp
int query(int ql,int qr,int l,int r,int index){
	if(ql<=l && qr>=r) return T[index];
	int mid = l+(r-l)/2;
	int rt=0;
	if(ql>mid) rt+=query(ql,qr,mid+1,r,index*2+1);
	if(qr<=mid) rt+=query(ql,qr,l,mid,index*2);
	return rt;
}
```

### 單點修改
```cpp
void modify(int l,int r,int pos,int index,int val){
	if(l==r){
		T[index] = val;return;
	}
	int mid = l+(r-l)/2;
	if(pos<=mid) modify(l,mid,pos,index*2,val);
	else modify(mid+1,r,pos,index*2+1,val);
	T[index] = T[index*2]+T[index*2+1];
}
```

### 懶人標記

如果想在[l,r]中的所有元素加值怎麼辦？
不可能一個一個呼叫modify吧。

我們可以先在要加的區間內貼標籤，最後要查詢時再加上去就好

* 這裡用了更多變數，建議改用結構體來實作可以減少程式碼

```cpp
void push(int l,int r,int idx){
	Tag[2*idx] += Tag[idx]; // 左子節點貼標籤
	Tag[2*idx+1] += Tag[idx]; // 右子節點貼標籤
	T[idx] = T[idx] + Tag[idx] * (r-l+1); // 最後的答案
	Tag[idx] = 0;
}
void modify(int ql,int qr,int l,int r,int index,int val){
	if(ql<=l&&r>=qr){
		Tag[index] += val; // 在這個節點貼上標籤
		return;
	}
	int mid = l+(r-l)/2;
	if(ql>mid) modify(ql,qr,mid+1,r,idx*2+1,val);
	else if(qr<=mid) modify(ql,qr,l,mid,idx*2,val);
	else{
		modify(ql,qr,l,mid,idx*2);
		modify(ql,qr,mid+1,r,idx*2+1);
	}
	T[idx] = T[idx*2] + Tag[idx*2] * (mid-l+1) + T[idx*2+1] + Tag[idx*2+1] * (r-mid);
}
int query(int ql,int qr,int l,int r,int idx){
	if(ql<=l&&r<=qr) return T[idx] + Tag[idx]*(r-l+1);
	push(l,r,idx);
	int mid = l+(r-l)/2;
	
	if(ql>mid) return query(ql,qr,mid+1,r,idx*2+1);
	else if(qr<=mid) return query(ql,qr,l,mid,idx*2);
	else return query(ql,qr,l,mid,idx*2) + query(ql,qr,mid+1,r,idx*2+1);
}
```

### 練習：
	ZeroJudge d539
	ZeroJudge d668
	ZeroJudge d799


## 2.Fenwick Tree(BIT) - 樹狀數組
大家都說他是線段樹的精簡版本，因為他實作比較簡單，也更省空間，支援單點加值、前綴求和。


時間複雜度為 $O(log(N))$

空間複雜度為 $O(N)$

其運用了一個數字都可以寫成好幾個2的n次方之和，將數進行分段。

BIT最重要的是$lowbit()$函式，表示把某數寫成二進位後，最低位的1所代表的數，

例如： $lowbit(6_{10}) = lowbit(110_2) = 10_2 = 2_{10}$，$lowbit(20_{10}) = lowbit(10100_2) = 100_2 = 4_{10}$

要計算lowbit，可以用 $x \\& (-x)$ 得到，

要計算 $lowbit(20_{10})$，$20$ 寫成二進位為 $10100_2$，$-20_{10}$ 寫成二進位為 $01011_2 + 1_2 = 01100_2$，$20_{10}\\& (-20_{10}) = 10100_2 \\& 01100_2 = 00100_2 = 4_{10}$。

現在我們有一個陣列 $a[1...n]$，我們再建另一個陣列 $T[i] = \sum^i_{j=i-lowbit(i)+1} a[j] $

### 前綴和

想計算 $a[1...20]$ 的和，因為 $T[20] = a[17...20]$，可以遞迴算出 $a[1...16]$ 的和，加上 $T[20]$ 就是答案了。

要算出 $a[1...16]$ 的和，$T[16] = a[1...16]$，是我們已經算好的答案，

最後看起來 $sum(x) = T[x] + sum(x-lowbit(x))$。


### 單點加值

如果想在 $a[12]$ 加上 $x$ ，那直接 $T[12] += x$ 就好了，但是 $T[12]$ 會影響到 $T[13...20]$，所以要把 $T[13...20]$ 都更新一次。

最後就是實作了，為了方便，包成struct

```cpp
struct BIT{
    int sz;
    vector<int> T;
	BIT(int n){
		sz = n;
		T.assign(n+1,0);
	}
    void update(int i,int x){
		for(;i<=sz;i+=i&-i) T[i]+=x;
	}
	int query(int i){
		int ans = 0;
		for(;i;i-=i&-i) ans+=T[i];
		return ans;
	}

};
```

如果要初始化，直接把原陣列一個一個update進去就可以了，時間複雜度為 $O(Nlog(N))$。