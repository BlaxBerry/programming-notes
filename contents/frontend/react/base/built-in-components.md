# React 内置组件

React 提供的内置组件，可直接在 JSX 中使用，且并不会被渲染到页面

## <StrictMode\>

该组件用于包裹应用程序根组件或局部组件，为其启用严格模式

一般是直接包裹整个应用程序根组件`<App>`

严格模式仅在开发环境下生效，**其包裹的组件始终会调用渲染函数 2 次**

```tsx
<React.StrictMode>
  <根组件 />
</React.StrictMode>
```

::: details 例子：包裹根组件与包裹局部组件场合

::: code-group

```tsx{0} [包裹根组件]
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);    // [!code focus]
root.render(                                                                // [!code focus]
  <StrictMode>                                                              // [!code focus]
    <App />                                                                 // [!code focus]
  </StrictMode>                                                             // [!code focus]
);                                                                          // [!code focus]
```

```tsx{0} [包裹局部组件]
import { StrictMode } from "react";

function App() {
  return (
    <>
      <Header />
      <StrictMode>              // [!code focus]
        <main>
          <Sidebar />
          <Content />
        </main>
      </StrictMode>             // [!code focus]
      <Footer />
    </>
  );
}
```

:::

## <Fragment\> ( <\> )

该组件用于作为一个包裹节点 ( Wrapper Node ) 来包裹多个同级元素、文本

- `<Fragment>`组件只能接收两个属性：
  - `children`: 包裹的多个同级元素、文本
  - `key`: 循环遍历时的唯一 key
- `<Fragment>`还可简写为`<>...</>`，但只能携带`children`属性

```tsx
<React.Fragment>
  {/* 组件 */}
  {/* 元素节点 */}
  {/* 文本 */}
</React.Fragment>

<>
  {/* 组件 */}
  {/* 元素节点 */}
  {/* 文本 */}
</>
```

::: details 例子：循环遍历数组数据，且不渲染父组件

```tsx{0}
import { Fragment } from "react";

type Person = { name: string; age: number };
const people: Person[] = [{ name: "Andy", age: 28 }, { name: "Jack", age: 16 }];

export default function Component() {
  return (
    <>
      {people.map(({ name, age }) => (  // [!code focus]
        <Fragment key={name}>           // [!code focus]
          <span>{name}</span>
          <span>{age}</span>
        </Fragment>                     // [!code focus]
      ))}                               // [!code focus]
    </>
  );
}
```

:::

## <Suspense\>

该组件

```tsx
<React.Suspense fallback={<加载占位符或骨架屏 />}>
  <组件 />
</React.Suspense>
```

## <Profiler\>

该组件用于测量组件的渲染性能

进行性能分析会增加一些额外的开销，

```tsx
<React.Profiler id="自定义名" onRender={回调函数}>
  <组件 />
</React.Profiler>;

const 回调函数: React.ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  // 获取该组件渲染相关的数据
};
```

::: details 例子：测量应用中不同部分的渲染性能

```tsx
import { Profiler, type ProfilerOnRenderCallback } from "react";

export default function App() {
  return (
    <>
      <Profiler id="Header" onRender={onRender}>
        <Header />
      </Profiler>
      <Profiler id="Sidebar" onRender={onRender}>
        <Sidebar />
      </Profiler>
      <Profiler id="Content" onRender={onRender}>
        <Content>
          <Profiler id="ContentEditor" onRender={onRender}>
            <Editor />
          </Profiler>
          <Profiler id="ContentPreview" onRender={onRender}>
            <Preview />
          </Profiler>
        </Content>
      </Profiler>
    </>
  );
}

const profilerOnRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log(id, {
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};
```

:::
