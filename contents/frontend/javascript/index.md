---
prev: false
next: false
---

# JavaScript 相关

![](/static/skill-images/javascript.webp)

## 环境构建

JavaScript 有两种运行环境：

- 浏览器
- Node.js

```js
console.log(this === window ? "浏览器" : "Node.js");
```

## 技巧

### 深拷贝

structuredClone

```js
const a = [1, 2, [3, 4]];
const b = structuredClone(a);

b[2][0] = 999;

console.log(b); // [1, 2, [999, 4]]
console.log(a); // [1, 2, [3, 4]];
```
