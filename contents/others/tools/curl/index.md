---
prev: false
next: false
---

# cURL 基础

![](/static/skill-images/curl.webp)

cURL 是个用于发送网络请求的命令行工具

[更多详见](https://catonmat.net/cookbooks/curl)

## HTTP 请求

### 请求方式

```shell
# GET 请求
curl [请求路径]

# POST 请求
curl -X POST [请求路径]

# PUT 请求
curl -X PUT [请求路径]

# DELETE 请求
curl -X DELETE [请求路径]
```

---

### 请求参数

```shell
# 路径参数
curl "请求路径/参数/参数"
curl -X 请求方式 "请求路径/参数/参数"

# 查询参数
curl "请求路径?参数=值&参数=值"
curl -X 请求方式 "请求路径?参数=值&参数=值"

# 表单参数
curl -X POST 请求路径 -d "键=值&键=值&键=值,值,值"
curl -X POST 请求路径 -F "键=值" -F "键=值,值,值"

# JSON格式表单参数
curl -X POST 请求路径 -H "Content-Type: application/json" -d '{"键":值,"键":值}'
```

::: details 例子：请求携带路径参数

```shell
# GET
curl "http://localhost:8080/a/b/c"
# POST
curl -X POST "http://localhost:8080/a/b/c"
```

:::

::: details 例子：请求携带路径参数

```shell
# GET
curl "http://localhost:8080?a=111&b=222&c=1,2,3"
# POST
curl -X POST "http://localhost:8080?a=111&b=222&c=1,2,3"
```

:::

::: details 例子：请求携带表单参数

```shell
# 写法一
% curl -X POST http://localhost:8080/xxx \
       -d "name=Andy&age=28&skills=JS,TS,GO,PYTHON"

# 写法二
% curl -X POST http://localhost:8080/xxx \
       -F "name=Andy" \
       -F "age=28" \
       -F "skills=JS,Go,Python"
```

:::

::: details 例子：请求 JSON 格式的表单参数

```shell
% curl -X POST http://localhost:8080/xxx \
       -H "Content-Type: application/json" \
       -d '{"name":"Andy","age":28,"skills":["JS","Go","Python"]}'
```

:::

## HTTP Headers

### 请求头

```shell
# 设置请求头
curl [请求路径] -H ["请求头字段: 值"]
```

::: details 例子：发送 POST 请求并携带数据，请求头设定为发送 JSON 格式的数据

```shell
% curl -X POST http://localhost:8080/xxx \
       -H "Content-Type: application/json" \
       -d '{"name":"Andy","age":28,"skills":["JS","Go","Python"]}'
```

:::

---

### 响应头

```shell
# 获取响应头
curl -I [请求路径]
```

## 资源下载

```shell
# 直接下载到执行命令的目录下
curl -O [请求路径]

# 修改名称后下载到执行命令的目录下
curl -o [自定义文件名] [请求路径]

# 限制资源下载速度
curl --limit-rate [速度] -O [请求路径]
curl --limit-rate [速度] -o [自定义文件名] [请求路径]
```

::: details 例子：将目标资源重命名为`logo-curl.svg`后下载

```shell
% curl -o logo-curl.svg https://api.iconify.design/logos/curl.svg

# 设置资源下载限制为 500k
% curl --limit-rate 500k \
       -o logo-curl.svg https://api.iconify.design/logos/curl.svg
```

:::
