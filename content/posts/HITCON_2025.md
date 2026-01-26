---
title: HITCON 2025 BadUSB Easy+Medium WriteUp
date: 2025-08-16
tags:
  - ctf
  - security
---

# 前言

2024 年跟 25 年的 HITCON Badge 比起以往非常特別，是用 PCB 做的，可以寫 BadUSB 進去，不需要買什麼 Flipper Zero 還 Rubber Ducky，拿台電腦開起來就能寫了。

去年 BadUSB 我沒有參加到，所以今年有做了點研究，我成功在 D2 早上拿到 Easy 跟 Medium 難度的 First Blood，這篇就來寫下 WriteUp。

# BadUSB

[官方的 BadUSB 說明文件](https://pcb.hitcon.org/2025/BadUSB)

今年文件沒有特別寫要怎麼刷腳本，其實可以找到 [去年的說明文件](https://pcb.hitcon.org/2024/BadUSB.html)，或者去詢問工作人員，就能知道要怎麼刷腳本進 Badge。

## 環境設置

首先你需要一台 Ubuntu 或 Mac 系統的電腦，
我自己在測試時發現 BadgeCommander 如果跑在 Kali 上會沒辦法解析螢幕。

使用時發現 release Page 裡的 BadgeCommander 刷不進去，所以我是直接從 [/sw/BadgeCommander](https://github.com/john0312/hitcon-pcb-badge/tree/main/sw/BadgeCommander) 自己開 Python3 跑起來。

先下載 Repo 還有一些套件

```bash
$ git clone https://github.com/john0312/hitcon-pcb-badge.git
$ cd hitcon-pcb-badge/sw/BadgeCommander
$ pip install -r requirements.txt
$ sudo apt update && sudo apt install -y python3-tk
```

接著要參考 `/sw/BadgeCommander/` 裡的 ReadMe，

需要在 `/etc/udev/rules.d` 裡加條規則，讓 Badge 可以被識別。

```bash
$ cat /etc/udev/rules.d/99-hid.rules
SUBSYSTEM=="hidraw", KERNEL=="hidraw*", MODE="0666"
# 重新載入規則
$ sudo udevadm control --reload-rules
# 觸發規則
$ sudo udevadm trigger
```

然後把 Badge 透過 USB C 線接到電腦上，開啟 BadgeCommander：

```bash
$ python3 BadgeCommander.py
```

接著要輸入縮放倍率，我是輸入 2，不然按鈕會超出範圍。

沒有看到錯誤訊息就可以開始準備腳本刷入了。

## Easy

Easy 的目標是要偵測異常耗資源的 PID，所以只要 ps sort 把高耗能的 Process 列出來就好

```txt
DEFAULT_STRING_DELAY 50
DELAY 1000
DELAY 500
DELAY 500
CTRL-ALT t
DELAY 500
STRING ps -eo pid,cmd,%mem,%cpu --sort=-%cpu | head -n 6
ENTER
DELAY 100
STRING ps -eo pid,cmd,%mem,%cpu --sort=-%mem | head -n 6
ENTER
```

- DEFAULT_STRING_DELAY: 加這行主要是怕輸入太快電腦沒跟上，也可能是我自己電腦的問題，所以我把打字速度降下來
- DELAY: 因為電腦要識別 Badge 會有延遲，就塞一堆 Delay padding。
- CTRL-ALT t: Ubuntu 開啟終端機的快捷鍵是 Ctrl + Alt + T
- STRING: 要輸入的內容
- `ps -eo pid,cmd,%mem,%cpu --sort=-%mem`: 列出目前系統 Process，
  - `-eo pid,cmd,%mem,%cpu`: 指定要輸出的 column，列出 PID、指令、記憶體和 CPU 使用率
  - `--sort=-%cpu`: 按照 CPU 使用率由大到小排列
  - `--sort=-%mem`: 按照記憶體使用率由大到小排列
- `head -n 6`: 取前 6 行，包含標題行所以是列出前五名耗資源的 Process

寫好腳本後存成 txt 檔然後用 BadgeCommander 刷入就可以了。

遇到的坑是有時候在 Clearing Script 時會沒有反應，這邊我是把 Badge 拔掉再插上，然後重新開啟 BadgeCommander，~~不斷嘗試靠運氣就能刷進去了~~。

最後現場跑出來時發現腳本的 ps 反而是最耗資源的，所以略過。

那麼答案就只能是第二名，名為 `yes` 的程式，你會看到他的 CPU 使用率接近 100%。

## Medium

目標是找出挖礦程式，所以用 pgrep 或 ps + grep 把常見挖礦程式名稱找出來

而那些程式名稱 list 直接 Google 搜尋或叫 Gemini 生就好了。

```txt
DEFAULT_STRING_DELAY 50
DELAY 1000
DELAY 500
DELAY 500
CTRL-ALT t
DELAY 500
STRING ps -eo pid,cmd | grep -iE 'miner|xmrig|xmr|stratum|ctyptonight|monero|c3pool|brute' | grep -v grep
ENTER
```

答案是 `xmrig`

## 整合

這是我通關時所用的腳本，把兩題寫在同一個腳本，就不用刷兩次。

```txt
DEFAULT_STRING_DELAY 50
DELAY 1000
DELAY 500
DELAY 500
CTRL-ALT t
DELAY 500
STRING ps -eo pid,cmd,%mem,%cpu --sort=-%cpu | head -n 6
ENTER
DELAY 100
STRING ps -eo pid,cmd,%mem,%cpu --sort=-%mem | head -n 6
ENTER
DELAY 100
STRING ps -eo pid,cmd | grep -iE 'miner|xmrig|xmr|stratum|ctyptonight|monero|c3pool|brute' | grep -v grep
ENTER
```

## Hard(unsolved)

目標：找出非 Ubuntu 預設的 PID

D1 的晚上我刷完前兩題腳本就去睡覺了，而且不想錯過 D2 每場精彩議程，就沒有花時間去解 Hard 題，我只附上一些想法。

我猜是把 kernel, init, systemd 等等的 PID 排除掉，當然目標電腦可能還會有 zsh process 之類的干擾，所以可以多去測試，應該很容易就能找出目標了。

```txt
DEFAULT_STRING_DELAY 50
DELAY 1000
DELAY 500
DELAY 500
CTRL-ALT t
DELAY 500
STRING ps -eo pid,cmd | grep -vE 'kernel|init|systemd'
ENTER
```

後來我有看到其他人解出來了，有空再去看他們有沒有分享 WriteUp。

## 結果

附上合照

![image](/images/hitcon2025/badusb.jpg)

獎品是水杯跟 3C 收納包

![image](/images/hitcon2025/badusb2.jpg)
