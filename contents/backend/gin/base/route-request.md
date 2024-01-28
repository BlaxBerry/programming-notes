# Gin 路由、请求

## 基本路由

路由的处理函数 ( Handler ) 也是个[中间件](./middleware.md)

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", 路由处理函数)            	// [!code focus]
Gin引擎.请求方式("/访问路径", 路由处理函数, 路由处理函数)  // [!code focus]
```

## 路由分组

可利用 Gin 引擎上的`Group()`方法将多个相关路由划分为一组统一管理

路由分组的访问路径开头部分相同

```go
Gin引擎 := gin.Default()

路由组 := Gin引擎.Group("/访问路径")    	  // [!code focus]
{										   // [!code focus]
	路由组.请求方法("/访问路径", 路由处理函数)   // [!code focus]
	路由组.请求方法("/访问路径", 路由处理函数)   // [!code focus]
	// ...  							   // [!code focus]
}										   // [!code focus]
```

分组也可嵌套子分组

```go
Gin引擎 := gin.Default()

父路由组 := Gin引擎.Group("/访问路径")    	  // [!code focus]
子路由组 := 父路由组.Group("/访问路径")    	   // [!code focus]
{										   // [!code focus]
	子路由组.请求方法("/访问路径", 路由处理函数) // [!code focus]
	子路由组.请求方法("/访问路径", 路由处理函数) // [!code focus]
	// ...  							   // [!code focus]
}										   // [!code focus]
```

::: details 例子：定义`api`路由组与其两个子路由组`v1`、`v2`

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	api := r.Group("/v1")						// [!code focus]

	v1 := api.Group("/v1")						// [!code focus]
	{											// [!code focus]
		// /api/v1/a
		v1.GET("/a", func(ctx *gin.Context) {	// [!code focus]
			ctx.String(200, "v1 aaa")			// [!code focus]
		})										// [!code focus]
		// /api/v1/b
		v1.GET("/b", func(ctx *gin.Context) {	// [!code focus]
			ctx.String(200, "v1 bbb")			// [!code focus]
		})										// [!code focus]
	}											// [!code focus]

	v2 := api.Group("/v2")						// [!code focus]
	{											// [!code focus]
		// /api/v2/a
		v2.GET("/a", func(ctx *gin.Context) {	// [!code focus]
			ctx.String(200, "v2 aaa")			// [!code focus]
		})										// [!code focus]
		// /api/v2/b
		v2.GET("/b", func(ctx *gin.Context) {	// [!code focus]
			ctx.String(200, "v2 bbb")			// [!code focus]
		})										// [!code focus]
	}											// [!code focus]

	r.Run(":8080")
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl http://localhost:8080/api/v1/a
v1 aaa

% curl http://localhost:8080/api/v1/b
v1 bbb

% curl http://localhost:8080/api/v2/a
v2 aaa

% curl http://localhost:8080/api/v2/b
v2 bbb
```

:::

## 请求方式

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	Gin引擎 := gin.Default()

	// GET
	Gin引擎.GET("/访问路径", 路由处理函数)	    // [!code focus]
	// POST
	Gin引擎.POST("/访问路径", 路由处理函数)     // [!code focus]
	// PUT
	Gin引擎.PUT("/访问路径", 路由处理函数)	    // [!code focus]
	// PATCH
	Gin引擎.PATCH("/访问路径", 路由处理函数)   	// [!code focus]
	// DELETE
	Gin引擎.DELETE("/访问路径", 路由处理函数)	// [!code focus]
	// HEAD
	Gin引擎.HEAD("/访问路径", 路由处理函数)		// [!code focus]

	Gin引擎.Run()
}
```

## 请求参数

### 路径参数

> Path Parameters

- 参数的传递通过请求路径上的占位符
  - `:占位符`：请求路径上可有多个，若路径中携带的个数与路由规则不一致则报错 404
  - `*占位符`：用于模糊匹配，请求路径上只能有一个且必须只能放在路径最后
- 参数值的获取通过路由处理函数的参数 ( 上下文 ) 上的方法

| 方法名    | 说明             |
| --------- | ---------------- |
| `Param()` | 获取参数的对应值 |

```go
Gin引擎 := gin.Default()

