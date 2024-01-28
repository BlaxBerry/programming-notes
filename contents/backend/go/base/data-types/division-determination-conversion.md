# GO 类型分类、判断、转换

## 类型分类

- 基于数据的性质与结构可分为：
  - 基本类型数据 ( Primitive Types )
  - 复合类型数据 ( Composite Types )
- 基于数据在内存中的存储方式可分为：
  - 值类型数据 ( Value Types )
  - 引用类型数据 ( Reference Types )

---

### 基本类型数据

> Primitive Types

[更多详见](./primitive-data-types.md)

---

### 复合类型数据

> Composite Types

[更多详见](./composite-data-types.md)

---

### 值类型数据

> Value Types

值类型数据包含：[基本类型数据](./primitive-data-types.md)以及[复合类型数据](./composite-data-types.md)中的**数组**、**结构体**

值类型的变量中存储的是该数据值的副本

::: details 例子：验证值类型数据整体赋值给新变量时，新旧变量内存地址不同

因为新旧变量内存指向不同，修改互不影响

::: code-group

```go [结构体]
package main

import "fmt"

type Person struct {				// [!code focus]
	Name string						// [!code focus]
	Age  int						// [!code focus]
}									// [!code focus]

func main() {
	a := Person{Name: "A", Age: 28}	// [!code focus]
	b := a							// [!code focus]

	// 指针指向不同内存地址，互不影响
	fmt.Printf("%p\n", &a)
	fmt.Printf("%p\n", &b)

	b.Name = "B"					// [!code focus]
	b.Age = 16						// [!code focus]

	fmt.Println(a, b)
}


// 0x14000114018
// 0x14000114030
// {"A" 28} {"B" 16}
```

:::

值类型的变量自身进行修改时：

