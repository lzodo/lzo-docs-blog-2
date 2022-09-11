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


## 安全
###  用户管理权限

```shell
mongo 的权限认证与登录，默认是不需要的，通过 --auth 开启的mongo服务，才需要
	
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
4、db.auth('mongoroot','123456') # 验证账号是否可用，1 成功

# 查看用户信息 
# "db" : "testuser" 表示用户只能操作 testuser 数据库 
show users

# 普通数据库下创建用户，u2只能操作这一个数据库
db.createUser({user:"u2",pwd:"123456",roles:["dbOwner"]})

# 删除用户
db.dropUser("u2")

# 普通方式启动还是不需要账号密码就能登录，要以授权方式启动 --auth
mongod --port=27017 --dbpath=/mongod/data --logpath=/mongod/log/mongodb.log --bind_ip=0.0.0.0 --fork --auth
# 配置文件添加 auth
security:                                                                                                   	authorization: enabled

# 以账号登录,
mongo -umongoroot -p123456 --authenticationDatabase=admin
mongo -uu2 -p123456 --authenticationDatabase=testuser

# 普通连接，授权放方式登录
mongo
# use 到某个数据库test
db.auth('testRoleRser','123456')

```

###  副本集(replication)

1.   一个活跃节点( **Primary** ) + N 个备份节点( **Secondary** )
     1.   数据同步备份
          1.   备份节点`定期，轮询`获取`主节点`的`数据库操作`，自己数据库副本`执行这些操作`，来`实现数据同步`
     2.   若活跃接点奔溃，数据库会将其中一个北方接点审计为活跃接点
     3.   备份节点不能主动去操作，想看的话先执行`rs.slaveOk()`

```shell
# 启动三个服务器，并设置所属的副本集 为 rs0
mongod --port 27017 --dbpath "D:/mongod/data1" --replSet rs0
mongod --port 27018 --dbpath "D:/mongod/data2" --replSet rs0
mongod --port 27019 --dbpath "D:/mongod/data3" --replSet rs0

# 登录任意一个端口的 mongo，设置，初始化副本集
# 设置配置对象
replSet_config = {
	_id:"rs0",
	members:[
		{
			_id:0,
			host:"127.0.0.1:27017",
		},
		{
			_id:1,
			host:"127.0.0.1:27018",
		},
		{
			_id:2,
			host:"127.0.0.1:27019",
		},
	]
}

replSet_config = {
	_id:"rs1",
	members:[
		{
			_id:1,
			host:"114.115.212.129:27018",
		}
	]
}
# 初始化
rs.initiate(replSet_config)

# 查看副本集状态
# health:1 健康的， stateStr:"PRIMARY" 主节点
rs.status()

# 验证数据同步备份
rs.slaveOk() # 备份节点中执行后才能正常访问

# 登录指定端口
mongo 127.0.0.1:27019 

```

#### 多服务器副本集

```shell
# 服务器1 
mkdir -p ./mongodb/repl/rs_1/log
mkdir -p ./mongodb/repl/rs_1/data/db

vim ./mongodb/repl/rs_1/mongod.conf # 填写 /etc/mongod.conf 内容 更改数据和日志地址 放开 replSetName: 副本集名称

# 服务器2 
。。。

# 进入希望作为获得节点的服务器 mongo localhost:27018 启动数据库 

# 启动
mongod -f /root/mongodb/repl/rs_1/mongod.conf

# 初始化 (可以直接传入配置)
rs.initiate() 

# 查看状态，rs.conf() 本质是 local 库下 db.system.replset.find()
config = rs.conf()
# host不是ip需要修改
config.members[0].host = "192.168.16.134:27018"
rs.reconfig(config) # 重载配置

# 添加副本节点 
rs.add("114.115.212.129:27018") # 云端端安全组开放端口，本地主要防火墙开放端口

# https://ke.qq.com/course/2930572/9864689478317964#term_id=103043162 add无法添加 卡住

...
# 程序连接方式 mongodb://username:password@192.168.56.101:27017,192.168.56.102:27017,192.168.56.103:27017/db_name?replicaSet=rschunqiu
```




