# 基本数据类型

基于数据的性质可分为：

- 基本数据类型 ( Primitive Data Types )
- [复合数据类型](./composite-data-types.md) ( Composite Data Types )

## 整数类型

整数型可细分为下列类型

- `int `为有符号整数 ( 包含负数 )
- `uint`为无符号整数

| 类型名             | 默认值 | 范围                                          | 长度  |
| ------------------ | ------ | --------------------------------------------- | ----- |
| int8               | `0`    | `-128`~`127`                                  | 8bit  |
| int16              | `0`    | `-128`~`127`                                  | 16bit |
| int / int32 / rune | `0`    | `-2147483648`～`2147483647`                   | 32bit |
| int / int64        | `0`    | `-9223372036854775808`～`9223372036854775807` | 64bit |
| uint8 / byte       | `0`    | `0`～`255`                                    | 8bit  |
| uint16             | `0`    | `0`～`65535`                                  | 16bit |
| uint / uint32      | `0`    | `0`～`4294967295`                             | 32bit |
| uint / uint64      | `0`    | `0`～`18446744073709551615`                   | 64bit |

整数类型默认为`int`，会自动根据系统区分为 32 / 64 位

整数类型的变量不赋值时自动赋值默认值`0`

```go
var 变量 int = 值
var 变量 int
```

## 浮点类型

浮点类型可细分为下列类型

| 类型名  | 默认值 | 范围                      | 长度  |
| ------- | ------ | ------------------------- | ----- |
| float32 | `0`    | `-3.403E38`～`3.403E38`   | 32bit |
| float64 | `0`    | `-1.798E308`～`1.798E308` | 64bit |

浮点类型默认为`float64`

浮点类型的变量不赋值时自动赋值默认值`0`

```go
var 变量 float64 = 值
var 变量 float64
```

## 字节类型 ( byte )

实际上是整数中[`uint8`](#整数类型)类型的别名

字节类型数据由单引号包裹的字符或范围为 0~255 的数值

字节类型的变量不赋值时自动赋值默认值`0`

字节类型多用于处理二进制数据或与底层系统进行交互

```go
var 变量 byte = '一个字符'
var 变量 byte = 数值
var 变量 byte

// 等价于
var 变量 uint8 = 值
var 变量 uint8
```

::: details 例子：验证`byte`类型实为`unit8`类型

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
    var (                               // [!code focus]
		a byte                          // [!code focus]
		b uint8                         // [!code focus]
		c byte  = 'x'                   // [!code focus]
		d byte  = 255                   // [!code focus]
		e uint8 = 255                   // [!code focus]
	)                                   // [!code focus]
	fmt.Println(a, reflect.TypeOf(a))   // [!code focus]
	fmt.Println(b, reflect.TypeOf(b))   // [!code focus]
	fmt.Println(c, reflect.TypeOf(c))   // [!code focus]
	fmt.Println(d, reflect.TypeOf(d))   // [!code focus]
	fmt.Println(e, reflect.TypeOf(e))   // [!code focus]

	var s = string(c)				    // [!code focus]
	fmt.Println(s, reflect.TypeOf(s))   // [!code focus]
}


// 0 uint8
// 0 uint8
// 120 uint8
// 255 uint8
// 255 uint8
// 'x' string
```

:::

::: details 例子：验证字符串是以字节序列的形式存储，每个字符为字节类型

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var str string = "abcd"							// [!code focus]

	for i := 0; i < len(str); i++ {					// [!code focus]
		fmt.Println(str[i], reflect.TypeOf(str[i]))	// [!code focus]
	}
}


// 97 uint8
// 98 uint8
// 99 uint8
// 100 uint8
```

:::

## 字符类型 ( rune )

