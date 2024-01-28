# runtime 包

是 Go 标准库中的一个内置包

主要用于运行时环境的操作，比如协程 ( Goroutine )

::: code-group

```go [导入]
package 当前包

import "runtime"     // [!code focus]
```

:::

## 运行 CPU

Go 1.8 以后默认程序运行在多核上，不需要手动设置运行 CPU 个数

---

### runtime.NumCPU

返回本机的逻辑 CPU 个数 ( 几核 )

```go
var 变量 int := runtime.NumCPU()
```

::: details 例子：验证本机有 10 个 CPU

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	num := runtime.NumCPU() // [!code focus]
	fmt.Println(num)        // [!code focus]
}


// 10
```

:::
