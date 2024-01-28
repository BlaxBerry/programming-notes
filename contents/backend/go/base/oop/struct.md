# GO 结构体

> Struct

Go 没有传统面向对象中类 ( Class ) 的概念，而是使用结构体来实现类似功能

- 通过创建结构体类型的变量来实现[实例化](#结构体实例)
- 通过[工厂模式](#工厂模式)来实现类似构造函数的功能
- 通过[结构体字段](#结构体字段)来存储多个不同类型的数据 ( 类的实例属性 )
- 通过[结构体方法](#结构体方法)来给结构体类型的数据绑定关联的行为 ( 类的实例方法 )

## 定义结构体

结构体是一种[自定义数据类型](../data-types/division-determination-conversion.md#自定义类型)，使用关键字`type`与`struct`创建

```go
// 具名
type 结构体类型 struct {
    字段 类型
    字段 类型
}

// 匿名
struct {
    字段 类型
    字段 类型
}
```

---

### 匿名结构体

用于不需要在外部单独定义结构体类型的场合

```go
var 变量 struct{字段 类型}
var 变量 = struct{字段 类型}{字段 类型}

// 短变量声明写法
变量 := struct{字段 类型}{字段 类型}
```

## 结构体实例

结构体类型变量即结构体实例，定义结构体类型的变量即实例化

创建实例对象时若不给字段赋值，则字段默认为其数据类型的零值

---

### 创建

::: tip 创建结构体类型变量 ( 实例 ) 的四种方法：

1. 字面量创建同时字段赋值
2. 字面量创建空实例后字段赋值
3. 字面量创建实例指针后字段赋值
4. `new()`方法创建实例指针后字段赋值

:::

1. 创建同时给字段赋值

```go
var 实例 结构体类型 = 结构体类型{字段: 值}
var 实例 = 结构体类型{字段: 值}

// 短变量声明写法
实例 := 结构体类型{字段: 值}
```

::: details 例子：验证方法一

```go
package main

import "fmt"

type Person struct {    // [!code focus]
	Name string         // [!code focus]
	Age  int            // [!code focus]
}                       // [!code focus]

func main() {
	var a Person = Person{Name: "A", Age: 28}   // [!code focus]
	b := Person{Name: "B", Age: 16}             // [!code focus]

	fmt.Println(a)
	fmt.Println(b)
}


// {"A" 28}
// {"B" 16}
```

:::

2. 创建空实例后逐一给字段赋值

```go
var 实例 结构体类型
实例.字段 = 值

// 短变量声明写法
实例 := 结构体类型{}
实例.字段 = 值
```

::: details 例子：验证方法二

```go
package main

import "fmt"

type Person struct {    // [!code focus]
	Name string         // [!code focus]
	Age  int            // [!code focus]
}                       // [!code focus]

func main() {
	var a Person        // [!code focus]
	b := Person{}       // [!code focus]

	fmt.Println(a)
	fmt.Println(b)

	a.Name = "A"        // [!code focus]
	a.Age = 28          // [!code focus]
	b.Name = "B"        // [!code focus]
	b.Age = 16          // [!code focus]

	fmt.Println(a)
	fmt.Println(b)
}


// {"" 0}
// {"" 0}
// {"A" 28}
// {"B" 16}
```

:::

3. 创建实例的指针后逐一给字段赋值

```go
var 实例指针 *结构体类型 = &结构体类型{}  // [!code focus]
(*实例指针).字段 = 值                   // [!code focus]
实例指针.字段 = 值  // 为了开发者方便书写 Go 底层做了转换

// 短变量声明写法                       // [!code focus]
实例指针 := &结构体类型{}                // [!code focus]
(*实例指针).字段 = 值                   // [!code focus]
实例指针.字段 = 值  // 为了开发者方便书写 Go 底层做了转换
```

::: details 例子：验证方法三

```go
package main

import "fmt"

type Person struct {        // [!code focus]
	Name string             // [!code focus]
	Age  int                // [!code focus]
}                           // [!code focus]

func main() {
	var a *Person = &Person{} // [!code focus]
	b := &Person{}            // [!code focus]

	fmt.Println(a, *a)
	fmt.Println(b, *b)

	(*a).Name = "A"             // [!code focus]
	(*a).Age = 26               // [!code focus]
	b.Name = "B"                // [!code focus]
	b.Age = 16                  // [!code focus]

	fmt.Println(*a)
	fmt.Println(*b)
}


// &{"" 0} {"" 0}
// &{"" 0} {"" 0}
// {"A" 26}
// {"B" 16}
```

:::

4. 也可使用`new()`创建结构体实例对象的指针后赋值

- 方法接收结构体的类型
- 方法返回的是结构体类型的指针

```go
var 实例指针 *结构体类型 = new(结构体类型)  // [!code focus]
(*实例指针).字段 = 值                     // [!code focus]
实例指针.字段 = 值  // 为了开发者方便书写 Go 底层做了转换

// 短变量声明写法                       // [!code focus]
实例指针 := new(结构体类型)             // [!code focus]
(*实例指针).字段 = 值                   // [!code focus]
实例指针.字段 = 值  // 为了开发者方便书写 Go 底层做了转换
```

::: details 例子：验证方法四

```go
package main

import "fmt"

type Person struct {        // [!code focus]
	Name string             // [!code focus]
	Age  int                // [!code focus]
}                           // [!code focus]

func main() {
	var a *Person = new(Person) // [!code focus]
	b := new(Person)            // [!code focus]

	fmt.Println(a, *a)
	fmt.Println(b, *b)

	(*a).Name = "A"             // [!code focus]
	(*a).Age = 26               // [!code focus]
	b.Name = "B"                // [!code focus]
	b.Age = 16                  // [!code focus]

	fmt.Println(*a)
	fmt.Println(*b)
}


// &{"" 0} {"" 0}
// &{"" 0} {"" 0}
// {"A" 26}
// {"B" 16}
```

:::

---

### 工厂模式

> 可理解为其他面向对象语言中的构造函数

结构体实例的创建还可通过工厂模式模拟构造函数的功能来实现

::: tip

- 工厂模式可用于在跨包时创建非公开私有成员的结构体的实例
- 也可实现在跨包时对公有成员的结构体中私有字段的赋值

:::

- 外部调用工厂模式函数并传入字段的值，获取结构体实例的指针
- 工厂模式函数参数接收结构体字段的值，基于参数创建结构体类型变量 ( 实例 )
- 工厂模式函数返回结构体实例的指针 ( 通过[指针](../pointer.md)实现数据的获取以及修改 )

```go
type 结构体类型 struct {
	字段 类型
}

func 工厂模式函数(参数 结构体字段类型) *结构体类型 {   // [!code focus]
	return &结构体类型{						  // [!code focus]
		字段 参数,							  // [!code focus]
	}										// [!code focus]
}											// [!code focus]

结构体实例的指针 := 工厂模式函数(字段的值)			 // [!code focus]
结构体实例 := *结构体实例的指针		 		    // [!code focus]
```

::: details 例子：验证跨包时利用工厂模式创建非公开的结构体的实例，以及字段为私有成员的结构体的实例

- `pkg`包中定义两个结构体与其工厂模式函数
- 其中结构体`person`为包的非公开私有成员，结构体`Dog`为包的公有成员但其字段皆为私有成员
- `main`包中导入并使用`pkg`中的作为公有成员的工厂模式函数创建结构体实例

::: code-group

```shell [目录]
|- pkgs				# [!code focus]
	|- person.go	# [!code focus]
	|- dog.go		# [!code focus]
|- main.go			# [!code focus]
|- go.mod
```

```go [pkgs/person.go]
package pkgs

type person struct {				// [!code focus]
	Name string						// [!code focus]
	Age  int						// [!code focus]
}									// [!code focus]

func CreatePerson(name string, age int) *person {	// [!code focus]
	return &person{									// [!code focus]
		Name: name,									// [!code focus]
		Age:  age, 									// [!code focus]
	}              									// [!code focus]
}                  									// [!code focus]
```

```go [pkgs/person.go]
package pkgs

type Dog struct {				// [!code focus]
	breed string				// [!code focus]
	price float64				// [!code focus]
}								// [!code focus]

func CreateDog(breed string, price float64) *Dog {	// [!code focus]
	return &Dog{									// [!code focus]
		breed, price								// [!code focus]
	}              									// [!code focus]
}                  									// [!code focus]
```

```go [main.go]
package main

import (								// [!code focus]
	"demo/pkgs"							// [!code focus]
	"fmt"
)										// [!code focus]

func main() {
	p := pkgs.person{Name: "A", Age: 28}			 // [!code focus] // [!code --] // 报错，结构体为私有成员
	pa := pkgs.CreatePerson("A", 28)				 // [!code focus] // [!code ++]

	bp := pkg.Dog{name: "Chihuahua", price: 1800.55} // [!code focus] // [!code --] // 报错，字段为私有成员
	bp := pkg.CreateDog("Chihuahua", 1800.55)		 // [!code focus] // [!code ++]

	a := *ap										 // [!code focus]
	b := *bp										 // [!code focus]
	fmt.Println(a)
	fmt.Println(b)
}


// {A 28}
// {Chihuahua 1800.55}
```

:::

## 结构体字段

> 可理解为其他面向对象语言中的类的实例属性

---

### 默认值

字段初始值为其数据类型的零值，即创建实例对象时若不给字段赋值则使用默认值

::: details 例子：验证字段初始值为其数据类型的零值

```go
package main

import "fmt"

type Person struct {        // [!code focus]
	String string           // [!code focus]
	Int    int              // [!code focus]
	Float  float64          // [!code focus]
	Array  [3]string        // [!code focus]
	Slice  []string         // [!code focus]
	Map    map[string]int   // [!code focus]
	Struct struct{}         // [!code focus]
    Pointer *string         // [!code focus]
}                           // [!code focus]

func main() {
	var o Person            // [!code focus]
	fmt.Println(o)          // [!code focus]
	fmt.Println(o.String)
	fmt.Println(o.Int)
	fmt.Println(o.Float)
	fmt.Println(o.Array)
	fmt.Println(o.Slice, o.Slice == nil)    // [!code focus]
	fmt.Println(o.Map, o.Map == nil)        // [!code focus]
	fmt.Println(o.Struct)
    fmt.Println(o.Pointer, o.Pointer == nil)// [!code focus]
}


// { "" 0 0 ["" "" ""] [] map[] {} <nil>} // [!code focus]
// ""
// 0
// 0
// ["" "" ""]
// [] true
// map[] true
// {}
// <nil> true
```

:::

---

### 访问

```go
type 结构体类型 struct {
    PublicAttr 类型
    privateAttr 类型
}

var 实例 结构体类型
值 := 实例.字段     // [!code focus]
```

- 首字母大写的字段为公有成员，在跨包时可被外部访问
- 首字母小写的字段为私有成员，仅能在当前所在包内访问

[更多详见](../modules-dev/pkg-module-workspace.md#包)

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

### 修改

```go
var 实例 结构体类型
实例.字段 = 新值    // [!code focus]
```

结构体是[值类型数据](../data-types/division-determination-conversion.md#值类型数据)

- 仅相同作用域下直接修改字段值才会影响变量本身
- 不同作用域中 ( 函数内 ) 对字段直接修改不影响原始变量，需借助[指针](../pointer.md)
- 当结构体变量值整体赋值给一个新变量后，新旧变量因内存指向不同互不影响

::: details 例子：验证同一作用域下可直接修改字段值

```go
package main

import "fmt"

type Person struct {    // [!code focus]
	Name string         // [!code focus]
	Age  int            // [!code focus]
}                       // [!code focus]

func main() {
	a := Person{}       // [!code focus]
	fmt.Println(a)

	a.Name = "A"        // [!code focus]
	a.Age = 28          // [!code focus]
	fmt.Println(a)

	a.Name = "AAA"      // [!code focus]
	a.Age = 16          // [!code focus]
	fmt.Println(a)
}


// {"" 0}
// {"A" 28}
// {"AAA" 16}
```

:::

::: details 例子：验证不同作用域下可无法直接修改字段值，需借助指针

```go
package main

import "fmt"

type Person struct {        // [!code focus]
	Name string             // [!code focus]
	Age  int                // [!code focus]
}                           // [!code focus]

// 函数内直接修改字段值                     // [!code focus]
func updateFieldsDirectly(p Person) {   // [!code focus]
	p.Name = "XXX"                      // [!code focus]
	p.Age = 16                          // [!code focus]
}                                       // [!code focus]

// 函数内借助指针修改字段值                 // [!code focus]
func updateFieldsByPointer(p *Person) { // [!code focus]
	(*p).Name = "YYY"                   // [!code focus]
	(*p).Age = 26                       // [!code focus]
}                                       // [!code focus]

func main() {
	p := Person{}               // [!code focus]
	fmt.Println(p)

	updateFieldsDirectly(p)     // [!code focus]
	fmt.Println(p)

	updateFieldsByPointer(&p)   // [!code focus]
	fmt.Println(p)
}


// {"" 0}
// {"" 0}
// {"YYY" 26}
```

:::

::: details 例子：验证结构体整体赋值给新变量时，新旧变量互不影响

```go
package main

import "fmt"

type Person struct {				// [!code focus]
	Name string						// [!code focus]
	Age  int						// [!code focus]
}									// [!code focus]

func main() {
	a := Person{Name: "A", Age: 28}	// [!code focus]
	b := a							// [!code focus]

	// 指针指向不同内存地址，互不影响	 // [!code focus]
	fmt.Printf("%p\n", &a)			// [!code focus]
	fmt.Printf("%p\n", &b)			// [!code focus]

	b.Name = "B"					// [!code focus]
	b.Age = 16						// [!code focus]

	fmt.Println(a, b)
}


// 0x14000114018
// 0x14000114030
// {"A" 28} {"B" 16}
```

:::

::: warning

字段类型为[切片](../data-types/composite-data-types.md#默认值、nil-切片)、[映射](../data-types/composite-data-types.md#默认值、nil-映射)时若值为默认值`nil`，直接修改其成员前必须先初始化，否则报错

::: details 例子：验证切片、映射类型的字段中成员的修改

- 可先通过`make()`初始化自动给每个成员使用其类型的默认值后再操作其中成员
- 或通过字面量给直接字段及其成员赋值

::: code-group

```go [切片]
package main

import "fmt"

type Person struct {							   // [!code focus]
	Slice   []string							   // [!code focus]
}												   // [!code focus]

func main() {
	var o Person								   // [!code focus]

	o.Slice[0] = "a"      // 报错                   // [!code focus] // [!code error]
	o.Slice[1] = "b"      // 报错                   // [!code focus] // [!code error]

    // 写法一：使用 make() 给字段整体赋值空切片			 // [!code focus]
    o.Slice = make([]string, 2)     			   // [!code focus] // [!code ++]
	o.Slice[0] = "a"                			   // [!code focus] // [!code ++]
	o.Slice[1] = "b"                			   // [!code focus] // [!code ++]
    // 写法二：给字段整体赋值而非其成员					 // [!code focus]
    o.Slice = []string{"x", "y"}   				   // [!code focus] // [!code ++]
}
```

```go [映射]
package main

import "fmt"

type Person struct {							// [!code focus]
	Map     map[string]int						// [!code focus]
}												// [!code focus]

func main() {
	var o Person								 // [!code focus]

	o.Map["a"] = 1      // 报错                   // [!code focus] // [!code error]
	o.Map["b"] = 2      // 报错                   // [!code focus] // [!code error]

    // 写法一：使用 make() 给字段整体赋值空映射		  // [!code focus]
    o.Map = make(map[string]int)     			 // [!code focus] // [!code ++]
	o.Map["a"] = 1                   			 // [!code focus] // [!code ++]
	o.Map["b"] = 2                   			 // [!code focus] // [!code ++]
    // 写法二：给字段整体赋值而非其成员				  // [!code focus]
    o.Map = map[string]int{"a": 1, "b": 2}   	 // [!code focus] // [!code ++]
}
```

:::

---

### Tag 标签

结构体每个字段可以通过一个 Tag 标签提供额外的元信息

Tag 元信息多用于外部数据与结构体类型的绑定，比如 [HTTP 请求参数](../../../gin/base/route-request.md#参数绑定)、文件内容的读取等

```go
type 结构体类型 struct {
    字段 类型 			`键:"值" 键:"值"`
	首字母小写的字段 类型	`键:"-" 键:"-"`	// 不显示
}
```

- 定义了 Tag 标签的字段一般要首字母大写作为公有成员，不然跨包时被无法访问
- Tag 标签的元信息格式是空格分隔的键值对形式定义
- Tag 标签的元信息键值对可通过反射 ( reflect ) 获取

| 常用的 Tag 键 | 说明            |
| ------------- | --------------- |
| `json`        | JSON 格式的数据 |
| `tml`         | TOML 格式的数据 |
| `yaml`        | YAML 格式的数据 |
| `xml`         | XML 格式的数据  |
| `ini`         | INI 格式的数据  |

::: details 例子：验证通过 Tag 标签实现 [序列化](../built-in-pkgs/encoding.md#json-marshal)、[反序列化](../built-in-pkgs/encoding.md#json-unmarshal)

::: code-group

```go [序列化 ( 结构体 → JSON )]
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {						// [!code focus]
	Name   string   `json:"name"`			// [!code focus]
	Age    int      `json:"age"`			// [!code focus]
	Skills []string `json:"skills"`			// [!code focus]
}											// [!code focus]

func main() {
	p := Person{							// [!code focus]
		Name:   "Andy",						// [!code focus]
		Age:    28,							// [!code focus]
		Skills: []string{"JS", "TS"},		// [!code focus]
	}										// [!code focus]

	bts, err := json.Marshal(p)				// [!code focus]
	if err != nil {							// [!code focus]
		fmt.Println(err)
		return
	}										// [!code focus]
	fmt.Println(bts)
	jsonStr := string(bts)					// [!code focus]
	fmt.Println(jsonStr)					// [!code focus]
}


// [123 34 110 97 109 101 34 58 34 65 110 100 121 34 44 34 97 103 101 34 58 50 56 44 34 115 107 105 108 108 115 34 58 91 34 74 83 34 44 34 84 83 34 93 125]
// {"name":"Andy","age":28,"skills":["JS","TS"]}
```

```go [反序列化 ( JSON → 结构体 )]
package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {                                // [!code focus]
	Name   string   `json:"name"`                   // [!code focus]
	Age    int      `json:"age"`                    // [!code focus]
	Skills []string `json:"skills"`                 // [!code focus]
}                                                   // [!code focus]

var jsonStr = `{"name":"Andy","age":28,"skills":["JS","TS"]}`   // [!code focus]

func main() {
	bytes := []byte(jsonStr)            // [!code focus]
	sp := new(Person)                   // [!code focus]

	if err := json.Unmarshal(bytes, sp); err != nil {   // [!code focus]
		fmt.Println(err)
		return                                          // [!code focus]
	}                                                   // [!code focus]

	s := *sp                                            // [!code focus]
	fmt.Println(s)
}


// {Andy 28 [JS TS]}
```

:::

::: details 例子：验证通过反射 ( reflect ) 遍历字段对并获取 Tag 的键值信息

> 如下：获取字段 Tag 信息中`json`、`xml`键对应的值 ( 对应该格式文件中的字段名 )

```go
package main

import (
	"fmt"
	"reflect"
)

type Person struct {
	Name string `json:"name" xml:"PersonName"`	// [!code focus]
	Age  int    `json:"age" xml:"PersonAge"`	// [!code focus]
}

func main() {
	p := Person{Name: "John", Age: 30}			// [!code focus]

	t := reflect.TypeOf(p)						// [!code focus]
	for i := 0; i < t.NumField(); i++ {			// [!code focus]
		field := t.Field(i)						// [!code focus]
		fmt.Println(
			field.Name,							// [!code focus]
			field.Tag.Get("json"),				// [!code focus]
			field.Tag.Get("xml"),				// [!code focus]
		)
	}											// [!code focus]
}


// Name name PersonName
// Age age PersonAge
```

:::

## 结构体方法

> 可理解为其他面向对象语言中的类的实例方法

- 结构体方法可被结构体实例调用
- 结构体方法要通过方法的接收者关联绑定到指定的结构体类型

关于方法 [更多详见](../function-method.md#方法)

---

### 定义与调用

结构体方法要关联绑定到指定的结构体类型，[方法的接收者](../function-method.md#方法接收者)为结构体实例或其指针

- 结构体类型：方法内仅能通过接收者 ( 实例 ) 获取实例数据
- 结构体指针类型：方法内能通过接收者 ( 实例指针/结构体指针 ) 获取以及修改实例数据

```go
// 仅获取实例字段										       // [!code focus]
func (接收者 结构体类型) 结构体方法([形参 参数类型]) [返回值类型] {	 // [!code focus]
    // ... fmt.Print(接收者.字段)							   // [!code focus]
    return 返回值											  // [!code focus]
}															 // [!code focus]

// 获取以及修改实例字段 									    // [!code focus]
func (接收者 *结构体类型) 结构体方法([形参 参数类型]) [返回值类型] { // [!code focus]
	// ... fmt.Print((*接收者).字段)						  // [!code focus]
	// ... fmt.Print(接收者.字段)	// 为了开发者方便书写 Go 底层做了转换

	(*接收者).字段 = 新值									   // [!code focus]
	接收者.字段 = 值  // 为了开发者方便书写 Go 底层做了转换
    return 返回值											  // [!code focus]
}															 // [!code focus]


(&结构体实例).结构体方法(实参)							  // [!code focus]
结构体实例.结构体方法(实参)	// 为了开发者方便书写 Go 底层做了转换
```

::: details 例子：验证使用结构体方法获取实例数据、修改实例数据

- `SayHello`：通过方法接收者获取调用该方法的实例的字段值
- `SaySomething`：同上，但多了方法参数的接收与拼接
- `ChangeName`：：通过方法接收者(指针)修改调用该方法的实例的字段值

```go
package main

import (
	"errors"
	"fmt"
)

type Person struct {			// [!code focus]
	Name string 				// [!code focus]
	Age  int    				// [!code focus]
}               				// [!code focus]

func (p Person) SayHello() {				// [!code focus]
	fmt.Println(p.Name + " says Hello")		// [!code focus]
}											// [!code focus]

func (p Person) SaySomething(msg string) {	// [!code focus]
	fmt.Println(p.Name + " says " + msg)	// [!code focus]
}											// [!code focus]

func (p *Person) ChangName(name string) error {			// [!code focus]
	if len(name) <= 0 || age <= 0 {						// [!code focus]
		return errors.New("Invalid parameter")			// [!code focus]
	}													// [!code focus]
	// 两种写方法
	(*p).Name = name									// [!code focus]
	p.Age= age											// [!code focus]
	return nil											// [!code focus]
}														// [!code focus]

func main() {
	a := Person{Name: "A"}							// [!code focus]
	b := Person{Name: "B"}							// [!code focus]

	// 两种写方法
	(&a).SayHello()									// [!code focus]
	b.SayHello()   									// [!code focus]

	// 两种写方法
	(&a).SaySomething("aaaa")						// [!code focus]
	b.SaySomething("bbbb")   						// [!code focus]

	// 两种写方法
	if err := (&a).ChangName("AA", 28); err != nil {	// [!code focus]
		fmt.Println(err)
		return											// [!code focus]
	}													// [!code focus]
	if err := b.ChangName("BB", 16); err != nil {		// [!code focus]
		fmt.Println(err)
		return											// [!code focus]
	}													// [!code focus]

	fmt.Println(a)
	fmt.Println(b)
}


// A says Hello
// B says Hello
// A says aaaa
// B says bbbb
// {AA 28}
// {BB 16}
```

:::

::: tip

建议将结构体方法的接收者都使用结构体指针，借助指针可同时实现值的访问以及修改

:::

---

### 结构体指针

即结构体方法的接收者为结构体指针类型时，接收者可被称为结构体指针 [详见上文](#定义与调用)

建议将结构体方法的接收者都使用结构体指针，借助指针可同时实现值的访问以及修改

```go
func (结构体指针 *结构体类型) 结构体方法([形参 参数类型]) [返回值类型] {	// [!code focus]
	// ... fmt.Print((*接收者).字段)								 // [!code focus]
	// ... fmt.Print(接收者.字段)	// 为了开发者方便书写 Go 底层做了转换

	(*结构体指针).字段 = 新值										  // [!code focus]
	结构体指针.字段 = 新值    // 为了开发者方便书写 Go 底层做了转换
    return 返回值													// [!code focus]
}																   // [!code focus]
```

---

### Getter、Setter

Getter、Setter 是结构体的方法，主要用于跨包时能够安全地获取以及修改非公开的私有字段

[详见上文](#定义与调用)

- 方法建议命名为`GetXxx`、`SetXxx`
- 方法接收者建议使用结构体指针
- 返回值建议为字段值的指针而不是值的拷贝，以实现能动态获取最新值

::: code-group

```go [某字段的 Getter]
func (结构体指针 *结构体类型) Get某字段() 字段类型 {  			// [!code focus]
	// 返回的是字段的值的副本，实例数据更新时该返回值不会自动更新	// [!code focus]
	return (*接收者).字段						  			// [!code focus]
	return (接收者.字段)	// 为了开发者方便书写 Go 底层做了转换

	// 返回的是字段的引用地址，实例数据更新时该返回值会自动更新		// [!code focus]
	return &(*接收者).字段						  			// [!code focus]
	return &(接收者.字段)	// 为了开发者方便书写 Go 底层做了转换

	// 返回的是仅仅值与字段值相同的变量的指针，引用地址毫无关联		// [!code focus]
	字段值 := (*接收者).字段					   			 // [!code focus] // [!code --]
	return &字段值								 		   // [!code focus] // [!code --]
	// fmt.Println(&字段值 ==  &((*接收者).字段)) 	// false
}											    		  // [!code focus]


返回值 := 结构体实例.Get某字段()							  // [!code focus]
```

```go [某字段的 Setter]
func (结构体指针 *结构体类型) Set某字段([形参 参数类型]) error {  // [!code focus]
	if 错误条件 {											 // [!code focus]
		return 错误对象										 // [!code focus]
	}													   // [!code focus]

	(*结构体指针).字段 = 新值  								  // [!code focus]
	结构体指针.字段 = 新值    // 为了开发者方便书写 Go 底层做了转换
    return nil												// [!code focus]
}											    			// [!code focus]


err := 结构体实例.Set某字段(新值)							   // [!code focus]
```

:::

---

### String()

构体类型绑定关联上一个名为`String`的方法的话

调用`fmt.Println()`打印结构体类型变量 ( 实例 ) 时会自动调用该`String()`方法

::: details 例子：验证

> 如下：现有两个结构体`A`、`B`，`B`类型被绑定关联了`String()`方法

```go
package main

import "fmt"

type A struct{}						// [!code focus]

type B struct{}						// [!code focus]

func (o B) String() string { 		// [!code focus]
	return fmt.Sprintf("自定义内容")  // [!code focus]
} 								    // [!code focus]

func main() {
	a := A{}		// [!code focus]
	b := B{}		// [!code focus]

	fmt.Println(a)	// [!code focus]
	fmt.Println(b)	// [!code focus]
}


// 自定义内容
// {}
```

:::