实际上是整数中[`int32`](#整数类型)类型的别名

字符类型用来确保正确处理 Unicode 字符，数据的值对应 Unicode 码点

```go
var 变量 rune = "字符"
var 变量 rune = 数值
var 变量 rune

// 等价于
var 变量 int32 = 值
var 变量 int32
```

::: details 例子：验证`byte`类型实为`int32`类型

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var ( 				 			  // [!code focus]
		a rune           			  // [!code focus]
		b int32          			  // [!code focus]
		c rune  = '😂'   			  // [!code focus]
		d rune  = 128514 			  // [!code focus]
		e int32 = 128514 			  // [!code focus]
	) 								  // [!code focus]
	fmt.Println(a, reflect.TypeOf(a)) // [!code focus]
	fmt.Println(b, reflect.TypeOf(b)) // [!code focus]
	fmt.Println(c, reflect.TypeOf(c)) // [!code focus]
	fmt.Println(d, reflect.TypeOf(d)) // [!code focus]
	fmt.Println(e, reflect.TypeOf(e)) // [!code focus]
	fmt.Println(string(rune(128514))) // [!code focus]

	var s = string(c)                 // [!code focus]
	fmt.Println(s, reflect.TypeOf(s)) // [!code focus]
}


// 0 int32
// 0 int32
// 128512 int32
// 128514 int32
// 128514 int32
// 😂 string
```

:::

## 字符串类型 ( string )

字符串类型数据由双引号包裹

字符串是字节的切片，每个字符为字节类型[`byte`](#字节类型-byte) ( 整数[`uint8`](#整数类型)类型 )

字符串类型的变量不赋值时自动赋值默认值`""`

```go
var 变量 string = "值"
var 变量 string
```

---

### 长度、索引

字符串长度通过`len()`获取

```go
len(字符串)
```

字符串可通过索引获取指定字节，索引从`0`开始，若访问的索引超过长度范围则报错

```go
var 字节 byte = 字符串[索引]
```

字符串是[值类型数据](./division-determination-conversion.md#值类型数据)，无法通过索引修改字符值
，若想修改需通过指针 [更多详见](../function-method.md#参数传递)

---

### 修改

字符串是不可变的，不能通过索引修改字符，会报错

若硬要做可将字符串转换为字节数组后修改元素，然后转换回字符串

::: details 例子：自定义函数实现修改字符串中指定索引的字符

1. 创建基于字符串的字节数组
2. 将字节数组中指定索引对应的元素重新赋值为新字节
3. 将字节数组转为字符串后重新赋值给原字符串

```go
package main

import "fmt"

func main() {
	s := "abc"					// [!code focus]

	s = doSomething(s, 0, 'x')	// [!code focus]
	s = doSomething(s, 1, 'y')	// [!code focus]
	s = doSomething(s, 2, 'z')	// [!code focus]
	fmt.Println(s)
}

func doSomething(str string, index int, value byte) string { // [!code focus]
	bsa := []byte(str)										 // [!code focus]
	bsa[index] = value										 // [!code focus]
	return string(bsa)										 // [!code focus]
}															 // [!code focus]


// "xzy"
```

---

### 拼接

多个字符串可通过`+`拼接为一个新字符串

```go
新字符串 := 字符串 + 字符串
```

若想讲字符串与其他类型数据拼接可使用[`fmt.Sprint()`](../built-in-pkgs/fmt.md#fmt-sprint)

---

### 转义字符

| 常见转义字符 | 含义       |
| ------------ | ---------- |
| `"\n"`       | 换行       |
| `"\'"`       | 单引号     |
| `"\\" `      | 反斜线     |
| `"\t" `      | 横向制表符 |
| `"\r" `      | 回车       |

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
	str := "abcde"							// [!code focus]

	// 写法一								 // [!code focus]
	for i := 0; i < len(str); i++ {			// [!code focus]
		fmt.Println(i, string(str[i]))
	}										// [!code focus]

	// 写法二 								 // [!code focus]
	for i, e := range str {					// [!code focus]
		fmt.Println(i, string(e), string(str[i]))
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

## 布尔类型 ( bool )

布尔型数据只有`true`、`false`

布尔型的变量不赋值时自动赋值默认值`false`

```go
var 变量 bool = false
var 变量 bool = true
var 变量 bool
```

::: warning

Go 不允许隐式类型转换，不能直接将整数、浮点型、字符串等非布尔类型直接转换为布尔值

:::
