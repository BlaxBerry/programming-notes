---
prev: false
next: false
---

# TypeScript 相关

![](/static/skill-images/typescript.webp)

## 环境构建

### 下载安装

::: code-group

```shell [全局安装]
npm install -g typescript
# or
yarn global add typescript
```

```shell [版本查看]
tsc -V
```

:::

---

### 初始配置

TypeScript 项目中的配置位于`tsconfig.json`文件

- 通过命令手动初始化生成 TypeScript 配置文件
- 前端框架工具构建的项目大都内置 TypeScript 配置，只需更改配置文件即可

[更多详见](https://www.typescriptlang.org/tsconfig)

```ts
export const strictObjectEntries = <T extends Record<string, any>>(
  object: T
): [keyof T, T[keyof T]][] => {
  return Object.entries(object);
};
```
