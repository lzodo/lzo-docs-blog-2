---
title: 插件
---

## npm 插件

### puer

> 轻松开起本地服务器

```shell
npm install puer -g
# 直接使用
puer --port xxxx
```

### nodemon

> node 服务器改动时自动重启服务

```shell
npm install nodemon -g
# 直接使用
nodemon server.js
```

### apidoc

> 根据指定注释格式生成 api 文档

[官网](https://apidocjs.com/#install)

```shell
npm install apidoc -g

# 注释格式
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 * 
 * @apiParam {Number} id Users unique ID.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

# 直接使用 -i(生成文档的文件夹) -o(输出文件夹)
apidoc -i myapp/ -o apidoc/ -t mytemplate/

```

根目录下 apidoc.json 全局配置

```json
//apidoc.json
{
    "name": "example",
    "version": "0.1.0",
    "description": "apiDoc basic example",
    "title": "Custom apiDoc browser title",
    "url": "https://api.github.com/v1"
}
```

### bower

> 第三方插件下载工具,也是一个包管理器

```shell
npm install bower -g
# 直接使用
bower install xxxx
```

### json-server 生成 REST API

> 快速生成模拟可访问**REST** API 接口,post 请求时配置文件自动添加请求数据记录,并且每个接口都能使用 GET、POST、PUT(更新)、DELETE(删除)请求

REST API

-   同一个请求路径可以进行多个操作
-   请求方式可以可以用到 GET、PPST、PUT、DELETE
-   浏览器的运行动作 post、get、put、delete 与 CRUD 统一
    -   新增 (create，使用 POST )
    -   读取 (read，使用 GET )
    -   更新 (update，使用 PUT )
    -   删除 (destroy，使用 DELETE)

非 REST API

-   请求方式与 CRUD 无关
-   一个路径只对应一个操作
-   一般只用 GET/POST

[github 地址](https://github.com/typicode/json-server#getting-started)

```shell
npm install -g json-server
# 根目录创建 db.json 配置接口数据
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}

# 生成接口并监听
json-server --watch db.json
```

### vuex-persistedstate

> vuex 持久化

```shell
import createPersistedState from "vuex-persistedstate"

const store = new Vuex.Store({
    plugins: [createPersistedState()]
})
```

### vconsole

> [移动端的控制台](https://www.npmjs.com/package/vconsole)

```shell
npm install vconsole -D

import vConsole from 'vconsole'
Vue.prototype.$vConsole = new vConsole();
```

### spy-debugger 移动真机调试
已经废弃


1、安装[github 入口](https://github.com/wuchangming/spy-debugger)

集成weinre

```javascript
npm install spy-debugger -g
```

2、命令行输入 spy-debugger  
3、手机与电脑连接同一个局域网，根据提示 找到手机的 WiFi 长按 -> 修改网络 -> 显示高级 -> 代理 ->手动  
4、对应主机名与端口 保存  
5、在生成的网址中调试手机访问的页面

### weiner

```javascript
npm install weinre -g

启动 weinre --httpPort 8082 --boundHost 192.168.4.123

浏览器打开 http://192.168.4.123:8082

要调试的页面添加 <script src="http://192.168.4.123:8082/target/target-script-min.js#anonymous"></script>
```
其他工具 vConsole、Charles
### 内网穿透 端口映射工具

> 内网穿透,反向代理 大概意思是将您的本地主机公开到外网，公共端点和本地运行的 Web 服务器之间建立一个安全的通道，便于测试和共享

[localtunnel](https://www.npmjs.com/package/localtunnel)

#### 安装及使用

```shell
  npm install -g localtunnel
  lt --port <要映射的端口>
  lt --subdomain <个性前缀> --port <要映射的端口>
  # 前缀不能太简单,出现tunnel server offline: Request failed with status code 403, retry 1s

  # 本地开启服务 localhost:<被映射的端口>,访问生成的地址就能访问这个本地服务了
```

#### 其他类似工具推荐

花生壳、PubYun、NoIP、DynDNS、Ngrok、Tunnel、pagekite 等

### 乱七八糟小插件

-   [nprogress](https://www.npmjs.com/package/nprogress) 路由跳转上方出现进度条
-   [fastclick](https://www.npmjs.com/package/fastclick) 解决移动端 click 300ms 延迟问题

---

## web 常用插件

###

-   [日期时间(Day.js)](https://www.cnblogs.com/cjrfan/p/9154539.html)

## jQuery 插件

### fullpage.js

> 基于 jQuery 的全屏特效插件 [fullpage 官网](http://fullpage.81hu.com/) [bilibili 视频](https://www.bilibili.com/video/BV1Ks411V7Kg?p=49)

```javascript
bower install fullpage.js

// 1、引入jQuery、fullpage.css、fullpage.js
// 2、指定全屏结构标签
<div id="fullpage">
    <div class="section">Some section</div>
    <div class="section">Some section</div>
    <div class="section">Some section</div>
    <div class="section">Some section</div>
</div>

// 3、js操作配置
$(document).ready(function(){
    $('#fullpage').fullpage({
       //xxxx
       //在当前屏幕离开之前执行下面方法
       onLeave: function(index,nextIndex,dir){
          /*
            当前屏索引、下一屏幕索引、方向
            滚动全屏动画效果方案:
                给所有屏幕的动画元素加上自定义属性(mat)储存动画class
                触发改方法的时候去掉当前屏动画
                给nextIndex中有动画的添加动画
          */
          //清除动画
          $('[mat]').each(function(ind,ele){
              var mat = $(element).attr('mat');
              $(element).removeClass(mat)
          })
          //下屏添加动画,找到下一屏,找到屏中拥有amt属性的元素,遍历添加类
          $('#fullpage .section').eq(nextIndex - 1).find('[amt]').each(function(addi,addele){
              $(addele).addClass($(addele).attr('amt'))
          })
       }
    })
})
```
