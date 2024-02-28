# HTML 文本格式化标签

也可通过 CSS 样式来实现同等效果

## 斜体标签

### \<em>

> 行内元素

强调文本语义

<div :class="$style.playground">
  aaa<em>xxxx</em>bbb
</div>

```html
aaa<em>xxxx</em>bbb
```

---

### \<i>

> 行内元素

不强调文本语义，要注意避免滥用

<div :class="$style.playground">
  aaa<i>xxxx</i>bbb
</div>

```html
aaa<i>xxxx</i>bbb
```

## 粗体标签

### \<strong>

> 行内元素

强调文本语义

<div :class="$style.playground">
  aaa<strong>xxxx</strong>bbb
</div>

```html
aaa<strong>xxxx</strong>bbb
```

---

### \<b>

> 行内元素

不强调文本语义，要注意避免滥用

<div :class="$style.playground">
  aaa<b>xxxx</b>bbb
</div>

```html
aaa<b>xxxx</b>bbb
```

## 小写标签

### \<small>

> 行内元素

不强调文本语义，要注意避免滥用

<div :class="$style.playground">
  aaa<small>xxxx</small>bbb
</div>

```html
aaa<small>xxxx</small>bbb
```

## 下划线标签

### \<ins>

> 行内元素

强调文本语义

<div :class="$style.playground">
  aaa<ins>xxxx</ins>bbb
</div>

```html
aaa<ins>xxxx</ins>bbb
```

---

### \<u>

> 行内元素

不强调文本语义，要注意避免滥用

<div :class="$style.playground">
  aaa<u>xxxx</u>bbb
</div>

```html
aaa<u>xxxx</u>bbb
```

## 删除线标签

### \<del>

> 行内元素

强调文本语义

<div :class="$style.playground">
  aaa<del>xxxx</del>bbb
</div>

```html
aaa<del>xxxx</del>bbb
```

---

### \<s>

> 行内元素

不强调文本语义，要注意避免滥用

<div :class="$style.playground">
  aaa<s>xxxx</s>bbb
</div>

```html
aaa<s>xxxx</s>bbb
```

## 标记标签

### \<mark>

> 行内元素

<div :class="$style.playground">
  aaa<mark>xxxx</mark>bbb
</div>

```html
aaa<mark>xxxx</mark>bbb
```

---

### \<code>

> 行内元素

<div :class="$style.playground">
  aaa<code>xxxx</code>bbb
</div>

```html
aaa<code>xxxx</code>bbb
```

## 注音标签

### \<ruby>

> 行内元素

主要用于展示东亚语言 ( 中文、日语 ) 的注音

多与子标签[`<rt>`](#rt)、[`<rp>`](#rp)一起使用

<div :class="$style.playground">
  <ruby>
    漢<rt>kan</rt> 
    字<rt>ji</rt>
  </ruby>
</div>

```html{0}
<ruby>
    漢<rt>kan</rt>
    字<rt>ji</rt>
</ruby>
```

---

### \<rt>

> 行内元素

[`<ruby>`](#ruby)标签的子标签，用于包裹在文字上方展示的注音

在没有使用或浏览器不支持`<ruby>`标签时一行显示

<div :class="$style.playground">
  <small :class="$style.comment">有 ruby 标签时：</small>
  <ruby>
    漢<rt>kan</rt> 
    字<rt>ji</rt>
  </ruby>
   
  <small :class="$style.comment">无 ruby 标签时：</small>
    漢<rt>kan</rt> 
    字<rt>ji</rt>
</div>

```html{0}
<!-- 有 ruby 标签时： -->
<ruby>
    漢 <rt>kan</rt>
    字 <rt>ji</rt>
</ruby>

<!-- 无 ruby 标签时： -->
漢 <rt>kan</rt>字 <rt>ji</rt>
```

---

### \<rp>

> 行内元素

[`<ruby>`](#ruby)标签的子标签，用于在浏览器不支持`<ruby>`标签时展示的内容

包裹内容多为小括号

```html{0}
<ruby>
    漢 <rp>(</rp> <rt>kan</rt> <rp>)</rp>
    字 <rp>(</rp> <rt>ji</rt> <rp>)</rp>
</ruby>
```

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
