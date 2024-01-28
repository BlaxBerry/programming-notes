# encoding 包

是 Go 标准库中的一个内置包

主要用于对 JSON、XML、Base64、XML、Gob 等格式的数据的操作

## JSON 格式数据

使用`encoding/json`包

对 JSON 格式数据的编码 ( 序列化 ) 与解码 ( 反序列化 )

::: code-group

```go [导入]
package 当前包

import "encoding/json"  // [!code focus]
```

:::

---

### json.Marshal()

该方法用于结构体类型、映射类型的数据的序列化，即转为 JSON 格式的数据

```go
字节切片, 错误对象 := json.Marshal(结构体实例或映射类型变量)    // [!code focus]
if 错误对象 != nil {
    // ...
    return
}
json字符串 := string(字节切片)
```

::: details 例子：验证结构体类型数据转 JSON 格式( 借助 Tag 标签 )

[更多详见](../oop/struct.md#tag-标签)

```go
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

:::

::: details 例子：验证映射类型数据转 JSON 格式

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	m := map[string]string{                 // [!code focus]
		"en": "English",                    // [!code focus]
		"ja": "Japanese",                   // [!code focus]
		"zh": "Chinese",                    // [!code focus]
	}                                       // [!code focus]

    bts, err := json.Marshal(m)				// [!code focus]
	if err != nil {							// [!code focus]
		fmt.Println(err)
		return
	}										// [!code focus]
	fmt.Println(bts)
	jsonStr := string(bts)					// [!code focus]
	fmt.Println(jsonStr)					// [!code focus]
}


// [123 34 101 110 34 58 34 69 110 103 108 105 115 104 34 44 34 106 97 34 58 34 74 97 112 97 110 101 115 101 34 44 34 122 104 34 58 34 67 104 105 110 101 115 101 34 125]
// {"en":"English","ja":"Japanese","zh":"Chinese"}
```

:::

---

### json.Unmarshal()

该方法用于 JSON 格式的数据的反序列化，即转为对应的结构体类型、映射类型的数据

- 方法参数接收两个参数：
  - 一个 JSON 格式数据的字节切片
  - 一个用于存放接收格式转换后数据的指针变量，指针变量不能为空指针，否则报错

```go
字节切片 := []byte(JSON格式字符串)

错误对象 := json.Unmarshal(字节切片, &指针变量) // [!code focus]
if 错误对象 != nil {
    // ...
    return
}
数据 := *指针变量
```

::: details 例子：验证实现 JSON 格式转结构体类型数据

```go
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

::: details 例子：验证实现 JSON 格式转映射类型数据

```go
package main

import (
	"encoding/json"
	"fmt"
)

var jsonStr = `{"en":"English","ja":"Japanese","zh":"Chinese"}` // [!code focus]

func main() {
	bytes := []byte(jsonStr)                            // [!code focus]
	m := make(map[string]string)                        // [!code focus]

	if err := json.Unmarshal(bytes, &m); err != nil {   // [!code focus]
		fmt.Println(err)
		return                                          // [!code focus]
	}                                                   // [!code focus]

	fmt.Println(m)
	for k, v := range m {                               // [!code focus]
		fmt.Println(k, v)                               // [!code focus]
	}                                                   // [!code focus]
}


// map[en:English ja:Japanese zh:Chinese]
// ja Japanese
// zh Chinese
// en English
```

:::
