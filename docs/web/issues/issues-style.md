---
title: 样式问题
---
#### CSS
#### 初始化

normalize.css

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
    
#### font-family

##### `font-family`取值
- **font-family: Arial** ：具体的`字体样式`，字体族名为 Arial;
- **font-family: sans-serif**：`通用字体族名`,备选机制，用于在指定的字体不可用时给出较好的字体
- **通用字体族名**
    - [css fonts3](https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/#generic-font-families)
        - serif 衬线字体族
        - sans-serif 非衬线字体族
        - monospace 等宽字体，即字体中每个字宽度相同
        - cursive 草书字体
        - fantasy 主要是那些具有特殊艺术效果的字体 	
    - [css fonts4 新增](https://www.w3.org/TR/css-fonts-4/#generic-font-families)
        - system-ui 系统默认字体
        - emoji 用于兼容 emoji 表情符号字符
        - math 适用于数学表达式
        - fangsong 此字体系列用于中文的（仿宋）字体。

##### 常用 通用字体族名

- `系统默认字体（system-ui）`，不同的操作系统的 Web 页面下，自动选择本操作系统下的默认系统字体。
	- 补充 system-ui 兼容性的不足 
	- 支持作为 **-apple-system** 值（仅在 macOS 和 iOS 上）
	- 支持作为 **BlinkMacSystemFont** 值（仅在 macOS 上） 	
- `Segoe UI`， Windows 平台及 Windows Phone 上选取最佳的**西文字体**展示。
- `Roboto`，是为 Android 操作系统设计的一个无衬线字体家族
- `衬线字体族（ serif）`，在字符笔画末端有叫做衬线额外装饰，笔画的粗细会有所不同
- `无衬线字体族（sans-serif）`，通常是统一线条的，往往拥有相同的曲率，笔直的线条，锐利的转角

```css
*{
	font-family: system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,
    Helvetica,Arial,
    sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
}
/* system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,具体字体族,sans-serif,可有可无随意;*/
```
