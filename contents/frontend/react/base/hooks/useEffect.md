# useEffect

该钩子函数用于处理副作用

常用于由渲染而非用户事件引起的数据获取、网络请求等不需要立即同步到视图的副作用

该钩子函数接受两个参数:

- 第一个参数: 一个副作用函数
- 第二个参数: 一个依赖项数组 ( 可省略 )

::: code-group

```tsx{0} [有依赖项]
import { useEffect } from "react";

export default function Component() {
  useEffect(                    // [!code focus]
    () => { /* 副作用函数 */ },   // [!code focus]
    [依赖项, 依赖项]              // [!code focus]
  );                            // [!code focus]

  return <></>;
}
```

```tsx{0} [空数组]
import { useEffect } from "react";

export default function Component() {
  useEffect(                    // [!code focus]
    () => { /* 副作用函数 */ },   // [!code focus]
    []                          // [!code focus]
  );                            // [!code focus]

  return <></>;
}
```

```tsx{0} [无依赖项数组]
import { useEffect } from "react";

export default function Component() {
  useEffect(                    // [!code focus]
    () => { /* 副作用函数 */ }   // [!code focus]
  );                           // [!code focus]

  return <></>;
}
```

:::

## 副作用函数

该钩子函数的第一个参数是个函数，被称为副作用函数，用于执行具体的操作

---

### 执行时机

副作用函数的执行时机与次数取决于钩子函数第二个参数的依赖项数组

| 依赖项数组         | 副作用函数执行时机                  |
| ------------------ | ----------------------------------- |
| 数组包含指定依赖项 | 组件初次渲染完毕时 & 依赖项变化时   |
| 空数组             | 组件初次渲染完毕时                  |
| 无依赖项数组       | 组件初次渲染完毕时 & 组件重新渲染时 |

> 如下：

```tsx{0}
import { useEffect, useState } from "react";

export default function Component() {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(1);

  // 组件初次渲染完毕时 & 状态 a、b 每次变化时执行    // [!code focus]
  useEffect(() => console.log("xxxx"));         // [!code focus]

  // 仅组件初次渲染完毕时执行                       // [!code focus]
  useEffect(() => console.log("yyyy"), []);     // [!code focus]

  // 组件初次渲染完毕时 & 仅状态 a 变化时执行      // [!code focus]
  useEffect(() => console.log("aaaa"), [a]);    // [!code focus]

  // 组件初次渲染完毕时 & 仅状态 b 变化时执行      // [!code focus]
  useEffect(() => console.log("bbbb"), [b]);    // [!code focus]

  return (
    <>
      <button onClick={() => setA((s) => s + 1)}>a+1</button>
      <button onClick={() => setB((s) => s + 1)}>b+1</button>
    </>
  );
}
```

::: details 例子：组件初次渲染完毕后发送数据请求

```tsx{0}
import { useEffect, useState } from "react";

export default function Component() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {                                             // [!code focus]
    (async () => {                                              // [!code focus]
      try {                                                     // [!code focus]
        const res = await fetch("https://catfact.ninja/fact");  // [!code focus]
        const data = (await res.json()) as { fact: string };    // [!code focus]
        setMessage(data.fact);                                  // [!code focus]
      } catch (error) {                                         // [!code focus]
        setMessage((error as Error).message);                   // [!code focus]
      }                                                         // [!code focus]
    })();                                                       // [!code focus]
  }, []);                                                       // [!code focus]

  return <div>{message}</div>;
}
```

:::

::: tip ESLint 插件

启用 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 中的 `exhaustive-deps` 规则来检查依赖项是否正确

:::

---

### 清除副作用

一些情况下副作用需要被清除:

- 需要清除的 ( 会导致内存泄露 )：定时器、订阅外部数据源...
- 无需清除的：网络请求、DOM 操作、记录日志...

副作用函数可返回一个函数用于清除值副作用，该返回值函数在组件卸载时自动执行

```tsx{0}
import { useEffect } from "react";

export default function Component() {
  useEffect(() => {                        // [!code focus]
    /* 副作用函数具体逻辑 */                  // [!code focus]
    return () => { /* 清除副作用函数 */ };   // [!code focus]
  }, [依赖项, 依赖项]);                      // [!code focus]

  return <></>;
}
```

::: details 例子：组件开启一个定时器，组件在卸载时清除该定时器

> 若不清除即使组件从页面上被卸载，定时器还会继续执行，最终导致内存泄露

```tsx{0}
import { useEffect, useState } from "react";

export default function FatherComponent() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <button onClick={() => setShow(false)}>卸载子组件</button>
      {show && <ChildComponent />}
    </>
  );
}

function ChildComponent() {
  useEffect(() => {                     // [!code focus]
    const timer = setInterval(() => {   // [!code focus]
      console.log("xxx");               // [!code focus]
    }, 1000);                           // [!code focus]

    return () => {                      // [!code focus]
      clearInterval(timer);             // [!code focus]
    };                                  // [!code focus]
  });

  return <>子组件</>;
}
```

:::

::: details 例子：组件卸载时 AbortController 中止异步请求

```tsx{0}
import { useEffect, useState } from "react";

export default function FatherComponent() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <button onClick={() => setShow(false)}>卸载子组件</button>
      {show && <ChildComponent />}
    </>
  );
}

function ChildComponent() {
  useEffect(() => {                                                         // [!code focus]
    const controller = new AbortController();                               // [!code focus]
    const signal = controller.signal;                                       // [!code focus]

    (async () => {                                                          // [!code focus]
      try {                                                                 // [!code focus]
        const res = await fetch("https://catfact.ninja/fact", { signal });  // [!code focus]
        const data = (await res.json()) as { fact: string };                // [!code focus]
        console.log(data.fact)                                              // [!code focus]
      } catch (error) {                                                     // [!code focus]
        const { name, message } = error as Error;                           // [!code focus]
        if (name === "AbortError") {                                        // [!code focus]
          console.log("Error thrown by aborting request");                  // [!code focus]
        } else {                                                            // [!code focus]
          console.log(message);                                             // [!code focus]
        }                                                                   // [!code focus]
      }                                                                     // [!code focus]
    })();                                                                   // [!code focus]

    return () => {                                                          // [!code focus]
      controller.abort();                                                   // [!code focus]
    };                                                                      // [!code focus]
  }, []);                                                                   // [!code focus]

  return <>子组件</>;
}
```

:::
