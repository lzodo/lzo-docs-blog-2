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
        `如果需要连个容器，就需要安装连个centos这样的系统`
        `安全性强`
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
[指令文档](https://docs.docker.com/reference/)

### 安装 
...
...
...

安装成功后
`systemctl start docker.service` 启动服务
`docker run hello-world` 测试是否可以用

-   docker 的工作原理
    -   docker 是一个Client-Server结构系统，Docker守护进程运行在服务器主机子上，通过Socket从客户端访问
        -   守护进程包含所有容器，相当于小的Linux系统，里面的端口与外界不冲突
    -   Docker服务器 执行 客户端发送的指令 
### 命令
帮助: `docker --help`
判断是否安装成功: `docker version`、`docker info`
启动程序: `docker run <镜像名称>`

-   镜像命令
    -   `docker images`：查看本地镜像
        -   `-aq`:查出所有镜像id
    -   `docker search <image name>`：搜索镜像
        -   `--filter=STARS=3000` :只搜索stars大于3000的镜像
    -   `docker pull <image name>`:下载镜像
        -   `docker pull <image name>:tag` 指定版本
    -   `docker rmi -f <image id|name>`:删除镜像
        -   `docker rmi -f $(docker images -aq)`:批量删除

> 下载测试镜像
```shell
docker pull centos
```
-   容器命令
    <!-- -   `docker linux大多数命令 容器id`:实现容器内部相应linux功能    -->
    -   `docker run [参数] centos`:新建容器并启动
        -   `--name Name`:容器名称
        -   `-d`:后台运行
            -   `后台运行必须有一个前台在使用的应用，否则启动后会自动停止`
        -   `-it centos /bin/bash`: 进入容器 交互运行,里面是单独的centos系统
            -   `exit`：停止并推出
            -   `Ctrl + p + q`:不停止推出
            -   `docker exec -it <id|name> /bin/bash` 进入当前正在运行的容器,并开启新终端，可以操作 
            -   `docker attach <id|name>` 进入当前正在运行的容器，正则运行的终端  
            -   ``:重新进入停止的容器
        -   `--rm`:用完就删除
        -   `-小p IP:8080:8080`:指定容器端口，可以多个
            -   IP:主机端口:容器端口
        -   `-大P`:随机容器端口 
    -   `docker ps`:查看运行中的容器
        -   `-a`:历史运行的容器
        -   `-n=1`:只看一个
        -   `-q`:只显示编号
    -   `docker rm <容器 id>`:删除容器  
        -   `docker rm $(docker ps -aq)`:删除所有
        -   `docker rm -a -q|xargs docker rm`:通过Linux的xargs批量删除
        -   `-f`：强制删除运行的容器
    -   `docker start|stop|restart|kill <容器id>`:启动停止容器
    -   `docker pause|unpause <容器id>`:暂停容器
    -   `docker logs <容器 id>`:查看日志
        -   `-f -t --tail number`
    -   `docker inspect <容器 id>`:查看容器信息 
    -   `docker top <容器 id>`:查看进程信息 
    -   `docker stats`:查看资源占用

    -   `docker cp <容器 id>:/容器内路径 外部路径`:docker文件拷贝

- docker run 做了什么
    -   在本机寻找镜像，如果有运行镜像
    -   否则去远程仓库找，如果找到下载镜像到本地，在运行
    -   否则返回找不到

### 基本案例
- 安装nginx
```shell
# docker pull nginx // 下载
# docker run -d --name=nginx1 -p 3344:80 nginx // 开启  容器内nginx启动80端口，暴露出来映射到外部主机的3344
# curl localhost:3344  // 测试
```

- 安装 tomcat(默认暴露端口8080)
- es+kibana
### 镜像
### 容器数据卷
> 每次修改容器内配置需要进入很麻烦，我们可以在容器外不提供一个映射路径，达到容器外修改配置文件，容器内自动修改的技术

### 可视化工具
> portainer
```shell
docker run -d -p 8088:9000 \
--restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer

# 启动成功后 ip:8088 浏览器打开界面
# 设置密码
# 选择本地直接连接
```

> lazydocker
### DockerFile
### Docker网络原理
### IDEA真和Docker
### Docker Compose
### docker Swarm
### CI\CD jenkins 