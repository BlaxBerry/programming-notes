# Promise

Promise 是 JavaScript ES6 中解决异步编程的一种方案

利用内置的构造函数创建一个实例来封装要执行的异步任务，然后利用该实例上的方法来处理异步任务的结果

## 异步任务执行状态

Promise 处理的异步任务有 3 种执行状态

|        3 种执行状态        |                  含义                  |
| :------------------------: | :------------------------------------: |
|        **pending**         | 异步处理进行中/准备中 ( 默认初始状态 ) |
| **fulfilled** ( resolved ) |              异步处理成功              |
|        **rejected**        |              异步处理失败              |

::: tip 浏览器打印结果

```js
[[Prototype]]: Promise
[[PromiseState]]: 当前所处状态
[[PromiseResult]]: 所处状态下的返回值
```

:::

随着异步任务的执行 Promise 状态只会改变一次 ( 变成功或变失败 ) 一旦执行完成状态不会再次变化

- pending → fulfilled
- pending → rejected

::: details 例子：验证随着异步的执行 Promise 状态改变

> 如下: 异步 2s 之后成功完成，在此之前状态为进行中且返回值为止，2s 之后状态变为成功并返回值为成功时的值

```js
const instance = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("xxxx");
  }, 2000);
});

console.log(instance);
// [[Prototype]]: Promise
// [[PromiseState]]: pending
// [[PromiseResult]]: undefined

setTimeout(() => {
  console.log(instance);
}, 2000);
// [[Prototype]]: Promise
// [[PromiseState]]: fulfilled
// [[PromiseResult]]: "xxxx"
```

:::

::: details 例子：验证 Promise 的状态只会改变一次

> 如下: 异步任务已经 resolve 完成后 Promise 执行状态固定，后续 reject 不会执行

```js{0}
const instance = new Promise((resolve, reject) => {
  resolve();

  setTimeout(() => {  // [!code --]
    reject();         // [!code --]  // 不会执行
  }, 2000);           // [!code --]
});

console.log(instance);
// [[Prototype]]: Promise
// [[PromiseState]]: pending
// [[PromiseResult]]: undefined

setTimeout(() => {
  console.log(instance);
}, 2000);
// [[Prototype]]: Promise
// [[PromiseState]]: fulfilled
// [[PromiseResult]]: undefined
```

:::

## 创建实例

可调用内置构造函数创建 Promise 实例，或通过构造函数对象上的方法返回指明状态的 Promise 实例

---

### new Promise()

用于生成一个 Promise 实例

- 构造函数返回一个 Promise 实例对象
- 构造函数参数接收一个 Executor 执行器函数 ( 函数体为要处理的异步任务 ) 并接收两个函数作为可选参数
  - 第一个参数：异步任务成功时调用，任务若有结果则作为参数传入否则为`undefined`
  - 第二个参数：异步任务失败时调用，任务若有结果则作为参数传入否则为`undefined`

```js
const promise实例 = new Promise(Executor执行器函数);

function Executor执行器函数(resolve, reject) {
  // 耗时的异步任务...
  if (异步任务成功条件) {
    resolve(成功结果);
  } else {
    reject(失败结果理由);
  }
}
```

---

### Promise.resolve()

用于生成一个成功状态的 Promise 实例

等价于构造函数参数 Executor 执行器函数的第一个参数方法`resolve()`

```js
const promise实例 = Promise.resolve(成功结果);

// 等价于
const promise实例 = new Promise((resolve) => resolve(成功结果));
```

---

### Promise.reject()

用于生成一个失败状态的 Promise 实例

等价于构造函数参数 Executor 执行器函数的第二个参数方法`reject()`

```js
const promise实例 = Promise.reject(失败结果);

// 等价于
const promise实例 = new Promise((_, reject) => reject(失败结果));
```

## 异步任务结果获取

利用 promise 实例上的方法获取

---

### then()

> 定义在`Promise.prototype`上由 promise 实例调用

- 该实例方法在异步任务结束时自动执行
- 方法接收两个函数作为可选参数，分别在异步任务处理成功与失败时自动执行，第一个函数的参数接收实例的成功结果，第二个函数的参数接收实例的失败结果
- 方法返回值为一个新的实例对象，可继续链式调用实例方法

