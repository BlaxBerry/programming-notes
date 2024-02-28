# TS 内置工具类

> Utility Types

TypeScript 提供了大量的内置工具类，多利用了泛型来创建映射类型

## 选取

### Pick<T, K\>

::: code-group

```ts [使用]

```

```ts [<Badge>源码</Badge>]
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

:::

---

### Omit<T, K\>

::: code-group

```ts [使用]

```

```ts [<Badge>源码</Badge>]
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

:::

---

### Exclude<U, T\>

::: code-group

```ts [使用]

```

```ts [<Badge>源码</Badge>]
type Exclude<T, U> = T extends U ? never : T;
```

:::

---

### Extract<U, T\>

::: code-group

```ts [使用]

```

```ts [<Badge>源码</Badge>]
type Extract<T, U> = T extends U ? T : never;
```

:::

## 对象属性

---

### Record<K, V\>

::: code-group

```ts [使用]
type 类型名 = Record<键的类型，值的类型>
```

```ts [<Badge>源码</Badge>]
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

:::

---

### Partial<T\>

::: code-group

```ts [使用]
type 类型名 = Partial<T>;
```

```ts [<Badge>源码</Badge>]
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

:::

---

### Required<T\>

::: code-group

```ts [使用]
type 类型名 = Required<T>;
```

```ts [<Badge>源码</Badge>]
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

:::

---

### Readonly<T\>

::: code-group

```ts [使用]
type 类型名 = Readonly<T>;
```

```ts [<Badge>源码</Badge>]
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

:::

## 函数

### Parameters<F\>

::: code-group

```ts [使用]

```

```ts [<Badge>源码</Badge>]
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

:::

---

### ReturnType<F\>

::: code-group

```ts [使用]

```

```ts [<Badge>源码</Badge>]
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

:::

## 字符串

### Uppercase<S\>

::: code-group

```ts [使用]
type 类型名 = Uppercase<string | "字符串字面量">;
```

```ts [<Badge>源码</Badge>]
type Uppercase<S extends string> = intrinsic;
```

:::

---

### Lowercase<S\>

::: code-group

```ts [使用]
type 类型名 = Lowercase<string | "字符串字面量">;
```

```ts [<Badge>源码</Badge>]
type Lowercase<S extends string> = intrinsic;
```

:::

---

### Capitalize<S\>

::: code-group

```ts [使用]
type 类型名 = Capitalize<string | "字符串字面量">;
```

```ts [<Badge>源码</Badge>]
type Capitalize<S extends string> = intrinsic;
```

:::

---

### Uncapitalize<S\>

::: code-group

```ts [使用]
type 类型名 = Uncapitalize<string | "字符串字面量">;
```

```ts [<Badge>源码</Badge>]
type Uncapitalize<S extends string> = intrinsic;
```

:::