Gin引擎.GET("/访问路径/:占位符/:占位符", func(上下文 *gin.Context) {	// [!code focus]
	参数值 := 上下文.Param("占位符")						   // [!code focus]
	参数值 := 上下文.Param("占位符")						   // [!code focus]
	// ...													// [!code focus]
})															// [!code focus]

Gin引擎.GET("/访问路径/*占位符", func(上下文 *gin.Context) {	// [!code focus]
	参数值 := 上下文.Param("占位符")						   // [!code focus]
	// ...													// [!code focus]
})															// [!code focus]
```

::: details 例子：验证不同路径参数的获取

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/xxx/:a/:b", func(ctx *gin.Context) {	// [!code focus]
		a := ctx.Param("a")						// [!code focus]
		b := ctx.Param("b")						// [!code focus]
		ctx.JSON(200, gin.H{					// [!code focus]
			"a":a,								// [!code focus]
			"b":b,								// [!code focus]
		})										// [!code focus]
	})											// [!code focus]

	r.GET("/yyy/*c", func(ctx *gin.Context) {	// [!code focus]
		c := ctx.Param("c")						// [!code focus]
		ctx.JSON(200, gin.H{					// [!code focus]
			"c":c,	 							// [!code focus]
		})										// [!code focus]
	})											// [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 发送请求验证

```shell
% curl http://localhost:8080/xxx
404 page not found

% curl http://localhost:8080/xxx/111/222
{"a":"111","b":"222"}

% curl http://localhost:8080/yyy/
{"c":"/"}

% curl http://localhost:8080/yyy/111
{"c":"/111"}

% curl http://localhost:8080/yyy/111/
{"c":"/111/"}

% curl http://localhost:8080/yyy/111/222
{"c":"/111/222"}

% curl http://localhost:8080/yyy/111/222/
{"c":"/111/222/"}
```

:::

---

### 查询参数

> Query Parameters

- 参数的传递通过请求路径上的`?参数名=值&参数名=值`的形式
- 参数值的获取通过路由处理函数的参数 ( 上下文 ) 上的方法

| 方法名            | 说明                                                 |
| ----------------- | ---------------------------------------------------- |
| `Query()`         | 获取参数的对应值，若没有则返回空字符串               |
| `DefaultQuery()`  | 获取参数的对应值，若没有则返回字符串格式的默认值     |
| `QueryArray()`    | 以数组形式获取以逗号间隔的参数值，若没有则返回`null` |
| `GetQuery()`      | 返回参数的对应值与是否获取成功的布尔值               |
| `GetQueryArray()` | 返回参数的数组类型对应值与是否获取成功的布尔值       |

```go
Gin引擎 := gin.Default()

Gin引擎.GET("/访问路径", func(上下文 *gin.Context) {	       // [!code focus]
	// /访问路径?参数=值
	参数值 := 上下文.Query("参数名")						   // [!code focus]
	参数值 := 上下文.DefaultQuery("参数名", "默认值")	     	// [!code focus]
	参数值, ok := 上下文.GetQuery("参数名")					   // [!code focus]

	// /访问路径?参数=值,值,值
	参数值 := 上下文.QueryArray("参数名")	     			   // [!code focus]
	参数值, ok := 上下文.GetQueryArray("参数名")			   // [!code focus]

	// ...													// [!code focus]
})															// [!code focus]
```

::: details 例子：验证不同的查询字符串参数的获取

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/xxx", func(ctx *gin.Context) {	 // [!code focus]
		a := ctx.Query("a")					 // [!code focus]
		b := ctx.DefaultQuery("b", "默认值")  // [!code focus]
		c := ctx.QueryArray("c") 			 // [!code focus]

		ctx.JSON(200, gin.H{				 // [!code focus]
			"a": a,							 // [!code focus]
			"b": b,							 // [!code focus]
			"c": c,							 // [!code focus]
		})									 // [!code focus]
	})										 // [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 发送请求

```shell
% curl http://localhost:8080/xxx
{"a":"","b":"默认值","c":null}

