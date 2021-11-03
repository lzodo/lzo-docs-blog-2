---
title: go
---
[环境配置](https://www.cnblogs.com/huangeh/p/14331987.html)
wget https://dl.google.com/go/go1.10.3.linux-amd64.tar.gz
tar -C /usr/local -zxvf  go1.10.3.linux-amd64.tar.gz

#### 配置环境
> mkdir -p /usr/local/gocode/{src,bin,pkg}

```shell
export GOROOT=/usr/local/go           #Golang源代码目录，安装目录
export GOPATH=/usr/local/gocode        #Golang项目代码目录
export PATH=$GOROOT/bin:$PATH    #Linux环境变量
export PATH=$GOPATH/bin:$PATH    #Linux环境变量
export GOBIN=$GOPATH/bin        #go install后生成的可执行命令存放路径
```
#### 查看安装专题
```shell
//查看go环境变量路径
which go
//查看go语言环境信息
go env
//查看go版本，查看是否安装成功
[root@pyyuc ~ 22:59:05]#go version
go version go1.11.4 linux/amd64
```
#### 安装包
> go get github.com/integrii/flaggy 
> golang.org 访问艰难
