# GO 异常处理

Go 使用`defer`、`panic`、`recover`来处理异常错误

## 自定义异常

### errors.New()

利用内置包`errors`的`New()`方法创建自定义错误对象

```go
import "errors"

var 错误对象 error = errors.New("错误信息")
```

1. 函数返回 error 类型的自定义错误对象
2. 在调用函数后判断错误对象是否为`nil`

```go
import "errors"

func 函数() error {
	if 失败条件 {
		return errors.New("错误信息")
	}
	// ...
	return nil
}


if err := 函数(); err != nil {
	// ...
	return
}
```

::: details 例子：

```go
package main

import (
	"errors"
	"fmt"
)

func Divide(a, b int) (*int, err error) {	// [!code focus]
	if b == 0 {								// [!code focus]
		return nil, errors.New("参数错误")	 // [!code focus]
	}										// [!code focus]

	res := a / b							// [!code focus]
	return &res, nil						// [!code focus]
}											// [!code focus]

func main() {
	res, err := Divide(1, 0)				// [!code focus]
	if err != nil {							// [!code focus]
		fmt.Println("error", err)
		return								// [!code focus]
	}										// [!code focus]
	fmt.Println(*res)						// [!code focus]
}
```

:::

## 异常抛出

### panic()

`panic`是个内置函数，用于引发一个运行时错误并中止程序

```go
func 函数() {
	// 可能会出错的逻辑						   // [!code focus]
	// ...									// [!code focus]

	if 错误对象 != nil {					 // [!code focus]
		panic(错误对象) 					 // [!code focus]
	}										// [!code focus]
}
```

::: details 例子：

```go
package main

import (
	"errors"
	"fmt"
)

func Divide(a, b int) *int { 		// [!code focus]
	if b == 0 {						// [!code focus]
		panic(errors.New("参数错误")) // [!code focus]
	}								// [!code focus]

	res := a / b 					// [!code focus]
	return &res  					// [!code focus]
}

func main() {
	defer func() {							// [!code focus]
		if err := recover(); err != nil {	// [!code focus]
			fmt.Println(err)				// [!code focus]
		}									// [!code focus]
	}()										// [!code focus]

	res := Divide(1, 0) // [!code focus]
	fmt.Println(res)    // [!code focus]
}
```

:::

## 异常捕获

### defer + recover

`recover`是个内置函数，用于捕获`panic`引发的异常，后续代码继续执行

> 如下：`defer`+ 立即执行函数中通过`recover`捕获异常

```go
func 函数() {
	defer func() {							// [!code focus]
		if err != nil; err := recover() {	// [!code focus]
			// 出现异常时的处理				   // [!code focus]
			// ...							// [!code focus]
		}									// [!code focus]
	}()										// [!code focus]

	// 可能会出错的逻辑						   // [!code focus]
	// ...									// [!code focus]
}
```

::: details 例子：

```go
package main

import "fmt"

func Divide(a, b int) *int {				// [!code focus]
	defer func() {							// [!code focus]
		if err := recover(); err != nil {	// [!code focus]
			fmt.Println("error: ", err)		// [!code focus]
		}									// [!code focus]
	}()										// [!code focus]

	res := a / b							// [!code focus]
	return &res								// [!code focus]
}

func main() {
	res := Divide(1, 0)					// [!code focus]
	fmt.Println(*res)					// [!code focus]
}
```

:::
