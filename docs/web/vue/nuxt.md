---
title: nuxt
---

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
-   components      存放组件
-   static          存放静态资源
-   store           vuex状态树
-   nuxt.config.js  配置文件

概念
    路由`不需要手动配置`，会更加pages目录下的文件自动生成
    页面上用到的组件会自动去components目录查找，`不需要导入` -> 可配置



#### 什么周期

