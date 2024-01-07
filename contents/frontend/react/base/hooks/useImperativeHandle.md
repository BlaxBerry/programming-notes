# useImperativeHandle

该钩子函数可用于实现组件间通信的子传父

会将当前组件内的状态与方法会定义到接收自父组件的 Ref 引用对象上，父组件通过事件获取操作该 Ref 引用对象上携带的成员，从而实现导出子组件的状态与方法供父组件使用

需要与[`forwardRef()`](../built-in-functions.md#forwardref)、[`useRef()`](./useRef.md)一起使用

::: code-group

```tsx{0} [子组件]
import {
  type FC,
  type ForwardRefRenderFunction,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";

export type 子组件Ref类型 = {};
export type 子组件Props类型 = {};

const 子组件Render函数: ForwardRefRenderFunction<
  子组件Ref类型,
  子组件Props类型
> = (props, ref) => {
  useImperativeHandle(ref, () => ({       // [!code focus]
    状态: 子组件状态,                       // [!code focus]
    方法: () => 子组件方法(),               // [!code focus]
  }));                                    // [!code focus]

  return <></>;
};

const 子组件 = forwardRef(子组件Render函数);
export default 子组件;
```

```tsx{0} [父组件]
import { type FC, useRef } from "react";
import 子组件, { type 组件Ref类型 } from "子组件位置";

const 父组件: FC = () => {
  const ref = useRef<子组件Ref类型>(null);              // [!code focus]

  const 获取子组件状态 = () => ref.current?.导出的状态;   // [!code focus]
  const 调用子组件方法 = () => ref.current?.导出的方法(); // [!code focus]

  return <子组件 ref={ref} />;                         // [!code focus]
};
```

:::

::: tip

Ref 引用对象中存储数据的变化不会影响组件渲染

子组件导出的状态不能直接用于父组件内容的渲染

```tsx
function 父组件() {
  const childRef = useRef(null);

  console.log(childRef.current?.子组件状态); // 仅在父组件初次渲染时打印 undefined // [!code --]
  const 方法函数 = () => console.log(childRef.current?.子组件状态); // 可动态获取最新值 // [!code ++]

  return (
    <div>{childRef.current?.子组件状态}</div> {/* 永远为 undefined */} // [!code --]
    <子组件 ref={childRef} />
  );
}
```

:::

::: details 例子：父组件操作子组件内 DOM 元素

> 子组件使用 ref 非控组件

::: code-group

```tsx [子组件]
import {
  type RefObject,
  type ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
  memo,
  forwardRef,
} from "react";

// ref type
export interface ChildComponentRef {
  inputRef: RefObject<HTMLInputElement>;
  onFocus?: () => void;
}
// props type
interface ChildComponentProps {}

const ChildComponent: ForwardRefRenderFunction<
  ChildComponentRef,
  ChildComponentProps
> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    inputRef,
    onFocus: () => {
      inputRef.current?.focus();
    },
  }));

  return <input name="userName" ref={inputRef} />;
};

// forwardRef 方法包裹子组件
const ChildComponentForwardRef = forwardRef(ChildComponent);
// memo 方法缓存子组件
const ChildComponentMemo = memo(ChildComponentForwardRef);
export default ChildComponentMemo;
```

```tsx [父组件]
import { useRef } from "react";
import ChildComponent, { type ChildComponentRef } from "./ChildComponent";

export default function FatherComponent() {
  const ChildComponentRef = useRef<ChildComponentRef>(null);

  const getValueByInputRef = () => {
    console.log(ChildComponentRef.current?.inputRef?.current?.value);
  };
  const onfocusByInputRef = () => {
    ChildComponentRef.current?.inputRef?.current?.focus();
  };
  const onfocus = () => {
    ChildComponentRef.current?.onFocus?.();
  };

  return (
    <>
      <ChildComponent ref={ChildComponentRef} />
      <button onClick={getValueByInputRef}>获取值( 使用 inputRef )</button>
      <button onClick={onfocusByInputRef}>聚焦( 使用 inputRef )</button>
      <button onClick={onfocus}>聚焦</button>
    </>
  );
}
```

:::

::: details 例子：父组件使用子组件导出的数据与方法

::: code-group

```tsx [子组件]
import {
  type Dispatch,
  type SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

export type ChildComponentRef = {
  state: number;
  setState: Dispatch<SetStateAction<number>>;
  funcA: () => void;
  funcB: (params: unknown) => void;
};

const ChildComponent = forwardRef<ChildRef>(function ChildComponent(_, ref) {
  const [state, setState] = useState<number>(0);

  useImperativeHandle(
    ref,
    () => ({
      state: state,
      setState: setState,
      funcA: () => console.log("AAAA"),
      funcB: (params) => console.log(params),
    }),
    [state]
  );

  return <div>{state}</div>;
});

export default ChildComponent;
```

```tsx [父组件]
import { useRef } from "react";
import ChildComponent, { type ChildComponentRef } from "./ChildComponent";

export default function FatherComponent() {
  const childComponentRef = useRef<ChildComponentRef>(null);

  const setChildState = () => {
    childComponentRef.current?.setState((s) => (s += 1));
  };
  const getChildState = () => {
    console.log(childComponentRef.current?.state);
  };
  const callChildFuncA = () => childComponentRef.current?.funcA();
  const callChildFuncB = () => childComponentRef.current?.funcB("XXXX");

  return (
    <>
      <Child ref={childComponentRef} />
      <button onClick={callChildFuncA}>call funcA</button>
      <button onClick={callChildFuncB}>call funcB</button>
      <button onClick={childSetState}>state +1</button>
      <button onClick={showChildState}>show state</button>
    </>
  );
}
```

:::
