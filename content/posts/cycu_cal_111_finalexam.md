---
title: 中原111資工計概上學期期末機測
date: 2023-01-09
tags:
  - C-Cpp
  - mix
  - algorithms
---

# 答案僅供參考

# 答案僅供參考

# 答案僅供參考

# 我看起來像標準答案嗎

## Pre
題目提供以下資料結構與函式

```cpp
# include <stdlib.h>
# include <stdio.h>
# include <string.h>
# include <ctype.h>
# include <iostream>

# define TO_STR(err)                                                         \
  (BAR_CODE_FORMAT_ERROR == err ? "BAR_CODE_FORMAT_ERROR":                   \
  (BAR_CODE_NAME_WRONG == err ? "BAR_CODE_NAME_WRONG":                       \
  (NO_SUCH_PRODUCT == err ? "NO_SUCH_PRODUCT":                               \
  (NEGATIVE_NUMBER == err ? "NEGATIVE_NUMBER":                               \
  (NOT_ENOUGH_CAPITAL == err ? "NOT_ENOUGH_CAPITAL":                         \
  (NOT_ENOUGH_MERCHANDISE == err ? "NOT_ENOUGH_MERCHANDISE":                 \
  (DATE_FORMAT_ERROR == err ? "DATE_FORMAT_ERROR":                           \
  (DATE_CONTENT_ERROR == err ? "DATE_CONTENT_ERROR":                         \
  (DATE_SEQUENCE_ERROR == err ? "DATE_SEQUENCE_ERROR":"UNKNOWN")))))))))

#define NOT !

using namespace std ;

const int MAX_INVENTORY = 100 ;
const int MAX_ERRORS = 100 ;

typedef char Str30[30] ;
typedef char Str50[50] ;

struct Product {
  Str30 barCode ;     // 條碼(有時稱'序號')
  Str30 name ;        // 貨品名稱
  int cost ;          // 成本
  int amountLeft ;    // 還有多少存貨
  int amountSold ;    // (被記錄於這一筆之中的)總共賣掉多少個
  int profit ;        // 此品項的獲利(可能會賠錢賣)
} ; // struct Product

struct PurchasedItem { // 進的一筆貨
  Str30 barCode ;      // 條碼(有時稱'序號')
  Str30 name ;         // 貨品名稱
  int unitPrice ;      // 單價
  int amount ;         // 有幾個
};

struct SoldItem {     // 銷售的一筆貨
  Str30 barCode ;     // 條碼(有時稱'序號')
  int unitPrice ;     // 單價
  int amount ;        // 有幾個
};

/* Note: 真正題目的 數 字 可能會不同 */
enum ErrorType {
  BAR_CODE_FORMAT_ERROR,   // 條碼格式錯誤
  BAR_CODE_NAME_WRONG = 2172429,          // 條碼錯誤(商品名稱有問題)
  NO_SUCH_PRODUCT,         // 商品不存在
  NEGATIVE_NUMBER = 4791202,         // 負數錯誤
  NOT_ENOUGH_CAPITAL,      // 資本不足
  NOT_ENOUGH_MERCHANDISE = 6139072,  // 商品不足
  DATE_FORMAT_ERROR,       // 日期格式錯誤
  DATE_CONTENT_ERROR,      // 日期內容錯誤
  DATE_SEQUENCE_ERROR      // 日期順序錯誤
} ; // enum ErrorType

struct Error {
  ErrorType type ;   // 這是什麼形式的error
  Str50 info ;       // 相關的錯誤資訊(如果需要記下來就記在這裡)
} ; // struct Error

struct Date {
  int year ;   
  int month ;    
  int day ;       
} ; // struct Date

struct Statistics {
  int capital ;    // 目前本店手頭上有多少錢(i.e.資本)
  int revenue ;    // 到目前為止全部的銷售額
  int netProfit ;  // 到目前為止總共(因為銷售貨品)的獲利(這有可能會是負的)
};

Product gInventory[ MAX_INVENTORY ] ; // 所有的存貨資料
int gNumOfProducts = 0 ;              // gInventory[]之中總共有多少幾筆存貨資料
Date gCurrentDate = { 1900, 1, 1 } ;  // 目前的日期
Error gErrors[ MAX_ERRORS ] ;         // 所有已發現的error
int gNumOfErrors = 0 ;                // gErrors[]之中總共有多少幾筆Error資料

Statistics gStat = { 0, 0, 0 } ;

/** 
* 讀入一個輸入的字串 
* @param str 成功讀到字串的話會存在這裡面
* @return 如果有讀到字串就回傳true，否則回傳false
*/
bool GetNextInputStr30Succeeded( Str30 & str ) ;

/** 
* 讀入一筆進貨資訊，分析後加入庫存 
* @param barCode 一個已經讀到的條碼字串
*/
void GetAndProcessOnePurchasedItem( Str30 barCode ) ;

/** 
* 讀入一筆銷貨資訊，分析後更新庫存
* @param barCode 一個已經讀到的條碼字串
*/
void GetAndProcessOneSoldItem( Str30 barCode ) ;

/** 
* 檢查單一銷貨商品是否沒有任何錯誤 
* @param item 一個已經整理好的銷售商品資訊
* @return 如果商品可以銷售就回傳true
*/
bool CheckSoldItemOK( SoldItem item ) ;

/** 
* 檢查庫存清單裡面有沒有指定的條碼 
* @param barCode 要檢查的條碼
* @return 找不到商品的話就回傳true
*/
bool NoSuchProduct( Str30 barCode ) ;

/** 
* 用於紀錄錯誤，負責把傳入的資訊寫進 gErrors[] 裡，
* 同時會更新 gNumOfErrors 的值 
* @param err 錯誤的類型
* @param info 額外的錯誤資訊
*/
void WriteErrors(ErrorType err, Str50 info) {
  gErrors[gNumOfErrors].type = err;
  strcpy(gErrors[gNumOfErrors].info, info);
  gNumOfErrors = gNumOfErrors + 1;
}

```

