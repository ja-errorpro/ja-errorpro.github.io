---
title: "ASUS AiCloud CVE-2025-59366 漏洞分析"
date: 2026-01-25
tags:
  - ctf
  - security
keywords:
  - asus
  - rt-be92u
  - aiCloud
  - vulnerability
  - analysis
  - CVE-2025-59366
  - command injection
  - router security
  - iot security
  - reverse engineering
  - firmware analysis
  - squashfs
  - binwalk
  - mod_smbdav.so
  - 華碩
  - 路由器
  - 漏洞分析
  - 韌體逆向
  - 物聯網安全
  - 雲端硬碟
  - 遠端執行
  - 資安研究
  - 智慧裝置安全
---

在 2025 年 11 月 25 日，ASUS 公布多款路由器存在重大漏洞，導致未授權攻擊者執行特定功能。

網路上幾乎找不到 PoC 或相關文章，剛好最近參加資安營有機會研究這個漏洞。

{{< cf-secret slug="asus-rtbe92u-aicloud-poc" >}}
