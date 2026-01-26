---
title: "【HTB Machine】Curling"
date: 2024-09-08
tags:
  - security
url: "/posts/HTB/Curling/"
---

# Curling

## 掃描

![image1](/images/htb/curling/image1.png)

## Web

![image2](/images/htb/curling/image2.png)

使用 Joomla CMS

從 Source Code 看到 `secret.txt`

![image3](/images/htb/curling/image3.png)

從第一篇文推測 Super User 名稱是 `Floris`

![image4](/images/htb/curling/image4.png)

`<url>/secret.txt` 有密碼

![image5](/images/htb/curling/image5.png)

`<url>/administrator` 登入

![image6](/images/htb/curling/image6.png)

## RCE

在 template 新增利用 SSTI RCE

![image7](/images/htb/curling/image7.png)

![image8](/images/htb/curling/image8.png)

在家目錄有三個東西

![image9](/images/htb/curling/image9.png)

輸出來看看，看起來像 hexdump

![image10](/images/htb/curling/image10.png)

用維基百科查詢 magic header 發現是 bzip

![image11](/images/htb/curling/image11.png)

用 CyberChef 驗證，確實是 bzip

![image12](/images/htb/curling/image12.png)

解壓縮後變成 gzip

![image13](/images/htb/curling/image13.png)

Bzip 再解壓

![image14](/images/htb/curling/image14.png)

tar 解壓

![image15](/images/htb/curling/image15.png)

![image16](/images/htb/curling/image16.png)

拿到密碼，可以登入 SSH

![image17](/images/htb/curling/image17.png)

# User Pwned!!!

## Privilege Escalation

翻一下 admin_area

![image18](/images/htb/curling/image18.png)

可以得知 root 會定期執行 curl，可以改掉 input 讓他下載我們的 ssh pubkey，就能直接用 ssh 登入 root

![image19](/images/htb/curling/image19.png)

![image20](/images/htb/curling/image20.png)

![image21](/images/htb/curling/image21.png)

![image22](/images/htb/curling/image22.png)

![image23](/images/htb/curling/image23.png)

# Root Pwned!!!
