---
title: Farmbot歷程
date: 2021-02-11
tags:
  - Bot
---
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>





<center><h1> Farmbot </h1></center>

[FBTUG共筆資料](https://paper.dropbox.com/doc/FarmBot-Repair-From-Yilan-to-Yunlin-6QJa3jqN15wj766oBaWnA)


## 什麼是Farmbot?

一個機器人開放式系統，可通過土地種植，澆水，土壤測試和除草為所有需要耕種小土地跟想種糧食的人提供幫助

使用Raspberry Pi(樹莓派)，Arduino以及其他優良組件

 ### 1.碳足跡
 
 #### 製造
> 目前看重環保議題,Farmbot使用最普遍的材料:

 | 材料 | 用途 | 重量(kg) | kg CO2/物料 kg | CO2(kg) |
 | ------- | ---- | ---- | ---- | ---- |
 | 鋁 | 擠壓板 | 9.5 | 8.24 | 78.3 |
 | 不鏽鋼 | 硬件，軸承，驅動軸，絲槓 | 1.4 | 6.15 | 8.6 |
 | 塑料 | 拖鏈，3D列印[[CAD]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/3a231755273e980d277c3a4c)，輪子，電子設備，管材，電路板 | 2.8 | 2.53 | 7.1 |
 | 銅 | 電，佈線，電動機繞組 | 0.3 | 2.60 | 0.8 |
 | 橡膠 | 皮帶，電線，墊片 | 0.2 | 3.18 | 0.6 |
 | | | | 合計 | 95.4 |

> 每生產Farmbot排放的理論量約 **95.4 kg**，但實際上較接近 **150 kg**

 #### 使用

> 在使用Farmbot時，最明顯的CO2排放源應為用電量，在此使用美國平均每千瓦時所排放的二氧化碳量 (0.554kg/kWh)

| 零件 | 功率(W) | 佔空比(%) | 使用時間(h/d) | kWh/day | kWh/year | kg CO2/day | kg CO2/year |
| --------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 樹莓派2 | 3.0 | 100% | 24.00 | 0.072 | 26.3 | 0.040 | 14.56 |
| 樹莓派相機 | 1.5 | 100% | 24.00 | 0.036 | 13.1 | 0.020 | 7.28 |
| Arduino Mega 2560 | 1.0 | 100% | 24.00 | 0.024 | 8.8 | 0.013 | 4.85 |
 | NEMA 17步進馬達*3 | 30.0 | 5% | 1.20 | 0.036 | 13.1 | 0.020 | 7.28 |
 | 12V工具 | 132.0 | 2% | 0.48 | 0.063 | 23.1 | 0.035 | 12.81 |
 | 電磁閥 | 30.0 | 2% | 0.48 | 0.014 | 5.3 | 0.008 | 2.91 |
 | 真空泵 | 186.0 | 0.5% | 0.012 | 0.022 | 8.1 | 0.012 | 4.51 |
| Web App服務器/用戶 | 20.0 | 1% | 0.24 | 0.005 | 1.8 | 0.003 | 0.97 |
 | 設備(筆電) | 60.0 | 1% | 0.24 | 0.014 | 5.3 | 0.008 | 2.91 |
 | | | | 合計 | 0.287 | 104.9 | 0.159 | 58.09 |

>> *佔空比:組件使用時間的估計平均百分比

> 使用這些估計，經營Farmbot會發出約60kg CO2/year，相當於汽車燃燒6.5加侖汽油，依美國平均每度電費成本(0.15$/kWh)，運行一年成本約16$

> 現在使用Farmbot種植蔬菜，比較商店購買相同數量的蔬菜，假設有充分利用並每天種植80cal熱量的蔬菜，表示一年產生29200卡路里的蔬菜，而CO2成本60g，意味著Farmbot種植蔬菜碳強度為 **2.05g CO2/卡路里**

> 下圖為經濟研究中心的數據

> ![Data](https://cdn.shopify.com/s/files/1/2040/0289/files/FoodkCal.png?16362500919546419487)

> ---

<center> 
<h2>Farmbot種植的蔬菜比商店購買的少25-30%</h2>
</center>

> ---

> ### 2.客製化

> #### 隨時隨地操作

>> 可在手機/平板電腦上操作，使能隨時隨地管理

> #### 拖放編程

>> 使用類似於遊戲的介面管理農田，設計程式

> #### 100%開源

>> 開放免費使用所有CAD模型，原理圖，物料清單並加以改進，複製，編輯

> ### 3.耐用組件

> #### 鋁擠

>> Farmbot主要結構元件，耐腐蝕，經陽極氧化處理提供優質觀感

> #### 塑膠零件

>> 用堅固的抗紫外線ABS注塑成型

> #### 電子產品

>> Farm + Arduino = Farmduino ，使用24V DC供電，作為處理器，而樹莓派3可當作大腦跟網路連接

> ### 4.工具 3D模型可參閱 [這個](https://genesis.farm.bot/v1.5/Extras/cad?fbclid=IwAR1BUr8w51e3S80-9tNpDP3ChBaVAHq8Pih8CCsbKb6_V5m7hl77qex4wDY)

> #### 種子注入器 [[CAD]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/1449bd11dc3cf8a5f2563601?fbclid=IwAR1qbSlxlpT-fpmIKSq1HtT0u4voV9u2Tx6DipVgkH4HQPDloUZ8yByavrw) :

>> 由24V真空泵提供動力，將種子精確定位在地面上，精度為毫米

![seeder](https://cdn.shopify.com/s/files/1/2040/0289/files/Seeder_1.jpg?12723977322247612640){ width=100% height="300px" }
![seeder2](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/FarmBot_Genesis_Seed_Injector_Assembly.png/270px-FarmBot_Genesis_Seed_Injector_Assembly.png){: width=device-width height="300px"}

> #### 噴水嘴 [[CAD]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/3f379dda94032bbfb6429694) :

>> 結合電磁閥，用溫和的淋浴器為植物精確澆水，允許使用3D列印下半部來定制噴霧樣式

![water](https://cdn.shopify.com/s/files/1/2040/0289/files/Water_1.jpg?12723977322247612640){: width=device-width height="300px"}
![water2](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/FarmBot_Genesis_Watering_Tool_Assembly.png/270px-FarmBot_Genesis_Watering_Tool_Assembly.png){: width=device-width height="300px"}

> #### 除草機 [[CAD]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/d8f735e3055725dc0155a480) :

>> 使用自定義的除草工具將雜草連根拔除，避免它們成為問題

![weeder](https://cdn.shopify.com/s/files/1/2040/0289/files/Weeder_1.jpg?12723977322247612640){: width=device-width height="300px"}
![weeder1](https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/FarmBot_Genesis_Weed_Suppressor_Assembly.png/270px-FarmBot_Genesis_Weed_Suppressor_Assembly.png){: width=device-width height="300px"}

> #### 土壤傳感器 [[CAD]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/6ca8f07ff28a92ec08c70e71) :

>> 透過測量土壤濕度來更有效地為農作物澆水，同時可測量土壤溫度幫助檢測發芽失敗的風險

![sensor](https://cdn.shopify.com/s/files/1/2040/0289/files/Soil-Sensor_1.jpg?12723977322247612640){: width=device-width height="300px"}
![sensor2](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/FarmBot_Genesis_Soil_Sensor_Assembly.png/270px-FarmBot_Genesis_Soil_Sensor_Assembly.png){: width=device-width height="300px"}

> #### 種子容器 [[CAD(種子分類盤)]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/ba2cf5c1c9299c7597d773d1) [[CAD(種子槽)]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/752fa7f2bba8b0042c906b5d) [[CAD(容器]](https://cad.onshape.com/documents/6626b842adca229e69544ad1/w/89ac2637f82d915f22c2bcd0/e/15a8803a30f567a3061ece42) :

>> 可容納大量一種種子，托盤則適合種植許多不同的農作物或嚴格控制每個孔的種子數

![seeds](https://cdn.shopify.com/s/files/1/2040/0289/files/Seed-Bin_1.jpg?12723977322247612640){: width=device-width height="300px"}


> #### 相機 :

>> 防水相機為植物和土壤拍照，跟蹤植物生長，檢測雜草，蟲害和疾病跟果實成熟度

![camera](https://cdn.shopify.com/s/files/1/2040/0289/files/Camera-2.jpg?12723977322247612640){: width=device-width height="300px"}

> #### 樹莓派簡介 :

> <img src="./images/raspberrypi4.jpg" />

> ### 5.探索領域

> #### 教育:

>> 小學: 透過課程與實際操作解決問題，激發學生從事與此相關的職業，增加創造力

>> 中學: 提供學習工廠科學，編碼，CNC設備操作

>> 高中: 激勵學生從事此領域的繼續教育，例如電子，機械工程，機器人技術，土壤科學

>> 大學: 可以多代，基於研究的方式使用，有強大的序列編輯器，集成的攝像頭和農具插件系統用於設計各種實驗

> #### 家庭:

>> 能夠種植具挑戰性的植物，解決氣候變化，塑料包裝，行進路程，農藥使用等問題，從而能夠養家糊口

> #### 研究:

>> NASA: 在太空種植植物，幫助人類有天能在火星及月球上生活

>> AlphaGarden: 探索人工智能，讓機器人進行訓練

> #### 輔助:

>> Thrive Upstate組織為殘障人士和特殊需求的人們提供服務，使用Farmbot作為園藝療法的輔助功能，增強原本無法自己種植植物的人的能力

> ### 6.使用

> #### Web應用程序:

>> 可直接在網頁上控制和配置Farmbot，能夠實時手動控制跟記錄，用於創建自定義例程的序列生成器及拖放式農場設計器，因此可圖形化設計自己的田地

> ![appdemo](./assets/images/farmbot_appdemo.png){: width=device-width height=device-height}

> #### 作業系統:

>> 在樹莓派上運行名為**FarmBot OS**的自定義操作系統，能與Web同步來進行實時控制及上傳日誌跟傳感器數據

>> 透過USB傳輸或序列連接發送指令，在第一次使用時，可透過configurator應用程式連接家中Wifi及Web應用程序

> ![raspberrypi](./assets/images/raspberrypi4.jpg){: width=device-width height="300px"}

> #### Arduino:

>> 負責物理操作Farmbot，接收指令，和傳回數據

> ### 7.投資報酬率

> Farmbot分成三種尺寸(Express, Express XL, Express MAX)，由於MAX太大太貴沒什麼人會用，所以下架

> | 尺寸 | 寬 | 長 | 面積 | 最大植物高度|
> | ---- | ---- | ---- | ---- | ---- |
> | Express | 1.2m | 3m | 3.6m^2 | 0.5m |
> | Express XL | 2.4m | 6m | 14.4m^2 | 0.5m |
> | Express MAX | 2.4m | 18m | 43.2m^2 | 0.5m |

> 在此使用Express尺寸來計算成本

> #### 直接成本

>> 設每天每1m^2 產1杯(250ml)蔬菜，因Express佔地3.6m^2，表示每月生產108杯，下表為Farmbot種植與在商店購買的比較費用:

>> | | | Farmbot Express | | 商店購買 |
>> | ---- | ---- | ---- | ---- | ---- | ---- |
>> | 項目 | 成本 | 每月產量 | 小計 | 每月產量 | 小計 |
>> | 蔬菜 | $0.05/杯 | 108 | $0.00 | 108 | $54.00 |
>> | 種子 | $2.00/包 | 3 | $6.00 | - | $0.00 |
>> | 水 | $0.015/加侖 | 150 | $2.25 | - | $0.00 |
>> | 電 | $0.12/kWh | 8.6 | $1.03 | - | $0.00 |
>> | | | 每月總費用 | $9.28 | | $54.00 |
>> | | | 每年總費用 | $111.36 | | $648.00 |

>> 由此可知每年可節省540美元，若Farmbot Express費用2000美元(套件+運費+稅金+基礎設施+土地)，則投資回收期<4年

>> 但如果把像是去商店的車油費之類的間接成本算進去...

> #### 間接成本

>> 把時間考慮進去，以中產階級平均年薪50000美元($25/h)來計算，為了跟上面公平競爭，所以要調整蔬菜成本，增加30%的有機加價，以說明自然增長，並使用25MPG(每加侖幾英里)的車輛往返商店

>> | | | Farmbot Express | | 商店購買 |
>> | ---- | ---- | ---- | ---- | ---- | ---- |
>> | 項目 | 成本 | 每月產量 | 小計 | 每月產量 | 小計 |
>> | 蔬菜 | $0.05/杯 | 108 | $0.00 | 108 | $54.00 |
>> | 有機加價 | $0.15/杯 | 108 | $0.00 | 108 | $16.20 |
>> | 種子 | $2.00/包 | 3 | $6.00 | - | $0.00 |
>> | 水 | $0.015/加侖 | 150 | $2.25 | - | $0.00 |
>> | 電 | $0.12/kWh | 8.6 | $1.03 | - | $0.00 |
>> | 25MPG車輛運輸6.8英里<br>(成本$0.59/英里) | $4.01/趟 | - | $0.00 | 4 | $16.04 |
>> | 車輛排放的二氧化碳 | $0.22/kg | - | $0.00 | 9.7 | $2.13 |
>> | 蔬菜生產中排放的二氧化碳 | $0.22/kg | 5 | $1.10 | 6.8 | $1.50 |
>> | 購買蔬菜的時間(1小時) | $25.00/程 | - | $0.00 | 4 | $100.00 |
>> | 每天收集蔬菜的時間(5分鐘) | $2.08 | 30 | $62.40 | - | $0.00 |
>> | 維護Farmbot的時間(30分鐘) | $12.50 | 1 | $12.50 | - | $0.00 |
>> | | | 每月總費用 | $85.28 | | $189.87 |
>> | | | 每年總費用 | $1023.38 | | $2278.44 | 

>> 根據數據，一人每年可節省1250美元，若Farmbot Express費用2000美元+建造時間(4小時)100美元，總投資額為2100美元，投資回報期則不到2年

> ---

 <center> 
 <h2> 投資回報期不到兩年 </h2>
 </center>

> ---





## [開發文件](https://developer.farm.bot/v12/Documentation/farmbot-software-development)
## [操作文件](https://software.farm.bot/v12/FarmBot-Software/intro)
## [Github](https://github.com/FarmBot)


<style>

.back-to-top {

display: none; /* 默認是隱藏的，這樣在第一屏才不顯示 */

position: fixed; /* 位置是固定的 */

bottom: 20px; /* 顯示在頁面底部 */

right: 30px; /* 顯示在頁面的右邊 */

z-index: 99; /* 確保不被其他功能覆蓋 */

border: 1px solid #5cb85c; /* 顯示邊框 */

outline: none; /* 不顯示外框 */

background-color: #fff; /* 設置背景背景顏色 */

color: #5cb85c; /* 設置文本顏色 */

cursor: pointer; /* 滑鼠移到按鈕上顯示手型 */

padding: 10px 15px 15px 15px; /* 增加一些內邊距 */

border-radius: 10px; /* 增加圓角 */

}

.back-to-top:hover {

background-color: #5cb85c; /* 滑鼠移上去時，反轉顏色 */

color: #fff;

}

</style>

<button class="js-back-to-top back-to-top" title="回到頭部">&#65085;</button>

<script src="https://cdn.staticfile.org/jquery/2.2.4/jquery.min.js"></script>

<script>

$(function () {

var $win = $(window);

var $backToTop = $('.js-back-to-top');

// 當用戶滾動到離頂部100像素時，展示回到頂部按鈕

$win.scroll(function () {

if ($win.scrollTop() > 100) {

$backToTop.show();

} else {

$backToTop.hide();

}

});

// 當用戶點擊按鈕時，通過動畫效果返回頭部

$backToTop.click(function () {

$('html, body').animate({scrollTop: 0}, 200);

});

});

</script>
<script type="text/javascript">
	$(document).ready(function() {
	    //所有連結會在新分頁開啟
		$('a[href^="http"]').each(function() {
			$(this).attr('target', '_blank');
		});
	});
</script>