# Python 流程控制

## 条件分支

### if...

```py
if 条件:
    # ...
```

---

### if...else...

```py
if 条件:
    # ...
else:
    # ...
```

---

### if...elif...

```py
if 条件:
    # ...
elif 条件:
    # ...
```

---

### if...elif...else...

```py
if 条件:
    # ...
elif 条件:
    # ...
else:
    # ...
```

::: details 例子：验证判断范围

```py
input = input("请输入成绩: ")
score = float(input)

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("把你家长叫来")
```

:::

## 循环

### for...in...

```py
for 变量 in 可迭代对象:
    # ...
```

::: details 例子：验证遍历字符串、列表

```py
# 遍历字符串
for v in "abcdefg":
    print(v, end=" ")


print()
# 遍历列表
for v in ["a", "b", "c"]:
    print(v, end=" ")


# a b c d e f g
# a b c
```

:::

::: details 例子：打印九九乘法表

```py
for x in range(1, 10):
    for y in range(1, x + 1):
        print(f"{x}*{y}={x * y}", end="\t")
    print()


# 1*1=1
# 2*1=2   2*2=4
# 3*1=3   3*2=6   3*3=9
# 4*1=4   4*2=8   4*3=12  4*4=16
# 5*1=5   5*2=10  5*3=15  5*4=20  5*5=25
# 6*1=6   6*2=12  6*3=18  6*4=24  6*5=30  6*6=36
# 7*1=7   7*2=14  7*3=21  7*4=28  7*5=35  7*6=42  7*7=49
# 8*1=8   8*2=16  8*3=24  8*4=32  8*5=40  8*6=48  8*7=56  8*8=64
# 9*1=9   9*2=18  9*3=27  9*4=36  9*5=45  9*6=54  9*7=63  9*8=72  9*9=81
```

:::

---

### for...in...else...

```py
for 变量 in 可迭代对象:
    # ...
else:
    # ...
```

---

### while...

```py

```

---

### range()

用于生成一定范围的整数值

左闭右开区间

```py
# 生成从 0 到 数值-1 的整数序列
range(数值)

# 生成从 开始数值 到 结束数值-1 的整数序列
range(开始数值, 结束数值)

# 生成从 开始数值 到 结束数值-1 的整数序列，且间隔步长
range(开始数值, 结束数值, 间隔步长)
```

::: details 例子：验证`range()`

```py
for v in range(5):
    print(v, end=" ")


print()
for v in range(1, 5):
    print(v, end=" ")


print()
for v in range(1, 11, 2):
    print(v, end=" ")


# 0 1 2 3 4
# 1 2 3 4
# 1 3 5 7 9
```

:::

---

### 关键字 break

---

### 关键字 continue
