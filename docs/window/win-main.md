---
title: window
---

## 快捷功能

-   截图 ：`win + shift + s` 或 PrtSc
-   查看电脑配置 ：运行 `dxdiag`

### 实用功能

-   查找谁占用了文件
    -   资源监视器 -> 打开关联的句柄(下拉按钮) -> 输入框中输入文件名回车 -> 查到的记录右键结束
-   设置开机自启 SVN（需要在有管理员权限的命令行执行）
    -   `sc create SVNServer binPath= "D:/xxxx/svnserve.exe --service -r D:/xxx/顶层仓库" start= auto depend= Tcpip`
        -   SVNServer：服务名称
        -   --service ：window 模式
        -   start：auto 自动
    -   `net start SVNServer`:手动启动
    -   `net stop SVNServer`:手动停止
    -   `sc delete SVNServer`:停止后删除服务
    -   成功案例：`sc create MySVNServer2 binpath= "\"C:\Program Files\TortoiseSVN\bin\svnserve.exe\" --service -r E:/lzo-project/svn-root" depend= Tcpip start= auto`
    -

## 服务

### 包管理工具

-   win10 微软的终端包管理工具

    -   Winget 目前使用 Manifest 来管理和安装软件（可以理解为：软件源），通过读取对应的 Manifest 清单来寻找软件
    -   [winget](https://github.com/microsoft/winget-cli/releases):直接双击安装(Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle)
    -   微软商店:搜索`应用安装程序`
        -   `winget`:查看帮助
            -   search 查找并显示程序包的基本信息
                -   `模糊查找`出需要安装的`包名`
                -   `winget search`:查看所有可安装的包
            -   install 安装给定的程序包
            -   show 显示包的相关信息
            -   source 管理程序包的来源
            -   list 显示已安装的程序包
            -   upgrade 升级给定的程序包
                -   `winget upgrade --all`:升级所有软件包
            -   uninstall 卸载给定的程序包
            -   hash 哈希安装程序的帮助程序
            -   validate 验证清单文件
            -   settings 打开设置
            -   features 显示实验性功能的状态
            -   export 导出已安装程序包的列表
            -   import 安装文件中的所有程序包
        -   `wingetcreate`:将软件包提交到社区仓库，可以同感 winget 安装
    -   `scoop` 或者 `chocolately`:不是官方出的但是更加成熟
        <!-- -   PowerShell 使用 scoop

        -   `199.232.4.133 raw.githubusercontent.com`:配置 hosts
        -   `iex (new-object net.webclient).downloadstring('https://raw.githubusercontent.com/lukesampson/scoop/master/bin/install.ps1')`:官网安装
        -   `scoop uninstall scoop`:卸载 scoop 以及安装的所有软件 -->

-   Scoop [官网](https://scoop.sh/) [中文网](https://typoraio.cn/#)

G   -   要求：`Win7+ / PowerShell5+`,管理员身份运行 PowerShell
    -   $PSVersionTable.PSVersion | git-host
    -   参数列表

    ```shell
    # 1
    Set-ExecutionPolicy RemoteSigned -scope CurrentUser
    # 2 设置默认安装路径
    $env:SCOOP='D:\Scoop'
    [Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
    # 3
    iwr -useb get.scoop.sh | iex
    
    # 未能创建 SSL/TLS 安全通道解决方案
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    # 连接关闭发送错误
    iex (new-object net.webclient).downloadstring("https://raw.githubusercontent.com/lukesampson/scoop/master/bin/install.ps1")
    
    # 执行scoop 不报错安装完成 
    "
    alias    别名管理别名
    bucket    仓库管理
    cache    缓存显示或清除下载缓存
    checkup    检查潜在问题
    cleanup    通过删除旧版本清理应用程序
    config    配置获取或设置配置值
    create    创建自定义应用程序清单
    depends    应用程序的依赖项列表
    export    导出（可导入）已安装应用程序的列表
    help    帮助显示命令的帮助
    hold    按住应用程序以禁用更新
    home    主页打开应用程序主页
    info    信息显示有关应用程序的信息
    install    安装应用程序
    list    列出已安装的应用程序
    prefix    prefix返回指定应用程序的路径
    reset    重置应用程序以解决冲突
    search    搜索可用的应用程序
    status    状态显示状态并检查新的应用程序版本
    unhold    取消挂起取消挂起应用程序以启用更新
    uninstall    卸载应用程序
    update    更新应用程序，或独家报道自己
    virustotal    virustotal在virustotal.com上查找应用程序的哈希
    which    定位一个填充程序/可执行程序（类似于Linux上的“which”）
    "
    
    # 安装 aria2 进行多线程下载提高速度
    scoop install aria2
    scoop config aria2-enabled false #关闭
    # 安装一下必要包
    scoop install 7zip innounp dark
    
    # 导出软件列表拥有备份与换机
    scoop export > scoop.txt
    
    # 添加其他 bucket 软件库 `scoop bucket add [软件源名字] [源地址]`
    # 查看 bucket 官方提供软件库列表（可添加）
    scoop bucket known
    
    extras # 诸多有用的软件都在里面
    main # 默认的大仓库
    nerd-fonts # 编程字体一览无遗
    nonportable # 收录神奇的UWP应用
    versions # 收录软件包的历史版本
    ...
    
    # 添加/删除软件库
    scoop bucket add extras
    scoop bucket add java
    scoop bucket rm java
    
    # 社区提供
    scoop bucket add echo https://github.com/echoiron/echo-scoop
    scoop bucket add dorado https://github.com/chawyehsu/dorado
    scoop bucket add dodorz https://github.com/dodorz/scoop
    #合并仓库
    https://github.com/kkzzhizhou/scoop-apps
    scoop bucket add apps https://gitee.com/kkzzhizhou/scoop-apps
    # 搜索 软件名+Scoop 也许可以找到该软件被什么软件库收录
    # 常用软件
    #   quicklook:选择文件空格快速于然
    #   snipaste :截图工具
    #   motrix: 类似迅雷的开源轻量下载工具


    # 更换 Scoop 下载源
    #[参考](https://gitee.com/squallliu/scoop#install-scoop-to-a-custom-directory-by-changing-scoop)
    #[参考](https://gitee.com/squallliu/scoop)
    scoop config SCOOP_REPO https://gitee.com/squallliu/scoop
    scoop update
    
    ```

-   powerShell 美化

````shell
# 安装posh-git和oh-my-posh
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
# 卸载
Uninstall-Module posh-git
Uninstall-Module oh-my-posh

# 检测并初始化 Profile 文件
if (!(Test-Path -Path $PROFILE )) { New-Item -Type File -Path $PROFILE -Force }

# 打开配置文件
notepad $PROFILE

# 设置配置信息
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt Paradox #主 题

#可选主题
Paradox、robbyrussell、Agnoster、Avit、Fish、Darkblood、Honukai +、PowerLine、Sorin +、tehrob 等

#字体无法显示(https://www.nerdfonts.com/font-downloads)
#下载喜欢的Nerd字体然后右键选择`为所有用户安装`后更改PowerShell窗口的字体即可

linux其他终端 `DroidSansMono Nerd Font Blod`效果步长
···
-   win 命令终端 windows PowerShell
    -   微软商店下载`windows Terminal`
    -   [官方文档](https://github.com/microsoft/terminal)
    -   `$PSVersionTable`:PowerShell 终端下查看版本
    -   windows PowerShell 的配置
        -   `code $Profile`:打开配置文件
    -   `windows Terminal`配置文件

```shell
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions":
    [
      xxxx
    ],
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}", //默认打开的终端，通过guid
    "profiles":
    {
        "defaults": {
            "colorScheme":"Campbell",//默认配送方案
            "useAcrylic":true,//材质
            "startingDirectory": "D:/",//设置默认打开路径
            "acrylicOpacity":0.75//透明度
        },
        "list": //新增tab页面可以选择很多方案Ubuntu、git、cmd等等，也可以配置自己个性化指令记录
        [
            {
                "colorScheme": "Campbell",
                "commandline": "powershell.exe",
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "name": "Windows PowerShell"
                //"backgroundImage":"xxx" //powershell终端的背景图片
                //"backgroundImageOpacity":0.1 //powershell终端的背景图片透明度
            },
            {
                "commandline": "D:\\install\\Git\\bin\\bash.exe", //指令,可以是程序，也能是一些本地可以运行的指令,终端指令必须找到对于的bash程序
                "icon": "D:\\install\\Git\\mingw64\\share\\git\\git-for-windows.ico",//图标
                "name": "Git", //名称
                "hidden":false,"是否隐藏"
                "colorScheme":"xxx","设置单独的配色方案优先级高,"
                "guid":"{cd411374-e41f-49dd-8ace-4f2b42b6cffa}"
            },
            {
                "commandline":"D:\\install\\cmder\\vendor\\git-for-windows\\bin\\bash.exe"
            }
        ]
    },
    "schemes":
    [
        { //每一个配色方案 外观通过name选择这里的
            "background": "#2D323B",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#CCCCCC",
            "green": "#13A10E",
            "name": "Campbell",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#616161",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
    ],
    "theme": "dark"
}
````

### 美化

-   微软商店 安装 TranslucentTB
-   BitDock
-   MyDock

### 快捷键

-   `Alt + Shift + G`:谷歌
-   `Alt + Shift + U`:uTools
-   `Alt + Shift + V`:虚拟机

## window cmd

### win 命令
-   [官网](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)
-   内置命令

    -   基本使用

        -   `cd`
        -   `D:`:进入 D 盘
        -   `dir`:目录列表
            -   `/a`:所有文件
            -   `/ad`:查看所有文件夹，d 为属性之一
        -   `mkdir .\a\b\c\d`
        -   `rmdir a`:删除目录(rm 同样有效)
            -   `/s`:删除非空录入树
            -   `/q`:不要提示
        -   `ren oldname newname`:重命名(rename 同样有效)
        -   `copy fromName toName`:复制
        -   `move fromName toName`:`剪切`或`重命名`目录或文件
        -   `del path1 path2`:删除
        -   `attrib`:查看文件属性（R(只读)、A(普通文件)、S(系统文件，默认不显示)、H(隐藏文件)、。。。）
            -   `attrib +h +s * /s /d`:隐藏当前文件夹下所有文件（命令可以看到）
                -   attrib +h +s ./video /s /d
                -   attrib +h -s ./video /s /d
            -   `attrib +h * /s /d`:相当于系统的隐藏文件，可以同感查看隐藏文件显示出来
        -   `findstr`:类似 grep
        -   `echo xxx>filename`:创建文件

    -   `cls`:清屏，c+l只是把所以内容滚动到最上面
    -   `mstsc`:远程链接
    -   `compmgmt`:计算机管理 GUI
    -   `firewall.cpl`:打开防火墙
    -   `lusrmgr.msc`:打开用户与组
    -   `dcomcnfg|services.msc`:系统服务
    -   `devmgmt.msc`:设备管理器
    -   `gpedit.msc`:本地策略组编辑
    -   `dxdiag`:查看系统信息
    -   `diskmgmt.msc`:磁盘管理
    -   `taskmgr`:任务管理器
    -   `notepad`: 打开记事本
    -   `calc`:计算器
    -   `winver`:win 版本
    -   `systeminfo`:查看系统信息
    -   `tasklist`:查看正在运行的程序
    -   `driverquery`:查看已安装的驱动程序
        [xxx](https://www.cnblogs.com/hbbpb/archive/2007/09/06/883876.html)
    -   常用 cmd 终端指令
        -   `指令 /?`:查看帮助
        -   `指令 /help`:查看详细帮助
        -   `color /? `:列出可以设置的颜色
            -   `color 0a`:设置颜色
        -   `title 'xx'`:设置标题
        -   `date`:修改日期
            -   `date /T`:查看日期
        -   `time`:修改时间
            -   `time /T`:查看时间
        -   `start`:启动一个单独窗口或运行指定程序
        -   `tasklist`:查看当前计算机或远程正在运行的列表
            -   远程 `tasklist /S 远程IP /U 用户名 /P 密码`
            -   `/FI "PID EQ 12345"`:筛选 PID 为 12345 的进程
        -   `taskkill`:结束进程
            -   `/PID 进程pid`
            -   `/IM 进程名称`:`/FI` 筛选时可以用通配符\*
                -   `/T`:同时杀死紫荆城
            -   `/F`:强制关闭
        -   `tree`:树形查看文件
            -   `/F`:可查看文件
        -   `shoutdown`:关机相关
            -   `/i`:图形设置，必须第一个
            -   `/s`:`关闭`计算机
                -   `/sg`:开机自动登录关闭时的账户
            -   `/r`:`重启`
            -   `/h`:`休眠`
            -   `/t xxx`:设置几秒后关闭
            -   `/a`:`终止`关闭
            -   `/f`:`强制`关闭
            -   `/m \\computer`:连接远程
        -   计划任务
            -   `at`:at 22:00(时间) /every:xxx 指令
            -   `schtasks`:[待研究](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/schtasks-create)
        -   环境变量
            -   `set`:查看系统的环境变量列表
            -   `echo %变量%`:查看指定变量
            -   `set COUNT=COUNTVALUE`:设置环境变量
            -   `set COUNT=`:删除环境变量
        -   用户与组`lusrmgr.msc 打开GUI`(终端以管理员身份打开)
            -   用户
                -   `net user`:查看用户列表
                -   `net user lzoxun`:查看用户详细信息
                -   `net user <user-name> /delete`:删除用户
                -   `net user <user-name> <user-pwd> /add`:添加用户
                -   `net user <user-name> /active:no`:禁用用户，yes 取消禁用
            -   组
                -   `net localgroup`:查看组列表
                -   `net localgroup <group-name>`:查看组信息以及成员
                -   `net localgroup <group-name> <user-name> /add`:向组中添加用户
                -   `net localgroup <group-name> <user-name> /delete`:用户删除这个本地组
            -   其他 net
                -   `net start SVNServer`:手动启动
                -   `net stop SVNServer`:手动停止
        -   网络
            -   `ping ip`:查看是否连通（win ping 4 次会自动结束）
                -   `ping 127.0.0.1`:查看本地网卡是否正常
            -   `telnet`: 需要开启
            -   `ipconfig`:ip
                -   `ipconfig /release`:释放 IP
                -   `ipconfig /renew`:重新获取 IP
                -   `ipconfig /flushdns`:刷新 DNS(也许可以解决一些网络故障)
            -   `tracert ip或域名`:路由检测，探测本地主机与远程 ip 设备到底经过多少网络设备（IP 地址）才能进行正常的连接
                -   测试局域网内基本一跳,百度十几跳
            -   `arp`:显示与修改 IP 到物理地址转换表
            -   `netstat`
                -   `-a`:显示所有链接以及监听端口
                -   `-n`:数字 IP 形式人性化显示
                -   `-o`:显示进程 ID
                -   属性
                    -   状态
                        -   LISTENING:处于监听状态(等待连接)
                        -   ESTABLISHED:建立连接成功
                        -   TIME_WAIT：超时没有连接成功
                -   运用
                    -   已知端口被占用，`netstat`通过端口找到对于`PID`
                    -   通过`tasklist |findstr PID`:找到进程名
                    -   `taskkill` 通过名称杀死进程，单个进程的话跳过上一部直接通过 PID 杀死进程
            -   `netsh`:网络配置
                -   `netsh dump > d:/共享文件/lenovo-netshbak.txt`:备份网络配置
                -   `netsh`:进入交互环境
                    -   `int ip`:进入 ipv4
                    -   `dump`:查看 ipv4 所有信息
                    -   `set address name="WIFI" source=static addr=192.168.xxx.xxx mask=255,255,255,0`
                        -   图形界面网络适配器 WIFI 的的 IP 地址和子网掩码就不是自动获得的了,而是上面变成设置了的
                    -   `set address name="WIFI" source=dscp`
                        -   自动获取 IP 正常
                -   处理网络故障方案
                    `netsh winsock reset`:winsock 协议配置有问题会导致网络故障，通过充值该目录来恢复网络
                    `netsh int ip reset c:\resetlog.txt`:重置 TCP/IP，恢复到安装系统是的状态
                -   netsh 设置防火墙入站规则(`firewall.cpl 打开GUI`)
                    -   `netsh firewall`:简单模式设置（已弃用）
                        -   `netsh firewall set portopening TCP 33333 ENABLE`
                        -   `netsh firewall delete portopening TCP 33333`
                    -   `netsh advfirewall`:高级模式设置
                        -   `netsh advfirewall firewall add rule name=wallname dir=in action=allow protocol=TCP localport=33333`:防火墙添加入站规则（dir=out 出站）
                        -   `netsh advfirewall firewall delete rule name=wallname protocol=TCP localport=33333`:防火墙删除入站规则
                -   操作防火墙
                    -   `netsh advfirewall show allprofile state`:查看防火墙状态
                    -   `netsh advfirewall set allprofiles state off`:关闭所有防火墙
                    -   `netsh advfirewall set allprofiles state on`:启用所有防火墙
                -   `netsh wlan`获取已连接过的 WiFi 密码
                    -   `netsh wlan show profiles`:获取链接过的 WiFi
                    -   `netsh wlan show profile name="manja" key=clear"`:获取链接过的 WiFi
    
-   外部扩展命令
    -   自己安装程序配置 node、npm

### 功能

-   命令行共享
    -   `net share`:查看本地共享的文件夹(与计算机管理-共享下的列表一样)
    -   `net share 共享名 /delete`:删除共享
    -   `net share myshare=d:\testdir`:创建共享
    -   `>net view \\192.168.192.1`:查看创建的共享
-   无法找搜索到别人共享的处理方法
    -   1、双方控制面板\网络和 Internet\网络和共享中心\高级共享设置 打开公共文件共享
    -   2、关闭对方防火墙(或将对方防火墙网路发现的公用私用打钩允许)
    -   3、关闭对方控制面板\程序\程序和功能->启用关闭 widows 功能 勾掉 `SMB 1.0/CFLS 文件共享支持`
    -

### bat 批处理

-   格式: `@echo off`开头 xxx 代码 `pause`结束的 `bat`程序
-   算术运算符
    -   `set /a num = 3-1`:set 指令 /a 代表进行算数运算
        -   `echo %num%`:输出变量，变量需要百分号分格
-   语句

    -   `echo` :输出

-   bat

```bat
"1.bat
call 2.bat "调用其他文件
```

## 系统优化

-   `powercfg -h off`:管理员关闭休眠文件(自动删除 C 盘下的很大 hiberfil.sys )
-   `http://veger.ys168.com/ 下载 SpaceSniffer汉化版.zip`:查看资源占用大小，或从系统-储存里面查看
-   `%Temp%`:删除里面的文件
-   `C:盘 右键清理磁盘`:选择要删除的

### PowerShell 常用命令

-   `Get-Command -Name vim`:查看程序所在路径
//192.168.3.24/共享文件 /mnt/window cifs defaults,username=liaozx,password=liaozx123

### window 快捷键

#### Win
-   `win`：显示隐藏菜单
-   `win + T`：循环浏览任务栏的程序
-   `win + R`：运行
    -   `control`：控制面板
    -   `appwiz.cpl`：卸载程序
    -   `dir path`：打开相应文件夹
-   `win + D`：显示桌面
-   `win + E`：打开资源管理器
-   `win + L`：锁定计算机
-   `win + M`：最小化所有被打开的窗口
-   `win + I`：设置
-   `win + Tab`：虚拟桌面
-   `win + ↑↓ ← →`:打开程序窗口排版
    -   `上中下`：最大化/默认状态/最小化隐藏
    -   `左中有`：左半屏/默认状态/右半屏
-   `win + G`：屏幕录制
-   `win + Alt + PrintScreen`：屏幕截图
-   `win + Home`：清除窗口，保留当前
-   `win + ctrl + D`：新建桌面(win + tab切换)
-   `win + x`：系统功能菜单
    -   `win + x uu`：快速关机
-   `win + v`：系统剪切板

#### Ctrl
-   `Ctrl + ESC`：win 菜单
-   `Ctrl + Shift + ESC`：打开任务管理器 
-   `Ctrl + (Shift)? + Tab`：切换浏览器tab

#### Alt
-   `Alt + F4`：关闭当前应用程序
    -   桌面使用可以关机
-   `Alt + Tab`：切换打开的应用程序
-   `Alt + Enter/双击`：查看文件属性
-   `Alt + 左/右`：文件管理器左右移动
-   `Alt + Ctrl + Delete`：打开任务管理器

#### Shift
-   `Shift + F10`：右键菜单
-   `Shift + delete`：永久删除文件








-   `win + A`：操作中下(消息通知、wifi、网络等)
-   `win + B`：任务栏右边工具(输入法网络。。。)
-   `win + P`：投影仪输出设备
-   `win + U`：辅助工具管理器
-   `win + Q`：小娜语音
