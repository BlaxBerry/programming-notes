# Express.js 路由、请求

## 基本路由

路由的处理函数也是个[中间件](./middleware.md)

```ts
const app = express();

app.请求方式("/访问路径", 路由处理函数); // [!code focus:2]
app.请求方式("/访问路径", 路由处理函数);
```

## 路由分组

有两种方法来实现路由的分组化：

- 通过创建子应用
- 使用中间件的方式：中间件则更为轻量

---

### 中间件写法

可利用 Express.js 内置方法`express.Router()`来实现路由分组的效果

适合用于结构与逻辑相对简单的场合

```ts
const app = express();

const 路由组 = express.Router(); // [!code focus:6]

路由组.请求方式("/访问路径", 路由处理函数);
路由组.请求方式("/访问路径", 路由处理函数);

app.use("/访问路径", 路由组);
```

---

### 子应用写法

> sub-app

创建一个子应用并为其定义路由，然后在主应用中挂载子应用来模拟路由分组的效果

子应用是一个独立的 Express 应用可有自己的配置和中间件，适合用于结构与逻辑更复杂的场合

```ts
const app = express();

const 子应用 = express();

子应用.请求方式("/访问路径", 路由处理函数);
子应用.请求方式("/访问路径", 路由处理函数);

app.use("/访问路径", 子应用);
```

## 请求方式

## 请求参数

### 路径参数

---

### 查询参数

---

### 表单参数

---

### 响应数据