## pA (10%)
實作`bool CheckBarCodeFormatOK( Str30 barCode )` function，如果barCode符合條碼格式則回傳true，反則false。

條碼格式必須為 1 個大寫英文 + 5 個數字

```cpp
bool CheckBarCodeFormatOK( Str30 barCode ) {
    if (strlen(barCode) != 6) return false;
    if(barCode[0] < 'A' || barCode[0] > 'Z') return false;
    for(int i = 1; i < 6; i++){
        if(barCode[i] < '0' || barCode[i] > '9') return false;
    }
    return true;
}
```

---

## pB (11%)
實作`bool CheckBarCodeNameCorrect(PurchasedItem item)` function，
檢查item是否跟所有庫存
有條碼相同但商品名稱不同的狀況，若有，return false，反則true。

```cpp
bool CheckBarCodeNameCorrect(PurchasedItem item) {
    for (int i = 0; i < gNumOfProducts; i++) {
        if (strcmp(item.barCode, gInventory[i].barCode) == 0) {
            if (strcmp(item.name, gInventory[i].name) != 0) {
                return false;
            }
        }
    }
    return true;
}
```

---

## pC (11%)
實作`bool CheckPurchasedItemOK( PurchasedItem item )` function，
依順序檢查是否有以下錯誤，並記錄錯誤資訊，同時不再往下檢查：
1. 條碼格式錯誤：只需要紀錄條碼內容
2. 商品名稱錯誤：紀錄條碼內容跟商品名稱，中間用,隔開
3. 負數錯誤：只需要紀錄條碼內容
4. 資本不足：條碼內容、名稱、單價、購買數量，中間用,隔開

有錯誤的話回傳false，反則true。

