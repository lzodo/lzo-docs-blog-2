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
设备像素/(CSS像素|独立像素)
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
        -  `理想视口`或者说`分辨率`就是给定设备物理像素的情况下，最佳的“布局视口”。
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

### 媒体查询

```CSS
// 设备宽度小于 960px 时 body背景变红
@media screen and (max-width: 960px){
    body{
      background-color:#F00；
    }
}
/* 在 screen 类型 小于 240px 或 大于360px 小于 700px 加载 */
@media screen and (max-width: 240px), (min-width: 360px) and (max-width: 700px) {
    
}
@media not screen {
    xxxx
}
@media only screen{
    xxx
}
/*
	设备类型:
		all、screen、print ...
	运算符
		not、and、only、逗号
	常见功能属性
		height                  输出设备中的页面可见区域高度。
        width                   输出设备中的页面可见区域宽度。
        max-aspect-ratio        输出设备的屏幕可见宽度与高度的最大比率。
        max-device-aspect-ratio 输出设备的屏幕可见宽度与高度的最大比率。
        max-device-height       输出设备的屏幕可见的最大高度。
        max-device-width        输出设备的屏幕最大可见宽度。
        max-height              输出设备中的页面最大可见区域高度。
        max-width               输出设备中的页面最大可见区域宽度。
        min-height              输出设备中的页面最小可见区域高度。
        min-width               输出设备中的页面最小可见区域宽度。
*/
```

#### 加载方式

```css
// 1、标签中 
<source media="(min-width: 650px)" srcset="demo.jpg">

// 2、样式中
@media only screen{
    xxx
}

// 3、样式标签
<style media="(min-width: 500px)">
  .box {
    background-color: red;
  }
</style>

// 4、第三方文件
@import url(./index.css) (min-width:350px);
```



### 适配方案

```css
/*
百分比
    width/height(百分比值):相对于父元素
    left/right:position非static的上级元素宽度
    top/bottom:position非static的上级元素高度
    定位元素 padding/margin:position非static 直接父亲元素的width，height无关
    非定位元素 padding/margin:直接父亲元素的width，而与父元素的height无关
    border-radius/translate/background-size等:相对于自生宽度
百分比布局缺点
	宽高相对父元素不一致，计算困难
*/
```

#### vw适配方案

[Github案例](https://github.com/liaozhongxun/lzo-webfit-postpxtoviewport)

```css
/* 计算公式:元素宽度(75px)/设计稿宽度(750px)*100 vw */
```



#### rem 适配方案

```css
/* 设计稿尺寸/rootValue(基准大小) => 得到rem大小，rem大小*根字体大小 => 得到设备显示的具体像素大小 */
```



-   rem只相对于浏览器的根元素（HTML元素）的font-size
-   在响应式布局中，必须通过js来动态控制根元素font-size的大小。
-   必须将改变font-size的代码放在css样式之前。
-   算法: `设计稿尺寸/rootValue(基准大小)` 得到rem大小，`rem大小*根字体大小`得到设备的具体像素大小
-   如果`基准翻倍`，html`字体翻倍`，得到的`rem值缩小一半`，最终设备得到像素大小`不变`

##### vue2

[Github案例](https://github.com/liaozhongxun/lzo-webfit-pxtorem-vue2)

```css

/*
1.通过 vue init webpack my-project 搭建vue2 webpack项目
2.映入rem文件动态设置html的字体大小
import "./rem";
3.安装 postcss-pxtorem@5.1.1
4..postcssrc.js 配置 postcss-pxtorem
----------------------------------------------.postcssrc.js
module.exports = {
  "plugins": {
    "postcss-pxtorem": { 
          rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
          rootValue: 32, //结果为：设计稿元素尺寸/32，比如元素宽750px,最终页面会换算成 23.4375rem
          propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
          unitPrecision: 5, //保留rem小数点多少位
          selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
		  selectorBlackList: [/^(?!\.mrms-).*斜杠], //只要不是.mrms-开头的类都排除，保留px
		  selectorBlackList: [/^(?!\.(mrms|ivu)-).*斜杠], // 只要不是.mrms-或.ivu-开头的类都排除，保留px
          replace: true, //是否直接替换
          mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
          minPixelValue: 12, //px小于12的不会被转换
    }
  }
}
-----------------------------------------------------

5.项目中按ui稿正常填写像素大小，解析后自动转为rem单位
*/
```

```js
//rem.js
// 基准大小
const baseSize = 32; //与 post-pxtorem 的 rootValue 一致
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  // iPhone678 375，baseSize为32,这是 得到跟节点大小为 16px
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};
```

##### vue3

>   `.postcssrc.js` 改为 `postcss.config.js`

[Github](https://github.com/liaozhongxun/lzo-webfit-pxtorem)

```css
/*
1.通过 vue create 项目名称
2.映入rem文件动态设置html的字体大小
import "./rem";
3.安装 postcss-pxtorem@5.1.1
4.postcss.config.js 配置 postcss-pxtorem
----------------------------------------------.postcssrc.js
module.exports = {
    "postcss-pxtorem": {
        rootValue: 32
		xxx
    },
  },
};

-----------------------------------------------------

5.项目中按ui稿正常填写像素大小，解析后自动转为rem单位
*/
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

### 样式关联配置

#### vue2 全局scss变量配置

1.   去除`webpack.base.conf.js`的scss配置

```javascript
{
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
},
```

2.   进入`build/utils`

```javascript
	function resolveResouce(name) {
        return path.resolve(__dirname, "../src/assets/styles/" + name);
    }

    function generateLoaders(loader, loaderOptions) {
        var loaders = [
            cssLoader,
            //添加部分1
            {
                loader: "sass-resources-loader",
                options: {
                    //这是用到的sass文件，多个文件时用数组的形式传入，这是带有变量和mixin的scss文件
                    resources: [resolveResouce("global-style.scss")],
                },
            },
        ];
        if (loader) {
            loaders.push({
                loader: loader + "-loader",
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: "vue-style-loader",
                publicPath: "../../",
            });
        } else {
            return ["vue-style-loader"].concat(loaders);
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders("less"),
        sass: generateLoaders("sass", { indentedSyntax: true }),
        //添加部分2,增加.concat....
        scss: generateLoaders("sass").concat({
            loader: "sass-resources-loader",
            options: {
                resources: path.resolve(
                    __dirname,
                    "../src/assets/styles/global-style.scss"
                ), //全局样式文件
            },
        }),
        stylus: generateLoaders("stylus"),
        styl: generateLoaders("stylus"),
    };
};
```


### 其他

-   锚点平滑滚动 html添加 `scroll-behavior: smooth;`
