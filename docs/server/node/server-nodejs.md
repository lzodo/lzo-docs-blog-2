---
title: nodejs基础
---

## 概念

>   终端直接输入 node 进入可以运行 node 代码的换叫 REPL 环境

### nodejs
- javascript 运行时
- 不是语言、不是框架、是一个平台、一个基于v8引擎的js运行环境(宿主环境)
    -   哪里安装nodejs，JavaScript代码就能在哪里运行,nodejs之前一般是在浏览器中运行的
    -   所以NodeJs跨平台
    -   使js可以做很多浏览器网站之外的事情
    -   如:`Node的Electron开发的VsCode` 、`gulp`、`webpack`
-   除了nodejs外js其他宿主环境:浏览器
-   nodejs通过`V8 js引擎`，node API将任务放到libuv中(事件循环、文件系统、网络IO、线程池等)
-   nodejs架构
    -   js操作与Node提供的API(js编写)
    -   解析js的V8（大部分C++）
    -   libuv(C语言编写)
-   应用场景
    -   electron桌面程序开发
    -   前端开发库（npm、yarn...）
    -   使用nodejs作为web开发服务器
    -   通过nodejs完成前后的渲染同构
        -   在后端执行js代码，渲染出最终的html代码，让浏览器直接解析，优化项目
    -   通过node编写自动化脚本
-   终端输入node回车，进入nodejs的REPL(交互式测试编程环境)

### JS 引擎
> 作用:将js转汇编转二进制最终变为cpu可以认识的数据
> JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等

-   常见的JS引擎
    -   `SpiderMonkey`:第一款，也是作者`Brendan Eich`开发的
    -   `Chakra`:微软开发主要`IE`浏览器
    -   `JavaScriptCore`:浏览器引擎(WebKit)中的内置JS引擎，Apply公司开发(小程序的JsCore)
        -   WebKit = 渲染工作的(WebCore) 与 JS引擎(JavaScriptCore) 组成 
    -   `V8`:Google开发
        -   `在Chrome中，只有Html的渲染采用了WebKit的WebCore代码，而在JavaScript上，重新搭建了一个NB哄哄的V8引`
        -   `谷歌浏览器体验好的原因之一`6

## 基础操作

### 主要组成部分
!["node模型"](../../../static/img/nodejs-model.png)   


Node.js 被分为了四层，分别是 `应用层`、`V8引擎层`、`Node API`层 和 `LIBUV层`。

-   应用层：即 JavaScript 交互层，常见的就是 Node.js 的模块，比如 http，fs
-   V8引擎层：  即利用 V8 引擎来解析JavaScript 语法，进而和下层 API 交互，(c++)
-   NodeAPI层：  为上层模块提供系统调用，一般是由 C 语言来实现，和操作系统进行交互 。
-   LIBUV层： 是跨平台的底层封装，实现了 事件循环、文件操作等，是 Node.js 实现异步的核心 

-   Node.js 内部都是通过 线程池 来完成异步 I/O 操作
    -   Node.js 的单线程仅仅是指 JavaScript 运行在单线程中，而并非 Node.js 是单线程。

### 流程
1. 执行步骤:
    1. 用户编写`编写fs.readFile()`
    2. V8拿到用户代码进行翻译，解析 -> 完成之后就可以执行    
    3. 执行时经过`NODE.js BINDINGS`到`libuv`与操作系统沟通,读取文件内容    
    4. BINDINGS作用是使v8翻译处理的代码能与libuv（独立的库）的代码进行沟通
2. 操作文件细节
    1. js不能直接对一个文件进行操作
    2. 任何程序的文件操作都时需要`系统调用`(操作系统的文件系统)    
    3. Node通过libuv库来操作文件进行系统调用
3. 操作系统提供两种调用方式`阻塞调用`和`非阻塞调用`
    1. 阻塞和非阻塞是针对系统调用，是系统(被调用方)提供给外界用户的调用方式
    2. 同步和异步是针对用户端来说的 (如同步执行代码会被阻塞,系统不会分配新线程来处理它) ，
    3. 客户端完全可以主线程通过异步陆续执行，当某个地方执行到阻塞调用时，新开一个进程让他等，主线程继续执行
    4. `阻塞`    
    5. `非阻塞`
        1. 后续代码得不到结果，需要不断`轮训操作`，或类似方式处理
        2. `轮训操作`libuv的线程池(Thread Pool) 进行处理
        3. 当得到结果时就可以将对应的回调放到事件循环(某一个队中)
    
