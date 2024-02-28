# TS 泛型

> Generic

::: tip 泛型命名参考

- `<K>`: ( Key ) 对象键的类型
- `<V>`: ( Value ) 对象值的类型
- `<E>`: ( Element ) 元素的类型

:::

## 常见用法

---

### 接口泛型

```ts
// 定义
interface 接口名<T> {
  // ...
}

// 使用
let 数据: 接口名<类型>;
```

::: details 例子：

```ts
interface CustomArray<T> {
  length: T;
  push(item: T): T;
  getItem(index: number): T;
}

let arr: CustomArray<number> = {
  length: 0,
  push(item: number) {
    // ...
    // return item
  },
  getItem(index: number) {
    // ...
    // return index
  },
};
```

:::

---

### 类泛型

```ts
// 定义
class 类名<T> {
  // ...
}

// 使用
const 实例 = new Queue<number>();
```

::: details 例子：

```ts
class Queue<T> {
  items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
```

:::

---

### 函数泛型

```ts
// 写法一：普通函数定义泛型
function 函数1<T>(参数: T): T {
  // ...
}

// 写法二：键头函数定义泛型
const 函数2 = <T>(参数?: T): T | undefined => {
  // ...
};

// 使用
函数1<类型>(参数);
函数2<类型>();
```

---

### 组件泛型

::: code-group

```tsx{0} [React 普通组件]
import React from "react";

interface 子组件参数类型<T> {
  固定类型的属性: 类型;
  不定类型的属性: T;
}

// 使用
function 父组件() {
  return <子组件<类型> {...参数对象} />;        // [!code hl]
}

// 定义
function 子组件<T>(props: 子组件参数类型<T>) {    // [!code hl:3]
  return <></>;
}
```

```tsx{0} [React.memo( ) 缓存组件]
import React from "react";

interface 子组件参数类型<T> {
  固定类型的属性: 类型;
  不定类型的属性: T;
}

// 使用
function 父组件() {
  return <子组件Memorized<类型> {...参数对象} />;   // [!code hl]
}

// 定义
function 子组件<T>(props: 子组件参数类型<T>) {        // [!code hl:5]
  return <></>;
}
const memoWithGeneric: <T>(component: T) => T = React.memo;
const 子组件Memorized = memoWithGeneric(子组件);
```

:::

## 泛型约束

### 默认类型 ( = )

---

### 继承 ( extends )

---

### inter
