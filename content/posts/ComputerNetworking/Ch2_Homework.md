---
title: 【計算機網路】CH2 作業
tags:
  - Computer Networking
keywords:
  - computer networking
  - homework
  - solution
  - chapter 2
  - application layer
  - 計算機網路
  - 作業
  - 題解
  - 第二章
  - 應用層
  - HTTP
  - DNS
  - SMTP
url: "/posts/ComputerNetworking/Ch2_Homework/"
---

Reference: Computer Networking: A Top-Down Approach, 8th Edition

# 此頁面中答案不保證為正確答案，僅供參考。

# CH2 作業

## Review

### R1. List Five nonproprietary Internet applications and the application-layer protocols that they use.

#### 列出五個非專有的網際網路應用程式及其使用的應用層協議。

- - Web: HTTP
  - File: FTP
  - P2P: P2P
  - Email: SMTP
  - DNS: DNS

### R2. What is the difference between network architecture and application architecture?

#### 網路架構和應用程式架構之間的區別是什麼？

- 網路架構是將通訊過程分為多個層(如五層架構)，應用程式架構由開發人員設計，並規定應用程式的廣泛結構。

### R3. For a communication session between a pair of processes, which process is the client and which is the server?

#### 對於一對行程之間的通信會話，哪個行程是客戶端，哪個是伺服器？

- 客戶端是發起通訊的行程，伺服器是等待通訊的行程。

### R4. Why are the terms client and server still used in peer-to-peer applications?

#### 為什麼對等應用程式中仍然使用客戶端和伺服器這兩個術語？

- 因為它們描述了兩個對等方之間的角色，接收資料的是客戶端，傳送的是伺服器，即使兩個對等方在某些方面是對等的。

### R5. What information is used by a process running on one host to identify a process running on another host?

#### 一個運行在一台主機上的行程用什麼資訊來識別另一台主機上運行的形成？

- IP 位址和連接埠號。

### R6. What is the role of HTTP in a network application? What other components are needed to complete a  Web application?

#### HTTP 在網路應用程式中的作用是什麼？完成 Web 應用程式還需要哪些其他組件？

- HTTP 位於應用層，可用來傳輸文件、圖片、影音等，透過 request/response。
- 除了 HTTP 以外，Web application 還至少需要有一個用來處理 request 及發送 response 的程式，基本可用 socket 實現，以及要傳輸的文件、圖片等檔案，如果要讓 browser 渲染網頁，可能還需要 HTML、CSS、JavaScript。

### R7. Referring to Figure 2.4, we see that none of the applications listed in Figure 2.4 requires both no data loss and timing. Can you conceive of an application that requires no data loss and that is also highly time-sensitive?

#### 參考圖 2.4，我們看到圖 2.4 中列出的應用程式都不需要無數據丟失和定時。你能想到一個需要無數據丟失且高度時間敏感的應用程式嗎？

- 工控設備，如自動駕駛汽車，需要即時的數據，且不能有數據丟失。

### R8. List the four broad classes of services that a transport protocol can provide. For each of the service classes, indicate if either UDP or TCP (or both) provides such a service.

#### 列出傳輸協議可以提供的四個廣泛服務類別。對於每個服務類別，指出 UDP 或 TCP（或兩者）是否提供此服務。

- - 可靠資料傳輸：TCP
  - 保證吞吐量：都沒有
  - 保證特定時間內傳輸：都沒有
  - 安全性：都沒有

### R9. Recall that TCP can be enhanced with TLS to provide process-to-process security services, including encryption. Does TLS operate at the transport layer or the application layer? If the application wants TCP to be enhanced with TLS, what does the developer have to do?

#### 回想一下，TCP 可以通過 TLS 進行增強，以提供行程到行程的安全服務，包括加密。TLS 是在傳輸層還是應用層運行？如果應用程式希望 TCP 通過 TLS 進行增強，開發人員需要做什麼？

- TLS 是在應用層運行，TLS Socket 取得明文資料，加密後送給 TCP，如果開發者希望 TCP 通過 TLS 進行增強，在應用程式中使用 TLS 的 Library。

### R10. What is meant by a handshaking protocol?

#### 什麼是握手協議？

- 握手協議是指兩個對等方之間的通訊開始之前，它們之間的通訊協議的協商過程。

### R11. What does a stateless protocol mean? Is IMAP stateless? What about SMTP?

#### 無狀態協議是什麼意思？IMAP 是無狀態的嗎？SMTP 呢？

