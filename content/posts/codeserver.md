---
title: 自架CodeServer，實現隨時隨地都能寫程式
date: 2022-02-16
tags:
  - mix
---

最近架了一台CodeServer，那是一個具有VSCode的伺服器平台，要他支援什麼語言照著一般設定VSC2方式就行~

# 先備條件：

* 會用Windows跟Ubuntu
* Docker以及容器的基礎操作

# 參考資源： 
[codercom/Code-server](https://hub.docker.com/r/codercom/code-server)

# 本文所用配備及版本：

* 物理機環境： Windows 11 Pro 21H2
* Code Server版本： v4.0.2

# 步驟

(這裡省略前面Docker的安裝步驟)

1. 先開一個資料夾名為CodeServer，這是伺服器的根目錄
2. 新增一個檔案，檔名為docker-compose.yml
3. 編輯檔案，貼上這些：
```yml
version: "2.1"
services:
  code-server:
    image: codercom/code-server
    container_name: code-server
    environment:
      - TZ=ASIA/TAIPEI
      - PASSWORD=<設定進入伺服器的密碼>
      - SUDO_PASSWORD=<設定Root權限的密碼>
    volumes:
      - ./appdata/code-server/project:/home/coder/project
      - ./appdata/code-server/.local:/home/coder/.local
    ports:
      - <PORT>:8080
    restart: always
```
(1) version: 不用動他

(2) image: 指定目標映像，Docker會試著到上面給的網站找尋映像檔

(3) container_name: 給容器隨便取一個名字

(4) TZ: Timezone時區

(5) PASSWORD、SUDO_PASSWORD: 設定並記好這兩個密碼

(6) volumes: 每項的冒號左邊是物理機上的資料夾，會對應到冒號右邊虛擬機資料路徑，**必須設定正確否則虛擬機會在重新開機(或更新)後恢復原廠**

(7) ports: 請修改\<PORT>為一個不會跟其他程式有衝突的連接埠，並在防火牆打開通道

4. 右鍵打開你的終端，輸入命令
```bat
$ docker-compose up -d
```

5. 等待，可開啟docker desktop查看有沒有完全啟動

6. 打開瀏覽器，輸入localhost:<你設定的連接埠>，就能使用了~

輕輕鬆鬆


