---
title: 【AIS3】API 安全
date: 2024-08-01
tags:
  - CTF
---

# API 安全

`-中華資安國際 資安研究員 zodius`

## 技術簡介

### What is API?

* 點炒飯
    * 跟廚師說一份炒飯
    * 叫廚師打蛋切菜...

### 好處

> 把商業邏輯或業務邏輯封裝成簡單邏輯

* 本質：封裝
    * 無需關注細節，專注自己業務邏輯
    * 透過介面溝通，可同時開發
    * 前後端邏輯分離，減少流量與資料相依性
### API 發展

* RPC
    * 跨電腦溝通, ex: 轉帳、查詢
    * 隨 http 發展演變成 Web service
    * 專注於特定任務
* SOAP 傳輸
    * XML 格式協議
* WSDL 約定 interface
    * web service
    * 提供參數
    * 缺點 - GetFile() 可能很多種定義
* 範圍混亂，如何拆分沒有統一標準

### SOAP

* header - 方法
* body - 正式請求

Google hacking wsdl 可能可以找到很多酷東西

可從中獲得網站資訊

### RESTful API

* 解決範圍定義問題
* Header
    * method
        * GET
        * POST
        * PUT
        * DELETE
        * HEAD
        * OPTIONS
        * CONNECT
        * TRACE
    * URL
    * version
![image](https://www.cloud4y.ru/upload/medialibrary/4c0/hn5x5w7tx2pa0t3m1us71vh51dthf4kg/2.jpg)

* Representational State Transfer 狀態轉移
    * 認為 API 最小單位是物件
* 沒有標準規範，是一種設計風格
* 動詞 -> 資源，解決範圍規範問題
* Body 沒有規定，但通常是 JSON

#### OpenAPI
* 統一標準語法描述 RESTful API
* 可透過 [swagger](https://swagger.io/) 產生文件頁面

#### n+1 problem

* 以資源為主體，複雜商業邏輯易造成 n+1 問題

### GraphQL

* 2015 年由 Facebook 提出
* 類 SQL Query 查詢

```graphql
query {
  user(id: 1) {
    account(id: 1) {
      name
    }
  }
}
```

### grpc

* 2016 年由 Google 提出
* binary encode 減少封包體積
* HTTP 2 底層協議加速傳輸標準

### microservice

* 把功能切成獨立的小 server

### 共同概念

* 身分驗證
    * Session-based
        * Session-Cookie
        * 難以儲存使用者資訊
        * microservice 太多 server 不知道存哪個
    * Token-based
        * Pre-shared token
            * 問題：如何重簽 token、銷毀 token
        * JWT
            * Client-side
            * 伺服器不需要儲存，減少資源使用量
            * 使用者登入 -> Server 給 JWT token -> 下次帶 token 寫資料
            * 簽章安全機制，防竄改
    * Client-side TLS(mTLS)
        * TCP Connection(SYN, SYN/ACK, ACK) -> mTLS(簽章) -> 取得資料(不驗證)
        * 保證兩邊都是正確的目的地，知道彼此是誰
        * 確保只有經過驗證的人可以連線

## 安全檢測

* OWASP API Top 10
    * 四年更新一次，目前最新版是 2023 年
    * API1:2023 - Broken Object Level Authorization
        * 缺乏妥善權限檢查機制，導致攻擊者可透過修改物件 ID 直接存取資源
        * 修改參數，如 GET /users/id=1 -> GET /users/id=2
        * 修改 HTTP Method，如 GET -> POST
    * API2:2023 - Broken Authentication
        * 身分驗證瑕疵
            * 使用者帳密/API Token 洩漏
            * JWT Key 洩漏
                * JWT Attack
                    * Key 暴力破解
                    * 竄改加密演算法
                        * 非對稱改對稱
                    * 竄改 kid
                        * 路徑遍歷
                        * 指向大家都知道的檔案 ex: wp-config
                        * Bypass ASLR
            * 暴力破解
    * API3:2023 - Broken Object Property Level Authorization
        * 未驗證物件屬性是否合法
        * 資料外洩
            * 查詢使用者，回傳包含明文密碼
        * 竄改屬性
            * 建立使用者時設定初始帳戶餘額
            * 購物車修改金額
        * API2:2023 vs API3:2023
            * API2:2023 關注物件 id
            * API3:2023 關注物件屬性
    * API4:2023 - Unrestricted Resource Consumption
        * 未限制存取頻率、次數限制
        * DoS、資源消耗
            * SMS 認證
                * 瘋狂送簡訊，耗簡訊費
            * graphql DoS
                * 單一查詢加入大量條件
    * API5:2023 - Broken Function Level Authorization
        * API Endpoint 未驗證使用者權限
        * 一般使用者呼叫管理 API
        * 垂直權限跨越
    * API6:2023 - Unrestricted Access To Sensitive Business Flows
        * 未對敏感功能進行限制控管，攻擊者可以自動化方式影響業務流程
        * 高鐵 API 自動訂票
    * API7:2023 - Service Side Request Forgery
        * 未驗證使用者參數，根據參數存取遠端資源
        * GET /server-health?ip=...
    * API8:2023 - Sercurity Misconfiguration
        * 安全性組態設定錯誤
        * CORS
            * CSRF
            * 瀏覽器發現圖片來自受害網站時，會發送請求詢問是否可以發送封包

    ```
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Origin: <origin>
    Access-Control-Allow-Origin: null
    ```

    * API9:2023 - Improper Inventory Management
        * 沒有妥善版本、文件管理
        * 沒有人知道的 Shadow API
        * 沒有人知道的 Shadow Parameters
    * API10:2023 - Unsafe Consumption of APIs
        * 開發人員通常信任 API 所回傳的資料
        * API Server 被攻擊或竄改，會影響到所有使用者

## 共通檢測方式 - 參數探測

* 無法得知 API 參數通常無法順利與 Server 建立溝通
    * API 文件洩漏
        * WSDL
        * RESTful SwaggerUI
        * GraphQL
            * 經常透過程式碼產生遺留在正式環境
            * 常見路徑
                * /graphql
                * /graphiql/playground
                * /graphiql/console
    * Parameter Fuzzing
        * ffuf
            * 爆破工具
            * 蒐集字典檔
        * arjun
        * schemathesis
            * 壓力測試
            * 匯入 open api 文件
            * 對每個 api 端點做亂數 fuzzing 看 server 會不會崩潰

## API 大戰





