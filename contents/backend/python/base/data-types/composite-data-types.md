# Python 复合数据类型

## 元组

> Tuple

元组类型数据由小括号包裹

元组的操作于列基本一致，但元组中的元素不能增删改

```py
变量 = ()
变量 = (元素,)
变量 = (元素, 元素)
```

## 列表

> List

列表类型数据由小中括号包裹

```py
变量 = []
变量 = [元素, 元素]
```

---

### 索引

```py
# 获取元素值
元素值 = 列表[索引]

# 修改元素值
列表[索引] = 新值
```

---

### 切片

可用于从列表中截取出一个范围的元素 ( 左闭右开 )

步长可省略，默认为 1

```py
新列表 = 列表[起始索引:结束索引:[步长]]
```

::: details 例子：验证列表切片

```py
l = ["a", "b", "c", "d", "e"]

print(l[1:])
print(l[0:3])
print(l[0 : len(l) : 2])
print(l[0::2])
print(l[::2])
print(l)


# ['b', 'c', 'd', 'e']
# ['a', 'b', 'c']
# ['a', 'c', 'e']
# ['a', 'c', 'e']
# ['a', 'c', 'e']
# ['a', 'b', 'c', 'd', 'e']
```

:::

---

### in、not in

用于判断元素是否存在于列表中

```py
布尔值 = 元素 in 列表
布尔值 = 元素 not in 列表
```

::: details 例子：验证`in`、`not in`

```py
l = ["a", "b", "c"]

print("a" in l)
print("x" in l)
print("x" not in l)


# True
# False
# True
```

:::

::: details 例子：验证`in`结合索引修改元素值

```py
l = ["a", "b", "c"]


def update(element: str, new_data: str) -> None:    # [!code focus]
    if element in l:                                # [!code focus]
        l[l.index(element)] = new_data              # [!code focus]


update("a", "xxx")
update("p", "zzz")
print(l)


# ['xxx', 'b', 'c']
```

:::

---

### 关键字 del

可用于删除列表中指定下标的元素或整个列表

- 删除元素时若元素下标不存在，则报错`IndexError`类型异常
- 删除整个列表后，列表既不存在无法被访问，否则报错`NameError`类型异常

```py
# 删除列表中一个元素
del 列表[索引]

# 删除整个列表
del 列表
```

::: details 例子：验证`del`删除列表元素与整个列表

```py
l = ["a", "b", "c"]

del l[0]
print(l)

del l
print(l)    # [!code error] # 报错列表未定义


# ['b', 'c']
```

:::

## 字典

> Dictionary

元组类型数据由大括号包裹多组键值对

```py
变量 = {}
变量 = {"键": 值, "键": 值}
```

---

### 访问、修改、追加

通过键访问值时若键不存在，则报错`KeyError`类型

通过键重新赋值时，若键已存在则为修改，否则为追加的键值对

```py
# 获取键值对的值
值 = 字典["键"]

# 修改/追加键值对
字典["键"] = 新值
```

::: details 例子：验证通过键名访问与修改键值对

```py
d = {"name": "Andy", "age": 28}

print(d["name"])
print(d["age"])

d["gender"] = "male"
print(d["gender"])


# Andy
# 28
# male
```

:::

---

### get()

通过`get()`访问值时若键不存在，则返回`None`

```py
值 = 字典.get("键")
值 = 字典.get("键", 获取不到时使用的默认值)
```

::: details 例子：验证通过`get()`访问键值对

```py
d = {"name": "Andy", "age": 28}

print(d.get("name"))
print(d.get("age"))
print(d.get("gender"))
print(d.get("gender", "xxx"))


# Andy
# 28
# None
# xxx
```

:::

---

### 关键字 del

可用于删除列字典中指定的键值对或整个字典

- 删除键值对时键不存在，则报错`KeyError`类型异常
- 删除整个字典后，字典既不存在无法被访问，否则报错`NameError`类型异常

```py
# 删除字典中一个键值对
del 字典["键"]

# 删除整个字典
del 字典
```

::: details 例子：验证`del`删除字典键值对与整个字典

```py
d = {"name": "Andy", "age": 28}


del d["name"]
del d["age"]
print(d)

del d
print(d)    # [!code error] # 报错字典未定义


# {}
```

:::

## 集合

> Set
