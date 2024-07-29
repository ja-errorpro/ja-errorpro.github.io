---
title: "【AIS3】面對國家級關鍵基礎設施網路攻擊威脅: 從工業控制系統到網路攻防"
date: 2024-07-29
tags:
  - CTF
---

# 面對國家級關鍵基礎設施網路攻擊威脅: 從工業控制系統到網路攻防

`-TXOne Networks Inc. Senior Threat Researcher Yenting Lee`

## 關鍵基礎設施(CI) 與工業控制系統(ICS) 現狀

* 對產業特性、網路架構及相關經驗不熟悉
* 資安人員少接觸
* 不知道產業實務應優先考慮的事項
* 最初設計沒對資安做考量

## 大綱

* 關鍵基礎設施
* 工業控制系統
* ICS 攻擊策略
* CI 防禦策略

## 關鍵基礎設施 (CI)

* 受到衝擊會影響國家經濟，自然環境或社會安全等設施

* 各國對 CI 定義稍有不同
    * 大多與能源、交通、醫療、通訊、金融、政府相關

### 美國 CI

* 賭場
* 飯店
* 核能

### 國家級 CI 網路攻擊

* 2009 Stuxnet 對伊朗核能設施攻擊
    * 離心機異常加速
    * 多個 0 day 漏洞
    * 第一個針對工業控制環境的攻擊
* 2015 俄羅斯沙蟲團隊針對烏克蘭電網
    * 破壞為目的
    * 大量妨礙策略
* 2023 丹麥能源產業攻擊鏈
    * 偵查
    * 武裝
    * 遞送
    * 漏洞利用
    * 安裝
    * 命令控制
    * 行動
* 針對 CI 攻擊不一定要用一堆 0 day

### 為何 CI 難防攻擊

* 產業結構龐大
    * 醫療保健產業: 個資外洩
* 供應鏈關係緊密
    * 半導體產業: 供應鏈關係緊密 (設計->製造->封裝)
* 工業控制系統環境

## 工業控制系統 (ICS)

* 普渡模型
    * Layer 0
        * 物理設備
        * 感測器
    * Layer 1
        * 控制器
        * PLC
    * Layer 2
        * 人機介面 HMI
        * 現場設備顯示/控制
    * Layer 3
        * OT 環境伺服器
        * 搜集、分析資料
    * Layer 4/5
        * 

### 風險管理需求

| IT | OT |
| :-: | :-: |
| CIA | 強調可用性 |
| 3~5 年更新 | 10~20 年更新 |
| 可任意擴充 | 無法自行安裝任何軟體安全性套件 |
| 非即時性系統 | 即時性系統 |
| 可依需求重開機 | 不可任意重開機 |
| 一般通訊協定 | ICS 通訊協定 |

### OT 環境的脆弱性

* 內部威脅: 第三方工程師或廠商設備
* 老舊系統: 許多作業系統或設備已終止支援
* 網路扁平: 網路未適當分割
* 更新限制: 設備保持運行，難以實現更新流程
* 不進行螢幕鎖定

### 可程式化邏輯控制器 (PLC)

* 用來執行特定的工作，達到自動化控制現場設備

### PLC 如何程式化

* IEC 61131-3 標準定義 PLC 程式 5 種語言進行程式撰寫
* 圖形化
    * 階梯圖(Ladder Diagram, LD)
    * 功能區塊圖(Function Block Diagram, FBD)
    * 順序功能流程圖(Sequential Function Chart, SFC)
* 文字(Python)
    * 指令表(Instruction List Diagram, ILD)
    * 結構化文字 STL

### OT 環境架構

* 工程師電腦有最高權限
* 安全性
    * Safety != Security
    * 安全系統不一定安全(Security)


## ICS 攻擊策略

* 伺服器
* 供應鏈
* 工業通訊協定
* 無線網路
* 實體攻擊

### 伺服器攻擊

* 多為 Windows 系統
    * SMB
    * SSH
    * FTP
    * RDP
    * Database Service

ex: Nmap + Metasploit