```js
promise实例.then(
  // onfulfilled
  (value) => {},
  // onrejected
  (reason) => {}
);
```

---

### catch

> 定义在`Promise.prototype`上由 promise 实例调用

- 该实例方法在异步失败时自动执行
- 方法接收一个函数作为可选参数，函数的参数接收实例的失败结果
- 方法返回值为一个新的实例对象，可继续链式调用实例方法

```js
promise实例.catch((reason) => {});

// 实质上相当于
promise实例.then(null, (reason) => {});
```

---

### finally()

> 定义在`Promise.prototype`上由 promise 实例调用

- 该实例方法在所有的`then()`、`catch()`结束后自动执行

```js
promise实例.then().then().catch().catch().finally();
```

---

### 链式调用

实例方法支持链式调用

- 链式调用[`then()`](#then)时:

  - 前一个`then()`的参数 ( 函数 ) 的返回值若为普通值，则会自动包裹为成功状态的 Promise 实例传递给后续实例方法
  - 前一个`then()`的参数 ( 函数 ) 的返回值若为 Promise 实例，则会被直接传递给后续实例方法，且后续实例方法会等该 Promise 执行结束后才执行

- 链式调用[`catch()`](#catch)时：
  - 前一个`catch()`的参数 ( 函数 ) 的返回值若为普通值，后续链式调用时会认为无错误而不会进入后续`catch()`
  - 前一个`catch()`的参数 ( 函数 ) 的返回值若为一个失败状态的 Promise 实例，则后续`catch()`会接收到该实例的失败结果

```js{0}
Promise实例
  .then((result) => {
    // 处理...
    return 普通值或 Promise 实例;
  })
  .then((result) => {
    // 处理...
    // return 普通值或 Promise 实例;
  })
  .catch((reason) => {
    // 处理...
    return 失败状态的 Promise 实例;
  })
  .catch((reason) => {
    // 处理...
    // return 失败状态的 Promise 实例;
  })
  .finally(() => {
    // 处理...
  });
```

::: details 例子：验证链式调用`then()`方法

```js{0}
const instance = Promise.resolve("111");

instance
  .then((err) => {                  // 接收到 "111"
    console.log(err);
    return "222";                   // 返回普通值 "222"
  })
  .then((err) => {                  // 接收到 "111"
    console.log(err);
    // return                       // 无返回值即 undefined
  })
  .then((err) => {                  // 接收到 undefined
    console.log(err);
    return Promise.resolve("333");  // 返回返回结果为 "333" 的成功状态的 Promise 实例
  })
  .then((err) => {                  // 接收到 "333"
    console.log(err);
    const p = new Promise((resolve) => setTimeout(() => resolve("444"), 1000));
    return p;                       // 返回执行耗时 1s 的返回结果 "444" 的成功状态的 Promise 实例
  })
  .then((err) => {                  // 1s 后接收到 "444"
    console.log(err);
  });

// "111"
// "222"
// undefined
// "333"
// "444"
```

:::

::: details 例子：验证链式调用`catch()`方法

```js{0}
const instance = Promise.reject("111");

instance
  .catch((err) => {               // 接收到 "111"
    console.log(err);
    return Promise.reject("222"); // 返回结果为 "222" 的失败状态的 Promise 实例
  })
  .catch((err) => {               // 接收到 "222"
    console.log(err);
    return Promise.reject();      // 返回无结果的失败状态的 Promise 实例
  })
  .catch((err) => {               // 接收到 undefined
    console.log(err);
    return "333";                 // 返回一个普通值，后续调用链会认为无错误而不会进入后续 catch
  })
  .catch((err) => {
    console.log(err);             // 不执行
  });

// "111"
// "222"
// undefined
```

:::

## 多个异步任务的处理

利用 Promise 构造函数对象上的方法处理一组异步任务

---

### Promise.all()

等异步任务全部执行结束

- 方法接收一个数组，包含要处理的异步任务 Promise 实例
- 方法返回一个 Promise 实例
  - 任务全成功：实例结果为一个数组，按参数中顺序返回异步任务各自的成功结果
  - 任务中有失败的：实例结果为失败状态异步任务的的结果

```js{0}
const a = Promise.resolve("aa");
const b = Promise.resolve("bb");
const c = Promise.resolve("cc");
const d = Promise.reject("dd");

const instance = Promise.all([a, b, c]);    // [!code focus]

instance                                    // [!code focus]
  .then((response) => {                     // [!code focus]
    const [aa, bb, cc, dd] = response;      // [!code focus]
    console.log(response);
  })                                        // [!code focus]
  .catch((err) => {
    console.error(err);
  });

// [ "aa", "bb", "cc", "dd" ]


const instance = Promise.all([a, b, c, d]);

instance
  .then((response) => {
    /// ...
  })
  .catch((err) => {
    console.error(err);
  });

// "dd"
```

---

### Promise.allSettled()

等异步任务全部执行结束

- 方法接收一个数组，包含要处理的异步任务 Promise 实例
- 方法返回一个 Promise 实例，实例结果为一个数组，无论任务中是否有成功失败的都全部包含

```js{0}
const a = Promise.resolve("aa");
const b = Promise.resolve("bb");
const c = Promise.resolve("cc");
const d = Promise.reject("dd");

const instance = Promise.allSettled([a, b, c, d]);  // [!code focus]

instance                                            // [!code focus]
  .then((response) => {                             // [!code focus]
    const [aa, bb, cc, dd] = response;              // [!code focus]
    console.log(response);
  })                                                // [!code focus]
  .catch((err) => {
    console.error(err);
  });

// [
//   { status: 'fulfilled', value: 'aa' },
//   { status: 'fulfilled', value: 'bb' },
//   { status: 'fulfilled', value: 'cc' },
//   { status: 'rejected', value: 'dd' }
// ]
```

---

### Promise.any()

等待异步任务中先执行完成的那个任务

- 方法接收一个数组，包含要处理的异步任务 Promise 实例
- 方法返回一个 Promise 实例，实例结果为最先完成的异步任务的结果，无论成功失败

```js{0}
const a = new Promise((resolve) => setTimeout(() => resolve("aa"), 2000));
const b = Promise.resolve("bb");
const c = new Promise((resolve) => setTimeout(() => reject("cc"), 4000));
const d = Promise.reject("dd");


instance                    // [!code focus]
  .then((response) => {     // [!code focus]
    console.log(response);
  })                        // [!code focus]
  .catch((err) => {
    console.error(err);
  });

// "cc"
```

---

### Promise.race()

等待异步任务中先执行完成的成功状态的那个任务

- 方法接收一个数组，包含要处理的异步任务 Promise 实例
- 方法返回一个 Promise 实例，实例结果为最先完成的成功状态的异步任务的结果

```js{0}
const a = new Promise((resolve) => setTimeout(() => resolve("aa"), 2000));
const b = Promise.resolve("bb");
const c = new Promise((resolve) => setTimeout(() => reject("cc"), 4000));
const d = Promise.reject("dd");


instance                    // [!code focus]
  .then((response) => {     // [!code focus]
    console.log(response);
  })                        // [!code focus]
  .catch((err) => {
    console.error(err);
  });

// "bb"
```

---

## 异步任务的中止

利用 AbortController 可提前中断耗时异步的执行

1. 向 AbortController 实例上的`signal`监听`abort`时间
2. 自定义时机调用 AbortController 实例上的`abort()`中止异步

> 如下：Promise 异步任务模拟预计耗时 4s，但在在 2s 时中止执行

```js{0}
const abortController = new AbortController();              // [!code focus]

const instance = new Promise((resolve, reject) => {         // [!code focus]
  const timer = setTimeout(() => {
    resolve("resolved...")
  }, 4000);
  abortController.signal.addEventListener("abort", () => {  // [!code focus]
    clearTimeout(timer);                                    // [!code focus]
    reject("rejected...");                                  // [!code focus]
  });                                                       // [!code focus]
});                                                         // [!code focus]

instance
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

setTimeout(() => {                                          // [!code focus]
    abortController.abort();                                // [!code focus]
}, 2000);                                                   // [!code focus]
```
