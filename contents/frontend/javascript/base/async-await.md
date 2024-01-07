# async / await

async / await 可以解决 Promise 链式调用时的回调嵌套

## 基本使用

- `async`关键字用于声明 Async 函数，该函数返回值为一个 Promise 实例
- `await`关键字用于在 Async 函数内以同步的写法实现 Promise 实例上[`then()`](./promise.md#then)方法的作用，在实例处理的异步完成前 Async 函数的处理会暂时中断等待，从而实现同步的写法

::: code-group

```js [定义]
// 一般函数写法
async function 函数名() {
  await promise实例;
  await promise实例;
  const promise实例的返回值 = await promise实例;
  const promise实例的返回值 = await promise实例;

  return 返回值;
}

// 箭头函数写法
const 函数名 = async () => {
  await promise实例;
  await promise实例;
  const promise实例的返回值 = await promise实例;
  const promise实例的返回值 = await promise实例;

  return 返回值;
};
```

```js [调用]
const promise实例 = Async函数();

promise实例.then(
  // onfulfilled
  (value) => {},
  // onrejected
  (reason) => {}
);
```

:::

::: details 例子：Async 函数中连续处理多个 Promise 异步

```js
const a = Promise.resolve("aa");
const b = Promise.resolve("bb");

async function combineSomething() {
  const aa = await a;
  const bb = await b;
  return aa + bb;
}

const instance = combineSomething();

instance.then((res) => {
  console.log(res);
});

// "aabb"
```

:::

## 返回错误对象

- `return new Error()`：Error 对象包装在一个状态为 resolved 的 Promise 实例中
- `throw new Error()`：Error 对象包装在一个状态为 rejected 的 Promise 实例中

::: code-group

```js [return Error 对象]
async function doSomething() {
  return new Error("xxxx");
}

doSomething()
  .then((res) => {
    console.log("resolved", res); // 此处执行
  })
  .catch((err) => {
    console.error("rejected", err);
  });
```

```js [throw Error 对象]
async function doSomething() {
  return new Error("xxxx");
}

doSomething()
  .then((res) => {
    console.log("resolved", res);
  })
  .catch((err) => {
    console.error("rejected", err); // 此处执行
  });
```

:::

## 异常捕获

`await`关键字处理的 Promise 实例失败时的结果需要由`try...catch...`捕获

```js
async function 函数名() {
  try {
    await promise实例;
    await promise实例;
    const promise实例的返回值 = await promise实例;
    const promise实例的返回值 = await promise实例;
  } catch (err) {}
}
```
