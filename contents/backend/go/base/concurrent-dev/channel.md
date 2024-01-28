# GO 通道

> Channel

通道可用于协程 ( Goroutine ) 的连接，实现在其之间发送接收一个特定值

## 创建通道

通道是个[引用类型数据](../data-types/division-determination-conversion.md#引用类型数据)，零值为`nil`

通道需要使用`make()`函数初始化后才能使用

```go
var 变量 chan 类型  // nil 通道

var 变量 := make(chan 类型, [容量])
```

---

### 无缓冲通道

`make()`函数初始化通道时不指定第二个参数容量

```go
var 无缓冲通道 := make(chan 类型)
```

无缓冲通道只有在有协程 ( Goroutine ) 接收数据时才能发送数据，否则会阻塞报错 deadlock

::: details 例子：验证无缓冲通道传递数据时的阻塞与解决方法

::: code-group

```go [无接收]
package main

func main() {
	ch := make(chan string) // [!code focus] // [!code error]
	ch <- "hello"          // [!code focus] // [!code error]
}


// fatal error: all goroutines are asleep - deadlock!   // [!code error]
```

```go [有接收]
package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan string)    // [!code focus]

	go func() {                 // [!code focus]
		data := <-ch            // [!code focus]
		fmt.Println(data)       // [!code focus]
	}()                         // [!code focus]

	ch <- "hello"               // [!code focus]

	time.Sleep(time.Second * 2)
}


// 打印：hello
// 等待 2s 后结束程序
```

:::

---

### 有缓冲通道

`make()`函数初始化通道时指定第二个参数容量值大于`0`

```go
var 有缓冲通道 := make(chan 类型, 容量)
```

::: details 例子：验证有缓冲通道的数据传递与接收

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan string, 1)       // [!code focus]

	ch <- "hello"                    // [!code focus]

	data := <-ch                     // [!code focus]
	fmt.Println(data)                // [!code focus]

	time.Sleep(time.Second * 2)
}


// 打印：hello
// 等待 2s 后结束程序
```

:::

---

### 双向通道

```go
func 传递数据的协程函数(通道 chan 类型) {
    // ...
    通道 <- 数据
    close(通道)
}

func 接收数据的协程函数(通道 chan 类型) {
    for 数据 := range ch {
        // ...
	}
}


go 传递数据的协程函数(通道)
go 接收数据的协程函数(通道)
```

---

### 单向通道

被限制了只能用于数据的传输或接收的通道

- 仅传递数据的通道类型：`chan<- 类型`
- 仅接收数据的通道类型：`<-chan 类型`

```go
func 仅传递数据的协程函数(通道 chan<- 类型) {
    // ...
    通道 <- 数据
    close(通道)
}

func 仅接收数据的协程函数(通道 <-chan 类型) {
    for 数据 := range ch {
        // ...
	}
}


go 仅传递数据的协程函数(通道)
go 仅接收数据的协程函数(通道)
```

::: details 例子：验证利用单向无缓冲通道实现协程间的数据传递

```go
package main

import (
	"fmt"
	"time"
)

func sendData(ch chan<- int) {  // [!code focus]
	for i := 0; i < 3; i++ {
		ch <- i                 // [!code focus]
	}
	close(ch)                   // [!code focus]
}                               // [!code focus]

func getData(ch <-chan int) {   // [!code focus]
	for data := range ch {      // [!code focus]
		fmt.Println(data)
	}                           // [!code focus]
}                               // [!code focus]

func main() {
	ch := make(chan int)        // [!code focus]

	go sendData(ch)             // [!code focus]
	go getData(ch)              // [!code focus]

	time.Sleep(time.Second * 2)
}


// 打印：0
// 打印：1
// 打印：2
// 等待 2s 后结束程序
```

:::

## 操作通道

### 发送数据

```go
通道 := make(chan 类型)

通道 <- 指定类型的数据      // [!code focus]
```

---

### 接收数据

```go
通道 := make(chan 类型)

// 写法一：                  // [!code focus]
for {                       // [!code focus]
    数据, ok := <- 通道      // [!code focus]
    // ...
    if !ok {                // [!code focus]
        break               // [!code focus]
    }                       // [!code focus]
}                           // [!code focus]

// 写法二：                  // [!code focus]
for 数据 := range 通道 {     // [!code focus]
    // ...
}                           // [!code focus]
```

---

### 关闭通道

```go
通道 := make(chan 类型)

close(通道)
```

::: details 例子：验证利用单向无缓冲通道实现协程间的数据传递

> 如下：利用循环将数据通过无缓冲通道从一个协程传递数据到另一个协程，数据传递完成后关闭通道

```go
package main

import (
	"fmt"
	"time"
)

func sendData(ch chan<- int) {
	for i := 0; i < 3; i++ {         // [!code focus]
		ch <- i                      // [!code focus]
	}                                // [!code focus]
	close(ch)                        // [!code focus]
}

func getData(ch <-chan int) {
	for {                            // [!code focus]
		if data, ok := <-ch; ok {    // [!code focus]
			fmt.Println(data)        // [!code focus]
		} else {                     // [!code focus]
			break                    // [!code focus]
		}                            // [!code focus]
	}                                // [!code focus]
}

func main() {
	ch := make(chan int)             // [!code focus]

	go sendData(ch)                  // [!code focus]
	go getData(ch)                   // [!code focus]

	time.Sleep(time.Second * 2)
}


// 打印：0
// 打印：1
// 打印：2
// 等待 2s 后结束程序
```

:::

## select

可用于同时监听多个通道的数据接收与传递

```go
select {
case 数据 := <- 通道:
    // 接收成功时执行 ...
case 通道 <- 数据:
    // 传递成功时执行 ...
default:
    // 全都接收失败时执行的操作 ...
}
```
