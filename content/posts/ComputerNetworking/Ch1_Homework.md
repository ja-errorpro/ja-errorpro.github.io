---
title: 【計算機網路】CH1 作業
tags:
  - Computer Networking
url: "/posts/ComputerNetworking/Ch1_Homework/"
---

Reference: Computer Networking: A Top-Down Approach, 8th Edition

# 此頁面中答案不保證為正確答案，僅供參考。

# CH1 作業

## Review

### R1. What is the difference between a host and an end system? List several different types of end systems. Is a Web server an end system?

#### Host 跟 End system 差別是什麼？列出幾種不同類型的 End system。Web Server 是 End system 嗎？

- 沒有差別，Host 跟 End system 是同義詞。End system 包括 PC、Work Station、Web Server、Mail Server 等等。

### R2. Describe the protocol that might be used by two people having a telephonic conversation to initiate and end the conversation, i.e., the way that they talk.

#### 描述兩個人進行電話對話時可能使用的協定，即他們交談的方式。

- 協議是兩個人、政府、甚至國家在進行溝通時制定的一套溝通方式。以人為例，A 欲與 B 對話，他需要先向 B 說「你好」，而 B 也需要回應他「你好」，接著 A 把
  他想傳達的內容給 B，B 再回應他「收到」，最後 A 向 B 說「再見」表示結束這次溝通。而如果 A 不照協議規定進行，一開始直接把訊息丟給 B，B 可能會選擇不理 A 而無法順利溝通。

### R3. Why are standards important for protocols?

#### 為什麼標準對於協議來說很重要？

- 標準定義了協議具體要做什麼、內容，以便創建可溝通的網路系統。

### R4. List four access technologies. Classify each one as home access, enterprise access, or wide-area wireless access.

#### 列出四種存取技術。將每一種分類為家庭存取、企業存取或廣域無線存取。

- - 家庭存取：DSL、光纖
  - 企業存取：Ethernet
  - 廣域無線存取：3G/4G

### R5. Is HFC transmission rate dedicated or shared among users? Are collisions possible in a downstream HFC channel? Why or why not?

#### HFC 傳輸速率是專用還是共享給使用者？在下行 HFC 頻道中可能發生碰撞嗎？為什麼？

- HFC 傳輸速率是共享給使用者的。下行 HFC 不會碰撞，因為 HFC 是由單源點發出，不會有碰撞的問題。

### R6. What access network technologies would be most suitable for providing internet access in rural areas?

#### 什麼存取網路技術最適合在鄉村地區提供互聯網存取？

- DSL、光纖到戶

### R7. Dial-up modems and DSL both use the telephone line (a twisted-pair copper cabble) as their transmission medium. Why then is DSL much faster than dial-up access?

#### 撥號數據機和 DSL 都使用電話線（雙絞線銅電纜）作為傳輸媒介。為什麼 DSL 比撥號訪問還快？

- 撥接連線跟處理電話通過一樣的基礎設施。電話的頻寬很低(56 Kbps)，而 DSL 使用從家中到 DSLAM 的電話線路，不經過電信公司處理電話的基礎設施，而且 DSL 使用高頻段，所以速度比較快（24 Mbps）。

### R8. What are some of the physical media that Ethernet can run over?

#### 以太網可以運行在哪些物理媒介上？

- 同軸電纜、光纖、雙絞線

### R9. HFC, DSL, and FTTH are all used for residential access. For each of these access technologies, provide a range of transmission rates and comment on whether the transmission rate is dedicated or shared.

#### HFC、DSL 和 FTTH 都用於住宅接入。對於這些接入技術，提供一個傳輸速率範圍，並討論傳輸速率是專用還是共享。

- - HFC：下行 42.8 Mbps，上行 30.7 Mbps，共享
  - DSL：下行 24 Mbps，上行 3 Mbps，專用
  - FTTH：下行 100 Mbps，上行 100 Mbps，專用

### R10. Describe the different wireless technologies you use during the day and their characteristics. If you have a choice between multiple technologies, why do you prefer one over another?

#### 描述您在一天中使用的不同無線技術及其特性。如果您可以選擇多種技術，為什麼您更喜歡一種而不是另一種？

- WiFi、4G、乙太網路，WiFi 速度快，但距離短。4G 速度慢但距離遠。乙太網路速度快，但需要有線連接。

### R11. Suppose there is exactly one packet switch between a sending host and a receiving host. The transmission rates between the sending host and the switch and between the switch and the receiving host are $R_1$ and $R_2$, respectively. Assuming that the switch uses store-and-forward packet switching, what is the total end-to-end delay to send a packet of length $L$? (Ignore queuing, propagation delay, and processing delay.)

