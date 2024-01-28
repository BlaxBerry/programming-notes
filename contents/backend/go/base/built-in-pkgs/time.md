# time 包

是 Go 标准库中的一个内置包

主要用于进行时间相关的操作

::: code-group

```go [导入]
package 当前包

import "time"     // [!code focus]
```

:::

## time.Now()

用于获取当前时间的时间实例

方法返回值为`time.Time`类型

```go
var 时间实例 time.Time = time.Now()

时间实例 := time.Now()        // [!code focus]
```

---

### 时间格式

年月日时分秒

```go
时间实例 := time.Now()

年 := 时间实例.Year()   // [!code focus]
月 := 时间实例.Month()  // [!code focus]
日 := 时间实例.Day()    // [!code focus]
时 := 时间实例.Hour()   // [!code focus]
分 := 时间实例.Minute() // [!code focus]
秒 := 时间实例.Second() // [!code focus]
```

::: details 例子：验证

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()       // [!code focus]
	fmt.Println(now)

	year := now.Year()      // [!code focus]
	fmt.Println(year)
	month := now.Month()    // [!code focus]
	fmt.Println(month)
	day := now.Day()        // [!code focus]
	fmt.Println(day)
	hour := now.Hour()      // [!code focus]
	fmt.Println(hour)
	minute := now.Minute()  // [!code focus]
	fmt.Println(minute)
	second := now.Second()  // [!code focus]
	fmt.Println(second)
}


// 2024-01-09 23:09:32.39688 +0900 JST m=+0.000104209
// 2024
// January
// 9
// 23
// 13
// 30
```

:::

---

### 时间戳

unix 时间戳 ( 1970/01/01 到当前时间的总毫秒数 )

```go
时间实例 := time.Now()

// 时间实例 → 时间戳                       // [!code focus]
时间戳 := 时间实例.Unix()           // [!code focus]
纳秒时间戳 := 时间实例.UnixNano()   // [!code focus]

// 时间戳 → 时间实例                       // [!code focus]
时间实例 := time.Unix(时间戳, 0)    // [!code focus]
```

::: details 例子：验证获取时间戳

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()               // [!code focus]
	fmt.Println(now)

	timeStamp := now.Unix()         // [!code focus]
	fmt.Println(timeStamp)
	timeStampNano := now.UnixNano() // [!code focus]
	fmt.Println(timeStampNano)
}


// 2024-01-10 00:27:54.172569 +0900 JST m=+0.000143459
// 1704814074
// 1704814074172569000
```

:::

::: details 例子：验证时间戳转时间类型对象

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	var timeStamp int64 = 1704814074    // [!code focus]

	timeObj := time.Unix(timeStamp, 0)  // [!code focus]
	fmt.Println(timeObj)
}


// 2024-01-10 00:27:54 +0900 JST
```

:::

---

### 时间格式化

```go
时间实例 := time.Now()

时间字符串 := 时间实例.Format("格式字符串")   // [!code focus]
```

::: details 例子：验证格式化的时间

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()                               // [!code focus]

	fmt.Println(now.Format("2006-01-02"))           // [!code focus]
	fmt.Println(now.Format("2006/01/02"))           // [!code focus]
	fmt.Println(now.Format("2006-01-02 15:04:05"))  // [!code focus]
	fmt.Println(now.Format("2006/01/02 15:04"))     // [!code focus]
	fmt.Println(now.Format("15:04"))                // [!code focus]
	fmt.Println(now.Format("15-04"))                // [!code focus]
}


// 2024-01-10
// 2024/01/10
// 2024-01-10 15:39:32
// 2024/01/10 15:39
// 15:39
// 15-39
```

:::

## 时间间隔

### time.Duration

time 包内置的时间间隔常量值

```go
const (
	Nanosecond  Duration = 1
	Microsecond          = 1000 * Nanosecond
	Millisecond          = 1000 * Microsecond
	Second               = 1000 * Millisecond
	Minute               = 60 * Second
	Hour                 = 60 * Minute
)
```

---

### Add()

获取指定时间实例加上时间间隔后的时间实例

- 方法返回值为`time.Time`类型的时间实例
- 方法参数必须为[`time.Duration`](#time-duration)类型数据

```go
时间实例 := time.Now()

时间实例 := 时间实例.Add(时间间隔)  // [!code focus]
```

::: details 例子：验证获取距离当前 24h 与 1s 后的时间实例

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()               // [!code focus]
    fmt.Println(now)

	// 距离当前24h以后
	t := now.Add(time.Hour * 24)    // [!code focus]
	fmt.Println(t)

    // 距离当前1s以后
	t = now.Add(time.Second)        // [!code focus]
	fmt.Println(t)
}


// 2024-01-10 13:41:40.292674 +0900 JST m=+0.000106960
// 2024-01-11 13:41:40.292674 +0900 JST m=+86400.000106960
// 2024-01-10 13:41:41.292674 +0900 JST m=+1.000106960
```

:::

---

### Sub()

获取两个时间实例之间的时间间隔

```go
时间实例A := time.Now()
时间实例B := 时间实例A.Add(时间间隔)

// a - b                                           // [!code focus]
时间间隔 := 时间实例B.Sub(时间实例A)    // [!code focus]

// b - a                                           // [!code focus]
时间间隔 := 时间实例A.Sub(时间实例B)    // [!code focus]
```

::: details 例子：验证获取两个时间实例见的时间间隔

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	t1 := time.Now()
	t2 := t1.Add(2 * time.Hour)

    // t2 - t1      // [!code focus]
	d := t2.Sub(t1) // [!code focus]
	fmt.Println(d)

    // t1 - t2      // [!code focus]
	d = t1.Sub(t2)  // [!code focus]
	fmt.Println(d)
}


// 2h0m0s
// -2h0m0s
```

:::

## 定时器

### Time.Tick()

```go
定时器通道 := time.Tick(Duration类型时间间隔)

for 时间实例 := range 定时器通道 {
    // ...
}
```

::: details 例子：验证每隔 1s 打印当前时间秒数

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ticker := time.Tick(time.Second)    // [!code focus]

	for t := range ticker {             // [!code focus]
        s := t.Second()                 // [!code focus]
		fmt.Println(s)                  // [!code focus]
	}                                   // [!code focus]
}


//
```

:::
