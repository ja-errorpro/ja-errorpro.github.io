---
title: 算法筆記-排序
tags:
  - algorithms
keywords:
  - sorting algorithms
  - merge sort
  - quick sort
  - bubble sort
  - heapsort
  - algorithm
  - 排序演算法
  - 合併排序
  - 快速排序
  - 氣泡排序
  - 堆積排序
  - 演算法
---

- [算法筆記目錄](/posts/algo-index/)

# 排序

排序是將一串資料依優先度排列，是電腦工程最常見且最基本的算法，將資料排序後，可以更有效率的搜尋資料，也可以更有效率的處理資料，利於統計。

## 氣泡排序(Bubble Sort)

氣泡排序通常是我們在學校會學到的第一種排序法，原因是其簡單易懂，

原理是逐一比較相鄰兩元素，若順序錯誤則交換。

每一輪都確保最後一筆資料在正確的位置。

因此我們需要跑好幾輪，直到整個數組都是正確的順序。

如果數組長度為 $n$，則需要跑 $n-1$ 輪、每輪跑 $n-i$ 次，總共跑 $n(n-1)/2$ 次。

因此時間複雜度為 $O(n^2)$。

```cpp
void bubbleSort(int arr[], int n) {
	for (int i = 0; i < n - 1; i++) {
		for (int j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(arr[j], arr[j + 1]);
			}
		}
	}
}
```

然而氣泡排序法的時間複雜度太高了(成本太高)，如果資料達到數百萬筆就不適合使用此排序法。

## 選擇排序(Selection Sort)

選擇排序是在數組中找出極值，以由小到大排序為例，先找出最小的數，放在第一個位置，再找出第二小的數，放在第二個位置，以此類推。

平均時間複雜度同樣為 $O(n^2)$。

```cpp
void selectionSort(int arr[], int n) {
	for (int i = 0; i < n - 1; i++) {
		int min = i;
		for (int j = i + 1; j < n; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		swap(arr[i], arr[min]);
	}
}
```

## 插入排序(Insertion Sort)

插入排序將數組分成兩部分，一部分是已排序的，另一部分是未排序的，每次從未排序的數組中取出一個數，逐一檢查找到正確的位置插入，直到未排序的數組為空。

平均時間複雜度為 $O(n^2)$。

```cpp
void insertionSort(int arr[], int n) {
	for (int i = 1; i < n; i++) {
		int j = i;
		while (j > 0 && arr[j] < arr[j - 1]) {
			swap(arr[j], arr[j - 1]);
			j--;
		}
	}
}
```

如果想了解插入排序法的改良版，可自行上網搜尋 `希爾排序法(Shell Sort)`。

## 合併排序(Merge Sort)

合併排序採分治的概念(之後會補坑)，每次遞迴將兩數組分成一半下去遞迴，直到無法分割後再兩兩合併，合併時進行排序。

每次分割需要 $n-1$ 次，合併每次選取兩個陣列中未排序部分的第一個元素，將小的放進陣列，複雜度 $O(log\ n)$。

平均時間複雜度為 $O(nlog\ n)$。

**此程式用到了 `vector` 資料結構，建議先閱讀 [基礎資料結構](/posts/1/algo-basic-structure/)。**

```cpp
vector<int> merge(vector<int> arr, vector<int> arrb) {
	vector<int> ret;
	for(int i=0,j=0;i<arr.size()||j<arrb.size();){
		if(i<arr.size()&&(j==arrb.size()||arr[i]<arrb[j])){
			ret.push_back(arr[i++]);
		}else{
			ret.push_back(arrb[j++]);
		}
	}
	return ret;
}
vector<int> merge_sort(vector<int> v){
	if(v.size()==1)return v;
	vector<int> arr(v.begin(),v.begin()+v.size()/2);
	vector<int> arrb(v.begin()+v.size()/2,v.end());
	return merge(merge_sort(arr),merge_sort(arrb));
}
```

STL中提供了 `stable_sort` 函式，如果遇到相同優先度的元素，會保持原本的順序，所以採用的是合併排序法。

然而因為採用遞迴的方式，會犧牲較多的空間，需考量到遞迴過深的問題。

## 快速排序

快速排序同樣採用分治法，是目前認為效率極高的算法。

原理是選數組中的一個數當基準，逐一檢查數組中的數，比基準小的放在左邊，比基準大的放在右邊，再分成兩邊重複步驟直到排序完。

通常會選擇數組中的第一個數當基準，但也可以選擇中間的數或是隨機的數。

平均時間複雜度為 $O(nlog\ n)$。

```cpp
void quickSort(int arr[], int l, int r) {
	if (l >= r) return;
	int i = l, j = r, pivot = arr[l];
	while (i < j) {
		while (i < j && arr[j] >= pivot) j--;
		if (i < j) arr[i++] = arr[j];
		while (i < j && arr[i] <= pivot) i++;
		if (i < j) arr[j--] = arr[i];
	}
	arr[i] = pivot;
	quickSort(arr, l, i - 1);
	quickSort(arr, i + 1, r);
}
```

## STL

在C++，有函數 `sort()` 可以直接排序，而這個函式的實作通常是快速排序法，但當數組過於複雜時會改用其他排序法(合併排序、堆積排序、混合排序等等，有興趣可自行搜尋)。

以遞增排序為例，原理是先從資料群選一個基準點，  
然後從資料兩邊往中間搜，若右邊比基準點小且左邊比基準點大，就將左右邊互換，  
直到左右邊相遇，將相遇的點與基準點互換。

複雜度是$O(nlogn)$。

我們用random_shuffle()這個函數來打亂區間。

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