4. node的事件循环
    -  比浏览器多:文件IO操作、数据库、子进程、网络IO、定时器、完成对应操作都回家返回结果和回调放到任务队列中
        -   事件循环会不断的从任务队列取出对应的事件（回调函数）来执行
        -   事件循环具体来说，是主线程过了一遍，异步操作添加到自己的队列位置后，开始执行各个队列的过程
    -   node每一次事件循环(Tick)都有很多阶段
        -   定时器（timers）
        -   待定回调(Pending Callback)
        -   idle,prepare:仅系统内部使用
        -   轮询(Poll):检索新的I/O事件，执行I/O事件的回调
            -  每次Tick中这个阶段世间会比较长，系统希望io回调尽可能早相应，用户尽早拿到数据来用
            -   甚至会阻塞
        -   检测：setImmediate()回调在这里执行
            -   立即执行，是说不会保存到其他地方，直接放到check queue中
        -   关闭的回调函数：如 socket.on("close",()=>{})
        -   node事件循环的队列
            -   微任务队列
                -   **next tick queue ：**process.nextTick  
                -   **other queue ：**Promise.then回调、queueMicrotask
            -   宏任务队列
                -   **timer queue ：**setTimeout、setInterval
                    -   如果时间不是0，只会被系统保存，不会直接放到队列中，要等时间到了，才会加入队列，等待下一次循环才开始执行
                    -   如果时间是0，正常情况会在本次循环宏任务最先执行，有时特殊情况不会
                        -   出现这种情况的原因主要和setTimeout的实现代码有关，当我们不传时间参数或者设置为0的时候，nodejs会取值为1，即1ms（在浏览器端可能取值会更大一下，不同浏览器也各不相同），所以在电脑cpu性能够强，能够在1ms内执行到timers phase的情况下，由于时间延迟不满足回调不会被执行，于是只能等到第二轮再执行，这样setInterval就会先执行。
                -   **poll quere ：**IO事件
                -   **check quere ：**setImmediate
                    -   setImmediate只有IE10+和Node上兼容比较好
                -   **close queue ：**close 事件

### 特性能
> Nodejs可以解析js代码，没有浏览器安全级别限制（安全沙箱、同源策略），并提供了很多系统级别API


-   文件读写（File System）
-   进程管理（Process）
-   网路通讯等

### 三大特点:

-   事件驱动
-   非阻塞 I(input)/O(output) 输入输出流
-   基于 chrome V8 runtime 轻量高效

### 运行环境
+ 浏览器
  - 基本语法 
  - DOM
  - BOM
  - Ajax
  - 系统文件数据库(处于安全性考虑 不能实现)
+ 服务器
  - 基本语法
  - 操作数据库
  - 操作本地文件
  - 进程管理
  - 网络通讯

### 模块化
+ 核心模块(node 软件提供的)
+ 第三方模块(用npm安装)
  + nodemailer
  
+ 自定义模块(一个js文件就是一个模块)

#### 模块操作
> node使用 CommonJS 规范，浏览器是不支持的

```javascript
//由于模块作用域,导入后模块间不会互相污染,必须通过导出才可以在外部调用
const os = require("os"); //导入模块

// 默认导出
module.exports = function () {
    console.log(os.freemem());
};
//导入
const req = require("./node");
req();
-----------------------------------------------
// 多个导出1
module.exports.export1 = function () {
    console.log("export1");
};
module.exports.export2 = function () {
    console.log("export2");
};
//多个导出2
module.exports = {
    export1,
    export2
}
//导入
const { export1, export2 } = require("./node");
export1();

--------------------------------------------------
//exports 是 module.exports 的引用
exports.export1 = export1
exports.export2 = export2

exports = {xxx,xxx} //错误引用改变了


```
### 爬虫
1. 获取目标网站 (http.get)
2. 分析网站内容 (cheerio 通过jq选择器获取想要的内容 或直接用正则匹配)
3. 获取有效信息 下载或其他操作

