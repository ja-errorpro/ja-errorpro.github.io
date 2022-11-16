---
title: 算法筆記-數論
tags:
  - algorithms
---

* [算法筆記目錄](/posts/algo-index/)

## 什麼是數論

數學的分支，專門研究整數的性質。

---

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

---
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
    return ret;
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
    return ret;
}
```

---

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

---
## 質數

如果 $p$ 的正因數只有 $1$ 和 $p$，則可說 $p$ 為質數。

現在我們寫一個大家都會，已經熟悉到爛的質數判斷，複雜度 $O(n)$，稱為試除法

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

---

## 模逆元

模逆元就像倒數，因此又叫模倒數、模反元，若 $ab \equiv 1 \pmod n$，則 $a$ 與 $b$ 互為模 $n$ 的模逆元，記作 $a \equiv b^{-1} \pmod n$。

模逆元存在的充分必要條件為 $a$ 與 $n$ 互質，證明可使用貝祖定理。

### 求模逆元

可以使用擴展歐幾里得算法，求 $ax+bn=1$ 的 $x$，如果有解，則通解為 $x+kn$。

---

## 費馬小定理與質數檢驗

要判斷一個正整數 n 是不是質數，除了篩法跟試除法外，還有一個利用費馬小定理成功在 $O(log\ n)$ 內解決問題，

在了解這個算法之前，先看看什麼是費馬小定理。

### 費馬小定理

如果 $a$ 是整數， $n$ 是質數，則 $ a^{n-1} \equiv 1 \pmod n $ 一定成立，

注意這裡的關係是若 p 則 q，因此如果 $ a^{n-1} \equiv 1 \pmod n $ 成立， 那 n 不一定是質數，

如果 n 不是質數卻符合上述式子時，我們稱這個 n 為偽質數。

### Miller-Rabin

我們要試著利用費馬小定理檢驗質數，只要找一個 $a$ 使得 $a^{n-1}$ 與 $1$ 同餘就判定 $n$ 為質數

但偽質數的存在會讓演算法無法保證正確性，

而其實出錯的機率還滿低的，我們只要根據 $n$ 的範圍挑幾個 $a$ 去檢驗就可以保證不出錯了。

```cpp
// 如果 n < 2^32 則挑選 2, 7, 61
// 如果 n < 2^64 則挑選 2, 325, 9375, 28178, 450775, 9780504, 1595265022

# define ll long long
// 注意long long 乘法可能會溢位，那就需要自己寫乘法跟快速冪函數了
ll pow(ll a, ll n, ll m){ // 快速冪
    ll ret = 1;
    while(n){
        if(n&1) ret = ret * a % m;
        n >>= 1;
        a = a * a % m;
    }
    return ret;
}
bool miller_rabin(ll a,ll n){
    if(n<2) return true;
    if(n%2==0) return n!=2;
    a%=n;
    if(!a) return false;
    ll u = n-1, t=0;
    while(u&1){
        u/=2;
        t++;
    }
    ll x = pow(a,u,n);
    for(int i=0;i<t;++i){
        ll nx = x * x % n;
        if(nx==1 && x!=1 && x!=n-1) return true;
        x = nx;
    }
    return x!=1;

}