* 工控通訊協定攻擊
    * 乙太網路 Ethernet/IP
    * Modbus
        * 公開協定、開源
        * 主從式架構
        * 較早期協定，未考慮安全設計
        * 預設連接埠 TCP 502
    * DNP3
        * 電力
    * S7
        * 西門子
### Modbus 封包格式

* Unit ID
    * memory address
* Function Code
    * 類似 syscall
* Function's data
* crc

### Modbug 資料儲存區

* coil
    * 0/1
    * 按鈕開關
* Register
    * 0 ~ 255
    * 溫溼度壓力等資訊

### ARP Spoofing

* MITM: 使用 ettercap

### MQTT 通訊協定

* IT 與 OT 接口
* 發布與訂閱性
* MQTT Client
* MQTT Broker

### MQTT Working

* Topics
    * UTF-8 字串 ~= 地址
    * `#` = 所有
* Broker 將訊息發到目的地

## 無線網路攻擊

- 無線射頻
    - 3k ~ 300G Hz
    - wifi : 2.4 GHz 至 2.5 GHz、5.15 GHz 至 5.825 GHz
    - 藍芽 : 2.402 GHz 至 2.480 GHz
    - GPS
- 抓已知協定的工具
    - WiFi
        - aircrack-ng
    - ZeBee
    - 藍芽
- 其他工具
    - HackRF
    - RTL-SDR
    - bladeRF

### 找頻率
- 產品說明書
- FCC ID
- 商品想在美國賣必須要提供 [FCC ID](https://fccid.io/)
- ISM bands
    - 各國挪給工業、科學以及醫學機構使用的頻段
- [中華民國頻率表](https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg026205/ch06/type1/gov50/num13/images/Eg01.pdf)

#### 調變

- 要接收越低的頻率，天線要越長
- 單極天線適當長度：75 / Frequency (Mz)


#### GPS 蓋台竄改(spoofing)
* hackRF

<!--  反正是公司的，不是我的 -w- 
剛剛那個飛行聲直接醒了  6 6 鬧鐘-->

## 設備實體攻擊

- 電表水表瓦斯表
- 管線、號誌

### 電路板
- Debug interface
    - UART
- 記憶體

### 工具
- Attify badge
- Bus Pirate

### UART

- 4 個孔
    - TX
    - RX
    - VCC
    - GND

### 智慧電表

- EEPROM
- I2C

## 供應鏈攻擊

### PLC 生命週期

工作人員-開發-傳輸-自動控制-顧客

### PLC 開發

* program upload 下載 PLC 程式
* program download 上傳 PLC 程式
* 如果有其他工程師想寫這個 PLC，可直接使用裡面的程式碼，如果程式碼有惡意程式，就有可能在測試執行時被攻擊

### 攻擊

包 PLC 時候包入惡意程式
IDE 信任來自 PLC 的資料，危害工程師電腦

## 威脅分析

### CTI
#### [ATT&CK](https://attack.mitre.org/)

* 戰術-技術-子技術
* 共同語言
* 例子
* 應對措施

ICS 與企業版本使用戰術差不多，但多以破壞為主

#### 威脅團隊

#### 惡意程式

#### ATT&CK ICS 評鑑

* TRITON
* 針對真實案例進行評估
* 不排名評分

### CI 防護策略

* SBOM 軟體物料清單
* codesys
* Fortify 原碼檢測

**並非所有漏洞都要修補**

* 未實際使用元件
    * log4j
* 無法接觸到的元件
* 已修補的元件

### 困難
- SBOM 資料基準/驗證
- 命名標準約定
    - clop/cl0p
    - ATP 組織名稱不一 
    
解決方案:
- 固定標示符
    - OmniBor 透過Hash值生成標示符
    - 缺點
        - 不同版本可能生成相同標示符
        - 不容易被人類理解
- 定義標示符
    - CPE (common platform enumeration)
    - purls
    - SWID
    - 缺點
        - 需有機構維護標示符
        - 需要有人生成
        - 難以涵蓋全球

### 歐盟資安韌性法 (CRA)
- 要求製造商在歐盟販售的產品需提供消費者保障
- SBOM 要求
- 有罰款



