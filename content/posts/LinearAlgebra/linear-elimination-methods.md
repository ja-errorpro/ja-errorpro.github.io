---
title: 線性代數筆記-消去法
tags:
  - linear algebra
keywords:
  - gaussian elimination
  - linear algebra
  - row reduction
  - matrix
  - system of linear equations
  - 高斯消去法
  - 線性代數
  - 列運算
  - 矩陣
  - 梯形矩陣
url: "/posts/LinearAlgebra/linear-elimination-methods/"
---

[線性代數筆記-目錄](/posts/LinearAlgebra/index/)

[上一篇-線性方程系統簡介](/posts/LinearAlgebra/linear-intro/)

# 高斯消去法(Gaussian elimination)

## 梯形(Echelon form)

- 如果有以下性質，稱為簡化列梯形(reduced row-echeleon form)：
  - 若該列並非全為 $0$，則該列第一個非零元素為 $1$(leading 1)。
  - 若該列全為 $0$，則必須被放在矩陣的最下方。
  - 對於連續兩個非零列，較低列的 leading 1 必須在較高列的 leading 1 的右邊。
  - 每一行除了 leading 1 之外，其餘元素皆為 $0$。
- 如果只滿足前三項，稱為列梯形(row-echeleon form)。
- 簡化列梯形有列梯形的性質，但不一定相反。

以下為簡化列梯形的例子：

$ \begin{bmatrix} 1 & 0 & 0 & 0 \\\ 0 & 1 & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ 0 & 0 & 0 & 1 \end{bmatrix} $
$ \begin{bmatrix} 1 & 0 & 0 & a \\\ 0 & 1 & 0 & b \\\ 0 & 0 & 1 & c \\\ 0 & 0 & 0 & 0 \end{bmatrix} $

以下為列梯形的例子：

$ \begin{bmatrix} 1 & a & b & c \\\ 0 & 1 & d & e \\\ 0 & 0 & 1 & f \\\ 0 & 0 & 0 & 1 \end{bmatrix} $

## 消去法(Elimination Methods)

### 高斯-喬登消去法(Gauss-Jordan elimination)

把矩陣轉成簡化列梯形

在把leading 1上方的元素都變成$0$的階段為**反向階段(backward phase)**。

### 高斯消去法(Gaussian elimination)

把矩陣轉成列梯形

把leading 1下方的元素都變成$0$的階段為**正向階段(forward phase)**。

### 逆向帶入(Backward substitution)

- 用於求解簡化列梯形的線性方程系統。
- 由最後一個方程開始，往前帶入求解。
- 若有自由變數，則配任意值，求通解。

## 齊次方程系統(Homogeneous linear equations)

- 常數項都是 $0$
- 一定有 $(0,0,...,0)$ 的解，稱為**顯解(Trivial solution)**。
- 如果有其他解，稱為**隱解(Non-trivial solution)**。
- 此系統只有兩種可能：
  - 有無限多解
  - 只有顯解

## 未知數的線性系統

- 如果簡列梯形的leading 1 對應該未知數，稱為**領導變數(leading variable)**。
- 其他稱為**自由變數(free variable)**。
- 領導變數的數量稱為**此系統的階或秩(rank)**。

## PS

- 每個矩陣的簡化列梯形都是唯一的，列梯形不唯一。
- 所有矩陣的列梯形有同數量、同位置的零列與leading 1。

[下一篇-矩陣與矩陣運算](/posts/LinearAlgebra/linear-matrix-operations)
