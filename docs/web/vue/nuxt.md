---
title: nuxt
---

[配套项目](https://github.com/liaozhongxun/lzo-nuxt-v2.0.git)

优点
    1、多页面
    2、ssr seo 优化 每页有自己的tdk
    3、页面的内容源码直接有了,vue源码是没有什么内容的,不利于抓取(预渲染，SSR优化)

预渲染
    读取配置获取需要渲染的页面
    发布模拟浏览器环境打开页面
    页面脚本触发渲染时机
    渲染出当前页面内容
    获取渲染出的所有DOM结构
    生成HTML文件
   （模拟浏览器环境生成dom直接生成HTML文件，扔到页面上）
    vue seo方案 => 预渲染: (得到打包后将数据生成到html源码的效果)
        1、使用预渲染插件 `prerender-spa-plugin`  
            配置中设置指定需要预渲染的页面
            无法配置动态路由
            不适合 token 权限的项目
        2、修改页面 TDK `vue-meta-info` （在每个页面组件中配置自己后面的 TDK 信息）
            接口数据无效
        ```javascript
        export default {
            metaInfo:{
                title:"xxx"
            }
        }

        ```

服务端渲染(SSR)
    前端渲染的方式（C/S）
        用户通过浏览器向服务端发送请求 -> 服务端相应数据到看浏览器，vue将数据渲染到页面上
        拿到数据之前页面已经打开

    服务端渲染步骤 （C/S/S）
        用户发送请求到 Node Server -> Node Server(可以用 Nuxt 做)将发送请求到后端 ->  返回数据到 Node Server -> 渲染好完整页面呈现给用户
        ```javascript
        
        // 打包
        npm build  (不会生成dist)
        npm generate  依据路由编译生成html文件，生成静态站点,
        ```
    适合的项目:
        项目所有页面都有做SEO的时候

SEO优化方案
    1、前后端不分离(前端写好模板页面布局，扔给后端就可以了，不方便)
        -   不存在接口调用，压力全在后端
        -   不对外暴露接口，安全性好

    2、前后端分离
        2.1 SPA单页面应用对SEO不友好，数据是后期浏览器访问页面后渲染出来的
            -   压力分散到客户端，用户机器配置
        2.1 vue-cli项目 实现预渲染
            -   某些页面需要SEO的情况适合
        2.3 服务端渲染
            -   整个站点都需要seo
            -   起两个服务，Node server 和 后端接口服务，压力在服务端




### Nuxt

安装:[Nuxt2](https://nuxtjs.org/docs/get-started/installation#using-create-nuxt-app)

目录结构
-   pages           存放页面
    -   新建页面自动添加到路由，可直接访问
-   components      存放组件
    -   config文件 component 为 true 时，下面的组件，其他页面就可以直接引
-   static          存放静态资源
-   store           vuex状态树
-   nuxt.config.js  配置文件

概念
    路由`不需要手动配置`，会更加pages目录下的文件自动生成
    页面上用到的组件会自动去components目录查找，`不需要导入` -> 可配置



#### 生命周期
服务端生命周期(输出终端打印)
1. `nuxtServerInit` 在 store action 中
    -   可初始化数据，比如获取token
2. `middleware`, 全局从 `nuxt.config.js` 指定，局部重页面组件中指定 要执行的内容
    -   可验证 token ，类似vue的路由的守卫
3. `validate({params,query})`
    -   校验参数是否正确,不正确 直接重定向到 404 页面
4. `asyncData({store,params})`, 仅仅页面组件中用(page 下)，页面加载之前调用
    -   常用于发送请求操作,获取数据 
5. `fetch({app,store,params})`，页面加载前调用
    -   asyncData类似，在`组件`和`页面`都能用(渲染页面前会填充页面状态树 store 数据)

服务端与客户端 共有的 生命周期（控制台 Nuxt SSR 中有，Nuxt SSR 外也有打印）
1. `beforeCreate` 和 `created` 

客户端的生命周期（输出仅控制台 Nuxt SSR 外才打印的）
1. `beforeMount` 和 `mounted`
2. `beforeUpdate` 和 `updated`
3. `beforeDestroy` 和 `destroyed`


#### 路由
1、page 目录下默认生成路由，路由路径，根据目录结构生成
2、子路由，如果page有`index.vue`,那么新建一个`同名的文件夹`，里面的页面，就是index的子路由
3、动态路由，建一个 下划线开头的页面如 `_id.vue`
4、重构还想用原来router.js 的话，需要通过插件 `@nuxtjs/router` 处理
    -   npm install @nuxtjs/router -S
    -   nuxt.config.js ,modules:["@nuxtjs/router"] 配置
    -   把自己的 router.js 的懒加载干掉，再文件放到根目录 
    -   修改一下 export 。。。  

特点
1、无需懒加载

```javascript
<nuxt-link to="/login">跳转登录页面</nuxt-link>
```