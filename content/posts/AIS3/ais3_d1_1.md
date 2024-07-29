---
title: 【AIS3】The Journey of Becoming a Vulnerability Researcher
date: 2024-07-29
tags:
  - CTF
---

# The Journey of Becoming a Vulnerability Researcher

`-DEVCORE 資深資安研究員 楊安傑 Angelboy`

### 案例

* WannaCry(Eternel Blue)
* CrowdStrike BSOD

## Bug Hunting

* 主動找尋可能的漏洞
* 漏洞可能造成的危害
    * Remote Command Execution
    * Privilege Escape
    * Information Disclosure
    * Denial of Service

## Vulnerability Researcher

* 漏洞挖掘分析
* 攻擊手法研究

### How to Start

* Prepare the required knowledge
    * 計概、計組、C語言、asm、OS
    * 程式設計師的自我修養
    * Binary HACKS
    * The Art of Software Security Assessment
    * 台大台科交大聯合課程
    * 實作
    * AIS3 MyFirstCTF
    * 台灣好厲駭
    * pwn.college
    * Live Overflow

### CTF 

* 一場好的 CTF 會讓你學到技術
    * 0ctf 2019 - AddressSanitizer 保護機制
    * \*ctf - oob-v8，怎麼打 Browser
    * 0ctf 2020 - Chromium RCE
    * DEFCON 2022 QUAL - ncuts，兩萬多個 binary 解 reverse 拼出 flag.jpg
    
* 初學階段
    * 挑選適合自己的 CTF
        * 教學性質：PicoCTF, MyFirstCTF
        * Wargame： pwnable.kr, pwnable.xyz
        * 指標性 CTF (ctftime weight > 80) - PlaidCTF, Google CTF, HITCON CTF, Balsn CTF
    * 組隊

### 解不出來怎麼辦

* 一開始解不出來很正常，就算比賽結束也可以給自己一個 deadline (2-3 天)
* 比賽期間沒想法，盡量 google 相關知識及過往類似題目
* 不要害怕太難
* Don't give up
* 多多練習找洞的方式

### 解出來之後就沒事了嗎

* 多看看別人的解法
* 想想有沒有更簡單的解法
* CTF 官方的 IRC
* Discord
* 當可以任意寫時有什麼方法可以控制 RIP
    * fini_array
    * dl_runtime_resolve
    * hook series
    * glibc GOT
    * tls_dtor_list
    * FSOP

* 讀書會
    * 隊內分享解法
    * 更有效率學習其他題目知識
    * 重新審視自己解的題目細節
* 紀錄
    * 寫 writeup 做一下筆記
    * 幫助正在學習的其他人

**找資安研究員工作，寫下學習到的技術非常重要**

**通常 CTF 打久就很難學到東西了(兩年)**

* 其他學習路線
    * 寫外掛
    * 破解軟體
    * 實際漏洞分析

## Play in the real world

| CTF | Real World |
| :-: | :-: |
| 費時短、有限時間內完成 | 費時長、通常無時間限制 |
| 通常已知，目標明確 | 探索未知領域 |
| 基本上必有一解 | 不一定有解，但很常什麼都沒有 |
| Exploit 可不用管穩定度 | Exploit 穩定度非常重要 |
| 現實上難遇到 | |

* 多看 Real world 漏洞及利用手法
* 多讀別人的分析開始
    * 漏洞成因
    * 利用技巧
* diff 技巧，看漏洞發生處
    * Diff is very important
    * 很多漏洞往往都是基於過往漏洞被繞過
    * 漏洞研究員日常
* 挑自己有興趣的 CVE，嘗試復現
* 從 Patch 到利用過程，都有很多可以學習的地方

https://doar-e.github.io/blog/2022/06/11/pwn2own-2021-canon-imageclass-mf644cdw-writeup/

https://qriousec.github.io/post/vbox-pwn2own-2023/

* 1day 漏洞

cve to find issue number -> patch -> write PoC

### 找一個自己有興趣的目標，並開始對目標研究

* Junior Bug Hunter
    * 小型專案或軟體開發
    * 適合自己的目標
        * 健保卡元件
        * IoT
        * Router
* Bug Hunter
    * 中小型 Open Source project
        * ftp/mail server
    * 單一功能的 Service 或軟體
        * 影音播放/Image Viewer
    * 盡可能掌握好自己未來想發展的領域
    * 未來看大型軟體的往往 Code base 都是等比級數上升

