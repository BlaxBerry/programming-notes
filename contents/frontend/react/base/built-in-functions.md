# React 内置方法

## 组件通信

### forwardRef()

---

### createContext()

该方法可用于深层组件间的通信，可避免过多`props`传参的行为

- 方法参数为要传递的数据的默认值，参数为必须，若真无默认值可指定为`null`
- 方法返回为一个上下文对象，可从中解构获取两个组件：
  - `<上下文.Provider>`：用于在父组件在包裹子组件
  - `<上下文.Consumer>`：用于在子组件在以 RenderProps 形式接收传递的状态

```tsx{0}
import { createContext } from "react";

const 上下文对象 = createContext<要传递的数据的类型>(默认值); // [!code focus]

export default function 父组件() {
  return (
    <上下文对象.Provider value={要传递的数据}>              // [!code focus:3]
      {/* 子组件 */}
    </上下文对象.Provider>
  );
}
```

子组件要接收使用上下文传递的数据时有两种方法：

1. 使用内置 Hook 钩子函数[`useContext()`](./hooks/useContext.md)
2. 使用上下文对象中解构出的`<Consumer>`组件

::: code-group

```tsx{0} [useContext( )]
import { useContext } from "react";

export default function 子组件() {
  const 传递的数据 = useContext<要传递的数据的类型>(上下文对象);    // [!code focus:3]

  return <>{传递的数据}</>;
}
```

```tsx{0} [Consumer 组件]
export default function 子组件() {
  return (
    <上下文对象.Consumer>                   // [!code focus:3]
      {(传递的数据) => <>{传递的数据}</>}
    </上下文对象.Consumer>
  );
}
```

:::

::: details 例子：验证利用上下文进行组件传参，子组件采用两种不同方式接收使用参数

```tsx
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type FatherContextValue = {
  num: number;
  setNum: Dispatch<SetStateAction<number>>;
};

const FatherContext = createContext<FatherContextValue | null>(null);

export default function Father() {
  const [num, setNum] = useState<number>(0);
  return (
    <FatherContext.Provider
      value={{
        num,
        setNum,
        increase1: () => setValue((s) => (s += 1)),
        decrease1: () => setValue((s) => (s -= 1)),
      }}
    >
      <A />
      <B />
    </FatherContext.Provider>
  );
}

// 方式一：子组件使用 useContext Hook
function A() {
  const fatherContext = useContext<FatherContextValue | null>(FatherContext);
  const increase10 = () => fatherContext?.setValue((s) => (s += 10));
  return (
    <>
      <div>{fatherContext?.num}</div>
      <button onClick={fatherContext?.increase1}>+1</button>
      <button onClick={increase10}>+10</button>
    </>
  );
}

// 方式二：子组件使用 Context.Consumer 组件
function B() {
  return (
    <FatherContext.Consumer>
      {(value) => (
        <>
          <div>{value?.num}</div>
          <button onClick={value?.decrease1}>+1</button>
          <button onClick={() => value?.setNum((s) => (s -= 10))}>-10</button>
        </>
      )}
    </FatherContext.Consumer>
  );
}
```

:::

## 页面元素

### createPortal()

该方法可用于给任意指定元素节点内追加子元素，可实现传送门的作用

```tsx
import { createPortal } from "react-dom";

const React元素 = createPortal(子节点, 目标节点, ["key"]); // [!code focus]
```

::: details 例子：孙子组件内给爷爷组件追加元素

- 孙子组件内创建状态与基于状态数据的元素，通过传送门将元素定义在爷爷节点上
- 孙子组件内更新状态会及时反应到渲染到爷爷组件上的元素

```tsx{0}
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function GrandFather() {
  return (
    <div id="grandfather">       // [!code focus:3]
      <Son />
    </div>
  );
}

function Son() {
  return (
    <div id="son">
      <GrandSon />
    </div>
  );
}

function GrandSon() {                                       // [!code focus:19]
  const [state, setState] = useState<number>(0);
  const grandfatherRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (grandfatherRef.current === null) {
        grandfatherRef.current = document.getElementById("grandfather");
    }
  }, []);

  return (
    <div id="grandson">
      {grandfatherRef.current &&
        createPortal(<div>{state}</div>, grandfatherRef.current)}

      <button onClick={() => setState((s) => (s += 1))}>+1</button>
    </div>
  );
}
```

:::

## 组件状态切换

### startTransition()

该方法可用于降低一个状态的更新使其可以被打断，来解决耗时 UI 渲染导致的页面响应阻塞

同时也是内置 Hook 钩子函数[`useTransition()`](./hooks/useTransition.md)返回值解构后的第二个元素

方法接收一个回调函数做参数，回调中处理要降低优先级的状态更新

```tsx{0}
import { useState, useTransition } from "react";

export default function Component() {
  const [状态, set状态] = useState();

  const 切换状态 = () => {
    startTransition(() => { // [!code focus:3]
      set状态(新值);
    });
  };

  return <></>;
}
```
