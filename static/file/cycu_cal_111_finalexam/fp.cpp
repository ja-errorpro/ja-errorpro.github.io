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

bool CheckBarCodeFormatOK( Str30 barCode ) { // 10%
    if (strlen(barCode) != 6) return false;
    if(barCode[0] < 'A' || barCode[0] > 'Z') return false;
    for(int i = 1; i < 6; i++){
        if(barCode[i] < '0' || barCode[i] > '9') return false;
    }
    return true;
}

bool CheckBarCodeNameCorrect(PurchasedItem item) { // 11%
    for (int i = 0; i < gNumOfProducts; i++) {
        if (strcmp(item.barCode, gInventory[i].barCode) == 0) {
            if (strcmp(item.name, gInventory[i].name) != 0) {
                return false;
            }
        }
    }
    return true;
}

 // 後來才看到有WriteError()能用，多寫了orz

bool CheckPurchasedItemOK( PurchasedItem item ) { // 11%
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

bool NotEnoughMerchandize( Str30 barCode, int amountNeeded ) { // 12%
    for (int i = 0; i < gNumOfProducts; i++) {
        if (strcmp(barCode, gInventory[i].barCode) == 0) {
            if(gInventory[i].amountLeft < amountNeeded){
                // gErrors[gNumOfErrors].type = NOT_ENOUGH_MERCHANDISE;
                // strcpy(gErrors[gNumOfErrors].info, barCode);
                // gNumOfErrors++;
                return true;
            }
        }
    }
    return false;
}

bool CheckDateContentOK( Str30 dateStr, Date & date ) { // 15%
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

void AddToInventory( PurchasedItem item ) { // 13%
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

void SubtractFromInventory( SoldItem item ) { // 13%
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

void SortInventory() { // 15%
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

void AddError(ErrorType et, Str50 info) {
    gErrors[gNumOfErrors].type = et;
    strcpy(gErrors[gNumOfErrors].info, info);
    gNumOfErrors++;
}

bool ProcessDateStr( Str30 dateStr, bool & wrongDateFormat, 
                                    bool & wrongDateContent, 
                                    bool & wrongDateSequence ) { // 5%
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
int main(){
  // test
  char dateStr[30];

  while(cin >> dateStr){
    bool wrongDateFormat = false;
    bool wrongDateContent = false;
    bool wrongDateSequence = false;
    ProcessDateStr(dateStr, wrongDateFormat, wrongDateContent, wrongDateSequence);
    

  }
  cout << "Date: " << gCurrentDate.year << "/" << gCurrentDate.month << "/" << gCurrentDate.day << endl;
  for(int i = 0 ; i < gNumOfErrors ; i++){
    cout << "Error: " << TO_STR(gErrors[i].type) << " " << gErrors[i].info << endl;
  }
}