- 無狀態協議是指通訊的每個步驟都是獨立的，不依賴於之前的步驟。
- IMAP 是有狀態的，SMTP 是無狀態的。

### R12. How can websites keep track of users? Do they always need to use cookies?

#### 網站如何跟蹤用戶？它們總是需要使用 cookies 嗎？

- 網站可以使用 IP 位址、Session ID、Cookies 等方式來跟蹤用戶，不一定需要使用 Cookies。
- 也可以將 Session ID 放在 URL 中，但這樣會有安全問題。

### R13. Describe how Web caching can reduce the delay in receiving a requested object. Will Web caching reduce the delay for all objects requested by a user or for only some of the objects? Why?

#### 描述 Web 緩存如何減少接收請求對象的延遲。Web 緩存是否會減少用戶請求的所有對象的延遲，還是只會減少部分對象的延遲？為什麼？

- Web caching 可以將經常請求的資源存放在緩存中，當用戶再次請求時，直接從緩存中取得，減少了網路傳輸時間。
- Web caching 只會減少部分對象的延遲，因為不是所有對象都會被緩存，且緩存中的對象可能已經過期。

### R14. Telnet into a Web server and send a multiline request message. Include in the request message the If-Modified-Since: header line to determine whether the requested object has been modified since the date given in the line.

#### Telnet 到 Web 伺服器並發送多行請求消息。在請求消息中包含 If-Modified-Since: 標頭行，以確定自給定日期以來是否修改了請求的對象。

- If-Modified-Since 可以用來檢查資源是否有更新，如果沒有更新，伺服器會回傳 304 Not Modified。

### R15. Are there any constraints on the format of the HTTP body? What about the email message body sent with SMTP? How can arbitrary data be transmitted over SMTP?

#### HTTP 主體的格式有什麼限制？SMTP 發送的電子郵件消息主體呢？如何通過 SMTP 傳輸任意數據？

- HTTP 主體的格式沒有限制，可以是任意格式，如 JSON、XML、HTML 等。
- 另解：HTTP Body 有長度上的限制，有些伺服器可能為了防機器人會限制 Body 的大小。
- SMTP Body 只能是 7-bit ASCII 字元，如果要傳輸二進制數據，可以使用 MIME。

### R16. Suppose Alice, with a Web-based e-mail account (such as Hotmail or Gmail), sends a message to Bob, who accesses his mail from his mail server using IMAP. Discuss how the message gets from Alice’s client to Bob’s client. Be sure to list the series of application-layer protocols that are used to move the message between the two clients.

#### 假設 Alice 使用 Web 電子郵件帳戶（如 Hotmail 或 Gmail）發送一條消息給 Bob，Bob 使用 IMAP 從他的郵件伺服器訪問郵件。討論消息如何從 Alice 的客戶端到達 Bob 的客戶端。請務必列出用於在兩個客戶端之間移動消息的應用層協議系列。

```mermaid
graph LR
    A[Alice] -->|SMTP| B[Alice's Mail Server]
    B -->|SMTP| C[Bob's Mail Server]
    C -->|IMAP| D[Bob]
```

### R17. Print out the header of an e-mail message you have recently received. How many Received: header lines are there? Analyze each of the header lines in the message.

#### 打印出您最近收到的電子郵件消息的標頭。有多少個 Received: 標頭行？分析消息中的每個標頭行。

- Received: 有多個，每個 Received: 代表一個伺服器轉發的過程。

### R18. What is the HOL blocking issue in HTTP/1.1? How does HTTP/2.0 attempt to solve it?

#### HTTP/1.1 中的 HOL 阻塞問題是什麼？HTTP/2.0 如何嘗試解決它？

- HOL 阻塞問題是指當某個大型資源正在傳輸時，其他資源的傳輸會被阻塞。
- HTTP/2.0 使用多路複用，將資源分割成多個小的 frame 並交錯傳輸，解決了 HOL 阻塞問題。

### R19. Why are MX records needed? Would it not be enough to use a CNAME record? (Assume the email client looks up email addresses through a Type A query and that the target host only runs an email server.)

#### 為什麼需要 MX 記錄？使用 CNAME 記錄不夠嗎？（假設電子郵件客戶端通過類型 A 查詢查找電子郵件地址，目標主機僅運行電子郵件伺服器。）

- MX 記錄是用來指定郵件伺服器的，CNAME 記錄是用來指定主機別名的，而不是指定路由。

