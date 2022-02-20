---
title: nvm
date: 2016-12-10 14:00:57
tags:
    - 标记语言
---
类似工具`n`和`nvm`至支持linux,`nvm-windows`就是win版的nvm

window 的 node 管理器
[下载地址](https://github.com/coreybutler/nvm-windows/releases/tag/1.1.7)

linux 安装后需要将文件追加到 bash 配置文件中
`echo "source /usr/share/nvm/init-vim.sh" >> ~/.zhsrc`

##### 查看版本

```shell
nvm list //查找电脑上的node版本
nvm list available //查看网络可以安装的版本
```

##### 安装

```shell
# 设置镜像 npm.taobao.org/mirrors/node/   https://registry.npmmirror.com/binary.html ...
nvm node_mirror npm.taobao.org/mirrors/node/
nvm npm_mirror npm.taobao.org/mirrors/npm/

nvm install <version> # 版本号 如: 12.10.0
nvm alias default v4.3.0 # 设置默认版本
nvm install latest #安装最新版本
nvm install lts #安装最新lts版本

```

##### 切换版本

```shell
nvm use <version>
```

##### 卸载

```shell
nvm uninstall <version>

```

##### 开启关闭

```shell
nvm off                     //禁用node.js版本管理(不卸载任何东西)
nvm on                      //启用node.js版本管理
```

##### 其他

```shell
nvm ls 列出所有版本
nvm current显示当前版本
nvm alias <name> <version> ## 给不同的版本号添加别名
nvm unalias <name> ## 删除已定义的别名
nvm proxy 查看设置与代理
nvm root [path] 设置和查看root路径
nvm version 查看当前的版本
...
```

注意:
切换 node 版本后有时候需要重新 install 项目的依赖才能正常运行
全局安装的插件路径都能在当前 nvm node 版本下与 npm config get prefix 指令查看
切换版本 npm config get prefix 得到的路径也会一起变化
