---
title: 【CTF】密碼學-RSA加密演算法
date: 2023-11-03
tags:
  - ctf
  - crypto
---

# RSA加密演算法

## 簡介

* 由三位數學家Rivest、Shamir、Adleman所提出，RSA就是他們的姓氏第一個字母組成的。
* 非對稱加密演算法(公鑰加密演算法)。
* 一般有1024、2048、4096位的金鑰長度，位是二進位位元數

## 生成金鑰過程

1. 選兩個質數$p$、$q$，$p\neq q$。
2. 算 $\phi(pq) $，其中 $\phi(n)$ 為歐拉函數，表示小於 $n$ 且與 $n$ 互質的正整數個數，歐拉定理 $\phi(pq) = (p-1)(q-1)$。
3. 選一個數 $e$，使 $1 \leq e \leq \phi(pq)$ 且 $e$ 與 $\phi(pq)$ 互質。
4. 找一個數 $d$，使 $ed \equiv 1 \pmod{\phi(pq)}$，即 $ed$ 除以 $phi(pq)$ 的餘數 $ = 1$。
4-1. 這步就是在求 $e$ 關於 $\phi(pq)$ 的模逆元，可以用擴展歐幾里得法求，參考：[算法筆記-數論](/posts/1/algo-number-theory/#貝祖定理bezouts-thm)
5. $p$、$q$、$e$ 組成公鑰 $(n,e)$，$p$、$q$、$d$ 組成私鑰 $(n,d)$。

## 加密過程

1. 將明文字串 $m$ 轉換成數字(ASCII)陣列。
2. 一個數一個數加密，設數字為 $x$，計算 $x^e\ mod\ n$，得到密文。
3. 把這些密文再組合起來

## 解密過程

1. 把密文拆開，一個數一個數解密，設數字為 $y$，計算 $y^d\ mod\ n$，得到明文。
2. 把這些明文再組合起來

## 攻擊

[gmpy2](https://github.com/aleaxit/gmpy)
[線上分解n](http://factordb.com)
[RSACTFTool](https://github.com/RsaCtfTool/RsaCtfTool)

### 餘數分解
* 已知$e$、$p$、$q$，求 $d$

```py
import gmpy2
d = gmpy2.invert(e, (p-1)*(q-1))
```

* 已知$e$、$p$、$q$、$c$ (密文)，求 $m$

```py
import gmpy2
L = (p-1)*(q-1)
d = gmpy2.invert(e, L)
m = pow(c, d, p*q)
```

### 因數分解
* 如果 $n$ 可以輕易被因數分解，就算得出 $d$，私鑰可破解。(p, q差太多或太小)

### 共模攻擊
* 明文、$n$ 相同，$e$、$c$ 不同，兩個 $e$ 互質，可以直接解明文。
```py
# gcd(e1, e2) = 1
# => e1*x + e2*y = 1
m = pow(c1, x, n) * pow(c2, y, n) % n
```

### 廣播攻擊
* 明文、$e$ 相同，$n$ 不同，使用中國剩餘定理求明文。

### 小指數攻擊
* $e$ 太小(=3)，可以直接開 $e$ 次根號，得到明文。
* $n$ 不同，$e$ 相同且太小，使用中國剩餘定理後，可以直接開 $e$ 次根號，得到明文，或是直接爆破求解。

### 低解密指數攻擊(Wiener's attack)
* $e$ 太大或太小，可以快速求 $d$。

### dp, dq
* 已知 $p$、$q$、$dp$、$dq$、$c$，求 $m$
* $dp = d\ mod\ (p-1)$，$dq = d\ mod\ (q-1)$

```py
InvertQ = gmpy2.invert(q, p)
m1 = pow(c, dp, p)
m2 = pow(c, dq, q)
h = (InvertQ*(m1-m2)) % p
m = m2 + h*q
```

### CopperSmith 定理攻擊

### 高位已知分解攻擊

### 部分私鑰已知攻擊

### 選擇密文攻擊

### 量子演算法爆破(Shor's algorithm)
* 加速因數分解

## 傳統作法(Pollard Rho)
1. 選一個數 $a$，$a<n$
2. 計算 $gcd(a,n)$，如果 $gcd(a,n) \neq 1$，找到因數，分解結束。
3. 否則找函數 $f(x) = a^x\ mod\ n$ 的週期
4. 如果週期是奇數，回到步驟1
5. 如果 $a^{週期/2} \equiv -1 \pmod{n}$，回到步驟1
6. $gcd(a^{週期/2}+1,n)$ 和 $gcd(a^{週期/2}-1,n)$ 至少有一個是 $n$ 的非平凡因數，分解結束。

## 量子作法
* Pollard Rho 的量子特化版本
* 可以同時算 $a^x$，會得到很多餘數相同的疊加態，且每個之間相差一定週期
* 用傅立葉轉換觀察頻率(1/週期)，破解加密。

---

## 參考資料

[CTF wiki](https://ctf-wiki.org/crypto/asymmetric/rsa/rsa_theory/)

[Wikipedia - Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm)

[OI Wiki](https://oi-wiki.org/math/number-theory/pollard-rho/)



