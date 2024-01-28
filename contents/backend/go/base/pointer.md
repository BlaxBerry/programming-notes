# GO 指针

> Pointer

指针的主要作用：

- 用于引用变量或数据的内存地址，实现直接访问、修改存储在某个内存地址上的数据
- 用于将变量的地址作为参数传递给函数，实现间接修改变量的值
- 传递指针而不是数据本身可以避免在函数调用中复制大量数据，提高性能

## 使用

使用`&`运算符可以得到一个指针，即获取一个变量的内存地址

```go
var 指针变量 *数据类型 = &数据

// 短变量声明写法
指针变量 := &数据
```

::: details 例子：验证获取并查看指针 ( 存储内存地址 )

```go
package main

import "fmt"

var a string = "hello"	// [!code focus]

func main() {
	p := &a				// [!code focus]
	fmt.Println(a, p)
}


// "hello"
// 0x14000110210
```

:::

使用`*`运算符可以对指针进行间接引用，即获取存储在指针指向地址的值

通过指针间接获取的值可被重新赋值，即修改存储在指针指向地址处的变量的值

```go
// 获取值
var 数据值 = *指针

// 修改值
*指针 = 新值
```

可用于在函数内修改[值类型数据](./data-types/division-determination-conversion.md#值类型数据)

```go
函数(&数据)

func 函数(参数 *参数类型) {
    *参数 = 新值
}
```

::: details 例子：验证利用指针在函数内修改值类型的数据

::: code-group

```go [数组]
package main

import "fmt"

func main() {
	arr := [3]string{"a", "b", "c"}					// [!code focus]
	fmt.Println(arr)

	doSomething(&arr)								// [!code focus]
	fmt.Println(arr)
}

func doSomething(arr *[3]string) {					// [!code focus]
	(*arr)[0], (*arr)[1], (*arr)[2] = "x", "y", "z"	// [!code focus]

	// 下面写法错误
	// 创建原数据值的副本并修改这个副本，而不是修改原职在内存中的存储，故不会影响原值
	// a := *arr 								    // [!code error]
	// a[0], a[1], a[2] = "x", "y", "z"				// [!code error]
}													// [!code focus]


// [a b c]
// [x y z]
```

:::

## 基本概念

### 默认值、空指针

指针类型的变量不赋值时使用零值`nil`，即创建了一个空指针

```go
var a *Person
fmt.Println(*a)	// [!code error]
```

---

### 指针类型

指针所指向的数据的类型被称为指针类型

指针类型多用于函数参数、结构体内部和动态内存分配等

```go
type 指针类型 = *数据类型
```

指针类型的变量只能被赋值为一个指针

```go
var 指针变量 指针类型		    // [!code focus]
var 指针变量 指针类型 = 指针	// [!code focus]

var 指针变量 *数据类型
var 指针变量 *数据类型 = &数据
```

指针类型的变量不赋值时使用零值`nil`

::: details 例子：以基础类型为例验证指针变量的初始化、赋值、值修改

```go
package main

import "fmt"

func main() {
	var x *int			// [!code focus] // 默认值
	fmt.Println(x)

	a := 10				// [!code focus]
	x = &a				// [!code focus] // 赋值
	fmt.Println(x, *x)  // [!code focus]

	b := 20				// [!code focus]
	x = &b				// [!code focus] // 赋值 ( 值修改 )
	fmt.Println(x, *x)  // [!code focus]
}


// <nil>
// 0x14000122010 10
// 0x1400012c018 20
```

:::

---

### 指针变量

存储指针的变量被称为指针变量

```go
var 指针变量 指针类型		    // [!code focus]
var 指针变量 指针类型 = 指针	// [!code focus]
var 指针变量 *数据类型
var 指针变量 *数据类型 = &数据

// 短变量声明写法			   // [!code focus]
指针变量 := 指针			  // [!code focus]
指针变量 := &数据
```

---

### 指针函数

指针函数返回值包含指针，返回值的类型包含指针类型

指针函数可用于定义返回值默认值为`nil`的函数

::: code-group

```go [一个返回值]
func 指针函数() 指针类型 {	// [!code focus]
	// ...				 // [!code focus]
	return 指针			  // [!code focus]
}						 // [!code focus]

func 指针函数() *数据类型 {
	// ...
	return &数据类型
}
```

```go [多个返回值 ( 错误对象 )]
func 指针函数() (指针类型, error) { // [!code focus]
	// ...						 // [!code focus]
    if 条件 {                     // [!code focus]
        return 指针, nil          // [!code focus]
    }                            // [!code focus]
	return nil, errors.New()	 // [!code focus]
}								 // [!code focus]
```

:::

::: details 例子：验证函数有多个返回值，根据条件判断给返回值赋值，并利用指针使返回值默认为`nil`

> 规定自定义函数`getHalfEven`的参数只能为偶数否则返回错误对象，调用时判断返回值中错误对象是否不为空进行对应处理

```go
package main

import (
	"errors"
	"fmt"
)

func getHalfEven(p int) (*int, error) {		  // [!code focus]
	if p%2 != 0 {							  // [!code focus]
		return nil, errors.New("不能传入奇数")	// [!code focus]
	}										  // [!code focus]

	res := p / 2							  // [!code focus]
	return &res, nil						  // [!code focus]
}

func main() {
	resPointer, err := getHalfEven(3)		// [!code focus]
	if err != nil {							// [!code focus]
		fmt.Println("3/2", err)
	} else {								// [!code focus]
		fmt.Println("3/2=", *resPointer)
	}										// [!code focus]

	resPointer, err = getHalfEven(4)		// [!code focus]
	if err != nil {							// [!code focus]
		fmt.Println("4/2", err)
	} else {								// [!code focus]
		fmt.Println("4/2=", *resPointer)
	}										// [!code focus]
}


// 3/2 不能传入奇数
// 4/2= 2
```

:::

## new()、make()

使用 new 函数或 make 函数，可以动态地在堆上分配内存，并返回指向该内存的指针

这对于创建动态大小的数据结构 ( 如切片、映射等 ) 非常有用

- make：主要用于创建切片、映射、通道等数据结构
- new：主要用于申请一个内存空间，返回给指向该内存地址的指针
