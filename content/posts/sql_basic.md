---
title: "SQL 基本語法(sqlite3 in python)"
date: 2022-12-18
tags:
  - mix
  - python
keywords:
  - sql
  - sqlite
  - python
  - database
  - tutorial
  - syntax
  - sqlite3
  - 資料庫
  - 語法教學
  - 關聯式資料庫
  - 基礎入門
  - 程式設計
---

# 環境

市面上有很多家 SQL，在效能、安全性、功能、語法上有些微差異，常見的有：

  * SQLite
  * MySQL
  * PostgreSQL
  * SQL Server

在這裡使用 SQLite 來說明，在 Python 中可以直接使用 SQLite3 來操作。

# 安裝套件

```bash
pip install sqlite3
```

# 與資料庫連線

```python
import sqlite3
conn = sqlite3.connect('example.db')
```

當此程式執行時，如果與程式同一個資料夾下有 `example.db` 檔案，則會連線到該檔案，如果沒有，則會建立一個新的 `example.db` 檔案。

並且 conn 將被建立為 Connection 物件表示資料庫。

# 建立表格

在建立表格前，需要一個 Cursor 來執行 SQL 各種指令。

```python
cur = conn.cursor()
```

建立表格的語法如下：

```sql
CREATE TABLE 表格名稱 (
    第一欄名稱 資料類型,
    第二欄名稱 資料類型,
    第三欄名稱 資料類型,
   ....
);
```

在 SQLite 中，資料類型有以下幾種：

  * NULL：空值
  * INTEGER：整數
  * REAL：浮點數
  * TEXT：字串
  * BLOB：二進位制資料

寫成 Py 的程式碼(建立一個名為 `example_table` 的表格，有三個欄位，分別為 `id`、`name`、`age`)

```python
cur.execute('CREATE TABLE example_table (id INTEGER, name TEXT, age INTEGER)')
```

然而如果 `example_table` 已經存在，則會報錯，因此在建立表格前，可以先檢查表格是否存在，如果不存在，則建立表格。

```python
cur.execute('CREATE TABLE IF NOT EXISTS example_table (id INTEGER, name TEXT, age INTEGER)')
```

# 刪除表格

```sql
DROP TABLE 表格名稱;
```

```python
cur.execute('DROP TABLE example_table')
```

# 新增資料

```sql
INSERT INTO 表格名稱 (欄位1, 欄位2, 欄位3, ...) VALUES (值1, 值2, 值3, ...);
```

可以省略欄位名稱，但要注意順序

```sql
INSERT INTO 表格名稱 VALUES (值1, 值2, 值3, ...);
```

```python
cur.execute("INSERT INTO example_table VALUES (1, 'errorpro', 20)")
```

可以用 `?` 表示空值，然後在下一個參數用 tuple 填值

```python
cur.execute("INSERT INTO example_table VALUES (?, ?, ?)", (2, 'ja', 19))
```

更新完成後，需要使用 `commit()` 將資料寫入資料庫

```python
conn.commit()
```

# 新增多筆資料

使用 `executemany()`

```python
user_lst = []
user_lst.append((3, 'kam', 21))
user_lst.append((4, 'john', 22))
cur.executemany("INSERT INTO example_table VALUES (?, ?, ?)", user_lst)
conn.commit()
```

# 查詢資料

```sql
SELECT 欄位1, 欄位2, 欄位3, ... FROM 表格名稱;
```

我們在 Python 把結果全部印出來

```python
cur.execute("SELECT * FROM example_table")
lst = cur.fetchall()
for row in lst:
    print(row)
```

如果要查詢特定的資料，可以使用 `WHERE` 來過濾

```sql
SELECT 欄位1, 欄位2, 欄位3, ... FROM 表格名稱 WHERE 條件;
```

```python
cur.execute("SELECT * FROM example_table WHERE id = 1")
lst = cur.fetchall()
for row in lst:
    print(row)
```

# 更新資料

```sql
UPDATE 表格名稱 SET 欄位1 = 值1, 欄位2 = 值2, 欄位3 = 值3, ... WHERE 條件;
```

```python
cur.execute("UPDATE example_table SET name = 'errorpro2' WHERE id = 1")
conn.commit()
```

# 刪除資料

```sql
DELETE FROM 表格名稱 WHERE 條件;
```

