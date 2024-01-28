# net 包

是 Go 标准库中的一个内置包

主要用于网络请求

::: code-group

```go [导入]
package 当前包

import "net"     // [!code focus]
```

:::

## 例子

### HTTP 协议

::: code-group

```go [HTTP服务端]
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// 路由处理
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.RemoteAddr, "连接成功")

		fmt.Println("method:", r.Method) // 请求方式
		fmt.Println("url:", r.URL.Path)  // 请求路径
		fmt.Println("header:", r.Method) // 请求头
		fmt.Println("body:", r.Method)   // 请求体

		// 响应数据
		w.Write([]byte("响应数据"))
	})

	// 监听端口
	http.ListenAndServe("127.0.0.1:8080", nil)
}
```

:::

---

### TCP 协议

::: code-group

```go [TCP服务端]
package main

import (
	"bufio"
	"fmt"
	"net"
)

func main() {
	// 监听端口
	listen, err := net.Listen("tcp", "127.0.0.1:8080")
	if err != nil {
		fmt.Println("net listen error:", err)
		return
	}

	for {
		// 建立连接
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("net accept error:", err)
			continue
		}

        // 开启携程处理连接
		go process(conn)
	}
}

func process(conn net.Conn) {
	// 关闭连接
	defer conn.Close()

	for {
		reader := bufio.NewReader(conn)

		var buf [128]byte
		// 读取数据
		n, err := reader.Read(buf[:])
		if err != nil {
			fmt.Println("net read from client error:", err)
			break
		}

		recvStr := string(buf[:n])
		fmt.Println("data from client:", recvStr)

		// 发送数据
		conn.Write([]byte(recvStr))
	}
}
```

```go [TCP客户端]
package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:8080")
	if err != nil {
		fmt.Println("err", err)
	}

	// 关闭连接
	defer conn.Close()

	inputReader := bufio.NewReader(os.Stdin)
	for {
		// 读取用户输入
		input, _ := inputReader.ReadString('\n')
		inputInfo := strings.Trim(input, "\r\n")

		// 输入 q 就退出
		if strings.ToUpper(inputInfo) == "Q" {
			return
		}

		// 发送数据
		_, err = conn.Write([]byte(inputInfo))
		if err != nil {
			return
		}

		buf := [512]byte{}
		n, err := conn.Read(buf[:])
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		fmt.Println("接收到服务端发送来的数据：", string(buf[:n]))
	}
}
```

:::
