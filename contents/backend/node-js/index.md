---
prev: false
next: false
---

# Node.js 相关

![](/static/skill-images/node-js.webp)

## 环境构建

### 下载安装

> 本文使用 [asdf](/others/tools/asdf/)

::: code-group

```shell [安装]
# 1.
asdf plugin add nodejs
# 2.
asdf install nodejs [版本]
# 3.
asdf global nodejs [版本]
# 4.
asdf reshim nodejs
```

```shell [版本查看]
node --version
```

:::

> 如下: 本文使用了 Node.js v18.18.0

```shell
% asdf plugin add nodejs
% asdf install nodejs 18.18.0
% asdf global nodejs 18.18.0
% node --version
v18.18.0
```
