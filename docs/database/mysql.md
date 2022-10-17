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

### 基本知识

1.   数据库字符集：默认 `utf8mp4` ,如果是`utf8`无法识别`emoji`表情字符
2.   排序规则：数据库排序操作时，ASC DSC的实现规则

#### 表字段的数据类型

-   数字类型：`TINYINT` 1 , `SMALLINT` 2 , `MEDIUMINT` 3 ，`INT`4,`BINGINT`8
-   浮点数字类型：`FLOAT`4 , `DOUBLE`8 , ` DECIAML(大小,小数个数)`
-   日期类型：
    -   YEAR => 年 `1901-2155,0000`
    -   DATE => 年月日 `1000-01-01 - 9999-12-31`
    -   `DATETIME` => 年月日 时分秒 `1000-01-01 00:00:00.000000 - 9999-12-31 23:59:59.999999` 支持六位微妙
    -   `TIMESTAMP`  => 年月日 时分秒 ( 时间访问是UTC的时间范围 ) `1970-01-01 00:00:00 - 2038-01-19 03:14:07`
-   字符串类型：
    -   CHAR：固定长度，0-255
    -   `VAECHAE`：可变长的字符串，长度可以 0-65535直接的值
    -   BINARY和VARBINARY：储存二进制字符串
    -   BLOB：用于储存大的二进制类型
    -   TEXT：用于储存大的字符串类型
-   ....不常用

#### 表约束

>   永远不要将**业务的信息字段**作为唯一性主键

>   每张表为了取反每条记录的**唯一性**，必须有一个**不重复**，**不为空**的字段，设置成主键

>   多列索引，**联合主键**

 ```mysql
 # 新建表
 CREATE TABLE IF NOT EXISTS `students` (  # 如果不存在就创建
     `id` INT PRIMARY KEY AUTO_INCREMENT, # 设置位主键并自动递增
 	`name` VARCHAR(10) NOT NULL, # 不能为空
 	`norepeat` VARCHAR(10) UNIQUE, # 不能重复
 	`age` INT DEFAULT 0 # 最后不能有逗号
 )
 ```



### 数据库操作

```mysql
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

### SQL语句

-   SQL语句操作数据库，常见关系数据库SQL语句都是比较相似的
-   常见规范
    -   通常大写关键字 如 CREATE
    -   语句以封号结尾
    -   如果关键字作为表名或字段名可以使用引号包裹

#### DDL 库或表 创建、删除、修改

DDL 对数据库的操作

```mysql
# DDL 数据定义语句，对数据库或表进行 创建、删除、修改等操作 之 数据库操作
 # 查询所有数据库
 SHOW DATABASES;
 
 # 选择数据库
 USE lzoxun;
 
 # 查看当前正在使用的数据库
 SELECT DATABASE();
 
 # 创建新数据库
 # CREATE DATABASE users; # 直接创建
 CREATE DATABASE IF NOT EXISTS users; # 如果不存在就创建
 
 # 删除数据库
 DROP DATABASE IF EXISTS users; # 如果存在就删除
 
 # 修改数据库 (字符集和排序规则,一般右键数据库直接改)
 ALTER DATABASE users  CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
```



DDL 对表的操作

   ```mysql
   # DDL 数据定义语句，对数据库或表进行 创建、删除、修改等操作 之 表的操作
   
   # 查看所有表
   SHOW TABLES;
   
   # 新建表
   CREATE TABLE IF NOT EXISTS `students` (  # 如果不存在就创建
     `id` INT PRIMARY KEY AUTO_INCREMENT, # 设置位主键并自动递增
   	`name` VARCHAR(10) NOT NULL, # 不能为空
   	`norepeat` VARCHAR(10) UNIQUE, # 不能重复
   	`age` INT DEFAULT 0 # 最后不能有逗号
   );
   
   # 修改表名字
   ALTER TABLE `students2` RENAME TO `students`;
   
   # 添加新的列
   ALTER TABLE `students` ADD `updateTime` TIMESTAMP;
   
   # 修改字段名称
   ALTER TABLE `students` CHANGE `updateTime` `createTime` TIMESTAMP; 
   
   # 修改字段类型
   ALTER TABLE `students` MODIFY `name` VARCHAR(30);
   ALTER TABLE `students` MODIFY `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP; # 默认创建时间 CURRENT_TIMESTAMP 与 字段类型匹配
   ALTER TABLE `students` MODIFY `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; # 默认值为更新时候的时间 
   
   # 删除一个字段
   ALTER TABLE `students` DROP `age`;
   
   # 查看表结构
   DESC `students`;
   
   # 根据表结构创建新表
   CREATE TABLE `copytable2` LIKE `students`;
   
   # 根据表结构和内容创建新表(包括内容一起创建)
   CREATE TABLE `copytable3` (SELECT * FROM `students`);
   
   # 查看创建表时使用的语句
   SHOW CREATE TABLE `students`; 
   
   # 删除表
   DROP TABLE IF EXISTS `students`; # 如果存在就删除
   ```

   #### DML 数据 添加、删除、修改

```mysql
# DML 对表数据进行 添加、删除、修改等操作

