# GO 包、模块、工作区

Go 利用包、模块来组织管理代码

并采用 [Go Modules 模式](./go-modules.md) 来管理包的依赖关系

## 包

> pkg / package

Go 的包即组织好可进行复用的逻辑代码 ( 某些业务功能 ) 且包与库的概念可以互换

- 建议包名与文件名相同
- 包的逻辑可全写在一个文件，也可将成员拆分放入同一个目录下的多个文件，各个拆分文件的`package`指向的所属包名必须相同 ( 即同一个目录下的文件必须都属于同一个包否则报错 )
- 应用程序必须要有一个主包`main`包 ( 可写入一个`main.go`文件也可拆分功能后放入一个目录比如`main`目录 ) 且`main`包必须包含一个入口函数`main`函数，否则应用无法执行
- 包文件必须要有`package`定义当前包名
- 包文件内通过`import`导入当前包中所依赖的其他包
- 包中成员名首字母大写的对外公开可被其他包引用，小写的为当前包的私有成员

```go
package 包名

import (
    "依赖包名"
    "模块名/包名"
    别名 "依赖包名"
)

// 成员
// 成员
```

::: details 例子：`main`包内导入并使用内置包`fmt`与`math/rand`打印一个随机整数

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println(rand.Int())
}


// 5577006791947779410
```

:::

---

## 模块

> module

Go 的模块是多个包的集合 ( 应用目录 )

- 模块目录下必须有一个[`go.mod`](./go-modules.md#go-mod-文件)文件记录当前模块的信息，否则报错
- 模块需要一个主包`main`（ 可使用一个`main.go`文件或定义一个 main 包目录 ）
- 模块目录中通常是一个子目录对应一个包 ( 建议目录名为包名，例如`x/y/z/ooo.go`应属于`z`包而不能定义为`x`或`y`包 )

:::code-group

```shell [模块目录]
[模块目录]
|- 包
    |- 具体功能文件.go
    |- 具体功能文件.go
    |- ...
|- 子目录
    |- 包目录
    |- 包目录
    |- ...
|- 主包
|- go.mod
```

```go [go.mod]
module 模块名

go 当前 Go 的版本

require (
    使用的第三方包
    使用的第三方包
)
```

:::

::: tip

模块必须要有一个主包`package main`

- 可写入根目录下的`main.go`文件

```shell
[模块目录]
|- ...
|- main.go
|- go.mod
```

- 也可定义一个`main`包目录，但目录下各个文件必须属于主包`package main`

```shell
[模块目录]
|- ...
|- main
    |- [具体功能文件].go
    |- [具体功能文件].go
|- go.mod
```

:::

<details class="details custom-block">
  <summary>例子：验证模块中<code>main</code>包导入并使用其他包导出的公有成员</summary>

- 模块`demo`中包含`main`、`basics`、`a`、`b`四个包，其中`a`包、`b`包位于`basics`目录下
- `a`包、`b`包的成员又拆分为具体的文件
- 主包`main`包的可执行文件`main.go`中导入其他包并使用其中的公有成员

:::code-group

```shell [目录]
demo
|- basics
    |- xxx.go
    |- a
        |- a_1.go
    |- b
        |- b_1.go
|- main.go
|- go.mod
```

```go [main.go]
package main

import (
	"demo/basics"                // 从此路径导入 basics 包
	"demo/basics/a"              // 从此路径导入 a 包
    basicsB "demo/basics/b"      // 从此路径导入 b 包并使用别名 basicsB 替换 b
	"fmt"
)

func main() {
	fmt.Println(basics.Xxx)     // 调用 basics 包中公有成员
	fmt.Println(a.A_1)          // 调用 a 包中公有成员
    fmt.Println(basicsB.B_1)    // 调用 b 包中公有成员
}


// basics.Xxx
// a.A_1
// b.b_1
```

```go [basics/xxx.go]
package basics

var Xxx = "basics.Xxx"
```

```go [basics/a/a_1.go]
package a

var A_1 = "a.A_1"
```

```go [basics/b/b_1.go]
package a

var B_1 = "b.B_1"
```

```go [go.mod]
module demo

go 1.18
```

:::

</details>

## 工作区

> workspaces ( Golang v1.18 新增功能 )

( 多模块 ) 工作区用于本地开发时一个目录下包含多个应用模块的场景

- 多模块工作区目录下必须有一个`go.work`文件，否则各个模块的引用会报错
- 多模块工作区下的各个模块目录中必须有一个[`go.mod`](./go-modules.md#go-mod-文件)文件，否则无法使用该模块
- `go.work`文件仅在本地开发时使用，不需要提交

:::code-group

```shell [多模块工作区目录]
[多模块工作区]
|- [模块]
|- [模块]
|- ...
|- go.work
```

```go [go.work]
go 当前 Go 的版本

use (
	./模块名
	./模块名
)
```

:::

::: details 例子：验证初始化多模块共存的工作区

`demo`目录下有两个模块`aa`、`bb`

```shell
demo
|- aa
    |- main.go
    |- go.mod
|- bb
    |- main.go
    |- go.mod
```

将`demo`目录初始化为多模块工作区

```shell
% cd demo
% go work init ./aa ./bb
```

命令执行后`demo`目录下生成一个`go.work`文件

```go
go 1.18

use (
	./aa
	./bb
)
```

:::
