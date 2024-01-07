# 复合数据类型

基于数据的性质可分为：

- [基本数据类型](./primitive-data-types.md) ( Primitive Data Types )
- 复合数据类型 ( Composite Data Types )

## 数组类型

> Array ( 可理解为其他语言中的元组 )

数组是具有相同元素的固定长度的序列

```go
type 数组类型 = [元素个数]元素类型
```

---

### 字面量初始化

创建数组类型的变量时元素的个数与类型必须与指明的长度与类型一致，否则报错

数组类型的变量不赋值时自动创建指定个数的元素并赋值元素类型的默认值

```go
type 数组类型 = [元素个数]元素类型

var 变量 数组类型 = 数组类型{元素, 元素, 元素}
var 变量 = 数组类型{元素, 元素, 元素}

// 短变量声明写法
变量 := 数组类型{元素, 元素, 元素}
```

::: details 例子：验证字面量初始化数组

```go
var arr [2]int					// [0, 0]
var arr [2]int = [2]int{10, 20}	// [10, 20]
var arr = [2]int{10, 20}		// [10, 20]

arr := [2]int{}					// [0, 0]
arr := [2]int{10, 20}			// [10, 20]
```

:::

字面量初始化数组时若不想固定明确长度可通过`...`使数组根据赋值的元素个数自动推导长度

```go
数组 := [...]int{}
数组 := [...]int{元素, 元素}
```

::: details 例子：验证字面量初始化数组时自动推导长度

```go
package main

import "fmt"

func main() {
	a := [...]int{}			 // [!code focus]
	b := [...]int{1, 2, 3}	 // [!code focus]

	fmt.Println(a)			 // [!code focus]
	fmt.Println(b)			 // [!code focus]
}


// []
// [1 2 3]
```

:::

字面量初始化创建数组时还可指明索引对应元素的值

使用此方法后其余没有指明索引所对应值的元素使用其数据类型的默认值

```go
数组 := [元素个数]元素类型 {索引: 值, 值, 索引: 值, 值}
```

::: details 例子：验证字面量初始化数组时指定索引对应的元素值

```go
package main

import "fmt"

func main() {
	a := [5]int{0: 99}					// [!code focus]
	fmt.Println(a)

	b := [5]int{1, 2, 2: 99}			// [!code focus]
	fmt.Println(b)

	c := [5]int{1, 2, 2: 99, 4, 4: 88}	// [!code focus]
	fmt.Println(c)
}


// [99 0 0 0 0]
// [1 2 99 0 0]
// [1 2 99 4 88]
```

:::

---

<!--
### make() 初始化

数组通常使用字面量初始化的写法，因为创建时需要明确元素的值所以一般不用`make()`

```go
数组 := make(数组类型, 长度)
```
-->

### 长度、索引

数组长度通过`len()`获取

```go
len(数组)
```

数组可通过索引获取指定元素值，索引从`0`开始，若访问的索引超过长度范围则报错

```go
数组[索引]
```

---

### 元素修改

- 在同一作用域中数组的直接修改会影响原始变量，因为共享相同的内存
- 不同作用域中 ( 函数内 ) 对数组元素的直接修改不影响原始变量，除非用[指针](../pointer.md)

::: details 例子：验证不同作用域下对数组的修改，以及对原本数据的影响

::: code-group

```go [同一作用域]
package main

import "fmt"

type arrayType = [3]int			// [!code focus]

func main() {
	a := arrayType{1, 2, 3} 	// [!code focus]
	fmt.Println(a)

	// 同一作用域下可直接修改
	a[0], a[1], a[2] = 4, 5, 6	// [!code focus]
	fmt.Println(a)
}


// [1 2 3]
// [4 5 6]
```

