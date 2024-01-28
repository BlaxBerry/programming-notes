# venv

Python 自带的虚拟环境工具，安装 Python 后开箱即用

## 使用步骤

### 1. 创建虚拟环境

```shell
python -m venv [自定义名虚拟环境名]
```

一般将自虚拟环境命名为`.venv`

> 如下：进入虚拟环境前后 Python 解析器位置

```shell
% cd demo
% pwd
/Users/用户/demo

% which python
/Users/用户/.asdf/shims/python

% python -m venv .venv             # [!code focus]
% source .venv/bin/activate
(.venv)% which python
/Users/用户/demo/.venv/bin/python

(.venv)% deactivate
% which python
/Users/用户/.asdf/shims/python
```

---

### 2. 进入虚拟环境

```shell
source 虚拟环境名/bin/activate
(虚拟环境名)% ...
```

> 如下：进入虚拟环境并下载第三方包`numpy`

```shell
% cd demo
% python -m venv .venv
% source .venv/bin/activate # [!code focus]

(.venv)% pip install numpy
(.venv)% pip list
Package    Version
---------- -------
numpy      1.25.2
pip        21.2.3
setuptools 57.4.0
```

---

### 3. 退出虚拟环境

```shell
(虚拟环境名)% deactivate
% ...
```

> 如下：在虚拟环境中下载的第三方包不影响全局环境

```shell
% cd demo
% python -m venv .venv
% source .venv/bin/activate

(.venv)% pip install numpy
(.venv)% pip list
Package    Version
---------- -------
numpy      1.25.2
pip        21.2.3
setuptools 57.4.0

(.venv)% deactivate         # [!code focus]
% pip list
% pip list
Package    Version
---------- -------
pip        21.2.3
setuptools 57.4.0
```

## 目录结构

::: code-group

```shell [虚拟环境位置]
全局目录
|- 虚拟环境
|- ...
|- 工作区
    |- 项目目录     # [!code focus]
        |- 虚拟环境 # [!code focus]
        |- ...     # [!code focus]
    |- 项目目录     # [!code focus]
        |- 虚拟环境 # [!code focus]
        |- ...     # [!code focus]
```

```shell [虚拟环境目录]
[虚拟环境]         # [!code focus]
  |- bin          # [!code focus]
    |- activate   # 进入虚拟环境的脚本
    |- ...
  |- include      # [!code focus]
  |- lib          # [!code focus]
    |- python版本
      |- site-package
        |- 下载在虚拟环境中的包
        |- ...
  |- pyvenv.cfg   # [!code focus]
```

:::

> 如下：以 asdf 下载的 Python 3.10.0 版本为例

:::code-group

```txt [pyvenv.cfg]
home = /Users/用户/.asdf/installs/python/3.10.0/bin
include-system-site-packages = false
version = 3.10.0
```

:::
