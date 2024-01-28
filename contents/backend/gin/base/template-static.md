# Gin 模版、静态资源

## 模版

### 加载模版

通过 Gin 引擎上的两个方法给服务器加载 HTML 模版：

- `GinEngine.LoadHTMLFiles()`
- `GinEngine.LoadHTMLGlob()`

```go
Gin引擎 := gin.Default()

// 写法一：加载指定的模版									// [!code focus]
Gin引擎.LoadHTMLFiles("路径/模版.html", "路径/模版.html")	// [!code focus]

// 写法二：利用通配符加载指定目录下所有模版 ( 推荐 )			// [!code focus]
Gin引擎.LoadHTMLGlob("路径/*")					  		  // [!code focus]
```

::: details 例子：

::: code-group

```shell [目录结构]
demo
|- cmd				# [!code focus]
	|- demo			# [!code focus]
		|- main.go	# [!code focus]
|- templates		# [!code focus]
	|- temp1.html	# [!code focus]
|- go.mod
|- go.sum
```

```go [路由规则]
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("template/*")					// [!code focus]

	r.GET("/", func(context *gin.Context) {	   		// [!code focus]
		ctx.HTML(http.StatusOK, "temp1.html", nil)	// [!code focus]
	})												// [!code focus]

	ginServer.Run(":8080")
}
```

:::

### 渲染模版数据

1. 利用路由处理函数参数上下文的`HTML()`方法的第三个参数传入要渲染的数据

```go
func 路由处理函数(context *gin.Context) {
	context.HTML(状态码, "模版.html", 模版数据)
}
```

2. 模版中通过模版语法获取传入的数据

```html
<!-- 渲染基本类型数据 -->
<标签>{{.}}</标签>

<!-- 渲染结构体类型数据 -->
<标签>{{.属性}}</标签>

<!-- 遍历数组、切片类型数据 -->
<标签>
    {{range $i,$v := .}}
       <标签>{{$i}}</标签>
       <标签>{{$v}}</标签>
    {{end}}

    {{range $v := .}}
       <标签>{{$v.属性}}</标签>
    {{end}}
</标签>
```

::: details 例子：模版渲染基本类型数据与复类型数据

::: code-group

```shell [目录结构]
demo
|- cmd               # [!code focus]
	|- demo          # [!code focus]
		|- main.go   # [!code focus]
|- templates		 # [!code focus]
	|- temp1.html	 # [!code focus]
|- go.mod
|- go.sum
```

```html{0} [模版文件]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
    <p>Name: {{.Name}}</p>                  // [!code focus]
    <p>Age: {{.Age}}</p>                    // [!code focus]
    <p>
      <span>SKills</span>
      <ul>                                  // [!code focus]
        {{range $i,$v :=.Skills}}           // [!code focus]
        <li>{{$i}} {{$v}}</li>              // [!code focus]
        {{end}}                             // [!code focus]
      </ul>                                 // [!code focus]
    </p>
    <p>
      <span>Score</span>
      <ul>
        <li>English: {{.Score.english}}</li>    // [!code focus]
        <li>Math: {{.Score.math}}</li>          // [!code focus]
      </ul>
    </p>
</body>

</html>
```

```go [路由规则]
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("template/*")					    // [!code focus]

	r.GET("/", func(context *gin.Context) {	   		    // [!code focus]
		data := struct {                                        // [!code focus]
			Name   string                                       // [!code focus]
			Age    int                                          // [!code focus]
			Skills []string                                     // [!code focus]
            Score  map[string]int                               // [!code focus]
		}{                                                      // [!code focus]
			Name:   "Andy",                                     // [!code focus]
			Age:    28,                                         // [!code focus]
			Skills: []string{"JavaScript", "Go", "Python"},     // [!code focus]
			Score:  map[string]int{"english": 95, "math": 40},  // [!code focus]
		}                                                       // [!code focus]

		ctx.HTML(http.StatusOK, "temp1.html", data)     // [!code focus]
	})												    // [!code focus]

	ginServer.Run(":8080")
}
```

:::

---

### 模版添加静态资源

```go
Gin引擎 := gin.Default()

// 加载模版									// [!code focus]
Gin引擎.LoadHTMLFiles("路径/模版.html", "路径/模版.html")
Gin引擎.LoadHTMLGlob("路径/*")

// 加载静态资源                             // [!code focus]
Gin引擎.Static("/static","静态资源路径")    // [!code focus]
```

::: details 例子：

::: code-group

```shell [目录结构]
demo
|- cmd
	|- demo
		|- main.go
|- static            # [!code focus]
    |- css           # [!code focus]
        |- style.css # [!code focus]
|- templates		 # [!code focus]
	|- temp1.html	 # [!code focus]
|- go.mod
|- go.sum
```

```html{0} [模版文件]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/static/css/temp1.css" /> // [!code focus]
    <title>HTML 文档名</title>
  </head>

  <body>
    ...
  </body>
</html>
```

```go [路由规则]
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

    // 加载模版
	r.LoadHTMLGlob("template/*")					      // [!code focus]

    // 模版中通过 /static 访问位于 static 目录下的静态资源文件   // [!code focus]
    r.Static("/static","static")                          // [!code focus]

    // 设置响应模版的路径
	r.GET("/", func(context *gin.Context) {
		ctx.HTML(http.StatusOK, "temp1.html", nil)
	})

	ginServer.Run(":8080")
}
```

:::

## 静态资源

Gin 中的相对目录相对的项目的根目录。而不是代码所在文件的同级目录

一般将静态资源目录命名为`static`

---

### 加载静态资源

写法一与写法二共存时不能加载相同的静态资源，否则报错路径已存在

::: code-group

```go [路由规则]
Gin引擎 := gin.Default()

// 写法一：将制定目录所有内容全映射为静态资源					// [!code focus]
r.Static("/资源访问路径", "./static/[子目录路径]")			// [!code focus]

// 写法二：仅配置单一静态文件								  				  // [!code focus]
Gin引擎.StaticFile("资源访问路径", "./static/[子目录路径]/静态资源文件.后缀")	// [!code focus]
```

```shell [目录结构]
项目目录
|- cmd
	|- 项目
		|- main.go
|- static			# [!code focus]
	|- ...			# [!code focus]
|- ...
|- go.mod
|- go.sum
```

:::

<details class="details custom-block">
  <summary>例子：验证响应静态资源</summary>

::: code-group

```go [路由规则]
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.StaticFile("imgs/01.svg", "./static/imgs/01.svg")	// [!code focus]

	// 或写为							 // [!code focus]
	r.Static("/imgs", "./static/imgs")	// [!code focus]

	r.Run()
}
```

```shell [目录结构]
demo
|- cmd
	|- demo
		|- main.go
|- static				# [!code focus]
	|- imgs				# [!code focus]
		|- favicon.svg	# [!code focus]
		|- 01.svg		# [!code focus]
|- ...
|- go.mod
|- go.sum
```

:::

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl http://localhost:8080/imgs/favicon.svg
# 省略 ...

% curl http://localhost:8080/imgs/1.svg
# 省略 ...
```

</details>
