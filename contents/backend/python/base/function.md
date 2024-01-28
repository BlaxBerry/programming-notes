# Python 函数

## 定义与调用

```py
# 创建
def 函数(参数: 类型) -> 返回值类型:
    """
    文档字符串

    文档字符串
    文档字符串
    """
    # ...
    return 返回值


# 调用
返回值 = 函数()
返回值 = 函数(参数, 参数)
```

::: details 函数的文档字符串 ( DocStrings )

```py
import requests


def get_example():
    """
    发送一个简单的 GET 请求示例。

    返回:
    requests.Response: 包含响应信息的 Response 对象。
    """
    response = requests.get("https://www.example.com")
    return response


def post_example(data):
    """
    发送一个简单的 POST 请求示例。

    参数:
    data (dict): 要发送的数据。

    返回:
    requests.Response: 包含响应信息的 Response 对象。
    """
    response = requests.post("https://www.example.com/post", data=data)
    return response
```

:::

## 参数

---

### 位置参数

调用函数传参时按照形参的前后顺序传递

```py
# 创建
def 函数(形参, 形参):
    # ...


# 调用
函数(实参, 实参)
```

---

### 关键字参数

调用函数传参时指明对应的形参后赋值传递

```py
# 创建
def 函数(形参, 形参):
    # ...


# 调用
函数(形参名=实参, 形参名=实参)
```

::: details 例子：验证关键字传参

```py
def do_something(a, b):
    print(a, b)


do_something(b=2, a=1)
do_something(a=1, b=2)


# 1 2
# 1 2
```

:::

---

### 默认参数

在函数定义时指定行参的默认值，实参若无传入则使用默认值

```py
# 创建
def 函数(形参=默认值, =默认值):
    # ...


# 调用
函数()
函数(形参名=实参, 形参名=实参)
```

::: details 例子：验证默认参数

```py
def do_something(a=0, b=0):
    print(a, b)


do_something()
do_something(1, 2)
do_something(b=2, a=1)


# 0 0
# 1 2
# 1 2
```

:::

---

### 可变参数

在函数定义时允许接收不定数量的参数

- 位置参数：使用`*`定义，常命名为`args`，参数接收为一个元组
- 关键字参数：使用`**`定义，常命名为`kwargs`，参数接收为一个字典

::: code-group

```py [位置参数]
# 创建
def 函数(*形参):
    for 元素值 in 形参:
        # ...


# 调用
函数()
函数(实参)
函数(实参, 实参)
```

```py [关键字参数]
# 创建
def 函数(**形参):
    for 键, 值 in 形参.items():
        # ...


# 调用
函数()
函数(形参名=实参)
函数(形参名=实参, 形参名=实参)
```

:::

两种不定参数可与其他参数同时使用但必须放在后面，且关键字参数的不定参数要放在最后

```py
def 函数(其他参数, *args, **kwargs):
    for 元素值 in args:
        # ...
    for 键, 值 in kwargs.items():
        # ...
```

::: details 例子：验证同时使用位置参数和关键字参数的可变参数

```py
def do_something(*args, **kwargs):              # [!code focus]
    if len(args) > 0:                           # [!code focus]
        for v in args:                          # [!code focus]
            print(v)                            # [!code focus]

    if len(kwargs) > 0:                         # [!code focus]
        for k, v in kwargs.items():             # [!code focus]
            print(k, v)                         # [!code focus]

    if len(args) <= 0 and len(kwargs) <= 0:
        return
    else:
        print("----end----")


do_something()                                  # [!code focus]
do_something(1, 2, 3)                           # [!code focus]
do_something(a=11, b=22, c=33)                  # [!code focus]
do_something(1, 2, 3, a=11, b=22, c=33)         # [!code focus]

# 使用参数解包                                                # [!code focus]
do_something(*[1, 2, 3])                                    # [!code focus]
do_something(**{"a": 11, "b": 22, "c": 33})                 # [!code focus]
do_something(*[1, 2, 3], **{"a": 11, "b": 22, "c": 33})     # [!code focus]



# 1
# 2
# 3
# ----end----
# a 11
# b 22
# c 33
# ----end----
# 1
# 2
# 3
# a 11
# b 22
# c 33
# ----end----
# 1
# 2
# 3
# ----end----
# a 11
# b 22
# c 33
# ----end----
# 1
# 2
# 3
# a 11
# b 22
# c 33
# ----end----
```

:::

::: details 例子：利用位置参数的可变参数进行求和

```py
def get_sum(*args):
    if len(args) < 0:
        return 0
    elif len(args) == 1:
        return args[0]
    else:
        sum = 0
        for v in args:
            sum += v

        return sum


print(get_sum())
print(get_sum(1))
print(get_sum(1, 2, 3))


# 0
# 1
# 6
```

:::

---

### 实参解包

传递实参时可将现有的列表或字典数据解包后传递

多于位置参数与关键字参数的可变参数一起使用 [详见上文](#可变参数)

```py
函数(*列表)
# 相当于
# 函数(列表元素, 列表元素, 列表元素)

函数(**字典)
# 相当于
# 函数(键=值, 键=值, 键=值)
```

## 返回值

返回值不是必须，函数返回值默认为`None`

```py
def 函数():
    # ...
    # return 返回值


返回值 = 函数()
```

## 函数类型

---

### Lambda 函数

> Lambda Functions

使用关键字`lambda`创建

- 仅适用于简单的单行逻辑操作，复杂的逻辑应使用`def`定义的一般函数
- 其函数体中表达式即为返回值
- 多用于高级函数作为其参数

```py
函数 = lambda 参数, 参数: 函数体
```

::: details 例子：验证定义一个简单的求和 Lambda 函数

```py
get_sum = lambda a, b: a + b

print(get_sum(1, 2))
print(get_sum(2, 2))


# 3
# 4
```

:::

---

### 高级函数

> Higher-Order Functions

接收一个函数作为参数的函数被称为高阶函数

多为内置方法

详见上文 [Lambda 函数](#lambda-函数-匿名函数)

```

```

## 补充

### 递归

> Recursive

函数自己调用自己被称为递归

递归必须要设置一个结束条件以免变成死循环

递归比较消耗内存，是否使用取决于业务逻辑
