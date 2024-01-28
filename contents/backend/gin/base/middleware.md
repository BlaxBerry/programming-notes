# Gin 中间件

> Middleware

中间件实质是个钩子函数，是可以拦截 http 请求与响应的拦截器

::: tip 中间件的使用场景：

- 请求限速
- 接口签名处理
- 权限校验
- 统一错误处理

:::

```go
// 写法一
// 该函数为中间件
func 中间件函数(上下文 *gin.Context) {
    // ...
    上下文.Next()
}


// 写法二 ( 灵活性更高 )
// 函数返回值为中间件
func 中间件生成函数([参数 类型]) gin.HandlerFunc {
    return func(上下文 *gin.Context) {
        // ...
        上下文.Next()
    }
}
```

## 全局中间件

全局中间件需要通过`Use()`注册

```go
Gin引擎 := gin.Default()

Gin引擎.Use(中间件)              // [!code focus]
Gin引擎.Use(中间件, 中间件)       // [!code focus]
Gin引擎.Use(中间件生成函数(), 中间件生成函数()) // [!code focus]
```

::: details 例子：验证创建 Gin 引擎时使用的`Default()`与`New()`

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    // 默认使用了内置中间件 Logger()、Recovery()    // [!code focus]
	Gin引擎 := gin.Default()                    // [!code focus]

    // 等同于手动使用内置中间件 Logger()、Recovery() // [!code focus]
    // Gin引擎 := gin.New()                        // [!code focus]
    // Gin引擎.Use(Logger(), Recovery())           // [!code focus]

    // ...

	Gin引擎.Run()
}
```

> 如下：`Default()`内部就使用了内置中间件`Logger()`、`Recovery()`

```go
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
	engine.Use(Logger(), Recovery())
	return engine
}
```

:::

::: details 例子：利用全局中间件设置 cookie

```go
package main

import "github.com/gin-gonic/gin"

func SetupCookie() gin.HandlerFunc {    // [!code focus]
	return func(ctx *gin.Context) {     // [!code focus]
		ctx.SetCookie("site_cookie", "xxxxx", 3600, "/", "localhost", false, true)  // [!code focus]
		ctx.Next()              // [!code focus]
	}                           // [!code focus]
}                               // [!code focus]

func main() {
	r := gin.Default()

	r.Use(SetupCookie())    // [!code focus]

	r.GET("/a", func(ctx *gin.Context) { })
	r.GET("/b", func(ctx *gin.Context) { })

	r.Run()
}
```

:::

## 路由中间件

路由的处理函数 ( Handler ) 就是中间件

多个路由中间件会在访问该路由时按顺序执行

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("访问路径", 路由中间件)            // [!code focus]
Gin引擎.请求方式("访问路径", 路由中间件, 路由中间件)  // [!code focus]
Gin引擎.请求方式("访问路径", 中间件生成函数(), 中间件生成函数())  // [!code focus]
```

## 路由分组中间件

路由分组需要通过`Use()`注册中间件

```go
Gin引擎 := gin.Default()

路由组 := Gin引擎.Group("访问路径").Use(中间件)         // [!code focus]
路由组 := Gin引擎.Group("访问路径").Use(中间件, 中间件)  // [!code focus]
路由组 := Gin引擎.Group("访问路径").Use(中间件生成函数(), 中间件生成函数())  // [!code focus]
```

::: details 例子：验证嵌套的路由分组使用中间件

- `api`路由组与其两个子路由分组`v1`、`v2`
- 路由分组`v1`使用中间件`MiddlewareA`
- 路由分组`v2`使用中间件`MiddlewareB`

```go
package main

import "github.com/gin-gonic/gin"

func MiddlewareA(ctx *gin.Context) {    // [!code focus]
	ctx.String(200, "111 ")             // [!code focus]
}                                       // [!code focus]

func MiddlewareB(ctx *gin.Context) {    // [!code focus]
	ctx.String(200, "222 ")             // [!code focus]
}                                       // [!code focus]

func main() {
	r := gin.Default()

	api := r.Group("/api")                      // [!code focus]

	v1 := api.Group("/v1").Use(MiddlewareA)     // [!code focus]
	{                                           // [!code focus]
		v1.GET("/a", func(ctx *gin.Context) {   // [!code focus]
			ctx.String(200, "v1 aaa")             // [!code focus]
		})                                      // [!code focus]
		v1.GET("/b", func(ctx *gin.Context) {   // [!code focus]
			ctx.String(200, "v1 bbb")             // [!code focus]
		})                                      // [!code focus]
	}                                           // [!code focus]

	v2 := api.Group("/v2").Use(MiddlewareB)     // [!code focus]
	{                                           // [!code focus]
		v2.GET("/a", func(ctx *gin.Context) {   // [!code focus]
			ctx.String(200, "v2 aaa")             // [!code focus]
		})                                      // [!code focus]
		v2.GET("/b", func(ctx *gin.Context) {   // [!code focus]
			ctx.String(200, "v2 bbb")             // [!code focus]
		})                                      // [!code focus]
	}                                           // [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问

```shell
% curl http://localhost:8080/api/v1/a
111v1 aaa

% curl http://localhost:8080/api/v1/b
111 v1 bbb

% curl http://localhost:8080/api/v2/a
222 v2 aaa

