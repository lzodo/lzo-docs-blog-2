---
title: css
---
### CSS

>   层叠样式表 , 给标签添加样式

`内联样式` `内部样式` `link href 外部样式` `选择器` `布局` `定位` `文档流` `伪类` `伪元素`  `单位` `继承` `盒子模型` `图标 字体图标`

[官方文档](https://www.w3.org/TR/?tag=css)   [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)  [兼容性](https://caniuse.com)

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
          3.   `letter-spacing   word-spacing`  字母或单词间距

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

### 块元素的盒子模型

-   块级元素
    -   单独占据一整行
    -   设置宽度后，块元素仍然占据一整行，浏览器将默认的margin-right:auto 设置成认为是剩下所有
-   普通行内元素
    -   宽高只有内容决定 ，无法通过宽高设置
-   行内替换元素( inline-replaces )   ,并不是行内块(display:inline-block)元素
    -   不占据一整，但是可以设置宽高
    -   img 、video 、input
-   注意事项
    -   display 改变元素类型
    -   行内元素里面不要放块元素
    -   一般情况块可以包含任何元素，但是`p元素`不能包含其他块元素 (不会保存，但是浏览器解析处理，会单独创建多个p元素处理)
-   `内容 Content` `内边距 padding` `边框 border` `外边距 margin`
    -   **margin传递** : 如果`块元素顶部`和`父级顶部线`重叠，那么子元素设置的 m-t 会变成父元素的 m-t（除非父自己也设了，并且更大）
        -   1、`父元素`设置`边框`可以解决
        -   2、触发父级盒子 `BFC`
        -   3、这种需求最后不要用子元素margin (设置兄弟之间的距离)，应该用父元素padding (设置父子之间的距离)
        -   4、父元素 height:auto; 的话，margin-bottom 也会传递 

    -   **margin折叠**
        -   上下两个盒子，上下`都设置margin`，浏览器`会取更大的那个`，左右margin不会，上下才会折叠

    -   **margin:0 auto** 可以居中的原因
        -   块元素的宽度 = `width + padding + border + margin` 
        -   块元素一定占据整行，设置宽度后，剩下的会`分配给margin-right值` (没设置时，默认margin是0的)
        -   当 `margin-left` 和 `margin-right`  都为 auto 时，浏览器会`自动分配剩余`的部分，就居中了，只能水平居中

    -   这些不适合用于行内非替换元素，会有很多奇怪的问题
        -   比如给 span 设置padding，只要左右和下面有效果，并且`左右占据空间`，下面是`不占据空间`的
        -   比如给span 设置margiin，左右生效，上下不生效

### 其他属性 
-   `外轮廓 outline`
    -   语法和border一样 ，默认显示 boder 外面，`但不占据空间`

-   `盒子阴影 box-shadow`
    -   X偏移值 Y偏移值 模糊 扩散? 颜色 inset内阴影, xxx 阴影2

-   `文字阴影 text-shadow`
    -   没有扩散

-   `文本属性`
    -   单行省略
        -   `white-space:nowrap` 强制不换行，`overflow:hidden` 隐藏超出，·`text-overflow:ellipsis` 文本超出则涉略号显示
        -   flex:1 的容器中会有问题
    
-   `设置背景`

    ```css
    /* */
    background-color:#f00;
    /* */
    background-image:url(a.jpg),url(2.jpg);
    /* 平铺 */
    background-repeat:no-repeat;
    /* 尺寸 cover 缩放 铺满 保持比例裁剪 ，contain 缩放 宽或者高铺满 保持比例 无需裁剪*/
    background-size:auto|cover|contain|100% 100%|100px 100px:
    /* 背景位置 */
    background-position:100px -100px|top left|top "不设置bottom默认永远保持居中";
    /* 滚动 默认scroll不滚动，local跟随容器滚动，fixed相对浏览器窗口固定，滚动页面，容器向上，背景却停留原来位置*/
    background-attachment:scroll|local|fixed;
    /* background */
    background:color url 定位/尺寸 repeat local;
    
    /* 对比img */
    img 是一个元素 占用空间 右键可看地址 不支持精灵图(CSS Sprite) 对搜索以前友好
    background 相反
    
    图片作为网站重要组成部分，像logo，产品图等最好用img
    修饰美观的部分可以用 background
    ```

    



### 选择器

### 图标

#### 边框图标

```css
box-sizing:border-box; /* 设置主内容包括边框 ，放大边框可以挤掉所有盒子的位置*/
/* 三个边框 color 设置 transparent 透明，产生三角图标 */
/* https://css-tricks.com/the-shapes-of-css/#top-of-site*/
```



####  字体图标

1.   font-family:""; 使用的字体，默认是系统中储存的字体 

2.   自定义网络字体

     ```css
     /* 引用字体 */
     @font-face{ 
       font-family:YH;
       src:url(http://domain/fonts/MSYH.TTF); /* 一般回下载到本地 */
     }
     
     @font-face{ 
       font-family:YH;
       src:url("./fonts/xxx.eot"); /* 专门为了兼容IE */
       src:url("./fonts/xxx.eot?#iefix" format("embedded-opentype")), /* format 帮助浏览器快速识别字体 */
           url("./fonts/xxx.woff" format("woff")),
           url("./fonts/xxx.ttf" format("truetype")),
           url("./fonts/xxx.svg" format("svg")),
        ;
     }
     
     /* 普通使用字体 */
     html{
         font-family:"YH";
     }
     
     
     /* 字体可以说设置成各种形状，所有也能设置成图标的样子 https://www.iconfont.cn */
     .iconfont { /* 希望使用字体图标的地方 必须用有类 iconfont ，*/
         font-family:"YH";
     }
     
     i class='iconfont icotype'  编码 /i
     /* 也可以写到样式中, 通过给 icotype 就能直接使用某个图标了*/
     .icotype::before{
         content:"编码"
     }
     
     
     
     
     /* 兼容处理 */
     OpenType/TrueType 类字体扩展名 .ttf .otf  （两个兼容性好 除了ie8）
     Embedded OpenType 类字体扩展名 .eot  (仅仅IE支持)
     SVG字体 扩展名 .svg .svgz (主要适配苹果那个浏览器)
     WOFF 开放字体扩展名 .woff （兼容性好 除了ie8）  .woff2
     
     /* https://www.fonts.net.cn/  有包括有版权的 免费的多种字体 */
     
     
     ```




#### 精灵图 CSS Sprite

>   是一种`CSS图形合成技术`，将各种小图片合并到一个图片上，利用CSS背景定位来显示对应图片部分，`CSS雪碧`或`CSS精灵`

优点

1.   减少请求数量，加快响应速度，减轻压力，优化性能
2.   减少图片总大小
3.   解决图片命名困扰

制作

1. 设计人员提供
2. https://www.toptal.com/developers/css/sprite-generator  工具网站

使用

```css
 /* http://www.spritecow.com/ 获取设计稿图片信息 */
 
background-position:10px 10px; /* 通过这种方式将已近引入的雪碧背景图片，定位到合适的位置 */
```



### 布局

#### 标准流（Normal Flow）

-   默认元素`从左到右` `从上到下` ，块独占一行，这样 按顺序排布
-   默认相互之间不存在重叠现象



#### 定位流

>   通过 position 将元素脱离标准流，单独对其设置位置，使它们有不同行为

-   如: 放到另一个元素上面，或始终保存在浏览器窗口的同一个位置

-   position 元素

    -   static 默认

    -   relative 相对定位

        -   元素`依然`按标准流布局，但是可以使用 left top 等属性调整位置，`并且不影响标准流其他元素`
        -   移动的标准是`父元素`
        -   常用与元素位置的`微调`

        ```css
        /* 让img始终保持居中 */
        .box img{
            position:relative;
            left:-960px; /* 如果图片宽度为1920的话 , transform:translate(-50%)不要算宽度 */
            margin-left:50%; /* margin 的% 始终是相对父元素宽度的 */
        }
        ```

    -   absolute 绝对定位

        -    直接脱离标准流   
        -    移动的标准是相对 `定位了的`祖先元素，或`浏览器画布`进行移动，不是body
        -    定位元素的特点
             -    所有元素可以设置宽高
             -    宽高默认由内容决定
             -    不会支撑父元素的高度
        -    相对定义的祖先元素宽度 = 绝对定位元素宽度 + left + right + marginLeft + marginRight;
        -      relative 宽度   800 ，不设置 absolute  元素宽度
             -    800 = auto width + 0 + 0 + 0 + 0； 默认宽度，auto 所有会是800；
             -    800 = auto width + 50 + 50 + 0 + 0 ；那么定位元素宽度会自适应，宽度永远距离相对父级50像素
        -    relative 宽度   800 ，设置 absolute  元素宽度
             -    800 = 200 + 0 + 0 + auto + auto; 局可以实现水平居中了，浏览器不会吧left right的auto看成居中
        -    上面公式 也适用于垂直方向
        -    
    
    -   fixed 固定定位
    
        -   直接脱离标准流
        -   相对`可视区域` 定位
            -   `视口`只有可以看到的一屏幕，`画布`包括滚动的区域 >= 视口
    
    -   `sticky` 粘性定位 （新）
    
        -   



 











