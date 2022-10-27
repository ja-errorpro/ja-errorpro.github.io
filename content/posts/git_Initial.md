---
title: 【Git】Git初始設定與環境
date: 2022-10-27
tags:
  - Git
  - mix
---

## What is Git?
能夠紀錄更新歷史紀錄，進行復原(Rollback)、比較、合併(Merge)等等的分散式版本控制系統。
讓開發者(群)能夠更好管理專案。

## 分散式與中央式版控系統
### 中央式版控系統
需要一台伺服器，所有版本控制功能必須在這台伺服器上運作，如果伺服器壞了或沒網路就無法使用
### 分散式版控系統
即使沒有網路也能使用，可以先在本機版控直到能連上伺服器後再同步。

## Git環境
### Local Repo
我們在修改完檔案後，透過`git add` 將檔案加入暫存區，再透過`git commit`將檔案加入Local Repo。
### Remote Repo
Remote Repo是一個遠端的Git伺服器，我們可以將Local Repo push 到 Remote Repo，也可以從Remote Repo pull 到 Local Repo。

## Git安裝
### Windows
到以下網址下載合適的版本並進行安裝

[Git for Windows](https://gitforwindows.org/)

安裝過程直接按到底即可，接著打開Git Bash，可從開始功能表或是桌面右鍵選擇Git Bash Here。

這套軟體能模擬Linux的環境，所以我們可以在這裡使用Linux的指令。

### Linux
非常簡單，打開你的終端機

```bash
$ sudo apt update
$ sudo apt install git -y
```

## 初始設定

```bash
$ git config --global user.name "你的名字"
$ git config --global user.email "你的Email"
$ git config --global core.editor "你的編輯器" # 預設為vim

# --global 如果省略，將只對這個Repo有效
```

## 建立全新的Repo
我們一步一步慢慢來，先在家目錄建立一個空的資料夾

```bash
$ cd ~ # 切換到家目錄
$ mkdir git-test # 建立資料夾名為git-test
$ cd git-test # 切換到git-test資料夾
$ git init # 初始化，讓Git對這個目錄進行版本控制
```

沒有問題的話你應該會看到
```bash
Initialized empty Git repository in /home/你的名字/git-test/.git/
```

### 如果Git版控錯地方或不想再版控
```bash
$ rm -rf .git
```


### 檢查目前的狀態
```bash
$ git status
```

Output:
```bash
On branch master

Inital commit

nothing to commit
```

這段意思是目前在master分支，還沒有任何commit，也沒有任何檔案要commit。

現在在資料夾內應該只有一個隱藏資料夾`.git`，裡面存放著Git的版本控制資訊。

### 編輯檔案
```bash
$ touch README.md  # 建立一個名為README.md的檔案
```

接著看自己習慣想用什麼編輯器編輯(Linux可用 vi/vim/nano)，以vim為例

如果不知道Vim如何使用的話，可參考 [Vim 極簡教學](/posts/2022/vim_simple_tutorial/)

但vim對新手不太友善，可以先用nano編輯

```bash
$ vim README.md
```

或

```bash
$ nano README.md
```

儲存後離開，接著再看一下狀態

```bash
$ git status
```

Output:
```bash
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    README.md

nothing added to commit but untracked files present (use "git add" to track)
```

這段意思是目前在master分支，還沒有任何commit，但有一個檔案還沒加入版本控制。

### 給Git管理檔案
```bash
$ git add README.md # 將README.md加入暫存區
```

如果想要一次加入大量.md檔案，可以使用`git add *.md`

如果想要一次加入多個檔案，可以用`git add .`

接著再看一下狀態
```bash
$ git status
```

Output:
```bash
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   README.md
```

應該可以看到README.md從紅字變成綠字，代表已經加入版本控制了。

### 存檔
```bash
$ git commit -m "Initial commit" # 將檔案提交到Local Repo，-m後面是備註
```

注意備註內容如果要給別人看，盡量簡潔明瞭，讓別人能快速理解這個commit的目的。

## 查看提交紀錄
```bash
$ git log
```

## 查看某提交紀錄的詳細內容
```bash
$ git show <commit ID>
```

## 查看某檔案在某個commit的內容
```bash
$ git show <commit ID>:<檔案名稱>
```

# 參考資料
* [GitBook](https://gitbook.tw)
