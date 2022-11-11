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

## 快速幂取模

當我們想快速計算 $a^n\ mod\ m$ 時，利用快速冪可以在 $O(logn)$ 的時間內完成。

### 快速冪

在計算 $a^n$ 時，可以透過遞迴的概念，先算出 $a^n-1$ ，然後乘上 $a$，

而快速冪是將 $a^n$ 拆成 $a^\frac{n}{2} \times a^\frac{n}{2}$，如果 $n$ 是奇數就拆成 $a * a^{\lfloor \frac{n}{2}\rfloor } \times a^{\lfloor \frac{n}{2}\rfloor }$，這樣下去遞迴，便可以從 $O(n)$ 降到 $O(log\ n)$

#### 遞迴版本

```cpp
#define ll long long
// 快速冪(不取模)
ll fast_pow(ll a, ll n){ // 遞迴版
    if(!n) return 1;
    if(n&1) return fast_pow(a,n-1) * a;
    else {
        ll r = fast_pow(a,n/2);
        return r * r; 
    }
    // 注意不要直接return fast_pow() * fast_pow();
    // 否則會多算一次讓複雜度退化為 O(n)
}
ll fast_pow2(ll a, ll n){ // 迴圈版
    ll ret = 1;
    while(n){
        if(n&1) ret *= a;
        n >>= 1;
        a *= a;
    }
}
```

而為了防止溢位，我們先模再乘然後再模

```cpp
#define ll long long
// 快速冪取模
ll fast_pow_mod(ll a, ll n, ll m){ // 遞迴版
    if(!n) return 1;
    if(n&1) return fast_pow(a,n-1) * a % m;
    else {
        ll r = fast_pow(a,n/2) % m;
        return r * r % m; 
    }
}
ll fast_pow_mod2(ll a, ll n, ll m){ // 迴圈版
    ll ret = 1;
    while(n){
        if(n&1) ret = ret * a % m;
        n >>= 1;
        a = a * a % m;
    }
}
```

## 最大公因數

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

化簡後得 $ax_1 + by_1 = ay_2 + b(x_2 - \lfloor \frac{a}{b} \rfloor y_2 ) $，

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

如果怕麻煩當然也可以寫成迴圈，或是用 reference 傳 $x,y$

## 質數

如果 $p$ 的正因數只有 $1$ 和 $p$，則可說 $p$ 為質數。

現在我們寫一個很基本但暴力的質數判斷，複雜度 $O(n)$

```cpp
bool isPrime(int n){
    if(n<2) return false;
    for(int i=2;i<=n;i++)
        if(n%i==0) return false;
    return true;
}
```

為了提高效率，其實只要判斷到 $\sqrt{n}$ 就好，複雜度 $O(\sqrt{n})$

```cpp
bool isPrime(int n){
    if(n<2) return false;
    for(int i=2;i*i<=n;i++)
        if(n%i==0) return false;
    return true;
}
```

而另一種經典寫法就是 埃拉托斯特尼篩法(Eratosthenes)，複雜度 $O(n\log\log n)$

```cpp
bool isPrime[N];
void eratosthenes(){
    fill(isPrime,isPrime+N,true);
    isPrime[0] = isPrime[1] = false;
    for(int i=2;i*i<N;i++){
        if(isPrime[i]){
            for(int j=i*i;j<N;j+=i)
                isPrime[j] = false;
        }
    }
}
```

但埃氏篩法有個問題是一個合數可能會被很多質數檢查，我們想要它只會被最小的質因數篩到。我們枚舉每個數，如果它沒被篩掉，就丟進質數表，然後枚舉質數表，把質數表的每個質數乘上這個數，並且把它標記為已經被篩掉，這樣就可以保證每個合數只會被最小的質因數篩到。

此算法的複雜度為 $O(n)$，而且可以順便算出每個數的最小質因數，

稱為線性篩法，在之後的歐拉函數與Mobius函數之類的積性函數可以使用。

```cpp
int minPrime[N];
vector<int> primes;
void linearSieve(){
    for(int i=2;i<N;i++){
        if(!minPrime[i]){
          primes.push_back(i);
          minPrime[i] = i;
        }
        for(int p:primes){
            if(i*p>=N) break;
            minPrime[i*p] = p;
            if(i%p==0) break;
        }
    }
}
```

## 中國剩餘定理

<<孫子算經>>：`有物不知其數，三三數之賸二，五五數之賸三，七七數之賸二，問物幾何？` 

翻成白話文就是求 $x$ 滿足 

$$ \left\\{ \begin{aligned} x \equiv 2 \pmod 3 \\\ x \equiv 3 \pmod 5 \\\ x \equiv 2 \pmod 7 \end{aligned} \right. $$

而這題不只有一個答案

### 解法

假設 $x = a + b + c$，滿足

$$ \left\\{ \begin{aligned} a \equiv 2 \pmod 3 \\\ a \equiv 0 \pmod 5 \\\ a \equiv 0 \pmod 7 \end{aligned} \right. $$

$$ \left\\{ \begin{aligned} b \equiv 0 \pmod 3 \\\ b \equiv 3 \pmod 5 \\\ b \equiv 0 \pmod 7 \end{aligned} \right. $$

$$ \left\\{ \begin{aligned} c \equiv 0 \pmod 3 \\\ c \equiv 0 \pmod 5 \\\ c \equiv 2 \pmod 7 \end{aligned} \right. $$

可以發現 $a$ 是 $5$ 跟 $7$ 的公倍數，
$b$ 是 $3$ 跟 $7$ 的公倍數，
$c$ 是 $3$ 跟 $5$ 的公倍數，

$a = 35p \equiv 2 \pmod 3$，$p$ 可為 $1$，
$b = 21q \equiv 3 \pmod 5$，$q$ 可為 $3$，
$c = 15r \equiv 2 \pmod 7$，$r$ 可為 $2$。

因此 $x$ 其中一解為 $35 \times 1 + 21 \times 3 + 15 \times 2 = 128$，

而我們想找通解，就取 3 5 7 的最小公倍數 105 乘上參數 t，

通解為 $128+105t$，

當 t=-1 時，$x = 23$ 為最小解。

### 主定理

如果 $m = m_1m_2...m_n$ 且 $m_1$ 到 $m_n$ 兩兩互質，而一定有 $x$ 滿足 $x \equiv x_i \pmod {m_i}, \forall 1 \le i \le k$
