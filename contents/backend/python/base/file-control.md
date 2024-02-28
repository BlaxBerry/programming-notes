# Python 文件操作

## 打开关闭文件

建议使用`with`语句来操作文件，会自动关闭文件可避免资源泄漏

建议要加上异常处理来捕获文件打开时可能出现的异常

```py
try:
    with open("文件路径", "访问模式") as file:   # [!code focus:3]
    # 文件读写操作
    # ...
except FileNotFoundError:
    # 文件不存在
except PermissionError:
    # 无访问权限
except Exception as e:
    print(f"其他错误: {e}")

```

## 访问模式

访问模式默认为`r`只读

| 访问模式 | 说明               |
| :------: | ------------------ |
|   `r`    | 只读               |
|   `w`    | 覆盖写入字符串     |
|   `a`    | 追加写入字符串     |
|   `wb`   | 覆盖写入二进制字节 |

## 文件读取

```py
with open("路径", "访问模式") as file:
    # 整个读取
    content = file.read()
    print(content)

    # 逐行读取
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # 去除每行末尾的换行符

```

::: details 例子：验证读取文本文件

::: code-group

```shell [目录]
|- example.txt
|- demo.py
```

```py [读取整个文件]
try:
    with open("./example.txt", "r") as file:     # [!code focus:3]
        content = file.read()
        print(content)

except Exception as err:
    print(err)
```

```py [多行读取]
try:
    with open("./example.txt", "r") as file:     # [!code focus:3]
        lines = file.readlines()
        for line in lines:
            print(line.strip())

except Exception as err:
    print(err)

```

:::

::: details 例子：验证读取 JSON 格式的文件

::: code-group

```shell [目录]
|- example.json
|- demo.py
```

```py [读取整个文件]
import json


try:
    with open("./example.json", "r") as file:            # [!code focus:4]
        content = file.read()
        data = json.loads(content)
        print(data, (type(data).__name__) == "dict")

except Exception as err:
    print(err)
```

:::

## 文件写入

文件写入时若文件不存在则会创建新文件，若文件已存在则会覆盖原文件内容

| 方法名              | 说明     |
| ------------------- | -------- |
| `file.write()`      | 写入     |
| `file.writeLines()` | 多行写入 |

```py
with open("路径", "访问模式") as file:
    # 写入
    file.write('文本内容\n')
    file.write('文本内容\n', indent=2) # 缩进两个空格进行格式化

    # 多行写入
    lines = ['行1内容\n', '行2内容\n', '行3内容\n']
    file.writelines(lines)
```

::: details 例子：验证写入文本文件

::: code-group

```shell [目录]
|- example.txt
|- demo.py
```

```py [覆盖写入]
try:
    with open("./example.txt", "w") as file:    # [!code focus:3]
        file.write("aaa\n")
        file.write("bbb\n")

except Exception as err:
    print(err)
```

```py [追加写入]
try:
    with open("./example.txt", "a") as file:    # [!code focus:3]
        file.write("aaa\n")
        file.write("bbb\n")

except Exception as err:
    print(err)
```

:::

::: details 例子：验证写入 JSON 格式的文件

JSON 格式数据在写入时所有字段缩进两个空格进行格式化

::: code-group

```shell [目录]
|- example.json
|- demo.py
```

```py [覆盖写入]
import json


data = {"name": "Andy", "age": 28}

try:
    with open("./example.json", "w") as file:   # [!code focus:3]
        json_string = json.dumps(data)
        file.write(json_string, indent=2)

except Exception as err:
    print(err)
```

:::

::: details 例子：验证下载图片文件 ( 二进制字节 )

```py
import requests


url = "https://pkg.go.dev/static/shared/gopher/package-search-700x300.jpeg"
response = requests.get(url=url)                # [!code focus]

try:
    with open("./go-pkg.jpg", "wb") as file:    # [!code focus:2]
        file.write(response.content)

except Exception as err:
    print(err)
```

:::
