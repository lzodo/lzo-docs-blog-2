---
title: Git代码托管服务
---

常用远程托管平台[GigHub](https://github.com/) | [码云](https://gitee.com/) | [GitLab](https://about.gitlab.com/)

## 配置

### 用户配置

```shell
git config --global user.name "xxx"
git config --global user.email "xxx@qq.com"

git config --[local/global/system] obj.键 + 空格 + 值 //修改、添加配置
git config --[local/global/system] --unset obj.键  //删除配置

查看
git config --list
git config user.name

git 配置分为三部分
    1、本地配置位于本地仓库的隐藏文件夹.git/config 文件  默认以core开头
       git config --local --list (只 本地配置)

    2、全局配置位于用户的根目录下 .gitconfig  //需要进行过全局配置才会有该文件
       git config --global --list (只 全局配置)

    3、系统配置位于git的安装目录下
       git config --system --list (只 系统配置)

    (优先级依次降低 如果三个配置文件中都有同样的配置优先以本地为准)

命令行汉化
echo "alias git='LANG=zh_CN.utf8 git'" >> ~/.zshrc
```

> 操作完成之后信息保存在**C 盘的用户**下**.gitconfig**文件中，作用只是标识你是谁,与远程仓库账户无关

### 获取仓库

```shell
git init #生成隐藏文件夹.git
或
git clone 项目地址
```

### 工作区间

> 工作区：包含.git 版本库的目录  
> 暂存区：.git 版本库下的 index 文件就是暂存区(stage),是一个临时保存修改文件的地方  
> 版本库：项目文件夹下.git 隐藏文件夹就是版本库,储存这项目配置信息、日志信息、文件版本等  
> 远程仓库：

工作区 git add . 到暂存区 commit 版本库 push 远程仓库

### 文件状态

```shell
untracked : # 未跟踪(未被纳入版本控制)
tracked   : # 以跟踪(纳入版本控制)
    Unmodified # 未修改
    Modified   # 已修改
    Staged     # 已暂存

git status # 指令查看文件状态
```

### 从本地到远程仓库流程

```shell
mkdir project
cd project
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/liaozhongxun/project.git
git push -u origin master
```

## 指令

### 常用指令

```shell
git status [-s]# 查看文件状态
git add file|.|* # 将指定文件、所有新增编辑文件、所有编辑文件 添加到暂存区
git reset <file-name>           # 从暂存区 commit 的修改恢复指定到工作区
git reset -- .                  # 从暂存区恢复所有文件到工作区
git reset --hard                # 把暂存区的修改退回到工作区
git reset --hard HEAD~1         # 回头n个版本
git commit -m '日志信息' # 将暂存区文件提交到版本库(状态变为已跟踪未修改 看不到了)
git commit -a -m '日志信息' # 不用add 直接添加到版本库
git commit 回车(进入编辑器) --> i(进入编辑模式) --> esc (退出编辑模式) --> :wq(保存并退出)

git stash  # 工作区的修改和暂存区的修改
git stash pop # 恢复

git log # 查看日志记录
	commit id  重要
git log --oneline  //以简洁的一行显示，包含简洁哈希索引值
git log --pretty=oneline //查看日志且并且显示版本
git log --stat     //显示每个commit中哪些文件被修改,分别添加或删除了多少行
```

### 撤销

> git revert 是用一次新的 commit 来回滚之前的 commit，git reset 是直接删除指定的 commit。看似达到的效果是一样的，其实完全不同：  
> 1、上面我们说的如果你已经 push 到线上代码库，reset 删除指定 commit 以后，你 git push 可能导致一大堆冲突，但是 revert 不会。  
> 2、如果在日后现有分支和历史分支需要合并的时候，reset 恢复部分的代码依然会出现在历史分支里，但是 revert 方向提交的 commit 并不会出现在历史分支里。  
> 3、reset 是在正常的 commit 历史中，删除了指定的 commit，这时 HEAD 是向后移动了。而 revert 是在正常的 commit 历史中再 commit 一次，只不过是反向提交，它的 HEAD 是一直向前的。

-   撤销指定 commit
    -   reset(工作区回退)
        -   `git reset --hard commit_id`
            -   `--soft`:保留源码，只回退 commit 信息到某个版本，不涉及 index 的回退。如果还需要提交，直接 commit 即可。
            -   `--mixed`：会保留源码，只是将 git commit 和 index 的信息回退到了某个版本。（git reset 默认的就是--mixed 模式，即 git reset 等价于 git reset --mixed）
            -   `--hard`：源码也会回退到某个版本，commit 和 index 都会回退到某个版本。(注意这种方式是会改变本地代码仓库源码)
        -   当然有人在 push 代码以后，也使用 reset --hard 回退代码到某个版本之前。但是这样会有一个问题，你线上的代码没有变，线上 commit、index 都没有变，当你把本地代码修改完提交的时候你会发现全是冲突........所以，这种情况你要使用下面的方式
    -   revert
        -   同时回滚远程线上代码
        -   `git revert commit_id`
-   撤销工作区修改
    -   未跟踪
        -   `git clean -fd` 丢弃所有位跟踪
    -   未 add
        -   `git checkout files`
        -   `git checkout -- .` 撤销所有修改过没有add的改变
    -   已经 git add
        -   `git reset HEAD` 撤销暂存状态回到 add 前,再`git checkout files`回到修改前
        -   `git reset file`撤销指定文件
        -   `git reset`撤销所有文件
        -   `HEAD` 代表回到 HEAD 指向的 commit
    -   已 add 并再次修改
        -   先 1 在 2

### 远程仓库

```shell
git remote [-v]# 查看远程仓库
git remote show origin # 查看远程仓库名为origin的详细信息
git remote add <name> <url> # 添加远程仓库name建议用origin,一个项目可以添加到多个远程仓库
							# <name>为本地自定义远程仓库别名，clone项目默认都是origin
git remote rm <name> # 端口与指定名称的远程仓库的关联
                     # 远程项目改名 github 会帮你重定向到此项目，不更新remote也能正常提交
git push <name> <branch> # 提交到远程,如果后期不需要跟换仓库名与分支可以直接git push

git clone <url> # 从远程克隆项目
git pull # 从远程拉去最新内容，与fetch的差别pull会自动合并
         # 第一次链接远程且本地有文件，pull时不允许合并添加 --allow-unrelated-histories强行合并
git fetch # 从远程拉去最新内容
    git merge origin/master # 手动指定仓库名/分支合并到工作区
```

### 分支

> 分支分为本地放在(本地操作是后面跟的那个如 master)和远程分支(远程 tags 旁边那个如 origin/master)

````shell
git branch # 查看所有本地分支
git branch -r # 查看所有远程分支
git branch -a # 查看本地与远程的分支（远程分支前面会有remotes表示这是远程的）

git branch <branch name> # 创建本地分支
git checkout <branch name> # 切换分支
    # 切换分支前，需要将修改通过 commit 提交贮藏
    # 切换分支后，没有add的文件，会跟到新分区
git checkout -b <branch name> # 创建并切换
git push origin <branch name> # 将本地分支推送到远程( 推送非当前分支的其他分支，与当前分支的改变无关 )
git checkout -b <new branch name> origin/远程分支名 # 拉取指定远程分支
git checkout --track origin/abranch # 拉取远程分支，使用相同的名字


git checkout . # 放弃所有的文件修改
此命令用来放弃掉所有还没有加入到缓存区（就是 git add 命令）的修改：内容修改与整个文件删除。但是此命令不会删除掉刚新建的文件。因为刚新建的文件还没已有加入到 git 的管理系统中。所以对于git是未知的。自己手动删除就好了。

git checkout -f # 丢弃本地修改,还可以删除没有跟踪的

git clone -b branchA http://xxx #直接隆指定分支

git cherry-pick <commitHash> #当前分支如果需要某个分支的指定提交,
                             #你需要另一个分支的所有代码变动就用 merge
git merge <branch name> # 将指定分支版本库内容合并到当前分支
                        # 如果两个分支多同一个文件同一部分进行不同修改，会产生冲突
                        # 解决方法打开文件去除不要的在提交上去就行了

git branch -d <branch name> # 删除本地分支(要在其他分支上操作，并且新增内容要提交到远程才能成功)
git branch -D <branch name> # 删除本地分支(要在其他分支上操作，并且新增内容可以不用提交,D就是强行删除)
git push origin -d <branch name> # 删除远程分支

``checko`

分支的运用案例
![](../../static/img/gitbranch.png)

### 标签

> 记录特定事件点的状态

```shell
git tag <tag name> # 创建标签
git show <tag name> # 查看标签
git push origin <tag name> # 将指定标签推送到远程
git checkout -b <branch name> <tag name> # 检出指定分支 指定标签的代码

git tag -d <tag name> # 删除标签
git push origin :refs/tags/<tag name> # 删除远程标签
````

### 文件操作

```shell
git rm file # 删除工作区文件(要通过commit提交到版本库才会删除仓库中的文件)
touch .gitignore # 创建文件
```

## 忽略文件 .gitignore

```shell
*.txt  # 忽略所有.txt格式文件
!list.txt # 不需要忽略指定文件
/filename # 忽略指定文件名
build/    # 忽略指定文件夹
doc/*.txt # 忽略doc文件夹下的.txt文件
doc/**/*.txt # 忽略doc下所有.txt文件

```

## GIT 协议

git 支持一下四种协议

-   本地协议(Local)
-   HTTPS 协议
-   SSH 协议
-   GiT 协议

> GitHub 与码云目前常用 HTTPS 与 SSH 协议,平时大多使用 HTTPS 协议

```shell
git clone https://github.com/liaozhongxun/xxx.git
```

### SSH

> SSH (Secure Shell 安全外壳协议) 的缩写 可以不要每次输入用户名密码，而是利用公钥和私钥进行比对

1、git 下输入 ssh-keygen|ssh-keygen -t rsa 连续回车生成公私钥（公私钥与本台计算机有关）

-   linux 需要安装 `openssh`

2、公私钥匙用户家目录下的 .ssh 文件夹中
私钥 : id_rsa
公钥 : id_rsa.pub

3、复制公钥的内容到远程仓库(GitHub 或 开源中国等）
添加成功后本台计算机就能和远程仓库进行 ssh 交互了

[参考资料 后续继续](https://www.bilibili.com/video/BV1yz4y1y7RQ?p=40)

### linux 与 linux ssh 设置
1、两个主机都生成公钥私钥
2、连接主机 `ssh-copy-id -i ./id_rsa.pub root@114.115.212.xxx` 向目标主机114 上传公钥
3、ssh root@xxx.xxx.xxx.xx 测试是否可用直接连接

win 连 linux 可能需要在git bash上操作

或
远程主机直接将客户端的公钥加入 ~/.ssh/authorized_keys 文件中
## git 服务器环境搭建

-   进入 /usr/src 下载 gitisos

```shell
yum install -y python python-setuptools git-core # 系统一般有自动基本可以不用安装
git clone git://github.com/res0nat0r/gitosis.git
cd gitosis
python setup.py install
```

-   管理员客户端通过 ssh 生成公钥

```shell
ssh-keygen -t rsa # 用户目录下 /.ssh/id_rsa.pub
```

-   初始化项目

```shell
#新建一个git用户
useradd -m git
su - git
gitosis-init< 管理员id_rsa.pub所在路径

# /home/git下面生成gitosis和repositories
# 确保/home/git/repositories/gitosis-admin.git/hooks/post-update具有执行权限
```

-   管理员的客户端

```shell
git clone git@< server ip >:gitosis-admin.git

# gitosis-admin项目下有一个gitosis.conf文件和一个keydir目录
```

1、`gitosis.conf`用来配置 git 项目和用户,`keydir`存放用户的公钥,公钥必须 pub 结尾

```shell
[gitosis]

[group gitosis-admin] # gitosis-admin管理所以项目
members = lzoxunc@LAPTOP-DGM7G15T
writable = gitosis-admin  # 对应keydir下有一个 lzoxunc@LAPTOP-DGM7G15T.pub 公钥文件
```

-   添加新项目

```shell
[gitosis]

[group gitosis-admin] # gitosis-admin管理所以项目
members = lzoxunc@LAPTOP-DGM7G15T
writable = gitosis-admin  # 对应keydir下有一个 lzoxunc@LAPTOP-DGM7G15T.pub 公钥文件

[group new-project]  # 手动添加 ，相当于在github创建新项目 产生一个地址 git@192.168.152.130:new-project.git
writable = new-project
members = lzoxunc@LAPTOP-DGM7G15T username2 #多个用户用空格分开,这时keydir下需要存在username2.pub 公钥，
# 多用户，只要username2客户端可以ping 通服务器ip 那么就可以正常使用了
```

-   发布内容

> 这时 /home/git/repositories 下只有 gitosis-admin.get 一个项目

```shell
#  new-project members 存在的用户客户端任意位置
mkdir new-project
cd new-project
git init
git add .
git commit xxx

git remote add origin git@< server ip >:new-project.git
git push origin master

# 这时 /home/git/repositories 下会多一个new-project.git
```

### github
- 快查看代码
    -   找到线上项目,按句号，或者将项目添加1s,如:https://github1s.com/lzoxun/xxxxx.git直接编辑器方式打开项目
-   查看项目信息
    -   `https://api.github.com/repos/用户名称/项目名称`


### 命令行操作GitHub远程仓库
生成token
    GitHub主页 > settings > Developer settings > Personal access tokens --> Generate new token > 勾选权限 > 生成token令牌
    类似 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lzO
tolen使用场景文档
    [DOCS](https://docs.github.com/cn/rest)
命令行直接创建仓库
    curl -u "$username:$token" https://api.github.com/user/repos -d '{"name":"'$repo_name'"}'
    curl -u "liaozhongxunlzx:ghp_xxx" https://api.github.com/user/repos -d '{"name":"'lzo-name'"}'
    就可以直接
    git remote add origin https://github.com/liaozhongxunlzx/lzo-name.git

获取GitHub项目列表
    curl -H "Authorization: token ghp_xxxxx" https://api.github.com/users/liaozhongxun/repos
    完整的仓库列表
    curl -H "Accept: application/vnd.github+json" -H "Authorization: token ghp_xxx" https://api.github.com/users/liaozhongxun/repos\?page\=1\&per_page\=1000

搜索Github其他人的项目
    curl -H "Accept: application/vnd.github+json" https://api.github.com/search/repositories\?q\=NAME\&sort\=stars\&page\=1\&per_page\=100``


### 问题
远程 ssh: connect to host github.com port 22: Connection refused

```shell
# $ vim ~/.ssh/config
# Add section below to it
Host github.com
  Hostname ssh.github.com
  Port 443

# 测试
# $ ssh -T git@github.com
```