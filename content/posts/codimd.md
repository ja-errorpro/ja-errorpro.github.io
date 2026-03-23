---
title: "自架 CodiMD 採坑記"
date: 2026-03-23
tags:
  - mix
keywords:
  - CodiMD
  - Docker
  - 採坑
  - HackMD
  - 自架
description: "一些自架 CodiMD 遇到的問題，提供解決方案和建議。"
---

# CodiMD

可以把 CodiMD 想成自架的 HackMD，但 HackMD 的免費版只能支援 5 人同時編輯，而 CodiMD 沒有這個限制，所以如果需要多人協作的話，CodiMD 是一個不錯的選擇。

## 安裝

- docker-compose.yml

```yaml
services:
  database:
    image: postgres:11.6-alpine
    environment:
      - POSTGRES_USER=YOUR_USERNAME_HERE
      - POSTGRES_PASSWORD=YOUR_PASSWORD_HERE
      - POSTGRES_DB=codimd
    volumes:
      - "database-data:/var/lib/postgresql/data"
    restart: unless-stopped
  codimd:
    image: nabo.codimd.dev/hackmdio/hackmd:2.6.1
    environment:
      - CMD_DB_URL=postgres://YOUR_USERNAME_HERE:YOUR_PASSWORD_HERE@database/codimd
      - CMD_USECDN=false
      - CMD_DOMAIN=codimd.ja-errorpro.codes
      - CMD_OAUTH2_BASEURL=https://codimd.ja-errorpro.codes
      - CMD_PROTOCOL_USESSL=true
      # 因為 PDF 匯出會導致 crash，所以要加上下面這兩個環境變數使其能正常運行
      - QT_QPA_PLATFORM=
      - OPENSSL_CONF=/etc/ssl
    depends_on:
      - database
    ports:
      - "3000:3000"
    volumes:
      - upload-data:/home/hackmd/app/public/uploads
    restart: unless-stopped
volumes:
  database-data: {}
  upload-data: {}
```

在網路架構上，我將 CodiMD 放在內網的一台主機，使用 Cloudflare Tunnel + Zero Trust Access 來暴露服務，避免有人未經我的允許訪問我的 CodiMD。

## 如何加入 GitHub OAuth?

先到 GitHub Developer Settings 中建立一個新的 OAuth App，callback URL 以我的例子來說就是 `https://codimd.ja-errorpro.codes/auth/github/callback`，然後就可以拿到 Client ID 和 Client Secret，接著在 docker-compose.yml 中加入環境變數

```yaml
- CMD_GITHUB_CLIENTID=拿到的 Client ID
- CMD_GITHUB_CLIENTSECRET=拿到的 Client Secret
```

## PDF 匯出會導致 crash?

根據 [這篇 issue](https://github.com/hackmdio/codimd/issues/1862)，加入下面這兩個環境變數可以解決 PDF 匯出導致 crash 的問題(QT_QPA_PLATFORM 留空)。

```yaml
- QT_QPA_PLATFORM=
- OPENSSL_CONF=/etc/ssl
```

如果之後還有遇到其他問題，會再更新這篇文章。