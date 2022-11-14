---
title: 算法筆記-排序
tags: 
  - algorithms
---

* [算法筆記目錄](/posts/1/algo-index/)

# 排序

排序是將一串資料依優先度排列，通常是遞增、遞減、字典序排列，  
可以自訂順序，這裡直接使用快速排序法，後面分治會提到合併排序，  
快慢隨題目而變動。  

我們學校會學到最經典的氣泡排序法，其實是個很不好的排序法，  
它最差情況的時間複雜度會炸到$O(n^2)$。  

在C++，有函數 `sort()` 可以直接排序，  
以遞增排序為例，原理是先從資料群選一個基準點，  
然後從資料兩邊往中間搜，若右邊比基準點小且左邊比基準點大，就將左右邊互換，  
直到左右邊相遇，將相遇的點與基準點互換。  

複雜度是$O(nlogn)$。  

想體驗sort()的力量，我們用random_shuffle()這個函數來打亂區間。  

```cpp
#include<bits/stdc++.h>
using namespace std;
signed main(){
	vector<int> a={9,8,7,6,5,4,3,2,1};
	for(auto i:a) cout << i << ' ';
	cout << '\n';
	
	random_shuffle(a.begin(),a.end());
	for(auto i:a) cout << i << ' ';
	cout << '\n';
	
	sort(a.begin(),a.end());
	for(auto i:a) cout << i << ' ';
	cout << '\n';
	
	return 0;
}
```

sort()預設是遞增排列，如果想遞減排列，可以在第三個引數加上 `less<型態>()`，  
而遞增就是 `greater<型態>()`。  

想要自訂排列方式，只要寫一個bool函式，並在第三個引數加上函數名字即可：  

```cpp
bool cmp(int i,int j){
	return i > j;
}
...
	sort(arr,arr+n,cmp);
...
```

在做字串排序時，預設會依字典序排序(也就是你由前往後翻查字典時會看到的順序)。  

如果要排序pair，預設是先排前數再排後數，當然你也可以寫一個函式先排後面的。  

