# reflect 包

是 Go 标准库中的一个内置包

主要用于处理反射相关的操作，实现在运行时动态获取数据的值、类型等

::: code-group

```go [导入]
package 当前包

import "reflect"     // [!code focus]
```

:::

::: warning

反射虽然很灵活，但不要滥用

- 返回值的类型错误只会在运行时才引发 Panic ，会导致基于反射的代码会比较脆弱
- 基于反射实现的代码运行速度会略慢一点

:::

## 数据的类型

### reflect.TypeOf()

用于获取数据的类型

- 方法参数为一个[空接口](../data-types/composite-data-types.md#空接口)类型的数据 ( 任意类型 )
- 方法返回值为`reflect.Type`类型的接口

```go
var 反射类型 reflect.Type = reflect.TypeOf(数据)
```

::: details 例子：验证`reflect.TypeOf()`方法的使用

```go
package main

import (
	"fmt"
	"reflect"
)

func checkType(data any) {
	rt := reflect.TypeOf(data)  // [!code focus]
	fmt.Println(rt)
}

func main() {
	checkType("")
	checkType(10)
	checkType(10.00)
	checkType(true)
	checkType([]string{})
	checkType(map[string]string{})
    checkType(struct{}{})
	checkType(struct {
		Name   string
		gender string
	}{})
}


// string
// int
// float64
// bool
// []string
// map[string]string
// struct { }
// struct { Name string; gender string }
```

:::

---

### kind()

`reflect.Type`接口上的方法

用于获取该数据的类型的基础分类

方法返回值为`reflect.Kind`类型

```go
var 反射类型 reflect.Type = reflect.TypeOf(数据)
var 具体类型 reflect.Kind = 反射类型.Kind()
```

::: details 例子：验证`Kind()`方法的使用

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	p := struct {
		Name   string
		Age    int
	}{}

	rt := reflect.TypeOf(p)	// [!code focus]
	rtk := rt.Kind()		// [!code focus]

	fmt.Println(rt)
	fmt.Println(rtk)
}


// struct { Name string; Age int }
// struct
```

:::

## 数据的值

### reflect.ValueOf()

用于获取数据的值

- 方法参数为一个[空接口](../data-types/composite-data-types.md#空接口)类型的数据数据 ( 任意类型 )
- 方法返回值为`reflect.Value`类型的接口

```go
var 反射值 reflect.Value = reflect.ValueOf(数据)
```

::: details 例子：验证`reflect.ValueOf()`方法的使用

```go
package main

import (
	"fmt"
	"reflect"
)

func checkValue(data any) {
	rv := reflect.ValueOf(data) // [!code focus]
	fmt.Println(vr)
}

func main() {
	checkValue("")
	checkValue(10)
	checkValue(10.00)
	checkValue(true)
    checkValue([]string{})
	checkValue([]string{"a", "b", "c"})
	checkValue(map[string]string{})
	checkValue(map[string]string{"name": "Andy"})
    checkValue(struct {}{})
	checkValue(struct {
		Name   string
		gender string
	}{Name: "Andy", gender: "male"})

}


// ""
// 10
// 10
// true
// []
// [a b c]
// map[]
// map[name:Andy]
// { }
// {Andy male}
```

:::

---

### isNil()

`reflect.Value`接口上的方法

用于判断数据的映射值是否为`nil`

要判断的数据的类型只能是切片、映射、指针、接口、通道、函数，否则报错

```go
var 反射值 reflect.Value = reflect.ValueOf(数据)
布尔值 := 反射值.isNil()
```

::: details 例子：验证`isNil()`方法的使用

```go
package main

import (
	"fmt"
	"reflect"
)

func CheckIsNil(data any) {
	rv := reflect.ValueOf(data) // [!code focus]
	res := rv.IsNil()			// [!code focus]
	fmt.Println(res)
}

func main() {
	var a []int
	CheckIsNil(a)
	a = []int{}
	CheckIsNil(a)

	var b map[string]string
	CheckIsNil(b)
	b = map[string]string{}
	CheckIsNil(b)

	var c *int
	CheckIsNil(c)
	x := 1
	c = &x
	CheckIsNil(c)
}


// true
// false
// true
// false
// true
// false
```

:::

## 结构体反射

---

### NumField()

`reflect.Type`接口上的方法

用于获取一个结构体的所有字段的个数，若数据不是结构体则报错 Panic

```go
var 反射类型 reflect.Type = reflect.TypeOf(结构体类型数据)
字段个数 := 反射类型.NumField()
```

---

### Field()

`reflect.Type`接口上的方法

用于根据下标获取一个结构体的指定字段的信息

- 方法参数为字段的下标序号
- 方法返回值为`reflect.StructField`类型

```go
var 反射类型 reflect.Type = reflect.TypeOf(结构体类型数据)
字段信息 := 反射类型.Field(下标)

字段信息.Index						// 字段下标
字段信息.Type						// 字段值类型
字段信息.Name						// 字段名
字段信息.Tag							// 字段 Tag 标签信息
字段信息.Tag.Get("Tag元信息中的键")	// 字段 Tag 标签中指定键的信息
```

::: details 例子：验证`Field()`方法的使用

```go
package main

import (
	"fmt"
	"reflect"
)

type Person struct {
	Name   string  `json:"username"`
	Age    int     `json:"userage"`
	gender string
	salary float64
}

func main() {
	p := Person{
		Name:   "Andy",
		Age:    28,
		gender: "male",
	}

	rt := reflect.TypeOf(p)
	fields := rt.NumField()

	for i := 0; i < fields; i++ {		// [!code focus]
		fieldInfo := rt.Field(i)		// [!code focus]

		fmt.Println(
			fieldInfo.Index,			// [!code focus]
			fieldInfo.Type,				// [!code focus]
			fieldInfo.Name,				// [!code focus]
			fieldInfo.Tag.Get("json"),	// [!code focus]
		)
	}
}


// [0] string Name username
// [1] int Age userage
// [2] string gender
// [3] float64 salary
```

:::

---

### FieldByName()

`reflect.Type`接口上的方法

用于根据字段名获取一个结构体的指定字段的信息

方法返回值为一个`reflect.StructField`类型与一个是否成功的布尔值

```go
var 反射类型 reflect.Type = reflect.TypeOf(结构体类型数据)
字段信息, ok := 反射类型.FieldByName("字段名")

字段信息.Index						// 字段下标
字段信息.Type						// 字段值类型
字段信息.Name						// 字段名
字段信息.Tag							// 字段 Tag 标签信息
字段信息.Tag.Get("Tag元信息中的键")	// 字段 Tag 标签中指定键的信息
```
