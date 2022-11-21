---
title: nuxt
---

[配套项目](https://github.com/liaozhongxun/lzo-nuxt-v2.0.git)

### 概念
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
    路由`不需要手动配置`，会根据pages目录下的文件自动生成
    页面上用到的组件会自动去components目录查找，`不需要导入` -> 可配置



#### 生命周期
服务端生命周期(输出终端打印,里面不能用浏览器相关的对象 如localStorage)
1. `nuxtServerInit` 在 store action 中
    -   可初始化数据，比如获取token
2. `middleware`, 全局从 `nuxt.config.js` 指定，局部重页面组件中指定 要执行的内容
    -   可验证 token ，类似vue的路由的守卫
3. `validate({params,query})`
    -   校验参数是否正确,不正确 直接重定向到 404 页面
4. `asyncData({$axios,store,params})`, 仅仅页面组件中用(page 下)，页面加载之前调用
    -   常用于发送请求操作,获取数据     
    -   获取数据 `this.List = data` 变成 `return { List: data }`
5. `fetch({$axios,app,store,params})`，页面加载前调用
    -   asyncData类似，在`组件`和`页面`都能用(渲染页面前会填充页面状态树 store 数据)
    -   建议组件中才使用fetch
        -   组件中没有 {$axios,app,store,params} 这些上下文对象，用 this.$axios 代替

    -   this.List = data;this.存在的，但是拿不到数据，this.data.List = data;可能可以拿到？？ 
    -   或者fetch页面中是拿来操作store的??

服务端与客户端 共有的 生命周期（控制台 Nuxt SSR 中有，Nuxt SSR 外也有打印，也不能用浏览器相关对象）
1. `beforeCreate` 和 `created` 

客户端的生命周期（输出仅控制台 Nuxt SSR 外才打印的）
1. `beforeMount` 和 `mounted`
2. `beforeUpdate` 和 `updated`
3. `beforeDestroy` 和 `destroyed`

持久化存储，使`服务端`和`客服共享`的生命周期可以访问持久数据
1、安装模块 `npm install cookie-universal-nuxt -S`
2、nuxt.config.js -> modules 添加 `cookie-universal-nuxt`
3、使用
```javascript
// 登入成功的时候,下次不用登录，也可以拿到这个数据，放到store.state中，服务端生命周期就可以通过sotore拿到这个数据
// 代替localStorage.set("token","xxxxx")
this.$cookies.set("token",'xxxxx')
// 获取
this.$cookies.get("token")

```


#### 路由
1、page 目录下默认生成路由，路由路径，根据目录结构生成
2、子路由，如果page有`index.vue`,那么新建一个`同名的文件夹`，里面的页面，就是index的子路由
3、动态路由，建一个 下划线开头的页面如 `_id.vue`
4、重构还想用原来router.js 的话，需要通过插件 `@nuxtjs/router` 处理
    -   npm install @nuxtjs/router -S
    -   nuxt.config.js ,modules:["@nuxtjs/router"] 配置
    -   把自己的 router.js 的懒加载干掉，再文件放到根目录 
    -   修改一下 export 。。。  
    -   里面的`导航守卫`也属于服务端的生命周期,里面操作在终端打印

导航守卫
1. 自己定义的路由表，用法和vue一样
2. nuxt 的导航守卫
    -   中间件 middleware
        -   配置文件 添加 router 配置，根文件夹新建 middleware 文件夹，里面存放做的事情
        -   配置文件 设置全局，页面中设置 局部
    -   插件 plugin

特点
1、无需懒加载

```javascript
<nuxt-link to="/login">跳转登录页面</nuxt-link>
```

#### nuxt.config.js
> 里面的配置都是全局的

1. head
    -   ssr 每个页面如果没设置`自己独有的 tdk `等信息，就会用全局的
    -   全局hander是一个对象信息，每个页面中的 是一个 head 函数,return出 里面的信息
    -   局部 与 全局相同的属性可以不写,一般 标题 描述 关键字就可以了
    ```javascript
    export default {
        head(){
            return {
                title: '页面独有 head 属性设置',
            }
        },
    }
    ```

2. css
    -    全局引入：css模块添加 "~/static/xxx/style.css"
    -    局部引入：@import "~/static/xxx/style.css";
    -    nuxt 中 `页面样式`如果`不写 scoped` ,页面间的样式`不会相互影响`，但是这个样式却会在`组件`中生效
    -    scss 需要安装 `npm install sass sass-loader@10.1.1 -D`,只要安装上去就可以了，最新版本好像不能用 


3. components
    -   设置位 true 后，页面中使用组件就可以不用注册，就能直接使用了


4. plugins
    -   呈现页面之前要运行的插件
    -   使用场景 `axios二次封装`、`第三方插件`、`ElementUi` ...
        -   `~/plugin/xxxelementui.js`
        -   css部分需要映入 `插件相关的css`
        -   JS 中 再 import Vue 、import Element ， Vue.use(Element) 这些操作

5. modules
    -    `npm install @nuxtjs/axios -S` 创建项目如果有选中的话就不用安装了
    -    modules 中添加 '@nuxtjs/axios' 配置nuxt内置的axios
    -    接口注意事项：SSR是为了seo优化，所有请求接口一定先在服务端口拿到数据，再打开页面，所以一般都再服务端周期调用

6. axios
    -   配置代理
    -   modules 安装并添加 `@nuxtjs/axios`,`@nuxtjs/proxy`
    ```javascript   
    {
        modules: [
             `@nuxtjs/axios`,
             `@nuxtjs/proxy`
        ],
        axios: {
            // 是否可跨域
            proxy: true,
            // 重发次数
            retry: {retries:5},
            // 不同环境下基本地址
            baseURL: '/', // 开发环境 xxx 否则 xxx
        },
        proxy: {
            '/api':{
                target: 'http://localxxxxxx',
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
    ```

7. loading
    -   nuxt 默认每个页面加载都有一个黑条 `loading:false` 禁用，自己去axios配置
    -   或更改样式
    ```javascript
    loading:{
        color:red
    }
    ```
    -   或指定loading 动画文件 `loading:'~/components/loading.vue'`
    ```javascript
    export default {
        data(){
            return {
                loading: false,
            }
        },
        methods:{
            start(){ // 路由更新，浏览器地址发送变化时调用
                this.loading = true;
            },
            finish(){ // 更新完毕，asyncData 调用完成，且页面完成加载时调用
                this.loading = false
            }
            fial(){},
            increase(num){ // 页面加载过程中调用，num 小于100
    
            },
        }
    }
    ```

8. server 配置渲染node服务器端口
```javascript
server:{
    prot:3000
}
```



#### 项目上线
1. `npm run build` 打包
2. 打包好的 `.nuxt`,`static`,`nuxt.config.js`,`package.json`, 上传到服务器
3. 服务器安装node环境，执行 `npm install`
    -   安装MongoDB数据库，mongoose 首先 systemctl 运行数据库，设置开机启动
    -   直接启动 或 `pm2 start bin/www` 启动服务器接口服务
    -  `npm run start` 或 `pm2 --name=nuxtName start npm -- run start` 启动nuxt服务
4. 在服务器上运行 `npm run start` 启动项目，创建 `localhost:3000` 服务
5. 通过nginx将 `localhost:3000` 代理到需要用的域名 `www.xxxx.com` 中