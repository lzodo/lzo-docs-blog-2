---
title: 样式问题
---
### CSS
#### 只在火狐生效
```css
@-moz-document url-prefix(){
    .box{
        color:#f00; //box只在火狐浏览器上变红
    }
}
```

#### 毛玻璃效果
> backdrop-filter 不支持火狐

```css
bakcground:rgba(255,255,255,.1);
box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
backdrop-filter:blur(20px);
```
#### 溢出省略
```css
//单行
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;

//多行
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
#### IOS滚动滑动不顺畅问题
```css
overflow:auto;
-webkit-overflow-scrolling:touch;
```
#### 隐藏谷歌滚动条
```css
.ele::-webkit-scrollbar{
    display:none;
}
```
####  格式化上下文 BFC ?
#### 顶线、中线、基线...
> 顶线、中线、基线、底线、行高、行距、半行距 

https://www.jianshu.com/p/59f31a1704de
#### 图片地部3像素 
> 产生原因:img属于`linlie`元素，div中的img的vertical-align默认属性是`baseline`,而baseline和底线之间有偏差
> 偏差大小由`字体大小`而定
> 所有可以从这几个方面处理
```css
/*父元素*/
font-size: 0;

或img

display:block|inline-black;

或img

virtical-align: middle;//设置为任意值都可以
```
#### `cale`动态计算值
```css
width:cale(50% - 20px);
```
#### css隐藏元素的方法 
```css
display:none;
opcity:0;
visibility:hidden;（仍然占用空间）
各种方法搞到显示区域之外;

缩放方式
width and height:0;
transform: scale(0);
zoom: 0.00001;
```

#### ul list-style
```css
/* list-style-type, list-style-position, list-style-image*/
list-style:none|其他图形符号(例:decimal数字) inside(文本内侧) 自定义图片
```
#### initial 和 inherit
> initial:属性取默认值
> inherit:属性值从父元素继承

暂存:background-blend-mode 属性定义了背景层的混合模式（图片与颜色）。
    anime.js Mo.js velocity popmotion Hover(css)
