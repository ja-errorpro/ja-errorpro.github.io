---
title: OSCP筆記-枚舉
tags:
  - OSCP
  - security
keywords:
  - enumeration
  - oscp
  - pentesting
  - network scanning
  - reconnaissance
  - checklist
  - 資訊蒐集
  - 滲透測試
  - 檢查清單
  - 網路掃描
  - 認證考試
url: "/posts/OSCP/enumeration"
---

# Checklist

- 檢查環境變數、history
- 檢查 hostname、OS 版本

## nmap

```sh
sudo nmap -sCV -p- -Pn --min-rate 10000 host -oN nmap.txt
```

- 使用 `-sUV` 掃描 UDP 服務

## Linux

### Full TTY

```sh
python -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
stty raw -echo; fg
```

## Windows

### 確認是 powershell 還是 cmd

```sh
(dir 2>&1 *`|echo CMD);&<# rem #>echo PowerShell
```

- WinPEAS
- 嘗試使用者名稱 `lastname.firstname`

## Web

- wappalyzer
- 使用 gobuster 或 feroxbuster 或 fuff 掃描目錄

```sh
gobuster dir -u http://host -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 10 -o gobuster.txt
feroxbuster -u http://host -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
fuff -u http://host/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

- 根據不同軟體，掃描副檔名

```sh
gobuster dir -u http://host -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,asp,aspx,jsp,js -t 10 -o gobuster-ext.txt
```

- 子域名掃描

```sh
gobuster dns -d example.com -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt -t 10 -o subdomains.txt
fuff -u host -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt -H "Host: FUZZ.example.com" -t 10 -o subdomains-fuff.txt # -fc 403，忽略 403 狀態
```

- 注意登入表單
- 嘗試 `.git`、`.svn`、`.hg`、`.htaccess`、`.env`、`robots.txt` 等檔案
- 注意 LFI/RFI

## Netexec

- user 跟 pass 可以帶 file list

- 密碼政策

```sh
nxc smb host --pass-pol -u '' -p ''
```

- 枚舉使用者

```sh
nxc smb host --users
```

- 多台主機

```sh
nxc smb 192.168.1.100-110 --users
```

- 如果有本機管理員，嘗試 Pass the Password/Hash
