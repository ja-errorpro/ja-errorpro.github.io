---
title: 都 5202 年了，你還在用 pip 嗎？快來試試 uv！
date: 2025-07-10
tags:
  - Python
  - Mix
keywords:
  - python
  - uv
  - package manager
  - pip
  - poetry
  - venv
  - development tools
  - astral
  - python package manager
  - python environment
  - 套件管理
  - 開發工具
  - 虛擬環境
  - 依賴管理
  - 現代化工具
---

## Why `uv`?

以前在使用 pip 時，經常遇到依賴衝突、速度慢等問題。隨著 Python 生態的發展，出現越來越多工具如：`venv`、`poetry`、`pipenv` 等，而 `uv` 則將上述的工具整合在一起，提供了一個更簡單、更高效的 Python 包管理體驗。

## 安裝

根據 [官方文件](https://docs.astral.sh/uv/getting-started/installation/)

### MacOS/Linux

```bash
curl -sSfL https://astral.sh/install.sh | sh
```

### Windows

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### PyPI

```bash
pip install uv
```

```bash
pipx install uv
```

uv 可以更新自己

```bash
uv self update
```

## 使用

### 創建新專案

```bash
uv init my_project
cd my_project
```

### 安裝依賴

```bash
uv add requests
uv add numpy
```

### 多版本 Python

```bash
uv python list # 列出可用的 Python 版本
uv python install 3.11 # 安裝 Python 3.11
uv python pin 3.11 # 使用 Python 3.11
```

### 虛擬環境

```bash
uv venv
```

### 使用 pip

```bash
uv pip install requests
```

### 執行

```bash
uv run script.py
```

### 更新依賴

```bash
uv update requests
```

### 將依賴導出到 requirements.txt

```bash
uv export --format requirements.txt > requirements.tx
```
