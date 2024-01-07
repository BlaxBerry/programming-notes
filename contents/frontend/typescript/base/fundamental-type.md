# 基础类型

## 原始类型

| 类型          | 含义   |
| ------------- | ------ |
| **string**    | 字符串 |
| **number**    | 数值   |
| **boolean**   | 布尔值 |
| **null**      | 空值   |
| **undefined** | 未定义 |

## 字面量类型

用指定具体的值作为类型

> 如下：

```ts
type Language = "en" | "ja" | "zh";
```

模版字面量

> 如下:

```ts
type Position = "top" | "bottom" | "left" | "right";
type CSSPadding = `padding-${Position}`;

let padding: CSSPadding;
padding = "padding-top";
padding = "padding-bottom";
padding = "padding-left";
padding = "padding-right";
```

## 对象类型

### 数组

```ts
// 写法一
type 类型名 = 类型[];

// 写法二
type 类型名 = Array<类型>;
```

数组元素的类型

```ts
type 元素的类型 = 数组的类型[number];
```

> 如下：

```ts
const arrA = ["a", "b", "c"];
type itemA = (typeof arrA)[number]; // string

const arrB = ["a", "b", "c"] as const;
type itemB = (typeof arrB)[number]; // "a" | "b" | "c"
```

---

### 元组

```ts
type 类型名 = [类型, 类型, 类型, ...];
```

---

### object、Object、{}
