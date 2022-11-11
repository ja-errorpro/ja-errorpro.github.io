---
title: 算法筆記-基本/初階資料結構
tags: 
  - algorithms
keywords:
---

* [算法筆記目錄](/posts/1/algo-index/)

# 基礎資料結構

我們程式想儲存東西有很多種方式，而資料結構就像一種容器，  
可以儲存或拿取需要的東西，每種資料結構都有不同的複雜度，  
如果用得好，效率就會高。  
以下都是最基本的資料結構

## 1.Vector - 向量 in \<vector>

```cpp
vector<int> v;
```

向量可當成陣列來用，應該說它就是更強的陣列，而且易維護。  
比起原本陣列，它可以自動擴大容量，  
能用的空間也比陣列還多。但要注意的是，如果使用operator[]存取了未配置的記憶體位置，  
會導致Segmentation Fault。
```
以下為vector的功能：  
-- vector[n] 存取索引值為n的元素  
-- vector.at(n) 存取索引值為n的元素(較安全)  
-- vector.begin() 回傳指向vector第一個元素的疊代器  
-- vector.end() 回傳指向vector最後一個元素再下一個的疊代器  
-- vector.front() 回傳vector[0]  
-- vector.back() 回傳vector最後一個元素的值  
-- vector.size() 回傳目前vector儲存了多少元素  
-- vector.resize(n) 修改vector大小  
-- vector.capacity() 存取可容納最大個數  
-- vector.empty() 回傳布林值表示vector是不是空的  
-- vector.reserve(n) 配置更多記憶體以容納更多元素   
-- vector.push_back(n) 把n放到vector最尾端  
-- vector.pop_back() 把vector最尾端元素取出  
-- vector.insert(it,n) 在疊代器it後插入元素n  
-- vector.erase(it,(it2)) 刪除疊代器it~it2的元素  
-- vector.clear() 刪除所有元素  
-- vector.swap(vector2) 交換兩個vector  
```
以下是一個使用vector的範例：  

```cpp
#include<bits/stdc++.h>
using namespace std;
signed main(){
	vector<int> v1(5); // 宣告一個類型為int的vector，長度為5
	vector<int> v2(6,10); // 宣告一個類型為int的vector，長度為6且全部初始化為10
	vector<vector<int> > v3; //即二維陣列，注意>>之間需要多個空格以免跟位元運算子(>>)搞混  
	vector<vector<int> > v4(10,vector<int>(20)); // 宣告大小10*20的二維陣列
	
	v2.push_back(3); // v2 = {10,10,10,10,10,10,3}
	
	v1.push_back(2); // v1 = {1}
	
	cout << v2.size() << endl; // Output: 7
	
	for(int i=0;i<4;i++){
		v1.push_back(i);
	} // v1 = {1,0,1,2,3}
	
	for(int i=0;i<v1.size();i++){
		cout << v1[i] << ' ';
	} // Output: 1 0 1 2 3
	cout << endl;
	for(auto i = v1.begin();i!=v1.end();i++){
		cout << *it << ' ';
	}// 輸出結果同上
	cout << endl;
	v2.pop_back(); // v2 = {10,10,10,10,10,10}
	
	for(auto i:v2){ //快速寫法，需要C++11以上(在編譯指令後面加上 -std=c++11)
		cout << i << ' ';
	} // Output: 10 10 10 10 10 10

	return 0;
}
```

## 2.Pair - 值對 in \<utility>

把兩個變數綁成一個變數的結構。  
而且不一定要一樣的型態才能綁。  
可以使用make_pair(x,y) 來綁變數。  
```cpp
pair<int,int> p;
p = make_pair(105,110);
```
```
-- pair.swap(p2) 交換兩個pair   
-- pair.first 得到pair前值  
-- pair.second 得到pair後值  
```
## 3.Stack - 堆疊 in \<stack>

```cpp
stack<int> st;
```

堆疊就像我們把東西一層一層往上疊，  
當要拿取下面的東西時，只能先把上面的東西都先拿完才能拿，  
即越後面丟進去的，就越早拿出來。  

```
APCS觀念題：  
	若將5、8、34、10、199、123依序丟進Stack裡，求一個一個取出後會依序得到哪些值？  
	(A)5,8,34,10,199,123
	(B)123,199,10,34,8,5
	(C)5,8,10,34,123,199
	(D)199,123,34,10,8,5
	
	正確答案為(B)
```

```
以下為stack的成員函式：  
-- stack.top() 回傳stack最頂端的資料  
-- stack.push(x) 把x丟進堆疊裡  
-- stack.pop() 把最頂端的資料刪除  
-- stack.size() 回傳stack裡目前儲存多少東西  
-- stack.empty() 回傳布林值表示stack是不是空的   
```
## 4.Queue - 佇列 in \<queue>

```cpp
queue<int> que;
```

