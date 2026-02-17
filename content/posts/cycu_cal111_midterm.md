---
title: 中原111資工計概上學期期中機測
date: 2022-11-07
tags:
  - C-Cpp
  - mix
  - algorithms
keywords:
  - cycu
  - computer science
  - midterm exam
  - solution
  - c++
  - programming
  - algorithms
  - chung yuan christian university
  - freshman
  - 中原大學
  - 資工系
  - 計算機概論
  - 期中考
  - 考古題
  - 題解
  - 程式設計
  - 演算法
  - 大一
  - 程式解題
---

# (本人已放棄思考)

# 答案僅供參考

# 答案僅供參考

# 答案僅供參考

# 鬼才知道是不是正解

## pA
實作`NotLetter(char ch)` function，如果ch不是字母就回傳true，反則false。

```cpp
bool NotLetter(char ch){
    if(ch >= 'a' && ch <= 'z')
        return false;
    if(ch >= 'A' && ch <= 'Z')
        return false;
    return true;
}
```

補：事實上在 `ctype.h`已經有 `isalpha()` 可使用，但這裡不允許include其他東西。

## pB
實作`MonotonicIncreasing()` function，讀入若干個整數，直到-99999，如果數組(不含-99999)非單調遞增則回傳false，否則或如果只有一個數則回傳true。

```cpp
bool MonotonicIncreasing(){
    int n;
    scanf("%d", &n);
    while(n!=-99999){
        int m;
        scanf("%d", &m);
        if(m < n && m != -99999)
            return false;
        n = m;
    }
    return true;
}
```

## pC
實作`MonotonicSeries()` function，讀入若干個整數，直到-99999，如果數組(不含-99999)非單調遞增或遞減則回傳false，否則或如果只有一個數則回傳true。

```cpp
bool MonotonicSeries(){
    int n;
    scanf("%d", &n);
    int stat = 0;
    int cnt = 0;
    while(n!=-99999){
        int m;
        scanf("%d", &m);
        if(!cnt){
            stat = (m>n)?1:0;
            cnt++;
        }
            
        // stat = 1, increasing
        // stat = 0, decreasing
        if(m!=-99999&& stat && m < n)
            return false;
        else if(m!=-99999&& (!stat) && m > n )
            return false;
        n = m;

    }
    return true;
}
```

補： stat = (m>n)?1:0; 等價 if(m>n) stat=1; else stat=0;

## pD
完整程式碼，給一 uint32_t，Convert Decimal to binary。

```cpp
# include <stdio.h>
# include <stdlib.h>

int main(){

    int n;
    scanf("%d", &n);
    int binary=0;
    int i=1;
    while(n>0){
        binary += (n%2)*i;
        n /= 2;
        i *= 10;
    }
    printf("%d\n", binary);

    return 0;
}
```

## pE
實作`SwapDigit(int num)` function，將num的最高位與最低位交換後回傳，符號應不變。

```cpp
int SwapDigit(int num){
    // 1234 -> 4231
    int result=0;
    int bits=0;
    int temp = num;
    while(temp){
        bits++;
        temp /= 10;
    }
    int pow_10 = 1;
    for(int i=0; i<bits-1; i++){
        pow_10 *= 10;
    }
    int top_num = num / pow_10;
    int bottom_num = num % 10;
    int middle_num = (num % pow_10) / 10;
    result = bottom_num * pow_10 + middle_num * 10 + top_num;
    return result;
}
```

## pF
完整程式碼，給一正整數 n，輸出互相對稱，高與底為 n 的兩直角三角形，範例如下：

Input: 
```
4
```
Output:
```
*
**
***
****
    ****
     ***
      **
       *
```

。

```cpp
# include <stdio.h>
# include <stdlib.h>


int main(){

    int n;
    scanf("%d", &n);
    for(int i=0;i<n;++i){
        for(int j=0;j<=i;++j) printf("*");
        printf("\n");
    }
    for(int i=n;i<2*n;++i){
        for(int j=0;j<i;++j) printf(" ");
        for(int j=0;j<=2*n-i-1;++j) printf("*");
        printf("\n");
    }
    return 0;
}
```

## pG
實作`EvaluateResult(int num1,int num2,int num3, int &largest)` function，有以下情況：

```
If three nums are the same, then largest := num1 and return 2.
If two nums are the same, then larget := the num that is different from the other two and return 1.
If 456, then largest := 6 and return 3.
If 123, then largest := 1 and return 0.
Otherwise, just return -1.
```
。
```cpp
int EvaluateResult(int num1,int num2,int num3, int &largest){
    if(num1==num2 && num2==num3){
        largest = num1;
        return 2;
    }
    if((num1 == num2 && num2 != num3)||(num1 == num3 && num3 != num2)||(num2 == num3 && num3 != num1)){
        if(num1 == num2) largest = num3;
        else if(num1 == num3) largest = num2;
        else if(num2 == num3) largest = num1;
        return 1;
    }
    if(num1==4&&num2==5&&num3==6){
        largest = 6;
        return 3;
    }
    if(num1==1&&num2==2&&num3==3){
        largest = 1;
        return 0;
    }
    return -1;
}
```

## pH
實作`SkipWhiteSpaces()` function，讀入若干字元直到EOF，跳過所有White-Space輸出每個words，結尾需換行。

Input:
```
I like to eat apples
```
Output:
```
I
like
to
eat
apples

```

```cpp
void SkipWhiteSpaces(){
    char c;
    int flag = 0;
    while(scanf("%c",&c)!=EOF){
        if(c == ' ' || c == '\t' || c == '\n'){
            if(flag){
                printf("\n");
                flag = 0;
            }
        }
        else{
            printf("%c",c);
            flag = 1;
        }
    }

}
```

補：while(scanf("%c",&c)!=EOF)也可以寫成while(~scanf("%c",&c))，但Bitwise Operation還沒教應該不能用

補：題目的範例Output, eat apples之間沒有換行，所以不知道這樣寫對不對。