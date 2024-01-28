# os 包

是 Go 标准库中的一个内置包

主要用于系统操作

::: code-group

```go [导入]
package 当前包

import "os"     // [!code focus]
```

:::

## 文件读取

1. 利用`os.Open()`函数打开文件获取`os.File`类型的文件指针
2. 利用`bufio.NewReader()`函数创建读取对象
3. 并利用读取对象上的`ReadString('\n')`方法转换读取文件内容
4. 利用文件指针上的`Close()`方法关闭文件

```go
package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
    // 打开文件
	f, err := os.Open("文件路径/文件.后缀")
	if err != nil {
		fmt.Println(err)
		return
	}

    // 关闭文件
	defer f.Close()

    // 读取文件内容
	fileReader := bufio.NewReader(f)
	for {
		str, err := fileReader.ReadString('\n')
		// 文件读完退出循环
		if err == io.EOF {
			break
		}
		// ... fmt.Print(str)
	}
}
```
