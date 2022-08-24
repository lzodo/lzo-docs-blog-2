---
title: 微信小程序
---
> 原生微信小程序(官方weui)

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)
## 环境
1、开发环境：一般网页运行浏览器中，小程序运行微信环境中
2、API差异：小程序无法调用浏览器的DOM BOM API，但是有微信环境提供的各种API
3、开发模式：账号 + 微信开发者工具 （开发设置获取AppID，创建项目需要用到）
### 关键字
+ openId:openid相当重要，它是用户的唯一标识id
## 目录结构
### page 文件夹
> 小程序页面, 快捷创建方式: `app.json` -> `pages` -> `直接添加路径保存`，就能直接生成`整个页面文件`了

相关文件
+ index.js  (某页面js逻辑)
    -   每个页面自己的 js
    -   
+ index.json  (某页面数据)
+ index.wxml  (某页面html)
    -   与 html 的差异
    -   标签名称不同、属性节点不同
    -   提供类似vue的模板语法   
    -   wxml 采用 Mustause 语法 {{}}
        -   绑定内容 : `{{xxx}}`、`{{num > 10 ? "大于十":"小于等于十"}}`、`{{num * 10}}`   绑定内容
        -   绑定属性 : `src="{{xxx}}"` 
            -   `hidden="{{bool}}"` 是否隐藏元素（hidden 与 wx:if  == 反 v-show 与 v-if）
    -   判断语句 : `wx:if    wx:elif   wx:else`
    -   列表渲染 : `wx:for="{{List}}"`
        -  索引 {{index}}  每一项 {{item}}  
        -  `wx:for-index="idx"` 重命名索引
        -  `wx:for-item="itm"` 重命名每一项
        -  `wx:key="id"`
    -   绑定事件 : 
        -   点击触发 `bindtap 或 bind:tap`
        -   输入触发 `bindinput 或 bind:input`
        -   状态改变 `bindchange 或 bind:change`
        -   事件对象属性
            -   target：指向触发事件的源头组件(类似 ul 事件委托的 li)
            -   currentTarget：绑定事件的组件(类似 ul 事件委托的 ul)
    -   事件传参
        -   传递参数xxx，值为123 ：`data-xxx="{{123}}"`
        -   获取 `event.currentTarget.dataset.xxx`
        -   input bindinput 的最新值 `e.detail.value`
    -   独特标签
        -   block 包裹多个标签，渲染后不会该标签不存在
    
+ index.wxss  (某页面css)
    -   仅支持大部分css属性，常用的基本都支持，也有`自己的东西`
        -   rpx 适配
            -   将宽度分为 `750` 份，屏幕总宽度为 `750rpx`
            -   换算px 
        -   @import 样式导入
            -   `@import "xxxx.wxss"`
    -   app.wxss 全局样式表 页面中 自己的私有样式表
        -   局部权重(鼠标移入wxss类时显示权重 )大于等于全局时，就近原则，局部样式覆盖全局
        -   

### 生命周期
页面的生命周期
```javascript
Page({
    onLoad(){} // 页面加载时候执行
})

```
### util 文件夹
> 存放一些工具方法

### 文件
+ app.js  (全局js逻辑)
    -   app.js 项目入口文件
+ app.json  (全局配置文件)
    -   `pages`:小程序所有页面路径存放
    -   `windnow`:小程序全局窗口外观（默认标题栏，手机wifi栏，窗口背景等）
    -   `tabBar`: 设置底部tabBar 菜单 
    -   `"style":"v2"` 用v2版本样式
+ app.wxss  (全局css)
+ project.config.json (一些配置项目配置信息)
    -   setting (详情->本地设置的操作记录)
    -   appid (网上的项目需要把这个appid换成自己的)
+ project.private.config.json，覆盖 project.config.json 相同属性的值
+ sitemap.json (设置爬虫文件)

https://www.bilibili.com/video/BV19r4y1N7Br?p=3&spm_id_from=pageDriver

### 小程序宿主环境 微信
-   通信模型支持
    -   逻辑层 通过 微信客户端与选如此通信
    -   逻辑层 通过 微信客户端与第三方服务通信 获取数据
-   运行机制支持
    - 程序 下载代码包 -> 解析 app.json 全局配置文件 -> 执行app.json 小程序入口文件 -> 渲染首页 启动完成
    - 页面 加载解析页面的 .json 配置文件 -> 加载 wxml wxss 渲染层文件 -> 执行 .js 文件
-   组件支持
    -   视图容器
    ```html
    view  <!--类似div-->
    scroll-view + scroll-y属性 <!--可滚动的视图区域-->
    ```  
-   API支持
    -   事件监听API
        -   以 on 开头 监听事件触发。wx. == window.
    -   同步API
        -   以 Sync 结尾的
        -   结果可以直接获取，异常也会直接排除 
    -   异步API
        -   通过回调接收结果

### 发布流程
`开发版本`用于程序自测，添加的测试人员都可以访问，修改完美在发布到`正式版本`
开发者工具上传代码
开发版本(可以设置成体验版本)  -> 审核中版本 -> 线上版本

物料下载  - 设置 基本设置 可下载小程序二维码
运营数据  - 统计 或 数据助手查看(扫描右上角手机数据)

### 调试工具
-   AppData  查看页面的所有数据
### 第三方包
安装完成之后还需要 选择构建，构建npm 生成 miniprogram_npm 才能正常使用

### 快捷操作
+ 将页面新增到编译模式，不用将页面路径移到最前面，就能直接调试指定页面了 

## 小程序-云开发
+ 必须要appId
+ 开发者工具新建项目(建议都选择不使用云服务)
+ 进入左上角头像旁边的云开发按钮，随便输入一个合格的环境名称，提交(每个用户能申请两个，用掉后想继续用需要收费的)
+ 设置权限所有用户可读

### 云数据库
> 采用NoSQL类型数据库
### 云存储
> 微信小程序最大限制两M，如果有大的资源可以使用云存储解决      
> 点击资源查看详情，可看到资源的id与路径

### 云函数
> 云函数可以调用云数据库的数据，能做一些前端做不到的事情
> 客户端通过db查询有20条限制，最好通过云函数(基于nodejs)操作  
> 云函数可以图片用户权限获取数据 

操作:
+ 在根目录(pages同级)新建任意名称文件夹，如:cloudFunc
+ 配置文件 project.config.json 第一级添加 "cloudfunctionRoot":"cloudFunc", 
+ 如果成功 cloudFunc会变成白云图标
+ 右键新建nodejs云函数 
+ 然后客户端的数据库操作都能进云函数使用
+ 函数写好后，在文件夹中右键部署并上传(如果没有node_module，就选不上传node_module的)


#### 内容管理
> 小程序数据库管理系统
位置:云服务 -> 更多 -> 内容管理 -> 开通 -> 得到管理系统网址 
使用:打开网址 -> 创建项目 -> 进入找到内容模型(模型与数据库表对应) -> 添加模板与记录 -> 开发者工具数据库直接刷新


### 生物认证
> 生物认证是指通过**指纹**、**手型**、**脸型**、**声音**、**虹膜和视网腊扫描**等物理特征识别人的一种认证方式
> 微信目前仅支持指纹和人脸识别