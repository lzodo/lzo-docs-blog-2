---
title: charles 手机调试
---
[charles 抓包](https://www.charlesproxy.com/)
[破解码生成]https://www.zzzmode.com/mytools/charles/) 
[知乎](https://zhuanlan.zhihu.com/p/351377492)

连接手机调试
window 打开 Charles 
PC端安装证书
    Help->SSL Proxying ->install Charles Root Certificate
    选择 将证书放入下列储存 -> 浏览 -> 受信任的证书颁发机构 -> 确定 完成
    找到上方菜单栏 Proxy ，Window Proxy 勾起

获取手机代理信息
    Help->SSL Proxying ->install Charles Root Certificate on a Mobile.....
    弹窗，得到ip和端口，这个IP可能没用，要换成自己电脑的IP
    手机 手动代理设置好完成后 PC Charles 会出现弹窗，选择 ALLOW 

手机按照证书
    选择 ALLOW 后手机进入浏览器(尽量不用自带的) 按照第一个弹窗提示 输入 chls.pro/ssl 

    搜索 加密与凭据 或 证书 ，找到下载的证书文件安装
    
乱码 问题 
    Proxy -> SSL Proxying settings -> add  
    添加一条 host * prot * 的记录

    导致 页面中websock无法连接
    要去 Proxy -> proxies 勾选sockit 在到旁边 Windows 勾选Use SOCKIT proxy

手机 https unkonwn
    Android7以上的系统无法对第三方https的App进行抓包了，因为7.0以上版本设置了安全策略，不再信任用户自己添加的认证证书，也就无法完美的进行抓包。


安卓7.0以上处理证书问题
    window http://slproweb.com/products/Win32OpenSSL.html 下载 openssl , 安卓 设置环境变量，重新打开cmd
    charles 的 Help -> SSL Proxying -> Save Charles Root ... 导出证书(一定要 xxx/xxx.pem, 带上名字和单位)
    `openssl x509 -subject_hash_old -in xxx.pem` 生成的数据上面有个8位hash值，将xxx.pem 重命名位 8位hash.0

电脑安装 adb 
    https://dl.google.com/android/repository/platform-tools-latest-windows.zip
    解压  配置环境变量

    手机连接USB
    adb device 测试
    adb remount 测试

    adb -d 表示当前唯一连接USB的设备
    adb push xxxxx/8位hash.0 /system/etc/security/cacerts

    adb shell 可以进入shell模式
### 使用
`重发`和`定时重发`
    定位到某个接口右键 `Repeat` 和 `Repeat Advanced`
        重复次数
        并发数 
        间隔时间

重写请求 `Rewrite`

