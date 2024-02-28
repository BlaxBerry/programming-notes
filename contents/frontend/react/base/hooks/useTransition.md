# useTransition

该钩子函数用于降低一个状态的更新使其可以被打断，来解决耗时 UI 渲染导致的页面响应阻塞

常用于页面中视图切换时防止的状态更新与基于该状态的 UI 渲染阻塞用户对页面元素的操作响应

该钩子函数返回值为一个数组，可解构出状态切换状态与降低状态的更新优先级的函数

- 第一个元素：( 布尔值 ) `useTransition()`处理的状态是否处于更新中
- 第二个元素：( [`startTransition`](../built-in-functions.md#starttransition)函数 ) 在该函数回调中处理要降低优先级的状态的同步更新

```tsx{0}
import { useState, useTransition } from "react";

export default function Component() {
  const [状态, set状态] = useState();                       // [!code focus:8]
  const [isPending, startTransition] = useTransition();

  const 切换状态 = () => {
    startTransition(() => {
      set状态(新值);
    });
  };

  return <></>;
}
```

::: warning

不能用于表单文本输入，应使用[`useDeferredValue()`](./useDeferredValue.md)<br/>
因为降低输入框`value`状态更新的优先级会导致在连续输入时中间的输入被后续输入打断，从而最终仅更新最后的输入值

:::

::: details 例子：优化耗时渲染的 Tab 视图在切换时的响应卡顿

> 如下：Tab2 对应的视图需渲染 100000 个节点

- 优化前：
  - 在渲染结束前切换到 Tab2 时其按钮样式不会改变
  - 在渲染结束前提前切换 Tab1 时其并不会立即展示而是等待 Tab2 渲染结束
- 优化后：
  - 即使 Tab2 没结束渲染仍能立刻切换到 Tab1，且按钮样式会立即改变

::: code-group

```tsx{0} [❌ 响应阻塞]
import { useState } from "react";

export default function Component() {
  const [selectedTab, setSelectedTab] = useState("Tab1");

  return (
    <>
      <nav>
        {["Tab1", "Tab2"].map((name) => {
          return (
            <button
              key={name}
              style={{ color: selectedTab === name ? "red" : "black" }}
              onClick={() => setSelectedTab(name)}
            >
              {name}
            </button>
          );
        })}
      </nav>

      {selectedTab === "Tab1" && <div>Tab1</div>}
      {selectedTab === "Tab2" && (                         // [!code hl:9]
        <div>
          {[...Array(100000)]
            .map((_, i) => i)
            .map((e) => (
              <div key={e}>{e}</div>
            ))}
        </div>
      )}
    </>
  );
}
```

```tsx{0} [使用 useTransition( ) 优化]
import { useState, useTransition } from "react";

export default function Component() {
  const [selectedTab, setSelectedTab] = useState("Tab1");

  const [isPending, startTransition] = useTransition();         // [!code hl]

  return (
    <div>
      <nav>
        {["Tab1", "Tab2"].map((name) => {
          return (
            <button
              key={name}
              style={{ color: selectedTab === name ? "red" : "black" }}
              onClick={() => {                                  // [!code hl:3]
                startTransition(() => setSelectedTab(name));
              }}
            >
              {name}
            </button>
          );
        })}
      </nav>

      {isPending && <div>Loading...</div>}                      // [!code hl]

      {!isPending && (
        <>
          {selectedTab === "Tab1" && <div>Tab1</div>}
          {selectedTab === "Tab2" && (
            <div>
              {[...Array(100000)]
                .map((_, i) => i)
                .map((e) => (
                  <div key={e}>{e}</div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

:::
