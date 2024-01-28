# GO 复合数据类型

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

### 默认值

数组类型的变量不赋值时其默认值取决于元素的数据类型的默认值

```go
package main

import "fmt"

func main() {
	var a [3]int		// [!code focus]
	fmt.Println(a)

	var b [3]float64	// [!code focus]
	fmt.Println(b)

	var c [3]string		// [!code focus]
	fmt.Println(c)

	var d [3]bool		// [!code focus]
	fmt.Println(d)
}


// [0 0 0]					// [!code focus]
// [0 0 0]					// [!code focus]
// ["" "" ""]				// [!code focus]
// [false false false]		// [!code focus]
```

---

### 字面量初始化

创建数组类型的变量时元素的个数与类型必须与指明的长度与类型一致，否则报错

```go
type 数组类型 = [元素个数]元素类型

var 变量 = 数组类型{元素, 元素}	// [!code focus]

// 短变量声明写法			   // [!code focus]
变量 := 数组类型{元素, 元素}	// [!code focus]
```

::: details 例子：验证字面量初始化数组

```go
var arr = [2]string{"a", "b"}

arr := [2]string{"a", "b"}
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

使用此方法后其余没有指明索引所对应值的元素使用其数据类型的零值

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

### 默认值、nil 切片

切片类型的变量不赋值时使用零值`nil`，即创建了一个`nil`切片

```go
var 变量 切片类型
```

```go
package main

import "fmt"

func main() {
	var s []string				// [!code focus]
	fmt.Println(s, s == nil)	// [!code focus]
}


// [] true						// [!code focus]
```

::: warning

`nil`切片无法直接通过索引访问与修改元素，否则会报错

:::

---

### 字面量初始化

```go
type 切片类型 = []元素类型

var 变量 切片类型			// [!code focus] // nil 切片
var 变量 = 切片类型{}		// [!code focus] // 空切片
var 变量 = 切片类型{元素, 元素}// [!code focus]

// 短变量声明写法		// [!code focus]
变量 := 切片类型{}		// [!code focus] // 空切片
变量 := 切片类型{元素, 元素}// [!code focus]
```

::: details 例子：验证字面量初始化切片

```go
var slice []int

var slice = []int{}
var slice = []int{10, 20}

slice := []int{}
slice := []int{10, 20}

```

:::

---

### make() 初始化

也可使用`make()`方法初始化一个切片

主要用于需要预先分配底层数组、指定底层数组长度 ( [容量](#容量) ) 的情况

- 指定了参数中元素个数时，会自动给元素赋值其数据类型的零值
- 指定参数中元素个数为`0`则会创建一个空切片

```go
切片 := make(切片类型, 元素个数, [容量])
```

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

::: details 例子：验证空切片与 nil 切片

```go
package main

import "fmt"

func main() {
	// nil 切片				 // [!code focus]
	var a []string			// [!code focus]
	fmt.Println(a == nil)	// [!code focus]

	// 空切片				 // [!code focus]
	b := []string{}			// [!code focus]
	c := make([]string, 0)	// [!code focus]
	fmt.Println(b == nil, c == nil)	// [!code focus]
}


// true						// [!code focus]
// false false				// [!code focus]
```

:::

::: tip

若硬要说明`make()`比字面量写法的优点

1. 可明确指明长度与容量
2. 元素可自动使用默认值
   - `make()`可在创建切片时仅指明长度便可自动给每个元素赋值其类型的默认值
   - 而字面量写法则必须手写所有元素的默认值

```go
a := make([]string, 3)
fmt.Print(a[0], a[1], a[2])	// "" "" ""

b := []string{"", "", ""}
fmt.Print(a[0], a[1], a[2])	// "" "" ""
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

::: warning

无法通过索引直接访问与修改`nil`切片的元素，否则报错

若`nil`切片要进行元素操作只能给整体赋值，或干脆在创建时使用字面量或`make()`创建一个空切片

:::

---

### 元素修改

可通过索引直接修改元素值

切片是[引用类型数据](./division-determination-conversion.md#引用类型数据)，修改元素值会影响原本数据

```go
切片[索引] = 新值
```

但若访问的索引超过长度范围 ( 对应元素不存在 ) 则报错，比如长度为 0 的切片无法通过索引修改元素的值

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

### 默认值、nil 映射

映射类型的变量不赋值时使用零值`nil`，即创建了一个`nil`映射

```go
package main

import "fmt"

func main() {
	var m map[string]string		// [!code focus]
	fmt.Println(m, m == nil)	// [!code focus]
}


// map[] true					// [!code focus]
```

::: warning

`nil`映射无法直接通过 Hash 键访问与修改值，否则会报错

:::

---

### 字面量初始化

```go
type 映射类型 = map[键类型]值类型

var 变量 映射类型						// [!code focus] // nil 映射
var 变量 = 映射类型{}	 				// [!code focus] // 空映射
var 变量 = 映射类型{"键": 值, "键": 值}	 // [!code focus]

// 短变量声明写法						// [!code focus]
变量 := 映射类型{}						// [!code focus] // 空映射
变量 := 映射类型{"键": 值, "键": 值}	 // [!code focus]
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

也可使用`make()`方法初始化一个空映射

参数中的容量可省略，根据映射中实际存储的键值对数量进行动态调整

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

::: details 例子：验证空映射与 nil 映射

```go
package main

import "fmt"

func main() {
	var a map[string]string			// [!code focus]
	fmt.Println(a == nil)			// [!code focus]

	b := map[string]string{}		// [!code focus]
	c := make(map[string]string)	// [!code focus]
	fmt.Println(b == nil, c == nil)	// [!code focus]
}


// true
// false false
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

::: warning

无法通过 Hash 键直接访问与修改值`nil`映射的键值对，否则报错

若`nil`映射要进行键值对操作只能给整体赋值，或干脆在创建时使用字面量或`make()`创建一个空映射

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

## 指针类型

> Pointer

[更多详见](../pointer.md#指针类型)

## 结构体类型

> Struct

[更多详见](../oop/struct.md)

## 接口类型

> Interface

[更多详见](../oop/interface.md)

## 通道类型

> Channel

[更多详见](../concurrent-dev/channel.md)