% curl "http://localhost:8080/xxx?a=111&b=222&c=1,2,3"
{"a":"111","b":"222","c":["1,2,3"]}
```

:::

---

### 表单参数

> Form Data Parameters

- 参数的传递通过请求体
- 参数值的获取通过路由处理函数的参数 ( 上下文 ) 上的方法

::: tip 四种传输格式格式

- application/json
- application/x-www-form-urlencoded
- application/xml
- multipart/form-data

:::

| 方法名               | 说明                                                 |
| -------------------- | ---------------------------------------------------- |
| `PostForm()`         | 获取参数的对应值，若没有则返回空字符串               |
| `DefaultPostForm()`  | 获取参数的对应值，若没有则返回字符串格式的默认值     |
| `PostFormArray()`    | 以数组形式获取以逗号间隔的参数值，若没有则返回`null` |
| `GetPostForm()`      | 返回参数的对应值与是否获取成功的布尔值               |
| `GetPostFormArray()` | 返回参数的数组类型对应值与是否获取成功的布尔值       |

```go
Gin引擎 := gin.Default()

Gin引擎.POST("/访问路径", func(上下文 *gin.Context) {	 // [!code focus]
	参数值 := 上下文.PostForm("键")						// [!code focus]
	参数值 := 上下文.DefaultPostForm("键","默认值")		 // [!code focus]
	参数值 := 上下文.PostFormArray("键")	     		// [!code focus]
	参数值, ok := 上下文.GetPostForm("参数名")			 // [!code focus]
	参数值, ok := 上下文.GetPostFormArray("参数名")		 // [!code focus]

	// ...											  // [!code focus]
})													  // [!code focus]
```

::: details 例子：验证不同的请求体参数的获取

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.POST("/xxx", func(ctx *gin.Context) {	// [!code focus]
		a := ctx.PostForm("a")				// [!code focus]
		b := ctx.DefaultPostForm("b")		// [!code focus]
		c := ctx.PostFormArray("c")			// [!code focus]

		ctx.JSON(200, gin.H{				// [!code focus]
			"a": a,							// [!code focus]
			"b": b,							// [!code focus]
			"c": c,							// [!code focus]
		})									// [!code focus]
	})										// [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 发送请求验证

```shell
% curl -X POST http://localhost:8080/xxx
{"a":"","b":"默认值","c":null}

% curl -X POST http://localhost:8080/xxx \
	   -d "a=111&b=222&c=1,2,3"
{"a":"111","b":"222","c":["1,2,3"]}
```

:::

## 响应数据

通过路由处理函数的参数 ( 上下文 ) 上的方法响应指定内容

---

### 字符串

通过路由处理函数的参数 ( 上下文 ) 上的`String()`方法响应 JSON 格式数据

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	上下文.String(状态码, "字符串")						   // [!code focus]
})    	  												// [!code focus]
```

---

### JSON

通过路由处理函数的参数 ( 上下文 ) 上的`JSON()`方法响应 JSON 格式数据

响应为 JSON 格式的数据可为：

- 结构体类型的数据
- 映射类型数据 ( 可使用内置`gin.H`类型 )

:::code-group

```go [结构体类型]
Gin引擎 := gin.Default()

type 结构体类型 struct {		// [!code focus]
	公开字段 类型 `json:"值"`	// [!code focus]
	私有字段 类型 `json:"-"`	// 不显示 // [!code focus]
}							  // [!code focus]

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	上下文.JSON(状态码, 结构体类型{						    // [!code focus]
		公开字段: 值,									  // [!code focus]
		私有字段: 值,									  // [!code focus]
	})										 			// [!code focus]
})    	  												// [!code focus]
```

```go [映射类型]
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	上下文.JSON(状态码, gin.H{							  // [!code focus]
		"键": 值,			  							// [!code focus]
		"键": 值,					  					// [!code focus]
	})										 			// [!code focus]

	// 相当于
	上下文.JSON(状态码, map[string]any{
		"键": 值,
		"键": 值,
	})
})    	  												// [!code focus]
```

:::
::: details 例子：验证将结构体类型的数据响应为 JSON 数据