## MongoDB 使用
### 概念

-   NoSQL **( Not Only SQL )** 非关系型数据库，是 不`同于传统关系型数据库` 的统称
    -   关系，表和表之间通过**主键**和**外键**是有联系的
    -   一个主表，相关的东西，因为**类型属性不同**，需要存储到**其他表**中，用的时候，通过**主外键取来**使用
    -   非关系型就不需要，相关的东西直接存放到文档，子属性中就行，`容易设计,且速度快`

-   对比关系数据库
    -   数据库(database) -> 集合(collectiion) -> 文档(document) -> 字段(field)   -> 索引(index)  -> _id     ->  视图(view) -> 聚合操作
    -   数据库(databsse) -> 表(table) ->              行(row) ->                 列(column) -> 索引(index) ->  主键  ->  视图(view) -> 表链接
-   适用场景
    -   基于灵活的json文档模型，适合业务变化快，敏捷的快速开发
    -   读写速度快，更适合处理大 数据
-   NoSQL 的优点/缺点
    -   分布式计算 : 当数据多了，快存不下了 ，添加扩展一个节点就可以继续存放了 
    -   ...

-   默认数据库
    -   **admin** : 管理员权限数据库
    -   **local** ：这个数据库永远不会被复制，可以用来储存本地服务器的任意集合
    -   **config**：保存分片相关信息

-   

###  操作指令

```shell
mongodb  #数据库名
mongod  #启动数据库
mongo  #连接数据库
mongoose #node操作数据库的指令
```

### 数据库增删改查