```go [不同作用域]
package main

import "fmt"

type arrayType = [3]int					// [!code focus]

func main() {
	a := arrayType{1, 2, 3} 			// [!code focus]
	fmt.Println(a)

	// 修改的只是传入的数据的副本，不影响原本数据	// [!code focus]
	passValue(a) 						// [!code focus]
	fmt.Println(a)

	// 修改的只传入的数据的引用，会影响原本数据	// [!code focus]
	passRef(&a) 						// [!code focus]
	fmt.Println(a)
}

func passValue(a arrayType) { 			// [!code focus]
	a[0], a[1], a[2] = 4, 5, 6			// [!code focus]
}

func passRef(a *arrayType) { 			// [!code focus]
	(*a)[0], (*a)[1], (*a)[2] = 6, 7, 8	// [!code focus]

}


// [1 2 3]
// [1 2 3]
// [6 7 8]
```

:::

---

### 遍历

两种遍历方式：

1. `for...`
2. `for...` + `range` ( 推荐 )

[更多详见](../control-flows.md#for)

::: details 例子：验证两种遍历方式

```go
package main

import "fmt"

func main() {
	arr := [...]string{"a", "b", "c", "d"}	// [!code focus]

	// 写法一								 // [!code focus]
	for i := 0; i < len(arr); i++ {			// [!code focus]
		fmt.Println(i, arr[i])
	}										// [!code focus]

	// 写法二 								 // [!code focus]
	for i, e := range arr {					// [!code focus]
		fmt.Println(i, e, arr[i])
	}										// [!code focus]
}


// 0 "a"
// 1 "b"
// 2 "c"
// 3 "d"

// 0 "a" "a"
// 1 "b" "b"
// 2 "c" "c"
// 3 "d" "d"
```

:::

---

### 多维数组

```go
数组 := [外层元素个数][内层元素个数]内存元素类型 {
	{内层元素, 内层元素},
	{内层元素, 内层元素},
}
```

::: details 例子：验证多维数组的定义、遍历

```go
package main

import "fmt"

func main() {
	arr := [3][2]int{	// [!code focus]
		{1, 2},			// [!code focus]
		{3, 4},			// [!code focus]
		{5, 6},			// [!code focus]
	}					// [!code focus]
	fmt.Println(arr)

	for _, x := range arr {		// [!code focus]
		for _, y := range x {	// [!code focus]
			fmt.Print(y)
		}						// [!code focus]
		fmt.Println()
	}							// [!code focus]
}


// [[1 2] [3 4] [5 6]]
// 12
// 34
// 56
```

:::

## 切片类型

> Slice ( 可理解为其他语言中的数组列表 )

切片是具有相同元素的可变长度的数组，在底层指向一个数组

```go
type 切片类型 = []元素类型
```

---

### 字面量初始化

切片类型的变量不赋值时默认值为空切片`[]`

```go
type 切片类型 = []元素类型

var 变量 切片类型 = 切片类型{元素, 元素, 元素}
var 变量 = 切片类型{元素, 元素, 元素}

// 短变量声明写法
变量 := 切片类型{元素, 元素, 元素}
```

::: details 例子：验证字面量初始化切片

```go
var slice []int						// []
var slice []int = [2]int{10, 20}	// [10, 20]
var slice = []int{10, 20}			// [10, 20]

slice := []int{10, 20}				// [10, 20]
slice := []int{}					// []
```

:::

---

### make() 初始化

可使用`make()`初始化一个切片

主要用于需要预先分配底层数组、指定底层数组长度 ( [容量](#容量) ) 的情况，若不需要考虑容量则直接使用字面量初始化即可

```go
切片 := make(切片类型, 元素个数, [容量])
```

指定了元素个数后会自动给元素赋值其数据类型的默认值

可指定长度为`0`来创建一个空切片

```go
切片 := make(切片类型, 0)
// 等价于
切片 := 切片类型{}
```

::: details 例子：验证`make()`初始化切片

> 如下：初始化了一个空切片后利用`append()`追加元素

```go
package main

import "fmt"

func main() {
	// 初始化				 // [!code focus]
	s := make([]int, 0) 	// [!code focus]
	fmt.Println(s)

	// 追加元素		     	 // [!code focus]
	s = append(s, 1, 2, 3)	// [!code focus]
	s = append(s, 4)		// [!code focus]
	fmt.Println(s)
}


// []
// [1 2 3 4]
```

:::

---

### 长度、索引

切片长度通过`len()`获取

```go
len(切片)
```

切片可通过索引获取指定元素值，索引从`0`开始，若访问的索引超过长度范围则报错

```go
切片[索引]
```

---

### 元素修改

可通过索引直接修改元素值，但若访问的索引超过长度范围则报错

切片是[引用类型数据](./division-determination-conversion.md#引用类型数据)，修改元素值会影响原本数据

```go
切片[索引] = 新值
```

---

### 遍历

两种遍历方式：

1. `for...`
2. `for...` + `range` ( 推荐 )

[更多详见](../control-flows.md#for)

::: details 例子：验证两种遍历方式

```go
package main

import "fmt"

func main() {
	slice := []string{"a", "b", "c", "d"}	// [!code focus]

	// 写法一								 // [!code focus]
	for i := 0; i < len(slice); i++ {		// [!code focus]
		fmt.Println(i, slice[i])
	}										// [!code focus]

	// 写法二 								 // [!code focus]
	for i, e := range slice {				// [!code focus]
		fmt.Println(i, e, slice[i])
	}										// [!code focus]
}


// 0 "a"
// 1 "b"
// 2 "c"
// 3 "d"

// 0 "a" "a"
// 1 "b" "b"
// 2 "c" "c"
// 3 "d" "d"
```

:::

---

### 基于数组定义切片

从数组中根据索引截取出一个范围 ( 左闭右开 )

```go
切片 := 数组[索引:索引]
```

::: details 例子：验证截取数组中一段范围的元素生成切片

```go
package main

import "fmt"

func main() {
	arr := [...]string{"a", "b", "c", "d", "e"}	// [!code focus]

	a := arr[:]									// [!code focus]
	fmt.Println(a)

	b := arr[2:]								// [!code focus]
	fmt.Println(b)

	c := arr[2:4]								// [!code focus]
	fmt.Println(c)

	d := arr[:4]								// [!code focus]
	fmt.Println(d)

	e := arr[1 : len(arr)-1]					// [!code focus]
	fmt.Println(e)
}


// [a b c d e]
// [c d e]
// [c d]
// [a b c d]
// [b c d]
```

:::

---

### 切片元素截取

根据索引截取出一个范围的元素 ( 左闭右开 )

```go
新切片 = 切片[索引:索引]
```

::: details 例子：验证截取切片中一段范围的元素生成新切片

```go
package main

import "fmt"

func main() {
	slice := []string{"a", "b", "c", "d", "e"}	// [!code focus]

	a := slice[:]								// [!code focus]
	fmt.Println(a)

	b := slice[2:]								// [!code focus]
	fmt.Println(b)

	c := slice[2:4]								// [!code focus]
	fmt.Println(c)

	d := slice[:4]								// [!code focus]
	fmt.Println(d)

	e := slice[1 : len(arr)-1]					// [!code focus]
	fmt.Println(e)
}


// [a b c d e]
// [c d e]
// [c d]
// [a b c d]
// [b c d]
```

:::

---

### 切片元素展开

> Slice Unpacking

可以使用`...`将切片的元素展开

```go
切片...
```

比如可用于将元素逐个传递给函数的可变参数

```go
func 函数(不定参数 ...类型) {
	// ...
}

函数(切片...)
```

---

### 容量

不同于其他语言中的动态数组或列表，Go 采用了动态扩容的策略

Go 切片其底层是一个数组，有长度与容量的概念：

- 切片长度：该切片中元素的个数
- 切片容量：其底层数组的长度

可通过指定容量预先分配一定的内存，在追加元素扩展切片时 ( [`append()`](#append) ) 仅当切片长度超过容量时，Go 会重新分配比原本更大的底层数组并将原有的元素拷贝到新的底层数组中。这样一来可以确保在追加元素时不会频繁地重新分配内存，从而实现更加高效地管理内存

切片的容量可通过`cap()`方法获取

```go
cap(切片)
```

```go
s := []int{1, 2, 3}
fmt.Println(len(s)) // 3
fmt.Println(cap(s)) // 3

s = append(s, []int{4, 5}...)
fmt.Println(len(s)) // 5，切片长度变为 5
fmt.Println(cap(s)) // 6，容量超过原来的 3，重新分配了内存
```

---

### append()

`append()`方法可用于：

- 向切片中添加元素 ( 重新赋值 )
- 删除指定位置的元素 ( 拼接除指定索引元素以外其他元素为一个新切片后重新赋值 )

方法返回一个新切片

```go
新切片 := append(切片, 新元素, 新元素)
新切片 := append(切片, 其他切片...)
```

可将方法返回值重新赋值给原本切片来实现对原切片的修改

```go
原本切片 = append(原本切片, 新元素, 新元素)
原本切片 = append(原本切片, 其他切片...)
```

::: details 例子：验证追加元素

```go
package main

import "fmt"

func main() {
	slice := []string{"a", "b", "c"}		// [!code focus]

	fmt.Println(append(slice, "d", "e"))	// [!code focus]

	a := []string{"f", "g"}
	fmt.Println(append(slice, a...))		// [!code focus]

	fmt.Println(slice)
}


// [a b c d e]
// [a b c f g]
// [a b c]
```

:::

删除切片中元素可利用[切片元素截取](#切片元素截取)获取除指定索引外其他所有元素后拼接为一个新切片，然后重新赋值给原本切片来实现

```go
原本切片 = append(原本切片[:目标元素索引], 原本切片[目标元素索引+1:]...)
```

::: details 例子：自定义一个删除指定索引的函数

```go
package main

import "fmt"

func removeElement(slice []int, index int) []int {		// [!code focus]
	if index < 0 || index >= len(slice) {				// [!code focus]
		return slice									// [!code focus]
	}													// [!code focus]

	return append(slice[:index], slice[index+1:]...)	// [!code focus]
}														// [!code focus]

func main() {
	slice := []int{1, 2, 3, 4, 5}						// [!code focus]

	slice = removeElement(slice, 2)						// [!code focus]
	fmt.Println(slice)

	slice = removeElement(slice, 2)						// [!code focus]
	fmt.Println(slice)
}



// [1 2 4 5]
// [1 2 5]
```

:::

---

### copy()

`copy()`可用于复制源切片的元素到目标切片

方法有返回值，返回复制的元素个数

拷贝的仅为数据值而不是内存地址，修改新切片不会影响源切片

```go
// 1. 创建一个基于源切片的空切片作为目标切片
目标切片 := make(源切片类型, 源切片长度)

// 2. 将源切片复制给目标切片
copy(目标切片, 源切片)
```

::: details 例子：验证拷贝切片的值

```go
package main

import "fmt"

type T = []int				// [!code focus]

func main() {
	a := T{1, 2, 3}			// [!code focus]
	b := make(T, len(a))	// [!code focus]

	copy(b, a)				// [!code focus]
	fmt.Println(b)
	fmt.Println(&b == &a)	// [!code focus] // 指针指向的内存地址不同
}


// [1 2 3]
// false
```

:::

## 映射类型

> Map

映射一种是无序的基于键值对的数据结构，其底层数据结构实际上是一个哈希表

映射中每个键都是唯一，所有值的数据类型都相同

```go
type 映射类型 = map[键类型]值类型
```

---

### 字面量初始化

```go
type 映射类型 = map[键类型]值类型

var 变量 映射类型 = 映射类型{"键": 值, "键": 值}
var 变量 = 映射类型{"键": 值, "键": 值}

//  短变量声明写法
变量 := 映射类型{"键": 值, "键": 值}
```

::: details 例子：验证字面量初始化映射

```go
package main

import "fmt"

func main() {
	m := map[string]int{	// [!code focus]
		"a": 1,				// [!code focus]
		"b": 2,				// [!code focus]
		"c": 3,				// [!code focus]
	}						// [!code focus]

	fmt.Println(m)
}


// map[a:1 b:2 c:3]
```

:::

---

### make() 初始化

可使用`make()`初始化一个空映射

也可可不考虑容量问题，根据映射中实际存储的键值对数量进行动态调整

```go
变量 := make(映射类型, [容量])

// 等价于
变量 := 映射类型{}
```

::: details 例子：验证`make()`初始化映射与键值对的追加

```go
package main

import "fmt"

func main() {
	// 初始化					 	// [!code focus]
	m := make(map[string]int)      // [!code focus]
	fmt.Println(m)

	// 追加键值对				     // [!code focus]
	m["a"] = 1					   // [!code focus]
	m["b"] = 1					   // [!code focus]
	m["c"] = 1					   // [!code focus]
	fmt.Println(m)
}


// map[]
// map[a:1 b:1 c:1]
```

:::

---

### 增删改查

```go
// 追加 / 修改
映射["键"] = 值

// 删除
delete(映射, "键")

// 查看是否存在
value, exists := 映射["键"]
_, exists := 映射["键"]
```

- 访问映射的键时，若键不存在则获取到的是值类型的默认值
- 可通过键直接修改对应值
- 映射是[引用类型数据](./division-determination-conversion.md#引用类型数据)，，修改元素值会影响原本数据

::: details 例子：验证映射中键值对的增删改查

```go
package main

import "fmt"

func main() {
	m := map[string]int{	// [!code focus]
		"a": 1,				// [!code focus]
		"b": 1,				// [!code focus]
		"c": 1,				// [!code focus]
	}						// [!code focus]
	fmt.Println(m)

	// 修改
	m["a"] = 3 				// [!code focus]
	fmt.Println(m)

	// 追加
	m["x"] = 999 			// [!code focus]
	fmt.Println(m)

	// 删除
	delete(m, "b") 			// [!code focus]
	delete(m, "c") 			// [!code focus]
	delete(m, "x") 			// [!code focus]
	fmt.Println(m)

	// 检查是否存在
	value, exist := m["a"] 			// [!code focus]
	fmt.Println("a", exist, value)

	value, exist = m["x"] 			// [!code focus]
	fmt.Println("x", exist, value)	// [!code focus] // 获取默认值 0
}


// map[a:1 b:1 c:1]
// map[a:3 b:1 c:1]
// map[a:3 b:1 c:1 x:999]
// map[a:3]
// "a" true 3
// "x" false 0
```

:::

---

### 遍历

映射中键值对的遍历使用`for...`+`range`

[更多详见](../control-flows.md#关键字-range)

::: details 例子：验证遍历映射键值对

```go
package main

import "fmt"

func main() {
	m := map[string]string{	// [!code focus]
		"a": "A",			// [!code focus]
		"b": "B",			// [!code focus]
		"c": "C",			// [!code focus]
	}						// [!code focus]

	for k, v := range m {	// [!code focus]
		fmt.Println(k, v)	// [!code focus]
	}						// [!code focus]
}


// "a" "A"
// "b" "B"
// "c" "C"
```

:::

## 结构体类型

> Struct

结构体是 Go 中[面向对象](../oop.md)的实现

结构体是一种自定义类型，使用关键字`type`与`struct`创建

```go
type 结构体类型 struct {
    字段 类型
    字段 类型
}
```

- 结构体利用字段实现多个不同类型数据的存储
- 结构体也常用于 JSON 格式数据的存储

---

### 字面量创建实例

```go
var 实例 结构体类型 = 结构体类型 {字段: 值, 字段: 值}
var 实例 = 结构体类型 {字段: 值, 字段: 值}

// 短变量声明写法
实例 := 结构体类型 {字段: 值, 字段: 值}
```

也可创建空结构体实例然后手动追加字段

没赋值的字段自动使用对应类型的默认值

```go
var 实例 结构体类型
实例.字段 = 值

// 短变量声明写法
实例 := 结构体类型 {}
实例.字段 = 值
```

::: details 例子：验证字面量创建结构体实例

```go
package main

import "fmt"

type person struct {		// [!code focus]
	Name string				// [!code focus]
	Age  int				// [!code focus]
}							// [!code focus]

func main() {
	// 创建并初始化	     	  // [!code focus]
	a := person{Name: "A"}	// [!code focus]
	fmt.Println(a)

	// 手动追加	   			 // [!code focus]
	b := person{}			// [!code focus]
	b.Name = "B"
	fmt.Println(b)
}


// {A 0}
// {B 0}
```

:::

---

### new() 创建实例

也可使用`new()`创建结构体实例对象的指针

1. 先创建空结构体实例的指针

```go
var 实例的指针 *结构体类型 = new(结构体类型)

// 短变量声明写法
实例的指针 := new(结构体类型)
```

2. 然后给指针对应值追加字段

```go
*实例的指针.字段 = 值

// 可简写为 ( Go 底层做了方便书写的转化，但实质上不变还是通过指针修改对应的值 )
实例的指针.字段 = 值
```

::: details 例子：验证`new()`创建结构体实例

```go
package main

import "fmt"

type person struct {	// [!code focus]
	Name string			// [!code focus]
	Age  int			// [!code focus]
}						// [!code focus]

func main() {
	p := new(person)	// [!code focus]
	fmt.Println(*p)

	(*p).Name = "xx"	// [!code focus]
	fmt.Println(*p)

	p.Age = 18			// [!code focus]
	fmt.Println(*c)
}


// {"" 0}
// {"C" 0}
// {"C" 18}
```

:::

---

### 匿名结构体

可用于结构体类型不需要在外部单独定义的场合

```go
var 变量 struct {
    字段 类型
    字段 类型
}

var 变量 struct {
    字段 类型
    字段 类型
} = {
    字段 类型
    字段 类型
}
```

---

### 字段访问

```go
结构体类型数据.字段名
```

结构体类型中首字母大写的字段可在其他包中获取，首字母小写的字段则不能

关于模块化开发 [更多详见](../modules-dev/pkg-module-workspace.md)

::: details 例子：验证结构体的定义与成员访问

> 如下：私有成员`accountBalance`、`personalSalary`无法被访问

::: code-group

```shell [目录]
|- common
    |- types.go
    |- constants.go
|- main.go
```

```go [common/type.go]
package common

type Person struct {
	Name           string
	Age            int
	accountBalance int
	personalSalary int
}
```

```go [common/constants.go]
package common

var Andy = Person{
	Name:           "Andy",
	Age:            28,
	accountBalance: 200000,
	personalSalary: 5000,
}
```

```go [main.go]
package main

import (
	"demo/common"
	"fmt"
)

func main() {
	andy := common.Andy
	fmt.Println(andy)
	fmt.Println(andy.Age, andy.Name)
	fmt.Println(andy.accountBalance, andy.personalSalary) // [!code error] // 私有属性报错 undefined
}
```

:::

---

### 字段修改

- 在同一作用域中对结构体字段的直接修改会影响原始变量，因为共享相同的内存
- 不同作用域中 ( 函数内 ) 对结构体字段的直接修改不影响原始变量，除非用[指针](../pointer.md)

:::details 例子：验证不同作用域下对结构体的修改，以及对原本数据的影响

::: code-group

```go [同一作用域]
package main

import "fmt"

type person struct {					// [!code focus]
	Name string							// [!code focus]
	Age  int   							// [!code focus]
}										// [!code focus]

func main() {
	p := person{Name: "Andy", Age: 28}  // [!code focus]
	fmt.Println(p)

	// 同一作用域下可直接修改				// [!code focus]
	p.Name = "Tom" 						// [!code focus]
	p.Age = 16     						// [!code focus]
	fmt.Println(p)
}


// {Andy 28}
// {Tom 16}
```

```go [不同作用域]
package main

import "fmt"

type person struct { 					// [!code focus]
	Name string 						// [!code focus]
	Age  int    						// [!code focus]
} 										// [!code focus]

func main() {
	p := person{Name: "Andy", Age: 28} // [!code focus]
	fmt.Println(p)

	// 修改的只是传入的数据的副本，不影响原本数据	// [!code focus]
	passValue(p) 						// [!code focus]
	fmt.Println(p)

	// 修改的只传入的数据的引用，会影响原本数据	// [!code focus]
	passRef(&p) 						// [!code focus]
	fmt.Println(p)
}

func passValue(p person) { 				// [!code focus]
	p.Name = "Tom" 						// [!code focus]
	p.Age = 16     						// [!code focus]
}

func passRef(p *person) { 				// [!code focus]
	p.Name = "Jack" 					// [!code focus]
	p.Age = 24     						// [!code focus]
}


// {Andy 28}
// {Andy 28}
// {Jack 24}
```

:::

---

### 同字段结构体强转换

字段完全一致的两个结构体类型数据不能相互赋值，但是强制类型转换后便可赋值

```go
type 结构体A struct {
	字段 类型
}
type 结构体B struct {
	字段 类型
}

结构体A的实例 := 结构体A {字段: 值}
结构体B的实例 = 结构体B(结构体A的实例 )
```

::: details 例子：验证字段一致的结构体进行类型转换

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

---

### 结构体方法

结构体方法是关联到指定结构体类型上的方法，可通过实例调用

结构体方法定义时需利用[方法接收者](../function-method.md#方法接收者)指明该方法要关联的结构体

结构体方法的接收者即为调用该方法的结构体实例，因为实例是值类型数据无法在该结构体方法中直接修改实例的字段，所以若想在该放哪修改实例的值必需借助[指针](./pointer.md)

```go
type 结构体类型 struct {
	字段 类型
}

// 值接收者的结构体方法
func (接收者 结构体类型) 方法名([参数 参数类型]) [返回值] {
	// ...
}

// 指针接收者的结构体方法
func (接收者 *结构体类型) 方法名([参数 参数类型]) [返回值] {
	(*接收者).字段 = 新值
	// 可简写为 ( Go 底层做了方便书写的转化 )
	接收者.字段 = 新值
}
```

结构体方法通过结构体实例调用

```go
结构体实例 := 结构体类型{字段: 值}

(&结构体实例).结构体方法([参数])
// 可简写为 ( Go 底层做了方便书写的转化 )
结构体实例.结构体方法([参数])
```

::: details 例子：验证值接收者的结构体方法

```go
package main

import "fmt"

type Person struct {							// [!code focus]
	Name string									// [!code focus]
}												// [!code focus]

func (p Person) sayHello() {					// [!code focus]
	fmt.Printf("%v say \"Hello\"\n", p.Name)	// [!code focus]
}												// [!code focus]

func (p Person) say(msg string) {				// [!code focus]
	fmt.Println(msg)							// [!code focus]
}												// [!code focus]

func main() {
	p := Person{Name: "xxx"}					// [!code focus]

	p.sayHello()								// [!code focus]
	p.say("哈哈哈")								 // [!code focus]

}


// "xxx say "Hello"""
// "哈哈哈"
```

:::

::: details 例子：验证值接收者与指针接收者的结构体方法修改实例的字段

```go
package main

import "fmt"

type Person struct {							// [!code focus]
	Name string									// [!code focus]
}												// [!code focus]

// 值接收者的结构体方法								 // [!code focus]
func (p Person) updateDirectly(v string) {		 // [!code focus]
	p.Name = v									 // [!code focus]
}												 // [!code focus]

// 指针接收者的结构体方法							 // [!code focus]
func (p *Person) updateByPointer(v string) {	 // [!code focus]
	(*p).Name = v								 // [!code focus]
}												 // [!code focus]

func main() {
	p := Person{Name: "xxx"}		 // [!code focus]
	fmt.Println(p)

	p.updateDirectly("yyy")			 // [!code focus]
	fmt.Println(p)

	(&p).updateByPointer("zzz")		 // [!code focus]
	fmt.Println(p)
	// 简写							  // [!code focus]
	p.updateByPointer("ooo")		 // [!code focus]
	fmt.Println(p)
}


// {xxx}
// {xxx}
// {zzz}
// {ooo}
```

:::

::: details 例子：利用结构体定义不同学生的实例，并调用结构体方法获取数据以及更新实例的值

```go
package main

import "fmt"

type Student struct {               // [!code focus]
	Name  string                    // [!code focus]
	Score float64                   // [!code focus]
}                                   // [!code focus]

func (s Student) GetInfo() string {                                     // [!code focus]
	return fmt.Sprintf("Name:\t%s\nScore:\t%.2f\n", s.Name, s.Score)    // [!code focus]
}                                                                       // [!code focus]

func (s Student) UpdateScore(value float64) {   // [!code focus]
	s.Score = value                             // [!code focus]
}                                               // [!code focus]

func main() {
	andy := Student{Name: "Andy"}   // [!code focus]
	tom := Student{Name: "Tom"}     // [!code focus]

	andy.UpdateScore(96.6)          // [!code focus]
	tom.UpdateScore(44.5)           // [!code focus]

	fmt.Println(andy.GetInfo())     // [!code focus]
	fmt.Println(tom.GetInfo())      // [!code focus]
}


// Name:   Andy
// Score:  0.00

// Name:   Tom
// Score:  0.00
```

:::

---

### JSON 格式

借助内置包`encoding/json`中的方法实现结构体与 JSON 格式的转换：

- 序列化 ( 结构体 → JSON )：`json.Marshal()`
- 反序列化 ( JSON → 结构体 )：`json.Unmarshal()`

::: code-group

```go [序列化]
type 结构体类型 struct {
	公有字段 类型 `json:"JSON格式中使用的字段名",db:"数据库中使用的字段名",ini:"配置文件中使用的字段名"`
}


结构体数据 := 结构体{
	字段: 值,
}

if 字节切片, 错误对象 := json.Marshal(结构体数据); 错误对象 != nil {
	// ...
} else {
	json字符串 := string(字节切片)
}
```

```go [反序列化]
type 结构体 struct {
	公有字段 类型 `json:"JSON格式中使用的字段名",db:"数据库中使用的字段名",ini:"配置文件中使用的字段名"`
}


结构体数据 := 结构体{}

if 错误对象 := json.Unmarshal(字节切片, &结构体数据); 错误对象 != nil {
	// ...
}
```

:::

::: tip

- 因为是借助外部包来实现的，所以结构体中字段需要首字母大写，否则无法被外部包获取
- 因为结构体是值类型数据，反序列化时传入函数的参数必须是指针，否则无法将处理结果赋值出来

:::

::: details 例子：验证结构体 → JSON 与 JSON → 结构体

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {				// [!code focus]
	Name   string   `json:"name"`	// [!code focus]
	Age    int      `json:"age"`	// [!code focus]
	Skills []string `json:"skills"`	// [!code focus]
}									// [!code focus]

func main() {
	// 序列化										 // [!code focus]
	p := Person{									// [!code focus]
		Name:   "Andy",								// [!code focus]
		Age:    28,									// [!code focus]
		Skills: []string{"JS", "TS"},				// [!code focus]
	}												// [!code focus]
	if bts, err := json.Marshal(p); err != nil {	// [!code focus]
		fmt.Println(err)
	} else {										// [!code focus]
		fmt.Println(bts)
		fmt.Println(string(bts))				    // [!code focus]
	}												// [!code focus]

	// 反序列化												      // [!code focus]
	str := `{"name":"Tom","age":16,"skills":["Python","Go"]}`	// [!code focus]
	btss := []byte(str)											// [!code focus]
	s := Person{}												// [!code focus]
	if err := json.Unmarshal(btss, &s); err != nil {			// [!code focus]
		fmt.Println(err)
	} else {
		fmt.Println(s)
	}															// [!code focus]
}


// [123 34 110 97 109 101 34 58 34 65 110 100 121 34 44 34 97 103 101 34 58 50 56 44 34 115 107 105 108 108 115 34 58 91 34 74 83 34 44 34 84 83 34 93 125]
// {"name":"Andy","age":28,"skills":["JS","TS"]}
// {Tom 16 [Python Go]}
```

:::

## 接口类型

> Interface

```go
type any = interface {}
```

## 通道类型

> Channel
