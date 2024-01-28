# Python 字典的常用内置方法

## 删除

---

### clear()

用于清空字典中所有键值对

- 方法无返回值
- 方法会改变字典

```py
字典.clear()
```

::: details 例子：验证`clear()`

```py
d = {"name": "Andy", "age": 28}

print(d.clear())
print(d)


# None
# {}
```

:::

## 遍历

---

### keys()

用于获取一个包含字典所有键的动态视图，该视图可被遍历

```py
视图 = 字典.keys()
```

::: details 例子：验证`keys()`

```py
d = {"name": "Andy", "age": 28}

for k in d.keys():
    print(k)


# name
# age
```

:::

---

### values()

用于获取一个包含字典所有值的动态视图，该视图可被遍历

```py
视图 = 字典.values()
```

::: details 例子：验证`values()`

```py
d = {"name": "Andy", "age": 28}

for v in d.values():
    print(v)


# Andy
# 28
```

:::

---

### items()

用于获取一个包含字典所有键值对的动态视图，该视图可被遍历

```py
视图 = 字典.items()
```

::: details 例子：验证`items()`

```py
d = {"name": "Andy", "age": 28}

for item in d.items():
    print(item)


for k, v in d.items():
    print(k, v)


# ('name', 'Andy')
# ('age', 28)
# name Andy
# age 28
```

:::

---
