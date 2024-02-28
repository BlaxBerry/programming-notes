---
prev: false
next: false
---

# Gin 相关

![](/static/skill-images/gin.webp)

Gin 是个基于 Go 的轻量级 Web 框架

[更多详见](https://github.com/gin-gonic/gin)

## 项目构建

### 下载安装

::: code-group

```shell [项目初始化 & 包下载]
% cd 项目目录
# 1. 项目模块初始化
% go mod init 项目名
# 2. 下载 Gin 的包
% go get -u github.com/gin-gonic/gin    # [!code focus]
```

:::

---

### 项目创建

::: code-group

```go [基础服务器]
package main

import "github.com/gin-gonic/gin"   // [!code focus]

func main() {
	// 创建 Gin 服务引擎              // [!code focus]
	Gin引擎 := gin.Default()         // [!code focus]
    // 也可通创建不使用内置中间件 Logger()、Recovery() 的 Gin 服务引擎
    // Gin引擎 := gin.New()

    // 定义路由规则、路由处理函数        // [!code focus]
    // ...                          // [!code focus]

	// 监听服务器端口 ( 默认 8080 )    // [!code focus]
	err := Gin引擎.Run(":8000")      // [!code focus]
    if err != nil {
        // ...
    }
}
```

:::

---

### 项目目录

[更多详见](https://github.com/golang-standards/project-layout/blob/master/README_zh.md)

::: code-group

```shell [推荐目录结构]
[项目目录]                                                                 #  [!code focus]
|- cmd/                     # 项目的主应用目录                              // [!code focus]
    |- [当前项目名]/                                                       #  [!code focus]
        |- main.go          # 项目的入口文件                                // [!code focus]
|- internal/                # 项目中非公开的包的目录 ( 无法在项目外部直接导入 )  // [!code focus]
    |- app/                                                              #  [!code focus]
        |- [当前项目名]/                                                   #  [!code focus]
            |- router/      # HTTP 路由规则                                #  [!code focus]
            |- handlers/    # HTTP 路由处理                                #  [!code focus]
            |- models/      # 数据模型                                     #  [!code focus]
            |- types/       # HTTP 请求与响应参数结构体                      #  [!code focus]
    |- pkg/                 # 应用中公共的功能包的目录                       #  [!code focus]
        |- [包名]                                                         #  [!code focus]
        |- [包名]                                                         #  [!code focus]
|- pkg/                     # 项目中对外公开的包的目录 ( 非必需 )
    |- [包名]
    |- [包名]
|- init/                    # 初始化文件目录 ( 非必需 )
|- docs/                    # 项目文档目录 ( 非必需 )
|- scripts/                 # 构建、安装、分析等操作的脚本目录 ( 非必需 )
|- configs/                 # 项目配置文件目录                              #  [!code focus]
|- Makefile                                                              #  [!code focus]
|- go.mod                                                                #  [!code focus]
|- go.sum                                                                # [!code focus]
```

:::

---

### 项目启动

- 项目根目录下`go run`命令执行主包文件启动开发服务器

```shell
% go run ./cmd/[项目名]/main.go
```

- 项目根目录下`go build`命令打包项目后执行生成的二进制文件

```shell
% go build -o 项目名 ./cmd/[项目名]/main.go
% ./项目名同名二进制文件
```

## 框架特点

基于 Go 内置标准库`net/http`的轻量级框架

特别适用于构建高性能的 Web 服务和 RESTful API 服务器
