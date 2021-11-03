---
title: html
---
### HTML
#### contenteditable 标签可编辑
```html
<div contenteditable="true"></div>
```
#### 图片懒加载以及方案
> 延迟到图片出现再加载图片

```html
<!--
通过图片的loading属性，默认eager，lazy设置成延迟加载
loading="lazy"
loading="eager"
-->
<img src="xxx" loading="lazy" />
```

#### datalist input输入预提示
```html
<input list="datalistId" name="xxx" id="xxx" />
<datalist id="database">
    <option value="Javascript">
    <option value="Typescript">
</datalist>
```

#### picture 根据分辨率替换图片
```html
<picture>
    <source media="(min-width:768px)" srcset="a.jpg">
    <source media="(min-width:500px)" srcset="b.jpg">
    <img src="c.jpg"/>
</picture>
```

#### 头文件 mate 标签
-   `http-equiv`
    -   Refresh:自动跳转刷新
    -   2s后自动刷新并指向新页面。 
    ```html
    ＜meta http-equiv="Refresh" content="2；URL=https://www.baidu.com/"＞  
    ```
