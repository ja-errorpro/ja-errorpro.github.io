---
title: 【AIS3】從遊戲學 Windows Reverse - 除了 F5 之外還有哪幾招
date: 2024-07-30
tags:
  - CTF
---

# 從遊戲學 Windows Reverse - 除了 F5 之外還有哪幾招

`-undefined 戰隊 林祐聖 ＆ 陳兆閔 ＆ TeamT5杜浦數位安全 RD 林哲宇`

## Link Start!

### 分析目標的五個階段

* 理想
    * 執行方式 -> 分析方式 -> 觀察目標 -> 理解邏輯 -> 寫腳本
* 現實
    * 跳來跳去

### 執行方式(Debug 能力)

* 作業系統版本、架構不對
* 執行環境架不起來
* 缺少相依套件
* 相依套件版本不對

### 分析方式(Survey 能力)

* 找不到適合分析目標的工具
* 不知道目標如何實作

ex: IDA 分析 C#

### 觀察目標(觀察力)

* golang, rust
* 找不到關鍵處
* IDA 一堆 Function

### 理解邏輯(逆向能力)

* 看 Code 速度
* 理解程式在做什麼
* 猜出題者想做什麼

### 寫腳本(程式、工具使用)

* 不會寫程式
* 工具不熟悉
    * ex: z3, pwntools, gdb script...
* 資料結構、演算法不熟
    * ex: 有向循環圖找一條路徑滿足特定條件

### CTF Reverse

* 做以下假設幫助思考
    * 題目一定有 flag -> 出題者用某種方式把 flag 藏起來
    * 達到某個條件會觸發計算或驗證 flag 的操作
         * 驗證類型：輸入正確時輸出 correct，反之 wrong
         * 計算類型：執行到特定程式碼解密出 flag
    * 出題者通常基於什麼做出題目的
        * ex: 某專案、工具、論文

### 工具

* Detect It Easy
    * 確認 binary 類型
    * 如何實作
    * 是否加殼
* CFF Explorer
    * 觀察 PE 結構
    * 更改結構設定
* Cheat Engine
    * 記憶體掃描
* Process Monitor
    * Sysinternals kit
    * 監控紀錄系統行為
    * CTF 看到以下事件可多關注
        * network
        * file write
        * process create
* IDA Pro
    * 反組譯、反編譯
    * idapython
    * plugin
* x64dbg
    * x64dbgpy
    * 不能 debug windows kernel -> windbg


## PACMAN - 2023 AIS3 Pre-exam

### 觀察

* DIE 取得 PE 檔案資訊
* 玩遊戲，知道遊戲規則
* 猜目標
    * 隱藏按鈕
    * 分數大於某值
    * 吃大豆子的數量
    * 撞死幽靈數
    * 破關次數

* 技巧 - DYNAMICBASE
    * CFF Explorer 關 ASLR

- find out what write to this address
    - 反外掛會偵測
- disassemble 找位置
- IDA
- 寫解題腳本
    - x64dbg dump flag/key
    - `AIS3{pacman_is_an_eternal_classic}`

### 另解

- 找到出題者實作方式
    - 找字串特徵做搜尋
- bindiff

## CrazyArcade - 2023 HITCON CTF

## 其他玩法 - 遊戲外掛

### External Hack

* 從非目標 Process 操作目標 Process 的記憶體

### Internal Hack(DLL Injection)

* 注入目標 Process 後從內部竄改目標 Process 的記憶體

## 從遊戲回到現實 - 經驗分享

| | CTF Reverse | 實際研究 |
| :-: | :-: | :-: |
| 目標 | flag | 自己訂 |
| 環境 | 想辦法讓目標能動 | 想辦法讓目標能動 |
| 方法 | 找合適工具 | 找合適工具 |
| 效率 | 觀察找到關鍵程式碼 | 找到能幫助解決問題的地方 |
| 分析 | 逆向分析 | 通常有 source code |
| 結果 | 寫解決腳本 | 改寫需要的部份解決問題

### Powershell 反混淆

