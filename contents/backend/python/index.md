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

> 如下: 本文使用了 v3.10.0

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

- [venv](./virtual-env/venv.md)
- poetry
- pipenv
- virtualenv
