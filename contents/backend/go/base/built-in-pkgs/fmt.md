# fmt 包

是 Go 标准库中的一个内置包，主要用于进行输入、输出、格式化

::: code-group

```go [导入]
import "fmt"
```

:::

## 输出 ( Print )

### fmt.Print()

讲方法接收的参数到直接输出终端

输出内容打印为一行

```go
fmt.Print(数据)
```

::: details 例子：验证全部打印到一行

```go
package main

import "fmt"

func main() {
	num := 111		// [!code focus]
	fmt.Print(num)	// [!code focus]

	num *= 2		// [!code focus]
	fmt.Print(num)	// [!code focus]

}


// 111222
```

:::

---

### fmt.Printf()

将方法接收的参数进行格式化后输出终端

输出内容打印为一行

```go
fmr.Printf("格式化字符串", 插入值, 插入值)
```

| 常用格式字符 |              含义               |
| :----------: | :-----------------------------: |
|    `"%%"`    |             一个`%`             |
|    `"%v"`    |            数据的值             |
|    `"%T"`    |           数据的类型            |
|    `"%s"`    |        字符串类型的数据         |
|    `"%f"`    |          浮点型的数据           |
|   `"%.1f"`   | 小数点后精度为 1 的浮点型的数据 |
|   `"%.2f"`   |  小数点后精度为 2 浮点型的数据  |

::: details 例子：验证打印格式化字符串

```go
package main

import "fmt"

func main() {
	num := 1.2					// [!code focus]
	fmt.Printf("%f\n", num)		// [!code focus]
	fmt.Printf("%.1f\n", num)	// [!code focus]
	fmt.Printf("%.2f\n", num)	// [!code focus]
	fmt.Printf("%.2f%%\n", num)	// [!code focus]
}


// "1.200000"
// "1.2"
// "1.20"
// "1.20%"
```

:::

---

### fmt.Println()

基本等同于[`fmt.print()`](#fmt-print)，但是会在输出内容结尾自动添加`"\n"`换行

```go
fmt.Println(数据)

// 等价于
fmt.Printf("%v\n", 数据)
```

::: details 例子：验证全部打印到一行

```go
package main

import "fmt"

func main() {
	num := 111		// [!code focus]
	fmt.Println(num)	// [!code focus]

	num *= 2		// [!code focus]
	fmt.Println(num)	// [!code focus]

}


// 111
// 222
```

:::

## 输入 ( Scan )

### fmt.Scan()

该方法的参数接收终端输入的文本信息，参数必须为指针变量

- 终端使用空格间隔输入的文本，间隔的文本会顺序存储给参数
- 终端使用 Enter 确认输入的文本

```go
var 变量 string

fmt.scan(&变量)
fmt.scan(&变量, &变量)
```

```go
package main

import "fmt"

func main() {
	// 获取一个值		  // [!code focus]
	var input string    // [!code focus]
	fmt.Scan(&input)    // [!code focus]
	fmt.Println(input)  // [!code focus]

	// 获取多个值		  // [!code focus]
	var (               // [!code focus]
        a string        // [!code focus]
        b string        // [!code focus]
    )                   // [!code focus]
	fmt.Scan(&a, &b)    // [!code focus]
	fmt.Println(a, b)   // [!code focus]
}
```

---

### fmt.Scanf()

基本等同于[`fmt.scan()`](#fmt-scan)，但根据指定的格式字符串从终端读取输入文本

---

### fmt.Scanln()

基本等同于[`fmt.scan()`](#fmt-scan)，但在从终端读取输入文本后会自动换行

## 格式化

### fmt.Sprint()

基本等同于[`fmt.print()`](#fmtprint)，但方法有返回值，为一个字符串

可用于创建一个拼接的字符串

```go
var 变量 string = fmt.Sprint("字符串", "字符串", 数据, 数据)
```

::: details 例子：验证将不同数据拼接为一个字符串

```go
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	andy := Person{
		Name: "Andy",
		Age:  28,
	}

	s := fmt.Sprint("name:\t", andy.Name, "\n", "age:\t", andy.Age)	// [!code focus]
	fmt.Println(s)
}


// name:   28
// age:    28
```

:::

---

### fmt.Sprintf()

基本等同于[fmt.Printf](#fmt-printf)，但方法有返回值，为一个字符串

可用于创建一个格式化的字符串

```go
变量 := fmt.Sprintf("%T", 数据)
```

::: details 例子：验证使用方法

```go
package main

import "fmt"

func main() {
	t1 := fmt.Sprintf("%T", "xxx")	// [!code focus]
	fmt.Println(t1)

	t2 := fmt.Sprintf("%T", 123)		// [!code focus]
	fmt.Println(t2)

	t3 := fmt.Sprintf("%T", struct{ x string }{x: "x"})	// [!code focus]
	fmt.Println(t3)
}


// string
// int
// struct { x string }
```

:::

---

### fmt.Errorf()

可用于创建错误信息

```go
var 变量 error = fmt.Errorf("错误信息")
```