- 同一作用域下：对其修改会影响原数据，因为同一作用域下指向该的内存地址相同
- 在不同作用域下 ( [参数传递](../function-method.md#参数传递) )：对其修改不影响原数据，因为操作的只是数据值的副本

::: tip

同一作用域下字符串类型时要注意

给字符串整个重新赋值是没问题的，但是不能通过索引修改字符，会报错

[更多详见](primitive-data-types.md#修改)

:::

::: details 例子：验证同一作用域下直接修改值类型数据

::: code-group

```go [字符串]
package main

import "fmt"

func main() {
	s := "abc"          // [!code focus]
    s2 := s             // [!code focus]

    // 只影响 s 自身的值，不影响 s2 中值的副本 // [!code focus]
    s = "def"                            // [!code focus]
    fmt.Println(s, s2)

    // 只影响 s2，不影响原本数据的值 // [!code focus]
	s2 = "xyz"                  // [!code focus]
	fmt.Println(s, s2)
}


// def abc
// def xyz
```

:::

::: details 例子：验证不同作用域 ( 函数内 ) 直接修改值类型数据

::: code-group

```go [数组]
package main

import "fmt"

func main() {
	arr := [3]string{"a", "b", "c"}         // [!code focus]
	fmt.Println(arr)

	doSomething(arr)                        // [!code focus]
	fmt.Println(arr)
}

func doSomething(arr [3]string) {           // [!code focus]
	arr[0], arr[1], arr[2] = "x", "y", "z"  // [!code focus]
	fmt.Println("函数内", arr)
}                                           // [!code focus]


// [a b c]
// 函数内 [x y z]
// [a b c]
```

```go [结构体]
package main

import "fmt"

type Person struct {                    // [!code focus]
	Name string                         // [!code focus]
	Age  int                            // [!code focus]
}                                       // [!code focus]

func main() {
	p := Person{Name: "Andy", Age: 28}  // [!code focus]
    fmt.Println(p)

	doSomething(p)                      // [!code focus]
	fmt.Println(p)
}

func doSomething(p Person) {            // [!code focus]
	p.Name = "Tom"                      // [!code focus]
	p.Age = 16                          // [!code focus]
    fmt.Println("函数内", s)
}                                       // [!code focus]


// {Andy 28}
// 函数内 {Tom 16}
// {Andy 28}
```

:::

若想在不同作用域中，比如函数内中修改值类型数据的原始值可利用[指针](../pointer.md#使用)

::: details 例子：不同作用域 ( 函数内 ) 利用指针在间接修改值类型数据的值

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

---

### 引用类型数据

> Reference Types

引用类型数据包含：[复合类型数据](./composite-data-types.md)中的切片、映射、通道

引用类型的变量中存储的是该数据的引用 ( 指针的副本 )

::: details 例子：验证引用类型数据整体赋值给新变量时，新旧变量内存地址相同

因为新旧变量内存指向相同，其中任意一个修改都会影响另一个

::: code-group

```go [切片]
package main

import "fmt"

func main() {
	s1 := make([]string, 2)	// [!code focus]
	s2 := s1				// [!code focus]

	// 指针指向相同内存地址
	fmt.Printf("%p \n", s1)
	fmt.Printf("%p \n", s2)

	s2[0] = "x"				// [!code focus]
	s2[1] = "y"				// [!code focus]
	fmt.Println(s1, s2)
}


// 0x14000110210
// 0x14000110210
// ["x" "y"] ["x" "y"]
```

```go [映射]
package main

import "fmt"

func main() {
	m1 := make(map[string]string, 2)	// [!code focus]
	m2 := m1							// [!code focus]

	// 指针指向相同内存地址
	fmt.Printf("%p \n", m1)
	fmt.Printf("%p \n", m2)

	m2["a"] = "AA"						// [!code focus]
	m2["b"] = "BB"						// [!code focus]
	fmt.Println(m1, m2)
}


// 0x14000106180
// 0x14000106180
// map[a:AA b:BB] map[a:AA b:BB]
```

:::

引用类型的变量自身进行修改时：

- 同一作用域下：对其修改会影响原数据，因为底层数据的引用相同
- 在不同作用域下 ( [参数传递](../function-method.md#参数传递) )：
  - 修改其内部成员数据会影响原始数据
  - 但修改整个引用类型数据本身不会影响原始数据，相当于底层数据重新分配与原本数据并无关联了

::: details 例子：验证同一作用域下直接修改引用类型数据

::: code-group

```go [切片]
package main

import "fmt"

func main() {
	s := []string{"a", "b", "c"}            // [!code focus]
	s2 := s                                 // [!code focus]

    // 修改成员，修改了相同引用指向的相同的数据，引用相同的数据全都会改变  // [!code focus]
	s[0], s[1], s[2] = "d", "e", "f"        // [!code focus]
	fmt.Println(s, s2)
	s2[0], s2[1], s2[2] = "x", "y", "z"     // [!code focus]
	fmt.Println(s, s2)

    // 整个重新赋值，改变了自身底层数据的引用，与原本数据的引用毫无关联了 // [!code focus]
	s = []string{"1", "2", "3"}             // [!code focus]
	fmt.Println(s, s2)
	s2 = []string{"4", "5", "6"}            // [!code focus]
	fmt.Println(s, s2)
}


// [d e f] [d e f]
// [x y z] [x y z]
// [1 2 3] [x y z]
// [1 2 3] [4 5 6]
```

:::

::: details 例子：验证不同作用域 ( 函数内 ) 直接修改引用类型数据

::: code-group

```go [切片]
package main

import "fmt"

func main() {
	slice := []string{"a", "b", "c"}        // [!code focus]
	fmt.Println(slice)

    // 修改其成员有影响                        // [!code focus]
	changeElements(slice)                   // [!code focus]
	fmt.Println(slice)

    // 整个数据重新赋值并没用                   // [!code focus]
	changeEntire(slice)                     // [!code focus]
	fmt.Println(slice)
}

func changeElements(slice []string) {               // [!code focus]
	slice[0], slice[1], slice[2] = "x", "y", "z"    // [!code focus]
	fmt.Println("changeElements函数内", slice)
}                                                   // [!code focus]

func changeEntire(slice []string) {                 // [!code focus]
	slice = []string{"d", "e", "f"}                 // [!code focus]
	fmt.Println("changeEntire函数内", slice)
}                                                   // [!code focus]


// [a b c]
// changeElements函数内 [x y z]
// [x y z]
// changeEntire函数内 [d e f]
// [a b c]
```

:::

::: danger

不同作用域下 ( 函数内 )

- 修改其内部成员数据会影响原始数据
- 修改引用类型数据本身 ( 整个重新赋值 ) 不会影响原始数据

整个重新赋值相当于给重新分配了一个新的底层数据，内存地址不再相同，与原本数据的引用毫无联系。若想给切片整个重新赋值且影响到函数外的原本切片需要使用指针

:::

## 类型别名

可以增加代码的可读性

```go
type 类型别名 = 某个类型
```

> 如下：Go 内置的`byte`、`rune`类型就是整数型中`uint32`、`int32`类型的别名

```go
type byte = uint8
type rune = int32
```

## 自定义类型

```go
type 自定义类型 某个类型
```

自定义类型被视为一个新类型

::: details 例子：验证自定义与原本类型数据直接赋值会报错类型不同

```go
package main

type MyInt int	// [!code focus]

func main() {
	var a int	// [!code focus]
	var b MyInt	// [!code focus]

	a = b		// [!code focus] // [!code error]
}
```

:::

## 类型判断

有三种获取类型的方式：

- 借助包`reflect`
- 借助包`fmt`中的格式化方法
- 利用接口的类型断言

---

### reflect.TypeOf()

```go
import "reflect"
```

```go
数据的类型 := reflect.TypeOf(数据)
```

---

### fmt.Sprintf()

```go
数据的类型 := fmt.Sprintf("%T", 数据)
```

[更多详见](../built-in-pkgs/fmt.md#fmt-sprintf)

---

### 类型断言

```go
变量值, 布尔值 := 接口类型变量.(类型)
```

[更多详见](../oop/interface.md#类型断言)

## 类型转换

```go
valueOfTypeB = typeB(valueOfTypeA)
```

Go 不存在隐式数据类型转换，所有的类型转换必须显式声明

| 方法        | 含义                     |
| ----------- | ------------------------ |
| `int()`     | 转为整数`int`类型        |
| `float64()` | 转为浮点`float64`类型    |
| `string()`  | 转为字符串类型           |
| `byte()`    | 将字符串转为字节数组类型 |

结构体类型直接类型转换时，字段必须完全一致，否则报错

```go
var 结构体A的实例 结构体A
var 结构体B的实例 结构体B

结构体B的实例 = 结构体A的实例	// [!code error] // 报错
结构体B的实例 = 结构体B(结构体A的实例)
```

::: details 例子：验证字段一致的结构体间的类型转换

```go
package main

import "fmt"

type person struct {			// [!code focus]
	Name string					// [!code focus]
}								// [!code focus]

type student struct {			// [!code focus]
	Name string					// [!code focus]
}								// [!code focus]

func main() {
	p := person{Name: "xxx"}	// [!code focus]
	s := student{Name: "yyy"}	// [!code focus]

	p = s	// [!code error] // 报错
	p = person(s)				// [!code focus]
	s = person(p)				// [!code focus]
	fmt.Println(p, s)
}


// {yyy} {yyy}
```

:::

## 泛型

https://www.bilibili.com/video/BV1KG4y1f79A/?vd_source=8960252a3845b76b699282b11f36ab5c
