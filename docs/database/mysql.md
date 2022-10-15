---
title: mysql
---
关系型数据库
    MySQL、Oracle、SQLServer ....
    关系可以理解为，数据库中存在很多报表，表与表之间存在各种关系，通过一个属性，就可以关联出与它有关系的表的某些数据
非关系型数据库(Not only SQL)
    MongoDB、Redis.....
    它相关的数据都可以存在在文档的下级JSON中，不写要太大表与表之间的操作，性能更高

### 安装
[官网](https://www.mysql.com/)
[下载](https://dev.mysql.com/downloads/mysql/)

#### yum 安装
```shell
yum install mysql mysql-server mysql-deve # 直接安装
rpm -qi mysql-server # 查看版本
systemctl start mysql # 开启服务

mysqladmin -u root password 'lzx123456' # 第一次设置mysql root密码
mysql -u root -p  回车 输入密码登录
mysql -uroot -pxxx 直接输入也可以，u后面空格随意
```

#### win 安装
Choosing a Setup Type
    选择 server only 就行

next...

Authentication Method (5.x 版本没有，8.x 才会有这个强密码加密选项)
    选择第一个后面设置密码需要复杂格式，并且到时候客户端需要支持8.x才可以远程链接

next...

始终密码步骤...

Window Service
    设置服务名称

next...

完成
window 一般直接开启了，如果没有可以去 cmd 搜索服务，找到上面看到的服务名称，手动开启

终端登录 mysql -uroot -pxxx

### 数据库操作

```shell
# 查看数据库 自带几个默认数据库
show databases;
	infomation_schema => 储存MySQL在维护的其他按数据库表等信息
	performance_schema => 性能数据库，记录运行过程中资源消耗相关详细
	mysql => 储存数据库管理者的用户信息、权限信息以及日志信息等
	sys => 简易版的 performance_schema
	
# 创建数据库
create database <base-name>;
# 选择使用的数据库
use <base-name>;
# 查看使用的数据库，一切表操作都是基于这个数据库
select database();
# 新建一张表
create table <table-name>(
	name varchar(10),
	age ing);
# 查看表
show tables;

# 插入数据 到表中
insert into users (name,age) values ("lzo",18);
# 查询表数据
select * from users; # 查询users表中所有信息

```

#### SQL语句

-   SQL语句操作数据库，常见关系数据库SQL语句都是比较相似的
-   常见规范
    -   通常大写关键字 如 CREATE
    -   语句以封号结尾
    -    如果关键字作为表名或字段名可以使用引号包裹
-   常用的SQL语句

   ```shell
    # DDL 数据定义语句，对数据库或表进行 创建、删除、修改等操作
    # DML 数据操作语句，对表进行 添加、删除、修改等操作
    # DQL 数据查询语句，从数据库中查询记录（重点）
    # DCL 数据控制语言，对数据库和表的权限进行相关访问控制操作
   ```



 

#### GUR工具

[Navicat](http://www.navicat.com.cn/download/direct-download?product=navicat_premium_cs_x64.exe&location=1)

