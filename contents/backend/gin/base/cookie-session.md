# Gin 会话控制

## cookie

通过路由处理函数的参数 ( 上下文 ) 上的与 cookie 相关的方法来操作

---

### 设置

利用路由处理函数中通过参数上的`SetCookie()`方法来设置 cookie

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {    // [!code focus]
	上下文.SetCookie(                                     // [!code focus]
        "cookie名",                                      // [!code focus]
        "cookie值",                                      // [!code focus]
        有效时间,                                         // [!code focus]
        "cookie路径",                                    // [!code focus]
        "cookie作用域",                                  // [!code focus]
        是否只能通过https协议发送,                         // [!code focus]
        是否能被JS获取,                                   // [!code focus]
    )                                                   // [!code focus]

	// ...                                              // [!code focus]
})                                                      // [!code focus]
```

::: details 例子：验证给访问的路径设置 cookie

> 如下：设置的 cookie 名为`site_cookie`，值为`xxxxxxxxxxx`，时效为 1h，可被 JS 访问

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/xxx", func(ctx *gin.Context) {                                                  // [!code focus]
		ctx.SetCookie("site_cookie", "xxxxxxxxxxx", 3600, "/", "localhost", false, true)    // [!code focus]
	})                                                                                      // [!code focus]

	r.Run()
}
```

:::

---

### 读取

利用路由处理函数中通过参数上的`Cookie()`方法来设置 cookie

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {    // [!code focus]
    cookie值, err := 上下文.Cookie("cookie名")            // [!code focus]

    if err != nil {                                     // [!code focus]
        // ...                                          // [!code focus]
        return                                          // [!code focus]
    }                                                   // [!code focus]

	// ...                                              // [!code focus]
})                                                      // [!code focus]
```

::: details 例子：验证获取 cookie 的值

> 如下： 获取名为`site_cookie`的 cookie，若不存在则响应 400 状态码的`cookie not found`

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/xxx", func(ctx *gin.Context) {          // [!code focus]
        data, err := ctx.Cookie("site_cookie")      // [!code focus]
		if err != nil {                             // [!code focus]
			ctx.String(http.StatusBadRequest, "cookie not found")     // [!code focus]
			return                                  // [!code focus]
		}                                           // [!code focus]

		ctx.String(http.StatusOK, data)             // [!code focus]
	})

	r.Run()
}
```

:::

---

### 删除

利用路由处理函数中通过参数上的`SetCookie()`方法，将参数中`MaxAge`设为`-1`来删除 cookie

```go
Gin引擎 := gin.Default()

Gin引擎.请求方式("/访问路径", func(上下文 *gin.Context) {    // [!code focus]
    上下文.SetCookie(                                     // [!code focus]
        "cookie名",                                      // [!code focus]
        "cookie值",                                      // [!code focus]
        -1,                                             // [!code focus] // [!code hl]
        "cookie路径",                                    // [!code focus]
        "cookie作用域",                                  // [!code focus]
        是否只能通过https协议发送,                         // [!code focus]
        是否能被JS获取,                                   // [!code focus]
    )                                                   // [!code focus]
	// ...                                              // [!code focus]
})                                                      // [!code focus]
```

::: details 例子：删除 cookie

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/xxx", func(ctx *gin.Context) {                                                  // [!code focus]
		ctx.SetCookie("site_cookie", "xxxxxxxxxxx", -1, "/", "localhost", false, true)      // [!code focus]
	})                                                                                      // [!code focus]

	r.Run()
}
```

:::

## session

利用第三方中间件`gin-contrib/sessions`

[更多详见](https://github.com/gin-contrib/sessions)

::: code-group

```shell [下载]
go get github.com/gin-contrib/sessions
```

:::
