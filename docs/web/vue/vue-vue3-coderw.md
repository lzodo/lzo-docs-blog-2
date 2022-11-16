---
title: vue32022
---
## 概念

#### 开启vue

```javascript
// 1、引入
<script src='https://unpkg.com/vue@next'></script>

// 2、创建模板内容 2.0的 options Api
const app = Vue.createApp({
    template: `<h2>hello {{msg}}!</h2`, // template的内容会覆盖app里的html，如果没写 temp vue将挂载节点里的html作为熏染模板，

    // 劫持返回的对象数据，通过 Object.defineProperty 或 new Proxy
    data: function(){ // 3.0 所有场景必须是函数 
        return {
            msg: "word"
        }
    }，

    // 不可以用箭头函数(箭头无作用域，里面的this无法指向vue对象)
    methods: {
        getData(){}
    }
 
})

// 3、挂载到页面已存在的节点
app.mount("#app")

```

#### 模板语法
```javascript
// v-for  循环遍历

```

#### MVC 与 MVVM

MVC: Model - View - Controller 的简称，（前端也符合，html view - js 控制器）
     准备好界面  控制器去服务器获取数据  得到数据转换为模型给页面使用

MVVM: Model（script，data、methods等） - View（template） - ViewModel（Vue框架） 的简称 ，Vue给Model和View建立桥梁  
    ViewModel 把 Model数据 绑定到界面
    ViewModel 把 View事件 监听到 Model

#### 




