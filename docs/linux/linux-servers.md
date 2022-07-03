---
title: linux服务
---

### 防火墙

#### 安装防火墙服务 firewalld

-   `firewall-cmd --zone=public --add-service=ftp --permanent`:防火墙开起 ftp 服务
    -   `--zone=public`:下面所以指令都能加
-   `firewall-cmd --list-all`:开放的端口，以及其他信息
    -   `--list-ports`:开放的端口
    -   `--list-service`:查看防火墙已开通的服务
-   `firewall-cmd --add-port=8001/tcp --permanent`:新增开放端口（permanent 表示设置为持久）
    -   `--add-port=8080-8083/tcp`:添加多个端口
    -   `--remove-port=81/tcp`:删除端口
    -   `--query-port=81/tcp`:查询端口是否开放
-   `firewall-cmd --reload`:重启防火墙(重启完设置才生效)
-   `firewall-cmd --state`:查看防火墙状态

```shell
# 开启防火墙
systemctl start firewalld.service | service firewalld start

# 重启防火墙
systemctl restart firewalld.service | service firewalld restart

# 防火墙开机启动
systemctl enable firewalld.service
# 关闭防火墙
systemctl stop firewalld.service
# 查看现有的规则
iptables -nL
```

华为云开放端口使可以在页面访问
1、安全组 Sys-WebServer 添加 端口
2、防火墙开放端口或关闭防火墙
服务器解析第三方域名
服务器设置域名解析，添加第三方域名，第三方将域名dns配置设置服务器提供的dns

#### iptables
> 软件防火墙 iptables，防火墙命令行工具，客户端代理，将用户配置的安全策略，执行到 `netfilter` 中
> 真正实现过滤的是 `netfilter` ,处于内核空间
> iptables+netfilter 实现软件防火墙
> centos7下 才有`firewalld + nftables`代替了`iptables+netfilter`

- 默认防火墙规则

```shell
iptables -L
```


### FTP

>   搭建好之后可以通过客户端上传现在服务器的文件

#### 终端ftp
window自带
```shell
# 登入
> ftp
ftp> open ip
回车 依次输入用户名密码

# help 查看支持的命令列表
ftp> help 

# LITERAL PASV 切换被动模式
```

#### 客户端

---

#### 服务端 vsftpd 搭建 ftp 环境

1、vsftpd 基于 FTP 协议
2、被动模式（Prot）：服务端打开好端口，让客户端主动来连（服务端被动）
3、主动模式（Pasv）：服务端主动向客户端某个端口进行数据连接
4、云服务器上你可以连接到服务器上某个端口，但是服务器连接不到你（云服务器最好用被动模式）

-   安装 `vsftpd`
-   创建访问用户(本地 linux 用户)
-   `/etc/vsftpd.conf`:配置文件

```shell

# 本地用户
local_enable=YES #是否允许本地用户`如root`登录
local_root=/home/ftpuser #设置本地用户登录后默认路径，否则默认在自己的家目录
local_umask=022 #设置本地用户上传文件的权限

# 匿名用户
# 账户:anonymous或ftp 密码随意
anonymous_enable=YES #是否允许匿名访问
anon_root=/usr/local/ftpdir #配置匿名用户根目录(如果无法直接设置777，许在ftpdir创建777权限文件夹，供匿名用户使用)
anon_umask=022 #匿名用户上传文件的权限
anon_upload_enable=YES #是否允许匿名用户上传写入
anon_mkdir_write_enable=YES #控制匿名用户创建目录
no_anon_password=YES #匿名用户不用密码登录
ftp_username=ftpuser #匿名登录后的使用者
anon_other_write_enable=YES　　　　　 　  # 开启匿名用户可以删除目录和文件
anon_world_readable_only=YES　　　　　 　# 开启匿名用户下载权限

# 这两个默认的，默认被动模式
prot_enable:YES|NO # 是否取消主动模式 默认yes
pasv_enable:YES|NO # 是否使用被动模式 默认yes
# 功能性配置
write_enable=YES #是否允许写入，否则不能上传文件
chroot_local_user=YES #所有用户不能切换到上级
allow_writeable_chroot=YES #如果文件不能上传 550 Permis....，可以加上这儿
ftpd_banner=Welcome to blah FTP service. #ftp链接成功提示
chroot_list_enable=YES #是否启用限制用户名单
# 我的arch配置
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
ascii_upload_enable=YES
ascii_download_enable=YES
banned_email_file=/etc/vsftpd.banned_emails
listen=YES
seccomp_sandbox=NO # arch vsftpd 无法显示列表的原因之一
pam_service_name=vsftpd
```

