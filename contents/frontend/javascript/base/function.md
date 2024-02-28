# JS 函数

## 补充

### 防抖

> Debounce

防抖是一种优化函数触发频率的技术

确保在事件执行后一定时间内不会再次执行

原理是利用定时器`setTimeout`指定函数触发的间隔时间，次触发时重新计算时间

::: tip 使用场合

- 表单快速频繁输入时避免发送过多请求
- 浏览器窗口大小频繁 resize 时避免中途过多计算
- 文本编辑器实时保存应在无操作后固定时间内自动执行

:::

::: code-group

```tsx{0} [React]
import { ChangeEvent } from "react";

export default function Component() {
  const submit = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return <input onChange={debounce(submit, 500)} />;       // [!code hl]
}

function debounce(callback: Function, wait: number = 0) {   // [!code hl:11]
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
}
```

:::

---

### 节流

> Throttle

节流是一种优化函数触发频率的技术

确保在固定时间内即使连续触发也仅执行一次事件

原理是通过判断距离上次操作的时间间隔

::: code-group

```tsx{0} [React]
import { ChangeEvent } from "react";

export default function Component() {
  const submit = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return <input onChange={throttle(submit, 1000)} />;       // [!code hl]
}

function throttle(callback: Function, wait: number = 0) {   // [!code hl:10]
  let lastTime: number = 0;
  return function (this: unknown, ...args: unknown[]) {
    const currentTime = Date.now();
    if (currentTime - lastTime >= wait) {
      callback.apply(this, args);
      lastTime = currentTime;
    }
  };
}
```

:::
