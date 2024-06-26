---
title: 算法筆記-進階資料結構
tags: 
  - algorithms
keywords:
---

* [算法筆記目錄](/posts/algo-index/)

# 進階資料結構

## 二元搜尋樹

```
某棵樹滿足以下條件可稱為二元搜尋樹
* 為一棵 Binary Tree
* 對任一節點 $i$，其左子樹所有值小於它，且右子樹所有值大於它
* 沒有鍵值相同的節點
```

## 實作

### 插入節點

1. 如果 root 為空就填進去
2. 跟 root 比較，如果比較小就往左，比較大就往右

### 搜尋

跟新增差不多，比較小往左，比較大往右，經過的時候順便檢查當前是否為搜尋目標

### 刪除節點

先找到要刪的節點

如果它沒有子節點，直接刪掉就好

如果它只有一個子節點，把該子節點跟親代節點連起來就好

如果它有兩個子節點，找到右子節點的最小值(或左子節點的最大值)替補上去就好。