```shell
# 数据库操作
show dbs; | show databases                 #查看全部不为空的数据库
db.getMongo()                              #查看db链接机器地址
db.dropDatabase()                          #删除数据库
use <db name>;             #切换数据库(或创建数据库)
db;或者db.getName();        #查看当前所在数据库

# 切换到数据库后，当前数据库集合操作
db.createCollection("testuser") # 创建集合，新集合没数据可能不会显示
show collections | show tables;          #显示当前数据库中的集合（类似关系数据库中的表）
db.testuser.drop()       #删除名为testuser的集合

直接使用js语句操作
for(var i=0;i<10;i++){db.testusers.insert({name:`Name${i}`,age:10+i})}

# 文档操作
db.testuser.insert|save([{a:1,b:2}])       # 插入多个文档，不写中开括号就插入单个，save(废弃)
	-	直接往不存在的集合插入文档，默认会自动创建这个集合
db.testuser.insertMany([{a:1,b:2}])        # 也是批量插入
db.testuser.remove({})                     # 删除所有
db.testuser.remove({a:1})                  # 删除 a=1的文档

db.testuser.update({a:1},{b:5})            # 替换原有文档成 {b:5} 只有_id 会保留
    db.testuser.update({a:1},{$set:{b:5}})     # 原有文档的基础上，修改或增加属性 (匹配到的1条)
    db.testuser.update({a:1},{$set:{b:5}},{multi:true})     # 原有文档的基础上，修改或增加属性 (所有匹配到的)
        -	参数 query,更新对象，不存在记录是否插入0|1，是否更新所有匹配（0|1 简写）
    db.testuser.update({a:0},{$inc:{b:NumberInt(1)}}) # 找到a=1的文档，让它的b属性自增1
    db.testuser.update({a:0},{$unset:{age:1}}) # 删除指定的 key,值随意
    db.testuser.update({a:0},{$push:{list:"ele"}}) # 所有匹配记录，list (必须不存在的或是数组类型)字段push一个元素
    db.testuser.updateMany({name:"Name9"},{$push:{"list":{$each:["up3","up4"]}}}) # 添加多个 $pushAll 不能用
    db.testuser.update({a:0},{$addToSet:{list:"no repeat ele"}) # 如果值存在，不添加，不存在才添加
    db.testuser.update({a:0},{$pop:{list:1}},0,1) #1 从后面删除，-1 从前面删除 
    db.testuser.update({a:0},{$pull:{list:"ele"}},0,1) # 通过值删除 
    db.testuser.update({a:0},{$pullAll:{list:["ele1","ele2"]}},0,1) # 删除多个 
    # $pop 删除
    
db.testuser.find()       # 查询当前所在数据库，testuser 集合里面的列表文档内容
	db.testuser.find({age:20}) # 查询年龄为20的文档
	db.testuser.find({age:20,name:1}) # 查询年龄为20,并且name为1的文档
	db.testuser.find({age:{$ne:20}}) # 查询年龄不为20的文档
	db.testuser.find({age:{$gt:20}}) #查找age大于2的：$gte 大于等于、 $lt 小于 、$lte 小于等于
    db.testuser.find({age:{$gt:20,$lt:30}}) #20到30之间
    db.testuser.find({$or:[{age:1},{name:2}]}) #或查询
    db.testuser.find({age:20,{$or:[{sex:1},{name:2}]}}) # 查找年龄20并且sex为1，或 年龄20并且name为2的文档
    db.testuser.find({age:{$type:"string"}}) # 查询age类型为字符串的文档
    db.testuser.find({name:{$all:["Name0"]}}) # 找出全部 name 为 Name0 的文档
    db.testuser.find({list:{$all:["test1","test2"]}}) # 找出 list 中同时存在 test1 和 test2 的所有文档
    db.testuser.find({list:{$in:["test1","test2"]}}) # 找出 list 中存在 test1 或 test2 的所有文档
    db.testuser.find({list:{$nin:["test1","test2"]}}) # 找出 list 中不存在 test1 和 test2 的所有文档
    db.testuser.find({name:/^1/}) #正则查询
     # 其他查询关键词 $lte 小于等于，$gte 大于等于 
     

    # 对找到的内容进行二次操作
    db.testuser.find({条件},{name:0,age:0}) #0表示不要，1表示要，只能全部0（选择排除哪些字段）或全部1（选择哪些 ）

    db.testuser.find(xxx).sort({age:1}) #1升序、-1降序
    db.testuser.find(xxx).limit(3) #取指定数目
    db.testuser.find(xxx).skep(n).limit(3) #跳过n条再取指定数目 sort>skep>limit与书写顺序无关
    db.testuser.find(xxx).count() #统计数目

    db.testuser.findOne(xxx) #只取一条
    db.testuser.distinct("name")       #查询名称不重复的记录

 # 方法
 .find().pretty()  # 容易阅读的格式返回 
 .find().explain() # 查询分析
 
 var sfind = db.testusers.find();
 sfind.next() # 查找下一个文档 .hasNext() 查看是否存在下一个文档

```

### 索引

```shell
# 索引操作 提高查询效率
# 创建
db.testuser.createIndex({key:1}) # 单字段创建，key 创建索引的字段，1 按升序建，-1 按降序建
db.testuser.createIndex({key:1,name:1}) # 创建复合索引（索引一般给查询语句关联的字段建立）
db.testuser.createIndex({age:1,xxx:xxxx},{
	background:true, # 是否后台创建
	unique:true, # 是否设置唯一索引，索引字段不可重复，有重复值的字段也不能是唯一索引
	name:'xx' # 所有名称
}) # 创建索引 ,多个就是复核索引

# 查询
db.testuser.getIndexes() # 获取查看索引 _id 是默认的 

# 删除
db.testuser.dropIndex({age:1}) # 删除_id之外的索引
db.testuser.dropIndexes() # 删除_id之外的所有索引

# 使用
db.xxx.find(xx).explain()

"inputStage" : {
    "stage" : "IXSCAN", # 值为 IXSCAN 表示基于索引扫描，如果 COLLSCAN 全局扫描
    "keyPattern" : { # 使用了这些索引
        "age" : 1
    },
    "indexName" : "age_1", # 索引名称  
    "isUnique" : true, # 是否是唯一索引
}
```

### 分组(group)

>   只能对本地单台机器数据处理