- 将一个结构体类型数据响应为 JSON 格式数据
- 其中`password`字段为非公开 ( 不包含在返回数据中，仅限 Go 的逻辑内部使用 )

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/b", func(ctx *gin.Context) {	// [!code focus]
		ctx.JSON(http.StatusOK, struct {    // [!code focus]
			Name     string `json:"name"`	// [!code focus]
			Age      int    `json:"age"`	// [!code focus]
			password string `json:"-"`		// [!code focus]
		}{									// [!code focus]
			Name:     "Andy",				// [!code focus]
			Age:      28,					// [!code focus]
			password: "xxxxx",				// [!code focus]
		})									// [!code focus]
	})										// [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl http://localhost:8080/b
{"name":"Andy","age":28}
```

:::
::: details 例子：验证将映射类型的数据响应为 JSON 数据

- `/a`利用 Gin 内置的`gin.H`类型创建一个映射类型数据并响应为 JSON 格式数据
- `/b`创建一个自定义映射类型数据并响应为 JSON 格式数据

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 使用 gin.H 类型
	r.GET("/a", func(ctx *gin.Context) {	// [!code focus]
		ctx.JSON(http.StatusOK, gin.H{		// [!code focus]
			"name": "AA",					// [!code focus]
			"age": 	11,						// [!code focus]
		})									// [!code focus]
	})										// [!code focus]
	// 使用自定义映射类型
	r.GET("/b", func(ctx *gin.Context) {			// [!code focus]
		ctx.JSON(http.StatusOK, map[string]any{		// [!code focus]
			"name": "BB",							// [!code focus]
			"age":  22,								// [!code focus]
		})											// [!code focus]
	})

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl http://localhost:8080/a
{"age":11,"name":"AA"}

 % curl http://localhost:8080/b
{"age":22,"name":"BB"}
```

:::

---

### HTML

1. Gin 服务引擎加载模版
2. 通过路由处理函数的参数 ( 上下文 ) 上的`HTML()`方法响应 XML 格式数据

::: code-group

```go [路由规则]
Gin引擎 := gin.Default()

Gin引擎.LoadHTMLGlob("template/*")						// [!code focus]

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	上下文.HTML(状态码, "模版.html", [模版数据])			// [!code focus]
})    	  												// [!code focus]
```

```shell [目录结构]
项目
|- cmd
	|- 项目
		|- main.go
|- templates		# [!code focus]
	|- 模版.html	# [!code focus]
|- ...
|- go.mod
|- go.sum
```

:::

::: details 例子：响应渲染一个无插入数据的 HTML 模版

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

	r.Run()
}
```

:::

::: details 例子：响应渲染一个有插入数据的 HTML 模版

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

	r.Run()
}
```

:::

---

### XML

通过路由处理函数的参数 ( 上下文 ) 上的`JSON()`方法响应 XML 格式数据

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	上下文.XML(状态码, gin.H{							  // [!code focus]
		"键": 值,			  							// [!code focus]
		"键": 值,					  					// [!code focus]
	})										 			// [!code focus]
})    	  												// [!code focus]
```

---

### YAML

通过路由处理函数的参数 ( 上下文 ) 上的`JSON()`方法响应 YAML 格式数据

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	上下文.YAML(状态码, gin.H{							  // [!code focus]
		"键": 值,			  							// [!code focus]
		"键": 值,					  					// [!code focus]
	})										 			// [!code focus]
})    	  												// [!code focus]
```

---

### 重定向

