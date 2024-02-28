---
prev: false
next: false
---

# React 相关

![](/static/skill-images/react.webp)

> 本文为 React v18+ 的函数式组件 ( Functional Component )

React 严格来说是个处理页面 UI 的库而不是框架

https://www.bilibili.com/video/BV13h4y177jW?p=27&vd_source=8960252a3845b76b699282b11f36ab5c

## 库特点

### 虚拟 DOM

> Virtual DOM

React 不直接操作真实 DOM 而是通过虚拟 DOM

1. 当组件首次渲染时，React 创建了一个虚拟 DOM 树，该树结构与实际的 DOM 结构一一对应
2. 当组件的状态发生变化时，创建一个新的虚拟 DOM 树，表示组件在新状态下的样子
3. 然后通过对比虚拟 DOM 的变化，最终只更新真实 DOM 中实际发生变化的部分

---

### 单向数据流

React 中的一种数据传递模式，数据从父组件流向子组件

- 父组件通过属性层次传递数据到子组件
- 子组件通过回调函数将数据传递到父组件
