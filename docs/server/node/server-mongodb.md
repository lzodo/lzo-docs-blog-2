---
title: mongodb
---
> 非关系型数据库-基于分布式文件存储的NoSQL

## 下载安装(M层)

[官网下载](https://www.mongodb.com/try/download)

-   MongoDB Community Server 社区版
-   MongoDB Enterprise Server 企业版

[MongoDb Tools](https://www.mongodb.com/try/download/database-tools)

-   数据库相关工具
    +   导入`mongoimport`
        *   -h:指明数据库宿主机的IP
        *   -u:指明数据库的用户名
        *   -p:指明数据库的密码
        *   -d:指明数据库的名字
        *   -c:指明collection的名字
        *   -f:指明要导出那些列
        *   -o:指明到要导出的文件名
        *   -q:指明导出数据的过滤条件
        *   `mongoexport -d pro-node-lagou -c menus -o D:\lzo-project\lzo-everyday\mongodb-export\menus.dat`
        *   `mongoexport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 -f 字段1，字段2 -q‘{条件导出}’ `--csv -o 文件名
    +   导出`mongoexport`
        *   -h:指明数据库宿主机的IP
        *   -u:指明数据库的用户名
        *   -p:指明数据库的密码
        *   -d:指明数据库的名字
        *   -c:指明collection的名字
        *   -f:指明要导入那些列
        *   `mongoimport -d pro-node-lagou -c menus menus.dat`
    +   备份`mongodump`
        *   导出至少精确到集合，备份是整个数据库
        *   `mongodump -d pro-node-lagou -o D:\lzo-project\lzo-everyday\mongodb-export`
            -   D:\MyData\projects\lzo-everyday\mongodb-export
        *   备份的数据默认存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个pro-node-lagou目录，
    +   恢复`mongorestore`
        *   `mongorestore D:\lzo-project\lzo-everyday\mongodb-export`
        
    +   `mongofiles`保存大文件
    +   `mongostat`是mongodb自带的状态检测工具
    +   `mongotop`用来跟踪MongoDB的实例
    

### 安装

1. 安装

-   选择 complete 完全安装非自定义,不要勾选 Install MongoDB Compass
-   安装完成之后可能要配置环境变量

2. 开启数据库

-   终端输入 mongod 执行(一般会提示缺少 C:/data/db 手动新建目录就行了)
-   或 mongod --dbpath d:/data/db 指定数据库路径
-   执行成功后后面有一闪一闪的光标,数据库开启成功(窗口不用关闭)

3. 连接数据库

-   开启新终端 输入 mongo
-   输入 show dbs 出现数据库说明连接成功了

4. linux arch系列
- 安装aur:mongodb、 mongodb-tools
- 创建并添加权限:chmod 777 /data/db
- 图形化管理工具
    - ['nosqlbooster'](https://nosqlbooster.com/downloads)
        - chmod a+x nosqlbooster4mongo*.AppImage
        - ./nosqlbooster4mongo*.AppImage
### 图形化工具
[robo 3t](https://robomongo.org/)

## 指令

```shell
mongodb  #数据库名
mongod  #启动数据库
mongo  #连接数据库
mongoose #node操作数据库的指令
```

### 数据库指令

```shell
show dbs;                  #查看全部不为空的数据库

show collections;          #显示当前数据库中的集合（类似关系数据库中的表）
    db.createCollection('user11');   #创建集合
    db.user11.insert|save([{a:1,b:2}])       #插入数据
    db.user11.update({a:1},{$set:{b:5}})       #修改数据
    db.user11.delete({a:1})  #删除数据
    db.user11.drop()       #删除名为user11的集合
    db.user11.find()       #查询user11集合的信息
    db.user11.find({age:{$gt:20}}) #查找age大于2的：$gte 大于等于、 $lt 小于 、$lte 小于等于
    db.user11.find({age:{$gt:20,$lt:30}}) #20到30之间
    db.user11.find({$or:[{age:1},{age:2}]}) #或查询
    db.user11.find({name:/^1/}) #正则查询

    #查询指定列
    db.user11.find({条件},{name:0,age:0}) #0表示不要，1表示要，只能全部0或全部1

    db.user11.find(xxx).sort({age:1}) #1升序、-1降序
    db.user11.find(xxx).limit(3) #取指定数目
    db.user11.find(xxx).limit(3).skep(n) #跳过n条再取指定数目 sort>skep>limit与书写顺序无关
    db.user11.find(xxx).count() #统计数目

    db.user11.findOne(xxx) #只取一条
    db.user11.distinct("name")       #查询名称不重复的记录

show users;                #查看当前数据库的用户信息
use <db name>;             #切换数据库(或创建数据库)
show collections           #查看集合列表
db.menus.find()            #查询当前所在数据库，menus集合里面的列表文档内容
db;或者db.getName();        #查看当前所在数据库

db.getMongo()               #查看db链接机器地址
db.dropDatabase()           #删除数据库
```

### mongoose

[官网](http://www.mongoosejs.net/docs/index.html)

```shell
 npm install mongoose
```

基本使用
```javascript
var mongoose = require("mongoose");
//链接数据库
//地址:mongodb://主机/数据库名
mongoose.connect("mongodb://localhost/test1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//数据库链接对象
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("链接成功");
});

//Mongoose 里，一切都始于Schema。
//创建一个和集合相关的schema对象(类似表头)
var Schema = mongoose.Schema;

var userSchema = new Schema({
    us: { type: String, required: true }, //标题:{类型:String,是否必须:true,默认:'123456'}
    ps: { type: String, required: true, default: "123456" },
    age: Number, //年龄:Number类型
});

//将schema对象转化为数据模型
var User = mongoose.model("user", userSchema);
var UserTest = mongoose.model("usertest", userSchema);
//该数据对象与集合相连('test1里的集合名',schema对象)
//数据库中的集合名会自动以复数形式表示

//操作数据库

//API文档 -> 模型(mongoose的增删改查) -> 插入方法 Model.insertMany()
User.insertMany({ us: "123", ps: "456", age: 12 })
    .then((data) => {
        console.log(data);
        console.log("插入成功");
    })
    .catch((err) => {
        console.log("插入失败：" + err);
    });

//查询
User.find({ age: 12 })
    .then((data) => {
        console.log(data);
        console.log("查询成功");
    })
    .catch((err) => {
        console.log("查询失败：" + err);
    });

//删除
User.remove({ age: 12 })
    .then((data) => {
        console.log(data);
        console.log("删除成功");
    })
    .catch((err) => {
        console.log("删除失败：" + err);
    });

// 修改
//Model.update('更新条件','更新内容',[options],[callback]);
User.update({ age: 20 }, { us: "new123" })
    .then((data) => {
        console.log(data);
        console.log("更新成功");
    })
    .catch((err) => {
        console.log("更新失败：" + err);
    });

```