#### 假設在發送主機和接收主機之間有一個封包交換機。發送主機和交換機之間的傳輸速率為 $R_1$，交換機和接收主機之間的傳輸速率為 $R_2$。假設交換機使用存儲轉發封包交換，發送長度為 $L$ 的封包的總端到端延遲是多少？（忽略排隊、傳播延遲和處理延遲。）

- 一開始發送主機開始傳輸。在 $\frac{L}{R_1}$ 後，發送主機完成傳輸，且 router 接收到整個封包(無傳播延遲)。因為 router 已經有完整的封包了，他可以開始傳輸到接收主機，在 $\frac{L}{R_2}$ 後，接收主機接收到封包。所以總延遲為 $\frac{L}{R_1} + \frac{L}{R_2}$。

### R12. What advantage does a circuit-switched network have over a packet-switched network? What advantages does TDM have over FDM in a circuit-switched network?

#### 電路交換網絡相對於封包交換網絡有什麼優勢？在電路交換網絡中，TDM 相對於 FDM 有什麼優勢？

- 電路交換網路保證端對端的頻寬，而封包交換網路不保證。
- 如果發生擁塞，TDM 可能只會 loss 一些資料，而 FDM 可能會 loss 全部。
- FDM 建立連線後，占用的頻寬不能被其他連線使用，可能存在浪費的情況。

### R13. Suppose users share a $2$ Mbps link. Also suppose each user transmits continuously at $1$ Mbps when transmitting, but each user transmits only 20 percent of the time. (See the discussion of statistical multiplexing in Section 1.3.)

#### 假設用戶共用一個 $2$ Mbps 的連線。同時假設每個用戶在傳輸時連續傳輸 $1$ Mbps，但每個用戶只在 $20$% 的時間內傳輸。 (參見第 1.3 節中對統計多路復用的討論。)

- a. When circuit switching is used, how many users can be supported?
    - 當使用電路交換時，可以支持多少用戶？
        - 2 個用戶，每個用戶各使用一半的頻寬。

- b. For the remainder of this problem, suppose packet switching is used. Why will there be essentially no queuing delay before the link if two or fewer users transmit at the same time? Why will there be a queuing delay if three users transmit at the same time?
    - 在這個問題的其餘部分，假設使用封包交換。如果兩個或更少的用戶同時傳輸，為什麼在連接之前基本上不會有排隊延遲？如果三個用戶同時傳輸，為什麼會有排隊延遲？
        - 如果兩個或更少的用戶同時傳輸，那麼他們的傳輸速率不會超過 $2$ Mbps，所以不會有排隊延遲。如果三個用戶同時傳輸，那麼他們的傳輸速率會超過 $2$ Mbps，所以會有排隊延遲。

- c. Find the probability that a given user is transmitting.
    - 找到特定用戶正在傳輸的概率。
        - 0.2

- d. Suppose now there are three users. Find the probability that at any given time, all three users are transmitting simultaneously. Find the fraction of time during which the queue grows.
    - 現在假設有三個用戶。找到在任何給定時間，所有三個用戶同時傳輸的概率。找到隊列增長的時間比。
        - $\binom{3}{3} p^3 (1-p)^{3-3} = (0.2)^3$

### R14. Why will two ISPs at the same level of the hierarchy often peer with each other? How does an IXP earn money?

#### 為什麼位於層次結構相同級別的兩個 ISP 經常互相對等？IXP 如何賺錢？

- 如果兩個 ISP 不互相對等，當他們向彼此發送流量時，必須經過中間的 ISP 而增加成本。互相對等可以減少成本。IXP 可以向 ISP 收取更低價的費用來賺錢，費用可能取決於流量大小。

### R15. Why is a content provider considered a different Internet entity today? How does a content provider connect to other ISPs? Why?

#### 為什麼內容提供商今天被認為是一個不同的互聯網實體？內容提供商如何連接到其他 ISP？為什麼？

- 內容提供商提供內容，而不是提供連線。除非內容提供商有自己的網路，否則他們需要連接到其他 ISP 來提供服務。內容提供商可能會連接到更低層的 ISP 來提供服務，因為這樣可以減少成本。

### R16. Consider sending a packet from a source host to a destination host over a fixed route. List the delay components in the end-to-end delay. Which of these delays are constant and which are variable?

#### 考慮在固定路由上從來源主機發送封包到目的主機。列出端到端延遲中的延遲因子。這些延遲中哪些是恆定的，哪些是變化的？

- - Processing delay：變化(有爭議，原版解答為恆定)
  - Queuing delay：變化
  - Transmission delay：恆定
  - Propagation delay：恆定

