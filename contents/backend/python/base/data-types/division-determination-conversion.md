# Python 类型分类、判断、转换

## 类型分类

- 基于数据的性质与结构可分为：
  - 基本类型数据 ( Primitive Types )
  - 复合类型数据 ( Composite Types )
- 基于数据在内存中的存储方式可分为：
  - 值类型数据 ( Value Types )
  - 引用类型数据 ( Reference Types )

---

### 基本数据类型

> Primitive Types

[更多详见](./primitive-data-types.md)

---

### 复合数据类型

> Composite Types

[更多详见](./composite-data-types.md)

## 类型判断

### type()

```py
type(数据)
```

::: details 例子：验证`type()`方法的使用

```py
def check_type(data: int):
    return type(data)


print(check_type(10).__name__)
print(check_type(10.00).__name__)
print(check_type("xxx").__name__)
print(check_type([]).__name__)
print(check_type(()).__name__)
print(check_type({}).__name__)


# int
# float
# str
# list
# tuple
# dict
```

:::

## 类型转换

| 方法      | 说明                                 |
| --------- | ------------------------------------ |
| `int()`   | 将布尔值、数值字符串转为整数型       |
| `float()` | 将布尔值、整数、数值字符串转为浮点型 |
| `bool()`  | 将数据转为对应的布尔类型             |
| `str()`   | 将数据转为字符串类型                 |

::: details 例子：验证`int()`

```py
print(int(True))
print(int(False))
print(int("123"))


# 0
# 1
# 123
```

:::

::: details 例子：验证`float()`

```py
print(float(True))
print(float(False))
print(float(0))
print(float(123))
print(float("123"))
print(float("123.00"))


# 1.0
# 0.0
# 0.0
# 123.0
# 123.0
# 123.0
```

:::

::: details 例子：验证`bool()`

```py
# 会转为 True
print(bool("xxx"))
print(bool("True"))
print(bool("False"))
print(bool(1))
print(bool(123))
print(bool([1, 2, 3]))

# 会转为 False
print(bool(""))
print(bool(0))
print(bool([]))
print(bool(()))
print(bool({}))


# True
# True
# True
# True
# True
# True
# False
# False
# False
# False
# False
```

:::

## 类型提示

Python 是一种动态类型语言不需要显示指定数据的类型

但为了代码可读性，可使用类型提示

```py
变量: 类型 = 值


def 函数(参数: 类型) -> None:
    pass


def 函数(参数: 类型) -> 类型:
    return 值
```

## 静态类型检查
