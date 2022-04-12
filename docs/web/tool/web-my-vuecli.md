---
title: 开发脚手架工具
---

-   自定义终端命令
    -   创建并进入项目通过`npm init -y`初始化项目
    -   打开`package.json`mani指向是的入口文件
    -   首行添加`#!/usr/bin/env node`,叫做:`shebang`,在当前电脑环境中找到node指令，更据node可执行文件执行当前文件后续代码
    -   `package.json`添加`bin:{cmdname:"index.js"}`
    -   终端执行`npm link`将`bin`与真正的环境变量做一个链接，就可以在终端输入`cmdname` 来执行`index.js` 这个文件
        -   `npm link`后会在安装node安装文件加下(全局安装npm包所在位置)自动创建`cmdname`可执行shell文件
-   配置参数 如:`cmdname --help`如何出来对应的信息
    -   安装第三方包:`commander` -> `tj/commander.js`
-   创建cli模板 `cmdname create demo`
    -   `program.command`:创建指令
    -   `clone 模板项目`
        -   `download-git-repo`:第三方npm库，可在项目中cloen GitHub项目
    -   执行 `npm install`
-   创建组件
    -   创建ejs模板
    -   定义一个指令 如`cmdname addcpn`
    -   出发 该指令的时候，编译模板，得到结果，写入指定位置文件中
-   其他库
    -   `open`:打开浏览器
    -   `inquirer`:选项