通过路由处理函数的参数 ( 上下文 ) 上的`Redirect()`方法实现重定向跳转

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	 // [!code focus]
	上下文.Redirect(状态码, "跳转路径")	      	 			// [!code focus]
})    	  												// [!code focus]
```

::: tip 重定向状态码

- **301**：( 永久 )
- **302**：( 临时 )

:::

---

### 静态资源

1. Gin 服务引擎配置静态资源
2. 访问配置的资源访问路径

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

## 参数绑定

- 通过 [绑定方法](#绑定方法) 获取请求参数并将其数据类型绑定为某个自定义结构体类型
- 要绑定的结构体类型的字段必须加 Tag 标签 [更多详见](../../go/base/oop/struct.md#tag-标签)
- 通过 [绑定器](#绑定器) 对绑定了结构体类型的参数进行校验

---

### 绑定方法

- 通过路由处理函数的参数 ( 上下文 ) 上的方法绑定参数与结构体
- 绑定方法的参数为指针类型，接收结构体类型数据的指针

| 方法名              | 说明                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `ShouldBindUri()`   | 统一获取路径中的路径参数并绑定结构体类型<br/>结构体字段 Tag 标签为`uri`                           |
| `ShouldBindQuery()` | 统一获取路径中的查询参数并绑定结构体类型<br/>结构体字段 Tag 标签为`form`                          |
| `ShouldBindJSON()`  | 统一获取请求体中 JSON 格式参数并绑定结构体类型<br/>结构体字段 Tag 标签为`json`                    |
| `ShouldBind()`      | 统一获取路径参数以外的参数并绑定结构体类型<br/>结构体字段 Tag 标签需要有`form`，还可有`json`等... |

```go
type 结构体类型 struct {										// [!code focus]
	字段 类型 `json:"参数中键名 uri:"参数名" form:"参数名"`			// [!code focus]
}															   // [!code focus]

Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	var 参数值 结构体类型								  // [!code focus]

	err := 上下文.绑定方法(&参数值)					  		// [!code focus]
	if err != nil {										// [!code focus]
		// ...
		return
	}													// [!code focus]
	// ...												// [!code focus]
})														// [!code focus]
```

::: details 例子：验证`ShouldBindJSON()`接收 JSON 格式的表单参数并绑定结构体类型

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Person struct {				// [!code focus]
	Name   string   `json:"name"`	// [!code focus]
	Age    int      `json:"age"`	// [!code focus]
	Skills []string `json:"skills"`	// [!code focus]
}									// [!code focus]

func main() {
	r := gin.Default()

	r.POST("/xxx", func(ctx *gin.Context) {	// [!code focus]

		var params Person					// [!code focus]

		err := ctx.ShouldBindJSON(&params)	// [!code focus]
		if err != nil {						// [!code focus]
			ctx.String(http.StatusBadRequest, "参数格式错误：%s", err.Error())	// [!code focus]
			return							// [!code focus]
		}									// [!code focus]

		ctx.JSON(http.StatusOK, gin.H{		// [!code focus]
			"name":   params.Name,			// [!code focus]
			"age":    params.Age,			// [!code focus]
			"skills": params.Skills,		// [!code focus]
		})									// [!code focus]
	})										// [!code focus]

	r.Run()
}

```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl -X POST http://localhost:8080/xxx \
	   -H "Content-Type: application/json" \
	   -d '{"name":"Andy","age":28,"skills":["JS","Go","Python"]}'
{"name":"Andy","age":28,"skills":["JS","Go","Python"]}
```

:::

::: details 例子：验证`ShouldBindQuery()`接收查询参数并绑定结构体类型

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Person struct {				// [!code focus]
	Name   string   `form:"name"`	// [!code focus]
	Age    int      `form:"age"`	// [!code focus]
	Skills []string `form:"skills"`	// [!code focus]
}									// [!code focus]

func main() {
	r := gin.Default()

	r.GET("/xxx", func(ctx *gin.Context) {	// [!code focus]

		var params Person					// [!code focus]

		err := ctx.ShouldBindQuery(&params)	// [!code focus]
		if err != nil {						// [!code focus]
			ctx.String(http.StatusBadRequest, "参数格式错误：%s", err.Error())	// [!code focus]
			return							// [!code focus]
		}									// [!code focus]

		ctx.JSON(http.StatusOK, gin.H{		// [!code focus]
			"name":   params.Name,			// [!code focus]
			"age":    params.Age,			// [!code focus]
			"skills": params.Skills,		// [!code focus]
		})									// [!code focus]
	})										// [!code focus]

	r.Run()
}
```

:::

::: details 例子：验证`ShouldBindUri()`接收路径参数并绑定结构体类型

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Person struct {
	Name string `uri:"name"`
	Age  int    `uri:"age"`
}

