# 内置工具类

TypeScript 内置工具类 ( Utility Types )

## 对象属性

---

### Record<K, V\>

```ts
type 类型名 = Record<键的类型，值的类型>
```

::: code-group

```ts [源码]
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

:::

---

### Partial<T\>

```ts
type 类型名 = Partial<T>;
```

::: code-group

```ts [源码]
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

:::

---

### Required<T\>

```ts
type 类型名 = Required<T>;
```

::: code-group

```ts [源码]
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

:::

---

### Readonly<T\>

```ts
type 类型名 = Readonly<T>;
```

::: code-group

```ts [源码]
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

:::

## 选取

### Pick<T, K\>

```ts

```

::: code-group

```ts [源码]
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

:::

---

### Omit<T, K\>

```ts

```

::: code-group

```ts [源码]
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

:::

---

### Exclude<U, T\>

```ts

```

::: code-group

```ts [源码]
type Exclude<T, U> = T extends U ? never : T;
```

:::

---

### Extract<U, T\>

```ts

```

::: code-group

```ts [源码]
type Extract<T, U> = T extends U ? T : never;
```

:::

## 函数

### Parameters<F\>

```ts

```

::: code-group

```ts [源码]
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

:::

---

### ReturnType<F\>

```ts

```

::: code-group

```ts [源码]
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

:::

## 字符串

### Uppercase<S\>

```ts
type 类型名 = Uppercase<string | "字符串字面量">;
```

::: code-group

```ts [源码]
type Uppercase<S extends string> = intrinsic;
```

:::

---

### Lowercase<S\>

```ts
type 类型名 = Lowercase<string | "字符串字面量">;
```

::: code-group

```ts [源码]
type Lowercase<S extends string> = intrinsic;
```

:::

---

### Capitalize<S\>

```ts
type 类型名 = Capitalize<string | "字符串字面量">;
```

::: code-group

```ts [源码]
type Capitalize<S extends string> = intrinsic;
```

:::

---

### Uncapitalize<S\>

```ts
type 类型名 = Uncapitalize<string | "字符串字面量">;
```

::: code-group

```ts [源码]
type Uncapitalize<S extends string> = intrinsic;
```

:::