```

---

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

---

## 剩餘系

如果將一個整數集合裡的每個數模 $n$ 後的所有餘數重新建構新的集合，稱這個新集合為模 $n$ 的剩餘系。

### 完全剩餘系

如果一個整數集合裡的每個數模 $n$ 後兩兩不同餘，且大小為 $n\ (0 \sim n-1)$ 則稱這個集合為完全剩餘系。

#### 性質：

若有模 $n$ 的完全剩餘系 $r$ ， 對於任意的 $a \in \Bbb{Z}, b \in \Bbb{Z}$ 且 $gcd(a,n)=1$，則 $\left\\{ar_i + b, \forall 0 \le i \le n-1\right\\}$ 也是模 $n$ 的完全剩餘系。

#### 證明：

反證法，如果有 $ar_i + b \equiv ar_j + b \pmod n$，那麼 $n | a(r_i-r_j)$ ，但 $gcd(a,n)=1$，出現矛盾。

### 簡約(既約)剩餘系 (縮系)

從一個模 $n$ 的完全剩餘系中選幾個數構成子集合使得這幾個數都跟 $n$ 互質，則這個子集合稱為模 $n$ 的既約剩餘系。

---

## 歐拉函數與歐拉定理

### 歐拉函數

定義歐拉函數 $\varphi(n)$ 為小於 $n$ 且與 $n$ 互質的數的個數，就是 $1$ 到 $n-1$ 中有多少個數與 $n$ 互質。

#### 引理：

  1. 如果 $p$ 是質數，則 $\varphi(p) = p-1$。
  2. 如果 $p$ 是質數，則 $\varphi(p^k) = p^{k-1}(p-1)$。
  3. 如果 $m$ 與 $n$ 互質，則 $\varphi(mn) = \varphi(m)\varphi(n)$。
  4. 模 $n$ 的既約剩餘系大小就是 $\varphi(n)$。

現在把正整數 $n$ 做質因數分解

若 $n = p_1^{c_1}p_2^{c_2}...p_n^{c_n}$

，根據引理得 

$$\varphi(n) = \varphi(p_1^{c_1})\varphi(p_2^{c_2})... \varphi(p_k^{c_k}) \\\ = p_1^{c_1-1}(p_1-1)p_2^{c_2-1}(p_2-1) \cdots p_k^{c_k-1}(p_k-1) = n \prod_{p | n}(1-\frac{1}{p})$$。

### 歐拉定理

如果 $a$ 與 $n$ 互質，則 $a^{\varphi(n)} \equiv 1 \pmod n$，如果 $n$ 是質數，證明了前面[費馬小定理](#費馬小定理)。

---

# 歐拉定理與費馬小定理皆可處理大數問題

---

## 原根

對於 gcd(a,n)=1 的正整數 a，如果 d 是最小的正整數，使得 $a^d \equiv 1 \pmod n$，則稱 d 是 a 在模 n 下的階，記做 $ord_n(a)$，且 $ord_n(a)$ 一定 $\le \varphi(n)$，而如果 $ord_n(a) = \varphi(n)$，則稱 a 為模 n 的原根。

---

## 多項式與卷積

### 波動

波動無時無刻都在我們身邊，所有的東西都在振動，振動可以用連續函數表示，
最平穩的振動就是正弦波，表示為 $sin(x)$，畫到圖上以 y 軸表示振福，x 軸表示時間。

### 波動快慢

我們用頻率來表示波動的快慢，頻率越高，波動越快。

比如聲音的頻率，人類聽覺能聽到的頻率範圍是 20Hz 到 20kHz，也就是 20 到 20000 個振動。

### 波動大小

我們用振幅來表示波動的大小，振幅越大，波動越大。

### 波動起點

我們用相位(Phase)來表示波動的起點。

### 波動疊加性

所有的波動都可以疊加，相同方向的波會相加，反則抵銷。

寫成數學式就是多個函數相加。

### 傅立葉轉換

此部分與 線性代數 較為相關，在 OI 上通常用於解多項式乘法問題。

[線性代數筆記](/posts/LinearAlgebra/linear-index)

由於波可以以時間角度來看，即以橫軸為時間，縱軸為振幅，但是也可以以頻率角度來看，即以橫軸為頻率，縱軸為振幅。

把時域轉換到頻域的過程就是傅立葉轉換，而我們也能反向轉換。

在了解傅立葉轉換前，需要了解一些先備知識。

### 單位根

假設我們已經知道複數。

對於 $x^n = 1$，則稱 $x$ 為 $n$ 次單位根。

對於一個 $n$ 次單位根，在複數平面就是把複數單位圓切成 $n$ 份，每個數 $w^k_n (k \in \left[ 0, n-1 \right])$

### 奇偶函數

  * 奇函數：$f(x) = -f(-x)$，比如 $sin(x)$
  * 偶函數：$f(x) = f(-x)$，比如 $cos(x)$

### 三角函數正交性

  * $sin(x)cos(x) = \frac{1}{2}sin(2x)$
  * $sin^2(x) + cos^2(x) = 1$
  * $sin(x)sin(y) + cos(x)cos(y) = \frac{1}{2}sin(x+y) + \frac{1}{2}sin(x-y)$
  * $sin(x)cos(y) - cos(x)sin(y) = \frac{1}{2}sin(x+y) - \frac{1}{2}sin(x-y)$
  * $sin(mx)cos(nx) = \frac{1}{2}sin(m+n)x + \frac{1}{2}sin(m-n)x$
  * $sin(mx)sin(nx) = -(\frac{1}{2}cos(m+n)x - \frac{1}{2}cos(m-n)x)$
  * $cos(mx)cos(nx) = \frac{1}{2}cos(m+n)x - \frac{1}{2}cos(m-n)x$
  * $e^{ix} = cos(x) + isin(x)$
  * $\int_{-\pi}^{\pi}sin(mx)cos(nx)dx = 0 (m \neq \pm n)$
  * $\int_{-\pi}^{\pi}sin(mx)sin(nx)dx = 0 (m \neq \pm n)$
  * $\int_{-\pi}^{\pi}cos(mx)cos(nx)dx = 0 (m \neq \pm n)$
  * $\int_{-\pi}^{\pi}sin(mx)cos(mx)dx = 0$
  * $\int_{-\pi}^{\pi}sin(mx)sin(mx)dx = \pi $
  * $\int_{-\pi}^{\pi}cos(mx)cos(mx)dx = \pi $

### 傅立葉級數

法國數學家、物理學家傅立葉宣稱任何週期函數 $f(x+T) = f(x)$ 皆可用傅立葉級數表示。(不正確)

而德國的數學家狄利克雷給了週期函數可轉成傅立葉級數的條件(Dirichelet's theorem)：

  * 函數必須有界，即 $\forall x, |f(x)| \le M$，其中 $M$ 為正實數。
  * 任意閉區間內除了有限個點外，函數必須連續。
  * 任意閉區間內，函數必須僅包含有限個極值。
  * 一週期內，$|f(x)|$ 積分必須收斂。

設週期函數 $f(x)$，週期為 $2\pi$。對任意整數 $n$，$f(x) = f(x+2n\pi)$，我們可以選擇考慮區間 $\left[ 0,2\pi \right]$，也可以考慮 $\left[ -\pi,\pi \right]$。

因為函數可以分解成奇偶函數的和，現在有一個由多個 $cos(x)$ 函數與 $sin(x)$ 函數疊合而成的函數

$T(x) = c_0 + c_1cos(x) + c_2cos(2x) + \cdots + c_n cos(nx) + d_1 sin(x) + d_2 sin(2x) + \cdots + d_n sin(nx)$

這種形式的函數稱為三角多項式(trigonometric polynomial)，如果 $c_n, d_n \neq 0$，則 $T(x)$ 為 $n$ 階。

接著我們考慮區間 $\left[ 0,2\pi \right]$，$W$ 為 $C\left[a,b\right]$ 中有限維度的子空間，對連續函數 $f$ 做近似，即 $f$ 在 $W$ 的正交投影，設 $W$ 的正則基底為 $\left\\{ g_0,g_1,\cdots,g_n \right\\}$，則 $f$ 在 $W$ 的正交投影為 

$ proj_{W} f = \langle f,g_0 \rangle g_0 + \langle f,g_1 \rangle g_1 + \cdots + \langle f,g_n \rangle g_n$。

$W$ 的正則基底可以對 $1,cos(x),cos(2x),\cdots,cos(nx),sin(x),sin(2x),\cdots,sin(nx)$ 進行正交化，得到正則基底 

$$ g_0 = \frac{1}{\sqrt{2\pi}}, g_1 = \frac{1}{\sqrt{\pi}} cos(x), g_2 = \frac{1}{\sqrt{\pi}} cos(2x), \cdots, g_n = \frac{1}{\sqrt{\pi}} cos(nx), g_{n+1} = \frac{1}{\sqrt{\pi}} sin(x), g_{2n} = \frac{1}{\sqrt{\pi}} sin(nx)$$

定義係數 

$a_0 = \frac{2}{\sqrt{2\pi}}\langle f,g_0 \rangle, a_1 = \frac{1}{\sqrt{\pi}}\langle f,g_1 \rangle , \cdots , a_n = \frac{1}{\sqrt{\pi}}\langle f,g_n \rangle$

$b_1 = \frac{1}{\sqrt{\pi}}\langle f,g_{n+1} \rangle , \cdots , b_n = \frac{1}{\sqrt{\pi}}\langle f,g_{2n} \rangle$

代入原正交投影式，得

$ proj_{W} f = \frac{a_0}{2} + \left\[ a_1 cos(x) + \cdots + a_n cos(nx) \right\] + \left\[ b_1 sin(x) + \cdots + b_n sin(nx) \right\]$

就是我們常看到的 $F_n(x) = \frac{a_0}{2} + \sum_{k=1}^{n} (a_k cos(kx) + b_k sin(kx))$

其中 $a_k,b_k$ 稱為傅立葉係數，

$a_k = \frac{2}{\pi}\int_{0}^{2\pi} f(x) cos(kx) dx$

$b_k = \frac{2}{\pi}\int_{0}^{2\pi} f(x) sin(kx) dx$

$F_n(x)$ 稱為傅立葉級數。

剛剛我們將函數的週期設為 $2\pi$，現在我們將週期設為 $2\pi T$，考慮區間 $\left\[ \frac{-T}{2}, \frac{T}{2} \right\]$，變數變換 $\frac{t}{T} = \frac{x}{2\pi}$，

$x = \frac{2\pi t}{T}$，代入傅立葉級數 $F(x)$，得

$\large{F(x) = \frac{a_0}{2} + \sum_{k=1}^{\infty} (a_k cos(k\frac{2\pi t}{T}) + b_k sin(k\frac{2\pi t}{T}))}$

$\large{a_k = \frac{2}{T} \int_\frac{-T}{2}^\frac{T}{2} f(t) cos(\frac{2\pi kt}{T}) dt, k=0,1,2,\cdots }$

$\large{b_k = \frac{2}{T} \int_\frac{-T}{2}^\frac{T}{2} f(t) sin(\frac{2\pi kt}{T}) dt, k=1,2,\cdots }$

我們進一步利用歐拉公式 $e^{ix} = cos(x) + isin(x)$，將傅立葉級數改寫，

$\large{F(x) = \sum_{k=-\infty}^{\infty} c_k e^{ikx}}$

$\large{c_k = \frac{1}{T} \int_\frac{-T}{2}^\frac{T}{2} f(t) e^{\frac{-2\pi ikt}{T}} dt, k \in \mathbb{Z}}$

### 離散傅立葉轉換(DFT)

因為電腦只能處理離散的資料，所以要將連續的傅立葉級數轉換成離散的傅立葉級數，也就是積分變成求和，為了跟 $c_k$ 區分，用 $y_k$ 表示離散傅立葉轉換的結果

$\large{y_k = \sum_{j=0}^{n-1}x_j e^{\frac{-2\pi ikj}{n}}}$

回顧之前的單位根，可以將原根寫成

$\large{w_n^k = e^\frac{-2\pi ik}{n} = cos(\frac{2k\pi}{n}) + isin(\frac{2k\pi}{n})}$

將離散傅立葉轉換表示成矩陣形式 $y = Fx$，

$$ \left\[ \begin{matrix} y_0 \\\ y_1 \\\ y2 \\\ \vdots \\\ y_{n-1} \end{matrix} \right\] = \left\[ \begin{matrix} 1 & 1 & 1 & \cdots & 1 \\\ 1 & w_n^1 & w_n^2 & \cdots & w_n^{n-1} \\\ 1 & w_n^2 & w_n^4 & \cdots & w_n^{2(n-1)} \\\ \vdots & \vdots & \vdots & \ddots & \vdots \\\ 1 & w_n^{n-1} & w_n^{2(n-1)} & \cdots & w_{n}^{(n-1)^2} \end{matrix} \right\] \left\[ \begin{matrix} x_0 \\\ x_1 \\\ x_2 \\\ \vdots \\\ x_{n-1} \end{matrix} \right\]$$

$F$ 稱為傅立葉矩陣，而要逆變換時其實就是算 $F^{-1}y = x$，而接下來我們最後的目標就是要能快速算出矩陣乘法

### 多項式點值表示法

設一堆多項式

$$ \left\\{ \begin{align} & y_0 = a_0 + a_1x_0 + a_1x_0^2 + \cdots + a_nx_0^n \\\ & y1 = a_0 + a_1x_1 + a_2x_1^2 + \cdots + a_nx_1^n \\\ & y2 = a_0 + a_1x_2 + a_2x_2^2 + \cdots + a_nx_2^n \\\ \vdots \\\ & y_{n-1} = a_0 + a_1x_{n-1} + a_2x_{n-1}^2 + \cdots + a_nx_{n-1}^{n-1} \end{align} \right. $$

我們知道兩點構成一次函數，三點構成二次函數，所以 $n+1$ 個點構成 $n$ 次函數。

我們把 $x^n = 1$ 的單位根都代入多項式，看起來不就像剛剛的傅立葉矩陣嗎？

# 我們成功把物理的傅立葉轉換跟 OI 上的結合了！

### 快速傅立葉轉換

然而如果直接計算乘法的話，複雜度是 $O(n^2)$，

假設 $n = 2^k$，我們可以把函式拆成奇偶項，

$A(x) = (a_0 + a_2x^2 + a_4x^4 + \cdots + a_{n-2}x^{n-2}) + (a_1x + a_3x^3 + \cdots + a_n-1x^{n-1})$

設 $A_0 = (a_0 + a_2x + \cdots + a_{n-2}x^{\frac{n}{2}-1}),A_1 = (a_1 + a_3x + \cdots + a_{n-1}x^{\frac{n}{2}-1})$

得 $A(x) = A_0(x^2) + xA_1(x^2)$

寫成單位根的形式

$A(w_n^k) = A_0(w_n^{2k}) + w_n^kA_1(w_n^{2k})$

成功把計算量縮小一半，同理將 $A_0$ 和 $A_1$ 也拆成奇偶項，再用同樣的方法，在遞迴的底層(一個點)用 $O(n)$ 計算後往上合併，計算量縮小到 $O(nlogn)$。

```cpp
const double pi = acos(-1);
typedef complex<double> cd;
struct FFT{
    int n,rev[1<<20];
    cd w[1<<20];
    void init(int _n){
        this->n = _n;
        for(int i=0;i<_n;i++){
            w[i] = cd(cos(2*pi/_n*i),sin(2*pi/_n*i));
        }
        int lgn = __lg(_n);
        for(int i=0;i<_n;i++){
            int tmp = 0;
            for(int j=0;j<lgn;j++){
                if(i&(1<<j)) tmp |= (1<<(lgn-j-1));
            }
            rev[i] = tmp;
        }
    }
    void trans(vector<cd>& a, cd* w){
        for(int i=0;i<n;i++){
            if(i<rev[i]) swap(a[i],a[rev[i]]);
        }
        for(int i=2;i<=n;i<<=1){
            int mid = i>>1;
            int r = n/i;
            for(int j=0;j<n;j+=i){
                for(int k=0;k<mid;k++){
                    cd t = a[j+k+mid]*w;
                    a[j+k+mid] = a[j+k]-t;
                    a[j+k] += t;
                }
            }
        }
    }
    void fft(vector<cd>& a){
        trans(a,w);
    }
}
```