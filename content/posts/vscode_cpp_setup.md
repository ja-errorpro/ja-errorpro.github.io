---
title: VSCode設定C++教學(Code Runner)
date: 2022-09-11
tags:
  - C-Cpp
keywords:
  - vscode
  - cpp
  - c++
  - setup
  - mingw
  - gcc
  - compiler
  - windows
  - code runner
  - environment setup
  - visual studio code
  - c++ setup
  - 開發環境設定
  - 編譯器
  - 教學
  - 程式設計
  - 整合開發環境
---

遇到很多來問我VSC怎麼設定C/C++的問題，這裡直接寫篇文來說明我的作法。

## 前置

* 環境(以撰寫此篇文時的環境為主)： Windows 11(64 bit) 22H2
* Visual Studio Code 1.71
* 7-Zip

## 目標

* 配置GCC 12 MinGW-w64 不含Clang 之編譯器
* 成功在VSCode裡編譯並執行一支C/C++程式

## 過程

### 一、安裝延伸模組： C/C++、Code Runner

![cpp_extension](/images/vscode_cpp_setup/cpp_extension.png)

![code_runner](/images/vscode_cpp_setup/code_runner.png)

### 二、下載編譯器：範例為GCC 12.2.0 + MinGW-w64 10.0.0 without Clang

[請到這個網站](https://winlibs.com/)

下載編譯器(視個人需求選擇一種編譯器)，並解壓到任意空間，(ex: `C:/`)

### 三、設定環境變數

Windows設定 -> 系統 -> 裝置規格 -> 進階系統設定 -> 環境變數 -> 系統變數(使用者環境變數)

在變數名 Path 中添加路徑(剛剛解壓到的路徑/bin/)

完成後打開cmd(命令提示字元)或Terminal，輸入 `gcc -v`，如果成功的話就會在最後一行看到 `gcc version 12.1.0` 字樣。

### 四、設定VSCode

打開VSCode，點擊左下角齒輪，然後找到右上角功能欄中的 `開啟設定(JSON)`，在最外面的{}裡貼上以下範例設定

```json
"code-runner.executorMap":{
    "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
	"cpp": "cd $dir && g++ -std=c++11 -O2 $fileName  -o $fileNameWithoutExt && $dir$fileNameWithoutExt"
}, // 編譯並執行指令，其中設定項 -std= 後面可接C++版本 (98,11,14,17,20,...)
"code-runner.runInTerminal": true, //此行決定是否讓code runner在終端機執行，沒有這行的話會無法讓使用者輸入任何東西
"code-runner.saveFileBeforeRun": true, //是否在執行前先存檔
"C_Cpp.default.compilerPath": "<編譯器路徑/bin/g++.exe>", // 請修改成g++.exe的路徑
```

完成後存檔

### 五、編譯並執行程式

試著建立一個.cpp檔案，可參考 [語法筆記](/posts/1/cpp/) 寫出任意程式，並點擊右上角(Run Code) 查看結果