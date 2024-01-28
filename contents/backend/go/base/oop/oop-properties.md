# GO 对面向对象

Go 使用其特有的方式实现传统对象编程中的三要素： 封装、继承、多态

## 抽象

> Abstraction

Go 通过[结构体](struct.md)、[接口](./interface.md)将公共的字段、方法进行提取

## 封装

> Encapsulation

Go 并没有特别强调封装

封装是指将抽象出的字段与字段操作存放在一起，目的是为了对指定字段数据进行保护、以及对字段的操作添加验证与授权

- 将结构体相关内容单独定义为包
- 将结构体、以及其中字段都设为包的[私有非公开成员](../modules-dev/pkg-module-workspace.md#包)
- 结构体实例只能使用[工厂模式函数](./struct.md#工厂模式)创建
- 结构体字段只能通过调用实例方法的 [Getter、Setter](./struct.md#getter、setter) 在满足指定条件下才能访问以及修改

::: details 例子：跨包使用封装后的结构体

- 跨包调用工程模式函数创建私有非公开的结构体`person`的实例
- 调用相关 Getters、Setters
- 打印查看的确修改实例的数据，并且修改后最新数据能够实时获取

::: code-group

```shell [目录]
|- pkgs             # [!code focus]
    |- person.go    # [!code focus]
|- main.go          # [!code focus]
|- go.mode
```

```go [pkgs/person.go]
package pkgs

import (
	"errors"
	"fmt"
)

type person struct {            // [!code focus]
	Name   string               // [!code focus]
	age    int                  // [!code focus]
	salary string               // [!code focus]
}                               // [!code focus]

// 工厂模式函数                               // [!code focus]
func CreatePerson(name string) *person {    // [!code focus]
	return &person{                         // [!code focus]
		Name: name,                         // [!code focus]
        salary: "￥0.00",                   // [!code focus]
	}                                       // [!code focus]
}                                           // [!code focus]

// Getters
// --------------------------------------------------

// 获取 age                                  // [!code focus]
func (p *person) GetAge() *int {            // [!code focus]
	return &(p.age)                         // [!code focus]
}                                           // [!code focus]

// 获取 salary                               // [!code focus]
func (p *person) GetSalary() *string {      // [!code focus]
	return &(p.salary)                      // [!code focus]
}                                           // [!code focus]

// Setters
// --------------------------------------------------

// 设置 age                                   // [!code focus]
func (p *person) SetAge(age int) error {     // [!code focus]
	if age <= 0 {                            // [!code focus]
		return errors.New("invalid age")     // [!code focus]
	}                                        // [!code focus]
	(*p).age = age                           // [!code focus]
	return nil                               // [!code focus]
}                                            // [!code focus]

// 设置 salary                                        // [!code focus]
func (p *person) SetSalary(salary float64) error {   // [!code focus]
	if salary <= 0 {                                 // [!code focus]
		return errors.New("invalid salary")          // [!code focus]
	}                                                // [!code focus]
	(*p).salary = fmt.Sprintf("￥%.2f", salary)       // [!code focus]
	return nil                                       // [!code focus]
}                                                    // [!code focus]
```

```go [main.go]
package main

import (                                     // [!code focus]
	"demo/pkgs"                              // [!code focus]
	"fmt"
)                                            // [!code focus]

func main() {
	p := pkgs.CreatePerson("AA")             // [!code focus]
	age := p.GetAge()                        // [!code focus]
	salary := p.GetSalary()                  // [!code focus]

	fmt.Println((*p).Name, *age, *salary)    // [!code focus]

	err := p.SetAge(28)                      // [!code focus]
	if err != nil {
		fmt.Println(err)
		return
	}
	err = p.SetSalary(400000.00)             // [!code focus]
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println((*p).Name, *age, *salary)    // [!code focus]
}


// AA 0 ￥0.00
// AA 28 ￥400000.00
```

:::

## 继承

> Inheritance

Go 使用匿名字段实现结构体与接口的继承

但不建议过多的多重继承

---

### 结构体继承

嵌套后会继承目标结构体上的所有字段、方法

```go
type 结构体A struct {   // [!code focus]
    字段 类型           // [!code focus]
}                      // [!code focus]

func (接收者 *结构体A) 结构体A方法() {
    // ...
}

type 结构体B struct {   // [!code focus]
    结构体A             // [!code focus]
    别名 结构体A         // [!code focus]
    字段 类型
}                      // [!code focus]
```

---

### 继承结构体字段获取、方法调用

采用就近访问原则：结构体自身成员 → 继承目标中成员 → 报错

```go
type 结构体B struct {
    结构体A
    别名 结构体A
    字段 类型
}

func (接收者 *结构体A) 结构体A方法() {
    // ...
}

// 字段值获取                                    // [!code focus]
值 := 结构体B的实例.结构体A.结构体A的字段 = 新值     // [!code focus]
// 字段不重名时可简写                             // [!code focus]
值 := 结构体B的实例.结构体A的字段 = 新值            // [!code focus]
// 使用了别名时必须指明
值 := 结构体B的实例.别名.结构体A的字段 = 新值

// 方法调用                          // [!code focus]
结构体B的实例.结构体A.结构体A方法()     // [!code focus]
// 方法不重名时可简写                  // [!code focus]
结构体B的实例.结构体A方法()            // [!code focus]
```

::: details 例子：验证字段、方法重名时的就近访问原则

- `English`直接使用其继承对象`Person`中的字段与方法
- `Chinese`则重复定义了重名的字段与方法

```go
package main

import (
	"fmt"
	"reflect"
)

type Person struct {            // [!code focus]
	Age int                     // [!code focus]
}                               // [!code focus]

func (p *Person) SayHello() {   // [!code focus]
	fmt.Println("Hello")        // [!code focus]
}                               // [!code focus]

type Chinese struct {           // [!code focus]
	Person                      // [!code focus]
	Age string                  // [!code focus] // 重名字段
}                               // [!code focus]

// 重名方法                                  // [!code focus]
func (p *Chinese) SayHello(msg string) {    // [!code focus]
	fmt.Println(msg)                        // [!code focus]
}                                           // [!code focus]

func main() {
	e := English{}                                                   // [!code focus]
	fmt.Println(reflect.TypeOf(e.Age), reflect.TypeOf(e.Person.Age)) // [!code focus]
	e.SayHello()                                                     // [!code focus]

	c := Chinese{}                                                   // [!code focus]
	fmt.Println(reflect.TypeOf(c.Age), reflect.TypeOf(e.Person.Age)) // [!code focus]
	c.SayHello("你好")                                                // [!code focus]
	c.Person.SayHello()                                              // [!code focus]
}


// int int
// Hello
// string int
// 你好
// Hello
```

:::

---

### 继承结构体字段赋值

```go
type 结构体B struct {
    结构体A
    字段 类型
}

// 写法一：字面量创建同时赋值   // [!code focus]
实例 := 结构体B{             // [!code focus]
    结构体B的字段: 值,        // [!code focus]
    结构体A: 结构体A{        // [!code focus]
        结构体A的字段: 值,   // [!code focus]
    }                      // [!code focus]
}                          // [!code focus]

// 写法二：字面量创建空实例后逐一给字段赋值       // [!code focus]
结构体B的实例.结构体A.结构体A的字段 = 新值       // [!code focus]
结构体B的实例.结构体A的字段 = 新值              // [!code focus]
```

::: details 例子：验证公共字段、方法的基本使用

```go
package main

import "fmt"

type Person struct {            // [!code focus]
	Age int                     // [!code focus]
}                               // [!code focus]

func (p *Person) SayHello() {   // [!code focus]
	fmt.Println("Hello")        // [!code focus]
}                               // [!code focus]

type English struct {           // [!code focus]
	Person                      // [!code focus]
	Name string                 // [!code focus]
}                               // [!code focus]

func main() {
	p := English{               // [!code focus]
		Person: Person{         // [!code focus]
			Age: 10,            // [!code focus]
		},                      // [!code focus]
		Name: "A",              // [!code focus]
	}
	fmt.Println(p.Name, p.Age, p.Person.Age)    // [!code focus]

	p.Age = 28                                  // [!code focus]
	fmt.Println(p.Name, p.Age, p.Person.Age)    // [!code focus]
	p.Person.Age = 16                           // [!code focus]
	fmt.Println(p.Name, p.Age, p.Person.Age)    // [!code focus]

	p.SayHello()                // [!code focus]
	p.Person.SayHello()         // [!code focus]
}


// A 10 10
// A 28 28
// A 16 16
// Hello
// Hello
```

:::

---

### 接口继承

嵌套后会继承目标接口上的所有方法

```go
type 接口A interface {
    方法([参数 类型]) 返回值类型
}

type 接口B interface {
    接口A
    方法([参数 类型]) 返回值类型
}
```

---

### 继承接口的实现、接口方法调用

实现接口时也必须实现所有的方法，

写法与普通的接口实现与接口方法调用一致

::: details 例子：验证接口的继承、结构体实现、使用接口中方法

- 定义接口`SayMethods`与调用接口方法的函数，`SayMethods`继承接口`CommonMethods`
- 定义结构体`Chinese`、`Japanese`并实现接口
- 其中`Japanese`是该类型实现接口，`Chinese`是该类型的指针类型实现接口
- `main`包内导入跨包的接口与结构体，创建结构体的实例并调用能执行接口方法的函数

::: code-group

```shell [目录]
|- pkgs                     # [!code focus]
    |- interfaces           # [!code focus]
        |- sayMethods.go    # [!code focus]
    |- structs              # [!code focus]
        |- people.go        # [!code focus]
|- main.go                  # [!code focus]
|- go.mod
```

```go [pkgs/interfaces/sayMethods.go]
package interfaces

type CommonMethods interface {          // [!code focus]
	SaySomething(msg string)            // [!code focus]
}                                       // [!code focus]

type SayMethods interface {             // [!code focus]
	SayHello()                          // [!code focus]
	SayBye()                            // [!code focus]
}                                       // [!code focus]

func Greeting(i SayMethods) {           // [!code focus]
	i.SayHello()                        // [!code focus]
}                                       // [!code focus]
func GoodBye(i SayMethods) {            // [!code focus]
	i.SayBye()                          // [!code focus]
}                                       // [!code focus]
func Speak(i SayMethods, msg string) {  // [!code focus]
	i.SaySomething(msg)                 // [!code focus]
}                                       // [!code focus]
```

```go [pkgs/structs/people.go]
package structs

import "fmt"

// Japanese 相关
// ----------------------------------------

type Japanese struct{}                          // [!code focus]

func (p Japanese) SayHello() {                  // [!code focus]
	fmt.Println("こんにちは")                     // [!code focus]
}                                               // [!code focus]
func (p Japanese) SayBye() {                    // [!code focus]
	fmt.Println("さようなら")                     // [!code focus]
}                                               // [!code focus]
func (p Japanese) SaySomething(msg string) {    // [!code focus]
	fmt.Println(msg)                            // [!code focus]
}                                               // [!code focus]

// Chinese 相关
// ----------------------------------------

type Chinese struct{}                           // [!code focus]

func (p *Chinese) SayHello() {                  // [!code focus]
	fmt.Println("你好")                          // [!code focus]
}                                               // [!code focus]
func (p *Chinese) SayBye() {                    // [!code focus]
	fmt.Println("拜拜")                         // [!code focus]
}                                               // [!code focus]
func (p *Chinese) SaySomething(msg string) {    // [!code focus]
	fmt.Println(msg)                            // [!code focus]
}                                               // [!code focus]
```

```go [main.go]
package main

import (                                        // [!code focus]
	"demo/pkgs/interfaces"                      // [!code focus]
	"demo/pkgs/structs"                         // [!code focus]
)                                               // [!code focus]

func main() {
	japanese := structs.Japanese{}              // [!code focus]
	chinese := structs.Chinese{}                // [!code focus]

	interfaces.Greeting(japanese)               // [!code focus]
	interfaces.Greeting(&chinese)               // [!code focus]

	interfaces.Speak(japanese, "オラオラオラ")    // [!code focus]
	interfaces.Speak(&chinese, "哈哈哈哈")       // [!code focus]

    interfaces.GoodBye(japanese)                // [!code focus]
	interfaces.GoodBye(&chinese)                // [!code focus]
}


// こんにちは
// 你好
// オラオラオラ
// 哈哈哈哈
// さようなら
// 拜拜
```

:::

## 多态

> Polymorphism

Go 通过接口来实现多态的特性

接口体现多态的两种形式：

1. 多态参数调用接口方法

- 接口定义的方法作为统一规范，至于具体逻辑怎么实现取决于接口的实现者 ( 多态参数 )
- 通过接口的实现者 ( 多态参数 )调用接口中方法时，会自动判断接口实现者的类型并调用其绑定关联的接口方法

[更多详见](./interface.md#使用)

```go
type 接口 interface {
	方法()
	方法()
}

func 调用接口方法的函数(多态参数 接口类型) {
	多态参数.接口方法()
}
```

2. 多态数组

```go
package main

import "fmt"

type Moments interface{}

type Japanese struct{}
type Chinese struct{}

func main() {
	arr := [2]Moments{}
	fmt.Println(arr) // [<nil> <nil>]

	chinese := Chinese{}
	japanese := Japanese{}

	arr = [2]Moments{japanese, chinese}
	fmt.Println(arr) // [{} {}]
}
```
