---
title: 微信小程序
---
> 原生微信小程序(官方weui)

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)
## 环境
### 关键字
+ openId:openid相当重要，它是用户的唯一标识id
## 目录结构
### page 文件夹
> 小程序页面, 快捷创建方式: `app.json` -> `pages` -> `直接添加路径保存`，就能直接生成`整个页面文件`了

相关文件
+ index.js  (某页面js逻辑)
+ index.json  (某页面数据)
+ index.wxml  (某页面html)
+ index.wxss  (某页面css)

### util 文件夹
> 存放一些工具方法

### 文件
+ app.js  (全局js逻辑)
+ app.json  (全局配置)
+ app.wxss  (全局css)
+ project.config.json (一些配置项目配置信息)
+ sitemap.json (设置爬虫文件)

https://www.bilibili.com/video/BV19r4y1N7Br?p=3&spm_id_from=pageDriver

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