```shell
# 分组统计 
# 统计各组身高不高于170的人数
db.testuser.group({
	key:{sex:1},  # 分组字段，指定根据什么来分组 -- 如果通过性别 可分为两组 
	cond:{height:{$lt:170},	# 查询条件  --   通过条件筛选，只对符合条件的进行操作
	initial:{counter=0},	# 初始化 -- 这边这样每组调用 reduce前 都会把counter从0开始
	# 聚合函数， 每组都会调用 reduce,参数一 是该组的每一个文档 ，result 全局属性
	reduce:function(item,result){result.counter +=1 }, 
	finalize:function(result){} # 每统计一组后的回调函数，比如平均值就需要 reduce 相加完，来这里操作
})

# 通过分支最终的到的结果中留下 [{sex:m, counter:10},{sex:g, counter:20}]
# group 不支持分布式运算
```

### 聚合(aggragate)

>   主要对集合中的数据进行各种统计，并返回统计后的数据结果

1.   常用管道操作
     1.   $group : 将集合的统计结果进行分组
     2.   $match : 用于过滤数据，找出符合条件的文档 ( 类似 where 子句)
     3.   $project : 修改输入文档的结构，增加删除字段等
     4.   $limit : 限制管道返回的文档数量
     5.   $skip : 跳过指定属性的文档
     6.   $sort : 将文档排序后输出
     7.   $unwind : 将文档中某一个数组字段，拆分成多条，每条包含数组的一个值
2.   常用管道表达式
     1.   平均数($avg)
     2.   求和($sum)
     3.   第一个($first)
     4.   最后一个($last)
     5.   最大/小($max/$min)
     6.   得到的数据放到数组中($push)

```shell
# 数据通过多个管道进行处理
# db.testuser.aggragate([{操作1},{操作2:{xxx}}])

# 通过 sex 字段分组，得到每组的平均 height，保存到 avgerxxx 中
db.testuser.aggragate([{$group:{_id:"$sex",avgerxxx:{$avg:"$height"}}}])
# 通过 sex 字段分组，得到每组的最矮的人的高
db.testuser.aggragate([{$group:{_id:"$sex",minval:{$min:"$height"}}}])
# 把各组没人身高放到储存起来
db.study.aggregate([{$group:{_id:"$sex",heiarr:{$push:"$height"}}}])

# 多管道
# 身高大于180，男女生的数量
db.study.aggregate([
	{$match:{height:{$gt:180}}},
	{$group:{_id:"$sex",sums:{$sum:1}}}
])

# 身高大于180，男女生的数量，只输出属性
 db.study.aggregate([
 	{$match:{height:{$gt:170}}},
 	{$group:{_id:"$sex",sums:{$sum:1}}},
 	{$project:{_id:0,sums:1}}
 ])
 
 # 身高大于180，男女生的数量,排序输出 -1 降序
  db.study.aggregate([
 	{$match:{height:{$gt:170}}},
 	{$group:{_id:"$sex",sums:{$sum:1}}},
 	{$sort:{sums:-1}} 
 ])
 
 # 找出女生，降序后，第2-3个，的名字与高度
 db.study.aggregate([
 	{$match:{sex:"g"}},
 	{$sort:{height:-1}},
 	{$skip:1},
 	{$limit:2},
 	{$project:{_id:0,name:1,height:1}}
 ])
 
 # 将文档数组类型字段 list，将文档拆分多个文档，每个文档的list 是原来 list数组的一个值
 db.study.aggregate([{$unwind:"$list"}])
```

### MapReduce 

>   大数据计算模型，支持分布式，支持大量服务器同时工作 

