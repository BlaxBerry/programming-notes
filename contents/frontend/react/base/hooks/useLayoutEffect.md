# useLayoutEffect

该钩子函数用于处理副作用，与[`useEffect()`](./useEffect.md)基本一致

常用于 DOM 变更后与浏览器绘制前的过程中需要同步更新到视图的副作用

::: tip `useLayoutEffect()` vs `useEffect()`

|          |       `useLayoutEffect()`        |          `useEffect()`           |
| :------: | :------------------------------: | :------------------------------: |
| 执行时机 | 重新渲染导致的浏览器重新绘制之前 | 重新渲染导致的浏览器重新绘制之后 |
| 执行过程 |  同步执行，会阻塞浏览器重新绘制  |    异步，不阻塞浏览器重新绘制    |

:::

::: warning

`useLayoutEffect()`是同步执行，耗时逻辑会阻塞浏览器重新绘制会影响性能，因此要谨慎使用

:::

::: details 例子：优化重新渲染导致的浏览器重绘后变更状态时的闪烁问题

> 当状态值变为 0 时立刻更新

- 使用`useEffect()`时因为发生在重新渲染导致的浏览器重绘后，页面会有闪烁且一瞬间展示红色样式
- 使用`useLayoutEffect()`时因为发生在重新渲染后与浏览器重绘前，不会有闪烁及红色样式

```tsx{0}
import { useEffect, useLayoutEffect, useState } from "react";

export default function App() {
  const [num, setNum] = useState<number>(Math.random() * 10);

  useEffect(() => {                     // [!code --]
  useLayoutEffect(() => {               // [!code ++]
    if (num === 0) {
      setNum(Math.random() * 10);
    }
  }, [num]);

  return (
    <>
      <h1 style={{ color: num === 0 ? "red" : "black" }}>{num}</h1>  // [!code hl]
      <button onClick={() => setNum(0)}>重置为 0</button>
    </>
  );
}
```

:::
