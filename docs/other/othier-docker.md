---
title: docker
---

### 概述

> 解决问题:
    部署环境麻烦，相同环境更麻烦
    项目与环境一同打包（镜像），发布到`docker仓库`  => 用户(运维)下载直接运行

> 隔离思想
    Docker核心思想 打包装箱 每个箱子相互隔离互不影响

> 基本信息
    基于go开发的
    容器技术、虚拟化技术(系统最核心的环境 + mysql + 需要的技术2 + 需要的技术n ..) 打包成镜像 ，多个再相同系统运行
        `直接运行在宿主机上，容器没有自己内核，也没有不必要的软件`
        `每个容器相互隔离，有自己的文件系统，互不影响`
        `内核级别的虚拟化`
    虚拟机 => 虚拟机资源占用、冗余步骤多、启动速度慢、很多东西都不是程序环境所需要的
        `运行一个完整的系统，在系统上安装和运行软件`
    基本组成架构

> DevOpts(开发、运维)
打包镜像，发布运维，一键运行，运行环境高度一致

> 名词
镜像(image):
    类似模板，可以通过这个模板创建容器服务
容器(container)
    利用容器运行一个或一组应用,通过镜像创建
    可以启动停止删除等基本命令
仓库(repository)
    远程存放镜像的地方

[仓库地址](https://hub.docker.com/) 阿里云等大公司也有这种仓库
[官网](https://www.docker.com/)
[文档](https://docs.docker.com/)

### 安装 
...
...
...

安装成功后
`systemctl start docker.service` 启动服务
`docker run hello-world` 测试是否可以用

### 命令
判断是否安装成功: `docker version`、`docker info`
启动程序: `docker run <镜像名称>`
查看本地镜像:`docker images`

### 镜像
### 容器数据卷
### DockerFile
### Docker网络原理
### IDEA真和Docker
### Docker Compose
### docker Swarm
### CI\CD jenkins 