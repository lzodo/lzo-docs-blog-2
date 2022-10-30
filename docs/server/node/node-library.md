---
title: 库
---

Express.js、Koa、NestJS(基于Express)、Nuxt.js(Vue)

-   Excel 表格处理 : [sheetjs](https://sheetjs.com/)
-   日期时间处理 :[date-fns](https://date-fns.org/)
-   聊天通讯：[socket](https://socket.io/)
-   PDF：[Node PDF 生成库](https://pdfkit.org/)
-   CRON定时：[node-cron](https://www.npmjs.com/package/cron)
-   mongodb工具：[mongose](http://www.mongoosejs.net/)
-   邮件发送：[nodemailer](https://nodemailer.com/about/)
-   接口文檔：[apidoc](https://www.npmjs.com/package/apidoc)
-   日志插件: [log4](https://www.npmjs.com/package/log4js)
-   错误插件
-   pm2:[node进程管理工具]

-   koa
-   koa-compress 压缩响应数据
-   koa-logger 输出服务日志
-   koa-error 处理响应错误


### pm2
pm2 启动的 node 进程关闭了会自动重启
全局安装 pm2 `npm install pm2 -g`

```shell
# =================使用
# 启动某一个node程序
pm2 start xxx.js --name=自定义名称

# 启动ssr项目，npm run start 成功后 ，再执行，也可以直接执行
pm2 --name=nuxtName start npm -- run start

pm2 list   # 查看进程列表
pm2 logs   # 查看日志
pm2 monit  # 监控进程
pm2 show app_name|app_id # 查看进程详细
pm2 stop app_name|app_id|all # 停止进程
pm2 delete app_name|app_id|all # 删除进程
pm2 restart/reload app_name|app_id|all # 重启进程

# 启动多个程序
touch appxx.json
# 写入
{
    "app":[
        {
            "name":"api",
            "script":"server/index.js", # 找到程序路径
        },
        {
            "name":"node-n",
            "script":"client/index.js", # 找到其他node程序路径
        },
    ]
}

pm2 start appxx.json

# =============================设置开机自启
pm2 startup

# 保存为开机自启
pm2 save

# 删除pm2 save的操作
pm2 unstartup systemd

# 当 node.js 版本更新时，请一定要卸载并新建 自启动脚本 
pm2 unstartup
pm2 startup

# 恢复上一次保存的自启动列表
pm2 resurrect

# 查看端口
netstat -lntp

```