func main() {
	r := gin.Default()

	r.GET("/:name/:age", func(ctx *gin.Context) {	// [!code focus]

		var params Person					// [!code focus]

		err := ctx.ShouldBindUri(&params)	// [!code focus]
		if err != nil {						// [!code focus]
			ctx.String(http.StatusBadRequest, "参数格式错误：%s", err.Error())	// [!code focus]
			return							// [!code focus]
		}

		ctx.JSON(http.StatusOK, gin.H{		// [!code focus]
			"name":   params.Name,			// [!code focus]
			"age":    params.Age,			// [!code focus]
			"skills": params.Skills,		// [!code focus]
		})									// [!code focus]
	})										// [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl 'http://localhost:8080/xxx?name="Andy"&age=28&skills=JS,Go,Python'
{"name":"Andy","age":28,"skills":["JS","Go","Python"]}
```

:::

::: details 例子：验证`ShouldBind()`接收不同的参数并绑定结构体类型

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Person struct {								// [!code focus]
	Name   string   `form:"name" json:"name"`		// [!code focus]
	Age    int      `form:"age" json:"age"`			// [!code focus]
	Skills []string `form:"skills" json:"skills"`	// [!code focus]
}													// [!code focus]

func main() {
	r := gin.Default()

	r.POST("/xxx", func(ctx *gin.Context) {	// [!code focus]

		var params Person					// [!code focus]

		err := ctx.ShouldBind(&params)		// [!code focus]
		if err != nil {						// [!code focus]
			ctx.String(http.StatusBadRequest, "参数格式错误：%s", err.Error())	// [!code focus]
			return							// [!code focus]
		}									// [!code focus]

		ctx.JSON(http.StatusOK, gin.H{		// [!code focus]
			"name":   params.Name,			// [!code focus]
			"age":    params.Age,			// [!code focus]
			"skills": params.Skills,		// [!code focus]
		})									// [!code focus]
	})										// [!code focus]

	r.Run()
}

```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
# 无法获取路径参数
% curl -X POST http://localhost:8080/Andy/28
404 page not found%

# 可以获取查询参数
% curl -X POST 'http://localhost:8080/xxx?name=Adny&age=28&skills=JS,Go,Python'
{"age":28,"name":"Adny","skills":["JS,Go,Python"]}%

# 可以获取 JSON 格式的请求参数 ( 结构体 Tag 需要有 json )
% curl -X POST http://localhost:8080/xxx \
       -H "Content-Type: application/json" \
       -d '{"name":"Andy","age":28,"skills":["JS","Go","Python"]}'
{"age":28,"name":"Andy","skills":["JS","Go","Python"]}

# 可以获取表单参数
# 写法一：
% curl -X POST http://localhost:8080/xxx \
	   -d 'name=Adny&age=28&skills=JS,Go,Python'
# 写法二：
% curl -X POST http://localhost:8080/xxx \
	   -F "name=Andy" \
	   -F "age=28" \
	   -F "skills=JS,Go,Python"
{"age":28,"name":"Andy","skills":["JS,Go,Python"]}
```

:::

---

### 绑定器

> Binder

- 绑定器可用于对绑定的参数进行校验
- 需要在绑定给参数的结构体类型的字段的 Tag 标签上添加`binding`
- 可通过`msg`添加自定义校验错误信息<br/>
  目前 Gin 自身只能对验证失败时返回统一错误信息，若想单独区分只能在逻辑里判断处理

```go
type 结构体类型 struct {
	字段 类型 `键:"值" 键:"值" binding:"绑定器字段=值"`
	字段 类型 `键:"值" 键:"值" binding:"绑定器字段=值,绑定器字段=值"`
}
```

| 绑定器字段 | 说明                 |
| ---------- | -------------------- |
| `required` | 必须字段             |
| `min`      | 最小长度             |
| `max`      | 最大长度             |
| `len`      | 具体长度             |
| `eq`       | 值等于               |
| `ne`       | 值不等于             |
| `gt`       | 值大于               |
| `gte`      | 值大于等于           |
| `lt`       | 值小于               |
| `lte`      | 值小于等于           |
| `eqfield`  | 值等于指定字段的值   |
| `nefield`  | 值不等于指定字段的值 |

::: details 例子：验证绑定器做参数值的校验

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Person struct {										// [!code focus]
	Name string `form:"name" binding:"required,max=16"`		// [!code focus]
	Age  int    `form:"age" binding:"required,gt=0,lt=100"`	// [!code focus]
}															// [!code focus]

func main() {
	r := gin.Default()

	r.POST("/xxx", func(ctx *gin.Context) {				// [!code focus]

		var params Person								// [!code focus]

		err := ctx.ShouldBind(&params)					// [!code focus]
		if err != nil {									// [!code focus]
			ctx.JSON(http.StatusBadRequest, gin.H{		// [!code focus]
				"err": err.Error(),						// [!code focus]
			})											// [!code focus]
			return										// [!code focus]
		}												// [!code focus]

		ctx.JSON(http.StatusOK, gin.H{					// [!code focus]
			"name": params.Name,						// [!code focus]
			"age":  params.Age,							// [!code focus]
		})												// [!code focus]
	})													// [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl -X POST http://localhost:8080/xxx -d 'name=Andy&age=28'
{"age":28,"name":"Andy"}

# 参数值校验失败
% curl -X POST http://localhost:8080/xxx
{"err":"Key: 'Person.Name' Error:Field validation for 'Name' failed on the 'required' tag\nKey: 'Person.Age' Error:Field validation for 'Age' failed on the 'required' tag"}

# 参数值校验失败
% curl -X POST http://localhost:8080/xxx -d 'age=28'
{"err":"Key: 'Person.Name' Error:Field validation for 'Name' failed on the 'required' tag"}

# 参数值校验失败
% curl -X POST http://localhost:8080/xxx -d 'name=Andy&age=999'
{"err":"Key: 'Person.Age' Error:Field validation for 'Age' failed on the 'lt' tag"}
```

:::

## 请求头

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {	// [!code focus]
	// 获取一个字段的值									  // [!code focus]
	字段值 := 上下文.GetHeader("字段")					  // [!code focus]

	// 获取所有字段的值									  // [!code focus]
	映射类型的所有字段与值 := ctx.Request.Header		   // [!code focus]
	字段值 := ctx.Request.Header["字段"]				 // [!code focus]
})													   // [!code focus]
```

<details class="details custom-block">
  <summary>例子：利用请求头中的<code>User Agent</code>判断并阻止简单的 Python 爬虫</summary>

::: code-group

```go [Gin 路由规则]
package main

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/one", func(ctx *gin.Context) {
		userAgent := ctx.GetHeader("User-Agent")				// [!code focus]

		// python-requests/2.31.0
		if strings.Contains(userAgent, "python") {				// [!code focus]
			ctx.String(http.StatusForbidden, "老登，别来爬虫")	   // [!code focus]
			return												// [!code focus]
		}														// [!code focus]

		ctx.String(http.StatusOK, "Hello～")					// [!code focus]
	})

	r.Run()
}
```

```py [Python 爬虫请求]
import requests

