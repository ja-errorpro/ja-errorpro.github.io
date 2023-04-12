---
title: 中原111資工計概下學期期中機測
date: 2023-04-12
tags:
  - C-Cpp
  - mix
  - algorithms
---

## Pre
題目提供以下資料結構與函式

```cpp
#include <ctype.h>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TO_STR(err)                                                            \
  (BAR_CODE_FORMAT_ERROR == err                                                \
       ? "BAR_CODE_FORMAT_ERROR"                                               \
       : (BAR_CODE_NAME_WRONG == err                                           \
              ? "BAR_CODE_NAME_WRONG"                                          \
              : (NO_SUCH_PRODUCT == err                                        \
                     ? "NO_SUCH_PRODUCT"                                       \
                     : (NEGATIVE_NUMBER == err                                 \
                            ? "NEGATIVE_NUMBER"                                \
                            : (NOT_ENOUGH_CAPITAL == err                       \
                                   ? "NOT_ENOUGH_CAPITAL"                      \
                                   : (NOT_ENOUGH_MERCHANDISE == err            \
                                          ? "NOT_ENOUGH_MERCHANDISE"           \
                                          : "UNKNOWN"))))))

using namespace std;

typedef char Str30[30];
typedef char Str50[50];

struct PriceAmount {
  int cost;       // 成本
  int amountLeft; // 還有多少存貨
  PriceAmount *next;
};

typedef PriceAmount *PriceAmountPtr;

struct Product {
  Str30 barCode;       // 條碼(有時稱'序號')
  Str30 name;          // 貨品名稱
  int amountTotal;     // 總量
  int amountSold;      // 總共賣掉多少個
  int income;          // 收入
  int profit;          // 利潤
  PriceAmountPtr head; // 這個商品的價格與庫存列表
  Product *next;       // 下個Product
};

struct PurchasedItem { // 進的一筆貨
  Str30 barCode;       // 條碼(有時稱'序號')
  Str30 name;          // 貨品名稱
  int unitPrice;       // 單價
  int amount;          // 有幾個
};

struct SoldItem { // 銷售的一筆貨
  Str30 barCode;  // 條碼(有時稱'序號')
  int unitPrice;  // 單價
  int amount;     // 有幾個
};

/* Note: 真正題目的 數 字 可能會不同 */
enum ErrorType {
  BAR_CODE_FORMAT_ERROR,            // 條碼格式錯誤
  BAR_CODE_NAME_WRONG = 2172429,    // 條碼錯誤(商品名稱有問題)
  NO_SUCH_PRODUCT,                  // 商品不存在
  NEGATIVE_NUMBER = 4791202,        // 負數錯誤
  NOT_ENOUGH_CAPITAL,               // 資本不足
  NOT_ENOUGH_MERCHANDISE = 6139072, // 商品不足
  DATE_FORMAT_ERROR,                // 日期格式錯誤
  DATE_CONTENT_ERROR,               // 日期內容錯誤
  DATE_SEQUENCE_ERROR               // 日期順序錯誤
};                                  // enum ErrorType

struct Error {
  ErrorType type; // 這是什麼類型的error
  Str50 info;     // 發生錯誤時需要紀錄的額外資訊
  Error *next;
};

struct Date {
  int year;
  int month;
  int day;
}; // struct Date

typedef Product *ProductPtr;
typedef Error *ErrorPtr;

struct Statistics {
  int capital; // 目前本店手頭上有多少錢(i.e.資本)
  int revenue; // 到目前為止全部的銷售額
  int netProfit; // 到目前為止總共(因為銷售貨品)的獲利(這有可能會是負的)
};

ProductPtr gInventoryHead = NULL; // 存貨資料頭
ProductPtr gInventoryTail = NULL; // 存貨資料尾
ErrorPtr gErrors = NULL;          // 儲存錯誤紀錄
Statistics gStat = {0, 0, 0};

/** 讀入一個輸入的字串
 *  @param str 讀入一個不含空白的字串，讀入後會存在此變數中
 *  @return 如果可以讀到字串會回傳 true，否則回傳false
 */
bool GetNextInputStr30Succeeded(Str30 &str);

/** 處理一連串的進貨，只要找到一個條碼就會呼叫GetAndProcessOnePurchasedItem()
 *  處理單一筆進貨資訊，一直處理到遇到end為止。
 */
void ProcessPurchases();

/** 處理一連串的銷貨，只要找到一個條碼就會呼叫GetAndProcessOneSoldItem()
 *  處理單一筆銷貨資訊，一直處理到遇到end為止。
 */
void ProcessSales();

/** 處理單一進貨，包含檢查進貨商品資訊是否正確無誤，有錯誤的話會記錄
 *  沒有錯誤的話會呼叫  AddToInventory() 把商品放進庫存中
 *  @param barCode 取得的進貨商品條碼字串
 */
void GetAndProcessOnePurchasedItem(Str30 barCode);

/** 處理單一銷貨，包含檢查進貨商品資訊是否正確無誤，有錯誤的話會記錄
 *  沒有錯誤的話會呼叫 SubtractFromInventory() 把商品庫存更新(或是移除)
 *  @param barCode 取得的銷貨商品條碼字串
 */
void GetAndProcessOneSoldItem(Str30 barCode);

/** 檢查是否條碼格式錯誤
 *  @param barCode 輸入的條碼字串
 *  @return 格式正確回傳true，否則回傳false
 */
bool CheckBarCodeFormatOK(Str30 barCode);

/** 檢查是否條碼品名不一致，也就是條碼相同但品名不同
 *  @param item 紀錄進貨商品資訊的struct
 *  @return 條碼品名一致會回傳true，否則回傳false
 */
bool CheckBarCodeNameCorrect(PurchasedItem item);

/** 檢查單一進貨商品是否沒有任何錯誤
 *  如果發生錯誤，會呼叫WriteErrors()記錄下錯誤資訊
 *  @param item 一個要進貨的物品資訊
 *  @return 如果可以進貨會回傳true
 */
bool CheckPurchasedItemOK(PurchasedItem item);

/** 檢查單一銷貨商品是否沒有任何錯誤
 *  如果發生錯誤，會呼叫WriteErrors()記錄下錯誤資訊
 *  @param item 一個要銷售的物品資訊
 *  @return 如果可以被賣掉會回傳true
 */
bool CheckSoldItemOK(SoldItem item);

/** 處理日期資訊，會檢查格式是否正確。
 *  如果發生錯誤，會呼叫WriteErrors()記錄下錯誤資訊
 */
void ProcessDate();
```

