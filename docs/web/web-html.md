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

1.   公共属性 `class` `id` `style`

     1.   `data-*` HTML5新增的一个自定义数据属性功能  可以通过 js 与 html 进行数据交互

          ```javascript
          // <div id="node" data-color="red" data-font-size="30px">你好</div>
          
          var div = document.getElementById("node");
          var data = div.dataset;
          var color = div.dataset.color;
          var fontSize= div.dataset.fontSize;
          console.log(data);      //对象
          console.log(color);      //red
          console.log( fontSize);   //30px
          
          // 删除
          delete div.dataset.color;
          
          //设置自定义的值
          div.setAttribute("data-font-weight","bold")
          
          // 选择器
          //选择所有具有data-color属性的元素
          var div = document.querySelectorAll("[data-color]");
          
          //选择所有data-color属性值为red的元素
          var div = document.querySelectorAll("[data-color='red']");
          
          /**  css
              div[data-class]{
                  width: 100px;
              }
           */
          ```

     1.   `title`  将内容完整显示给用户

2.   私有属性 `href ...`

#### 元素内容

1.   实体字符
     1.   如果要用影响结构，或不可见的符号
     2.   实体名称 `&lt;` `&gt;` `&nbsp;`
     3.   实体编号 `&#60;` `&#62;` `&#160;`
     4.   实体名称对应的实体编码 就是 [ASCII](https://www.habaijian.com/) 的实体编码

#### 常用元素

1.   **html**：整个文档的根元素 `:root{}`就是设置html元素的样式
     1. `lang` 可以帮助`语音合成`工具确定要使用的发音，或 `翻译工具`的翻译规则 `英文en  简体中文 zh-CN 中文 zh` (设置 lang="en" 那么打开页面，谷歌会提示是否翻译弹窗)

2.   **head** 文档配置信息

     1.   **mate**
          1.   字符集
               1.   字符集 `charset="utf-8"` 必须有，否则容易出现乱码
               
               2.   文本  通过`指定字符集编码`成二进制给计算机识别，计算机也要通过`同样的解码方式`将二进制成正常文字显示处理
               
                    ![过程](D:\MyData\projects\lzo-docs-blog-2\static\img\2022-09-03_135559.jpg)
               
               3.    现在一般都用 `utf-8`
     
     2.   `title` 
     
     3.   link 外部资源链接
     
          1.   ref 设置类型 ， href 引入资源路径
          2.   ref ="icon|stylesheel|dns-prefetch|preload"    图标 、样式表、指定域名提前解析  、预加载
     
3.   **body**

     1.   h （利于seo优化） 、p、ul li 、ol li、dl dt dd、from

     2.   img  

          1.   alt ( 加载失败的提示文字 )
          2.   src

     3.   a ( 锚元素 (anchor) )

          1.   超链接 跳转`新链接`，获取跳`转指定位置`
          2.   href 指定要打开的`地址` (`外部url` 、`本地地址`、`文件资源 可下载`、`协议地址`)

               1.    URL (统一资源定位符号)   URI （标志符 ，包含URL）
     
     
          ```html
           <!--协议地址-->
           <a href="mailto:xx@qq.com">发送邮件</a>
          ```
         
          3.   target 以什么方式打开 href，_self   _blank   _top(多层iframe最顶层打开)  _parent(多层iframe上层打开) ...
          4.   `锚点` a 元素的`href='#eleId'` 指向某个元素的 id  (实现`单页面菜单`，或`容器滚动到最底部`)
     
     4.   iframe
     
          1.   禁止别人引用 , 页面响应头设置 `X-Frame-Options:sameorigin` 表示只在同源域名下才能引用
     5.   `div` `span` 和`strong` `i` 这种元素的来源 
     
          1.   早期并没有css样式，为了让页面更好看，所有添加可各种各样包含各种样式的标签
          2.   htm基本元素  ->  添加各种strong标签  -> 臃肿不好维护  -> css成为为标准 -> 样式分离，h1 strong i 这些 都能样式实现 -> 出现`div/span 盒子 来搭建基本结构`，`css调样式`, 如果有`语义化`的东西在用对应标签`h1 ul p` 不好看css再微调
     6.   table
          1.   格式 table>(thead>tr>th)(tbody>tr>td)
          2.   `border-collapse:collapse`  边框折叠，适合合并td左右边框
          3.   常用属性：colspan="2" 跨列 (横向合并)、rowspan="2" 跨行（纵向合并）
          4.   caption 表格标题
     7.   from 
          1.   常用属性: disabled、readonly(只读)、checked （checkbox的默认选择）、autofocus(自动聚焦)、selected(下拉的默认选择)
          2.   Input Type 
               1.   button 普通按钮
               2.   reset 重置，点击有默认行为，from标签内生效 (button type='reset' 也可以)
               3.   submit 提交，点击有默认行为，from标签内生效 
               4.   radio 单选
               5.   checkbox 多选
          3.   Input Name
               1.   用于表单submit时参数key构建
               2.   相同Name 在 radio类型input 不能同时选择
               3.   相同Name 确定 checkbox 类型input 是否为同一个东西 
          4.   Input Value
               1.   用于表单submit参数value的构建
          5.   label  与某个input，textarea等元素绑定，点击label，就可以激活input ( label 的 for 与 input 的 id 关联 )
          6.    textarea 多行输入
               1.   cols 指定列数，rows 指定行数
               2.   `css resize:none` 隐藏左下角拉伸的按钮
          7.   select option

### emmet 工具

>   快速审查html 

```shell
# 快速生成h5默认结构
!
# 属性
a[href="xxxx"]{链接}>span
# > 子代 
div>ul>li
# + 兄弟
div+div.tow$
# 批量与内容
div>ul>li*10{文本$} 
# () 分组
div>(div.div1>div.div1child)+div.div2
# ^ 上级 .div11与.div1同级
div>div.div1>div.div2^div.div11
```

>   css Emmet

```shell
w100 width:100px
w100+h100 宽高100px  
m20-30-40-50 margin:10px 30px 40px 50px;

```



### HTML 关机知识点

`文档类型` `字符集` `URL` `SEO` `元素` `实体字符` `元素属性公私属性` `语义化标签` `表格` `表单`


​	