### R17. Visit the Transmission Versus Propagation Delay applet at the companion Website. Among the rates, propagation delay, and packet sizes available, find a combination for which the sender finishes transmitting before the first bit of the packet reaches the receiver. Find another combination for which the first bit of the packet reaches the receiver before the sender finishes transmitting.

#### 訪問伴隨網站的傳輸與傳播延遲 applet。在可用的速率、傳播延遲和封包大小中，找到一個組合，使發送方在第一個位元到達接收方之前完成傳輸。找到另一個組合，使封包的第一個位元在發送方完成傳輸之前到達接收方。

- 這裡僅列出關係式，令傳輸速率為 $R$，傳播延遲為 $d_{prop}$，封包大小為 $L$。
    - 在第一個位元到達接收方之前完成傳輸：$\frac{L}{R} < d_{prop}$
    - 在發送方完成傳輸之前到達接收方：$\frac{L}{R} > d_{prop}$

### R18. A user can directly connect to a server through either long-range wireless or a twisted-pair cable for transmitting a 1500-bytes file. The transmission rates of the wireless and wired media are 2 and 100 Mbps, respectively. Assume that the propagation speed in air is $3 \times 10^8$ m/s, while the speed in the twisted pair is $2 \times 10^8$ m/s. If the user is located 1 km away from the server, what is the nodal delay when using each of the two technologies?

#### 用戶可以通過長距離無線或雙絞線纜線直接連接到服務器，用於傳輸一個 1500 字節的文件。無線和有線媒介的傳輸速率分別為 2 和 100 Mbps。假設空氣中的傳播速度為 $3 \times 10^8$ m/s，而雙絞線中的速度為 $2 \times 10^8$ m/s。如果用戶距離服務器 1 公里，使用這兩種技術時的節點延遲是多少？

- 無線：$\frac{1500 \times 8\ Kb}{2000\ Kbps} + \frac{1000\ m}{3 \times 10^8\ m/s} = 6s$
- 有線：$\frac{1500 \times 8\ Kb}{100000\ Kbps} + \frac{1000\ m}{2 \times 10^8\ m/s} = 0.12s$

### R19. Suppose Host A wants to send a large file to Host B. The path from Host A to Host B has three links, of rates $R_1$ = 500 kbps, $R_2$ = 2 Mbps, and $R_3$ = 1 Mbps. 

#### 假設主機 A 想要將一個大文件發送給主機 B。從主機 A 到主機 B 的路徑有三個連接，速率分別為 $R_1$ = 500 kbps、$R_2$ = 2 Mbps 和 $R_3$ = 1 Mbps。

- a. Assuming no other traffic in the network, what is the throughput for the file transfer? 
    - 假設網絡中沒有其他流量，文件傳輸的吞吐量是多少？
        - 因為 $R_1$ 最慢，他是 bottleneck，所以吞吐量為 500 kbps。

- b. Suppose the file is 4 million bytes. Dividing the file size by the throughput, roughly how long will it take to transfer the file to Host B? 
    - 假設文件大小為 4 百萬字節。將文件大小除以吞吐量，大約需要多長時間將文件傳輸到主機 B？
        - $\frac{4 \times 10^6\ \times 8\ bits}{500 \times 10^3\ Kbps} = 64s$

- c. Repeat (a) and (b), but now with $R_2$ reduced to 100 kbps.
    - 重複 (a) 和 (b)，但現在將 $R_2$ 降低到 100 kbps。
        - a. 因為 $R_2$ 是最慢的，吞吐量為 100 kbps。
        - b. $\frac{4 \times 10^6\ \times 8\ bits}{100 \times 10^3\ Kbps} = 320s$

### R20. Suppose end system A wants to send a large file to end system B. At a very high level, describe how end system A creates packets from the file. When one of these packets arrives to a router, what information in the packet does the router use to determine the link onto which the packet is forwarded? Why is packet switching in the Internet analogous to driving from one city to another and asking directions along the way?

#### 假設終端系統 A 想要將一個大文件發送給終端系統 B。在非常高的層次上，描述終端系統 A 如何從文件中創建封包。當這些封包中的一個到達路由器時，路由器使用封包中的哪些訊息來確定將封包轉發到哪個連接？為什麼互聯網中的封包交換類似於從一個城市開車到另一個城市並在途中詢問方向？

- 終端系統 A 會將大檔案分成很多個 chunks，並向每個 chunks 加上 header，就可以生成封包。這些 header 包括目的地(終端系統 B)的 IP 位址。封包交換器使用這個目標 IP 位址確定將封包轉發到哪個連接。封包交換類似於開車詢問方向，因為封包交換器在轉發封包時，會根據封包中的目標 IP 位址來決定轉發的連接。

