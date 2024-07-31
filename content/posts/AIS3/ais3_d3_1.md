---
title: "【AIS3】深入淺出網域(AD)安全:細探各項AD組態設定的濫用"
date: 2024-07-31
tags:
  - CTF
---

# 深入淺出網域(AD)安全:細探各項AD組態設定的濫用

`-TXOne Networks Inc. Threat Researcher Dexter Chen`

## 教材

* Windows Server 2019
* Windows 10
* Kali Linux

## Active Directory

* Windows Domain Service
* LDAP(Lightweight Directory Access Protocol) + Kerberos(MS ver.) + DNS
* SSO Services (Base on Kerberos)

![image](https://cdn.ttgtmedia.com/rms/onlineImages/windowsserver-domain_forest_configuration-f_mobile.png)

## AD Overview

* Active Directory (AD) - Directory Service
* Domain Controller (DC)
    * 某台存著 AD 資料庫、管理網域中 AD Object 的電腦，提供驗證服務
    * Domain Directory 存在 DC
    * 一個網域可以有多個 DC
* Object
* Attribute
* Forest

## LDAP Overview

* LDAP Path
    * DN(Distinguished Name)
    * RDN(Relative Distinguished Name)
    * CN(Common Name)
    * OU(Organizational Unit Name)
    * DC(Domain Component)
    * O(Organizational Unit)

## User, Computer, and Group

* Account
    * User Account
        * Person or service account
    * Computer Account
* Group
    * Active Directory objects that contain users, contacts, computers, and other groups
    * Group Policy 作用於 User, Computer Accounts

## Security Identifier (SID)

* 識別唯一安全原則或安全群組
* 可以代表 User, Group, Computer

## Active Directory Database

* AD DS database (NTDS.DIT)
* 每個 DC 都有一個 NTDS.DIT

## GPO

* Virtual collection of policy settings
* 政策設定影響 User, Computer
* SYSVOL folder
    * \\\\\\domainname.local\\SYSVOL
    * \\\\\\dc.local\\sysvol\\\\\\DC_FQDN\\\\\\

## Lab01

* Windows Server 2019

build AD DC Script
```powershell
#1
install-windowsfeature AD-Domain-Services -IncludeManagementTools
Import-Module ADDSDeployment
 

#2
$DomainName = "training_a.local"
$DomainNetbiosName = "TRAINING_A"
Install-ADDSForest `
-CreateDnsDelegation:$false `
-DatabasePath "C:\Windows\NTDS" `
-ForestMode "WinThreshold" `
-DomainMode "WinThreshold" `
-DomainName $DomainName `
-DomainNetbiosName $DomainNetbiosName `
-InstallDns:$true `
-LogPath "C:\Windows\NTDS" `
-NoRebootOnCompletion:$false `
-SysvolPath "C:\Windows\SYSVOL" `
-SafeModeAdministratorPassword $(ConvertTo-SecureString -string 'Password!' -AsPlainText -Force) `
-Force:$true

#3
Rename-Computer -newname DC01 -Restart -force 
```

AD config script

```powershell
New-ADOrganizationalUnit -Name "RD Dept" –Path "DC=training_a,DC=Local" -ProtectedFromAccidentalDeletion $true


$pw = ConvertTo-SecureString "P@ssw0rd" -AsPlainText –Force
New-ADUser -Name "YiJia Huang" -SamAccountName "YiJia" –AccountPassword $pw -Enabled $true -Path "ou=RD Dept,dc=training_a,dc=local"
```

PC domain join script

```powershell
$SecPassword = ConvertTo-SecureString "1qaz@WSX3edc" -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential("training_a\administrator", $SecPassword)
add-computer –domainname training_a.local -Credential $Cred -OUPath "ou=RD Dept,dc=Training_a,dc=LOCAL"
-restart
```

## Lab02

### Recon

* 有個帳號叫 Anonymous，可能有 read permission
* tools
    * nmap LDAP script(kali)
    * Idapsearch(kali)
* What can we get
    * 1-day 或已知的漏洞
    * domain machine 資訊
    * domain 群組與使用者資訊
    * 如果幸運的話會有敏感資訊

### 設定 Anonymous

Windows Administrative Tools -> ADSI Edit -> Right Click -> Connection -> Add Configuration

ADSI Edit -> Configuration -> CN=Services -> CN=Windows NT -> CN=Directory -> CN=Anonymous Logon -> Right Click -> Properties -> Set Attribute -> dSHeuristics -> set to 0000002

Windows Administrative Tools -> Active Directory Users and Computers -> enable Advanced Features

training_a.local right click -> Properties -> Security -> Add -> Enter anonymous -> OK

training_a.local right click -> Properties -> Security -> Advanced -> ANONYMOUS LOGON -> Edit -> Applies to "This object and all descendant objects" -> OK

### nmap ldap script

### HFS exploit

