---
title: kali
---

## kali

### 简介

-   [阿里云下载地址](https://mirrors.aliyun.com/kali-images/kali-2021.2/)
-   包含非常多可以直接使用的渗透工具
-   开源免费 基于`Debian`，虚拟机硬盘容量是最多不能超过指定大小，不会马上占用设定的大小
-   安装
    -   找到 Graphical installer 图形安装
-   基本配置

    -   国内源 

        -   `/etc/apt/sources.list`
        -   `deb https://mirrors.aliyun.com/kali kali-rolling main non-free contrib`
        -   `deb-src https://mirrors.aliyun.com/kali kali-rolling main non-free contrib`
        -   `apt-get update && apt-get upgrade && apt-get dist-upgrade `
        -   `apt-get clean `：清除缓存

    -   `apt install -y open-vm-tools-desktop`虚拟机全屏

## apt

-   清理

```shell
sudo apt-get autoclean               # 清理旧版本的软件缓存
sudo apt-get clean                      # 清理所有软件缓存
sudo apt-get autoremove           # 删除系统不再使用的孤立软件
```

## 指令
wsl 服务管理
service --status-all  查看服务名称
sudo service server-name start


apt-get update

### apt-file
> 查看指令属于哪个包
```shell
sudo apt install apt-file
sudo apt-file upadte

where ls #bin/ls
apt-file search -F bin/ls
```
### lsof

-   `lsof -i:22`:查看 22 端口的服务

```shell
#中科大
deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib

#阿里云
deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
deb-src http://mirrors.aliyun.com/kali kali-rolling main non-free contrib

#清华大学
#deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
#deb-src https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free

#浙大
#deb http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free
#deb-src http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free

#东软大学
#deb http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib
#deb-src http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib

#官方源
#deb http://http.kali.org/kali kali-rolling main non-free contrib
#deb-src http://http.kali.org/kali kali-rolling main non-free contrib

#重庆大学
#deb http://http.kali.org/kali kali-rolling main non-free contrib
#deb-src http://http.kali.org/kali kali-rolling main non-free contrib
```