-   `ftpusers`:不允许里面的用户登录服务器（manjaro 没有）
-   `user_list`:
    -   `userlist_enable=YES`:启用这个配置文件
    -   如果`userlist_deny=NO`,就只允许里面的用户登录，否则 YES 表示不允许里面的用户登录
-   `chroot_list`:文件是限制在主目录下的例外用户名单(里面的用户可以访问上级)
    -   `chroot_list_enable=YES`                     #启用例外用户名单
    -   `chroot_list_file=/etc/vsftpd/chroot_list`   #例外用户名单文件
    -   `allow_writeable_chroot=YES` #所有用户都可以访问上级(与第一个互斥)

-   安装命令行 ftp 链接工具，`ftp localhost` 测试是否可以链接


####  新建一个用户
```shell
# 配置一个用户
useradd ftpuser
passwd ftpuser

# 权限目录
mkdir /var/ftp/ftpupload
chown -R ftpuser:ftpuser /var/ftp/ftpupload

# 备份配置文件
cp /etc/vsftpd.conf /etc/vsftpd.conf.back

pasv_address=114.115.121.129
pasv_enable=YES
pasv_min_port=30000
pasv_max_port=50000

# 主机安全组配置30000-50000 和 21 端口的几率

![华为主机配置](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0115828034.html)
```
### nc

-   安装 `nmap-ncat`或`nmap-netcat`

### openssh(远程连接工具)

> 使其他设备可以通过 `xshell，mobaxterm 等工具远程连接`

-   安装 openssh
-   `system status ssh`:查看是否开启
-   `lsof -i:22`:检测是否可以使用,默认 22 端口

-   mobaxterm 链接 图形界面
    -   首先目标linux系统需要支持`X11-forwarding`
    -   arch系列
        -   yay -S xorg-xauth
        -   touch ~/.Xauthority && chmod 600 ~/.Xauthority
        -   sudo vim /etc/ssh/sshd_config 将 AddressFamily any 改为 AddressFamily inet
        -   sudo systemctl reload sshd.service && sudo systemctl restart sshd.service

### lsof

### wget

### htop
-   通过上下左右控制，不能HJKL
-   `F2`:显示界面设置，`空格`切换显示模式，`Available meters`回车，添加指定属性,delete删除
-   `F3`:搜索
-   `F4`:过滤(隐藏不匹配的进程)
-   `F5`:进程树