```cpp
bool CheckPurchasedItemOK( PurchasedItem item ) {
    if (!CheckBarCodeFormatOK(item.barCode)){
        gErrors[gNumOfErrors].type = BAR_CODE_FORMAT_ERROR;
        strcpy(gErrors[gNumOfErrors].info, item.barCode);
        gNumOfErrors++;
        return false;
    }
    if (!CheckBarCodeNameCorrect(item)){
        gErrors[gNumOfErrors].type = BAR_CODE_NAME_WRONG;
        strcpy(gErrors[gNumOfErrors].info, item.barCode);
        strcat(gErrors[gNumOfErrors].info, ",");
        strcat(gErrors[gNumOfErrors].info, item.name);
        gNumOfErrors++;
        return false;
    }
    if (item.amount < 0 || item.unitPrice < 0){
        gErrors[gNumOfErrors].type = NEGATIVE_NUMBER;
        strcpy(gErrors[gNumOfErrors].info, item.barCode);
        gNumOfErrors++;
        return false;
    }
    if(item.unitPrice * item.amount > gStat.capital){
        gErrors[gNumOfErrors].type = NOT_ENOUGH_CAPITAL;
        strcpy(gErrors[gNumOfErrors].info, item.barCode);
        strcat(gErrors[gNumOfErrors].info, ",");

        strcat(gErrors[gNumOfErrors].info, item.name);
        strcat(gErrors[gNumOfErrors].info, ",");

        Str50 tmp;
        sprintf(tmp, "%d", item.unitPrice);
        strcat(gErrors[gNumOfErrors].info, tmp);
        strcat(gErrors[gNumOfErrors].info, ",");

        sprintf(tmp, "%d", item.amount);
        strcat(gErrors[gNumOfErrors].info, tmp);

        gNumOfErrors++;
        return false;
    }
    return true;
}
```

補：我全部寫完才看到有WriteError()能用，多寫了orz...

---

## pD (12%)
實作`bool NotEnoughMerchandize( Str30 barCode, int amountNeeded )` function，
barCode 為讀入條碼，必存在於庫存，amountNeeded 為需要賣到的數量，檢查庫存是否足夠，若不足，回傳true，反則false。

規則：此進價商品存貨不足就不賣，就算有不同進價的相同商品，加起來庫存大於需要賣的數量也賣不了。

```cpp
bool NotEnoughMerchandize( Str30 barCode, int amountNeeded ) {
    for (int i = 0; i < gNumOfProducts; i++) {
        if (strcmp(barCode, gInventory[i].barCode) == 0) {
            if(gInventory[i].amountLeft < amountNeeded){
                return true;
            }
        }
    }
    return false;
}
```

---

## pE (15%)
實作`bool CheckDateContentOK( Str30 dateStr, Date & date )` function，
dateStr 格式必定正確(YYYY/MM/DD)，檢查是否為合法的日期，year必須介於 1900~9999 之間，若是，回傳true 
並且將日期存到date，反則false。

```cpp
bool CheckDateContentOK( Str30 dateStr, Date & date ){
    int slashpos[2];
    int len = strlen(dateStr);
    int slashcount = 0;
    for(int i = 0; i < len; i++){
        if(dateStr[i] == '/'){
            slashpos[slashcount] = i;
            slashcount++;
        }
    }
    char year[5], month[3], day[3];
    for(int i = 0; i < slashpos[0]; i++){
        year[i] = dateStr[i];
    }
    year[slashpos[0]] = '\0';

    for(int i = slashpos[0] + 1; i < slashpos[1]; i++){
        month[i - slashpos[0] - 1] = dateStr[i];
    }
    month[slashpos[1] - slashpos[0] - 1] = '\0';

    for(int i = slashpos[1] + 1; i < len; i++){
        day[i - slashpos[1] - 1] = dateStr[i];
    }
    day[len - slashpos[1] - 1] = '\0';

    int yearint = atoi(year);
    int monthint = atoi(month);
    int dayint = atoi(day);

    if(yearint < 1900 || yearint > 9999) return false;
    if(monthint < 1 || monthint > 12) return false;
    if(dayint < 1 || dayint > 31) return false;
    
    bool leap = (yearint % 4 == 0 && yearint % 100 != 0) || (yearint % 400 == 0);
    if(monthint == 2){
        if(leap){
            if(dayint > 29) return false;
        }
        else{
            if(dayint > 28) return false;
        }
    }
    else if(monthint == 4 || monthint == 6 || monthint == 9 || monthint == 11){
        if(dayint > 30) return false;
    }
    date.year = yearint;
    date.month = monthint;
    date.day = dayint;
    return true;
}
```

---

## pF (13%)
實作`AddToInventory( PurchasedItem item)` function，
如果是新商品就push back到庫存，如果是現存商品但進價不同視為新商品，如果是現存商品進價相同就更新庫存。

