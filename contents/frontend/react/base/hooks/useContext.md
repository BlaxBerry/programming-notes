# useContext

该钩子函数用于获取包裹当前组件的上下文对象传递的数据

```tsx
import { useContext } from "react";

export default function 子组件() {
  const 传递的数据 = useContext(上下文对象); // [!code focus:3]

  return <>{传递的数据}</>;
}
```