### express
[官网](https://www.expressjs.com.cn/)
#### api
+ ip
+ 端口号
+ pathname
+ method
+ 接收用户的参数

#### template(V层)
+ ejs
+ pug
+ jade
+ [art-template](http://www.sunxiaoning.com/language/474.html)
+ 将vue当做模板放到后端执行就是vue SSR

前后端分离:管理代码方便
服务端直接渲染返页面:速度效率快，不方便管理
#### 页面渲染 render
+ SSR (Server Side render 服务端渲染,返回整个页面)
+ CSR (Client Side render 客户端渲染,返回数据如JSON)



### 什么是服务器
+ 服务器
  + 服务器的本质就是一台电脑
  + 服务器软件(如:PHP的apach、Java的tomcat、微软的iis、ngnix、node等)
  + 得到服务器IP和端口号
+ 局域网：服务器通过网线或无线相连接,每个电脑都会有一个IP
+ 外网
+ IP:找到服务器主机的位置
+ 端口号:找到主机中某个程序的位置(0-65535)
  + 0-1023： BSD保留端口，也叫系统端口(0不使用)
  + 1024-5000： BSD临时端口,留给应用程序使用
  + 5001-65535：BSD服务器(非特权)端口，用来给用户自定义端
  + http服务 80,用户访问就不要输入端口号了

### 中间件middlewear
+ 内置中间件(静态资源目录 static)
+ 自定义中间件(全局 局部)
+ 第三方中间件 (如 body-parser)

注意next()
### 静态资源目录 static
> 指定一个目录,目录可以被访问 类似Apache 的www

### 图片上传
> 原理:将图片、音乐等要上传的东西转换文数据流,通过ajax或form表单传到服务器，服务器接收这些数据后再写入文件系统之中

1. 安装multer模块
```shell
npm install multer
```
2. 使用
```javascript
var multer = require('multer');
```
3. 设置路径与文件名
```javascript
var storage = multer.diskStorage({

})
```
### api接口
- url
- 方法
- 参数
- 结果
### node 跨域 cors中间件处理

### 身份验证
http请求 无状态 服务器、客户端相互不认识
-  无状态，http的每次请求对服务器来说都是单独的请求，和之前请求没有任何关系
 

基本思路:
1. 某个用户登录成功后,将用户相关信息加密,生成一个字符串给前端（通过cookie自动传）
2. 这个用户调用其他接口时，将加密字符串（登录凭证）传给服务器，后端通过这些字符判断用户的身份（通过cookie自动传）
3. 再根据这个用户的权限进行验证，是否可以操作

#### 方案一、session + cookie
相关插件:
-  cookie-parser 解析cookie
-  express-session 
或
-  cookie-session

使用步骤:
1. 用户输入用户名、密码进行登录
2. 成功后，后端会存一个session，保存用户信息
3. session值当做cookie内容被种到客户端	
4. cookie会在请求下一个资源时携带
5. 后端将cookie内容与session值进行对比，相等通过，不相等不通过
6. 缺点:服务器需要存每个用户的session

#### 方案二、[jwt](http://jwt.io) （json web token）
使用步骤:
- 用户登录 服务器产生一个token(加密字符串)发送给前端
- 前端将token进行保存  
- 前端发起数据请求通过 headers 携带 token
- 服务器验证token是否合法,如果合法继续操作否则终止操作  
- token应用场景:无状态请求、保存用户登录状态、第三方登录...  

#### 密码学
两种加密方式:
非对称加密（又叫公钥加密）:RS256、RSA算法 ...
    通过私钥产生token、通过公钥解密token
    指加密和解密使用不同密钥的加密算法,也称为公私钥加密。
    加密过程: 原文 + 公钥 = 密文
    解密过程: 密文 + 私钥 = 原文

    相对安全复杂

对称加密: AES
    加密解密预定一个密钥，加密和解密使用相同同密钥的加密算法
    加密过程: 原文 + 密钥 = 密文
    解密过程: 密文 - 密钥 = 原文

    相对简单快速

客户端加密的意义
    1、如果被抓包，抓走的是明文还是密文，对方都可以拿来登陆，仅有的作用是，如果密码够复杂，对方无法解密，对面就不知道你的真时密码，就不肯拿真实密码去其他平台尝试登陆你的账户

    2、类似(姓名、银行卡号、家庭住址。。。) 这种也可以客户端
    3、如果可以做到到直接抓包无法登陆,或者不容易登陆 呢


​    

安全登陆姿势
    1、将  密码+时间戳  加密后传输，服务端解密，并按照时间戳3s有效的方式允许登陆.这样也能加强安全性

客户端加服务器解密
    客户端通过 `crypto-js` 将字符串通过指定方式加密，服务器拿到加密串后，可以以同样方式解密，或再次加密。。。

[官网]([ https://www.openssl.org/source/](https://www.openssl.org/source/))    [下载地址](http://slproweb.com/products/Win32OpenSSL.html)

```shell
# openssl方式
# 生成私钥 
openssl 回车
OpenSSL> genrsa -out rsa_private_key.pem 2048  #(-out 文件名 字符数) 

# 根据私钥生成公钥
OpenSSL> rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem #(-in 私钥名 -pubout -out 公钥名)
```

对称加密：指加密和解密使用`相同密钥`的加密算法。对称加密算法用来对敏感数据等信息进行加密,常用的算法包括DES、3DES、AES、DESX、Blowfish、RC4、...


插件  
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```javascript
const jwt = require("jsonwebtoken");
const scrict = "jfjdsajfdsajfdsa"; //私钥 （对称加密解密都是它）

let playload = {
    //传递的数据
    us: 123,
    ps: 456,
};

function creatToken(playload) {
    //产生token
    playload.ctime = Date.now();
    playload.exp = 1000 * 60 * 30; //30分钟过期
    // 签名 默认HS256加密方式
    return jwt.sign(playload, scrict);
}

function checkToken(token) {
    return new Promise((resovle, reject) => {
        //验证
        jwt.verify(token, scrict, (err, data) => {
            if (err) {
                reject("token 验证失败");
            }
            //ctime + exp < Data().now 说明超时了 
            resolve(data);
        });
    });
}

module.exports = {
    creatToken,
    checkToken,
};


// token 解码
var decoded = jwt.decode(token, {complete: true});

```

#### 密码加密 bcrypt
> 每次加密得到的hash字符串是不一样的,验证时可以通过输入的密码与hash进行匹配

```shell
npm install bcrypt -S
```
### Express RMVP 模式
> MVC -> MVP|RMVP -> MVVM ,Web 设计模式

[参考](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
#### MVC
+ M:Model,模型层，数据相关的操作
+ V:View,视图层，用户界面渲染逻辑(html、css...)
+ C:控制器，js
+ MVC之间三方都能相互通讯
+ View层是界面，Controller层是业务逻辑，Model层是数据库访问(WEB接口调用)
#### MVP
+ M:Model,模型层，数据相关的操作
+ V:View,视图层，用户界面渲染逻辑(html、css...)
+ P:Presenter,响应视图指令，同时进行相关业务处理，必要时候获调用 Model 获取底层数据，返回指令结果到视图，驱动视图渲染
+ MVP中M和V无法通讯
  + Model 不再负责业务逻辑和视图变化，只负责底层数据处理
  + View 层只负责发起指令和根据数据渲染 UI，不再有主动监听数据变化等行为，所以也被称之为被动视图
+ R:请求,RMVP是通过请求与控制器通讯(如 app.use("/R",xxx)) 
#### MVVM
+ M:Model,模型层，数据相关的操作
+ V:View,视图层，用户界面渲染逻辑(html、css...)
+ VM:ViewModel,
+ 与MVP唯一的区别是，它采用双向绑定(data-binding),P虽然能与V相互通信,但是VM与V一端变化另一端直接变化


### node服务调用谷歌控制台
node-dev 功能与nodemon类似
+ 通过 nodemon --inspect --inspect-brk? server.js 开启服务 
+ 配合debugger使用
+ 谷歌打开地址: chrome://inspect/#devices 
+ 点击 Open dedicated DevTools for Node -> Connection 添加域名端口号
+ 就能在 Open dedicated DevTools for Node -> console 中天使node项目了

### 开发中常用插件
+ log4js //日志操作
+ pm2 // 自动化部署node项目

[参考资料](https://www.bilibili.com/video/BV1Ci4y1L7gk?p=7)


```
去年工作总结与2021年工作计划
    在去年一年时间里,逐渐完善了iot管理系统云版本，内网版，三套监控大屏系统，内网版的3D设备系统。移动端微信公众号也逐渐成熟，辉和、通佰、和猎狐三套样式都在维护，企业微信也有一套系统可以查看信息，也能方便维护人员在外面能做一些少量的管理，同时在休息时间学习了uni-app，nodejs，TypeScript，微信小程序以及云开发等新技术
    如果有时间并且公司需要的话在2021年的计划中可以通过uni-app技术为公司开发移动端app、微信小程序、百度小程序、支付宝小程序等各个平台系统，可以通过云服务配合nodejs开发一些简单的服务器功能,不需要额外购买分配服务器，此外新的一年里如果时间计划的话，还会将现有系统进行适当优化，有适合的ui的话也可以计划将界面进行改版

```




http-server