## pA(10%)

```cpp
void WriteErrors(ErrorType err, Str50 info) { // pA 10%
  ErrorPtr *head = &gErrors;
  while (*head != NULL)
    head = &((*head)->next);
  *head = new Error;
  (*head)->type = err;
  strcpy((*head)->info, info);
  (*head)->next = NULL;
}
```

時間複雜度 $O(1)$

---

## pB(15%)

```cpp
int CountItem(int price) {
  int ret = 0;
  for (ProductPtr p = gInventoryHead; p != NULL; p = p->next) {
    for (PriceAmountPtr q = p->head; q != NULL; q = q->next) {
      if (q->cost < price)
        ret++;
    }
  }
  return ret;
}
```

時間複雜度 $O(max(所有商品list長度 \times 庫存列表長度 ))$

---

## pC(20%) (有誤)

```cpp
PriceAmountPtr AddPriceAmount(PriceAmountPtr head,
                              PriceAmountPtr priceAndAmount) {
  if (head == NULL) {
    head = priceAndAmount;
    priceAndAmount->next = NULL;
    return head;
  }
  if (head->cost == priceAndAmount->cost) {
    head->amountLeft += priceAndAmount->amountLeft;
    delete priceAndAmount;
    return head;
  }
  if (head->cost > priceAndAmount->cost) {
    priceAndAmount->next = head;
    return priceAndAmount;
  }
  head->next = AddPriceAmount(head->next, priceAndAmount);
  return head;
}
```

時間複雜度 $O(n)$

---

## pD(20%)

```cpp
PriceAmountPtr SubtractAmount(PriceAmountPtr head, SoldItem item, int &profit) {
  if (head == NULL)
    return NULL;
  if (head->amountLeft > item.amount) {
    head->amountLeft -= item.amount;
    profit += item.amount * (item.unitPrice - head->cost);
    return head;
  }
  if (head->amountLeft == item.amount) {
    profit += item.amount * (item.unitPrice - head->cost);
    PriceAmountPtr temp = head;
    head = head->next;
    delete temp;
    return head;
  }
  if (head->amountLeft != 0) {
    profit += head->amountLeft * (item.unitPrice - head->cost);
    item.amount -= head->amountLeft;
    head->amountLeft = 0;
  }
  head->next = SubtractAmount(head->next, item, profit);
  if (head->amountLeft == 0) {
    PriceAmountPtr temp = head;
    head = head->next;
    delete temp;
  }
  return head;
}
```

時間複雜度 $O(n)$

---

## pE(15%)

```cpp
PriceAmountPtr ReversePriceAmount(PriceAmountPtr head) {

  if (head == NULL || head->next == NULL)
    return head;
  PriceAmountPtr p = head;
  PriceAmountPtr q = head->next;
  PriceAmountPtr r = q->next;
  p->next = NULL;
  while (r != NULL) {
    q->next = p;
    p = q;
    q = r;
    r = r->next;
  }
  q->next = p;
  return q;
}
```

時間複雜度 $O(n)$

另解：Sort 它，改遞減排序，時間複雜度 $O(n^2)$

---

## Bonus(5%)

```cpp
void SortProductByName() {
  if (gInventoryHead == NULL || gInventoryHead->next == NULL)
    return;
  ProductPtr h = gInventoryHead;
  int cnt = 0;
  while (h != NULL) {
    h = h->next;
    cnt++;
  }
  for (int i = 0; i < cnt; i++) {
    for (ProductPtr *p = &gInventoryHead; *p != NULL && (*p)->next != NULL;
         p = &((*p)->next)) {
      if (strcmp((*p)->name, (*p)->next->name) > 0) {
        ProductPtr temp = *p;
        *p = (*p)->next;
        temp->next = (*p)->next;
        (*p)->next = temp;
      }
    }
  }

  for (h = gInventoryHead; h->next != NULL; h = h->next);
  
  gInventoryTail = h;
  
}
```

時間複雜度 $O(n^2)$