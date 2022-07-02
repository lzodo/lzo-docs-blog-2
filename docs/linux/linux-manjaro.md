---
title: linux-manjaro
---

## 操作

### 常用功能

-   输出系统基本信息:`sudo screenfetch`
-   强制关机:`sudo shutdown now`
-   升级系统:`sudo pacman -Syyu`
-   显示文件系统的磁盘使用情况:`sudo df -h 或 sudo df -hT`

### 快捷健

-   设置快捷（设置-键盘-应用与快捷健-添加选择程序-确定-选择键位）
    -   `xfce4-terminal`：终端串口; 我的设置：`win+shift+T`
    -   `xflock`：锁定; 我的设置：`ctrl+alt+delete`
-   终端

    -   `shift+ctrl+C`：复制
    -   `shift+ctrl+P`：粘贴
    -   `shift+ctrl+E`：在终端中打开新终端
    -   `shift+ctrl+T`：打开标签页

-   界面窗口

    -   系统快捷健（设置-窗口管理器-快捷健）
        -   `win+D` ：回到桌面
    -   系统窗口
        -   `ctrl+alt+f`：文件管理器
        -   `alt+F1`：系统菜单
        -   `alt+F2`：应用程序查找器
        -   `ctrl+alt+m`：任务管理器
        -   `xfce4-settings-manager`：设置
        -   `ctrl+esc`：右键菜单
    -   `exo-open path`：`xfce`图形界面打开指定文件夹

## manjaro 的指令

-   `pacman`:自带包管理工具

    -   `-S`:安装
    -   `-Ss`:搜索
    -   `-Syy`:更改/etc/pacman.conf 添加源后 ，更新软件包数据库
    -   `-Syu`:更改系统本身
    -   `-Sc`:清除缓存
    -   `-Scc`:清除已下载的安装包
    -   `R`:删除服务,不能停顿太久
    -   `Rs`:删除服务，以及相关依赖
    -   `Rns`:删除服务，以及相关依赖,以及全局变量

    -   `Q`:查询已安装程序
    -   `Qe`:查询自己安装的程序
    -   `Qeq`:查询自己安装的程序（不显示版本号）
    -   `Qs key`:查询本地名字有 key 的程序
    -   `Qdt`:不需要的软件
    -   `pacman -R $(pacman -Qdtq)`:删除不需要的软件，最后 q 去除版本号
    -   `whereis name` 查询程序安装位置

-   `/etc/pacman.conf`:pacman 配置文件 添加源,
    -   `Color`:设置高亮变色

## 新机配置

### 配置源

-   配置镜像源
    -   `sudo pacman-mirrors -i -c China -m rank` :存在/etc/pacman.d/mirrorlist
-   设置 archlinuxcn 源,antergos 源,arch4edu 源:`sudo vi /etc/pacman.conf`

```shell
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

[antergos]
SigLevel = TrustAll
Server = https://mirrors.tuna.tsinghua.edu.cn/antergos/$repo/$arch

[arch4edu]
SigLevel = TrustAll
Server = https://mirrors.tuna.tsinghua.edu.cn/arch4edu/$arch


sudo pacman -Sy #安装 archlinuxcn、antergos、arch4edu
```

-   更新源列表
    -   sudo pacman-mirrors -g
-   同步并优化（类似磁盘整理，固态硬盘无需操作）
    -   sudo pacman-optimize && sync
-   升级系统

    -   sudo pacman -Syyu

-   导入 GPG Key

    -   sudo pacman -S archlinuxcn-keyring
    -   sudo pacman -S antergos-keyring

-   安装 `ARU `包管理工具

    -   `sudo pacman -S yay fakeroot binutils` yay 与需要用到的包基本工具不然最后肯会报错
    -   `yay --aururl "https://aur.tuna.tsinghua.edu.cn" --save` #这一句会被添加到/.config/yay/config.json
    -   `yay -P -g`

    -   安装谷歌
        -   `yay -S google-chrome`