[第一次打 Pwn2Own 就 SOHO Smashup 是不是搞錯了什麼？](https://conf.devco.re/2024/keynote/DEVCORE-CONFERENCE-2024-LJP-YingMuo-Is-It-Wrong-to-Try-to-SOHO-Smashup-in-Our-First-Pwn2Own.pdf)
[From Zero to Hero — 從零開始的 Pwn2Own 奪冠之路](https://conf.devco.re/2023/keynote/2023-Orange&Angelboy-From-Zero-to-Hero-A-Journey-to-the-Championship-of-Pwn2Own.pdf)

* Senior Bug Hunter
    * 挑戰大型專案
        * Linux Kernel
        * Windows Kernel
        * Office 系列
        * Browser
    * Pwn2Own

### 挑選比自己能力高一點點的目標

### 興趣也是很重要的

### 先專精於一個目標
    * context switch 成本很高

### 對目標做漏洞挖掘

* Recon
    * 環境準備
        * 生出可以運作的環境
        * Router
            * qiling Framework
            * Firmadyne
            * 不一定跟實體一模一樣
            * 直接買一台(盡量)
        * Debug
            * 視情況建立 Debug 環境
                * 研究 Virtual
                * Chrome V8 engine
        * Printer RTOS
            * 需要想辦法生出 debug console
                * 拆機器
            * 降版本
    * 運作分析
        * 看大型專案很容易看不懂在幹嘛，可閱讀相關文章
    * 架構分析
        * 有哪些元件
        * 那些元件負責哪些功能
        * 資料如何傳遞
        * 使用者如何互動
            * Windows kernel driver
                * 如何用 DevideIoControl 跟特定 device 溝通，handler 在哪
    * 攻擊面分析
        * 攻擊面列舉
            * 哪些服務碰得到
            * 哪些功能是 pre-auth
            * 有無其他第三方 Open Source Project
        * 歷史漏洞分析
            * 哪些服務看起來程式碼品質較差，或是容易寫出問題
            * 從 CVE 數量通常可以看出哪些元件比較有問題
            * 定期追蹤 Patch
                * Patch Tuesday
                * GitHub issue
        * 過去研究
            * 前人的智慧
            * 走先前別人的研究，看看有哪些 Attack Surface 可以挖掘
                * BlackHat
                * DEFCON
                * HITB
                * OffensiveCon
                * 多看多讀
            * 優點：資料量多，容易上手
            * 缺點：撞洞、容易發現的洞可能已經被挖光了
        * 全新攻擊面
            * 自己找新的 Attack Surface，需要更全面性了解，大量經驗、奇特思路
            * 頂尖研究員所追求的目標
            * 極度花時間
                * 新接觸不建議
                * 很可能沒結果
    * 其他管道
        * Twitter 筆記、討論
* Analysis
    * 挖洞手法
        * Fuzzing
            * 運氣
            * AFL + ASAN
            * 主流 Fuzzer 適合初學者
        * Code Audit & Reversing
            * 看 Code
            * 看不懂正常
            * 至少要知道要看哪些執行檔或程式碼
            * 工具及 Plugin 也很重要
                * CodeQL
                * Vim + gtags
                * VSCode
                * IDA Plugin
                    * Abyss
                    * LazyIDA
                * ChatGPT 幫你寫 Plugin
                    * 輔助用
                * GDB Plugin
                    * Pwndbg
                    * gef
                * Process Monitor
                * Trace 系列
                    * ltrace/strace
                    * dtrace
                * 可同步靜動態分析
                * Other Resource
                    * [Reverse without Reversing - Alex ionescu](https://youtu.be/2D9ExVc0G10)
                    * [The Windows Registry Adventure #3: Learning resources - J00ru](https://googleprojectzero.blogspot.com/2024/06/the-windows-registry-adventure-3.html)

                * 學會怎麼問 GPT 很重要
            
* Entrypoint
    * 不要都從 main 開始
    * 從 dangerous function 往回找
    * 從功能面找
        * 容易出問題的功能
            * Auth、Parser
        * 特定 Pattern
            * http server 先找 GET、POST 等字串
    * 從 user input 往下追
        * 目標比較大時
        * 讓自己更了解架構
        * Windows Filesystem - mini filter
    * 不要單純只用看的
    * 持續斯靠
    * 猜測他行為可能有什麼問題
    * 不要假設他有好好寫，很多愚蠢的錯誤
    * 隨時保持懷疑的態度
    * 不放過任何可疑行為
    * 不放過微小的漏洞
        * 案例：四個廢洞串成 RCE
    * 不要只點單一技能點
    * 擴大攻擊面
        * 單一產品 -> 多數產品
        * Local 觸發 -> Remote 觸發
        * 需要使用者互動 -> 不需使用者互動
        * Post-auth -> Pre-auth
        * Netatalk
            * Synology -> Many NAS

* Write PoC and Exploit
    * 寫下可以證明漏洞存在的 PoC
    * 純回報可以 trigger crash 就好，不要執著於寫 Exploit
    * Exploitation
        * 參加 Pwn2Own 會需要寫 exploit 的時候，通常需要
            * 知道歷史漏洞都怎麼寫
            * 對目標有一定了解程度
            * 經驗的累積 -> CTF 經驗
    * 穩定的利用方式 - Pwn2Own 或紅隊需求
        * 可能是**最難**的，也是跟 CTF 最不同的
            * 要保持服務可正常運作，不可 DoS
    * Bug Report
        * 回報到哪
            * 原廠
            * ZDI
            * HITCON ZeroDay
            * Twcert/cc
        * 回報內容
            * 影響到的產品版本，環境
            * 清楚描述漏洞類型及位置
            * 怎麼樣的情況會發生，會造成怎樣影響
            * 會觸發的 PoC
            * 產品資訊
        * Microsoft 回報例子
            * Security Impact
            * Product
                * 小版本號
                * 預先做 snapshot
            * Description & Title
                * 照 template 寫
                * 清楚描述漏洞類型及位置
        * PoC(Step to Reproduce)
            * 觸發 PoC
            * 使用說明
            * 預期結果
            * 非預期結果
            * 如果可以寫成 Script 一鍵完成最好
            * 如果可觸發 Crash，最好附上位置
        * 不要在廠商修復前公開
### 撞洞是很常見的事情
### After bug fixed
            
* 紀錄
    * 技術分析、找洞過程
    * 學到什麼
    * 為自己而寫
    * 漏洞修補後過一段時間，可分享給其他人，如果是新技術可以投稿到國內外各大 Conference
        * 建議先跟廠商溝通後再公開

### 漏洞研究員

* Independent Researcher
    * 賞金獵人
    * 收入難以預估
    * 研究方向較自由
    * 參考 HITCON 2022 - 從 Binary Research 到賞金獵人的致富之路
* Red team
    * 專注找到可以影響世界的漏洞
        * Exim
        * SSL VPN
        * Exchange
        * Pwn2Own
    * 多數都會挖掘自身有興去且能影響企業及世界的漏洞
        * 增加自身及公司的 credit
    * 不定期的 PT 專案
        * 以軟體安全為主
    * 協助 Red Team 解決技術上問題
        * ServiSign
            * 公家機關愛用
            * 本地開啟的 Web Server
* Blue team
    * 進階攻防技術研究
    * 產品前期研究
    * 特殊案例分析
    * 教育訓練與社群
* Security Research Company
    * 純漏洞挖掘
    * 壓力較大
    * 需寫 exploit
    * 背後通常是政府機關
* 學術界
    * Fuzzing
    * 增加挖洞效率
    * 防禦方式
    * 嶄新攻擊手法

## 如何進入職場

* 增加實務經驗
    * OSCP 系列證照
        * OSED
        * OSEE
    * 挖掘漏洞並回報
    * 寫 1 day exploit
    * 熟悉 windows 環境
* 樂於分享
    * 寫技術文章
        * CTF Write Up
        * 漏洞分析
    * 公開演講
        * 台灣好厲駭
        * HITCON
    * 讀書會
        * 台灣好厲駭 Deep Hacking
    * 定期追蹤新資訊
        * 資安領域日新月異盡可能每天 follow
            * 新漏洞
            * 新技術
            * 新防禦技術
        * 新資訊管道
            * Hacker News
            * Twitter
            * BlackHat
        * 個人知識管理
            * 方便搜尋關鍵字
* 企業實習經驗
    * 漏洞挖掘
    * 攻擊手法研究

## 適不適合當漏洞研究員

* 早餐配漏洞新聞
* 看到有興趣的東西，研究到下班
* 興趣
* 熱情
* 創造力
* 樂於分享
* 追求卓越

## 隨時保持好奇心


