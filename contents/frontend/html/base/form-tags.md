# HTML 表单标签

## 表单标签

### \<form>

## 输入框标签

### \<input>

> 行内元素

## 多行文本输入框标签

### \<textarea>

> 行内元素

<div :class="$style.playground">
  <textarea rows="5" cols="20">xxx</textarea>
</div>

```html
<textarea rows="5" cols="20" placeholder="xxx">Xxx</textarea>
```

## 下拉选择框标签

### \<select>

> 行内元素

<div :class="$style.playground">
    <select>
        <option>选项1</option>
        <option>选项2</option>
        <option>选项3</option>
        <option>选项4</option>
    </select>
</div>

```html
<select>
  <option>选项1</option>
  <option>选项2</option>
  <option>选项3</option>
  <option>选项4</option>
</select>
```

---

### \<option>

[`<select>`](#select)标签的子标签，用于包裹下拉选择框中的选项

<div :class="$style.playground">
    <select>
        <option>选项1</option>
        <option>选项2</option>
        <option selected>选项3</option>
        <option disabled>选项4</option>
    </select>
</div>

```html
<select>
  <option>选项1</option>
  <option>选项2</option>
  <option selected>选项3</option>
  <option disabled>选项4</option>
</select>
```

---

### \<optgroup>

[`<select>`](#select)标签的子标签，用于以分组的形式包裹下拉选择框中的[`<option>`](#option)标签

<div :class="$style.playground">
    <select>
        <optgroup label="分组1">
            <option>1-A</option>
            <option>1-B</option>
        </optgroup>
        <optgroup label="分组2">
            <option>2-A</option>
            <option>2-B</option>
        </optgroup>
    </select>
</div>

```html
<select>
  <optgroup label="分组1">
    <option>1-A</option>
    <option>1-B</option>
  </optgroup>
  <optgroup label="分组2">
    <option>2-A</option>
    <option>2-B</option>
  </optgroup>
</select>
```

## 其他标签

### \<label>

> 行内元素

<div :class="$style.playground">
  <small :class="$style.comment">写法一：</small>
  <label>
    <span>Label Text</span>
    <input style="border: 1px solid black; margin-left: 10px;"/>
  </label>
  <br/>
  <br/>
  <small :class="$style.comment">写法二：</small>
  <label htmlFor="xx">Label Text</label>
  <input id="xx" style="border: 1px solid black; margin-left: 10px;"/>
</div>

```html
<!-- 写法一： -->
<label>
  <span>Label Text</span>
  <input />
</label>

<!-- 写法二： -->
<label htmlFor="xx">Label Text</label>
<input id="xx" />
```

---

### \<button>

> 行内元素

<style module>
.playground {
    background-color: #f5f5f5;
    color: black;
    padding: 1rem;
    border: 1px solid grey;
    margin-top: 16px;
}
.comment {
    display: block;
    color: green;
}
</style>
