---
title: C++筆記-未定義行為
tags:
  - C-Cpp
url: "/posts/cpp/cpp-ub"
---

* [C++筆記-目錄](/posts/cpp-index)

## 未定義行為(Undeﬁned Behavior，簡稱 UB)

有時我們執行程式時，會發現程式的行為不是我們預期的，有時候就是未定義行為惹的禍。

## 一些例子

### 1. 順序未定義

考慮以下程式碼：

```c
int i = 10;
i = i++ + ++i;
```

這段的程式碼最後 i 值無法預期，因為沒有規定 i++ 和 ++i 哪個先執行，不一樣的編譯器可能會有不同的結果。

而像以下程式碼也是錯誤的寫法

```cpp
int arr[10];
int i = 0;
arr[i] = i++;
```

### 2. 除以零

```cpp
int a = 5;
int q = a / 0;
```

除以零是未定義行為，而在 float、double、long double 類型除以零的結果，根據 IEEE 754，可能是 inf 或 nan(Not A Number)。

### 3. 溢值

```cpp
int x = 2147483647; // 假設 32 位元
int y = x + 1;
```

### 4. 陣列越界

```cpp
int a[10];
a[10] = 0;
```

### 5. 修改字串常量

```cpp
char *p = "Hello";
p[0] = 'h';
```

應使用陣列或std中的string。

```cpp
char p[] = "Hello";
p[0] = 'h';
std::string q = "Hello";
q[0] = 'h';
```

### 6. 空指標取值

```cpp
int *p = nullptr;
*p = 0;
```

### 7. 標準庫函式的未定義行為

```cpp
int k = 0;
printf("%d %d", k++, k++);
```

```cpp
int k = 0;
printf("%d", &k); // 參數非預期型別
```

