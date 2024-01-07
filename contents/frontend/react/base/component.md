# React 组件

> 本文为函数式组件 ( Functional Component )

## 组件基础

### 定义

::: code-group

```tsx{0} [无参数]
import type { FC } from "react";

// const 关键字定义              // [!code focus]
const 组件: FC = () => {        // [!code focus]
  return <></>;
};                             // [!code focus]

// function 关键字定义           // [!code focus]
function 组件(): JSX.Element {  // [!code focus]
  return <></>;
}                              // [!code focus]
```

```tsx{0} [有参数]
import type { FC } from "react";

interface Props {                           // [!code focus]
  // ...
}                                           // [!code focus]

// const 关键字定义                           // [!code focus]
const 组件: FC<Props> = (props) => {         // [!code focus]
  return <></>;
};                                          // [!code focus]

// function 关键字定义                       // [!code focus]
function 组件(props: Props): JSX.Element {  // [!code focus]
  return <></>;
}                                           // [!code focus]
```

:::

---

### 传参

## 组件复用

### 高阶组件 ( HOC )

高阶组件 ( **H**igher **O**rder **C**omponent ) 是一个纯函数

- HOC 接收一个组件作为参数，对其进行封装增强后作为一个新组件返回
- HOC 习惯命名为`withXxx`

::: tip

- 优点: 不影响被包裹组件的内部逻辑
- 缺点: 纯函数无副作用，略微繁琐，命名容易重复

:::

::: code-group

```tsx [定义]
import type { ComponentType, FC } from "react";

export default function 高阶组件<P extends object>(子组件: ComponentType<P>) {
  const 处理后的子组件: FC<P> = (props: P) => (
    <div>
      <div>{/* 通用的内容 */}</div>
      <div>{/* 通用的内容 */}</div>
      <子组件 {...props} />
    </div>
  );

  return 处理后的子组件;
}
```

```tsx [使用]
import type { FC } from "react";

const 子组件: FC<Props类型> = (props) => <div>...</div>;
const 子组件: FC<Props类型> = (props) => <div>...</div>;

const HOC包裹的组件 = 高阶组件(子组件);
const HOC包裹的组件 = 高阶组件(子组件);

export default function FatherComponent() {
  return (
    <>
      <HOC包裹的组件 {...参数} />
      <HOC包裹的组件 {...参数} />
    </>
  );
}
```

:::

::: details 例子:

```tsx
import type { ComponentType, FC } from "react";

// HOC
const withTemplate = <P extends object>(Component: ComponentType<P>): FC<P> => {
  return (props: P) => (
    <div>
      <header />
      <Component {...props} />
      <footer />
    </div>
  );
};

// 子组件
const A: FC<{ aa: string }> = (props) => <div>AAA {props.aa}</div>;
const B: FC<{ bb: string }> = (props) => <div>BBB {props.bb}</div>;

// 使用 HOC 包裹子组件
const TemplatedA = withTemplate(A);
const TemplatedB = withTemplate(B);

export default function App() {
  return (
    <>
      <TemplatedA aa="xxxx" />
      <TemplatedB bb="yyyy" />
    </>
  );
}
```

:::

---

### 渲染属性 ( Render Props )

::: tip

- 优点: 可将组件内的 state 作为 props 传递给外部调用者，将渲染逻辑交给调用者
- 缺点: 无法在 return 语句外访问数据、容易出现嵌套地狱的问题，可读性差

:::

::: code-group

```tsx [定义]
import type { ReactNode } from "react";

interface Props {
  render: (params?: 参数类型) => ReactNode;
}

export default function 复用组件({ render }: Props) {
  return (
    <>
      <div>{/* 通用的内容 */}</div>
      <div>{/* 通用的内容 */}</div>
      {render(传出的参数)}
    </>
  );
}
```

```tsx [使用]
export default function FatherComponent({ render }: Props) {
  return (
    <>
      {/* 不使用复用组件传出的参数 */}
      <Common render={() => <div>插入的渲染内容</div>} />

      {/* 使用复用组件传出的参数 */}
      <Common
        render={(params) => (
          <div>
            插入的渲染内容
            {params}
          </div>
        )}
      />
    </>
  );
}
```

:::

::: details 例子：一个能获取鼠标指针位置的复用组件

```tsx
import { type FC, type ReactNode, useState } from "react";

const initPosition = { x: 0, y: 0 };

type Position = typeof initPosition;

interface Props {
  render: (position: Position) => React.ReactNode;
}

// 定义复用组件
const MouseSpace: FC<Props> = ({ render }) => {
  const [mousePosition, setMousePosition] = useState<Position>(initPosition);
  const handlerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div style={{ height: "100vh" }} onMouseMove={handlerMouseMove}>
      {render(mousePosition)}
    </div>
  );
};

// 使用复用组件
export default function Component() {
  return (
    <>
      <MouseSpace
        render={(position) => (
          <div>
            <div>x: {position.x}</div>
            <div>y: {position.y}</div>
          </div>
        )}
      />
    </>
  );
}
```

:::
