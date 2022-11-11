---
title: 算法筆記-數論
tags:
  - algorithms
---

* [算法筆記目錄](/posts/1/algo-index/)

## 什麼是數論

數學的分支，專門研究整數的性質。

## 模運算

### 同餘

$a \equiv b \pmod n $ 表示 $n\ |\ (a-b)$ ( $n$ 整除 $a-b$ )，稱 $a$ 與 $b$ 模 $n$ 同餘。

比如 

7 除以 3 餘 1

10 除以 3 餘 1

則可以說 $7 \equiv 10 \pmod 3$

#### 證明:


對於 $a \equiv b \pmod k $

令 $a = ks + r,\ b = kt + r$

兩式相減得 $a-b = k(s-t)$

證明結束


### 加乘法性質

如果 $a \equiv b \pmod n $, $c \equiv d \pmod n $

則

1. $a \pm c \equiv b \pm d \pmod n $

2. $ac \equiv bd \pmod n$

#### 證明:

對於1.， $a \equiv b \pmod n $, $c \equiv d \pmod n $，根據同餘定理可寫成 $a-b=nx$, $c-d=ny$，

相加整理後得 $(a+c) - (b+d) = n(x+y)$ ，證明結束。

對於2.，$a \equiv b \pmod n $, $c \equiv d \pmod n $，根據同餘定理可寫成 $a-b=nx$, $c-d=ny$，

相乘整理後得 $ac - bd = n(by+dx+nxy)$，一樣能表示成 $ac \equiv bd \pmod n$。

### 需要注意的地方

當我們在C++或其他大部分程式語言使用 % 時，a % b被定義成 a-(a/b)*b，

如果遇到負數時 -8 % 3 應為 1，但程式會算出 -2 ，因此需特別小心，或者寫成 ((a%b)+b)%b。

另外要注意的則是溢值，如果有加法或乘法時建議先mod後再加乘。


## 最大公因數與質數

### 因數

如果 $ a\ |\ b $，稱 $a$ 為 $b$ 的因數。

### 公因數與最大公因數(GCD)

如果 $k\ |\ a$ 且 $k\ |\ b$，則 $k$ 為 $a$ 和 $b$ 的公因數。

而如果這個 $k$ 是最大的就稱 $k$ 為最大公因數，記為 $gcd(a,b)$ 。

### 最大公因數性質

1. 結合律 $gcd(a,gcd(b,c)) = gcd(gcd(a,b),c)$
2. 交換律 $gcd(a,b) = gcd(b,a)$
3. $gcd(a,0) = |a|$
4. $gcd(a,b) = gcd(a,b-a) = gcd(a,b\ mod\ a)$

### 找到最大公因數

利用上面GCD性質的3,4，可以輕鬆算出最大公因數，即歐幾里得算法，或稱輾轉相除法，複雜度 $O(log(min(a,b)))$

```cpp
int gcd(int a,int b){
    return b?gcd(b,a%b):a;
}
```

### 貝祖定理(Bezout's thm)

對於所有整數a,b，存在兩個整數x,y使 $ax+by=gcd(a,b)$

告訴我們如果已知a,b，想求x,y使得$ax+by=gcd(a,b)$，可以利用遞迴求出 (b,a mod b)的答案後算出 (a,b)的答案，

設 $ax_1 + by_1 = gcd(a,b)$，$bx_2 + (a\ mod\ b)y_2 = gcd(b,a\ mod\ b)$，

又根據性質 $gcd(a,b) = gcd(b,a\ mod\ b)$，

得 $ax_1 + by_1 = bx_2 + (a\ mod\ b)y_2$，

改寫成 $ax_1 + by_1 = bx_2 + (a - \lfloor \frac{a}{b} \rfloor b )y_2$，

化簡後得 $ax_1 + by_1 = ay_2 + b(x_2 - \lfloor \frac{a}{b} \rfloor y_2 )$，

$(x_1,y_1)=(y_2,x_2 - \lfloor \frac{a}{b} \rfloor y_2)$

而這樣就很像歐幾里得算法的擴展版本，因此叫做擴展歐幾里得算法。

```cpp
// 回傳 (d,x,y) 滿足 ax+by=gcd(a,b) = d
tuple<int,int,int> ExtGcd(int a,int b){
    if(!b) return make_tuple(a,1,0);
    int d,x,y;
    tie(d,x,y) = ExtGcd(b,a%b);
    return make_tuple(d,y,x-(a/b)*y);
}
```

如果怕麻煩當然也可以寫成迴圈，或是用 reference 傳x,y

### 質數

如果 $p$ 的正因數只有 $1$ 和 $p$，則可說 $p$ 為質數。

...以下未完成