% curl http://localhost:8080/api/v2/b
222 v2 bbb
```

:::

## 多个中间件

多个中间件会按顺序执行

::: details 例子：验证多个路由中间件按顺序执行

> 如下：访问`/xxx`时会按顺序执行路由中间件函数并返回响应数据

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET(                           // [!code focus]
		"/xxx",                      // [!code focus]
		func(ctx *gin.Context) {     // [!code focus]
            ctx.String(200, "aa")     // [!code focus]
		},                           // [!code focus]
		func(ctx *gin.Context) {     // [!code focus]
            ctx.String(200, "bb")     // [!code focus]
		},                           // [!code focus]
		func(ctx *gin.Context) {     // [!code focus]
            ctx.String(200, "cc")     // [!code focus]
		},                           // [!code focus]
	)                                // [!code focus]

    r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问`/xxx`

```shell
% curl http://localhost:8080/xxx
aabbcc%
```

:::

---

### 拦截与放行

- 可使用上下文的`Abort()`方法中止后续中间件的执行 ( 拦截 )
- 可使用上下文的`Next()`方法使当前中间件执行结束后继续执行后续中间件 ( 放行 )

```go
func 中间件函数(上下文 *gin.Context) {
    // ...

    if 中止进入后续中间件的条件 {
        上下文.Abort()
    }
    上下文.Next()
}
```

::: details 例子：验证路由中间件的拦截与放行

> 如下：要求请求路径中需要包含有查询字符串参数`param`否则拦截后续所有中间件的执行

```go
package main

import "github.com/gin-gonic/gin"

func CheckQueryFirst(ctx *gin.Context) {    // [!code focus]
	_, ok := ctx.GetQuery("param")          // [!code focus]
	if !ok {                                // [!code focus]
		ctx.Abort()                         // [!code focus] // [!code hl]
	}                                       // [!code focus]
	ctx.String(200, "a")                    // [!code focus]
	ctx.Next()                              // [!code focus] // [!code hl]
}                                           // [!code focus]

func main() {
	r := gin.Default()

	r.GET(                           // [!code focus]
		"/xxx",                      // [!code focus]
		CheckQueryFirst,             // [!code focus] // [!code hl]
		func(ctx *gin.Context) {     // [!code focus]
            ctx.String(200, "bb")     // [!code focus]
		},                           // [!code focus]
		func(ctx *gin.Context) {     // [!code focus]
            ctx.String(200, "cc")     // [!code focus]
		},                           // [!code focus]
	)                                // [!code focus]

    r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问`/xxx`

```shell
% curl http://localhost:8080/xxx
a

% curl "http://localhost:8080/xxx?param=xx"
aabbcc
```

:::

---

### 传递数据

- 可使用上下文的`Set()`方法在中间件内定义传递数据
- 可使用上下文的`Get()`方法在后续中间件中获取传递的数据

```go
// 传递
func 中间件函数(上下文 *gin.Context) {
    // ...
    上下文.Set("键", 值)
    上下文.Set("键", 值)

    上下文.Next()
}

// 接收
func 中间件函数(上下文 *gin.Context) {
    // ...
    值, exists := 上下文.Get("键")
    if !exists {
        // ...
    }

    上下文.Next()
}
```

若传递的数据时结构体，接收数据的中间件内若要获取其字段，需要类型断言

```go
type 结构体类型 struct {            // [!code focus]
    字段 类型                       // [!code focus]
}                                 // [!code focus]

func 中间件函数(上下文 *gin.Context) {
    上下文.Set("键", 结构体类型{    // [!code focus]
        字段: 值,                 // [!code focus]
    })                           // [!code focus]

    上下文.Next()
}

func 中间件函数(上下文 *gin.Context) {
    _数据, _ := 上下文.Get("键")   // [!code focus]
    数据 := _数据.(结构体类型)      // [!code focus]
    字段值 := 数据.字段            // [!code focus]

    上下文.Next()
}
```

::: details 例子：验证路由中间件直接的数据传递与接收

- 创建三个路由中间件作为路径`/xxx`的处理函数
- 中间件`MiddlewareA`传递自定义结构体类型数据
- 中间件`MiddlewareB`传递基本数据类型一个字符串
- 中间件`RouteHandler`接收传递的数据并响应

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Person struct {            // [!code focus]
	Name string `json:"name"`   // [!code focus]
	Age  int    `json:"age"`    // [!code focus]
}                               // [!code focus]

func MiddlewareA(ctx *gin.Context) {    // [!code focus]
	ctx.Set("person", Person{           // [!code focus]
		Name: "Andy",                   // [!code focus]
		Age:  28,                       // [!code focus]
	})                                  // [!code focus]
	ctx.Next()                          // [!code focus]
}                                       // [!code focus]

func MiddlewareB(ctx *gin.Context) {    // [!code focus]
	ctx.Set("msg", "xxxxxx")            // [!code focus]
	ctx.Next()                          // [!code focus]
}                                       // [!code focus]

func RouteHandler(ctx *gin.Context) {   // [!code focus]
	msg, _ := ctx.Get("msg")            // [!code focus]
	_person, _ := ctx.Get("person")     // [!code focus]
	person := _person.(Person)  // 类型断言 // [!code focus]

	ctx.JSON(http.StatusOK, gin.H{      // [!code focus]
		"name":    person.Name,         // [!code focus]
		"age":     person.Age,          // [!code focus]
		"message": msg,                 // [!code focus]
	})                                  // [!code focus]

    // 若直接响应则不需要类型断言           // [!code focus]
	// person, _ := ctx.Get("person")   // [!code focus]
	// ctx.JSON(http.StatusOK, person)  // [!code focus]
}                                       // [!code focus]

func main() {
	r := gin.Default()

	r.GET("/xxx", MiddlewareA, MiddlewareB, RouteHandler)   // [!code focus]

	r.Run()
}
```

> 如下：利用 [cURL](../../../others/tools/curl/index.md) 访问`/xxx`

```shell
% curl http://localhost:8080/xxx
{"age":28,"message":"xxxxxx","name":"Andy"}
```

:::
