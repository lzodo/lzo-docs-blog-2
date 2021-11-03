---
title: flex基础
---

> 设置 display:flex;的盒子就是 Flex 容器(flex container),它的直接子元素就是项目(flex item), flex 容器的子元素 float clear vertical-align 等属性都会失效
[flex game](http://flexboxfroggy.com/)
### 主轴与侧轴

1. 默认主轴就是 x 方向向右、水平方向、行

2. 默认侧轴就是 y 方向向下、垂直方向、列

3. 元素是跟着主轴方向排列的,主轴的方向最终取决于 flex-direction 的值

### 父容器常用属性

flex-direction: 设置主轴方向

```css
flex-direction:
    :row;  默认、水平向右
    :row-reverse; 是元素从右向左排类
    :column; 将主轴设置为垂直方向，设置之后水平方向就成了侧轴
    :column-reverse;  从下到上
```

justify-content: 设置主轴上子元素的排列方式

```css
justify-content:
    :flex-start; 默认,项目从左对齐
    :flex-end; 使项目右对齐
    :center; 在主轴居中对其(如果主轴是x则水平居中)
    :space-around;  平均分配空间
    :space-between; 两边贴边、再平分剩余空间
```

flex-warp: 设置子元素是否可以换行(默认 flex 是不会换行的,空间不够会减小项目的宽度)

```css
flex-warp:
    :nowarp;  默认
    :warp;  可以换行
    :warp-reverse;  可以换行，且第一行在下面
```

align-content: 设置侧轴上子元素的排列方式(多行,单行无效果)

```css
align-content:
    :flex-start; 侧轴从上到下
    :center; 垂直居中
    :space-between; 侧轴上两边贴边,再平分剩余空间
    :space-around;  平均分配侧轴空间
    :stretch; 子元素高度平分父元素高度
    :flex-end; 侧轴从下到上
```

align-items: 设置侧轴上的子元素排列方式(单行，多行无效果)

```css
align-items:
    :flex-start; 默认,侧轴从上到下
    :flex-end; 侧轴从下到上
    :center; 垂直居中
    :stretch; 将项目拉升的与最大高度(子项目不能设置高度)
```

> flex-flow: 符合属性 相当于设置了 flex-directiion 和 flex-warp , :column warp 直接设置主轴方向与是否换行

### 子容器常用属性

```css
flex:null | flex-grow flex-shrink flex-basis;
	:1; 无宽度子元素个数分之一,一般只用第一个

align-self: 控制某个子项自己在侧轴的排列方式
    :flex-start; 侧轴从上到下
    :flex-end; 侧轴从下到上
    :center; 垂直居中

flex-grow:设置子元素所占剩余空间比例
	flex-grow:4,flex-grow:1,flex-grow:2;第一个占七分之四,第二个占七分之一，第三个占七分之二

order: 定义子项的排列顺序(前后顺序,数值越小越靠前 默认0,可以是负数)
flex-shrink:设置缩小比例(不换行时单所有元素宽度之和超过父容器时),默认都是1
```

<!--  <iframe
 height='350px'
 width='100%'
 src="http://mctool.wangmingchang.com/index/jspay/dashang">
 </iframe> -->
