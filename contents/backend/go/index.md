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

## 语言特点

---

### 编译与执行

Go 是一种编译型语言，代码需要先编译后才能执行

应用程序编译时通常是将作为主包的`main`包编译为二进制可执行文件，然后再执行该二进制文件

```shell
# 写法一：在命令执行目录下生成同名 main 的二进制文件
% go build [路径/]main.go
# 写法二：在命令执行目录下生成指定名称的二进制文件
% go build -o [自定义文件名] [路径/]main.go

# 执行打包生成的二进制文件
% 二进制文件
```

也可直接通过`go run`来实现编译并执行某文件 ( 编译步骤会在底层自动处理 )

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

---

### 强制代码风格

Go 使用 gofmt 代码格式化工具统一指定文件的代码风格

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

### 支持面向对象

Go 不是纯粹的面向对象语言，但是支持面向对象编程的特性

- 没有传统 OOP 中的构造函数、方法重载、this 等概念
- 利用 [结构体 ( Struct )](./base/oop/struct.md)来实现类似传统 OOP 中类的功能
- 利用 [接口 ( Interface )](./base/oop/interface.md) 实现代码的低耦合性与高通用性
- 有其特有的方式实现传统 OOP 的三要素 [封装、继承、多态](./base/oop/oop-properties.md)

---

### 支持高并发

Go 使用协程 ( Goroutine ) 来实现并发，可同时开启上万协程 [更多详见](./base/concurrent-dev/goroutine.md)

---

### 内置标准包

Go 提供了大量内置包 [更多详见](https://pkg.go.dev/)

| 常用内置包                                   | 作用                                                  |
| -------------------------------------------- | ----------------------------------------------------- |
| bufio                                        | 带缓冲的 I/O 操作                                     |
| bytes                                        | 字节操作                                              |
| container                                    | 封装 堆、列表、环形列表 的容器                        |
| crypto                                       | 加密算法                                              |
| database                                     | 数据库驱动与接口                                      |
| debug                                        | 调试                                                  |
| [encoding](./base/built-in-pkgs/encoding.md) | JSON、XML、Base64 等算法操作                          |
| flag                                         | 命令行解析                                            |
| [fmt](./base/built-in-pkgs/fmt.md)           | 输入、输出、格式化操作                                |
| go                                           | Go 的词法、语法树、类型等，可用于代码信息的提取与修改 |
| html                                         | HTML 转义与模版操作                                   |
| image                                        | 图形格式的访问与生生成                                |
| [io](./base/built-in-pkgs/io.md)             | I/O 操作                                              |
| math                                         | 数学操作                                              |
| net                                          | 网络请求相关，支持 Socket、HTTP、邮件、RPC、SMTP      |
| [os](./base/built-in-pkgs/os.md)             | 系统操作                                              |
| path                                         | 兼容各操作系统的路径处理                              |
| plugin                                       | 插件系统，支持将代码编译为插件实现按需加载            |
| [reflect](./base/built-in-pkgs/reflect.md)   | 反射相关的操作                                        |
| regexp                                       | 正则表达式操作                                        |
| [runtime](./base/built-in-pkgs/runtime.md)   | 运行时                                                |
| sort                                         | 排序                                                  |
| [strings](./base/built-in-pkgs/strings.md)   | 字符串的相关操作                                      |
| [time](./base/built-in-pkgs/time.md)         | 时间相关操作                                          |
| text                                         | 文本模版、Token 语法器                                |
| [testing](./base/built-in-pkgs/testing.md)   | 自动化测试                                            |
