---
title: html
---
### HTML
>   超文本标记语言 ( Hyper Text Markup Language )

1.   构建网页的技术，框架结构, 以`.htm/.html` 结尾的文件 (早期 win95 那种系统扩展名不能超过三个字符)
2.   网页由`标签`注册，`标签和内容`组成的部分称为`元素` 
3.   [MDN HTML 所有元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)



### 文档标准结构

1.   文档类型声明 
     1.   H5的申明`<!DOCTYPE html>` 让浏览器用H5标准去解析，必须放在最前面，不能省略
     2.   其他还有 html4 、XHTML(语法严格)

2.   HTML结构  `html>(head>title{网页标题})+body>div{内容 $}*5`

---

### 元素

---

>   元素由 **标签 属性 内容** 组成

#### 元素标签

1.   标签：不区分大小写，建议都小写 `<div>`

2.   单标签( img 、image、meta、... )
     1.   `<img />`  `斜杆`是以前xhtml那种早期版本固定单标签需要加上的，限制`不需要`了

#### 元素属性

1.   公共属性 `class` `id`
2.   私有属性 `href ...`

#### 元素内容

#### 常用元素

1.   **html**：整个文档的根元素 `:root{}`就是设置html元素的样式
     1. `lang` 可以帮助`语音合成`工具确定要使用的发音，或 `翻译工具`的翻译规则 `英文en  简体中文 zh-CN 中文 zh` (设置 lang="en" 那么打开页面，谷歌会提示是否翻译弹窗)
2.   **mate**
     1. 字符集 `charset="utf-8"`

