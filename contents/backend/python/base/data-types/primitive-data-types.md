# Python 基本数据类型

## 整数类型 ( int )

## 浮点类型 ( float )

## 布尔类型 ( bool )

布尔型数据只有`True`、`False`

## 字符串类型 ( str )

字符串类型数据由单引号或双引号包裹

```py
变量 = '字符串'
变量 = "字符串"
```

---

### 格式化字符串

f-string

```py
变量 = f"字符串{变量}字符串"
```

---

### 长度

```py
变量 = len(字符串)
```

---

### 索引

```py
元素值 = 字符串[索引]
```

---

### 切片

可用于从字符串中截取出一个范围的字符串

步长可省略，默认为 1

```py
新字符串 = 字符串[起始索引:结束索引:步长]
```

::: details 例子：验证字符串切片

```py
string = "abcde"

print(string[1:])
print(string[0:3])
print(string[0 : len(string) : 2])
print(l[0::2])
print(l[::2])
print(string)


# bcde
# abc
# ace
# ace
# ace
# abcde
```

:::
