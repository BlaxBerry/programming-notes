# requests

requests 是一个用于发送 HTTP 请求的第三方包

## 下载

```shell
# python -m venv .venv
# source .venv/bin/active
pip install requests        # [!code focus]
```

## 发送请求

### GET 请求

```py
参数 = {"键": 值, "键": 值}

response = requests.get("请求路径", params=参数)

# 手动设置编码格式
response.encoding = "utf-8"
```

::: details 例子：验证下载图片文件 ( 二进制字节 )

```py
import requests


url = "https://pkg.go.dev/static/shared/gopher/package-search-700x300.jpeg"
response = requests.get(url=url)                # [!code focus]

try:
    with open("./go-pkg.jpg", "wb") as file:    # [!code focus:2]
        file.write(response.content)

except Exception as err:
    print(err)
```

:::

---

### POST 请求

```py
参数 = {"键": 值, "键": 值}

response = requests.post("请求路径", data=参数)

# 手动设置编码格式
response.encoding = "utf-8"
```

## 响应数据

```py
response = requests.get("请求路径")
# 手动设置编码格式
response.encoding = "utf-8"

# 完整的请求地址
print(response.url)

# 响应状态码
print(response.status_code)

# 响应头字符编码
print(response.encoding)

# 响应内容 ( Unicode 格式 )
print(response.text)
# 响应内容 ( 二进制字节格式 )
print(response.content)
```

## 请求头

```py
请求头 = {
    "字段": "值",
    "字段": "值",
}

response = requests.get("请求路径", headers=请求头)
```