```cpp
void AddToInventory( PurchasedItem item ) {
    bool found = false;
    for (int i = 0; i < gNumOfProducts; i++) {
        if (strcmp(item.barCode, gInventory[i].barCode) == 0) {
            if(gInventory[i].cost == item.unitPrice){
                gInventory[i].amountLeft += item.amount;
                found = true;
            }
        }
    }

    if(!found){
        strcpy(gInventory[gNumOfProducts].barCode, item.barCode);
        strcpy(gInventory[gNumOfProducts].name, item.name);
        gInventory[gNumOfProducts].cost = item.unitPrice;
        gInventory[gNumOfProducts].amountLeft = item.amount;
        gNumOfProducts++;
    }
}
```

---

## pG (13%)
實作`void SubtractFromInventory( SoldItem item )` function，
保證item賣得掉，若有多筆貨品在庫存但價錢不同，先出現者先賣，並更新庫存與獲利，庫存變為0不需移除此商品。

```cpp
void SubtractFromInventory( SoldItem item ) {
    int sameBarCodeidx[100];
    int sameBarCodeCount = 0;
    for (int i = 0; i < gNumOfProducts; i++) {
        if (strcmp(item.barCode, gInventory[i].barCode) == 0) {
            sameBarCodeidx[sameBarCodeCount] = i;
            sameBarCodeCount++;
        }
    }

    int sellAmountLeft = item.amount;
    bool flag = true;
    for (int i = 0; i < sameBarCodeCount && flag; i++) {
        if(gInventory[sameBarCodeidx[i]].amountLeft >= sellAmountLeft){
            gInventory[sameBarCodeidx[i]].amountLeft -= sellAmountLeft;
            gInventory[sameBarCodeidx[i]].amountSold += sellAmountLeft;
            gInventory[sameBarCodeidx[i]].profit += sellAmountLeft * (item.unitPrice - gInventory[sameBarCodeidx[i]].cost);
            sellAmountLeft = 0;
            flag = false;
        }
        else{
            sellAmountLeft -= gInventory[sameBarCodeidx[i]].amountLeft;
            gInventory[sameBarCodeidx[i]].amountSold += gInventory[sameBarCodeidx[i]].amountLeft;
            gInventory[sameBarCodeidx[i]].profit += gInventory[sameBarCodeidx[i]].amountLeft * (item.unitPrice - gInventory[sameBarCodeidx[i]].cost);
            gInventory[sameBarCodeidx[i]].amountLeft = 0;
        }
    }
}
```

---

## pH (15%)
實作`void SortInventory()` function，
對庫存依條碼字典序遞增排序，若條碼相同則依進價遞增排序。

```cpp
void SortInventory() {
    for(int i = 0; i < gNumOfProducts; i++){
        for(int j = 0; j < gNumOfProducts - 1; j++){
            if(strcmp(gInventory[j].barCode, gInventory[j + 1].barCode) == 0){
                if(gInventory[j].cost > gInventory[j + 1].cost){
                    Product tmp = gInventory[j];
                    gInventory[j] = gInventory[j + 1];
                    gInventory[j + 1] = tmp;
                }
            }else if(strcmp(gInventory[j].barCode, gInventory[j + 1].barCode) > 0){
                Product tmp = gInventory[j];
                gInventory[j] = gInventory[j + 1];
                gInventory[j + 1] = tmp;
            }
        }
    }
}
```

---

## pI (5%, bonus)
實作`bool ProcessDateStr( Str30 dateStr, bool & wrongDateFormat, bool & wrongDateContent, bool & wrongDateSequence ) ` function，
先檢查日期格式是否正確，再檢查日期內容是否正確，最後檢查日期是否遞增，如果有錯就不再往下檢查。

格式檢查：日期的格式必須是 xxxx/xx/xx，只要不是長這樣就把wrongDateFormat設為true
內容檢查：日期必須符合真正的日期，如果內容錯誤就把wrongDateContent設為true
順序錯誤：要處理的日期必須要在目前的日期(也就是gCurrentDate)之後(包含這個日期)。

注意：

wrongDateSequence與wrongDateFormat與wrongDateContent頂多只有一個會被設為true。