```shell
# 通过 map (第一个函数)，处理每一个文档，map函数中最后通过调用 emit(key,value) 返回键值对
# 系统会将emit的数据整理成 <k1,[v1,v2,v5]>  <k2,[v3,v4]> 这样的格式 
# 通过 reduce (第二个函数)，<k1,[v1,v2,v5]> 对每一个相同键进行处理  => 参数1 = k1,参数2 = [v1,v2,v5]
# 参数三，一个对象，把reduce输出的值进行各种处理

# 统计 study 集合中，相同年龄的有谁，输出到当前数据库的 res 集合中
# res集合中 _id 就是 age的值，value就是age值，对应的学生名字
var map = function(){
	# 先把文档数据经过各种处理
	emit(this.age,this.name); # 可以调用多次
}
var reduce = function(age,values){ # k1,[v1,v2,v5]
	 return values
}
db.study.mapReduce(map,reduce,{out:"res"})

# optin    
	out 输出的集合名称
	query 塞选完再执行map
	sort 排序完再执行map
	limit 限制个数执行map
	
db.study.mapReduce(map,reduce,{
	out:"res",
	sort:{age:-1},
	query:{age:20}, 
	limit:2
})

```

### 分片，分布式集群

1.   副本集类似备份，每个备份节点内容是一样的，不担心某个数据库挂了

2.   分布式集群，每个服务器只存能存下数据的一部分，满了，在开一个服务器，继续储存
3.   通过 `mongos` 转发到每一个分片 ，传达用户请求

```shell
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

### 备份（ mongodump ）

>   .bson 方式输出，无法查看

```shell
# mongodump -h dbhost -d dbname -c cname -o dbdirectory
# dbhost 需要备份的主机
# dbname 需要备份的数据库
# cname 需要备份的集合 (备份整个数据库就不需要 -c 了)
# dbdirectory 输出存放位置
mongodump -h 127.0.0.1:27017 -d test -c table -o /root/mongosave/
mongodump -h 127.0.0.1 --port 27017 -d test -c table -o /root/mongosave/

# --auth 开启的 mongo
mongodump -h 127.0.0.1:27017 -u admin -p 123456 --authenticationDatabase admin -d test ...

# 备份成功后生成两文件 .json 试一下概要信息，.bson(json 的二进制格式) 保存真正的数据

```

### 恢复 ( mongorestore )

```shell
# mongorestore -h dbhost ----nsInclude="数据库名.集合名" --dir=dbdirectory
# dbhost 需要备份的主机
# dbdirectory 需要恢复的数据库、或集合的位置
# --drop 删除集合中所有数据，完全恢复备份的数据，备份后添加的数据会被删
mongorestore -h 127.0.0.1:27017 --nsInclude="test.table" --dir=/root/mongosave

# 账号密码
mongorestore -h 127.0.0.1:27017 -u admin -p 123456 --authenticationDatabase admin --nsInclude="test.table" --dir=/root/mongosave

# 数据恢复，会将备份之后删除的添加回来，备份之后添加的默认不动

```

### 导出 （ mongoexport ）

>   得到一份可以可以看的 json 数据，普通数据，任何地方都能导入

```shell
# mongoexport -h dbhost -d dbname -c cname -o dbdirectory/xxxx.json
# dbhost 需要导出的主机
# dbname 需要导出的数据库
# cname 需要导出的集合
# dbdirectory 输出存放位置
mongoexport  -h 127.0.0.1:27017  -d test -c table -o /root/mongoexport/xx2.json
mongoexport  -h 127.0.0.1:27017  -u admin -p 123456 --authenticationDatabase admin -d test -c table -o /root/mongoexport/xx2.json
```

### 导入 ( mongoimport )

>   在原有数据追加数据(_id重复会导致无法导入，没_id会自动生成_id)，不存在的数据库或集合，导入会自动创建

```shell
mongoimport -h 127.0.0.1:27017 -d test2 -c tab2 ./mongoexport/xx2.json
mongoimport -h 127.0.0.1:27017 -u admin -p 123456 --authenticationDatabase admin -d test2 -c tab2 ./mongoexport/xx2.json
```











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
    +   恢复`mongorestore`
        *   `mongorestore D:\lzo-project\lzo-everyday\mongodb-export`
    +   `mongofiles`保存大文件
    +   `mongostat`是mongodb自带的状态检测工具
    +   `mongotop`用来跟踪MongoDB的实例