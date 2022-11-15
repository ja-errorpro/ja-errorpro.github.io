---
title: 算法筆記-枚舉與搜尋
tags: 
  - algorithms
---

* [算法筆記目錄](/posts/1/algo-index/)

# 枚舉與搜尋

## 枚舉

枚舉，就是把全部或部分可能的情況都列出來，然後一個一個檢查是否符合條件。

雖然枚舉通常沒辦法在短時間內解決整個問題，但可以透過解決小問題來找到大問題的規律，或是用於檢驗時間複雜度較低的做法是否正確。

### 例題

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

