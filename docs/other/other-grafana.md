---
title: grafana  
---

[下载地址](https://grafana.com/grafana/download)

```shell
# arch系列 sudo pacman -S grafana 
# systemctl start grafana.service 启动服务 默认端口3000
# 默认账号密码admin/admin 第一次需要直接更新新密码
# 配置文件 /etc/grafana.ini
# grafana-cli 后期安装插件命令
# 修改密码 grafana-cli admin reset-admin-password newpassword

安装成功后相当于建立一个grafana用户
```
> 



### 插件安装
> grafana-cli plugins   默认位置  /var/lib/grafana/plugins 

```shell
grafana-cli plugins install <plugin Id or vis>

grafana-cli plugins list-remote # 查看可安装的插件列表
grafana-cli plugins ls # 查看已安装插件列表

安装插件 才会有更多的数据源选择
```

服务器 步骤
    安装启动数据源(mysql mongodb zabbix 等)
    安装grafana，并默认通过3000端口打开页面
    grafana安装插件(数据源相关插件)
    Data Sources中添加数据源，并配置第一步准备好的数据源信息关联
    官网 https://grafana.com/grafana/dashboards/ 查找想要的模板 得到id

页面 步骤 
    创建 Folder 自定义一个名称
    Import 导入模板 => 输入模板上面得到ID Load加载
        选择 Folder
        最后选择 数据源