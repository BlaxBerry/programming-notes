# useDeferredValue

该钩子函数用于生成一个状态的延时版状态，来解决频繁的耗时 UI 渲染导致的页面响应阻塞

常用于防止基于表单输入框连续输入值的 UI 渲染阻塞用户对页面元素的操作响应

- 该钩子函数参数接收一个状态
- 该钩子函数返回一个延时版的状态
  - 基于该延时版状态的页面渲染会以低优先级进行，在原状态更新时会被打断并基于新值渲染
  - 该延时版状态的更新时机自动取决于用户设备的性能

```tsx{0}
import { useState, useTransition } from "react";

export default function Component() {
  const [状态, set状态] = useState();       // [!code focus:2]
  const 延时版状态 = useDeferredValue(状态);

  return <></>;
}
```

::: tip `useDeferredValue()` vs 防抖节流

> - 防抖：连续输入停止一段时间后才更新
> - 节流：每间隔一段时间后更新

- 防抖与节流主要用于表单值提交时减少不必要的网络请求，都需要指定一个固定时间
- `useDeferredValue()`主要用于组件渲染期间对页面操作响应阻塞的优化，其生成的延时状态的更新时间自动取决于用户设备的性能 ( 更新可能是一瞬间完成也可能巨慢无比 )

:::

::: details 例子：优化文本框连续输入时的连续耗时渲染导致的响应卡顿

> 如下：文本框有输入时实时生成 100000 个节点

- 优化前：
  - 文本框输入值后需耗时才能完成 UI 渲染
  - 文本框连续输入时，前一个输入值完全渲染结束后才渲染后续的输入值
  - 文本框输入内容在页面渲染完成前无法实时更新，即响应阻塞
- 优化后：
  - 文本框输入内容不受阻塞实时更新
  - 基于文本框输入值的页面渲染不会因为连续输入而阻塞会采用最新值

::: code-group

```tsx{0} [❌ 响应阻塞]
import { useState } from "react";

export default function Component() {
  const [inputString, setInputString] = useState("");

  return (
    <>
      <input
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
      />

      {!!inputString.length && (
        <>
          {[...Array(100000)].fill(inputString).map((e, i) => (    // [!code hl:3]
            <div key={i}>{e}</div>
          ))}
        </>
      )}
    </>
  );
}
```

```tsx{0} [使用 useDeferredValue( ) 优化]
import { useDeferredValue, useState } from "react";

export default function Component() {
  const [inputString, setInputString] = useState("");

  const inputStringDeferred = useDeferredValue(inputString);    // [!code hl]

  return (
    <div>
      <input
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
      />

      <div>                                                     // [!code hl:5]
        {inputStringDeferred === inputString
          ? "页面内容基于最新输入值"
          : "页面内容过时"}
      </div>

      {!!inputStringDeferred.length && (                                    // [!code hl:13]
        <div
          style={{
            // 状态为过时非最新时半透明展示
            opacity: inputStringDeferred === inputString ? 1 : 0.5,
            transition: "opacity 0.25s ease",
          }}
        >
          {[...Array(100000)].fill(inputStringDeferred).map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

> 该例子不能使用[`useTransition()`](./useTransition.md)，因为降低输入框`value`状态更新的优先级会导致在连续输入时中间的输入被后续输入打断，从而最终仅更新最后的输入值

:::
