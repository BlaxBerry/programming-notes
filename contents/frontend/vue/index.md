---
prev: false
next: false
---

# Vue 相关

![](/static/skill-images/vue.webp)

> 本文为 Vue3 的组合式 API ( Composition API )

Vue 严格来说是个处理页面 UI 的库而不是框架

## 库特点

根文件

```ts
import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### 单文件组件

.vue 文件

```vue
<script setup lang="ts">
// 脚本
</script>

<template>
  <!-- 结构 -->
</template>

<style scoped>
/* 样式 */
</style>
```

## 响应式数据

### ref()、reactive()

`reactive()`有局限性，更推荐使用`ref`定义响应式数据

|                      |       `ref()`        |     `reactive()`     |
| -------------------- | :------------------: | :------------------: |
| 定义基本类型数据     |          ✅          |          ❌          |
| 定义引用类型数据     |          ✅          |          ✅          |
| `<script>`中获取值   |       `.value`       |       直接获取       |
| `<template>`中获取值 |       直接获取       |       直接获取       |
| 重新分配后仍有响应性 |          ✅          |          ❌          |
| 传入函数时仍有响应性 |          ✅          |          ❌          |
| 解构时仍有响应性     |          ❌          |          ❌          |
| 解构后获取响应性的值 | `toRefs()`包裹后解构 | `toRefs()`包裹后解构 |
