---
title: PL OurScheme Interpreter 專案三函數儲存可能思路
date: 2025-05-12
---

### [點我參考程式碼(將於專案截止日後轉為公開 repo)](https://github.com/ja-errorpro/CYCS_OurSchemeInterpreter/tree/bf0f8ca3aaadb9b758a11dcd1238e5aff20e81cb)

這邊統一一下對於 parameter 和 argument 的用詞定義：
> Parameter: 定義函數時的參數變數

> Argument: 呼叫函數時傳入的參數值

對於

`(define F (lambda (param1 param2) s-exp1 s-exp2))`

```mermaid
%%{
    init: {
        'theme': 'base',
        "themeVariables": {
            "lineColor": "#FFFFFF"
        }
    }
}%%
graph TD;
F(["<center>lambda<br>(tag: isfunc)</center>"])-->param1d([.]);
F-->seq1d([.]);
param1d-->param1([param1]);
param1d-->param2d([.]);
param2d-->param2([param2]);
param2d-->nil2([nil]);

seq1d-->seq1([s-exp1])
seq1d-->seq2d([.])
seq2d-->seq2([s-exp2])
seq2d-->nil3([nil])
```

執行 `(F arg1 arg2)` 時將建出以下資料結構：

```mermaid
%%{
    init: {
        'theme': 'base',
        "themeVariables": {
            "lineColor": "#FFFFFF"
        }
    }
}%%
graph TD;
dummyNode([.])-->F(["<center>lambda<br>(tag: isfunc)</center>"])
F-->param1d([.]);
F-->seq1d([.]);
param1d-->param1([param1]);
param1d-->param2d([.]);
param2d-->param2([param2]);
param2d-->nil2([nil]);

seq1d-->seq1([s-exp1])
seq1d-->seq2d([.])
seq2d-->seq2([s-exp2])
seq2d-->nil3([nil])

dummyNode-->argdot1([.])
argdot1-->arg1([arg1])
argdot1-->argdot2([.])
argdot2-->arg2([arg2])
argdot2-->nil4([nil])
```

---

對於

`(define (F param1 param2) s-exp1 s-exp2)`


```mermaid
%%{
    init: {
        'theme': 'base',
        "themeVariables": {
            "lineColor": "#FFFFFF"
        }
    }
}%%
graph TD;
F(["<center>F<br>(tag: isfunc)</center>"])-->param1d([.]);
F-->seq1d([.]);
param1d-->param1([param1]);
param1d-->param2d([.]);
param2d-->param2([param2]);
param2d-->nil2([nil]);

seq1d-->seq1([s-exp1])
seq1d-->seq2d([.])
seq2d-->seq2([s-exp2])
seq2d-->nil3([nil])
```

執行 `(F arg1 arg2)` 時將建出以下資料結構：

```mermaid
%%{
    init: {
        'theme': 'base',
        "themeVariables": {
            "lineColor": "#FFFFFF"
        }
    }
}%%
graph TD;
dummyNode([.])-->F(["<center>F<br>(tag: isfunc)</center>"])
F-->param1d([.]);
F-->seq1d([.]);
param1d-->param1([param1]);
param1d-->param2d([.]);
param2d-->param2([param2]);
param2d-->nil2([nil]);

seq1d-->seq1([s-exp1])
seq1d-->seq2d([.])
seq2d-->seq2([s-exp2])
seq2d-->nil3([nil])

dummyNode-->argdot1([.])
argdot1-->arg1([arg1])
argdot1-->argdot2([.])
argdot2-->arg2([arg2])
argdot2-->nil4([nil])
```