# 插入数据
# INSERT INTO `students` VALUES (110,"liao",'1444','2022-10-10 12:33:00');  # 全表
INSERT INTO `students` (name,norepeat) VALUES ("liao2","144453d1"); #插入指定数据 


# 删除数据
DELETE FROM `students`; # 删除所有数据
DELETE FROM `students` WHERE id = 1;# 删除表中符合条件的数据

# 更新数据
UPDATE `students` SET name = '大都是', norepeat = '4589' WHERE id = 111; # 更新符合条件的数据
```

####  DQL 数据 查询

```mysql
# DQL 从数据库中查询记录

# 普通查询
SELECT * FROM `students`; # 查询所有数据与字段
SELECT name,norepeat FROM `students`; # 查询指定字段
SELECT name as listName,norepeat FROM `students`; # 查询指定字段并起别名

# 条件判断查询
SELECT * FROM `students` WHERE `norepeat` >= 5; # 查询 norepeat >= 、= 、!=、<> 5 的记录

# 逻辑运算语句
SELECT * FROM `students` WHERE `norepeat` >= 5 AND `name` = 'liao8'; # 查询 大于5 并且 name 为liao8 的数据
SELECT * FROM `students` WHERE `norepeat` >= 5 && `norepeat` != 8; # 查询 大于5 并且 不等于8 的记录
SELECT * FROM `students` WHERE `norepeat` BETWEEN 5 AND 8; # 查询 5-8 的记录

SELECT * FROM `students` WHERE `norepeat` >= 5 OR `name` = 'liao1'; # 查询 大于5 或者 name 为liao1 的数据 ( || )
SELECT * FROM `students` WHERE `norepeat` IS NULL; # 查询 norepeat 为 null 的记录
 
# 模糊查询
SELECT * FROM `students` WHERE `name` LIKE "%8%"; # % 表示任意个任意字符，只要 name 存在 8，就可以查出来
SELECT * FROM `students` WHERE `name` LIKE "__ao8"; # _ 表示一个任意字符

# 在列表中的，全都查
SELECT * FROM `students` WHERE `name` IN ('liao1','liao2','liao3');

# 对查询结果排序
SELECT * FROM `students` WHERE `name` LIKE "liao_" ORDER BY norepeat DESC, id ASC; # 将查到的记录通过 norepeat 字段进行降序,再同 id 升序

# 分页查询
SELECT * FROM students LIMIT 2 OFFSET 0; # 查询 2 条，偏移 0 ((pageSize-1)*pageNumber) 条 , 第一页，查出1-2条记录
SELECT * FROM students LIMIT 2 OFFSET 2; # 查询 2 条，偏移 2 ((pageSize-1)*pageNumber) 条 , 第二页，查出3-4条件记录
SELECT * FROM students LIMIT 2,2; # 也行

# ============================================================
# 聚合操作 
SELECT SUM(norepeat) FROM `students`; # 对 int 类型列进行求和
SELECT SUM(norepeat) FROM `students` WHERE id > 124; # di 大于 124 的记录的norepeat 进行求和
SELECT AVG(norepeat) FROM `students`; # 求平均值 MAX() 最大值、MIN() 最小值、COUNT(*)  统计记录个数，
SELECT COUNT(DISTINCT norepeat) FROM `students`; # 统计个数并去重

