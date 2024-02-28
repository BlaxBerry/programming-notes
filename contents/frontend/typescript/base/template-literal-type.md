# TS 字面量类型

用指定具体的值作为类型

> 如下：

```ts
type Language = "en" | "ja" | "zh";
```

## 模版字面量

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
