---
title: linux服务
---

## 防火墙

### 安装防火墙服务 firewalld

-   `firewall-cmd --zone=public --add-service=ftp --permanent`:防火墙开起 ftp 服务
    -   `--zone=public`:下面所以指令都能加
-   `firewall-cmd --list-all`:开放的端口，以及其他信息
    -   `--list-ports`:开放的端口
    -   `--list-service`:查看防火墙已开通的服务
-   `firewall-cmd --add-port=8001/tcp --permanent`:新增开放端口
    -   `--add-port=8080-8083/tcp`:添加多个端口
    -   `--remove-port=81/tcp`:删除端口
-   `firewall-cmd --reload`:重启防火墙
-   `firewall-cmd --state`:查看防火墙状态

```shell
# 开启防火墙
systemctl start firewalld.service
# 防火墙开机启动
systemctl enable firewalld.service
# 关闭防火墙
systemctl stop firewalld.service
# 查看现有的规则
iptables -nL
```

### iptables

-   指令 ` iptables`,名称 `Netfilter`

## 常用

### 搭建 ftp 环境

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
# 功能性配置
write_enable=YES #是否允许写入，否则不能上传文件
chroot_local_user=YES #所有用户不能切换到上级
allow_writeable_chroot=YES #如何文件不能上传 550 Permis....，可以加上这儿
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

-   安装命令行 ftp 链接工具，`ftp localhost` 测试是否可以链接

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