### R20. What is the difference between recursive and iterative DNS queries?

#### 遞迴和迭代 DNS 查詢之間有什麼區別？

- 遞迴 DNS 查詢是指 DNS 伺服器會幫助客戶端查詢，直到找到答案，而迭代 DNS 查詢是指 DNS 伺服器只回答自己知道的答案，查詢主機需要跟隨 DNS 伺服器的指示自己查詢。

### R21. Under what circumstances is file downloading through P2P much faster than through a centralized client-server approach? Justify your answer using Equation 2.2.

#### 在什麼情況下，通過 P2P 下載文件比通過集中式客戶端-伺服器方法快得多？使用方程式 2.2 來證明你的答案。

- $ \frac{NF}{u_s + \sum u_i} \leq \frac{NF}{u_s} \rightarrow u_s \leq u_s + \sum u_i $

### R22. Consider a new peer Alice that joins BitTorrent without possessing any chunks. Without any chunks, sh cannot become a top uploader for any of the other peers, since she has nothing to upload. How then will Alice get her first chunk?

#### 考慮一個新的對等方 Alice 加入 BitTorrent 而沒有任何塊。沒有任何塊，她無法成為其他對等方的頂級上傳者，因為她沒有任何東西可以上傳。那麼 Alice 如何獲得她的第一個塊？

- 每 30 秒，Alice 會隨機選擇一個對等方，並要求一個塊，直到她獲得第一個塊。
- 他獲得第一個塊後，就可以開始上傳給其他對等方。

### R23. Assume a BitTorrent tracker suddenly becomes unavailable. What are its consequences? Can files still be downloaded?

#### 假設 BitTorrent 跟蹤器突然不可用。它的後果是什麼？文件仍然可以下載嗎？

- BitTorrent tracker 是用來追蹤對等方的，如果 tracker 不可用，對等方無法找到其他對等方，但是對等方之間仍然可以通過 DHT 找到其他對等方。

### R24. CDNs typically adopt one of two different server placement philosophies. Name and briefly describe them.

#### CDN 通常採用兩種不同的伺服器放置哲學。命名並簡要描述它們。

- Enter Deep: 將伺服器放置在 ISP 中，減少終端用戶與伺服器之間的 delay 並增加 throughput。
- Bring Home: 在較少數量的網路上建構大型 CDN 集群，通常放置在 IXP 中，不用存取 ISP，實現將 ISP 帶回家。

### R25. Besides network-related considerations such as delay, loss, and bandwidth performance, there are other important factors that go into designing a CDN server selection strategy. Whay are they?

#### 除了與網路相關的考慮因素，如延遲、丟失和帶寬性能，還有其他重要因素需要考慮設計 CDN 伺服器選擇策略。它們是什麼？

- - 負載平衡：用戶不應被導到已過載的伺服器集
  - 日夜效應：不同時間的流量波動影響伺服器的選擇
  - ISP 成本

### R26. In Section 2.7, the UDP server described needed only one socket, whereas the TCP server needed two sockets. Why? If the TCP server were to support n simultaneous connections, each from a different client host, how many sockets would the TCP server need?

#### 在第 2.7 節中，所描述的 UDP 伺服器只需要一個 socket，而 TCP 伺服器需要兩個 socket。為什麼？如果 TCP 伺服器要支持 n 個來自不同客戶端主機的同時連接，TCP 伺服器需要多少個 socket？

- TCP 伺服器需要一個 socket 用來接收連接，另一個 socket 用來處理連接。
- 如果 TCP 伺服器要支持 n 個來自不同客戶端主機的同時連接，TCP 伺服器需要 n+1 個 socket。
- UDP 伺服器只需要一個 socket，因為 UDP 是無連接的。

### R27. For the client-server application over TCP described in Section 2.7, why must the server program be executed before the client program? For the client-server application over UDP, why may the client program be executed before the server program?

#### 對於第 2.7 節中描述的 TCP 客戶端-伺服器應用程式，為什麼必須在客戶端應用程式之前執行伺服器應用程式？對於 UDP 的客戶端-伺服器應用程式，為什麼可以在伺服器應用程式之前執行客戶端應用程式？

- TCP 伺服器需要先啟動，因為 TCP 是有連接的，客戶端需要連接到伺服器，如果伺服器沒有啟動，客戶端無法連接。
- UDP 是無連接的，客戶端可以先啟動，因為客戶端不需要確認伺服器是否在線，即使這會導致 data loss。