### 搜狗输入法

-   fcitx
-   fcitx-configtool
-   fcitx-sogoupinyin
-   配置文件
    -   添加输入法配置文件 sudo vim ~/.xprofile
    -   export GTK_IM_MODULE=fcitx
    -   export QT_IM_MODULE=fcitx
    -   export XMODIFIERS="@im=fcitx"

### oh-my-zsh 终端美化

-   基本配置
    -   查看本地 `/etc/shells` 是否有 zsh (没有就安装)
    -   安装 `oh-my-zsh`
        -   centos安装
        ```shell
        wget https://gitee.com/heyuanfly/install-oh-my-zsh/raw/master/centos-install-oh-my-zsh.sh
        chmod +x centos-install-oh-my-zsh.sh
        ./centos-install-oh-my-zsh.sh
        ```
    -   根据提示将 .zshrc 复制到本地 ~/.zshrc
    -   将 shell 切换到 /bin/zsh `chsh -s /bin/zsh`
    -   重启
    -   source ~/.zshrc
-   主题
    -   .zshrc 中 ZSH_THEME="主题名称"
    -   主题都在 `/usr/share/oh-my-zsh/theme`下
    -   推荐主题:`duellj`、`suvash`、`xiong-chiamiov`、`pygmalion`、`fino`、`steeef`、`ys`,`norm`
-   zsh vi 模式(使用 vim 快捷键)
    -   .zshrc 添加 bindkey -v
