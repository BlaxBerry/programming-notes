# 函数、方法

Go 有函数与方法两种概念，方法是一种特殊的函数

::: tip

- 函数 ( Functions )：与其他语言的函数概念基本一致
- 方法 ( Methods )：是一种仅作用于指定类型数据上的函数，与函数基本一致，但是必须通过[方法接收者](#方法接收者)指明其要关联的数据类型，来供所有该类型的数据调用

:::

::: code-group

```go [函数]
// 创建
func 函数(形参 参数类型) 返回值类型 {
    // ...
    return 返回值
}

// 调用
var 返回值 类型 = 函数(实参)
返回值 := 函数(实参)
```

```go [方法]
// 创建
func (接收者 接收者类型) 方法(形参 参数类型) 返回值类型 {
    // ...
    return 返回值
}

// 调用
var 返回值 类型 = 接收者类型的数据.方法(实参)
返回值 := 接收者类型的数据.方法(实参)
```

:::

## 访问权限

[更多详见](./modules-dev/pkg-module-workspace.md#包)

- 首字母大写的函数、方法被视为全局函数 ( 可在别的包文件中调用 )
- 首字母大写的函数、方法仅可在当前包中使用 ( 不能在别的包文件中调用 )

## 参数

- 参数不是必须，若有参数需指明类型
- 有多个参数时需分别指定类型，若类型相同可在最后简写

::: code-group

```go [无参数]
func 函数() {
    // ...
}
```

```go [一个参数]
func 函数(参数 类型) {
    // ...
}
```

```go [多个参数]
func 函数(参数1 类型, 参数2 类型) {
    // ...
}

func 函数(参数1, 参数2, 参数3 相同类型) {
    // ...
}
```

:::

::: details 例子：验证参数不同的函数的创建与调用

::: code-group

```go [无参数]
package main

import "fmt"

func doSomething() {    // [!code focus]
	fmt.Println("xxx")
}                       // [!code focus]

func main() {
	doSomething()       // [!code focus]
}


// "xxx"
```

```go [一个参数]
package main

import "fmt"

func doSomething(a int) {   // [!code focus]
	fmt.Println(a)
}                           // [!code focus]

func main() {
	doSomething(10)         // [!code focus]
}


// 10
```

```go [多个参数]
package main

import "fmt"

func doA(a, b int) {        // [!code focus]
	fmt.Println(a, b)
}                           // [!code focus]

func doB(a int, b string) { // [!code focus]
	fmt.Println(a, b)
}                           // [!code focus]

func main() {
	doA(10, 20)             // [!code focus]
	doB(10, "xxx")          // [!code focus]
}


// 10 20
// 10 xxx
```

:::

---

### 不定参数

- 参数个数不固定时以切片形式接收
- 若还有其他固定参数时，不定参数要放在最后

```go
func 函数(不定参数 ...类型) {
    // ...
}

func 函数(参数1 类型, 参数2 类型, 不定参数 ...不定参数类型) {
    // ...
}

func 函数(参数1, 参数2 相同类型, 不定参数 ...不定参数类型) {
    // ...
}
```

::: details 例子：验证不定参数的创建与传入

```go
package main

import "fmt"

func main() {
	doA()                               // [!code focus]
	doA(10)                             // [!code focus]
	doA(10, 20)                         // [!code focus]

	doB("xxx", "yyy")                   // [!code focus]
	doB("xxx", "yyy", 1, 2, 3)          // [!code focus]
}

func doA(params ...int) {               // [!code focus]
	fmt.Println(params)
}                                       // [!code focus]

func doB(a, b string, params ...int) {  // [!code focus]
	fmt.Println(a, b, params)
}                                       // [!code focus]


// []
// [10]
// [10 20]
// xxx yyy []
// xxx yyy [1 2 3]
```

:::

::: details 例子：利用函数不定参数求和

```go
package main

import "fmt"

func main() {
	fmt.Println(getSum())            // [!code focus]
	fmt.Println(getSum(1, 2, 3))     // [!code focus]
}

func getSum(ns ...int) int {         // [!code focus]
	sum := 0                         // [!code focus]

	for i := 0; i < len(ns); i++ {   // [!code focus]
		sum += ns[i]                 // [!code focus]
	}                                // [!code focus]

	return sum                       // [!code focus]
}                                    // [!code focus]


// 0
// 6
```

:::

---

### 参数传递

Go 函数参数传递的永远都是值传递 ( Pass by Value )，传递的都是值的拷贝，在函数内部对其修改不影响原本数据，仅在当前函数作用域内生效

但参数为[引用类型数据](./data-types/division-determination-conversion.md#引用类型数据)时，传递的实质是底层数据的引用 ( 指针的副本 )，在函数内部对其修改会影响到原始的变量，给人一种类似其他语言中引用传递 ( Pass by Reference ) 的感觉

::: details 例子：函数内直接修改接收的数组类型数据的值不影响原本数据

```go
package main

import "fmt"

func doSomething(arr [3]string) {           // [!code focus]
	arr[0], arr[1], arr[2] = "x", "y", "z"  // [!code focus]
	fmt.Println("函数内", arr)
}                                           // [!code focus]

func main() {
	arr := [3]string{"a", "b", "c"}         // [!code focus]
	fmt.Println(arr)

	doSomething(arr)                        // [!code focus]
	fmt.Println(arr)
}


// [a b c]
// 函数内 [x y z]
// [a b c]
```

:::

::: details 例子：函数内直接修改接收的结构体类型数据的值不影响原本数据

```go
package main

import "fmt"

type person struct {					// [!code focus]
	Name string							// [!code focus]
	Age  int							// [!code focus]
}										// [!code focus]

func doSomething(p person) { 			// [!code focus]
	p.Name = "Tom" 						// [!code focus]
	p.Age = 16     						// [!code focus]
} // [!code focus]

func main() {
	p := person{Name: "Andy", Age: 28} // [!code focus]
	fmt.Println(p)

	doSomething(p) 					   // [!code focus]
	fmt.Println(p)
}


// {Andy 28}
// {Andy 28}
```

:::

::: details 例子：函数内直接修改接收的切片类型数据的值会影响原本数据

```go
package main

import "fmt"

func doSomething(slice []string) {           		// [!code focus]
	slice[0], slice[1], slice[2] = "x", "y", "z"	// [!code focus]
	fmt.Println("函数内", slice)
}                                           	    // [!code focus]

func main() {
	slice := []string{"a", "b", "c"}         		// [!code focus]
	fmt.Println(slice)

	doSomething(slice)                        		// [!code focus]
	fmt.Println(slice)
}


// [a b c]
// 函数内 [x y z]
// [x y z]
```

:::

::: danger

- 在函数内修改引用类型数据内部成员会影响原始数据
- 但在函数内给整个引用类型数据重新赋值不会影响原始数据<br/>
  ( 相当于给重新分配了一个与原本数据引用毫无关联的新的底层数据 )

[更多详见](./data-types/division-determination-conversion.md#引用类型数据)

:::

---

### 指针参数

若想在函数内修改值类型数据的原始值可利用[指针](./pointer.md#使用)

- 函数的实参与形参为指针，形参类型为指针类型
- 函数内使用的是指针变量

```go
函数(&数据)

func 函数(参数 *参数类型) {
    *参数 = 新值
}
```

::: details 例子：验证函数内利用指针在间接修改值类型数据的值

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
	// 创建原本数据值的副本并修改这个副本，而不是修改原职在内存中的存储，故不会影响原值
	// a := *arr 								    // [!code error]
	// a[0], a[1], a[2] = "x", "y", "z"				// [!code error]
}													// [!code focus]


// [a b c]
// [x y z]
```

:::

## 返回值

- 返回值不是必须，若有返回值需指明返回值类型
- 有多个返回值时需要用小括号包裹返回值类型
- 函数一般会在返回值的最后返回一个错误对象用于异常处理

::: code-group

```go [无返回值]
func 函数() {
    // ...
}
```

```go [一个返回值]
func 函数() 类型 {
    // ...
    return 返回值
}
```

```go [多个返回值]
func 函数() (类型, 类型) {
    // ...
    return 返回值, 返回值
}
```

:::

::: details 例子：验证返回值不同的函数的创建与调用

::: code-group

```go [无返回值]
package main

import "fmt"

func doSomething() {    // [!code focus]
	fmt.Println("xxx")
}                       // [!code focus]

func main() {
	doSomething()       // [!code focus]
}
```

```go [一个返回值]
package main

import "fmt"

func doSomething() string { // [!code focus]
	return "xxx"
}                           // [!code focus]

func main() {
	res := doSomething()    // [!code focus]
}


// "xxx"
```

```go [多个返回值]
package main

import (
	"errors"
	"fmt"
)

func main() {
	num, message := doSomething()   // [!code focus]
	fmt.Println(num, message)

    a, _ := doSomething()           // [!code focus]
	fmt.Println(a)

	_, b := doSomething()           // [!code focus]
	fmt.Println(b)
}

func doSomething() (int, error) {   // [!code focus]
	return 10, errors.New("xxx")
}                                   // [!code focus]


// 10 "xxx"
// 10
// "xxx"
```

:::

---

### 指针与异常

一般函数的返回值建议包含一个错误对象用于调用时的异常处理

可使用指针使返回值默认值为`nil` [更多详见](./pointer.md)

```go
import "errors"

func 指针函数() (指针类型, error) { // [!code focus]
	// ...
    if 条件 {                     // [!code focus]
        return 指针, nil          // [!code focus]
    }                            // [!code focus]
	return nil, errors.New()	 // [!code focus]
}                                // [!code focus]
```

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

## 函数类型

---

### main 函数

- `main`函数没有参数、返回值，在程序执行时自动调用
- `main`函数作为是 Go 应用程序的入口，执行`go run`命令时实际上是在执行 Go 程序的`main`函数
- 一个程序只能包含一个`main`函数

```go
package main

func main() {
	// ...
}
```

---

### init 函数

- `init`函数没有参数、返回值，在程序执行时自动调用
- `init`函数会在`main`函数执行之前被自动调用
- `init`函数通常用于执行一些初始化操作，例如初始化变量、打开文件、注册数据库驱动等
- 可以定义多个`init`函数，也可写入其他包后导入`main`包，应用程序执行时会按照定义顺序/导入顺序依次执行

```go
package main

func init() {
	// ...
}

func main() {
	// ...
}
```

::: details 例子：验证多个`init`函数的执行顺序

::: code-group

```shell [目录]
|- pkg
    |- a.go
    |- b.go
|- main.go
|- go.mod
```

```go [pkg/a.go]
package pkg

import "fmt"

func init() {
	fmt.Println("pkg/a.go's init")
}

var A = "a"
```

```go [pkg/b.go]
package pkg

import "fmt"

func init() {
	fmt.Println("pkg/b.go's init")
}

var B = "b"
```

```go [main.go]
package main

import (
	"demo/pkg"
	"fmt"
)

func init() {
	fmt.Println("project's init")
}

func main() {
	fmt.Println("project's main")
	fmt.Println(pkg.A, pkg.B)
}


// pkg/a.go's init
// pkg/b.go's init
// project's init
// project's main
// a b
```

:::

---

### 匿名函数

> Anonymous Function

使用场景：

- 作为立即执行函数
- 作为回调函数

```go
var 函数名 = func() {
    // ...
}

var 函数名 = func(参数 类型) {
    // ...
}

var 函数名 = func() 返回值类型 {
    // ...
    return 返回值
}
```

---

### 立即执行函数

> Immediately Invoked Function Expression ( IIFE )

```go
func() {
    // ...
}()


func(参数 类型) {
    // ...
}(实参)
```

::: details 例子：验证有无传参的立即执行函数的调用

```go
package main

import "fmt"

func main() {
    // 无参数                // [!code focus]
	func() {                // [!code focus]
		fmt.Println("xxx")  // [!code focus]
	}()                     // [!code focus]

    // 有参数                // [!code focus]
    func(a, b int) {        // [!code focus]
		fmt.Println(a, b)   // [!code focus]
	}(10, 20)               // [!code focus]
}


// "xxx"
// 10 20
```

:::

::: details 例子：模拟其他语言中的三元表达式

```go
package main

import "fmt"

func main() {
    condition := true       // [!code focus]
    result := 0             // [!code focus]

    result = func() int {   // [!code focus]
        if condition {      // [!code focus]
            return 100      // [!code focus]
        }                   // [!code focus]
        return 0            // [!code focus]
    }()                     // [!code focus]

    fmt.Println(result)
}


// 100
```

:::

---

### 高阶函数

接收一个函数作为参数的函数被称为高阶函数

详见下文[函数回调](#回调)

## 补充

---

### 递归

函数自己调用自己被称为递归

递归必须要设置一个结束条件以免变成死循环

递归比较消耗内存，是否使用取决于业务逻辑

::: details 例子：利用递归获取斐波那契数列

```go
package main

import "fmt"

func getFibonacci(n int) int {                      // [!code focus]
	if n <= 1 {                                     // [!code focus]
		return n                                    // [!code focus]
	}                                               // [!code focus]
	return getFibonacci(n-1) + getFibonacci(n-2)    // [!code focus]
}                                                   // [!code focus]

func main() {
    // 打印 10 次                                    // [!code focus]
	for i := 0; i < 10; i++ {                       // [!code focus]
		result := getFibonacci(i)                   // [!code focus]
		fmt.Println(i, result)                      // [!code focus]
	}                                               // [!code focus]
}


// 0 0
// 1 1
// 2 1
// 3 2
// 4 3
// 5 5
// 6 8
// 7 13
// 8 21
// 9 34
```

:::

---

### 回调

函数作为另一个函数的参数时被称为回调函数

::: details 例子：验证回调函数函数的使用

```go
package main

import "fmt"

type FuncType = func(v int) int

func doSomething(p int, callback FuncType) int {        // [!code focus]
	res := callback(p)                                  // [!code focus]
	return res + 1                                      // [!code focus]
}                                                       // [!code focus]

func main() {                                           // [!code focus]
	final := doSomething(2, func(v int) int {           // [!code focus]
		return v * 10                                   // [!code focus]
	})                                                  // [!code focus]

	fmt.Println(final)
}


// 21
```

:::

---

### 闭包

> Closures

---

### 关键字 defer

函数中可使用关键字`defer`可用于实现延一个函数或方法的执行

- `defer`后的方法调用会等所有逻辑处理的最后才执行
- 多个`defer`共存时会等最后逆序执行

```go
func 函数() {
    // ...
    defer 某个方法()
    defer 某个方法()
    // ...
}
```

::: details 例子：验证`defer`的延迟处理与逆序执行

```go
package main

import "fmt"

func main() {
	fmt.Println(1)       // [!code focus]
	defer fmt.Println(2) // [!code focus]
	defer fmt.Println(3) // [!code focus]
	defer fmt.Println(4) // [!code focus]
	fmt.Println(5)       // [!code focus]
}


// 1
// 5
// 4
// 3
// 2
```

:::

`defer`主要用于资源释放与清理操作

- 确保一个函数调用在最后执行，常用于关闭文件、释放锁、释放网络连接等
- 在函数体中某个语句可能发生错误时`defer`能确保在函数退出时进行清理，以免影响后续代码

::: details 例子：读取并打印一个文本文件

> 如下：`defer file.Close()`会在程序执行完毕时关闭文件，若不使用`defer`则必须在函数结尾某个地方那么关闭容易被遗漏，特别是在函数有多个出口的情况下

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file, err := os.Open("example.txt")         // [!code focus]
	if err != nil {                             // [!code focus]
		fmt.Println("Error open file:", err)    // [!code focus]
		return                                  // [!code focus]
	}                                           // [!code focus]

	defer file.Close()                          // [!code focus]

	scanner := bufio.NewScanner(file)           // [!code focus]
	for scanner.Scan() {                        // [!code focus]
		fmt.Println(scanner.Text())             // [!code focus]
	}                                           // [!code focus]
	if err := scanner.Err(); err != nil {       // [!code focus]
		fmt.Println("Error reading file:", err) // [!code focus]
	}                                           // [!code focus]
}
```

:::

---

### 方法接收者

> Receiver ( 可立即为其他语言中的 this、self )

方法接收者是指定义在方法名前面的参数，用于决定该方法关联到哪种类型的值或指针

可理解为给该类型上添加某个可被所有该类型数据调用的方法

::: warning

方法接收者只能关联到[自定义类型](./data-types/division-determination-conversion.md#自定义类型)，而不能关联 Go 内置的那些基础数据类型，否则报错

:::

```go
func (接收者 接收者的类型) 方法名([方法参数 参数类型]) [方法返回值] {
	// ...
}
```

方法接收者根据其是数据的副本还是数据的引用分为两种：

- 值接收者 ( Value Receiver )
- 指针接收者 ( Pointer Receiver )

```go
func (值接收者 接收者的数据类型) 方法名() {
	// ...
}

func (指针接收者 *接收者的指针类型) 方法名() {
	(*指针接收者).成员 = 新值
}
```

在该方法中可以访问到与该方法关联的接收者的值，若想在该方法在修改接收者的值则需要通过指针接收者以及利用[指针](./pointer.md)相关知识

使用场景：比如定义与结构体相关联的[结构体方法](./oop.md#结构体方法)来操作作为接收者的结构体实例对象

::: details 例子：验证调用值接收者、指针接收者的结构体方法修改结构体实例的字段

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
