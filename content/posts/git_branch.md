---
title: 【Git】Git分支的打開方式
date: 2022-10-27
tags:
  - Git
  - mix
keywords:
  - git
  - version control
  - branch
  - merge
  - tutorial
  - development
  - command line
  - git branch
  - git merge
  - 版本控制
  - 分支管理
  - 合併分支
  - 軟體開發
  - 指令教學
  - 團隊合作
  - 程式碼管理
---

當一個專案有許多人一起開發時，不能隨便commit，因此當需要增加功能、修正bug時可以開一個分支來進行，確認沒問題後再合併，就不會影響主要的生產線。

## 初始化Local Repo 

詳見 [上一篇文章](/posts/2022/git_initial/)

## 查看現在有哪些分支

```bash
$ git branch
```

Output:
```bash
* master
```

## 新增分支

```bash
$ git branch main
```

這樣就會新增一個名為main的分支，但是還沒有切換到該分支，所以還是在master分支上。

## 重新命名分支

```bash
$ git branch -M cool # 將目前分支重新命名為cool
```

或者

```bash
$ git branch -m main cool # 將main分支重新命名為cool分支
```

## 刪除分支

```bash
$ git branch -d main # 刪除main分支
```

這時候可能會看到 `error: The branch 'main' is not fully merged`，因為main還沒被合併，不給刪除

可以使用 `-D` 強制刪除

```bash
$ git branch -D main
```

## 切換分支

```bash
$ git checkout main
```

如果分支不存在，可以使用 `-b` 來建立並切換到該分支

```bash
$ git checkout -b main
```

## 合併分支

假設在main分支上做了修改並commit後，要合併到master分支上

```bash
$ git checkout master # 先切換到master分支
$ git merge main # 合併main分支
```

接著就能在master分支上看到main分支的修改了。

### 查看分支合併圖

```bash
$ git log --graph --oneline --all
```

# 參考資料
* [GitBook](https://gitbook.tw)
