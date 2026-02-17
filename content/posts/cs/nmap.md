---
title: 【CTF】Nmap
date: 2023-11-12
tags:
  - ctf
  - security
keywords:
  - nmap
  - network scanning
  - reconnaissance
  - port scanning
  - security tools
  - 網路掃描
  - 埠口掃描
  - 資訊蒐集
  - 安全工具
  - 指令教學
---

# Nmap

[Nmap Download](https://nmap.org/download.html)

Debian安裝

```sh
sudo apt install nmap
```

使用

```sh
nmap -sC -sV <ip/hostname>
```

- -sC: 使用預設的Nmap腳本(--script=default)
- -sV: 啟用版本偵測(-A)
- -T4: 設定掃描速度為4(1-5)，預設為3
- -sS: 送TCP SYN封包來掃描
- -sT: 掃描時使用系統呼叫API送封包(猜作業系統版本，需要root)
- -p: 指定port
- -Pn: 跳過Ping掃描，全當存活服務(避免防火牆拒絕)
- -4: 強制使用IPv4
- -6: 強制使用IPv6
