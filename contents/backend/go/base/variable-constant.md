# GO 变量、常量

## 变量

- 变量能被重新赋值相同类型的值
- 变量名使用小驼峰命名 ( camelCase )

---

### 关键字 var

变量可使用`var`关键字创建

```go
// 指定类型并赋值
var 变量 类型 = 值

// 仅赋值 ( 根据值自动推导类型 )
var 变量 = 值

// 仅指定类型 ( 根据类型自动赋值该类型数据的默认值 )
var 变量 类型
```

可使用逗号间隔同时定义多个相同类型的变量

或使用大括号代码块的形式同时定义多个不同类型的变量

```go
// 写法一 ( 类型必须相同 )
var 变量, 变量, 变量 相同类型 = 相同的值, 相同的值, 相同的值
var 变量, 变量, 变量 相同类型
var 变量, 变量, 变量 = 相同的值, 相同的值, 相同的值

// 写法二
var (
    变量 类型 = 值
    变量 类型
    变量 = 值
)
```

::: details 例子：验证同时创建多个变量与打印其值

```go
package main

import "fmt"

func main() {
	doSomething()
}

func doSomething() {
	var (                   // [!code focus]
		a string = "xxx"    // [!code focus]
		b int               // [!code focus]
		c = true            // [!code focus]
	)                       // [!code focus]
	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)
}


// "xxx"
// 0
// true
```

:::

---

### 短变量声明

> short variable declaration

变量还可使用`:=`来创建（ 可视为变量定义的语法糖 ）

短变量声明的写法在声明变量的同时赋值，并根据初始值推导变量类型

- 短变量声明方法只能用于函数内部，而不能用于声明包级别的变量
- 短变量声明变量之前若已有`var`创建的同名变量，则会报错无法重复声明

```go
func 函数() {
    变量 := 值
}
```

可使用逗号间隔同时定义多个变量

```go
func 函数() {
    变量, 变量, 变量 := 值, 值, 值
}
```

::: details 例子：验证在`main`函数与自定义函数中使用短变量声明写法

```go
package main

import (
	"fmt"
)

func main() {
	a := 1                  // [!code focus]
	res := doSomething(a)   // [!code focus]
	fmt.Println(res)
}

func doSomething(a int) int {
	b := 10                 // [!code focus]
	return a + b
}


// 11
```

:::

::: details 例子：交换变量值

```go
package main

import (
	"fmt"
)

func main() {
	a := 1                  // [!code focus]
	b := 2                  // [!code focus]
    c := 3                  // [!code focus]

	a, b = b, a             // [!code focus]
	fmt.Println(a, b)

    a, b, c = b, c, a       // [!code focus]
	fmt.Println(a, b, c)
}


// 2 1
// 3 1 2
```

:::

---

### 匿名变量

可利用空白标识符`_`表示匿名变量

匿名变量不占内存空间也不能被访问也不会存在重复声明的问题，可理解为仅仅是一个占位

::: details 例子：利用匿名变量作为占位

```go
package main

import (
	"fmt"
)

func main() {
	a, _, c := 1, 2, 3              // [!code focus]
	fmt.Println(a, c)

    _, msg := doSomething()         // [!code focus]
	fmt.Println(msg)

    arr := []string{"a", "b", "c"}  // [!code focus]
	for _, element := range arr {   // [!code focus]
		fmt.Println(element)
	}                               // [!code focus]
}

func doSomething() (int, string) {
	return 100, "xxx"
}


// 1 3
// "xxx"
```

:::

---

### 变量作用域

- 全局变量
  - 使用`var`创建
  - 可定义在外部一个源文件中
  - 包文件通过`import`导入其所属的包后使用
- 局部变量
  - 可使用`var`或`:=`创建
  - 定义在函数内，仅可在该函数内使用
  - 局部变量会覆盖全局变量

## 常量

- 常量只能用于声明[基本数据类型](./data-types/primitive-data-types.md)或[枚举](#关键字-iota)
- 创建常量时必须赋值否则报错
- 常量的值必须是编译时期可确定的否则报错 ( 不能赋值为运行时期确定的数据，比如一个函数 )
- 常量不能被重新赋值否则报错
- 常量名使用小驼峰命名 ( camelCase )

---

### 关键字 const

变量使用`const`关键字创建

```go
// 指定类型并赋值
const 常量 类型 = 值

// 仅赋值 ( 根据值自动推导类型 )
const 常量 = 值
```

可使用逗号间隔或使用大括号代码块的形式同时定义多个常量

- 使用逗号间隔定义时，类型必须一致
- 使用代码块定义时，可省略类型与赋值，会默认使用前一个常量的值与类型

```go
// 写法一
const 变量, 变量, 变量 相同类型 = 相同的值, 相同的值, 相同的值
const 常量, 常量 = 值, 值

// 写法二
const (
    常量 类型 = 值
	常量
	常量
	常量 = 值
)
```

---

### 关键字 iota

作为常量`const`代码块的索引计数器

代码块中的`iota`初始值为`0`，代码块中每新增一行值 +1

Go 没有显示的枚举类型，可利用`iota`实现类似枚举值的定义

```go
const (
	常量 = iota
    常量 = 基于 iota 计算后的值
)
```

::: details 例子：验证`iota`是个计数器

::: code-group

```go [默认值为初始值]
package main

import "fmt"

func main() {
	const (					// [!code focus]
		a = iota			// [!code focus]
		b					// [!code focus]
		c					// [!code focus]
		d					// [!code focus]
	)						// [!code focus]
	fmt.Println(a, b, c, d)
}


// 0 1 2 3
```

```go [计算后用作初始值]
package main

import "fmt"

func main() {
	const (					// [!code focus]
		a = (iota + 1) * 10	// [!code focus]
		b					// [!code focus]
		c = iota			// [!code focus]
		d					// [!code focus]
	)						// [!code focus]
	fmt.Println(a, b, c, d)
}


// 10 20 2 3
```

```go [中途改赋其他值]
package main

import "fmt"

func main() {
	const (					// [!code focus]
		a = iota 			// [!code focus]
		b					// [!code focus]
		c = "xxx"			// [!code focus]
		d					// [!code focus]
		e = "yyy"			// [!code focus]
		f = iota			// [!code focus]
		g					// [!code focus]
	)						// [!code focus]
	fmt.Println(a, b, c, d, e, f, g)
}


// 0 1 xxx xxx yyy 5 6
```

:::

::: details 例子：定义枚举值 ( 周日期等 )

```go
// genders
const (
	Male = iota			// 0
	Female				// 1
)

// weeks
const (
    Monday = iota + 1	// 1
    Tuesday				// 2
    Wednesday			// 3
	// ...
)
```

:::
