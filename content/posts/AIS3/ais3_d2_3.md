---
title: 【AIS3】IoT 檢測實務
date: 2024-07-30
tags:
  - CTF
---

# IoT 檢測實務

`-中華資安國際 副理 王凱慶 Keniver`

## Introduction

* IoT 拿不到韌體 -> 不能逆向

### IoT 在哪裡

* 關鍵基礎設施
    * 環境監測
    * 控制關鍵設施
* 商業
    * 廣告系統
    * 生產自動化
    * 門禁系統
* 社會安全
    * 科技執法
    * 交通控制
* 家中
    * 智慧家庭
    * 醫療照顧

IoT 設備、惡意程式數量持續增加

## IoT 生態系

### 設備產業生態系

由於硬體與其程式可以被重複利用與整合於其他產品中，因此ODM 廠商可能會與多間OEM 廠商合作，進而拓展經濟規模。
這樣的架構下ODM 的硬體與軟體會被複製到多個OEM 產品上，若ODM 廠商未建立良善的安全開發流程，而OEM 廠商也只改個Logo 就將其出品，那就可能導致~~一家烤肉萬家香~~一個漏洞萬家通用的現象發生。

華為 -> 海康衛視 -> SOC -> 雄邁 -> OVM 監視器廠商

* 登入頁面差不多
* 外觀

### 為何研究 IoT

* 數量多, 通用性高, 洞好找
* 效能要求
* 廠商方便，不加保護

## OWASP IoT Top 10

### I1 Weak Guessable, or Hardcoded Passwords

* 弱密碼

### I2 Insecure Network Services

* 運行不必要甚至不安全的網路服務

ex: open 7000 port -> 一直拿到 GPS 資訊

### I3 Insecure Ecosystem Interfaces

* 關聯服務有資安疑慮

### I4 Lack of Secure Update Mechanism

* 沒有安全更新機制

ex: 馬自達 update.zip 直接更新，可加料後進行控制

### I5 Use of Insecure or Outdated Components

* 使用不安全或已棄用的元件

### I6 Insufficient Privacy Protection

* 使用者個人隱私保護不足

### I7 Insecure Data Transfer and Storage

* 傳輸資訊方式不安全

ex: 攔截流量，沒加密

### I8 Lack of Device Management

* 缺乏設備管理 -> 不易資產管理

### I9 Insecure Default Settings

* 初始設定不安全

### I10 Lack of Physical Hardening

* 實體介面缺乏保護，相關介面可被惡意使用者濫用

## LAB

### 分析三部曲

- 取得韌體
- 拆解韌體
- 分析漏洞
- 漏洞利用

### 取得韌體

* 網站下載
* 資安公告
* 找他親戚
* 找不到韌體 -> 資訊收集
    * 晶片型號
    * 硬體架構
    * 廠商應對
        * 磨掉型號
    * FCC/NCC 標籤
* 裝置抽取
    * 判斷腳位
        * 三用電表找 GND
        * 找 Tx，開機會看到電表跳動
        * Rx 可能是高電位或低電位，會略低於 VCC
        * Baudrate
            * [常見 Baudrate](https://lucidar.me/en/serialib/most-used-baud-rates-table/)
            * 邏輯分析儀，接 Tx，找間格最短的訊號
            * UART
        * putty
            * uboot
            * printenv
            * setenv
            * tftp

### 拆解韌體

* 7z
* binwalk

Lab01

```sh
john --wordlist=password\ 字典檔.txt ./_kkeps-3.5.bin.extracted/squashfs-root/etc/shadow
Warning: detected hash type "md5crypt", but the string is also recognized as "md5crypt-long"
Use the "--format=md5crypt-long" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (md5crypt, crypt(3) $1$ (and variants) [MD5 128/128 AVX 4x3])
Will run 4 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
p9z34c           (root)     
1g 0:00:00:00 DONE (2024-07-30 09:41) 100.0g/s 10600p/s 10600c/s 10600C/s d4gfgk..WnyW5t
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

### U-Boot

### Unicorn 模擬執行











