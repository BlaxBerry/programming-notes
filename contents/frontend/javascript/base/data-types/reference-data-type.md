# JS 引用数据类型

基于数据的性质与结构可分为：

- [基本类型数据](./primitive-data-types.md) ( Primitive Types )
- 引用类型数据 ( Reference Types )

## 对象

```js
const object对象 = {};
const object对象 = { 键: 值, 键: 值 };
```

---

### 增删改查

```js{0}
const object对象 = { 键: 值, 键: 值 };

// 增加键值对                 // [!code focus:15]
object对象.新键 = 值;

// 修改键值对
object对象.键 = 新值;

// 删除键值对
delete object对象.键;

// 获取键值对的值
object对象.键        // 值
object对象[键];      // 值

// 判断是否存在
"键" in object对象; // 布尔值
```

## 数组

```js
// 构造函数写法
const 数组对象 = new Array();

// 字面量写法
const 数组对象 = [];
```

## 函数

[更多详见](../function.md)

## Map

ES6 新增

利用构造函数创建的 Hash 键值对应用类型

```js
const Map对象 = new Map();
```

---

### 增删改查

利用 Map 实例对象的方法进行增删改查操作

```js{0}
const Map对象实例 = new Set();

// 增加键值对                 // [!code focus:18]
Map对象实例.set(新键, 值);

// 修改键值对
Map对象实例.set(键, 新值);

// 删除键值对
Map对象实例.delete(键);

// 清空全部键值对
Map对象实例.clear();

// 获取键值对的值
Map对象实例.get(键);        // 值

// 判断是否存在
Map对象实例.has(键);        // 布尔值
```

---

### 迭代

- 可利用 Map 实例对象的方法进行迭代
- 可利用`for...of...`迭代 Map 实例对象

```js
const Map对象实例 = new Set();

Map对象实例.keys();
Map对象实例.values();
Map对象实例.entries();
```

::: details 例子：验证`for...of...`迭代 Map 对象

```js
for (const [键, 值] of Map对象实例) {
  // ...
}
```

:::

---

### JSON 序列化

建议先转为数组后转为 JSON 字符串

```js
const Map对象实例 = new Set();

const 数组 = Array.from(Map对象实例);
const JSON字符串 = JSON.stringify(数组);
```

## Set

```js
const Set对象 = new Set();
```
