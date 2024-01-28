---
prev: false
next: false
---

# Python 相关

![](/static/skill-images/python.webp)

## 环境构建

### 下载安装

> 本文使用 [asdf](/others/tools/asdf/)

::: code-group

```shell [安装]
# 1.
asdf plugin add python
# 2.
asdf install python [版本]
# 3.
asdf global python [版本]
# 4.
asdf reshim python
```

```shell [版本查看]
python --version
```

:::

> 如下: 本文使用了 Python v3.10.0

```shell
% asdf plugin add python
% asdf install python 3.10.0
% asdf global python 3.10.0
% python --version
Python 3.10.0
```

---

### 虚拟环境

Python 都建议在运行在虚拟环境中，用来实现隔离以防止安装的包污染到全局

- [venv](./base/virtual-env/venv.md)
- poetry
- pipenv
- virtualenv

## 语言特点

### 解释与执行

Python 是一种解释型语言，代码无需编译步骤

可以直接运行脚本文件，或在交互式解释器中逐行执行代码

::: details 1. 方法一：在 Python 交互式解释器中逐行执行 ( 正经人不会这么用 )

```shell
# 开启解释器
% python
Python 3.10.0 (default, Oct 13 2023, 00:51:07) [Clang 14.0.3 (clang-1403.0.22.14.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print("hello world")
hello world
>>> num = 10
>>> print(num)
10
>>>
# Control + D 关闭解释器
```

:::

::: details 2. 方法二：执行一个现有的 Python 脚本文件

```shell
# 创建一个 example.py 文件并写入内容
% echo 'print("hello world")' > example.py
% echo 'num = 10' >> example.py
% echo 'print(num)' >> example.py

# 运行该文件
% python example.py
hello world
10
```

:::

---

### 代码风格

推荐 black 自动代码格式化工具

::: tip VSCode 配置

配置`.vscode/settings.json`

```json
{
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true
  },
  "python.formatting.provider": "black",
  "black-formatter.args": [
    "--line-length=80" // 设置一行最大数字符数为 79
  ]
}
```

:::

::: tip TOML 配置

1. 下载 black

```shell
%source .venv/bin/active
(.venv) % pip install black
```

2. 配置`pyproject.toml`

```toml
[tool.black]
line-length = 79  # 设置一行最大数字符数为 79
target-version = ["py39", "py310"]
include = '\.pyi?$'
exclude = '''
/(
    \.eggs
  | \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
  | migrations
)/
'''
```

:::

---

### 代码注释

::: code-group

```py [单行注释]
# 注释
# 注释
# 注释
```

```py [多行注释]
"""
注释
注释
注释
"""
```

:::

---

### 内置标准库

Python 提供了大量内置模块与包

| 常用内置模块、包 | 作用                          |
| ---------------- | ----------------------------- |
| `json`           | JSON 格式数据的编码和解码功能 |
|                  |                               |
