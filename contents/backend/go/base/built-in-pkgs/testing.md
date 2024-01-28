# testing 包

是 Go 标准库中的一个内置包

用于自动化测试，可实现单元测试 ( Unit Test )

## 基本使用

### 创建测试文件

1. 测试文件必须与源码文件处于同一目录下
2. 测试文件命名必须以`_test.go`结尾

```shell
项目目录
|- 某个包
    |- 文件名.go        # 要测试的源码文件
    |- 文件名_test.go   # 测试文件
    |- ...
    # 同一个包内成员可以拆分，为例方便查看也可以函数为单位创建文件
    # |- 具体函数文件.go
    # |- 具体函数文件_test.go
|- ...
```

---

### 创建测试函数

3. 测试文件包名必须以`_test`结尾
4. 测试文件内的测试函数名必须为`Test`开头，其中根据指定条件调用对应的`testing.T`类型上的方法输出不同的日志

::: code-group

```go [测试文件]
package 包名_test

import "testing"

func Test测试函数(t *testing.T) {
    返回值 := 包名.要测试的函数([参数])
    if 条件 {
        // 测试结果正确时输出日志
        t.Log(数据)
        t.Logf("格式字符串", 数据)

        // 测试结果错误时输出日志，并在此处停止执行
        t.Fatal(数据)
        t.Fatalf("格式字符串", 数据)

        // 测试结果错误时输出日志，执行不会停止
        t.Error(数据)
        t.Errorf("格式字符串", 数据)
    }

    // 返回值 := 包名.要测试的函数([参数])
    // if 条件 {
    //     t.内置方法()
    // }
}
```

:::

---

### 执行测试命令

5. 在指定目录下执行`go test`命令

```shell
# 1. 执行指定目录下所有测试文件中 Test 开头的测试函数
cd 指定目录 && go test
# 或
go test 指定目录

# 2. 仅执行指定测试文件
go test -v 测试文件_test.go 源文件.go

# 3. 仅执行指定测试函数
go test -v -run=指定Test测试函数
```

::: details 例子：验证测试文件的创建与自动执行

> 基于`pkg`包中的`GetSum`函数创建测试函数。并分别进行三次测试

::: code-group

```shell [目录结构]
demo
|- pkg
    |- getSum.go
    |- getSum_test.go
|- main.go
|- go.mod
```

```shell [执行命令]
% cd demo
% go test ./pkg

--- FAIL: TestGetSum (0.00s)
    sum_test.go:12: 【正常系】GetSum(3) == 6
    sum_test.go:17: 【异常系】GetSum(3) != 100，正确结果为 6
    sum_test.go:22: 【异常系】GetSum(0) 报错 参数错误
FAIL
exit status 1
FAIL    demo/pkg        0.265s
```

```go [getSum_test.go]
package pkg_test

import (
	"demo/pkg"
	"testing"
)

func TestGetSum(t *testing.T) {

	//【正常系】GetSum(3) == 6
	if res, _ := pkg.GetSum(3); *res == 6 {
		t.Log("【正常系】GetSum(3) == 6")
	}

	//【异常系】GetSum(3) == 100
	if res, _ := pkg.GetSum(3); *res != 100 {
		t.Logf("【异常系】GetSum(3) != 100，正确结果为 %v", *res)
	}

	//【异常系】GetSum(0)
	if _, err := pkg.GetSum(0); err != nil {
		t.Fatal("【异常系】GetSum(0) 报错", err)
	}
}
```

```go [getSum.go]
package pkg

import "errors"

func GetSum(count int) (*int, error) {
    if count <= 0 {
		return nil, errors.New("参数错误")
	}

	sum := 0

	for i := 1; i <= count; i++ {
		sum += i
	}
	return &sum, nil
}
```

:::
