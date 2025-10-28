---
title: VMWare 開啟內嵌虛擬化的一些坑
tags:
  - Linux
keywords:
    - VMWare
    - 虛擬化
    - Intel VT-x
    - nested virtualization
    - Hyper-V
    - Windows 10
    - KVM
    - Virtual Machine Platform
    - WSL
    - Docker Desktop
    - BIOS
    - hypervisor
    - bcdedit
    - dism
    - 內嵌虛擬化
    - 虛擬機器
    - VT-x not available
    - virtualization technology
    - Windows features
    - command prompt
date: 2025-10-02
---

最近需要在 VMWare 裡的虛擬機器跑 KVM，需要開啟內嵌虛擬化，但發現開啟後無法啟動虛擬機器，出現說 「VT-x is not available」之類的錯誤訊息。

這個狀況是在 BIOS 已經確認開啟 Intel VT-x 的情況下，Windows 已經關閉 Hyper-V 與 hypervisor 的情況下發生的。

後來發現，除了 Hyper-V 之外，還需要將 Virtual Machine Platform 這個 Windows 功能關閉，然後為了徹底關閉 Hyper-V，還需要在命令提示字元下執行以下指令：

```cmd
bcdedit /set hypervisorlaunchtype off
dism /Online /Disable-Feature /FeatureName:Microsoft-Hyper-V-All
```

關鍵是 Virtual Machine Platform 這個功能，關閉之後 VMWare 才能順利啟動並使用內嵌虛擬化功能。

重新開機後，會發現 WSL 跟 Docker Desktop 全部無法使用，如果要恢復的話，就把 Virtual Machine Platform、Hyper-V、Hypervisor 都打開，並執行：

```cmd
bcdedit /set hypervisorlaunchtype auto
dism /Online /Enable-Feature /FeatureName:Microsoft-Hyper-V-All
```

與

```cmd
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
pause
```

接著重新開機就可以恢復 WSL 與 Docker Desktop 的功能。