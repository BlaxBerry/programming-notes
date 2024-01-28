# GO 协程

> Goroutine

Go 使用协程 ( goroutine ) 来实现并发，由 Go 的运行时 ( Runtime ) 调度与管理

<details class="details custom-block">
  <summary>基本概念：进程、线程、协程、并发、并行</summary>

::: details 进程、线程、协程

- **进程** ( Process )：是程序的一次执行过程，是系统进行资源分配与调度的基本单位
- **线程** ( Thread )：是进程的一个执行实例，是比进程更小的程序执行的单位
- **协程** ( Goroutine )：可理解为一个更小的轻量级线程，有独立的栈空间，共享堆空间，调度可由用户控制

> 一个程序至少要有一个进程，一个进程至少要有一个线程<br/>
> 一个进程可以创建撤销多个线程，同一个进程中的多个线程可以并发<br/>
> 一个线程上可以有多个协程

:::

::: details 并发、并行

- **并发** ( Concurrent )：多线程程序在单核上运行，同一时间只有一个线程在执行
- **并行** ( Parallelism )：多线程程序在多核上运行，同一时间多个线程执行

:::

</details>

## 开启协程

Go 的并发只需要开启一个协程 ( Goroutine ) 执行要并发的逻辑即可

1. 将要并发执行的任务封装为一个函数
2. 利用关键字`go`开启一个协程 ( Goroutine )执行该函数

---

### 关键字 go

利用关键字`go`创建一个协程 ( Goroutine )，一个`go`对应一个函数

```go
go 函数()
go 函数(参数)
```

开启一个协程时会有一定耗时

可同时开启多个协程并发执行任务，多个并发任务随机调度 ( 执行先后顺序不一定 )

主线程若提前结束则会直接结束剩余所有的子协程

::: details 例子：验证主线程`main`函数退出会结束所有耗时的子协程

> 如下：协程时会有耗时，而`main`函数先结束，故不再执行`doSomething()`函数

```go
package main

import "fmt"

func doSomething() {
	fmt.Println("并发任务")
}

func main() {
	go doSomething()		// [!code focus]

	fmt.Println("main函数")	// [!code focus]

}


// 打印：main函数
// 程序结束执行
```

:::

::: details 例子：验证利用`time.Sleep()`让主线程等待子协程

> 如下：协程时会有耗，`main`函数会先执行并等待 2s 后结束，在此期间`doSomething()`函数并发执行

```go
package main

import (
	"fmt"
	"time"
)

func doSomething() {
	fmt.Println("并发任务")
}

func main() {
	go doSomething()				// [!code focus]

	fmt.Println("main函数")			 // [!code focus]

	time.Sleep(time.Second * 2)		// [!code focus]
}

// 打印：main函数
// 等待 2s ...
// 打印：并发任务
// 程序结束执行
```

:::

::: details 例子：验证开启多个协程其执行顺序为随机

> 如下：协程时会有耗，`main`函数会先执行并等待 2s 后结束，在此期间并发执行 3 个`doSomething()`函数，但执行的顺序是随机的

```go
package main

import (
	"fmt"
	"time"
)

func doSomething(index int) {
	fmt.Println("并发任务", index)
}

func main() {
	for i := 1; i <= 3; i++ {		// [!code focus]
		go doSomething(i)			// [!code focus]
	}								// [!code focus]

	fmt.Println("main函数")			 // [!code focus]

	time.Sleep(time.Second * 2)		// [!code focus]
}


// 打印：main函数
// 打印：并发任务 2
// 打印：并发任务 1
// 打印：并发任务 3
// 等待 2s ...
// 程序结束执行
```

:::

## 并发安全

多个协程 ( Goroutine ) 同时操作同一个资源时会有数据竞态问题，必须考虑并发安全性

::: tip 处理并发安全性的措施：

- 互斥锁
- 读写互斥锁
- 原子操作

:::

---

### 互斥锁

> Mutex

同一时间仅允许一个 goroutine 操作资源

利用内置[sync](../built-in-pkgs/sync.md)包的`Mutex`类型实现

```go
var lock sync.Mutex

func 操作数据的协程函数() {
	// 1. 操作数据前加锁
	lock.Lock()

	// 2. 数据操作 ...

	// 3. 操作数据后解锁
	lock.Unlock()
}
```

若对资源的操作仅为读取而不涉及修改时没有必要加锁，此时更应该使用[读写互斥锁](#读写互斥锁)

---

### 读写互斥锁

> RWMutex

允许多个 goroutine 同时读取配置数据，但在写入时仍然需要互斥访问

利用内置[sync](../built-in-pkgs/sync.md)包的`RWMutex`类型实现

```go
var lock sync.RWMutex

func 操作数据的协程函数() {
	// 1. 操作数据前加锁
	lock.Lock()

	// 2. 数据操作 ...

	// 3. 操作数据后解锁
	lock.Unlock()
}
```

---

### 原子操作

代码中加锁解锁会设计内核态的上下文切换，会比较耗时

针对基本数据类型还可以使用原则操作

利用内置[sync/atomic](../built-in-pkgs/sync.md)包实现

## 调度模型

### MPG 模式

- M：主线程
- P：程序执行的上下文
- G：协程
