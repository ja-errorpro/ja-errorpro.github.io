---
title: 【資訊安全】Metasploitable3 環境建置(Windows VMware)
date: 2022-11-29
tags:
  - security
---

## 需求

- Windows 10 up
- VMware Workstation Pro
- 良好的網路環境

## 1. 下載並安裝 Vagrant & Vagrant VMware Utility

Vagrant 是建置虛擬機的工具，透過 Vagrantfile 來設定虛擬機。

[Download Vagrant](https://developer.hashicorp.com/vagrant/downloads)

[Download Vagrant VMware Utility](https://developer.hashicorp.com/vagrant/downloads/vmware)

## 2. 快速建置

打開 PowerShell，cd 到適當的資料夾，依序輸入

```powershell
mkdir metasploitable3-workspace
cd metasploitable3-workspace
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/rapid7/metasploitable3/master/Vagrantfile" -OutFile "Vagrantfile"
vagrant up --provider=vmware_desktop
```

等待一段時間，完成後可以在

`C:\Users\{username}\.vagrant.d\boxes\xxx\yyy\vmware_desktop\` 下看到 box 檔案。

將 vmware_desktop 資料夾複製到適當的地方，接著打開 VMWare，在 Library 下按右鍵點選 Scan for Virtual Machines，選擇剛剛複製的資料夾，就可以使用 Metasploitable3 了。