就像我們在排隊一樣，要加入元素只能加到尾端，  
而要取出元素只能取最前端的資料。  
```
以下為queue的成員函式：  
-- queue.push(n) 把n加到queue尾端  
-- queue.pop() 把queue最前端值刪除  
-- queue.size() 回傳隊伍大小  
-- queue.front() 回傳最前端的值  
-- queue.empty() 回傳布林值表示queue是不是空的  
```
## 5.Deque - 雙向佇列 in \<deque>

```cpp
deque<int> deq;
```

與佇列不同的地方，就是可以加前面也能加後面，  
刪除也是。  
```
以下為deque的成員函式：  
-- deque.front() 回傳最前端的值  
-- deque.back() 回傳最尾端的值  
-- deque.push_front(n) 把n加到前端  
-- deque.push_back(n) 把n加到尾端  
-- deque.pop_front() 把最前端的值刪除  
-- deque.pop_back() 把最尾端的值刪除  
-- deque.size() 回傳雙向佇列大小  
```
## 6.Priority Queue - 優先佇列 in \<priority_queue>  

這種資料結構是一種Heap(堆積)，  
主要功能是維護極值，複雜度O(logN)。  

其成員函數與queue差不多，但在宣告時可指定多種容器。  

```cpp
priority_queue<int> pq1; // 預設遞減排列
priority_queue<int,vector<int>,greater<int> > pq2; // 遞增排列
priority_queue<int,vector<int>,less<int> > pq3; // 遞減排列

struct cmp{
	bool operator()(T a,T b){
		return a > b;
	}
};
priority_queue<T,vector<T>,cmp> pq4; 
// 以!cmp函式來決定優先度(注意cmp要反向定義，而且要使用struct)
// 上述為遞減排列
```
## 7.Set - 集合 in \<set>

有自動排序的功能，是一棵紅黑樹，插入元素複雜度為O(logN)。
但沒有operator[]跟.at()能使用，必須用疊代器存取元素。  
而且元素不能重複(會自動合併)，也不能修改。
```
以下為set的成員函式：  
-- set.insert(n) 新增n到set
-- set.erase(n) 把n從set中刪除  
-- set.find(n) 回傳n的疊代器，如果沒找到會返回set.end()  
-- set.count(n) 回傳n是否存在  
-- set.begin() 回傳第一個元素的疊代器  
-- set.end() 回傳指向set最後一個元素再下一個的疊代器
```
以下為遍歷set的兩種方式：

```cpp
	set<int> ss={5,6,1,4,3,2,9};
	for(auto i : ss){
		cout << i << ' ';
	}
	cout << endl;
	for(auto i = ss.begin();i!=ss.end();i++){
		cout << *i << ' ';
	}
	cout << endl;
```

其他類似資料結構：  
-- multiset 可儲存重複元素。  
-- unordered_set hash結構，沒有排序功能但複雜度可到O(1)，同時也消耗更多記憶體。

## 8.Map - 映射 in \<map>

一樣可以自動排序，一個鍵值對應一個值，  
而鍵值不可重複。    
它是一棵紅黑樹，插入元素複雜度O(logN)。

```cpp
	map<string,int> mp; // 一個string映射到int
	mp["Jack"] = 98765;
```

成員函式同set，可以使用operator[]。

其他類似資料結構：  
-- unordered_map hash結構，沒有排序功能  

## 9.DSU(Disjoint Set Union) - 並查集  

如果遇到題目在詢問兩個元素是否在同一個集合，  
或需要合併集合時會用到。  

一開始，每個值的父節點設成他自己。  

每個集合中所有元素都以某個值做為它的父節點，即所有節點都指向根。  
```cpp
int query(int index){
	if(dsu[index] != index){
		return dsu[index] = query(dsu[index]);
	}
	return index;
}
```

當需要合併集合，只要把根節點指向另一集合。  

```cpp
void Union(int a,int b){
	dsu[query(a)] = query(b);
}
```

## 10.BitSet - 位元集  

可以把它當成一個bool array，也可以直接用它把數值轉成二進位形式，  
它只能由0/1組成。  

宣告的方式是 `bitset<N> bs` ，表示N位數的位元集，  
初始化可以 `bitset<N> bs(X)`，表示將X轉成N位數的二進位型態。  
注意X可以是字串，但只能包含0/1，否則會RE。  
如果X轉成二進位的位數超過宣告的位數，會直接省略高位的部分。

要輸出的話，直接 `cout << bs;` 就行。  

若要對bitset進行位元運算，直接對其加上位元運算符號即可，  
比如 `b= b0 << 1;` (b 設為 b0左移一位元 )。  

```
以下是Bitset的成員函式：  
-- bitset.count() 回傳bitset有多少個1  
-- bitset.size() 回傳bitset有多少位  
(要知道0的個數就是兩個相減)   

-- bitset.any() 回傳布林值表示bitset是否有1  
-- bitset.none() 回傳布林值表示是否沒有1  

-- bitset.flip(x) 將第x位元做NOT，如果不填x，就全部做NOT  
-- bitset.set(x,n) 將第x位元設為n，如果不填x，就全部設成1  
如果不填n，則設成1
```

---


# 初階資料結構  

## 1.Segment Tree - 線段樹  
用法很多，請見[此頁](../algo-segtree)


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


