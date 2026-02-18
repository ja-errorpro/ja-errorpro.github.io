---
title: 【HTB Machine】WingData
date: 2026-02-18
tags:
  - security
keywords:
  - htb
  - wingdata
  - wingdata.htb
  - recon
  - nmap
  - ssh
  - http
  - ffuf
  - enumerate
  - enumeration
  - vulns
  - vulnerabilities
url: /posts/HTB/WingData
description: "HTB Machine WingData is a easy difficulty machine that requires enumeration and exploitation skills. In this writeup, we will go through the steps to solve the machine and gain root access."
---

## Recon

```sh
sudo nmap -sCV -p- --min-rate 10000 -oN nmap.txt Remote_IP

---

# Nmap 7.98 scan initiated Tue Feb 17 20:12:10 2026 as: /usr/lib/nmap/nmap -sCV -p- --min-rate 10000 -oN nmap.txt 10.129.245.192
Nmap scan report for 10.129.245.192
Host is up (0.087s latency).
Not shown: 65533 filtered tcp ports (no-response)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u7 (protocol 2.0)
| ssh-hostkey:
|   256 a1:fa:95:8b:d7:56:03:85:e4:45:c9:c7:1e:ba:28:3b (ECDSA)
|_  256 9c:ba:21:1a:97:2f:3a:64:73:c1:4c:1d:ce:65:7a:2f (ED25519)
80/tcp open  http    Apache httpd 2.4.66
|_http-title: Did not follow redirect to http://wingdata.htb/
|_http-server-header: Apache/2.4.66 (Debian)
Service Info: Host: localhost; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Feb 17 20:12:39 2026 -- 1 IP address (1 host up) scanned in 28.94 seconds
```

add Remote_IP to /etc/hosts

```sh
echo 'Remote_IP wingdata.htb' | sudo tee -a /etc/hosts
```

{{< cf-secret slug="htb-wingdata" >}}
