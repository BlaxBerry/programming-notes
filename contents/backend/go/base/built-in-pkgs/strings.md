# strings 包

是 Go 标准库中的一个内置包

主要用于字符串相关操作

::: code-group

```go [导入]
package 当前包

import "strings"     // [!code focus]
```

:::

## 格式化

### strings.TrimSpace()

用于去除指定字符串前后的空格

```go
字符串 := strings.TrimSpace()
```

::: details 例子：验证字符串前后去空格

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "  xxx  "                // [!code focus]
	fmt.Print(str)

	println()

	str = strings.TrimSpace(str)    // [!code focus]
	fmt.Print(str)
}


// "  xxx  "
// "xxx"
```

:::

## 成员判断

### strings.HasPrefix

用于验证判断字符串中是否包含指定的起始字符串

```go
布尔值 := strings.HasPrefix(str, "起始字符串")
```

::: details 例子：验证判断字符串中包含指定起始字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "xxxabcde"                       // [!code focus]

	isTrue := strings.HasPrefix(str, "xxx") // [!code focus]
	fmt.Println(isTrue)

	isTrue = strings.HasPrefix(str, "yyy")  // [!code focus]
	fmt.Println(isTrue)
}


// true
// false
```

:::

---

### strings.HasSuffix

用于验证判断字符串中是否包含指定的结尾字符串

```go
布尔值 := strings.HasSuffix(str, "结尾字符串")
```

::: details 例子：验证判断字符串中包含结尾字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "xxxabcde"                       // [!code focus]

	isTrue := strings.HasSuffix(str, "zzz") // [!code focus]
	fmt.Println(isTrue)

	isTrue = strings.HasSuffix(str, "xxx")  // [!code focus]
	fmt.Println(isTrue)
}


// true
// false
```

:::
