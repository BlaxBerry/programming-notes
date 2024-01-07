# 包管理 ( Go Modules )

Go 利用 [包、模块](./basics/pkg-module.md) 来组织管理代码

并采用 Go Modules 模式来管理包的依赖关系

## 包的存放位置

---

### 本地包

本地包可在任意位置创建的程序 ( 模块 ) 的目录下

只要程序目录下存在`go.mod`文件，目录中的包即可被正常导入使用

要注意同一个目录下的文件必须都属于同一个包否则报错 ( 这些文件是拆分的具体内容 )

```shell
[模块目录]
|- 包
    |- 具体功能文件.go
    |- 具体功能文件.go
    |- ...
|- main.go
|- go.mod
```

---

### 第三方包

第三方依赖包被安装到`GOPATH/pkg/mod/`目录下，并按版本区分存放

:::code-group

```shell [GOPATH 目录结构]
[GOPATH]
|- bin # 存放编译后生成的二进制可执行文件（命令行）
    |- [依赖包执行文件]
	|- [依赖包执行文件]
    |- ...
|- pkg # 存放编译后的中间文件
    |- mode
        |- cache
        |- ...
        |- [第三方发布的仓库名]
            |- [作者名]
                |- [模块名]
                    |- [包名]
                        |- [版本]
```

```shell [查看 GOPATH 位置]
go env GOPATH
```

:::

::: details 例子：asdf 管理的 Golang v1.18

:::code-group

```shell [查看 GOPATH 位置]
% go env GOPATH
/Users/[用户]/.asdf/installs/golang/1.18/packages
```

```shell [GOPATH 目录结构]
[用户名]
|- .asdf
    |- install
        |- golang
            |- 1.18
                |- go
                |- packages # ← GOPATH
                    |- bin
                        |- gopls
                        |- gotests
                        |- go-outline
                        |- ...
                    |- pkg
                        |- sumdb
                        |- mode
                            |- cache
                            |- github.com
                                |- gin-gonic
                                    |- gin@v1.7.2           # github.com/gin-gonic/gin@v1.7.2
                                    |- gin@v1.9.1           # github.com/gin-gonic/gin@v1.9.2
                                |- go-playground
                                    |- validator
                                        |- v10@v10.4.1      # github.com/go-playground/validator/v10@v10.4.1
                                        |- v10@v10.15.4     # github.com/go-playground/validatorv10@v10.15.4
                            |- gitlab.com
                                |- ...
                            |- golang.org
                                |- x
                                    |- tools
                                        |- gopls@v0.13.2    # golang.org/x/tools/gopls@v0.13.2
                                    |- ...
```

:::

## 包的版本记录

Go 通过`go.mod`、`go.sum`文件来记录不同模块 ( 某个程序 ) 中依赖的包

而不需要虚拟环境来隔离不同某个程序中的依赖关系

---

### go.mod 文件

`go.mod`文件用于记录当前模块 ( 某个程序 ) 所需依赖包的信息

模块 ( 某个程序 ) 中必须要有一个该文件，通过[`go mod init [模块名]`](#go-mod-init)创建

:::code-group

```shell [目录结构]
[模块目录]
|- ...
|- go.mod
```

```go [go.mod]
module 模块名

go GO 的版本

require (
    依赖的包
    依赖的包
)

```

:::

一般对外公开的第三方模块命名如下：

```go
module [仓库名]/[模块名]/[版本]

// 比如：
// module github.com/blaxberry/my-utils/v1
// module github.com/blaxberry/my-tools/v2
```

---

### go.sum 文件

`go.sum`文件用于记录所有依赖包的校验信息

主要用于安全校验以防下载的依赖被恶意篡改

:::code-group

```shell [模块目录]
[模块]
|- ...
|- go.mod
|- go.sum
```

```go [go.sum]
[依赖包1] [版本] [HASH值]
[依赖包1] [版本]/go.mod [HASH值]
[依赖包2] [版本] [HASH值]
[依赖包2] [版本]/go.mod [HASH值]

// ...
```

:::

## 常用命令

Go Modules 模式通过执行`go mod [命令]`来管理包

---

### go mod init

初始化一个模块

会在命令执行目录下创建一个`go.mod`文件用于记录当前模块的信息

```shell
go mod init [模块名]
```

---

### go mod tidy

更新`go.mod`文件中的依赖，删除未使用的依赖，并更新`go.sum`文件

可在手动添加删除依赖时确保`go.mod`文件中记录的依赖包列表与实际代码的依赖关系一致

```shell
go mod tidy
```

---

### go mod download

预先下载`go.mod`文件中记录的所有依赖，以确保构建过程中不需要进行网络下载

会强制下载所有依赖的最新的版本，但不更新`go.mod`文件

可以用于在 CI/CD 环境中预先下载依赖项，提高构建性能

```shell
go mod download
```

---

### go get

下载第三方依赖包

- 依赖包的源码安装到`GOPATH/pkg/mod/*/**/[版本]/`
- 依赖包的二进制执行文件(命令行工具)安装到`GOPATH/bin/`

::: code-group

```shell [命令]
go get [依赖包名/地址]                #　仅下载源码
go get -u [依赖包名/地址]             #　下载源码 + 二进制可执行文件

go get [依赖包名]@[分支名/提交记录ID]   # 下载指定分支/指定 commit 记录
```

```shell [安装位置]
[GOPATH]
|- bin
	|- [依赖包执行文件]
	|- [依赖包执行文件]
|- pkg
	|- sumdb    # 安装依赖包后自动生成
	|- mod
		|- cache
		|- [依赖包]
			|-[版本]
			|-[版本]
        |- [依赖包]
			|-[版本]
			|-[版本]
```

:::

::: details 例子：下载 Gin、Validator

```shell
# gin
# 需要其源码，且命令行会使用其二进制文件
% go get -u github.com/gin-gonic/gin

# validator v10
# 只需要源码，只在代码里使用而已
% go get github.com/go-playground/validator/v10
```

:::

---

### go install

```shell
go install [依赖包名]
```
