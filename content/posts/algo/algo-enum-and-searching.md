---
title: 算法筆記-枚舉與二分搜尋
tags: 
  - algorithms
---

* [算法筆記目錄](/posts/algo-index/)

# 枚舉與搜尋

## 枚舉

枚舉，就是把全部或部分可能的情況都列出來，然後一個一個檢查是否符合條件，又稱窮舉。

雖然枚舉通常沒辦法在短時間內解決整個問題，但可以透過解決小問題來找到大問題的規律，或是用於檢驗時間複雜度較低的做法是否正確。

### 例題一

給一正整數 $n$，求 $n$ 的所有因數。

我們枚舉所有不超過 $n$ 的正整數，檢查每個數字是否為 $n$ 的因數，時間複雜度為 $O(n)$。

```cpp
long long n;
cin >> n;
for (long long i = 1; i <= n; i++) {
    if (n % i == 0) {
        cout << i << endl;
    }
}
```

這個方法雖然確實可以求出所有因數，但效率不夠好，考慮 $n$ 的因數都不會超過 $\sqrt{n}$，所以我們只需要枚舉到 $\sqrt{n}$ 即可，時間複雜度 $O(log\ n)$。

```cpp
long long n;
cin >> n;
for (long long i = 1; i * i <= n; i++) {
    if (n % i == 0) {
        cout << i << endl;
        if (i * i != n) {
            cout << n / i << endl;
        }
    }
}
```

這裡使用 $i \times i \le N $ 而不用 $ i \le sqrt(N) $ 的原因是避免浮點數的捨位誤差。

### 例題二

給一個整數數組 `nums` 和一個整數目標值 `target`，請你在該數組中找出和為目標值的那兩個整數，並返回他們的數組下標。 (Leetcode 1 - Two sum)

枚舉做法是枚舉所有可能的兩個數字，檢查它們的和是否為 `target`，時間複雜度為 $O(n^2)$。

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}
```

## 遞迴枚舉

遞迴，就是 function 呼叫他自己，而遞迴枚舉就是用遞迴的方式來枚舉。

### 例題

八皇后問題，給一個 $n \times n ( 0 < N \le 15)$ 的棋盤，請問有多少種方法可以在棋盤上放置 $n$ 個皇后，使得任意兩個皇后都不會互相攻擊，皇后可以攻擊同一行、同一列、同一斜線上的任意一個棋子。


未優化的作法是枚舉 $n$ 個皇后在 $n^2$ 格的每個位置，共 $C^{n^2}_n$ 種，但我們的 $n$ 高達 $15$，所以有 $C^225_15$ 種，非常沒有效率。因為每列最多只有一個皇后，改枚舉每個皇后在每列的位置，同理每行只有一個皇后，因此有 $n!$ 種，但我們的 $n$ 高達 $15$，所以有 $15!$ 種，還是非常沒有效率。

#### 剪枝

枚舉每一列的位置，需要判斷有沒有同行外，也要判斷兩個方向的對角線上是否有皇后，如果同行或同斜線上有的話就不用繼續枚舉了，這種減少不必要的枚舉的方法叫做剪枝。

```cpp
int n, ans=0, col[20], visited[2][100];
// col[i] = j 表示第 i 列的皇后在第 j 行
// visited[0][i], visited[1][i] 表示第 i 條斜線上有沒有皇后
void solve(int now){
    if(now==n){
        ans++;
        return;
    }
    for(int i=0; i<n; i++){
        if(col[i] || visited[0][now+i] || visited[1][now-i+n]) continue;
        col[i] = visited[0][now+i] = visited[1][now-i+n] = 1;
        solve(now+1);
        col[i] = visited[0][now+i] = visited[1][now-i+n] = 0;
    }
}
```

## 位元枚舉

我們可以用位元來表示一個集合

  * 空集合 = 0
  * 宇集合(全部) = ${2^n-1}_{10}$ = (1<<n)-1
  * 加入一個元素到集合 S
    * S = S | (1<<i)
  * 刪除一個元素從集合 S
    * S = S & ~(1<<i)
  * 集合內是否有元素 i
    * S & (1<<i)

### 例題

枚舉 $n$ 個物品要拿還是不拿的所有可能

顯然每個物品只有兩種狀態，共 $2^n$ 種。

```cpp
for(int i=0; i<(1<<n); i++){
    for(int j=0; j<n; j++){
        cout << ((i>>j)&1) << " ";
    }
    cout << endl;
}
```

## 排列枚舉

STL 中有兩個函式可以幫助我們枚舉排列

  * next_permutation(begin, end)
  * prev_permutation(begin, end)

會根據字典序來枚舉

## 二分搜尋

二分搜尋是在 **經過排序的數列** 中找到答案，流程如下

```cpp
int l = 0, r = n-1; // 設定左右邊界
while(l<r){
    int mid = l+(r-l)/2; // 設定中間點，把 (l+r)/2 改成這樣可以避免 overflow
    if(中間點的值比目標還大){
        l = mid+1; // 答案在右邊，左半邊不用看了
    }else{
        r = mid; // 答案在左邊，右半邊不用看了
    }
}

```

對於左右邊界怎麼設定，看個人習慣(是否包含左右邊界)，我們可以設定成

  * 左邊界為最小值，右邊界為最大值
  * 左邊界為最小值，右邊界為最大值+1
  * 左邊界為最小值-1，右邊界為最大值

只要選擇一種習慣的方式就好，只要注意邊界條件和最後的答案在哪裡就好。

這樣比起我們一個一個遍歷數列，降到了 $O(logn)$ 的時間複雜度，是非常高效的算法。

### 例題

猜數字，範圍 $[1, 10^6]$，每次猜一個數字，如果猜錯了就會告訴你猜的數字是比答案大還是小，必須在 $25$ 次以內猜出答案。

顯然不能一個一個猜，利用二分搜尋，不會超過 $25$ 次。

```cpp
int l = 1, r = 1e6+1;
while(l<r){
    int mid = l+(r-l)/2;
    cout << mid << endl;
    string s;
    cin >> s;
    if(s=="<"){
        r = mid;
    }else{
        l = mid+1;
    }
}
cout << "! " << l-1 << endl;
```

### STL的二分搜

STL 中有一個函式可以幫助我們找到一個數字在可隨機存取的資料結構中的位置

  * lower_bound(begin, end, target)，找到第一個大於等於 target 的數字的位置
  * upper_bound(begin, end, target)，找到第一個大於 target 的數字的位置

注意如果是 set 或 map，應使用 s.lower_bound(target) 或 s.upper_bound(target) 呼叫。
