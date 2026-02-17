---
title: 線性代數筆記-矩陣與矩陣運算
tags:
  - linear algebra
keywords:
  - matrix operations
  - matrix multiplication
  - inverse matrix
  - transpose
  - linear algebra
  - 矩陣運算
  - 矩陣乘法
  - 反矩陣
  - 轉置矩陣
  - 線性代數
url: "/posts/LinearAlgebra/linear-matrix-operations"
---

[線性代數筆記-目錄](/posts/LinearAlgebra/index/)

[上一篇-消去法](/posts/LinearAlgebra/linear-elimination-methods/)

# 矩陣與矩陣運算(Matrices and Matrix Operations)

## 定義與表示法

- 矩陣是一堆數字的矩形陣列，陣列中的數字稱為矩陣的元素(entry)。
- 一個 $m \times n$ 的矩陣，可表示為 $A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\\ a_{21} & a_{22} & \cdots & a_{2n} \\\ \vdots & \vdots & \ddots & \vdots \\\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}$。
- 也可寫成 $[a_{ij}]_{m \times n}$。
- $a_{ij}$ 表為矩陣 $A$ 的第 $i$ 列第 $j$ 行的元素。

## 加減法

- 如果矩陣大小相同，則可進行加減法，將對應位置的元素相加減。

## 乘法

- 如果是純量乘上矩陣，則將矩陣中的每個元素乘上純量。
- 如果是 $A$ 是 $m \times r$ 矩陣，$B$ 是 $r \times n$ 矩陣，則 $AB$ 是 $m \times n$ 矩陣，$AB$ 的第 $i$ 列第 $j$ 行的元素為 $ \sum*{k=1}^r a*{ik}b\_{kj}$。
- 換句話說，
  - $AB$ 的第 $j$ 行 $ = A $ \[ $B$ 的第 $j$ 行\]，
  - $AB$ 的第 $i$ 列 $ = $ \[ $A$ 的第 $i$ 列\] $B$。
- 如果 $A$ 與 $B$ 的大小不是如同 $m \times r$ 與 $r \times n $ 的形式，則$AB$不存在。

## 線性系統的矩陣形式

$$\begin{array}{} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\\ \vdots \\\ a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m\end{array}$$

可寫成

$$\begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\\ a_{21} & a_{22} & \cdots & a_{2n} \\\ \vdots & \vdots & \ddots & \vdots \\\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix} \begin{bmatrix} x_1 \\\ x_2 \\\ \vdots \\\ x_n \end{bmatrix} = \begin{bmatrix} b_1 \\\ b_2 \\\ \vdots \\\ b_m \end{bmatrix}$$

$$Ax = b$$

$A$ 稱為係數矩陣(coefficient matrix)。

## 轉置矩陣(Transpose)

- $A$ 為 $m \times n$ 矩陣，則 $A$ 的轉置記作 $A^T$，是將 $A$ 的行列互換所得到的 $n \times m$ 矩陣。
- $A_{ij} = (A^T)_{ji}$

### 性質

- $(A^T)^T = A$。
- $(A \pm B)^T = A^T \pm B^T$
- $(kA)^T = k(A^T)$
- $(AB)^T = B^TA^T$。

## 跡(trace)

- 若 $A$ 為 $n \times n$ 方陣，則 $A$ 的跡為 $tr(A) = \sum_{i=1}^n a_{ii}$。
- $tr(A) = tr(A^T)$。
- $tr(AB) = tr(BA)$。

## 矩陣運算特性

- 假設矩陣皆可運算，$k,l$為純量，以下運算有效
- $A + B = B + A$(加法交換律)
- $(A + B) + C = A + (B + C)$ (加法結合律)
- $A(BC) = (AB)C$(乘法結合律)
- $A(B \pm C) = AB \pm AC$(左分配律)
- $(A \pm B)C = AC \pm BC$(右分配律)
- $k(A \pm B) = kA \pm kB$(純量矩陣乘法對矩陣加法分配律)
- $(k\pm l)A = kA \pm lA$
- $k(lA) = (kl)A$
- $k(AB) = (kA)B = A(kB)$

- 矩陣乘法不滿足交換律。

## 零矩陣

- 元素全為 $0$ 的矩陣。
- 零矩陣可表示為 $0$。
- 性質，$k$ 為純量
  - $A + 0 = 0 + A = A$。
  - $A - A = \textbf{0}$
  - $0A = 0$
  - 若 $kA = 0$，則 $k = 0$ 或 $A = \textbf{0}$。

## 消去律

- 如果兩個純量相乘為 $0$，則其中一個純量為 $0$。
- 如果對於純量$a,b,c$， $ab=ac (a \neq 0)$，則 $b=c$。
- 矩陣運算不成立。

## 單位矩陣(Identity Matrix)

- 對角線都是 $1$，其餘元素都是 $0$ 的方陣。
  - 記作 $I$ 或 $I_n$ 表示 $n \times n$ 的單位矩陣。
- $AI = IA = A$
- 若 $R$ 為方陣的簡化列梯形，則 $R$ 有零列 或 $R$ 是單位矩陣

## 反矩陣(Inverse)

- 若 $A$ 為方陣，如果有一個方陣 $B$，使得 $AB = BA = I$，則 $B$ 為 $A$ 的反矩陣，記作 $A^{-1}$。
- 如果找不到反矩陣，則 $A$ 為奇異矩陣(singular)或稱不可逆。
- 性質
  - 若 $B,C$ 都是 $A$ 的反矩陣，則 $B = C$。
  - $A = \begin{bmatrix} a & b \\\ c & d \end{bmatrix}$，若 $ad - bc \neq 0$，則 $A^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\\ -c & a \end{bmatrix}$，否則 $A$ 不可逆。

## 矩陣指數

- 若 $A$ 為方陣，$n > 0$，
  - $A^0 = I$
  - $A^n = AA \cdots A(n\ factors)$
- 若 $A$ 可逆，則 $A^{-n} = (A^{-1})^n$
- $A^r A^s = A^(r+s)$，$(A^r)^s = A^{rs}$
- 若 $A$ 可逆，則 $A^T$ 也可逆，且 $(AT)^{-1} = (A^{-1})^T$。
- $k$ 為純量，$kA$ 可逆，且 $(kA)^{-1} = \frac{1}{k}(A^{-1})$。

## 基本矩陣(Elementary Matrix)

- 若矩陣 $E$ 是透過單位矩陣進行一次列運算而得到的矩陣，則 $E$ 為基本矩陣。
- 若一個矩陣左乘一個基本矩陣，相當於對矩陣進行一次列運算。
- 所有基本矩陣均可逆。
- 若 $A$ 是 $n \times n$ 的矩陣，下列敘述等價
  - $A$ 可逆
  - $Ax=0$ 只有顯解
  - $A$ 的簡化列梯形是 $I_n$
  - $A$ 可用基本矩陣表示

### 基本矩陣求 $A^{-1}$

- $E_k \cdots E_2E_1A = I_n$
- 等號兩邊右乘 $A^{-1}$，得 $A^{-1} = E_k \cdots E_2E_1 I_n$

### 列運算求 $A^{-1}$

- 略
