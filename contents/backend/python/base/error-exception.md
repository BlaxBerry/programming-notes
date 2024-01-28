# Python 异常处理

## 捕获

### try...except...

```py
try:
    # ...
except 异常类型:
    # ...
except 异常类型:
    # ...
except Exception as 错误变量:
    # ...
```

## 抛出

### 关键字 raise

利用关键字`raise`抛出一个异常

```py
if 条件:
    raise 异常类型()
```
