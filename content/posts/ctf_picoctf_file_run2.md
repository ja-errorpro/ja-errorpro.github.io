---
title: 【CTF-WriteUp】PicoCTF-file-run2
date: 2022-10-04
tags:
  - ctf
---

題目：

	給你一個檔案，執行它時輸入"Hello!"(不含引號)。
	
# 概念：

* 逆向工程
* Linux 指令操作
* Linux 權限控制

# 題解

丟進IDA看看，發現確實只要輸入Hello!就能跑出Flag，

```cpp

main(int param_1,long param_2){
  int var1;
  
  if ((param_1 < 2) || (2 < param_1)) {
    puts("Run this file with only one argument.");
  }
  else {
    var1 = strcmp(*(char **)(param_2 + 8),"Hello!");
    if (var1 == 0) {
      printf("The flag is: %s",flag);
    }
    else {
      puts("Won\'t you say \'Hello!\' to me first?");
    }
  }
  return 0;
}


```

然而在執行時卻出現權限不足的訊息。

```sh
$ ./run Hello!
./run: Permission denied
```

檢查檔案權限

```sh
$ ls -l run
-rw-r--r-- 1 user user 16816 Mar 15  2022 run
```

發現只有查看與修改權限(r:讀取 w:寫入 x:執行)

可以使用chmod設定權限

```sh
$ chmod +x run
```

設定完再run一次就能看到flag了。