### R21. Visit the Queuing and Loss applet at the companion Web site. What is the maximum emission rate and the minimum transmission rate? With those rates, what is the traffic intensity? Run the applet with these rates and determine how long it takes for packet loss to occur. Then repeat the experiment a second time and determine again how long it takes for packet loss to occur. Are the values different? Why or Why not?

#### 訪問伴隨網站的 Queuing and Loss applet。最大發射速率和最小傳輸速率是多少？使用這些速率，流量強度是多少？使用這些速率運行 applet，並確定發生封包丟失需要多長時間。然後再次重複實驗，並再次確定發生封包丟失需要多長時間。這些值是否不同？為什麼？

- 最大發射速率：$R_1$，最小傳輸速率：$R_2$，流量強度：$R = \frac{R_1}{R_2}$。因為 $R_1$ 是最大發射速率，所以當 $R > 1$ 時，封包會丟失。

### R22. If two end-systems are connected through multiple routers and the data-link level between them ensures reliable data delivery, is a transport protocol offering reliable data delivery between these two end-systems necessary? Why?

#### 如果兩個終端系統通過多個路由器連接，並且它們之間的數據鏈路級確保可靠的數據傳遞，那麼在這兩個終端系統之間提供可靠的數據傳遞的傳輸協議是必要的嗎？為什麼？

- 可靠的資料鏈路協定可以從影響各個鏈路的錯誤中恢復，但中間可能會經過很多路由器，這些路由器都有可能發生錯誤，比如緩衝區滿了所以封包被丟棄。而且路由器可能故障，所以使用可靠的傳輸協議會更有意義。

### R23. What are the five layers in the Internet protocol stack? What are the principal responsibilities of each of these layers?

#### 互聯網協議棧中的五層是什麼？這些層的主要責任是什麼？

- - Application：會實作在終端系統的應用程式中，負責解封裝較低層的資料，使得封包可以被應用程式使用，如 HTTP、FTP、SMTP。
  - Transport：封裝 Application 層的封包，並制定一套傳輸協議給 Network 層，如 TCP、UDP。
  - Network：封裝 Application, Transport 層的封包，加上目的地的 IP 位址，決定封包的路徑，如 IP。
  - Link：封裝 Application, Transport, Network 層的封包，加上 MAC 位址，負責將封包傳送到下一個節點，如 ARP。
  - Physical：將封包轉換成訊號傳遞，如 RJ45。

### R24. What do encapsulation and de-encapsulation mean? Why are they needed in a layered protocol stack?

#### 封裝和解封裝是什麼意思？為什麼在分層協議堆疊中需要它們？

- 封裝是將較低層的資料加上 header，使得資料可以被傳送到下一層。解封裝是將 header 從資料中移除，使得資料可以被應用程式使用。分層協議堆疊需要封裝和解封裝，因為每一層的資料都需要加上 header，使得資料可以被下一層使用。

### R25. Which layers in the Internet protocol stack does a router process? Which layers does a link-layer switch process? Which layers does a host process? 

#### 互聯網協議堆疊中的哪些層由路由器處理？交換機處理哪些層？主機處理哪些層？

- - Router：Network、Link、Physical
  - Link-layer switch：Link、Physical
  - Host：Application、Transport、Network、Link、Physical

### R26. What is self-replicating malware?

#### 什麼是自我複製的惡意軟體？

-  可以複製自己的惡意軟體，並透過網路或其他方式，利用漏洞感染其他電腦。

### R27. Describe how a botnet can be created and how it can be used for a DDoS attack

#### 描述如何創建 botnet 以及如何將其用於 DDoS 攻擊

- Botnet 是由攻擊者找到漏洞感染了大量電腦並組成的網路，攻擊者可以透過 C2 伺服器向 botnet 中所有節點發出指令，並針對某個目標發動大量封包使其癱瘓。如：TCP SYN 攻擊。

### R28. Suppose Alice and Bob are sending packets to each other over a computer network. Suppose Trudy positions herself in the network so that she can capture all the packets sent by Alice and send whatever she wants to Alice. List some of the malicious things Trudy can do from this position.

#### 假設 Alice 和 Bob 通過計算機網路互相發送封包。假設 Trudy 將自己放在網路中，以便她可以捕獲 Alice 發送的所有封包並向 Alice 發送她想要的任何東西。列出 Trudy 可以從這個位置做的一些惡意事情。

- Trudy 可以假扮成 Bob，並向 Alice 發送假封包。或者丟棄 Bob 給 Alice 的封包，即使已加密。