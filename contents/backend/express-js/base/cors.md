# Express.js 跨域访问

可通过 cors 包处理 CORS 跨域资源访问

::: code-group

```shell [安装]
npm install cors
```

:::

实质是利用了中间件

需要在所有路由配置之前使用 cors 中间件

::: code-group

```ts{0} [允许所有域名访问]
import express from "express";
import cors from "cors";            // [!code focus:3]

app.use(cors())

app.listen(8000, () => {
  // ...
});
```

```ts{0} [仅指定域名可访问]
import express from "express";
import cors from "cors";            // [!code focus]

const app = express();

const allowedOrigins = [            // [!code focus:5]
  "https:/xxxx.com",
  "https:/xxxx.com",
  "http://localhost:xxxx",
];

app.use(                             // [!code focus:11]
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.listen(8000, () => {
  // ...
});
```

:::
