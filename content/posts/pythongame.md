---
title: Python遊戲設計
date: 2021-01-11
tags:
  - python
---

<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>

# FOR Python遊戲設計

檔案庫: [Here](https://drive.google.com/drive/folders/1MlQkB7COIBu_EZDFaYExBuVVb_FxZpiW?usp=sharing)

Python程式列表(全自寫):  [LIST](./pythonprograms/list)

Cocos2d: [Docs](https://docs.cocos.com/creator/2.3/manual/zh/getting-started/cocos2d-x-guide.html)

## 第一堂: IDE: pycharm CE, Module: cocos2d

[彭彭-Python程式設計入門](https://training.pada-x.com/python-start.htm)

[Colab](https://hackmd.io/@jease0502/colab_simple?print-pdf#/)

[CBE30338](https://jckantor.github.io/CBE30338/) 

記得寫程式可放個[小抄](https://drive.google.com/file/d/10Tuhcgdapt0QKy1v6roHRPEwtA0MZVIs/view?usp=sharing)在旁邊...

有問題[請點這個](https://google.com)

作業: 遊玩[CodeCombat](https://codecombat.com/)

---

## 第二堂

安裝Pycharm : [Pycharm](https://www.jetbrains.com/pycharm/)

> **<u>Community版為開源,免費 / Professional為完整版(30天免費試用)</u>**

> 需要先安裝Python (Ver. >3.7),Windows:可在Microsoft市集搜尋Python / MacOS可在官網上下載 / Linux有些版本已預安裝,安裝方式: (`` $ apt update && apt install python3 ``)

安裝方式: [Here](https://pygame.hackersir.org/Lessons/01/PyCharm_install.html)

設定: [here](https://pygame.hackersir.org/Lessons/01/PyCharm_config.html)

安裝Cocos2d: Files>Setting>Project: Inter..>(+)>搜尋cocos2d>安裝

學程式的技巧: 先抄再讀 不懂可Google

#### Vim:

分為**命令模式,插入模式,底線命令模式,視覺模式**

**命令模式**: 為預設模式,在任何模式中按下Esc即可到此模式,可按下某些鍵來切換模式

**插入模式**: 切換方式:在命令模式中按下i,a,o等按鍵,可在游標位置插入需要的文字

**底線命令模式**: 切換方式:按下:,可輸入指令操作內容,

離開: :q

強制離開: :q!

存檔不離開: :w

強制存檔不離開: :w!

存檔並離開: :wq

強制存檔並離開: :wq!

**視覺模式**: 切換方式:按下v , 方便用於閱讀和強調

作業: 安裝環境,開啟範例專案並測試執行幾個程式,並拍照

---

## 第三堂

讀懂程式碼的方式:

> 1.小程式直接讀
>> 從頭到尾讀

>> 依執行順序讀

> 2.大程式需要:
>> 大綱工具,定義(Ctrl+b\|Ctrl+\[),搜尋,更多專業技巧

> 3.善用Debugger除錯器

作業: 閱讀test中任意程式,試著更動程式碼並觀察執行結果

---

## 第四堂



碰撞-Collision:

> [Collision](http://los-cocos.github.io/cocos-site/doc/programming_guide/collision.html#collision)

> 物件有個變數名為.cshape

> 實體必須為CircleShape or AARectShape

> 常在Update內

```python
objs_touching_point(x, y)
iter_colliding(object)
```

組合程式:

> 簡單構思小程式(ex: 選單,遊戲畫面,角色控制,碰到畫面邊界結束)

> 加一些想要的元素

作業: 修改程式or以test資料夾中程式片段組合成一個遊戲,不懂的可註解發問研究

---

## 第五堂

讀文件: [Cocos2d](http://los-cocos.github.io/cocos-site/doc/index.html#)

修改程式碼: 邏輯,遊戲畫面,添加物件

動畫(可使用GIF或一連串圖片集合):

```python
Sprite(Animation)
	Animation.from_image_sequence
		pyglet.image.ImageGrid(image, 1, 8)
		pyglet.image.load(filename)
```

向量(Vector): euclid.Vector2 可設定預計速度

作業: 期末程式碼與說明文件 or 學習心得 or 收穫


