---
prev: false
next: false
---

# asdf 基础

![](https://willsena.dev/content/images/2022/11/asdf.jpg)

asdf 是个多语言・运行时的版本管理工具

可以同时管理多个语言的版本，能替代以往需要分别安装不同版本管理工具的做法

## 下载安装

[更多详见](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf)

## 使用步骤

1. 下载语言・运行时的插件
2. 下载指定版本的语言・运行时
3. 按需设置全局与项目环境下的语言・运行时的版本
4. 更改版本时需要 reshim

## 目录结构

```shell
全局目录
|- ...
|- .tool-versions           # 全局环境下使用的版本
|- 工作区
    |- 项目目录
        ｜- ...
        |- .tool-versions   # 该项目目录下使用的版本
    |- 项目目录
        ｜- ...
        |- .tool-versions   # 该项目目录下使用的版本
```

asdf 会将当前目录范围内所用语言・运行时的版本记载到`.tool-versions`文件，若当前目录中没有该文件则默认使用全局环境下的版本，文件内容在执行设置命令时自动更新，也可手动写入 ( 然后 reshime )

> 如下：一个在某个目录下指定了 Node.js、Go、Python 版本的`.tool-versions`文件

::: code-group

```tsx [.tool-versions]
nodejs 18.18.0
python 3.10.0
golang 1.18
```

:::

## 常用命令

[更多详见](https://asdf-vm.com/manage/commands.html)

---

### 下载

要下载某个语言・运行时前必须要先下载其插件

下载语言・运行时务必要指明版本号，否则会下载全部版本

::: code-group

```shell [插件]
asdf plugin add [插件名]
```

```shell [语言・运行时]
# 指明版本
asdf install [语言・运行时] [版本]
# 最新版本
asdf install [语言・运行时] latest
```

:::

> 如下：

```shell
% asdf plugin add nodejs
% asdf plugin add python
% asdf plugin add golang

% asdf install nodejs 18.18.0
% asdf install python 3.10.0
% asdf install golang 1.18
```

---

### 设置

设置完成后需要执行[`asdf reshim`](#更新连接)更新环境变量，重新连接已安装的可执行文件

::: code-group

```shell [全局]
asdf global [语言・运行时] [版本]   # [!code focus]
asdf reshim [语言・运行时]
```

```shell [项目目录]
cd 项目目录
asdf local [语言・运行时] [版本]    # [!code focus]
asdf reshim [语言・运行时]
```

:::

---

### 更新连接

在安装或者更改语言・运行时的版本时，需要运行`asdf reshim`命令来更新环境变量，使系统可以找到并使用正确版本的可执行文件，否则在切换或安装新版本后系统可能仍然使用旧版本

```shell
asdf reshim [语言・运行时]
```

---

### 查看所有能安装

::: code-group

```shell [插件]
asdf plugin list all
```

```shell [语言・运行时]
# 所有版本
asdf list all [语言・运行时]
# 指明版本的所有子集
asdf list all [语言・运行时] [版本]
```

:::

> 如下：列出了 Node.js 18 版本所有能下载的子集版本

```shell
% asdf list all nodejs 18     # [!code focus]
18.0.0
18.1.0
18.2.0
省略...
18.18.2
18.19.0
```

---

### 查看所有已安装

::: code-group

```shell [插件]
asdf plugin list
```

```shell [语言・运行时]
asdf list
```

:::

> 如下：列出了已经下载的所有语言・运行时，`*`标记为当前使用的版本

```shell
% asdf list     # [!code focus]
golang
 *1.18
  1.20
nodejs
 *18.18.0
pdm
 *2.9.3
python
 *3.10.0
```

---

### 查看当前

```shell
asdf current
```

> 如下：在全局环境下除了没有指定版本号的 Go 以外都显示了版本号以及记录信息的`.tool-versions`位置

```shell
% asdf current  # [!code focus]
golang          ______          No version is set. Run "asdf <global|shell|local> golang <version>"
nodejs          16.15.0         /Users/用户/.tool-versions
python          3.10.0          /Users/用户/.tool-versions
ruby            3.1.2           /Users/用户/.tool-versions
```
