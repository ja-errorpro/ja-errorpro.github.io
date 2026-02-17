---
title: 【Discord 聊天機器人】 - Discord interactions.py 介紹與開始 
date: 2022-10-19
tags:
  - Bot
  - mix
  - python
keywords:
  - discord
  - bot
  - python
  - discord-py-interactions
  - slash commands
  - buttons
  - menus
  - library
  - api wrapper
  - tutorial
  - discord bot
  - python bot
  - slash command
  - discord.py
  - 聊天機器人
  - 斜線指令
  - 按鈕
  - 選單
  - 教學
  - 機器人開發
---

# Why discord-py-interactions(以下簡稱 dcpi)?

支援更多操作如斜線指令、按鈕、選單，且簡單易懂

# 簡介

經過大量搜尋資料，發現dcpi的介紹特別少，
因此閱讀完官方API後想記錄下來翻成中文並做個整理。

# 先備知識

  * 需知道如何在 [Discord Developers Applications](https://discord.com/developers/applications) 裡創建機器人
  * 需知道命令列的基本操作


# 環境建置

既然是py當然要安裝Python(目前已測試3.8~3.10可用)

[Python官網](https://www.python.org)

安裝 dcpi(以編寫此篇文時的版本為主)




[dcpi Pypi](https://pypi.org/project/discord-py-interactions/)
```bash
$ pip3 install discord-py-interactions==4.3.4
```

# Quick Start

根據這份[API文件](https://interactionspy.readthedocs.io/en/latest/quickstart.html)

先創建一個專門放Discord Bot的資料夾，然後在裡面新增一個檔案名為`bot.py`，
並在DC的開發應用頁面創建好機器人

然後複製以下code，將`your-bot-token`換成機器人的token，注意不要將token公開給別人。

```py
# 導入interactions套件，如果報錯的話檢查一下環境建置是否有問題
import interactions

# 宣告bot這個變數為一個客戶端，記得將your-bot-token改成Discord bot的token
# 我們需要告訴Discord我們要監聽哪些事件，透過設定intents達成
bot = interactions.Client(token="your-bot-token",intents=interactions.flags.Intents.ALL)

# 啟動機器人
bot.start()

```

接著執行它

```bash
$ python3 bot.py
```

這樣機器人就成功上線了


## 第一個斜線指令

修改程式碼

```py
import interactions

bot = interactions.Client(token="your-bot-token",intents=interactions.flags.Intents.ALL)

@bot.command(  # 這個在Python中被稱為 decorator，它會告訴Discord API需要創建一個指令
  name = "sayHello",  # 指令的名字，會決定 (/) 後面要接什麼
  description="說你好"  # 描述這個指令的功能
)
# 函數前面加個async就叫命令協程，必須放在decorator下面，
# 如果decorator從DiscordAPI收到相關事件就會呼叫
async def say_Hello(ctx: interactions.CommandContext): 
  await ctx.send("你好！") # 對指令做出回應，如果在限時內沒有回應會在使用此指令後看到交互失敗


bot.start()
```

接著在discord中輸入`/`後應該可以看到剛剛新增的指令，

* 建議使用電腦版Discord，手機版可能需要稍等片刻才會更新指令

## 第一個有可選參數的斜線指令

當需要讓使用者輸入東西來執行指令，那Option是不錯的方案，來試試以下程式碼

```py
import interactions

bot = interactions.Client(token="your-bot-token",intents=interactions.flags.Intents.ALL)

@bot.command( 
  name = "saySomething", 
  description="說些話",
  options=[  # 選項功能(型態為List)
    interactions.Option(  # 選項物件
      name = "text",  # 選項名稱
      description = "你想說什麼", # 選項描述
      type=3, # 選項類別，3代表string，其他可以查表
      required = True # 如果為True代表一定要填東西
    )
  ]
)
async def say_Something(ctx: interactions.CommandContext,text: str):
  await ctx.send(text)


bot.start()
```

如果想寫簡潔一點

```py
import interactions

bot = interactions.Client(token="your-bot-token",intents=interactions.flags.Intents.ALL)

@interactions.option()
# 協程名稱會直接當成指令名稱
async def say_Something(ctx: interactions.CommandContext,text: str): # 記得指定型態不然容易出問題
  await ctx.send(text)


bot.start()
```
