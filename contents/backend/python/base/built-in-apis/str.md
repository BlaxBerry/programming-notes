# Python 字符串的常用内置方法

## 格式化

---

### upper()

用于将字符串中成员全部转为大写

生成一个新的字符串，不影响原本字符串

```py
新字符串 = 字符串.upper()
```

::: details 例子：验证`upper()`

```py
string = "abc"

print(string.upper())
print(string)


# ABC
# abc
```

:::

---

### lower()

用于将字符串中成员全部转为小写

生成一个新的字符串，不影响原本字符串

```py
新字符串 = 字符串.lower()
```

::: details 例子：验证`lower()`

```py
string = "ABC"

print(string.lower())
print(string)


# abc
# ABC
```

:::

---

### strip()

用于将字符串开始与结尾的空字符串删除

生成一个新的字符串，不影响原本字符串

```py
新字符串 = 字符串.strip()
```

::: details 例子：验证`strip()`

```py
string = "  abc  "

print(string.strip(), len(string.strip()))
print(string)


# abc 3
#   abc
```

:::

## 查询

---

### find()

用于获取指定成员在字符串中的下标虚幻

- 若存在则返回第一次出现的位置
- 若不存在则返回`-1`

```py
下标 = 字符串.find("字符串")
```

::: details 例子：验证查询`find()`

```py
string = "hello world"

print(string.find("l"))
print(string.find("xxx"))


# 2
# -1
```

:::

---

### count()

用于获取指定成员在字符串中的出现次数

```py
次数 = 字符串.count("字符串")
```

::: details 例子：验证查询`count()`

```py
string = "aaabcdfff"

print(string.count("a"))
print(string.count("fff"))


# 3
# 1
```

:::

## 判断

---

### startswith()

用于判断字符串是否以指定内容开头

```py
布尔值 = 字符串.startswith("字符串")
```

::: details 例子：验证`startswith()`

```py
string = "hello world"


print(string.startswith("hello"))
print(string.startswith("xxx"))


# True
# False
```

:::

---

### endswith()

用于判断字符串是否以指定内容结尾

```py
布尔值 = 字符串.endswith("字符串")
```

::: details 例子：验证`endswith()`

```py
string = "hello world"


print(string.endswith("world"))
print(string.endswith("xxx"))


# True
# False
```

:::

## 替换

---

### replace()

用于替换字符串中的成员为其他自定字符串

- 生成一个新的字符串，不影响原本字符串
- 若不指定第三个参数，则默认为替换全部
- 若第三个参数指定的个数超过实际存在的个数，则替换全部目标成员

```py
新字符串 = 字符串.replace("目标字符串", "新的字符串", [替换个数])
```

::: details 例子：验证`replace()`

```py
string = "aaabcd"

print(string.replace("a", "x"))
print(string.replace("a", "x", 1))
print(string.replace("a", "x", 2))
print(string.replace("a", "x", 3))
print(string.replace("a", "x", 4))  # 无意义
print(string)


# xxxbcd
# xaabcd
# xxabcd
# xxxbcd
# xxxbcd
# aaabcd
```

:::

## 插入

---

### join()

将字符串插入目标字符串中每一个成员之后

生成一个新的字符串，不影响原本字符串

```py
新字符串 = "要插入的字符串".join("目标字符串")
```

::: details 例子：验证`join()`

```py
string = "abc"

print("x".join(string))
print("ddd".join(string))
print(string)


# axbxc
# adddbdddc
# abc
```

:::

## 切割

---

### split()

用于基于指定的成员将字符串分割为列表

- 生成一个新的字符串，不影响原本字符串
- 参数可省略，默认为基于空格`" "`分割

```py
新字符串 = 字符串.split(["字符串"])
```

::: details 例子：验证`split()`

```py
string = "a|b c|d"

print(string.split())
print(string.split("|"))
print(string)


# ['a|b', 'c|d']
# ['a', 'b c', 'd']
# a|b c|d
```

:::
