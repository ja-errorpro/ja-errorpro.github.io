---
title: 【AIS3】Cloud Security
date: 2024-08-01
tags:
  - CTF
---

# Cloud Security

`-中華資安國際 資安研究員 黃聖筌 Husky`


## 雲端基本介紹
### 為啥上雲
- 實現靈活的資應用
    - 幫助企業降低成本支出
    - 按一按就可以升級
        > 資安沒做好還是會噴$$
- 降低行業入門門檻
    - 節省實體硬體成本
- 專注於業務發展
    - 不須管理硬體與伺服器維運
    - 故障機率低 ~~除了前幾天的 Azure~~
- 安全?
    - 不安全

### 雲端介紹
#### 責任

出問題時可以踢皮球

#### 責任歸屬
- 使用者永遠保有下面責任
    - 資料

#### [CSA Top11](https://blog.barracuda.com/2022/06/20/csa-identifies-top-11-cloud-security-impediments)
1. Insufficient identity, credentials, access, and key Management  
2. Insecure interfaces and application programming interfaces (APIs)  
3. Misconfiguration and inadequate change control  
4. Lack of cloud security architecture and strategy  
5. Insecure software development  
6. Unsecured third-party resources  
7. System vulnerabilities  
8. Accidental cloud data disclosure  
9. Misconfiguration and exploitation of serverless and container workloads  
10. Organized crime/hackers/advanced persistent threats (APTs)  
11. Cloud storage data exfiltration

https://blog.barracuda.com/2022/06/20/csa-identifies-top-11-cloud-security-impediments

#### MITRE ATT&CK Cloud

雲端還進儲存的log有限
要分析的log來自多處

- CloudTrail
- Amazon GuardDuty
    - 情資、威脅資料庫

#### S3
- 用來存東西
    > 當作雲端硬碟

#### IAM
IAM 是 AWS 的身分與訪問管理服務

IAM policy --assign--> IAM rule --assign--> EC2
同角色可有多個 policy

JSON
- sid descript
```

sid
effect
action
resource
MFA
```

accesskeyid
secretaccesskey

#### SNS

#### function

FAAS (function as a servcie)
lambda

#### CDN

cache
珍珠奶茶開分店，配方來自主站

cloudflare

#### Auto Scaling

load balance
發現過載過開時會幫你開主機，過低時幫你關主機
有資安事件時不好追蹤

#### marketplace

也許會撿到別人的主機

#### cognito
提供雲端 interface
做 web 驗證

#### metadata service

- 初始化 EC2 的東東
- security credential
AWSHCP/Azure/digital ocean/helion/openStack: 169.254.169.254
oracle: 192.0.0.192
alibaba: 100.100.100.200

## 探索雲端進入點
### 資訊蒐集
#### ip 列舉


#### 回應特徵

header
路徑
請求對象

### 繞 CDN
#### 為甚麼要繞過 CDN

- CDN 有 WAF
- cloudflare: 使用 CF-Connecting-IP header

### 撿 token

- github
- .git
- debug msg
- TruffleHog
    - `trufflehog git <git>`
- gitguardian
- honeytoken
    - 非服務的 honeypot
    - https://canarytokens.org/generate

## 常見雲端弱點
### S3
- Simple Storge Service
- 裡面放什麼
    - 靜態網站、網頁、檔案
    - 資料庫存檔、備份、使用者data
    - log
- 常見問題
    - 權限設定錯誤
        > 設置複雜，容易撿到原始碼
    - 意外存取
- 權限錯誤
    - 誤以為給別人存取就要設為公開
    - 過於寬鬆的限制 `s3:*`
        > 設定上要注意最小化原則

https://buckets.grayhatwarfare.com/

- 如何列舉目標的 S3
    - 使用字典檔
- 如何生成字典檔
    - 手動產生
        - 公司名稱
        - 參考實際名稱
        - 
    - 自動產生
- Bucket Name有唯一性
- 網址格式
    - [bucket:name].s3.地區.amazonaws.com
        > 通常地區可以省略，但有些不行
    - 地區.s3.amazonaws.com/[bucket name]
- 範例網址
    - ais3-public-bucket.s3.us.east
- 地區列表(aws官方有)
- 自訂網域
    - 使用 img.ais3.org 而不是 ais3.s3.amazonaws.com
- 對應方法
    - img.ais3.org 地區

### Metadata 利用
#### STS 臨時憑證

~/.aws/credential

列舉 policy

#### 取得 metadata
- Get Shell直接拿
- command injection- 
- SSRF

#### SSRF

- IMDSv1
    - request/response
        - http://169.254.169.254/latest/meta-data/iam/security-credentials/

```
aws configure set aws_access_key_id ASIAXTN2BMI6HUQSRU46
aws configure set aws_secret_access_key VcsxxgwAqihJyhLdIN2tFhCXQqzw0Io7Ft8yhv9j
aws configure set aws_session_token "...<SNIP>..."

aws s3 ls 
aws s3 ls s3://ais3-husky/
aws s3 cp s3://ais3-husky/SSRF_1.txt ./
cat SSRF_1.txt # FLAG{IMDSv1_is_insecure!}
```

- IMDSv2
    - 構造 put
    - 加 header
    - gopher
        - `curl -X PUT http://127.0.0.1/latest/api/token --header "X-aws-ec2-metadata-token-ttl-seconds: 21600"`

### 設定 AWS CLI
```bash
sudo apt update
sudo apt install awscli –y 
aws configure --profile level1

# 輸入 key_id
# 輸入 access_key
# 留空 None
# 留空 json

vim ~/.aws/credentials
# 新增 aws_session_token

aws s3 ls --profile level1
aws s3 ls ais3-husky --profile level1
aws s3 cp s3://ais3-husky/SSRF_1.txt . --profile level1
```

### lambda

- 限制
    - 記憶體 512MB
    - 執行時間 15min
    - 檔案存取
    - 檔案數量
    - 程式語言

- 不會立刻回收空間
- 檔案存取限制
- 無 metadata Service，但...
    - 原始碼放在 /var/task
    - 資料暫存區 /tmp
    - AWS key 放在環境變數
主動觸發

### 找東西

- /var/task 原始碼
- 環境變數 AWS Key

#### 調查 lambda

- 列出 Lambda Functions
`aws lambda list-function --profile <profile> --region <region>`
`aws lambda get-funciton`

#### 調查程式碼

- 函數弱點
    - `os.popen('cat ' + str)`

### PACU

降權限 token 仍然有效，應刪除 IAM 角色
臨時性限制
