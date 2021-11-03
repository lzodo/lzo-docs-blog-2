---
title: 自动化构建工具 gulp
---
> 基于文件流的任务管理系统,将一个一个单独的任务，编成一个任务队列，通过同步或异步的形式执行   
> 一个任务，输出一个目标，中间可以插入很多插件   
> gulp 是一个基于nodejs的任务关联工具

开启gulp
```shell
npm install -g gulp
```
在普通项目中使用[我的gulp demo](https://github.com/liaozhongxun/lzo-gulp)

```shell
npm init -y  //初始化项目的npm配置文件
npm install -D gulp //安装gulp到本地项目(仅开发使用 -D)
npm install -D gulp-autoprefixer  //安装gulp相关插件
npm install -D gulp-rename  //重名插件

```
创建配置文件gulpfile.js
```javascript
//gulpfile.js

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename')

gulp.task('t1',function(){  //t1任务名
    gulp.src('./css/**/*.css') //处理文件的位置
    .pipe(autoprefixer())
    .pipe(rename({
        suffix:".min",
        extname:".css" //文件扩展名
    }))
    .pipe(gulp.dest('./dist/'))  //最终文件输出位置
})


//命令喊执行任务
gulp t1
.......
```