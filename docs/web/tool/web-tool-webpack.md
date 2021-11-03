---
title: 自动化构建工具 webpack
---

## 基础

### 简介

-   一切都是模块
-   指定一个入口，关联`.hbs、.js、.jpg、sass、es6、...`等个种模块和依赖串在一起
-   编译成浏览器认识的目标文件`.js、.css、jpg、png`(static assets)
-   web(`浏览器`) pack(`打包`) 就是一个模块打包的工具，
-   `模块化`就是文件之间自成作用域，互不影响，只能通过`导入导出`方式，相互关联
-   `打包`就是可以处理所以模块的`依赖关系`，将所以的`导入导出`形成一个`关系网`,生成`浏览器识别`的程序
-   webpack 是一个的基于`nodejs平台`开发的`工程化工具`
    -   webpack`依赖nodejs`，`npm`帮助`node`管理各种包
-   与 gulp/grunt 的区别
    -   gulp/grunt `前端自动任务管理工具`，处理一个一个配置好的`任务(task)`
    -   适用范围:`简单依赖关系`、`不需要模块化`、项目只需要一些`合并压缩`等操作的项目
- 支持CommonJS、es6、AMD、CMD模块化规范都支持

[webpack4 官网](https://v4.webpack.docschina.org/)
[webpack4 官方插件](https://v4.webpack.docschina.org/plugins/)

### 开启

步骤:

-   安装 webpack 、 webpack-cli(因为项目依赖的版本可能不同，所以一般很少用全局的)
-   需要 html 入口: 安装 html-webpack-plugin
-   需要服务：webpack-dev-server
-   需要复制: copy-webpack-plugin


### 功能

- `loader`
    - `webpack`功能有限，很多东西都`不认识`，`loader`就相当于他的扩展
    - `样式类`
        - `style-loader[插入到页面],css-loader[认识加载样式文件],sass-loader....`
    - `图片类`
        - `url-loader`:显示图片，并设置多大的可以转base64
        - `必须安装file-loader`来处理大于指定大小不转base64的图片

- `vue`配置
    - 安装vue
        - 版本
            - `runtime-only`:代码中不能有任何template， 包括`el:#app`
            - `runtime-compiler`:compiler可以编译template,所以这个版本可以有template
            - `vue$:"vue/dist/vue.esm.js"`:alias中配置，指定使用compiler版本

- `Plugin 插件`
