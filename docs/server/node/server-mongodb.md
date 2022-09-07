---
title: mongodb
---
> 非关系型数据库-基于分布式文件存储的NoSQL

## 下载安装(M层)

[官网下载](https://www.mongodb.com/try/download)

-   MongoDB Community Server 社区版
-   MongoDB Enterprise Server 企业版

[MongoDb Tools](https://www.mongodb.com/try/download/database-tools)

### 安装

1. 安装

   -   选择 complete 完全安装非自定义,不要勾选 Install MongoDB Compass
   -   安装完成之后可能要配置环境变量
2. 开启数据库

   -   终端输入 mongod 执行(一般会提示缺少 C:/data/db 手动新建目录就行了)
   -   或 mongod --dbpath d:/data/db 指定数据库路径
       -   可设置配置文件 `mongod.conf`
       -   通过 mongod -f mongod.conf
   -   执行成功后后面有一闪一闪的光标,数据库开启成功(窗口不用关闭)
3. 连接数据库

   -   开启新终端 输入 mongo
   -   输入 show dbs 出现数据库说明连接成功了
4. linux arch系列
   - 安装aur:mongodb、 mongodb-tools
   - 创建并添加权限:chmod 777 /data/db
5. centos 安装
```shell
# 配置源 vim /etc/yum.repos.d/mongodb-org-5.0.repo 
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc

#  yum install -y mongodb-org
#  systemctl start mongod

mongodb 数据默认存储目录为 /var/lib/mongo ,可以通过 cat /etc/mongodb.conf 查看或设置

# 重启或关闭可能造成，数据损坏，导致启动错误, 可以查看 /tmp/mongodb-27017.sock  ,有就删除
# 或 rm -f //xxx//x/data/db/*.lock  ,修复  mongod --repair --dbpath=//xx/x/x/data/db

```
6.   源码安装

```shell
下载 解压
# 创建存储数据和日志的目录
mkdir -p /mongod/data /mongod/log

# 进入mongodb加油目录 启动服务
# --fork 后台启动
# --auth 开启认证模式
# --logappend 追加方式记录日志
mongod --port=27017 --dbpath=/mongod/data --logpath=/mongod/log/mongodb.log --bind_ip=0.0.0.0 --fork

# mongo控制台外关闭
mongod --port=27017 --dbpath=/mongod/data --shutdown
# 控制台中关闭
use admin
db.shutdownServer()
exit

# 指定配置文件/xx/xx/xx/mongod.conf
mongod -f /xx/xx/xx/mongod.conf 启动
```



### 连接数据库

#### 图形工具连接

[官方工具 compass](https://www.mongodb.com/try/download/compass)
[navicat](http://www.navicat.com.cn/what-is-navicat-for-mongodb)
[robo 3t](https://robomongo.org/)
[nosqlbooster](https://nosqlbooster.com/downloads)

#### 工具连接远程

>   不连接远程ssh 默认本地连接

<img src="D:\MyData\projects\lzo-docs-blog-2\static\img\mongodToolSSH.jpg" alt="ssh" style="zoom:50%;" /><img src="D:\MyData\projects\lzo-docs-blog-2\static\img\2022-09-04_231517.jpg" style="zoom:50%;" />

默认无密码登陆，如果设置了 --auth 就要选择密码连接

####  命令行连接
```shell
mongo mongodb://mongoroot:mongopwd@114.115.xxx.xxx
```

#### mongoose 连接
```javascript
mongoose.connect("mongodb://localhost/pro-node-lagou", {})
// 远程连接服务端，ip 设置0.0.0.0
mongoose.connect('mongodb://mongoroot:xxxxxx@xxx.xxx.xxx.xxx:27017/pro-node-lagou?authSource=admin', {})
```

```shell
```



### 概念

-   对比关系数据库
    -   数据库(database) -> 集合(collectiion) -> 文档(document) -> 字段(field)   -> 索引(index)  -> _id     ->  视图(view) -> 聚合操作
    -   数据库(databsse) -> 表(table) ->              行(row) ->                 列(column) -> 索引(index) ->  主键  ->  视图(view) -> 表链接
-   适用场景
    -   基于灵活的json文档模型，适合业务变化快，敏捷的快速开发
    -   读写速度快，更适合处理大数据

## 指令

```shell
mongodb  #数据库名
mongod  #启动数据库
mongo  #连接数据库
mongoose #node操作数据库的指令
```

### 数据库指令

```shell
# 数据库操作
show dbs; | show databases                 #查看全部不为空的数据库
db.getMongo()                              #查看db链接机器地址
db.dropDatabase()                          #删除数据库
use <db name>;             #切换数据库(或创建数据库)
db;或者db.getName();        #查看当前所在数据库

# 切换到数据库后，当前数据库集合操作
db.createCollection("user11") # 创建集合，新集合没数据可能不会显示
show collections | show tables;          #显示当前数据库中的集合（类似关系数据库中的表）
db.user11.drop()       #删除名为user11的集合

# 文档操作
db.user11.insert|save([{a:1,b:2}])       # 插入多个文档，不写中开括号就插入单个，save(废弃)
db.user11.insertMany([{a:1,b:2}])        # 也是批量插入
db.user11.remove({})                     # 删除所有
db.user11.remove({a:1})                  # 删除 a=1的文档
db.user11.update({a:1},{b:5})            # 替换原有文档成 {b:5} 只有_id 会保留
db.user11.update({a:1},{$set:{b:5}})     # 原有文档的基础上，修改或增加属性 (匹配到的1条)
db.user11.update({a:1},{$set:{b:5}},{multi:true})     # 原有文档的基础上，修改或增加属性 (所有匹配到的)
db.user11.update({a:0},{$inc:{b:NumberInt(1)}}) # 找到a=1的文档，让它的b属性自增1
db.user11.find()       # 查询当前所在数据库，user11 集合里面的列表文档内容
	db.user11.find({age:20}) # 查询年龄为20的文档
	db.user11.find({age:20,name:1}) # 查询年龄为20,并且name为1的文档
	db.user11.find({age:{$ne:20}}) # 查询年龄不为20的文档
	db.user11.find({age:{$gt:20}}) #查找age大于2的：$gte 大于等于、 $lt 小于 、$lte 小于等于
    db.user11.find({age:{$gt:20,$lt:30}}) #20到30之间
    db.user11.find({$or:[{age:1},{name:2}]}) #或查询
    db.user11.find({age:20,{$or:[{sex:1},{name:2}]}}) # 查找年龄20并且sex为1，或 年龄20并且name为2的文档
    db.user11.find({age:{$type:"string"}}) # 查询age类型为字符串的文档
    db.user11.find({name:/^1/}) #正则查询

    # 查询指定列  
    db.user11.find({条件},{name:0,age:0}) #0表示不要，1表示要，只能全部0（选择排除哪些字段）或全部1（选择哪些 ）

    db.user11.find(xxx).sort({age:1}) #1升序、-1降序
    db.user11.find(xxx).limit(3) #取指定数目
    db.user11.find(xxx).skep(n).limit(3) #跳过n条再取指定数目 sort>skep>limit与书写顺序无关
    db.user11.find(xxx).count() #统计数目

    db.user11.findOne(xxx) #只取一条
    db.user11.distinct("name")       #查询名称不重复的记录


# 索引
db.user11.createIndex({age:1,xxx:xxxx},{
	background:true, # 是否后台创建
	unique:true, # 设置的索引是否唯一
	name:'xx' # 所有名称
}) # 创建索引 ,多个就是复核索引

db.user11.dropIndex("索引名称") # 删除_id之外的索引
db.user11.dropIndexes() # 删除_id之外的所有索引
db.user11.getIndexes() # 获取查看索引 _id 是默认的 

```

### 权限

```shell
mongo 的权限认证与登录，默认是不需要的

3、创建管理员账户，以后就需要密码了 ,管理的的 admin数据库
	 db.createUser({user:"mongoadmin",pwd:"123456",roles:[{role:"userAdmin",db:"admin"}]})
	 
	xxxxx.....
	
# 查看角色列表
show roles
root  # 超级账号，超级权限，只在admin库中可用
dbOwner # 允许用户在指定数据库中执行任意操作
read  #允许用户读取指定数据库
readWrite # 允许用户读写指定数据库
...

# 创建管理员账户，哪个创建的用户，默认归属那个数据库，只能操作那个数据库
1、进入 use admin 管理员库设置管理员账号(默认没密码的)
2、db.createUser({user:"mongoroot",pwd:"123456",roles:["root"]})
3、db.createUser({user:"u1",pwd:"123456",roles:[{ role: "userAdminAnyDatabase", db: "admin" }]}) # 给u1指定库
3、db.auth('mongoroot','123456') # 验证账号是否可用，1 成功

# 查看用户信息 
# "db" : "user11" 表示用户只能操作 user11 数据库 
show users

# 普通数据库下创建用户，u2只能操作这一个数据库
db.createUser({user:"u2",pwd:"123456",roles:["dbOwner"]})

# 删除用户
db.dropUser("u2")

# 普通方式启动还是不需要账号密码就能登录，要以授权方式启动 --auth
mongod --port=27017 --dbpath=/mongod/data --logpath=/mongod/log/mongodb.log --bind_ip=0.0.0.0 --fork --auth

# 以账号登录,
mongo -umongoroot -p123456 --authenticationDatabase=admin
mongo -uu2 -p123456 --authenticationDatabase=user11

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



## 导入导出备份

-   数据库相关工具
    +   导入`mongoimport`
        *   `-h` : 指明数据库宿主机的IP
        *   `-u` : 指明数据库的用户名
        *   `-p` : 指明数据库的密码
        *   `-d` : 指明数据库的名字
        *   `-c` : 指明collection的名字
        *   `-f` : 指明要导出那些列
        *   `-o` : 指明到要导出的文件名
        *   `-q` : 指明导出数据的过滤条件
        *   
        *   `mongoexport -d pro-node-lagou -c menus -o D:\lzo-project\lzo-everyday\mongodb-export\menus.dat`
        *   `mongoexport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 -f 字段1，字段2 -q‘{条件导出}’ `--csv -o 文件名
    +   导出`mongoexport`
        *   `-h` : 指明数据库宿主机的IP
        *   `-u` : 指明数据库的用户名
        *   `-p` : 指明数据库的密码
        *   `-d` : 指明数据库的名字
        *   `-c` : 指明collection的名字
        *   `-f` : 指明要导入那些列
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