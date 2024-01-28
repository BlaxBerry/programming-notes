# GO 接口

> Interface

接口是多个方法的抽象集合，用于实现规范化开发，可降低代码的耦合性并提高通用性

Go 不使用其他语言中的`implements`等关键字来显示地实现接口，只要数据类型上包含有某个接口中所有的方法即视为该数据类型实现了某接口 ( 即谁要实现接口就必须实现接口中全部方法 )

> 比如：开发团队领导制定开发规范与任务清单 ( 接口 )、团队成员要完全遵守该规范并担当任务 ( 实现接口 )、具体如何用代码完成任务 ( 接口方法的方法体 ) 取决于开发担当 ( 接口实现者 )、程序员无论如何流动都不会影响制定好的任务表与开发规范 ( 低耦合性高通用型 )

接口可用于规范某个函数/方法的调用者的类型

> 比如：内置包`sort`中的`Sort()`方法接收一个接口类型的数据做参数，参数实现了接口类型`sort.Interface`，规定了参数的类型必须包含三个方法`Len()`、`Less()`、`Swap()`，即只要某个类型的数据满足该条件就可以调用`sort.Sort()`并作为参数传入

## 定义接口

接口是一种[自定义数据类型](../data-types/division-determination-conversion.md#自定义类型)，使用关键字`type`与`interface`创建

接口中只能定义方法名，方法体的具体逻辑由接口实现者定义

```go
type 接口类型 interface {
	方法([参数 参数类型]) [返回值类型]
    方法([参数 参数类型]) [返回值类型]
}
```

## 使用

接口类型不能创建实例，但是可以指向接口的实现者 ( 接口变量 )

即一个实现了接口的自定义类型的实例/实例的指针可为接口类型

---

### 实现接口

实现接口是指，某个自定义类型或其指针类型绑定关联了接口中的全部方法

- 实现接口时须将接口中所有方法全部定义实现，否则报错
- 接口的实现者取决于绑定关联接口方法时指定的[方法接收者](../function-method.md#方法接收者)：
  - 值接收者：自定义类型实现了接口，该类型数据的实例可为接口类型
  - 指针接收者：自定义类型的指针类型实现了接口，该类型数据的实例的指针可为接口类型

```go
type 接口类型 interface {             // [!code focus]
	方法([参数 参数类型]) [返回值类]     // [!code focus]
}                                   // [!code focus]

// 自定义类型实现接口                                          // [!code focus]
func (接收者 自定义类型) 接口方法([参数 参数类型]) [返回值类] {}   // [!code focus]
var 接口实现者 接口类型 = 自定义类型的实例                            // [!code focus]

// 自定义类型的指针类型实现接口                                 // [!code focus]
func (接收者 *自定义类型) 接口方法([参数 参数类型]) [返回值类] {}  // [!code focus]
var 接口实现者 接口类型 = 自定义类型的实例的指针                       // [!code focus]
// var 接口实现者 接口类型 = &自定义类型的实例
```

::: details 例子：验证结构体实现接口以及创建接口类型的变量 ( 接口实现者 )

- 定义接口`SayMethods`、结构体`Chinese`、`Japanese`
- 其中`Japanese`是该类型实现接口，`Chinese`是该类型的指针类型实现接口
- `main`包内导入跨包的接口与结构体，创建结构体的实例并创建创建接口类型的变量 ( 接口实现者 )

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

type SayMethods interface {             // [!code focus]
	SayHello()                          // [!code focus]
	SaySomething(msg string)            // [!code focus]
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
func (p Japanese) SaySomething(msg string) {    // [!code focus]
	fmt.Println(msg)                            // [!code focus]
}                                               // [!code focus]

// Chinese 相关
// ----------------------------------------

type Chinese struct{}                           // [!code focus]

func (p *Chinese) SayHello() {                  // [!code focus]
	fmt.Println("你好")                          // [!code focus]
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

    var ji interfaces.SayMethods = japanese     // [!code focus]
	var ci interfaces.SayMethods = chinese  // [!code --] // 报错，实现接口的不是 Chinese，而是其指针类型 *Chinese
    var ci interfaces.SayMethods = &chinese     // [!code focus]
}
```

:::

::: tip

Go 的接口实现不是显示的<br/>
只要某个自定义类型或其指针类型绑定关联了某个接口中的全部方法，即自动视为其实现了某接口

> 如下：自定义结构体类型绑定关联的方法属于两接口，故结构体实例可指定为这两个接口类型

```go
type InterfaceA interface {
    MethodA()
    MethodB()
}
type InterfaceB interface {
    MethodA()
    MethodC()
}

type Sub struct {}
func (s Sub) MethodA() { }
func (s Sub) MethodB() { }
func (s Sub) MethodC() { }

s := Sub{}              // [!code hl]
var a InterfaceA = s    // [!code hl]
var b InterfaceB = s    // [!code hl]
```

:::

---

### 使用接口中方法

接口实现者绑定关联了接口中所有的方法，所以可通过接口实现者调用接口中的方法

```go
func 函数(接口实现者 接口类型) {
    接口实现者.接口方法()
}

函数(接口实现者)
```

::: tip

接口的实现者取决于方法接收者 [详见上文](#定义接口)<br/>
所以通过接口实现者调用接口中的方法时要区分是自定义类型还是其指针类型

:::

```go
type 接口类型 interface {
	方法([参数 参数类型]) [返回值类]
}

// 接口实现者为自定义类型                                       // [!code focus]
func (接收者 自定义类型) 接口方法([参数 参数类型]) [返回值类] {     // [!code focus]
    // ...                                                  // [!code focus]
}                                                           // [!code focus]
func 函数(自定义类型的实例 接口类型) {   // [!code focus]
    自定义类型的实例.接口方法()         // [!code focus]
}                                   // [!code focus]
函数(自定义类型的实例)                 // [!code focus]


// 接口实现者为自定义类型的指针类型                              // [!code focus]
func (接收者 *自定义类型) 接口方法([参数 参数类型]) [返回值类] {    // [!code focus]
    // ...                                                  // [!code focus]
}                                                           // [!code focus]
func 函数(自定义类型的实例的指针 接口类型) {    // [!code focus]
    自定义类型的实例的指针.接口方法()          // [!code focus]
}                                         // [!code focus]
函数(自定义类型的实例的指针)                  // [!code focus]
// 函数(&自定义类型的实例)
```

::: details 例子：验证结构体实现接口以及接口方法的使用

- 定义接口`SayMethods`与调用接口方法的函数
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

type SayMethods interface {             // [!code focus]
	SayHello()                          // [!code focus]
	SaySomething(msg string)            // [!code focus]
}                                       // [!code focus]

func Greeting(i SayMethods) {           // [!code focus]
	i.SayHello()                        // [!code focus]
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
func (p Japanese) SaySomething(msg string) {    // [!code focus]
	fmt.Println(msg)                            // [!code focus]
}                                               // [!code focus]

// Chinese 相关
// ----------------------------------------

type Chinese struct{}                           // [!code focus]

func (p *Chinese) SayHello() {                  // [!code focus]
	fmt.Println("你好")                          // [!code focus]
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

	interfaces.Speak(japanese, "オラオラオラ")  // [!code focus]
	interfaces.Speak(&chinese, "哈哈哈哈")      // [!code focus]
}


// こんにちは
// 你好
// オラオラオラ
// 哈哈哈哈
```

:::

## 空接口

不包含任何方法的接口类型被称为空接口

Go 内置的`any`类型即为空接口类型的别名

```go
type 空接口 interface {}

type any = interface {}
```

因为空接口无接口方法故所有的类型都默认实现空接口，即所有类型的数据都可为空接口类型

```go
func 函数(任意类型参数 any) {
	// ...
}
```

## 类型断言

```go
变量值, 布尔值 := 接口类型变量.(类型)
```
