# 面向对象

Go 不是纯粹的面向对象语言，但是支持面向对象的特性

- 使用结构体 ( Struct ) 实现类似 OOP 的作用
- 没有构造函数、方法重载、`this`等概念
- 没有有封装、继承、多态，但有实现类似特性的方式

## 结构体

> 可理解为其他面向对象语言中的类

[更多详见](./data-types/composite-data-types.md#结构体类型)

```go
type 结构体类型 struct {
    字段 类型
    字段 类型
}
```

---

### 结构体类型变量

> 可理解为其他面向对象语言中的类的实例

[更多详见](./data-types/composite-data-types.md#字面量创建实例)

::: code-group

```go [实例创建写法一]
// 创建实例并初始化

var 实例 结构体类型 = 结构体类型 {字段: 值, 字段: 值}
var 实例 = 结构体类型 {字段: 值, 字段: 值}
实例 := 结构体类型 {字段: 值, 字段: 值}
```

```go [实例创建写法二]
// 创建空的实例，然后手动追加字段

var 实例 结构体类型
实例.字段 = 值

实例 := 结构体类型 {}
实例.字段 = 值

var 实例的指针 *结构体类型 = new(结构体类型)
实例的指针 := new(结构体类型)
(*实例的指针).字段 = 值
实例的指针.字段 = 值
```

:::

---

### 结构体字段

> 可理解为其他面向对象语言中的类的实例属性

[更多详见](./data-types/composite-data-types.md#字段访问)

---

### 结构体方法

> 可理解为其他面向对象语言中的类的实例方法

[更多详见](./data-types/composite-data-types.md#结构体方法)

```go
// 1. 定义结构体
type 结构体类型 struct {
	字段 类型
}

// 2. 定义结构体方法
func (调用该方法的实例 结构体类型) 方法名([参数 参数类型]) [返回值] {
	// fmt.Println(调用该方法的实例.字段)
}
func (调用该方法的实例 *结构体类型) 方法名([参数 参数类型]) [返回值] {
	// (*调用该方法的实例).字段 = 新值
}


func 某个函数(){
	// 3. 创建结构体实例
	结构体实例 := 结构体类型{字段: 值}

	// 4. 通过实例调用结构体方法
	结构体实例.方法名([参数])
}
```

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

::: tip

若给结构体类型关联上一个名为`String`的方法的话

该方法会在打印结构体实例时自动调用，并将打印的输出内容替换为该方法的返回值字符串

```go
package main

import "fmt"

type Student struct {       // [!code focus]
	Name string             // [!code focus]
}                           // [!code focus]

func (s Student) String() string {                      // [!code focus]
	return fmt.Sprintf("instance %v is called", s.Name) // [!code focus]
}                                                       // [!code focus]

func main() {
	andy := Student{Name: "Andy"} // [!code focus]
	tom := Student{Name: "Tom"}   // [!code focus]

	fmt.Println(andy)            // [!code focus]
	fmt.Println(tom)             // [!code focus]
}


// instance Andy is called
// instance Tom is called
```

:::

---

### 私有成员、公有成员

[更多详见](./modules-dev/pkg-module-workspace.md#包)

- 结构体中首字母大写的成员为公有 ( 可在别的包文件中调用 )
- 结构体中首字母小写的成员为私有 ( 不能在别的包文件中调用 )

## 封装

结构体的字段皆作为私有成员保护在当前包内部，外部仅能通过调用实例的`Getter`、`Setter`方法在满足指定条件时访问获取与修改私有字段，从而实现对字段与其对应数据的保护以及验证等操作

::: code-group

```go [定义]
package 某个包

type 结构体类型 struct {
	公有字段 类型
	私有字段 类型
	私有字段 类型
}

// 工厂函数 ( 模拟类的构造器 )
// 返回实例指针以便实现修改操作
func NewXxx(参数 参数类型) *结构体类型 {
	return &结构体类型 {
		字段 初始值,
        字段 初始值,
	}
}

// 私有字段的 Getter 方法
func (实例 结构体类型) GetXxx() *私有字段值的类型 {
    if 失败条件 {
        return nil
    }
    return 实例私有字段的值的指针
}

// 私有字段的 Setter 方法
func (实例 *结构体类型) SetXxx(参数 参数类型) *error {
    if 失败条件 {
        return 错误对象的指针
    }
    (*实例).私有字段 = 新值
    return nil
}
```

```go [跨包使用]
package 某个包

import "结构体所在包"

func 某函数() {
    实例指针 := NewXxx(参数)

    公有字段值 := (*实例指针).公有字段

    if 私有字段值 := (*实例指针).GetXxx(); 私有字段值 != nil {
        // ...
    }

    if err := (*实例指针).SetXxx(参数); err != nil {
        // ...
    }
}
```

:::

::: details 例子：验证在外部包使用结构体封装的方法来操作其私有字段

1. 调用工厂函数创建实例的指针，获取实例对象
2. 利用实例的 Setter 更新实例私有字段`age`的值
3. 利用实例的 Getter 获取最新的实例私有字段`age`的值

::: code-group

```go [定义]
package person

import "errors"

type person struct {    // [!code focus]
	Name string         // [!code focus]
	age  int            // [!code focus]
}                       // [!code focus]

// 工厂函数
func New(name string) *person { // [!code focus]
	return &person{             // [!code focus]
		Name: name,             // [!code focus]
	}                           // [!code focus]
}                               // [!code focus]

// Getters
// ----------------------------------------------------
// 获取 age 字段
func (p person) GetAge() *int { // [!code focus]
	res := p.age                // [!code focus]
	return &res                 // [!code focus]
}                               // [!code focus]

// Setters
// ----------------------------------------------------
// 设置 age 字段
func (p *person) SetAge(age int) *error {   // [!code focus]
	if age > 0 && age < 200 {               // [!code focus]
		(*p).age = age                      // [!code focus]
		return nil                          // [!code focus]
	} else {                                // [!code focus]
		err := errors.New("invalid age")    // [!code focus]
		return &err                         // [!code focus]
	}                                       // [!code focus]
}                                           // [!code focus]
```

```go [使用定义]
package main

import (
	"demo/pkgs/person"
	"fmt"
)

func main() {
	andyPointer := person.New("Andy")           // [!code focus]
	andy := *andyPointer                        // [!code focus]
	fmt.Println(andyPointer, andy)

	if err := andy.SetAge(20); err != nil {     // [!code focus]
		fmt.Printf("failed to set %v's age, %s\n", andy.Name, *err)
	}                                           // [!code focus]
	fmt.Println(andy)

	age := andy.GetAge()                        // [!code focus]
	fmt.Println(*age)
}


// &{Andy 0} {Andy 0}
// {Andy 20}
// 20
```

:::

## 继承

通过嵌套匿名结构体实现类似继承的代码复用

嵌套后无论公有私有都会被继承

```go
type 结构体A struct {
    A的字段 类型
}

type 结构体B struct {
    结构体A
    B的字段 类型
}

// 创建实例
结构体B的实例 := 结构体B{}
结构体B的实例 := 结构体B{
    B的字段: 值,
    结构体A: 结构体A{
        A的字段: 值.
    }
}

// 结构体字段
结构体B的实例.B的字段 = 值
结构体B的实例.结构体A.A的字段 = 值

// 结构体方法
结构体B的实例.B关联的方法()
结构体B的实例.结构体A.A关联的方法()
```

::: details 例子：验证结构体的继承

1. 分别定义结构体`Cat`、`Dog`，二者都继承了结构体`Animal`
2. 分别创建实例并进行字段修改、调用方法

```go
package main

import "fmt"

// Animal 相关
// ---------------------------------------------------
type Animal struct {            // [!code focus]
	Name string                 // [!code focus]
}                               // [!code focus]

func (a Animal) Eat(food string) {  // [!code focus]
	fmt.Println("Eat " + food)      // [!code focus]
}                                   // [!code focus]

// Cat 相关
// ---------------------------------------------------
type Cat struct {           // [!code focus]
	Animal                  // [!code focus]
}                           // [!code focus]

func (c Cat) meow() {       // [!code focus]
	fmt.Println("meow~")    // [!code focus]
}                           // [!code focus]

// Dog 相关
// ---------------------------------------------------
type Dog struct {           // [!code focus]
	Animal                  // [!code focus]
}                           // [!code focus]

func (d Dog) woof() {       // [!code focus]
	fmt.Println("woof~")    // [!code focus]
}                           // [!code focus]

func main() {
	d := Dog{}              // [!code focus]
	d.Animal.Name = "Dog"   // [!code focus]
	fmt.Println(d, d.Animal.Name)
	d.Animal.Eat("bone")    // [!code focus]
	d.woof()                // [!code focus]

	c := Cat{}              // [!code focus]
	c.Animal.Name = "Cat"   // [!code focus]
	fmt.Println(c, c.Animal.Name )
	c.Animal.Eat("fish")    // [!code focus]
	c.meow()                // [!code focus]
}


// {{Dog}} "Dog"
// "Eat bone"
// "woof~"
// {{Cat}} "Cat"
// "Eat fish"
// "meow~"
```

:::

## 多态

## 接口
