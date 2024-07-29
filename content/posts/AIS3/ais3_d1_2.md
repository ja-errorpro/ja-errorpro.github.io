---
title: 【AIS3】威脅情資＆機器學習
date: 2024-07-29
tags:
  - CTF
---

# 威脅情資＆機器學習

`-奧義智慧科技 資安研究處長 陳仲寬 ＆ 資安研究員 陳憶賢 ＆ 資安研究員 黃俊嘉 ＆ 資安研究員 陳勝舢`

## About the Course

We believe AI will change the landscape of cybersecurity, therefore, in this course, we would like to
combine the AI and CTI applications.

* Goal:
    * Understand the basic concept of CTI
    * Apply ML/AI to solve CTI problems

## 威脅情資概述

### What is Threat Intelligence?

* 知己知彼，百戰不殆
* Every contact leaves a trace

### Actionable Threat Intelligence

* 情資有相當多呈現方式，不是每種場域都適合
* 有什麼樣的情資
* 如何使用情資
* 情資可應用程度


>「公部門易受外網攻擊，成功阻擋的防禦率高」 == 屁話


* DDOS Map
* Shodan
* Chimera Threat Report(Blackhat 2020)

> raw data 處理過後才會變 intelligence

### 情資分類

場域視角+攻擊者態勢=威脅情資
攻擊者視角+攻擊者態勢=暗網情資
場域視角+場域態勢=場域情資
攻擊者視角+場域態勢=曝險情資

### 情資應用

場域視角+攻擊者態勢=威脅偵測
攻擊者視角+攻擊者態勢=攻擊歸因
場域視角+場域態勢=資產盤點
攻擊者視角+場域態勢=企業曝險

### Evident/Indicators of Compromise

* IP ADDRESSES
* EMAIL ADDRESSES
* STRGINGS
* FQDNS
* MUTEX
* URLS
* HASHES
* YARA RULES/PATTERNS

### 分析活動 - IoCs

* 例子：APT 攻擊

### 痛苦金字塔

* TTPs - Tough!
* Tools - Challenging
* Network/Host Artifacts - Annoying
* Domain Names - Simple
* IP Addresses - Easy
* Hash Values - Trivial

越下面越好繞過，越好偵測

### STIX Architecture

* 標準通用交流格式
* 防禦自動化

### 藍隊主要應用

* 威脅阻擋
    * 在攻擊發生前，將檔案、連線阻擋
* 威脅偵測
    * 在攻擊發生後，透過情資與行為關聯，偵測威脅
* 威脅獵捕
    * 以攻擊者的手法，定期對場域內部搜尋攻擊軌跡
* TTP 分析
    * 了解攻擊者手法，實作 Play Book 並測試防禦機制

### Contextual IoCs

* 威脅阻擋
    * 明確惡意的才可以阻擋
* 威脅偵測
* TTP 分析

// TODO

### 企業曝險

* 暗網深網
* 常被忽視的情資來源
    * Breached Forum
    * pastebin
    * GitHub
    * Discord / IRC

### 分析曝險資訊

* infostealer
    * redline
        * 賣 cookie / credential
    * magbo
        * 賣企業電腦 access
        * 賣 webshell

### 威脅情資歸因

* 區分各國、團隊
* Diamond Model

### Summary

* 威脅情資介紹
* 認知攻擊者手法
* 威脅情資應用
    * 威脅阻擋、偵測
    * 企業曝險
    * 威脅歸因

## 機器學習概念

### 機器學習＆惡意程式分類

* 機器學習在資安上最經典的應用
* 多種不同分法
    * 惡意 (malicious) / 正常 (benign)
    * 家族 (APT29, Lockbit, WannaCry, etc...)
    * 種類 (Ransomware, Spyware, InfoStealer, etc...)

### 資料集

* 惡意: 200 (VirusShare)
* 正常: 200 (Windows 10)
* 訓練比例
    * 常見 1:1
    * 真實世界比例
