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

- 简单传参直接通过组件的`props`参数即可

```jsx{0}
import React from "react";

export default function 组件() {
  const [组件状态] = useState(值);

  return (
    <标签
      属性={值}
      属性="字符串类型数据"
      属性={函数}
      {...键值对的对象数据}
    />
  );
}
```

- 深层组件传参建议使用上下文 ( Context )

详见[`createContext()`](./built-in-functions.md#createcontext)、[`useContext()`](./hooks/useContext.md)

- 跨组件间传参建议使用 Reducer、第三方状态管理的库

详见[`useReducer()`](./hooks/useReducer.md)

---

### 参数接收

组件通过`props`参数接收父组件传入的数据

在包含自定义属性时建议解构并使用剩余参数接受其他属性，否则会出现警告 React 无法识别 Props 上的自定义属性

```tsx
export default function 组件({
  自定义属性,
  自定义属性 = 默认值,
  ...props
}){
  return ...
}

```

## 组件样式

### 内联样式

> Inline Style

内联样式通过标签的`style`属性接收一个属性为小驼峰的 JS 对象

是 CSS-in-JS 的实现

::: tip

- 优点：可避免样式冲突，扩展方便
- 缺点：复杂结构的大项目中会导致代码可读性差，媒体查询、伪元素等功能无法使用

:::

```jsx
import React from "react";

export default function 组件() {
  const [组件状态] = useState(值);

  return (
    <标签
      style={{
        属性: 固定值,
        属性: 函数(参数),
        属性: 组件状态,
      }}
    />
  );
}
```

> 常见 CSS-in-JS 的样式库：Styled Components、Emotion ( 以及 MUI )、JSS ...

---

### 外联样式表

> Style Sheet

引入单独的样式表并通过标签的`className`属性接收样式类名，可借助 [clsx](https://www.npmjs.com/package/clsx) 组织与切换类名

文件多为`.css`、`.scss`、`.less`

::: tip

- 优点：实现样式与逻辑的分类
- 缺点：会有全局与局部的样式冲突问题，复杂样式的大项目会导致样式文件可读性差

:::

```jsx
import React from "react";
import { clsx } from "clsx";

import "样式表文件.后缀";
import "样式表文件.后缀";

export default function 组件() {
  return (
    <>
      <标签 className="class类名 class类名" />
      <标签 className={clsx("class类名", "class类名")} />
    </>
  );
}
```

> 常见类名控制样式的库：TailwindCSS ...

---

### 样式模块化

模块化的样式为局部样式，导入后仅对当前文件内的组件生效，不影响其子组件

文件多为`.module.css`、`module.scss`、`.module.less`

```jsx
import React from "react";
import 样式模块 from "样式表文件.module.后缀";

export default function 组件() {
  return (
    <>
      <标签 className={样式模块.class类名} />
      <标签 className={样式模块.class类名} />
    </>
  );
}
```

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
