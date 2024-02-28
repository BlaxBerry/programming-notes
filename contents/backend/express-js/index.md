---
prev: false
next: false
---

# Express.js 相关

![](/static/skill-images/express-js.webp)

> 本文为 ESModule + TypeScript 环境

Express.js 是个基于 Node.js 的轻量级 Web 框架

## 项目构建

### 下载安装

::: code-group

```shell [项目初始化&包下载]
% cd 项目目录
# 1. 项目包初始化
% npm init
# 2. 下载 Express.js
% npm install express   # [!code focus]
```

:::

---

### 项目创建

::: code-group

```js [基础服务器]
import express from "express";

// 创建服务器主应用
const app = express();

// 主应用监听服务器端口
app.listen(8000, () => {
  // ...
});
```

:::

---

### 项目目录

::: code-group

```shell [推荐目录结构]
[项目目录]/
|- dist/
    |- ...
|- public/                  # 静态资源
|- src/
    |- configs/             # 配置项目
    |- controllers/         # 控制器
    |- models/              # 数据模型
    |- routes/              # 路由
    |- ...
    |- app.ts
|- package.json
|- tsconfig.json
|- ...
```

:::
