# pip

Python 自带的包管理工具，安装 Python 后开箱即用

::: code-group

```shell [版本查看]
pip -V
```

:::

> 如下：文本使用了 pip v21.2.3 ( 适用于 Python v3.10 )

```shell [版本查看]
% pip -V
pip 21.2.3 from /Users/chen/.asdf/installs/python/3.10.0/lib/python3.10/site-packages/pip (python 3.10)
```

## 常用命令

### 下载

建议将包安装到虚拟环境中，用来实现隔离以防止安装的包污染到全局

```shell
# python -m venv .venv
# source .venv/bin/active
pip install [包名]              # [!code focus]
pip install [包名]==版本号       # [!code focus]
```

::: details 例子：验证下载一个第三方包到虚拟环境

```shell
# % python -m venv .venv
# % source .venv/bin/active
(.venv) % pip install requests   # [!code focus]
# ... 省略
Successfully installed requests-2.31.0
```

:::

---

### 卸载

```shell
pip uninstall [包名]
```

::: details 例子：验证要卸载的包不存在于虚拟环境中时

> 如下：要卸载的`requests`包不存在时提示该包未下载

```shell
% pip uninstall requests
WARNING: Skipping requests as it is not installed.
```

:::

::: details 例子：验证卸载虚拟环境中已下载的`requests`包

```shell
(.venv) % pip uninstall requests        # [!code focus]
Found existing installation: requests 2.31.0
Uninstalling requests-2.31.0:
  Would remove:
    省略...
    省略...
Proceed (Y/n)? y
  Successfully uninstalled requests-2.31.0
```

:::

---

### 更新版本

```shell
pip install --upgrade [包名]
```

---

### 查看所有包

```shell
pip list
```

::: details 例子：验证查看虚拟环境中已下载的所有包已经其版本号

> 如下：什么都没下载过的 pip

```shell
(.venv) % pip list          # [!code focus]
Package    Version
---------- -------
pip        21.2.3
setuptools 57.4.0
```

:::

---

### 查看指定包

```shell
pip show [包名]
```

::: details 例子：验证要查看的包不存在于当前虚拟环境中时

> 如下：要查看的`requests`包不存在时提示该包未下载

```shell
(.venv)  % pip show requests
WARNING: Package(s) not found: requests
```

:::

::: details 例子：验证查看虚拟环境中已下载的`requests`包的信息

```shell
(.venv) % pip show requests     # [!code focus]
Name: requests
Version: 2.31.0
Summary: Python HTTP for Humans.
Home-page: https://requests.readthedocs.io
Author: Kenneth Reitz
Author-email: me@kennethreitz.org
License: Apache 2.0
Location: 虚拟环境所在目录/.venv/lib/python3.10/site-packages
Requires: certifi, idna, charset-normalizer, urllib3
Required-by:
```

:::
