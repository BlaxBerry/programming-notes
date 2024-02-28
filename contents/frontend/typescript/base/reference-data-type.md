# TS 引用数据类型

引用数据类型 ( 对象类型 )

## Object、object

|   类型   | 说明                                       |
| :------: | ------------------------------------------ |
| `Object` | 表示所有包含有`toString()`等方法的对象数据 |
| `object` | 表示除基本数据类型以外的对象数据           |

- Object 包含 object
- Object 与 object 类型的数据都不能赋值`undefined`、`null`

::: code-group

```ts{0} [Object]
let v: Object;
v = [];
v = {};
v = function () {};
v = 1;
v = "";
v = false;
v = null;       // 报错 // [!code error]
v = undefined;  // 报错 // [!code error]
```

```ts{0} [object]
let v: object;
v = [];
v = {};
v = function () {};
v = 1;          // 报错 // [!code error]
v = "";         // 报错 // [!code error]
v = false;      // 报错 // [!code error]
v = undefined;  // 报错 // [!code error]
v = null;       // 报错 // [!code error]
```

:::

## 数组类型

> array

同 JavaScript

```ts
// 写法一：字面量
type 数组类型 = 数组元素类型[];

// 写法二：泛型
type 数组类型 = Array<数组元素类型>;
```

数组元素的类型

```ts
type 元素的类型 = 数组的类型[number];
```

## 元组类型

> tuple

元组类型的定义利用字面量类型的写法

```ts
type 类型名 = [类型, 类型, 类型, ...];
```

## 枚举类型

> enum

## any、unknown

| 类型  | 说明                                       |
| :---: | ------------------------------------------ |
| `any` | 表示任何类型                               |
| `any` | 表示未知类型，可先作为占位后用类型断言处理 |

- any 会忽略类型检查，使 TS 没有意义故不建议使用
- unknown 不会忽略类型检查，可视为安全版的 any 类型

## never
