---
title: 配置路径
---

> 系统函数库
```shell
cat /etc/init.d/functions
```

> 开机挂载
```shell
cat /etc/fstab
```

> 运行级别信息
```shell
cd /usr/lib/systemd/system
ls -la|grep runlevel   => runlevel{0-7}.target => 其中234命令行 5图形
systemctl set-default multi-user.target  #社区默认启动为敏玲模式
```
