# json 包

是 Python 的一个内置模块

用于 JSON 格式数据的编码 ( 序列化 ) 与解码 ( 反序列化 ) 相关操作

::: code-group

```py [导入]
import json
```

:::

### json.dumps()

用于对 Python 的对象进行序列化编码，即转为 JSON 字符串

```py
JSON字符串 = json.dumps(列表或字典类型的数据)
```

::: details 例子：验证对字典、列表的序列化

```py
import json


# 字典
json_string = json.dumps({"name": "Andy", "age": 28})
print(json_string, type(json_string).__name__)

# 列表
json_string = json.dumps([1, 2, 3])
print(json_string, type(json_string).__name__)


# {"name": "Andy", "age": 28} str
# [1, 2, 3] str
```

:::

### json.loads()

用于对 JSON 字符串进行序列化解码，即转为 Python 的对象

```py
列表或字典类型的数据 = json.loads(JSON字符串)
```

::: details 例子：验证对 JSON 字符串的反序列化

```py
import json


# 转为字典
data = json.loads('{"name": "Andy", "age": 28}')
print(data, type(data).__name__)

# 转为列表
data = json.loads("[1, 2, 3]")
print(data, type(data).__name__)


# {'name': 'Andy', 'age': 28} dict
# [1, 2, 3] list
```

:::