# 分组 
# 因为 GROUP BY `group` 所以SELECT 后面可以加 group, 不然不能这么加的
SELECT `group`,AVG(norepeat),COUNT(*) FROM `students` GROUP BY `group`; # 用group分组，计算出每个种类数据，norepleat 的平均值，与记录个数

# HAVING 作用于组, 和 WHERE作用类似，但是它是在分组后进行过滤的
SELECT `group`,AVG(norepeat),COUNT(*) count FROM `students` GROUP BY `group` HAVING count = 2; 

# 通过 WHERE 过滤完再进行分组, WHERE 作用于表
SELECT `group`,AVG(norepeat),COUNT(*) count FROM `students` WHERE id > 121 GROUP BY `group`; 

# 多表查询
# 主表中有时候，相同类型或组， 数据是很多的，当想给类型，添加额外属性，就需要利用新表，否则，主表每个相同类型都有相同的新属性，难以维护 
```


#### DCL 库和表的权限操作

```mysql
# 数据控制语言，对数据库和表的权限进行相关访问控制操作
```



### 主键外键多表操作

```mysql
CREATE TABLE IF NOT EXISTS `brand` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	website VARCHAR(100),
	phoneRank INT
);

INSERT INTO `brand` (name,website,phoneRank) VALUES ('华为','www.huawei.com',2);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('联想','www.lianxiang.com',4);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('戴尔','www.daier.com',3);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('苹果','www.pingguo.com',10);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('小米','www.xiaomi.com',5);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('oppo','www.oppo.com',8);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('京东','www.jingdong.com',7);
INSERT INTO `brand` (name,website,phoneRank) VALUES ('谷歌','www.google.com',9);

CREATE TABLE IF NOT EXISTS `products` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100),
	price FLOAT,
	url VARCHAR(100),
	score FLOAT
);

INSERT INTO `products` (brand,price,url,title,score) VALUES ('华为',6666,'www.xxxxx.com','华为 nova 2',8.5); # 添加数据
INSERT INTO `products` (brand,price,url,title,score) VALUES ('华为',7777,'www.xxxxx.com','华为 nova 3',9.);

# 给 products 添加 brand 的外键
ALTER TABLE `products` ADD `brand_id` INT;
ALTER TABLE `products` ADD FOREIGN KEY(brand_id) REFERENCES brand(id); # 设置成外键，并添加外键约束 （brand_id 必须是 brand表中存在的id）

# 设置brand_id
UPDATE `products` SET `brand_id` = 1 WHERE `brand` = '华为'; # 因为 brand 中华为的id就是1
UPDATE `products` SET `brand_id` = 5 WHERE `brand` = 'oppo';
UPDATE `products` SET `brand_id` = 4 WHERE `brand` = '小米';


# 修改和删除被当做外键引用了的id (id 默认不能修改)
# 从工具中表右键 - 设计表 - 外键 有一个删除时的值 RESTRICT ，更新时的值 RESTRICT，界面可以直接修改状态
# 将它们的值 从RESTRICT 该为 CASCADE ，如果id改了，子集引用了这个id的外键会自动更新
# 将它们的值 从RESTRICT 该为 SET NULL ，如果id改了，子集引用了这个id的外键会自动变 NULL

# SQL 语句修改
SHOW CREATE TABLE `products`; # 查看外键的表 的 创建表的语句，哪里有外键关联信息
ALTER TABLE `products` DROP FOREIGN KEY products_ibfk_1; # 根据名称删除外键
# 重新关联外键，并指定更新时的值为 CASCADE 删除时的默认(如果删除也设置成 CASCADE 那么，父一删除，关联它的id外键也会全部删除)
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES brand(id) ON UPDATE CASCADE ON DELETE RESTORE;

```



#### GUR工具

[Navicat](http://www.navicat.com.cn/download/direct-download?product=navicat_premium_cs_x64.exe&location=1)

工具快捷键

-   `Ctrl + q`：打开查询界面
-   `Ctrl + r`：运行当前查询界面的sql语句
-   `Ctrl + Shift + r`：运行焦点所在的sql语句
-   `Ctrl + d`：复制当前行
-   `Ctrl + l`：历史日志
-   `F6`：命令行界面

