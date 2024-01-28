# Python 列表的常用内置方法

## 追加、插入、合并

---

### append()

用于在列表尾部追加元素

- 方法无返回值
- 方法会改变列表

```py
列表.append(元素)
```

::: details 例子：验证`append()`

```py
l = ["a", "b", "c"]

print(l.append("xxx"))
print(l)


# None
# ['a', 'b', 'c', 'xxx']
```

:::

---

### insert()

用于在列表的指定位置插入元素

- 方法无返回值
- 方法会改变列表

```py
列表.insert(下标, 元素)
```

::: details 例子：验证`insert()`

```py
l = ["a", "b", "c"]

print(l.insert(0, "x"))
print(l.insert(2, "y"))
print(l.insert(5, "z"))
print(l)


# None
# None
# None
# ['x', 'a', 'y', 'b', 'c', 'z']
```

:::

---

### extend()

用于合并两个列表

- 方法无返回值
- 方法会改变列表

```py
列表.extends(合并到结尾的列表)
```

::: details 例子：验证`extend()`

```py
l = ["a", "b", "c"]

print(l.extend(["x", "y", "z"]))
print(l)


# None
# ['a', 'b', 'c', 'x', 'y', 'z']
```

:::

## 删除

---

### pop()

用于删除列表中最后一个元素

- 方法返回值为删除的元素
- 方法会改变列表

```py
列表.pop()
```

::: details 例子：验证`pop()`

```py
l = ["a", "b", "c"]

print(l.pop())
print(l.pop())
print(l)


# c
# b
# ['a']
```

:::

---

### remove()

用于从列表中删除指定的元素

- 方法无返回值
- 方法会改变列表
- 若参数传入的元素不存在，则报错`ValueError`类型

```py
列表.remove(元素)
```

::: details 例子：验证`remove()`

```py
l = ["a", "b", "c"]

print(l.remove("b"))
print(l.remove("a"))
print(l)


# None
# None
# ['c']
```

:::

---

### clear()

用于清空列表中所有的元素

- 方法无返回值
- 方法会改变列表

```py
列表.clear()
```

::: details 例子：验证`clear()`

```py
l = ["a", "b", "c"]

print(l.clear())
print(l)


# None
# []
```

:::