url = "http://localhost:8080/one"


def test_request():
    try:
        response = requests.get(url)

        status_code = response.status_code
        text = response.text

        if status_code == 200:
            print(text)
        else:
            print(f"[Request Failed] {status_code} {text}")

    except requests.RequestException as e:
        print(f"[Request Error] ${e}")


test_request()
```

:::

> 如下：发起请求访问

```shell
# 执行 Python 爬虫会被拒绝访问
% python 上述爬虫文件.py
[Request Failed] 403 老登，别来爬虫

# 执行 cURL 则会成功获取响应数据
% curl http://localhost:8080/one
Hello～
```

::: tip

当然可以伪造请求头模拟浏览器的行为来逃过 User-Agent 检测，本文不过多记述

```py
import requests

url = "http://localhost:8080/one"


def do_something():
    try:
        custom_headers = {										# [!code focus]
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"		 								 # [!code focus]
        }														# [!code focus]

        response = requests.get(url, headers=custom_headers)	# [!code focus]

        if response.status_code == 200:
            print(response.text)
        else:
            print(f"Request Failed {response.status_code} {response.text}")

    except requests.RequestException as e:
        print(f"Request Error ${e}")


do_something()
```

:::

</details>

## 响应头

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {  // [!code focus]
	上下文.Header("字段", "值")							// [!code focus]
	上下文.Header("字段", "值")							// [!code focus]
})
```

::: details 例子：验证设置并查看自定义响应头

> 如下：利用`Head()`方法注册路由规则并追加自定义响应头`Aaa`、`Bbb`

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.HEAD("/xxx", func(ctx *gin.Context) {	// [!code focus]
		ctx.Header("Aaa", "aaa")			// [!code focus]
		ctx.Header("Bbb", "222")			// [!code focus]
	})										// [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问查看响应头

```shell
% curl -I http://localhost:8080/xxx
HTTP/1.1 200 OK
Aaa: aaa
Bbb: 222
Date: Mon, 22 Jan 2024 09:12:55 GMT
```

:::