### docker
> 容器镜像服务，Docker理解成一个专门分装应用程序与执行环境的轻型虚拟机,作用镜像制作
[镜像官网](https://hub.docker.com)
[其他镜像](https://quay.io)
-   yay安装 ，通过systemctl开启服务
-   权限:
    -   创建docker组，将相关用户归属组添加docker
    -   sudo gpasswd -a username docker
    -   刷新:newgrp docker
    -   id username 查看是否添加成功
-   镜像
    -   阿里云 -> 控制台 -> 产品与服务 -> 搜索容器镜像服务-> 加速配置
    -   将他的配置json内容复制到/etc/docker/daemon.json中
-   常用命令
    -   `docker info`:查看docker基础信息
    -   `docker search xxx`:查找镜像
    -   `docker pull xxxname`:下载镜像
    -   `docker images`:查看下载镜像的信息
    -   `docker rmi IMAGE_ID|Tag`通过id或tag删除
    -   `docker save -o centos.tar centos:7`:保存将名称:centos,tag：7的镜像输出中centos.tar文件中

#### 常用基础环境服务
-   `httpd`:Apache
-   `busybox`：轻量嵌入式系统
-   `centos`:系统镜像

#### lazydocker
> docker gui管理插件

### samba
> 是一款linux系统应用微软文件资料的工具
> 微软指定了`SMB协议`，用于`局域网`文件共享，

特点：
1、linux与Windows之间进行文件和打印机共享
2、适用于linux与linux，和linux与window
3、NFS个适合linux与linux的文件共享，所有samba一般用在 linux与window使用

安装
```shell
# yum 安装配置文件一般在 /etc 下
yum install samba -y
cd /etc/samba


# global 全局配置
[global]
    # 定义一个工作组
	workgroup = SAMBA  
    # 安全验证方式 user代表账号密码
	security = user

	passdb backend = tdbsam

	printing = cups
	printcap name = cups
	load printers = yes
	cups options = raw

# 下面的都是独立局部配置，如:home下面的配置，只对homes文件夹生效 
[homes]
	comment = Home Directories
	valid users = %S, %D%w%S
	browseable = No
	read only = No
	inherit acls = Yes



```
案例
1、建立共享文件夹
```shell
[testshare]
# 描述
	comment = All Printers
# 共享路径
	path = /var/tmp
# 是否公开
    public = no
# 是否可以写入
    writable = yes
# 是否允许匿名用户登录
    guest ok = yes

```

2、使用pdbedit 创建samba服务专用的密码信息
3、使用pdbedit管理samba用户,这个用户必须是linux用户
```shell
# 创建用户
pdbedit -a -u user-name

```
4、重启smb服务，并检查samba端口(445)是否存活
5、检测防火墙
iptables -L

6、使用客户端链接

```shell
# window
运行输入
//sam服务器地址

# macos
smb://sma服务器地址


```
### NFS
> 稳定的网络文件共享系统，与云服务器的共享
> 软件共享存储，大公司有可能需要购买硬件设备分担压力,成本高
> 统一存储网站静态数据
![NFS](../../status/img/NFS1.png)

> NFS 和 RPC
1、NFS通过port传输数据，端口是随机的,主动再RPC进行注册（重启NFS，查看端口是否变化）
2、所以需要通过`RPC`服务进行端口注册，实现告知用户NFS端口是什么
3、所以RPC(远程过程调用)，NFS两个服务一起启动
4、过程：NFS（客户端）发送请求(端口111)到RPC，从而得到一个端口，再拿端口去访问远程NFS服务端

> 环境搭建
1、安装 rpcbind
2、安装 nfs-utils

> 环境配置
1、NFS是c/s模式，client,server 准备台机器
2、NFSServer创建共享文件夹，并给与权限 
3、修改NFSServer配置文件
```shell
# /etc/exports
# 配置文件规则
# NFS服务端共享目录 NFS客户端地址(参数...) NFS客户端地址2(参数...)
/root/nfsshare *(ro)  #所有人可读
/root/nfsshare 主机名(rw) 主机名2(rw)  允许这两个主机可读写
/root/nfsshare IP(insecure,rw,root_squash) 允许这个IP可读写
/root/nfsshare 192.168.178.0/24(rw) 允许整个178网段访问（24 子网掩码24位，255.255.255.0）

# 权限参数
insecure 允许客户端从大于1024的端口发请求(参数1必须加)
ro  只读
rw  读写
root_squash 如果客户端以root访问服务端nfs时，会把该用户映射位匿名用户，UID GID会变成nfsnobody的信息
no_root_squash 和上面相反不安全
all_squash 无论是root还是非root，全部匿名，很安全
sync 数据同步写入到磁盘和内存，保证数据安全，但效率低
async 数据线写入到内存，再持久化到磁盘效率高

```
4、启动NFS服务的文件共享目录
```shell
# NFS基于RPC111端口，保证RPC以及启动,111 端口启动
systemctl start rpcbind
netstat -tunlp|grep 111

# 写好NFS配置文件与挂载目录
chmod -Rf 777 path  强制递归给与权限
chown -r nfsnobody:nfsnobody path
# 启动NFS
systemctl start nfs-server.service （centos8专的版本）

# 检测本地共享情况
showmount -e 127.0.0.1

# 检测共享参数
/var/lib/nfs/etab
```

5、本地挂载测试
mount -t nfs 114.115.212.xxx:/root/nfsshare /mnt
umount /mnt 取消挂载 

6、客户端挂载
```shell
# 确保安装了nfs-utils和rpcbind
# 开启rpcbind
# 检测服务端共享是否可用，如果通了就能进行挂载操作
# 云服务器安全组需要开发111端口
showmount -e 服务端IP 

# mount -t -nfs xxxxx

```



### postfix + dovecot 收发邮件

### VNC 远程linux图形界面

服务端
```shell
yum install tigervnc-server

# 设置分辨率
vncserver -geometry 1920x1080

# 启动服务
vncserver
    输入至少六位密码
    验证前面数的密码
    第三个选n
    等待服务开启....

vncserver -list  查看端口与进程, 完成后去客户端

防火墙开放这个端口或关闭防火墙
```

进入官网下载客户端 下载`vnc viewer`桌面程序
    https://downloads.realvnc.com/download/file/viewer.files/VNC-Viewer-6.22.515-Windows-64bit.exe

新建链接
输入 ip与端口
名称随意 root

