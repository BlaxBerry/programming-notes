# 流程控制

与其他语言基本一致，但判断与循环的条件表达式省略括号

条件表达式部分可使用[短变量声明](./variable-constant.md#短变量声明)的写法，创建仅在该代码块范围内生效的变量

## 条件分支

### if...

```go
if 条件 {			 // [!code focus]
    // ...			// [!code focus]
}					// [!code focus]


// 短变量声明写法
if 变量 := 表达式; 条件 {
    // ...
}
```

::: details 例子：取两个数之间的最大值

```go
package main

import "fmt"

func main() {
	fmt.Println(getMax(1, 2))	 // [!code focus]
	fmt.Println(getMax(4, 1))	 // [!code focus]
}

func getMax(a, b int) int {		 // [!code focus]
	var res int					 // [!code focus]

	if b > a {					 // [!code focus]
		res = b					 // [!code focus]
	} else {					 // [!code focus]
		res = a					 // [!code focus]
	}							 // [!code focus]

	return res					 // [!code focus]
}								 // [!code focus]


// 2
// 4
```

:::

::: details 例子：对函数返回值进行错误判断

> 如下，使用两种写法<br/>
> 第二种写法的变量不是初次定义而是重新赋值所以没用`:=`

```go
package main

import (
	"errors"
	"fmt"
)

func fff(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("分母不能为 0")
	}
	return a / b, nil
}

func main() {
    // 写法一
	res, err := fff(4, 2)	            // [!code focus]
	if err != nil {			            // [!code focus]
		fmt.Println(err)	            // [!code focus]
	}						            // [!code focus]

    // 写法二
	if _, err = fff(4, 0); err != nil {	// [!code focus]
		fmt.Println(err)	 			// [!code focus]
	}									// [!code focus]
}
```

:::

---

### if...else...

```go
if 条件 {		 // [!code focus]
    // ...		// [!code focus]
} else {		// [!code focus]
    // ...		// [!code focus]
}				// [!code focus]


// 短变量声明写法
if 变量 := 表达式; 条件 {
    // ...
} else {
    // ...
}
```

::: details 例子：判断奇偶数

```go
package main

import "fmt"

func fff(num int) {         // [!code focus]
	if num % 2 == 0 {         // [!code focus]
		fmt.Println("偶数")  // [!code focus]
	} else {                // [!code focus]
		fmt.Println("奇数")  // [!code focus]
	}                       // [!code focus]
}                           // [!code focus]

func main() {
	fff(2)                  // [!code focus]// 偶数
	fff(3)                  // [!code focus]// 奇数
}
```

:::

---

### if...else if...

```go
if 条件1 {			 // [!code focus]
    // ...			// [!code focus]
} else if 条件2 {	// [!code focus]
    // ...			// [!code focus]
}					// [!code focus]


// 短变量声明写法
if 变量 := 表达式; 条件1 {
    // ...
} else if 条件2 {
    // ...
}
```

---

### if...else if...else...

```go
if 条件1 {			 // [!code focus]
    // ...			// [!code focus]
} else if 条件2 {	 // [!code focus]
    // ...			// [!code focus]
} else if 条件3 {	 // [!code focus]
    // ...			// [!code focus]
} else {			// [!code focus]
    // ...			// [!code focus]
}					// [!code focus]


// 短变量声明
if 变量 := 表达式; 条件1 {
    // ...
} else if 条件2 {
    // ...
} else if 条件3 {
    // ...
} else {
    // ...
}
```

---

### switch...case...

从上到下每个注意测试每个`case`分支直到匹配为止，匹配成功后不再执行后续`case`分支

`case`分支默认在末尾使用`break`，可省略不写

```go
// 写法一					 // [!code focus]
var 变量 = 表达式			  // [!code focus]

switch 变量 {				 // [!code focus]
case 值1:					// [!code focus]
    // ...					// [!code focus]
case 值2, 值3, 值4:			 // [!code focus] // 匹配多个值
    // ...					// [!code focus]
default:					// [!code focus]
    // ...					// [!code focus]
}						    // [!code focus]


// 写法三					 // [!code focus]
switch {					// [!code focus]
case 条件1:					// [!code focus]
    // ...					// [!code focus]
case 条件2:					// [!code focus]
    // ...					// [!code focus]
default:					// [!code focus]
    // ...					// [!code focus]
}						    // [!code focus]


// 短变量声明
switch 变量 := 表达式; {
case 条件1:
    // ...
case 条件2:
    // ...
default:
    // ...
}
```

::: details 例子：判断终端的输入内容

```go
package main

import "fmt"

func main() {
	var input int    		// [!code focus]
	fmt.Scan(&input) 		// [!code focus]

	switch {			     // [!code focus]
	case input >= 90:	     // [!code focus]
		fmt.Println("优秀")	 // [!code focus]
	case input >= 80:	     // [!code focus]
		fmt.Println("良好")	 // [!code focus]
	case input >= 70:	    // [!code focus]
		fmt.Println("中等")	 // [!code focus]
	case input >= 60:	    // [!code focus]
		fmt.Println("及格")	 // [!code focus]
	default:	   			// [!code focus]
		fmt.Println("不及格")// [!code focus]
	}				        // [!code focus]
}
```

:::

---

### 关键字 fallthrough

用于穿透`switch...case...`语句中匹配成功的`case`分支，强制执行其下一个`case`分支

```go
switch 表达式返回值 {
case 值1:
    // ...
case 值2:
    // ...
    fallthrough
case 值3:		// ← 进入这个分支
    // ...
default:
    // ...
}
```

::: details 例子：验证`fallthrough`穿透已匹配成功的`case`分支

```go
package main

import "fmt"

func main() {
	flag := 1		     	 // [!code focus]

	switch flag {  		     // [!code focus]
	case 1:  			 	 // [!code focus]
		fmt.Println(1)  	 // [!code focus]
		fallthrough  		 // [!code focus]
	case 2:  			 	 // [!code focus]
		fmt.Println(2)  	 // [!code focus]
	case 3:  			 	 // [!code focus]
		fmt.Println(3)  	 // [!code focus]
	}
}


// 1
// 2
```

:::

## 循环

### for...

```go
var 变量 = 表达式	  // [!code focus]

for 条件 {			 // [!code focus]
    // ...			// [!code focus]
    变量迭代		 // [!code focus]
}					// [!code focus]


// 短变量声明写法
for 变量 := 表达式; 条件; 变量迭代 {
    // ...
}
```

::: details 例子：循环打印 1~10 中的偶数

```go
package main

import "fmt"

func main() {
	i := 1      			    // [!code focus]
	for i <= 10 {     		    // [!code focus]
		fmt.Println(i)      	// [!code focus]
		i++      				// [!code focus]
	}      						// [!code focus]

	// 短变量声明写法      		  // [!code focus]
	for i := 1; i <= 5; i++ {   // [!code focus]
		if i%2 == 0 {           // [!code focus]
			fmt.Println(i)      // [!code focus]
		}                       // [!code focus]
	}                           // [!code focus]
}


// 2
// 4
// 6
```

:::

::: details 例子：计算 1 ～ 10 的累加和

```go
package main

import "fmt"

func main() {
	sum := 0							// [!code focus]

	for num := 1; num <= 10; num++ {	// [!code focus]
		sum += num						// [!code focus]
	}									// [!code focus]

	fmt.Println(sum)
}


// 55
```

::: details 例子：打印九九乘法表

```go
package main

import "fmt"

func main() {
	for x := 1; x <= 9; x++ {                       // [!code focus]
		for y := 1; y < x + 1; y++ {                // [!code focus]
			fmt.Printf("%v*%v=%v\t", x, y, x*y)     // [!code focus]
		}                                           // [!code focus]
		fmt.Println()                               // [!code focus]
	}                                               // [!code focus]
}


// 1*1=1
// 2*1=2   2*2=4
// 3*1=3   3*2=6   3*3=9
// 4*1=4   4*2=8   4*3=12  4*4=16
// 5*1=5   5*2=10  5*3=15  5*4=20  5*5=25
// 6*1=6   6*2=12  6*3=18  6*4=24  6*5=30  6*6=36
// 7*1=7   7*2=14  7*3=21  7*4=28  7*5=35  7*6=42  7*7=49
// 8*1=8   8*2=16  8*3=24  8*4=32  8*5=40  8*6=48  8*7=56  8*8=64
// 9*1=9   9*2=18  9*3=27  9*4=36  9*5=45  9*6=54  9*7=63  9*8=72  9*9=81
```

:::

::: details 例子：模拟其他语言中的`while`循环 <Badge type="danger">慎用</Badge>

```go
package main

import "fmt"

func main() {
	i := 1     			// [!code focus]

	for {     			// [!code focus]
		if i > 10 {     // [!code focus]
			break     	// [!code focus]
		}     			// [!code focus]

		fmt.Println(i)	// [!code focus]
		i++     		// [!code focus]
	}     				// [!code focus]
}


// 1
// 2
// 3
// 4
// 5
```

:::

---

### 关键字 range

用于在`for`循环中遍历数组、切片、集合、通道

:::code-group

```go [数组、切片、字符串]
for 索引, 元素 := range 数据 {
    // ...
}

for 索引 := range 数据 {
    // ...
}

for _, 元素 := range 数据 {
    // ...
}
```

```go [集合]
for 键, 值 := range 数据 {
    // ...
}

for 键 := range 数据 {
    // ...
}

for _, 值 := range 数据 {
    // ...
}
```

:::

::: details 例子：验证遍历数组、切片、集合

:::code-group

```go [数组、切片]
package main

import "fmt"

func main() {
	var arr = [3]string{"a", "b", "c"} 	// [!code focus]

	for index, element := range arr { 	// [!code focus]
		fmt.Println(index, element)
	}                                 	// [!code focus]

	var slice = []string{"a", "b", "c"} // [!code focus]

	for index, element := range slice { // [!code focus]
		fmt.Println(index, element)
	}                                 	// [!code focus]
}


// 0 "a"
// 1 "b"
// 2 "c"

// 0 "a"
// 1 "b"
// 2 "c"
```

```go [集合]
package main

import "fmt"

func main() {
	var m = map[string]int{"a": 1, "b": 2, "c": 3}  // [!code focus]

	for key, value := range m {                     // [!code focus]
		fmt.Println(key, value)
	}                                               // [!code focus]
}


// a 1
// b 2
// c 3
```

:::

::: details 例子：计算切片所有元素的累加和

```go
package main

import "fmt"

func main() {
	slice := []int{1, 2, 3}		// [!code focus]

	sum := 0
	for _, e := range slice {	// [!code focus]
		sum += e				// [!code focus]
	}							// [!code focus]

	fmt.Println((sum))
}


// 6
```

:::

---

### 关键字 break

用于提前结束当前的循环

::: details 例子：

结束的是`break`所在的那一层循环，若只有一层循环则直接结束

:::code-group

```go [一层循环]
package main

import "fmt"

func main() {
	for i := 1; i <= 10; i++ {  // [!code focus]
		if i == 2 || i == 3 {   // [!code focus]
			break               // [!code focus]
		}                       // [!code focus]
		fmt.Println(i)          // [!code focus]
	}                           // [!code focus]
}


// 1
```

```go [多层循环]
package main

import "fmt"

func main() {
	for x := 1; x <= 3; x++ {       // [!code focus]
		for y := 1; y <= 3; y++ {   // [!code focus]
			if y == 2 || y == 3 {   // [!code focus]
				break               // [!code focus]
			}                       // [!code focus]
			fmt.Print(y)            // [!code focus]
		}                           // [!code focus]
		fmt.Println()               // [!code focus]
	}                               // [!code focus]
}


// 1
// 1
// 1
```

:::

::: tip `return`vs`break`

- `break`只会结束最近一层，在多层循环中后续循环还会执行
- `return`则是直接结束当前函数，后续代码一律不再执行

:::

---

### 关键字 continue

用于放弃本次循环后续的代码直接进入下一轮循环

::: details 例子：

:::code-group

```go [一层循环]
package main

import "fmt"

func main() {
	for i := 1; i <= 5; i++ {   // [!code focus]
		if i == 2 || i == 3 {   // [!code focus]
			continue            // [!code focus]
		}                       // [!code focus]
		fmt.Println(i)          // [!code focus]
	}                           // [!code focus]
}


// 1
// 4
// 5
```

```go [多层循环]
package main

import "fmt"

func main() {
	for x := 1; x <= 3; x++ {       // [!code focus]
		for y := 1; y <= 5; y++ {   // [!code focus]
			if y == 2 || y == 3 {   // [!code focus]
				continue            // [!code focus]
			}                       // [!code focus]
			fmt.Print(y)            // [!code focus]
		}                           // [!code focus]
		fmt.Println()               // [!code focus]
	}                               // [!code focus]
}


// 145
// 145
// 145
```

:::
