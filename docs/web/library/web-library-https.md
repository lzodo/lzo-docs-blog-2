---
title: HTTPS 认证
---
## 认证方法一
[SSL下载地址](http://slproweb.com/products/Win32OpenSSL.html)
### 本地认证
步骤
1. 进入找到ssl下载页面找到适应版本下载：`Win64` OpenSSL v1.1.1i Light
			                            EXE | MSI  -> 下载EXE
2. 打开安装目录下 `/OpenSSL-Win64/start.bat` 进入
3. 进入文件输出目录:运行 `openssl genrsa -out privkey.key 2048`  生成秘钥 (#生产2048位长度的rsa密钥)
4. 运行 `openssl req -new -x509 -key  privkey.key -out cacert.pem -days 1095`  生成证书
   或指定openssl.cnf路径: `openssl req -new -x509 -config "C:\Program Files\OpenSSL-Win64\bin\cnf\openssl.cnf"  -key privkey.key -out cacert.pem -days 1095`
5. 连续回车 直到 `Common name` 输入要签名的IP 直接回车
6. 完成

node中开启https服务
```javascript
var sslOptions = {
    key: fs.readFileSync("C:/privkey.key"), //生成秘钥路径
    cert: fs.readFileSync("C:/cacert.pen"), //生成证书路径
};
var http = require("https").Server(sslOptions, app);
```