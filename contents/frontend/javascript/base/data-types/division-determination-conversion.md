# JS 类型分类、判断、转换

## 类型分类

基于数据的性质与结构可分为：

- 基本类型数据 ( Primitive Types )
- 引用类型数据 ( Reference Types )

---

### 基本类型数据

> Primitive Types

基本类型数据也称为值类型

是不可变的，复制时是按值传递的

[更多详见](./primitive-data-types.md)

---

### 引用类型数据

> Reference Types

引用类型数据也称为对象类型

是可变的，复制时是按引用传递的

[更多详见](./reference-data-type.md)

## 类型判断

### typeof

返回值一个表示数据类型的字符串

```js
typeof 数据; // "数据类型"
```

| typeof 返回值 |     数据类型     |
| :-----------: | :--------------: |
| `"undefined"` |  表示变量未定义  |
|  `"boolean"`  |     布尔类型     |
|  `"number"`   |     数值类型     |
|  `"string"`   |    字符串类型    |
|  `"object"`   | 表示对象或`null` |
| `"function"`  |     函数类型     |
|  `"symbol"`   |     符号类型     |

::: details 例子：验证`typeof`

```js{0}
typeof "";              // "string"
typeof false;           // "boolean"
typeof true;            // "boolean"
typeof 100;             // "number"
typeof undefined;       // "undefined"

typeof null;            // "object"
typeof {};              // "object"
typeof [];              // "object"

typeof new Map();       // "object"
typeof new Set();       // "object"

typeof function () {};  // "function"
typeof Symbol();        // "symbol"
```

:::

::: tip

不能使用`typeof`判断`null`，应该使用`===`进行全等判断

```js
const data = null;
if (data === null) {
  // ...
}
```

:::

---

### instanceof

用于判断某个数据是否为某个构造函数的实例对象

检查对象的原型链，所有对象都是 Object 的实例

```js
对象实例 instanceof 构造函数; // 布尔值
```

::: details 例子：验证`instanceof`

```js{0}
// 数组对象
[] instanceof Array;            // true
[] instanceof Object;           // true

// 错误对象
new Error() instanceof Error;   // true
new Error() instanceof Object;  // true
```

:::
