# ProtoBuf

> Protocol Buffers

![](/static/skill-images/protobuf.webp)

> 本文为 Proto 3

<!-- https://search.bilibili.com/all?keyword=.proto&search_source=3

https://www.bilibili.com/video/BV12841137kP/?spm_id_from=333.788&vd_source=8960252a3845b76b699282b11f36ab5c -->

ProtoBuf 是一个谷歌开发的数据序列化格式

- 体积小解析快，比以往的 XML、JSON 格式的通信更高效
- 支持多种语言，可实现不同语言之间的数据通信
- 数据需定义在`.proto`文件中

[更多详见](https://protobuf.dev/programming-guides/proto3/)

## 环境构建

### 下载安装

在使用前必须安装解析器`protoc`

::: code-group

```shell [安装]
brew install protobuf
```

```shell [查看版本]
protoc --version
```

:::

> 如下：本文使用了 protoc 25.2

```shell
% protoc --version
libprotoc 25.2
```

## 文件书写

```proto
// 指定 proto 语言版本
syntax = "proto3";

// 复数 proto 文件相互使用时需指定该文件所属的包的路径
package 文件路径.文件路径.包名;

// 编译后生成的 Go 代码所属的包名
option go_package = "文件路径/文件路径/包名";

// 定义消息结构
message 消息类型 {
  字段类型 字段名 = 字段唯一编号;
  字段类型 字段名 = 字段唯一编号;
}
```

---

### 消息类型

- 消息类型名使用小驼峰命名 ( camelCase )
- 字段名使用蛇形命名 ( snake_case )
- 字段唯一编号从 1 开始，定义后不要改变，若有改变需使用`reserved`
- 基本数据类型支持：`string`、`init32`、`float`、`bool`
- 赋值数据类型支持：`repeated`( 数组 )、`map`( 映射 )

```proto
message 消息类型 {
  字段类型 字段名 = 字段唯一编号;
  repeated 元素类型 字段名 = 字段唯一编号;
  map<string, 值类型> 字段名 = 字段唯一编号;
  枚举类型 字段名= 字段唯一编号;
  其他消息类型 字段名 = 字段唯一编号;
}
```

::: details 例子：基于`.proto`文件编译生成`.pb.go`文件

::: code-group

```proto [.proto]
syntax = "proto3";

option go_package = "go/modals";


message Person {
    string name = 1;
    Gender gender = 2;
    int32 age = 3;
}

enum Gender {
    MALE = 0;
    FAMLE = 2;
    OTHER = 3;
}
```

```go [.pb.go]
package person                            // [!code focus]

// 省略 ...

type Person struct {                      // [!code focus]
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name   string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`                           // [!code focus:3]
	Gender Gender `protobuf:"varint,2,opt,name=gender,proto3,enum=scenario.Gender" json:"gender,omitempty"`
	Age    int32  `protobuf:"varint,3,opt,name=age,proto3" json:"age,omitempty"`
}

type Gender int32                       // [!code focus:7]

const (
	Gender_MALE  Gender = 0
	Gender_FAMLE Gender = 2
	Gender_OTHER Gender = 3
)

// 省略 ...
```

:::

::: details 例子：基于`.proto`文件编译生成`.pb.go`文件

::: code-group

```proto [.proto]
syntax = "proto3";

option go_package = "go/modals";


message Person {
    string name = 1;
    int32 age = 2;
    repeated string skills = 3;
    Score score = 4;
}

message Score {
    string language = 1;
    float score = 2;
}

```

```go [.pb.go]
package modals                                    // [!code focus]

// 省略 ...

type Person struct {                              // [!code focus]
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name   string            `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`    // [!code focus:5]
	Age    int32             `protobuf:"varint,2,opt,name=age,proto3" json:"age,omitempty"`
	Skills []string          `protobuf:"bytes,3,rep,name=skills,proto3" json:"skills,omitempty"`
	Score  *Score            `protobuf:"bytes,4,opt,name=score,proto3" json:"score,omitempty"`
}

type Score struct {                             // [!code focus]
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Language string  `protobuf:"bytes,1,opt,name=language,proto3" json:"language,omitempty"`  // [!code focus:3]
	Score    float32 `protobuf:"fixed32,2,opt,name=score,proto3" json:"score,omitempty"`
}

// 省略 ...
```

:::

---

### 枚举类型

- 字段唯一编号从 0 开始，定义后不要改变，若有改变需使用`reserved`

```proto
enum 枚举类型 {
  XXX_XXX = 0
  XXX_XXX = 1
  XXX_XXX = 2
}
```

---

### 字段保留、删除

## 文件编译

利用编译器 protoc 编译为指定的语言

protoc 自带了一些语言的编译支持 ( Python、Ruby、PHP、C ... )

---

### Go

编译为 Go 代码时需要先下载对应的工具

```shell
# 1. 下 Go 的第三方包 protoc-gen-go                   # [!code focus:6]
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# 2. 将该包添加至系统环境变量 ( 一劳永逸将所有 Go 的第三方包全部添加 )
export PATH="$PATH:$(go env GOPATH)/bin" >> ~/.zshrc
source ~/.zshrc

# 检查该包的位置与版本
which protoc-gen-go
protoc-gen-go --version

# 3. 将 .proto 文件编译为 .pb.go 文件                  # [!code focus:4]
protoc -I=[所有proto源文件所在路径]\
       --go_out=[编译后生成的go文件路径]\
       [要编译的目标proto文件路径].proto
```

<details class="details custom-block">
  <summary>例子：基于<code>.proto</code>文件编译生成<code>.pb.go</code>文件</summary>

> 将`schema`目录下的所有`.proto`文件编译为`.pb.go`文件并生成到`./go`目录下

::: code-group

```shell [目录结构]
[项目根目录]
|- schema/
    |- person.proto
|- go/
    |- person.pb.go
```

```shell [命令]
% cd 项目根目录
% protoc -I=./schema --go_out=. ./schema/**/*.proto   # [!code focus]
```

:::

</details>
````