若無錯誤，就用分析出來的年、月、日設定gCurrentDate (而三個參數也都被設為false)、並return true，

否則return false (所以當return false的時候必然三個參數有一個為true)。 

注意：如果日期格式、內容、順序有錯，必須記錄下錯誤(實際上是記錄到gErrors[]裡面)。 

要記錄的錯誤資訊是ErrorType跟info。info紀錄的內容是錯誤的日期字串。

```cpp
void AddError(ErrorType et, Str50 info) { // 其實有 WriteErrors()
    gErrors[gNumOfErrors].type = et;
    strcpy(gErrors[gNumOfErrors].info, info);
    gNumOfErrors++;
}

bool ProcessDateStr( Str30 dateStr, bool & wrongDateFormat, 
                                    bool & wrongDateContent, 
                                    bool & wrongDateSequence ) {
    int len = strlen(dateStr);
    if(len != 10){
        AddError(DATE_FORMAT_ERROR, dateStr);
        wrongDateFormat = true;
        return false;
    }
    int slashcount = 0;
    int slashpos[2];
    for(int i = 0; i < len; i++){
        if((dateStr[i] < '0' || dateStr[i] > '9') && dateStr[i] != '/'){
            AddError(DATE_FORMAT_ERROR, dateStr);
            wrongDateFormat = true;
            return false;
        }
        if(dateStr[i] == '/'){
            slashcount++;
            if(slashcount > 2){
                AddError(DATE_FORMAT_ERROR, dateStr);
                wrongDateFormat = true;
                return false;
            }
            slashpos[slashcount - 1] = i;
        }
    }
    if(slashcount != 2){
        AddError(DATE_FORMAT_ERROR, dateStr);
        wrongDateFormat = true;
        return false;
    }
    char year[5], month[3], day[3];
    for(int i = 0; i < slashpos[0]; i++) year[i] = dateStr[i];
    year[slashpos[0]] = '\0';

    for(int i = slashpos[0] + 1; i < slashpos[1]; i++)month[i - slashpos[0] - 1] = dateStr[i];
    month[slashpos[1] - slashpos[0] - 1] = '\0';

    for(int i = slashpos[1] + 1; i < len; i++)day[i - slashpos[1] - 1] = dateStr[i];
    day[len - slashpos[1] - 1] = '\0';

    int yearint = atoi(year), monthint = atoi(month), dayint = atoi(day);

    if((yearint < 1900 || yearint > 9999) || (monthint < 1 || monthint > 12) || (dayint < 1 || dayint > 31)){
        AddError(DATE_CONTENT_ERROR, dateStr);
        wrongDateContent = true;
        return false;
    }
    bool leap = (yearint % 4 == 0 && yearint % 100 != 0) || (yearint % 400 == 0);
    if(monthint == 2){
        if(leap){
            if(dayint > 29){
                AddError(DATE_CONTENT_ERROR, dateStr);
                wrongDateContent = true;
                return false;
            }
        }
        else{
            if(dayint > 28){
                AddError(DATE_CONTENT_ERROR, dateStr);
                wrongDateContent = true;
                return false;
            }
        }
    }
    else if(monthint == 4 || monthint == 6 || monthint == 9 || monthint == 11){
        if(dayint > 30){
            AddError(DATE_CONTENT_ERROR, dateStr);
            wrongDateContent = true;
            return false;
        }
    }
    if(gCurrentDate.year > yearint){
        AddError(DATE_SEQUENCE_ERROR, dateStr);
        wrongDateSequence = true;
        return false;
    }else{
        if(gCurrentDate.year == yearint){
            if(gCurrentDate.month > monthint){
                AddError(DATE_SEQUENCE_ERROR, dateStr);
                wrongDateSequence = true;
                return false;
            }else{
                if(gCurrentDate.month == monthint){
                    if(gCurrentDate.day > dayint){
                        AddError(DATE_SEQUENCE_ERROR, dateStr);
                        wrongDateSequence = true;
                        return false;
                    }
                }
            }
        }
    }
    gCurrentDate.year = yearint;
    gCurrentDate.month = monthint;
    gCurrentDate.day = dayint;
    return true;
}
```