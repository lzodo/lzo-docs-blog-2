---
title: CSS3
---
### CSS3新增属性
xxx
xxx
xxx

### 移动端适配

#### 屏幕尺寸
> 设备屏幕尺寸是指屏幕**对角线的长度**， 1英寸=2.54cm   

[查看大部分设备尺寸](https://screensiz.es/)

#### 屏幕分辨率
> 屏幕分辨率是指屏幕的**逻辑像素点 数**

#### 像素
[参考资料](https://segmentfault.com/a/1190000011586301)

-   **物理像素**

>   1366x768设备屏幕的物理像素是指横向1366与纵向768个发光的点组成的设备屏幕

物理像素|设备像素dp(device pixels)
设备固定属性，设备像素是固定不变的

---

-   **css逻辑像素**

逻辑像素|css像素
css像素是一个相对单位。
相对不同屏幕，其实际像素大小不同。
我们定义时，是定义其逻辑像素。即该图要用多少个像素来显示。

---

-   **设备像素比DPR**

设备像素比DPR(devicePixelRatio)
设备像素/CSS像素
DPR = 1 设备像素与css像素相等
DPR = 2 设备像素是css像素两倍
dpr可通过window.devicePixelRatio获取

---

-   **viewport 视口**
    -  布局视口（layout viewport）
        -  布局视口定义了pc网页在移动端的默认布局行为
        -  布局视口`默认为980px`。也就是说在`不设置网页的viewport`的情况下，pc端的网页`默认`会以布局视口为基准，在移动端进行展示
    -  视觉视口（visual viewport）
        -  视觉视口表示浏览器内看到的`网站的显示区域`
        -  用户可以通过缩放来改变视觉视口
    -  理想视口（ideal viewport）
    -  https://juejin.cn/post/6844903630655471624#heading-0

```html
<mate name='viewport' content="width=device-width,user-scalable=no" />
<!--
    width=device-width 可视区宽度等于设备显示屏幕宽度
    user-scalable=no   不允许用户手动缩放
    initial-scale=1    初始比例设置100%
    minimum-scale      最小缩放比例(user-scalable=no 不生效)
    maximum-scale      最大缩放比例(user-scalable=no 不生效)
    viewport:
        (1) 一个三百多像素屏幕，打开一个PC页面，要放置一个1000多像素的页面，会混乱，所以会手机浏览器虚拟一个980像素的页面，再进行缩放
        (2) 所以开发移动端时设置width=device-width，把980设置成设备的宽度
        
-->
```




### 移动端常用默认样式
```css
a,input,button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*清除点击阴影*/
}
input,
button {
  -webkit-appearance: none; /*清除ios圆角*/
  border-radius: 0; /*清除ios输入框默认圆角*/
}
body {
  margin: 0;
  -webkit-user-select: none; /*禁止选中文字*/
  font-family: helvetica; /*默认字体*/
  -webkit-text-size-adjust: 100%; /*用户横竖屏切换的时候，禁止字体缩放*/
  font-family: helvetica; /*默认字体*/
}

h1 {
  margin: 0;
}
a {
  text-decoration: none;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {
  vertical-align: top;
}
```



