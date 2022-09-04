---
title: css
---
### CSS

>   层叠样式表 , 给标签添加样式

`内联样式` `内部样式` `link href 外部样式` `选择器` `定位` `文档流` `伪类` `伪元素`  `单位` `继承` `盒子模型` 

[官方文档](https://www.w3.org/TR/?tag=css)   MDN文档  [兼容性](https://caniuse.com)

#### 外部样式

```css
/* link href 引入到 html*/
@import url("xxxx.css"); /*css 文件 引入其他样式文件*/
```



### CSS 属性

####  一些属性

1.   定位(position) 和布局(Layout)

2.   展示(display)和可见(Visivbility)

3.   盒子模型

4.   背景设置
     1.   颜色的表示方法 （red 、#f00、 RGB(255,0,0)、RGBA）
     2.   `background-color` 设置背景色 ,  `color`设置的是前景色，下划线删除线的颜色也会改变

5.   字体、文本
     1.   `text-decoration` 装饰线

     2.   `text-align` 设置 `行内元素或内容`相对 `块父元素的` 水平对齐方式，块元素居中需要 `margin 0 auto`
          1.   `justify` 两端对齐，中间平均分配 (最后一行不生效, 一段文字如果最后一行只有连个词，一个做一个右不好看)
          2.   `text-align-last:justify` 这样最后一行就能生效了
          3.   letter-spacing   word-spacing  字母或单词间距

     3.   单位
          1.   px
          2.   em
               1.   相对`父元素字体大小`的倍数
               2.   或者说`通过继承`得到一个`默认大小`，`em 相对自己字体大小` 的倍数进行设置
          3.   百分比%
               1.   不同地方用百分比相对的东西都是不同的，比较混乱
               2.   [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size)  找搜索 font-size 到 `Percentages (百分比)` 查询 得到 `refer to the parent element's font size`
                    1.   font-size - 父级字体大小  ，width - 父级容器宽度 ，padding，margin - 父级容器宽度
          4.   rem

     4.   font-family
          1.   尽量设置多个，防止用户系统找不到相应字体而用 不可控的默认字体

     5.   line-height

          1.   设置一行文本所占用的高度，准确说是 `两行文本基线(baseline)之间的距离`

               ![](D:\MyData\projects\lzo-docs-blog-2\static\img\2022-09-04_075115.jpg)

          2.   系统会将`行高大小 - 文字大小` ，剩下的`行距`  上面一半下面一半，可以起到居中的作用

          3.   为什么行高与文字大小相等，上下还是会有一点距离  (可能因为 `font-size 设置顶线到底线`的距离，里面的`字距离顶线与底线`距离总是有一点距离的)

     6.   font-weight

          1.   w3c  100 ~ 900
          2.   400 `默认`
          3.   700 `bold`
          4.   1 ，100.6 ，123， 1000  也可以  

     7.   font-style

          1.   italic : 适用字体中设计方案中自带的斜体，不支持的就没用
          2.   oblique: 让文本进行倾斜

     8.   font-variant: small-caps   将小写字母显示成`缩小的大写字母`

     9.   font 缩写 `font:style weight variant size/line-height family;`

          1.   style weight variant 位置不限制,可以省略
          2.   line-height，位置必须在size 后面，也可以省略，不写单位代表前面的倍数
          3.   size family 位置在最后不能变，也不能省略

6.   其他属性

#### 属性的特性

1.   属性的继承
     1.   默认继承
          1.   某元素设置`具备继承性的属性`，那么它的`所有后代元素`都`默认拥有该属性`，后代重新设置优先级高`可以覆盖`
     2.   常见可继承的属性
          1.   `font-size` font-family font-weight line-height color text-align ...
          2.   一般`文本相关`属性默认可继承
          3.   通过Google控制台，`Style -> Inherited from xxx` 可以指定某些属性是否可继承
     3.   继承的注意事项
          1.   继承的是计算后的值，不一定是设置时手写上去那些字符；`font-size:2em  -> 继承后 font-size:32px`
     4.   强制继承
          1.   子元素 `border:inherited` 强制继承父元素的 border
2.   层叠，
     1.   对于`同一个`操作对象，它的样式可以通过`任何样式表`或`不同选择器`进行设置，最终`通过优先级`，拿到`优先级最高的设置`
     2.   优先级: `!important{1000} > 内联样式{1000} > ID{100} > Class|伪类|属性 {10} > 元素|伪元素 {1} > * {0}`
     3.   权重可以累加 `p.xxx {11} > .xxx{10}`

### 盒子模型

-   块级元素
    -   单独占据一整行
    -   设置宽度后，块元素仍然占据一整行，浏览器将默认的margin-right:auto 设置成认为是剩下所有
-   普通行内元素
    -   宽高只有内容决定 ，无法通过宽高设置
-   行内替换元素( inline-replaces )   或者行内块元素
    -   不占据一整，但是可以设置宽高
    -   img 、video 、input
-   注意事项
    -   display 改变元素类型
    -   行内元素里面不要放块元素
    -   一般情况块可以包含任何元素，但是`p元素`不能包含其他块元素 (不会保存，但是浏览器解析处理，会单独创建多个p元素处理)

### 选择器



