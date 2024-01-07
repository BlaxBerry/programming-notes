---
prev: false
next: false
---

# Go 相关

![](/static/skill-images/go.webp)

## 环境构建

### 下载安装

> 本文使用 [asdf](/others/tools/asdf/)

::: code-group

```shell [安装]
# 1.
asdf plugin add golang https://github.com/asdf-community/asdf-golang.git
# 2.
asdf install golang 版本
# 3.
asdf global golang 版本
# 4.
asdf reshim golang
```

```shell [版本查看]
go version
```

:::

> 如下: 本文使用了 Golang v1.18

```shell
% asdf plugin add golang
% asdf install golang 1.18
% asdf global golang 1.18
% go version
go version go1.18 darwin/arm64
```

## 编译与执行

Go 的代码需要先编译后才能执行

应用程序编译时通常是将其主包`main`包编译为二进制可执行文件，并将其所在目录名作为二进制文件名 [更多详见](./base//modules-dev/pkg-module-workspace.md#包)

```shell
% go build 文件名.go
% ./二进制文件
```

也可直接通过`go run`编译并执行某文件 ( 编译步骤会在底层自动处理 )

```shell
% cd 文件所处路径
% go run 文件名.go

# 编译并执行应用时 main.go 可简写为 .
% go run main.go
% go run .
```

::: tip

```shell
# 1. 若应用目录结构中主包 main 仅为入口文件 main.go 时
% cd 应用目录
% go run .

# 2. 若应用目录结构中主包 main 写入了一个子目录时，则需要先进入后执行
% cd 应用目录/主包所在目录
% go run .
```

关于项目模块结构设计 [更多详见](./base/modules-dev/pkg-module-workspace.md)

:::

## 语言特点

Go 类似于 C，但是更加的简洁

---

### 强制代码风格

官方使用 gofmt 代码格式化工具统一指定文件的代码风格

```shell
gofmt [flags] [path ...]     # [!code focus]

% gofmt --help
usage: gofmt [flags] [path ...]
  -cpuprofile string
        write cpu profile to this file
  -d    display diffs instead of rewriting files
  -e    report all errors (not just the first 10 on different lines)
  -l    list files whose formatting differs from gofmt's
  -r string
        rewrite rule (e.g., 'a[b:len(a)] -> a[b:]')
  -s    simplify code
  -w    write result to (source) file instead of stdout
```

```shell
% gofmt -s -w .             # 命令执行目录下的 main.go
% gofmt -s -w a.go          # 命令执行目录下的 a.go
% gofmt -s -w b/main.go     # 命令执行目录下的 b 目录中的 main.go
```

::: tip VSCode 配置

1. 下载 Go 插件
2. 配置`.vscode/settings.json`

```json
{
  "[go]": {
    "editor.defaultFormatter": "golang.go",
    "editor.insertSpaces": true,
    "editor.formatOnSave": true
  },
  "go.formatTool": "gofmt",
  "go.formatFlags": ["-s", "-w"]
}
```

:::

---

### 大量的标准包

| 标准包 ( 库 ) | 作用                                                     |
| ------------- | -------------------------------------------------------- |
| bufio         | 带缓冲的 I/O 操作                                        |
| bytes         | 字节操作                                                 |
| container     | 封装 堆、列表、环形列表 的容器                           |
| crypto        | 加密算法                                                 |
| database      | 数据库驱动与接口                                         |
| debug         | 调试                                                     |
| encoding      | 常见 JSON、XML、Base64 等算法                            |
| flag          | 命令行解析                                               |
| fmt           | 格式化输入、输出操作                                     |
| go            | Go 的词法、语法树、类型等，可用于代码信息的提取与修改    |
| html          | HTML 转义与模版操作                                      |
| image         | 图形格式的访问与生生成                                   |
| io            | I/O 操作                                                 |
| math          | 数学操作                                                 |
| net           | 网络请求相关，支持 Socket、HTTP、邮件、RPC、SMTP         |
| os            | 操作系统                                                 |
| path          | 兼容各操作系统的路径处理                                 |
| plugin        | 插件系统，支持将代码编译为插件实现按需加载               |
| reflect       | 语言反射，可动态获取代码中的类型信息、获取与修改变量的值 |
| regexp        | 正则表达式操作                                           |
| runtime       | 运行时                                                   |
| sort          | 排序                                                     |
| strings       | 包含字符串的转换、解析等实用方法                         |
| time          | 时间                                                     |
| text          | 文本模版、Token 语法器                                   |