* 訓練量
    * 多比少好，通常各超過 10000
* 比起量，內容物是什麼更重要
    * 種類多寡，比例
    * 時間差異

* 資料集
    * 訓練 (Training)
    * 驗證 (Validation)
    * 測試 (Testing)

測試資料集主要解決 overfitting 問題

### 為什麼要驗證資料集

* 在訓練時，模型的目標是要盡量降低訓練資料集的損失(loss)
    * 也就是讓模型預測結果越接近訓練資料集的答案越好
* 模型太接近訓練資料集稱為 過擬合(overfitting)
* 過擬合會發生什麼事
    * 訊練資料集效果很好，實際環境效果很差
* 怎麼知道有沒有發生過擬合
    * 訓練時只能看到訓練資料集的結果，無從判斷是否過擬合
    * 任意選取某個訓練階段的模型當成最終模型太粗糙，模型可能還能表現的更好

### 驗證資料集怎麼產生

* 通常會從資料集中切一部分作為驗證資料集
    * 問題：有可能剛好切到某個類別，像是都拿到惡意程式
* k-folds 是為了避免這個問題產生的算法
    * k 指的是把資料集切成幾分
    * 接著通常會訓練 k 次，每次拿其中一份當驗證資料集，其他當訓練資料集
    * 最後將驗證資料集的驗證結果取平均當成模型的效果
    * 會練出 k 個模型，選哪個因為有 shuffle 所以效果應該差不多，隨便選一個就好
    * 小技巧：驗證資料集可以在確認模型效果後，再放一起訓練兩次
        * fine-tune：在現有模型上以新資料進行微調

### 資料分布

* 指資料內容在空間中的分布

### 評量指標

* 評量不是只有準確度，還有很多種指標
    * 惡意：正常 = 1:99 的資料集可以全猜正常就獲得高準確率的問題也可以換個指標來處理
* 資安產品注重 precision / recall

### 系統架構

* 訓練分類模型有兩大分類
    * 特徵形式：不能直接把執行檔丟進模型，要轉乘對應輸入形式
    * 模型選擇

### 模型架構

* 決定輸入形式，也決定使用何種演算法訓練

### 模型類別

* 傳統機器學習(ML)
    * 決策樹(Decision Tree)
    * 隨機森林(Random Forest)
    * AdaBoost
* 深度學習(DL)
    * 類神經網路及其衍伸方法
    * LLM
* 差異

### AI vs ML vs DL

* 人工智慧：電腦模擬人類行為的技術
* 機器學習：讓電腦可以學習的技術
* 深度學習：多層類神經網路分支
* 人工智慧包含機器學習、深度學習

### 資料前處理

* 整理成需要的形式
* 過濾不適用資料
* 特定資料置換以減少複雜度
* 執行檔
    * 靜態特徵
        * PE Header
    * 動態特徵
        * API 序列
        * 動態字串
        * Mutex
        * 網路連線
        * 讀檔 / 寫檔

### 離散變數

* 特徵可能不是數值形式，如何表達？
* 方法一：男生 0，女生 1
    * 缺點：不見得有連續關係，可能誤導模型
* 方法二：將特徵轉成多個欄位如「是不是男生」、「是不是女生」
    * 缺點：欄位變多，運算量變大

### 數值資料前處理

* 數值分布範圍可能影響模型判斷
* KNN
    * 看最近 K 個點決定類別
    * 「最近」有很多算法，這邊以歐幾里得距離為例

### 正規化 (Normalization)

* 將資料壓縮到特定範圍內(ex: [0, 1], [-1, 1])
* 對於同維度，各筆資料間關係不變

### 標準化 (Standardization)

* 將資料壓成常態分布
    * 減少離群值對於資料的影響

## Excercise 威脅實體標註與訓練提取

### Natural Language Process

* 非結構化 -> 結構化

### Language Model

### Named Entity Recognition


