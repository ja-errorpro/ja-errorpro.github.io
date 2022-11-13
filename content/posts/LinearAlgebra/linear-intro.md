---
title: 線性代數筆記-線性方程系統簡介
tags:
  - linear algebra
url: "/posts/LinearAlgebra/linear-intro/"
---

[線性代數筆記-目錄](/posts/LinearAlgebra/index/)

注意：以下所有行(columns)、列(rows)的定義皆以台灣的表示法為主，即行為直向，列為橫向

# 線性方程式

## 線性方程式

在二維直角座標系中，一個直線方程式可表示為 $ax+by=c$ ($a$, $b$ 不全為 $0$)

而在三維直角座標系中，一個平面方程式可表示為 $ax+by+cz=d$ ($a$, $b$, $c$ 不全為 $0$)

所以我們可以將線性方程式一般化，為了表示 $n$ 維 ($n$ 個變數) 的線性方程式，

將 $n$ 個變數分別表示為 $x_1, x_2, \cdots, x_n$，並將 $n$ 個係數分別表示為 $a_1, a_2, \cdots, a_n$，

則 $n$ 維線性方程式可表示為 $a_1x_1+a_2x_2+\cdots+a_nx_n=c$ ($a_1, a_2, \cdots, a_n$ 不全為 $0$)

或是 $ \sum^n_{i=1} a_i x_i = c$。

如果 $c$ 為 $0$，$ \sum^n_{i=1} a_i x_i = 0$，稱為 $x_1, x_2, \cdots, x_n$ 的**齊次線性方程式**。

---

# 線性方程系統

## 線性方程系統

有限個數的線性方程式集合，稱為線性方程系統(system of linear equations)或線性系統(linear system)。

  * 一 $n$ 個未知數的線性系統的解可寫成 $(s_1, s_2, \cdots, s_n)$，可使得 $n$ 個方程式同時成立。
  * 每個線性系統只會有：唯一解、無解、無限多解。
  * 如果沒有解，稱此線性系統為**矛盾方程組**、**非一致性**(inconsistent)。
  * 如果有解，稱此線性系統為**相容方程組**、**一致性**(consistent)。

## 增廣矩陣(Augmented matrix)

$$\begin{array}{} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\\ \vdots \\\ a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m\end{array}$$

把每項係數寫成矩陣，簡化表示

$$ \left[ \begin{array}{cccc|c} a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\\ a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\\ \vdots & \vdots & \ddots & \vdots & \vdots \\\ a_{m1} & a_{m2} & \cdots & a_{mn} & b_m \end{array} \right] $$

## 列運算(Row operation)

解線性方程組，對增廣矩陣的列進行一些操作，更容易找出解。

  * 交換兩列
  * 將某列乘上一個非零常數
  * 將某列乘上一個非零常數後加到另一列

[下一篇-消去法](/posts/LinearAlgebra/linear-elimination-methods/)