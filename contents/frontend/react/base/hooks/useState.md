# useState()

该钩子函数用于在当前组件内定义其自身的状态 ( state )

- 函数参数接收状态初始值
- 返函数回值为一个数组，可解构出定义的状态与状态更新函数

```tsx
import { useState } from "react";

export default function Component() {
  const [state, setState] = useState<状态类型>(状态初始值); // [!code focus]

  return <></>;
}
```

## 初始值

不设置初始值时默认为`undefined`

建议设定明确的初始值，否则会导致各种无法预料的错误

状态变化时会使函数组件重新执行，使用新状态重新渲染组件 UI

## 状态更新
