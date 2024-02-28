---
prev: false
next: false
---

# Makefile 基础

![](/static/skill-images/makefile.webp)

https://makefiletutorial.com/

Makefile 可理解为一个配置文件，一般位于项目的根目录

通过`make`命令执行该配置文件中的目标脚本来实现工程的自动化

## 文件位置

::: code-group

```shell [所处位置]
[项目根目录]
|- ...
|- Makefile
```

```shell [查看版本]
make --version
```

:::

> 如下：本文使用了 Makefile 3.81

```shell
% make --version
GNU Make 3.81
Copyright (C) 2006  Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

This program built for i386-apple-darwin11.3.0
```

## 基本写法

### 目标

- 文件内可以有一个或多个目标 ( target )
- 目标与具体命令用 Tab 制表符缩进换行，否则报错

::: code-group

```makefile [单一目标]
target:
    要执行的脚本命令
    要执行的脚本命令
```

```makefile [多个目标]
[目标名]:
    要执行的脚本命令
    要执行的脚本命令

[目标名]:
    要执行的脚本命令
    要执行的脚本命令
```

:::

文件中有多个目标时可在执行`make`命令指定目标名，否则`make`命令默认执行第一个目标

```shell
# 文件仅一个目标或默认执行第一个目标
make

# 执行指定的目标
make [目标名]
```

<details class="details custom-block">
  <summary>例子：验证执行项目目录下只有一个目标的 Makefile 文件</summary>

> 如下：在一个 Go 项目中执行`make`命令来启动项目

::: code-group

```shell [目录结构]
demo
|- cmd
    |- demo
        |- main.go
|- ...
|- go.mod
|- Makefile
```

```makefile [MakeFile]
target:
	go run ./cmd/demo/main.go
```

:::

```shell
% cd demo           # [!code focus]
% make              # [!code focus]
go run ./cmd/demo/main.go
# ...
```

</details>

<details class="details custom-block">
  <summary>例子：验证执行项目目录下包含多个目标的 Makefile 文件</summary>

> 如下：在一个 Go 项目中执行`make`命令来启动项目与代码检查

::: code-group

```shell [目录结构]
demo/
|- cmd/
    |- demo/
        |- main.go
|- ...
|- go.mod
|- Makefile
```

```makefile [MakeFile]
start:
	go run ./cmd/demo/main.go

test:
    go test ./...
```

:::

```shell
% cd demo
% make start
% make test
```

</details>

---

### 变量

文本字符串可省略引号

```makefile
变量 = 值               # [!code focus]
变量 := 值              # [!code focus]
变量 := $(其他变量) 值   # [!code focus]


[目标名]:
    要执行的脚本命令
    要执行的脚本命令

[目标名]:
    要执行的脚本命令
    要执行的脚本命令
```

::: details 例子：在一个 Go 项目中`Makefile`中设定基于变量目标命令

::: code-group

```shell [目录结构]
my-app/
|- cmd/
    |- my-app/
        |- main.go
|- docs/
|- ...
|- go.mod
|- Makefile
```

```makefile [Makefile]
APP_NAME = my-app
APP_CMD_DIR_PATH = ./cmd/my-app

GOPATH := $(shell go env GOPATH)


# 启动本地开发服务器
dev:
	go run ${APP_CMD_DIR_PATH}/main.go

# 项目打包
build:
	go build -o ${APP_NAME} ${APP_CMD_DIR_PATH}/main.go

# 代码格式化
format:
	for a in `find ./ -name "*.go"`; do go fmt $${a}; done

# 单元测试
test:
	go test ./internal/...

# 生成 Swagger API 文档
swag:
 	cd ${APP_CMD_DIR_PATH} && ${GOPATH}/bin/swag init -o ../../docs
```

:::
