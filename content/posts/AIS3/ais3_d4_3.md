---
title: 【AIS3】前端不只有 alert 可以彈
date: 2024-08-01
tags:
  - CTF
---

# 前端不只有 alert 可以彈

`-DEVCORE 資安研究員 黃志仁 splitline`

## 安全原則

* 同源政策
    * A 網站不能讀 B 網站的東西(Browser 層限制)
    * 可能可以寫

## CSRF(Cross-Site Request Forgery)

* `superlogout.com`
    * 點進去會把一堆服務登出，按進去請小心
* 偽造 client 端的惡意請求
* 即使使用 POST 也有機會被攻擊

### CSRF Token

* 使用者訪問網站時被設定一個 token 放在 cookie
* 發送請求需同時送出 token

### 不能 CSRF 的情況

* 非 GET 或 POST 請求
* 特殊 HTTP header
* Samesite Cookie
    * Lax
        * 只有 `<a>、<link>、<form method="GET">` 會帶 cookie
        * 在 Chrome、Edge 上預設
    * Strict
        * 不論如何都不會從其他地方把 cookie 帶過來
    * None
        * 不論如何都會帶 cookie
        * 新版標準需要帶 Secure

## XSS

* Cross-Site Scripting
* 讓使用者瀏覽器執行駭客給的任意 Script

### Self-XSS

* 自己手動把 Script 跑起來

### XSS Category

* Reflected XSS
    * 惡意輸入一次性的映射 (Reflect) 到網頁上
    * ex: 搜尋欄輸入 `<script>alert(1)</script>` 後按下搜尋彈出 alert
* Stored XSS
    * 伺服器會儲存 (store) 駭客的惡意輸入
    * ex: 留言板有惡意腳本，所有人看到都會執行
* DOM-based XSS
    * JavaScript 讀取惡意輸入造成 XSS

### Event Handler

* `<svg/onload=alert(1)>`
* `<img src=x onerror=alert(1)>`
* `<input onfocus=alert(1)>`

### javascript: Scheme

* `<a href="javascript:alert(1)">click me</a>`
* location.replace('javascript:alert(1)')

## 防禦

* Blacklist: 空格，可以這樣繞過
    * TAB
    * Newline
    * /
    * JSFuck

### What can XSS do exactly

* 偷 cookie(無 HttpOnly flag)
* 偽造請求，不受 CSRF 限制
* 偷各種資訊

### prevent

* Escape HTML / Javascript (Too Hard)
* https://www.acunetix.com/blog/web-security-zone/mutation-xss-in-google-search/

### CSP

* Content Security Policy
* 瀏覽器根據 CSP 控制對外部的請求
* Response Header
    * Content-Security-Policy: ...
* Meta Tag
    * `<meta http-equiv="Content-Security-Policy" content="...">`
* https://csp-evaluator.withgoogle.com/
* Directive
    * default-src
    * img-src
    * style-src
    * script-src
    * frame-src
    * connect-src
    * ...

### CSP Bypass

* base tag
* script gadget
    * DOM Based XSS
* whitelisted CDN/Host
    * https://blog.orange.tw/2019/03/a-wormable-xss-on-hackmd.html
    * https://github.com/k1tten/writeups/blob/master/bugbounty_writeup/HackMD_XSS_%26_Bypass_CSP.md

## DOM Clobbering

### Click a button By Javascript

* `<button's id>.click()`
* DOM 可控制 JavaScript 變數
    * id 可蓋掉 windows.*
    * name 可蓋掉 windows.*, document.*
    * `<a id="abc" href="https://ja-errorpro.codes"/>` -> alert(abc)
    