-   [插件扩展 powerlevel10k](https://github.com/romkatv/powerlevel10k/blob/master/README.md#oh-my-zsh)
    -   `p10k configure`:第一次需要配置，这样重新配置
-   命令行高亮
    -   yay -S zsh-syntax-highlighting zsh-autosuggestions
    -   如果不生效
        -   sudo ln -s /usr/share/zsh/plugins/zsh-syntax-highlighting /usr/share/oh-my-zsh/custom/plugins/
        -   sudo ln -s /usr/share/zsh/plugins/zsh-autosuggestions /usr/share/oh-my-zsh/custom/plugins/

### 安装程序

-   源码安装程序
    -   `解压包`、进入目录执行`./configure` 检测、`make&&make install`
-   安装 bed 程序
    yay -S debtap sh ~/.vim_runtime/install_awesome_vimrc.sh#安装包
    sudo debtap -u #升级
    sudo debtap xxxx.deb #解压
    #debtap -q xxx.deb #静默解压
    sudo pacman -U x.tar.xz #安装

### wifi 设置

-   iw dev 查看 interface 后面无线网卡名
-   安装 create_ap
-   rm -f /tmp/create_ap.all.lock
-   sudo create_ap 无线网卡名 无线网卡名 热点名 热点密码
-

### 与 window 共享

-   安装: `cifs-utils`
-   共享: window 新建共享文件夹->高级共享中设置`共享名称` -> 权限给予`读写执行`
-   挂载: mount -t cifs -o username="Administrator",password="1" //192.168.12.40/nmon /mnt/share
    -   mount -t cifs -o username="win 用户名",password="密码" //win ip/共享名称 挂载目录
    -   ls /mnt/share 查看共享文件
-   自动挂载 `/etc/fstab`
    -   //192.168.12.40/nmon /mnt/share cifs defaults,username=名字,password=你的密码
    -   //192.168.3.24/共享文件 /mnt/window cifs defaults,username=!·ujcliaozx,password=ujcliaozx123

### 启动项

-   将 desktop 放到~/.config/autostart 、
-   开机黑色问题
    -   `/etc/default/grub`
        -   注释 hidden 那一行
        -   去除下面的 quiet
    -   `update-grup`:跟新

### 快捷服务

-   `node-fanyi`:终端翻译
-   `Typora`:Markdown 编辑器

### 全局菜单

-   vala-panel-appmenu-common
-   vala-panel-appmenu-registrar
-   vala-panel-appmenu-xfce
-   appmenu-gtk-module(我没有装)
-   状态面板首选项-项目-添加全局菜单-重启
-   xfconf-query -c xsettings -p /Gtk/ShellShowsMenubar -n -t bool -s true
-   xfconf-query -c xsettings -p /Gtk/ShellShowsAppmenu -n -t bool -s true

### Albert 搜索插件

-   安装
-   勾选 Autostart on login 自动登录
-   第一项就是快捷键

### 添加主题

-   WhiteSur
    -   `WhiteSur-Gtk-theme`:主题
    -   `WhiteSur-icon-theme`:图标
    -   `WhiteSur-cursors`:指针
-   安装成功 “开始菜单-->设置管理->外观设置" 中选择

### screenfetch

-   CentOS screenfetch
    cd /usr/local/src
    git clone https://github.com/KittyKatt/screenFetch.git
    git clone https://github.com/liaozhongxun/screenFetch.git
    cp screenFetch/screenfetch-dev /usr/local/bin/screenfetch
    chmod 755 /usr/local/bin/screenfetch

### fzf 全局搜索插件[参考](https://zhuanlan.zhihu.com/p/41859976)

-   快捷键
    -   `c+n|c+p|鼠标滚轮`:上下移动关闭
-   结合 vim
    -   `vim $(fzf)`：终端直接通过 vim 打开 fzf 搜索到的文件
    -   `cd $(find * -type d | fzf)`：进入 fzf 搜索到的文件夹
    -   `ranger $(find * -type d | fzf)`：ranger 打开 fzf 搜索到的文件夹
    -   `git checkout $(git branch -r | fzf)`:快速切换 git 分枝

    -   `:Files`:搜索文件
        -   `c+jk`:上线移动

-   安装fd-find[github](https://github.com/sharkdp/fd)
centos需要原码安装 
```shell
wget https://github.com/sharkdp/fd/releases/download/v8.4.0/fd-v8.4.0-aarch64-unknown-linux-gnu.tar.gz
replace 下载相应版本

tar -zxvf fd-v7.4.0-x86_64-unknown-linux-*.tar.gz
cd fd-v7.4.0-x86_64-unknown-linux-*

cp ./fd /usr/local/bin/
cp ./fd.1 /usr/local/share/man/man1/
mandb
```
```shell
#界面展示这些参数在 fzf --help 中都有，按需配置即可 highlight 预览高亮可能需要安装
export FZF_DEFAULT_OPTS="--border --preview '(highlight -O ansi {} || cat {}) 3> /dev/null | head -500'"
# fzf查找配安装 fd-find
export FZF_DEFAULT_COMMAND="fdfind --exclude={.git,.idea,.vscode,.sass-cache,node_modules,build} --type f --hidden"
```
```shell
" fzf#install() 确保你安装了最新的 fzf
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
```

[资料](http://einverne.github.io/post/2019/08/fzf-usage.html)

-   结合 ranger

### nvme

### tmux 终端复用

-   配置文件:`~/.tmux.conf`

    -   `unbind C-b,set-option -g prefix C-c`:跟换激活键为 Ctrl+c
    -   跟换分屏键
        -   bind h split-windwo -h
        -   bind v split-windwo -v
        -   unbind '"'
        -   unbind %
    -   主题包 oh-my-tmux

    ```shell
    $ cd #进入用户主目录
    $ git clone https://github.com/gpakosz/.tmux.git
    $ ln -s -f .tmux/.tmux.conf  #创建软连接
    $ cp .tmux/.tmux.conf.local . #复制local文件到当前文件夹 可以覆盖默认配置
    # tmux source-file ~/.tmux.conf  从新加载配置
    ```

-   终端-编辑-首选项-勾选运行一个自定义命令-填写 tmux(默认直接打开 tmux)
-   作用分屏、托管进程、复用终端
-   会话

    -   `tmux new -s flask` :新建会话
    -   `ctrl+b`:进入激活状态，习惯设置 ctrl+a
        -   会话快捷键
            -   `d`:分离会话
            -   `s`:会话列表
            -   `$`:重命名会话
        -   窗口(新建会话进入窗口)
            -   `c`:新建窗口
            -   `&`:关闭窗口
            -   `l`:切换窗口
            -   `n`:切换下一个窗口
            -   `p`:切换上一个窗口
            -   `<number>`:指定编号窗口
            -   `w`:窗口菜单列表
            -   `,`:重命名窗口
        -   窗格|面板(分屏之后产生窗格)
            -   `%`:水平分屏
            -   `" 、-`:垂直分屏
            -   `x`:关闭窗格
            -   `;`:切换窗格
            -   `!`:拆为独立窗格,变窗口
            -   `z`:全屏显示窗格,隐藏其他
            -   `q`:窗格编号
            -   `o`:逆时针切换窗格
            -   `Ctrl+o`:把其他窗格切换到当前窗格位置
        -   `:`:输入指令
        -   保存
            -   激活状态 -> d 关闭会话 -> 任意终端`tmux attach -t 会话名称`启用
            -   可以多用户共享同时操作
        -   其他
            -   `tmux ls`:查看 tmux 列表
            -   `tmux kill-session -t <session-name>`:彻底杀死会话
            -   `set -g mouse on`:允许鼠标操作
            -   `set -g mode-mouse on`:开启鼠标模式
            -   `set -g mouse-select-pane on`:允许鼠标选择窗格

-   面板
    -   分屏之后产生窗格
-   复制粘贴
    -   `ctrl+b+[`:进入复制模式，选择内容直接复制
    -   `ctrl+b+]|c+s+v`:粘贴
    -   ctrl+b,[ 进入复制模式，此时可以鼠标选择，松开复制，ctrl+b, ] 粘贴
-   设置窗格大小
    -   `ctrl+b,H J K L`,不能停顿太久
        
#### tmux 插件管理
-   保存会话
```shell
# 如果没有tpm
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

set -g @continuum-save-interval '15'
set -g @continuum-restore 'on'
set -g @resurrect-capture-pane-contents 'on'
# Other config ...
# run -b '~/.tmux/plugins/tpm/tpm'

tmux source ~/.tmux.conf 

PREFIX + I: 安装插件
PREFIX + CTRL s：保存会话
PREFIX + CTRL r：加载会话
```
### seahorse

-   在终端输入 seahorse 打开管理密钥环的软件，视图->根据密码环 在密码区会有一个“登录”为名字的密钥环，右击将其删除。
    -  如果无效:右键默认秘钥环，修改密码，输入旧密码，新密码留空直接继续再继续

### dwm 动态窗口管理器

-   `/etc/X11/xinit/xinitrc` exec 设置默认启动
-   下载 `http://dwm.suckless.org/`
    -   `Development clone addr`

### autojump 快速进入搜索到的目录

-   必须`[[ -s /etc/profile.d/autojump.sh ]] && source /etc/profile.d/autojump.sh`加入.bashrc 中
-   `j <dir-name>`:模糊匹配，autojump 是基于数据库记录的，只有你敲击有了记录，才能正常使用
-   `j --stat|grep key`:查看权重
-   `jo <dir-name>`:在终端直接打开包含 foo 字符串`目录`的`文件管理器`
-   `jc <dir-name>`:进入字符串目录的`子目录`
-   `joc <dir-name>`:进入字符串目录的`子目录`的`文件管理器`
-   手动安装
    -   git clone git://github.com/joelthelion/autojump.git
    -   ./install.py
    -   按照提示 [[-s ~/.autojump/etc/profile.d/autojump.zsh]] && . ~/.autojump/etc/profile.d/autojump.zsh
    -   source .zshrc
-   缓存数据库位置:`~/.local/shart/autojump/autojump.txt`

### lazygit
[参考](http://blog.csdn.net/cumo3681/article/details/107407815)
```shell
#手动安装
```

####  面板(左右或HL或tab键切换面板)
    -   面板的切换:左右、HL、tab、12345等进行面板切换
    -   上线或JK切换`面板内的行`
    -   有时候同一个键在不同面板的作用是不一样的
    -   左边面板
    -   右边面板(预览界面)
#### 面板一(Status)
-   显示库名与分支

#### 面板二(Files 文件面板)
    -   `a`:所以文件在赞成与取消暂存间切换
    -   `空格`：单个文件状态 
    -   `d`:删除单文件更改  
    -   `D`:第一项 直接清空所以更改
    -   文件内容操作
        -   上下选择文件
            -   回车进入文件， 选择需要提交的行，`按空格`，内容就会从未暂存更改添加到Status Changes有赞成面板,双向的
            -   `e`:直接修改选择的文件   

#### 面板三(Local Branschs 分支面板)
    -   `n`:新建分支
    -   `空格`：选择分支
    -   `o`:打开远程项目该分支页面
        -   将当前选择分支，与GitHub远程选择的分支进行比较，
    -   注意事项
        -   切换分支前将将修改做一次commit提交
        -   未追踪的文件,只要没有commit，本地的那些更改都不会属于哪一个分支，commit后切换分支，更改才会消失
    -   合并分支
        -  切换主分支
        -  光标定位到，更改的分支
        -  ctrl+M ,将更改内容合并到组分支
        -   冲突
            -   文件面板尝试UU变色文件
            -   进入文件，选择正确的修改，空格确定
            -   进入文件，b，两个都要保留
#### 面板四(Commits 提交版本管理)
-   选择提交
    -   `d`:删除提交
    -   `z + ctrl-z`:撤销删除，取回刚刚删除的提交
    -   `g`:选择指定commit,按g重置到此次提交
        -   `soft reset`：保留修改的文件，并重置到暂存
        -   `mixed reset`：保留修改的文件，并重置位暂存
        -   `soft reset`：直接回到指定提交，不保留文件
#### 面板五(Status)
#### 操作
-   普通功能
    -   `x|?`:显示所在面板区域可以使用的功能以及快捷键
    -   `+`:面板扩展半屏
    -   `@`:显示命令日志(lazygit操作对应的git指令)
        -   Focus command log:打开指令面板
    -   `:`:自己输入git指令，或终端指令
    -   `[]`:切换面板上的标签
-   提交
    -  文件面板: a(暂存全部) => c(提交并输入提交备注-> jcommit面板新增提交记录) => P(push)；p(pull)
-   配置文件
    -   `~/.config/lazygit/config.yml`
-   提交更新到别人的项目
    -   fock项目
    -   本地克隆，新建分支
    -   `[]`切换分支到remote    
    -   `n`添加远程连接，名称upstream,地址:fock前源作者的该项目地址?有点问题
    -   更改完成提交，选择分支o,打开create pull request ,打开GitHub的gui界面合并
    -   提交成功对方界面会出现`Compare & pull request`的提示
    -   base username/barnch <- 提交人的仓库/branch3   选择好谁的哪个分支到base的哪个分支
    -   填写备注信息 -> 点击Create pull request按钮
    -   原作者的`pull requests`标签中就多出来刚刚的提交，点进去Converseation点击Merge pull request通过请求
    -   自己项目可以这样通过gui合并，但是自己的可以直接在项目中合并
### plank || latte-dock

### 实时资源监控插件 conky

### 终端文件管理器 ranger

-   基础操作
    -   上下左右
    -   vim 快捷键
    -   [、]:上下切换所在目录`上级目录`的 `文件或目录`
    -   退出
        -   `q`:退出到打开的位置
        -   `shift+S`:终端进入当前选择的目录 并 退出
-   功能
    -   `o` 排序模式(`当前文件夹`)
        -   `os`：文件从大到小
        -   `on`：文件名排序
        -   `oc`：修改日期排序
    -   `/`:搜索
        -   `n/N`:向下或上查找
    -   `cw|a|A`:重命名
    -   复制粘贴删除
        -   `dd`:剪切
        -   `dD`:删除
        -   `yy`:复制
        -   `pp`:粘贴https://github.com/ranger/ranger/wiki/Plugins
            ranger - `po`:粘贴并覆盖
        -   `yp`:复制路径
        -   `dU`:查看文件大小
    -   `v`:选择目录下文件
    -   `w`任务管理器
    -   `zh`:显示隐藏文件
    -   `r`:选择当前文件打开方式，或者`:code `这样动态指定打开方式
-   书签
    -   `m` 加 任意键创建
    -   \` 打开
    -   `um` 删除
-   标签(窗口)
    -   `gn|ctrl+n`:创建
    -   `gt|gT`:切换
    -   `gc|ctrl+w`:关闭 eeep
-   其他
    -   gh:用户主目录
    -   gr:根目录
-   特殊功能
    -   `:`: 命令操作
    -   `!`: `:shell`快捷键，更多shell命令,:shell mv dir1 dir2, %s 代表选择的文件
-   配置文件夹`~/.config/ranger`

    -   如果要用自己的配置文件,环境变量设置: RANGER_LOAD_DEFAULT_RC=FALSE
    -   `ranger --copy-config=all`:生成配置文件
    -   插件
        -   [GitHub](https://github.com/ranger/ranger) -> wike -> 右侧 plugins,安装插件
    -   添加方法
        -   wike -> 右侧 Custom Commands ->复制到配置文件`commands.py` -> `rc.conf`添加快捷键
    -   `rc.conf`:配置
        -   `set vcs_aware true`:显示 git 状态符号
        -   `set preview_已经写死了，需images true && set preview_images_method w3m`:用 w3m 预览图片(需要安 w3m)
        -   `map f console scout -ftsea%space`:f 搜索 X

-   修改默认文本编辑器

    -   echo export EDITOR=/usr/bin/vim >> ~/.bashrc
    -   echo export EDITOR=/usr/bin/vim >> ~/.zshrc

-   批量操作文件
    -   批量重命名
        -   按 v 全选文件，或按空格选择单个文件
        -   :bulkrename 回车 进入 vim 编辑模式
        -   修改文件名
        -   保存退出
        -   cw 单个文件命名
    -   批量删除
        -   按空格选定多个dD 回车 y 回车

#### 异常
默认情况下root账号是不能预览的,注释python源码
```shell
# /usr/local/lib/python3.6/site-packages/ranger/core/main.py
if fm.username == 'root':
    fm.settings.preview_files = False
    fm.settings.use_preview_script = False
    LOG.info("Running as root, disabling the file previews.")

```


### 终端模拟器

-   edex-ui

### man 汉化

[参考](https://www.cnblogs.com/yanans/p/11990603.html)

1、debian

```shell
sudo apt update
sudo apt install manpages-zh
```

2、arch

```shell
pacman -Syu
pacman -S man-pages-zh_cn man-pages-zh_tw
```

3、centos

```shell
yum update
yum install man-pages-zh-CN
```

4、Fedora

```shell
dnf update
dnf install man-pages-zh-CN
```

map 或 cmap

### 主目录默认功能文件夹位置设置(如桌面)

`vim ~/.config/user-dirs.dirs`

### 版本更新报错

1.首先更新一下密钥，如果没有安装 archlinux-keyring,请及时安装
sudo pacman-key --refresh-keys 2.重新加载相应的签名密钥
sudo pacman-key --init
sudo pacman-key --populate
3。清除 pacman 的缓冲文件
sudo pacman -Scc 4.更新或者安装系统即可
sudo pacman -Syu || sudo pacman -Syudd(-dd 跳过全部检测)\_

## 常用软件

### 我的服务

-   `copyq`:剪切板管理工具[参考](https://zhuanlan.zhihu.com/p/356994435)
-   `lrzsz`:虚拟机文件上传下载
-   `ydcv-rs|node-fanyi`:终端直接翻译程序
-   `vsftpd`:作用:使远程通过 ftp 上传下载 web 服务
-   `bat`:美化 cat 的文本内容
-   `at`:计划任务
-   `dstat`:强大的检测工具
-   `nmon`:系统资源监控
-   `xdroid`:linux 使用安卓软件
-   `keepassXC`:密码管理器
-   `flowblade`:视频剪辑软件
-   `variety`:壁纸
-   `flareget`:下载器
-   `baobab`:磁盘使用情况图形化分析
-   `netease-cloud-music`:网易云
-   `notepad++`:编辑轻量脚本代码
-   `dia`:linux 流程图软件
-   `ncdu`:统计指定文件下文件大小，通过数的方式
-   `ack`:类似grep查找文件内容的功能
-   `tldr cmd`:指令帮助简化文档，并添加场景用法举例,与**kmdr**功能类似
-   `colorls|exa`:ls指令加强版(gem install colorls),colors通过ruby安装
-   `caniuse-cmd`:检查浏览器兼容性(npm 安装)
-   `thefuck`:操作错误时，执行该命令，会告诉你为什么错 
    -   sudo pip3 install thefuck  python安装
-   `multitail|lnav|tial -f|cat...`:日志
-   `jq`:linux 终端查看，格式化json
-   `mycli`:终端mysql工具
-   `httpie`:终端数据请求获取 `http -v github.com`
-   `fpp(PathPicker)`:终端多文件操作，f|A,选择，回车默认编辑器打开,c 指令操作已选择
-   `rich`:`pip3`安装，针对py的颜色输出美化
-   `xargs`:管道前面标准输出，有些命令不能直接把输出当做自己的输入，可以用xargs
-   `bat`:`cat`加强班，高亮代码
-   `ripgrep`:可rg指令代替grep，速度快
-   `cmus`:终端音乐播放
-   `tmate`:将终端共享给别人
-   `howdio`
-   `ag(the_silver_searcher)`:搜索工具
-   `nvm`
-   `ascii`:ascii表
-   `curl cht.sh`:疑问查询  (curl cht.sh/js/class 指令/语言命名空间/功能)
-   `curl "wttr.in/福州?lang=zh"`:天气预报
-   `aria2`:下载工具

### 网上存储

-   yay -S vlc #视频播放器
-   yay -S mpv #视频播放器
-   yay -S gimp #图像编辑器
-   yay -S redshift #红移
-   yay -S haroopad #markdown 编辑器
-   yay -S Typora #markdown 编辑器
-   yay -S freeMind #思维图
-   yay -S pspp #spss
-   yay -S uget #下载工具
-   yay -S qbittorrent #BT 下载
-   yay -S zotero #文献管理软件
-   yay -S filezilla #FTP 工具
-   yay -S filelight #磁盘使用空间
-   yay -S hardinfo Extraterm#硬件检测工具
-   yay -S acroread #pdf 阅读
-   yay -S pdfsam #pdf 编辑
-   yay -S masterpdfeditor #pdf 阅读编辑

-   yay -s deepin-wine
-   yay -S deepin-wxwork #企业微信
-   yay -S deepin-wine-wechat #微信
-   yay -S deepin-qq-eim #QQ
-   yay -S deepin-baidu-pan #百度网盘
-   yay -S deepin-wine-tim #TIM
-   yay -S deepin-screenshot #截屏软件
-   ###另外：安装 QQ 可以参考[https://aur.archlinux.org/packages/deepin.com.qq.office/]
-   yay -S deepin.com.qq.office ##TIM
-   yay -S deepin.com.qq.im ## QQ

### 娱乐性工具

-   sl
-
