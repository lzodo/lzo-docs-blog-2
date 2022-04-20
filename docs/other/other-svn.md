    ---

## title: gitee + svn

## 项目创建

-   码云(gitee)创建私有仓库
-   进入管理-启用 svn 服务，就能通过 svn 方式管理仓库
-   下载
    -   进入 [Apache 官网](https://subversion.apache.org/roadmap.html#release-planning) -> Subversion -> 找到 Binary Packages 下载可以的包 -> VisualSVN -> 下载安装 tools
    -   搭建服务器的话还要下载 `Visual SVN Server`
    -   https://tortoisesvn.net/sasl_howto.html
-   层级
    -   客户层
        -   通过命令行操作
        -   通过工具操作
    -   服务层
        -   通过`(DAV)http://`方式访问远程仓库
            -   需要永远`Apache`服务器
        -   通过`(SVN)svn://`方式访问远程仓库
        -   通过`(Local)file://`方式访问仓库(搭建 SVN 仓库本机，不需要网络)
    -   仓库层

### SVN 命令行

-   管理员命令
    -   svnadmin --help
    -   svnadmin --help 命令
    -   仓库
        -   顶级仓库 (顶级仓库下管理着很多根仓库)
            -   一个文件夹,创建根仓库时，根仓库路径中上一层必须存在，这个就是顶层参考
        -   根仓库
            -   `svnadmin create path` :创建版本根仓库
                -   `conf`: 根仓库配置文件夹
                    -   `authz`:权限文件
                        ```shell
                        [groups]
                        # 定义leaders、members两个组 
                        leaders = user1,user2
                        members = user3,user4,user5

                        # 通过组设置权限，组中成员都有这个权限
                        [/thank/sms2] # 对于sms2目录
                        @leaders = rw 
                        @members = r
                        * = 

                        # 不使用组
                        [/] # 对于根仓库（realm指定的）（rw,r, ）只有这三种值
                        用户1 = rw # 用户1拥有读写权限
                        用户2 = r  # 用户2只有读权限
                        * = #其他用户每一任何权限

                        [/thank/sms] #对于指定目录
                        ...
                        ...
                        ...

                        # 这边权限优先级高于svnserve.conf设置的
                        ```
                    -   `passwd` 是帐号密码文件
                        - 用户1 = 密码1
                        - 用户2 = 密码2
                    -   `svnserve.conf` 是 SVN 服务配置文件
                        - 打开下面的5个注释
                        - anon-access = read #匿名用户可读(write读写权限)
                        - auth-access = write #授权用户可读写
                        - password-db = passwd #使用哪个文件作为账号文件
                        - authz-db = authz #使用哪个文件作为权限文件
                        - realm = /home/svn # 认证空间名，版本库所在目录
                -   `db`:存放具体版本数据内容(不是源码)
-   服务端命令
    -   svnserve
    -   svnserve -d：开启 svn 服务，开放顶层仓库，运行客户端访问
    -   svnserve -d --listen-port=8888(默认 3690)
        -   通过`svn://localhost:3690/path/顶层仓库/跟仓库`访问
    -   svnserve -d --listen-port=8888 -r /home/lzoxun/svnrepository ：指定顶层仓库
        -   通过`svn://localhost:3690/跟仓库`访问
-   客户端命令

    -   命令指令直接管理（有些指令不支持）

        -   检出：`svn checkout(co) svn://gitee.com/lzo-gitee/lzo-svnmsg 指定co到的路径`
        -   提交

            -   状态：`svn status(st)`

                -   状态值
                    -   A - svn add filename
                    -   M - 内容修改过的文件
                    -   L - 锁定的文件(svn cleanup 处理)
                    -   K - 加锁的文件
                    -   ? - 未跟踪
                -   `svn add filename`:将文件或目录交给 svn 进行管理。每个文件只能 add 一次

                -   `svn status -v path`:并查看子文件状态

            -   提交：`svn commit(ci) -m 'LogMessage' 提交的文件` (提交所以 add 和已修改的文件)
                -   提交文件服务仓库无法直接看到的

        -   更新
            -   `svn update(up)` ：如果后面没有目录，默认将当前目录以及子目录下的所有文件都更新到最新版本。
            -   `svn update -r 200 test.php`： 将版本库中的文件 test.php 还原到版本 200
        -   比较
            -   `svn diff(di) path`：将修改的文件与基础版本比较
            -   `svn diff -r m:n path`：对版本 m 和版本 n 比较差异
        -   删除
            -   `svn delete path`
                -   `svn commit -m 'delfilepath' path`
                -   svn (del, remove, rm)
        -   查看
            -   查看日志:`svn log path`
            -   文件信息:`svn file path`
        -   合并
            -   `svn merge -r m:n path`:合并 m 版本与 n 版本
        -   锁
            -  作用避免冲突
                - 将文件加锁，拥有锁的用户可以修改，不拥有锁的用户对于该文件是只读的，当修改完，将锁释放，其他用户才能修改，这样就不会产生冲突了(匿名用户无法获取锁，有锁的文件图标变灰色)
            -   加锁:`svn lock -m "LockMessage" PATH`
            -   解锁:`svn unlock PATH`
        -   问题
            -   `svn: Cannot negotiate authentication mechanism`（无法协商认证机制）。
                -   svn 服务器开启了 sasl 加密，本地的 Xcode 和命令行中的 svn 不支持 sasl 加密导致无法协商认证机制问题
                -   升级:高版本自带 sasl
        -   不常用指令
            -   `svn list(ls)`:查看文件列表
            -   `svn mkdir Path`:直接创建纳入版本库(Add 状态)的文件夹
                -   `svn mkdir Url -m 'msg'`:直接 commit 到远程(中间目录必须存在,`result error`)
            -   `svn cleanup`:清除预留日志
                -   svn 操作文件之前默认将数据备份到日志文件中，操作结束自动删除，操作过程被打断，就会遗留
                -   它搜索你的工作副本并执行所有遗留的日志，在这过程中删除锁。如果 Subversion 曾告诉你你的工作副本的一部分被“锁定”了，那么你应该执行这个命令。另外， svn status 会在锁定的项前显示 L。
            -   `import`：
                -   将本地文件导入到源码库中，通常用于第一次上传让服务器生成代码项目，以后还需要上传则是 commit
                -   `svn import /e/lzo-project/git-test svn://gitee.com/lzo-gitee/lzo-svnmsg/testdir -m 'msg'`
            -   `svn revert`:撤销本地修改
                -   `svn revert fileName`:撤销单个文件
                -   `svn revert ./*`:撤销当前文件夹下所有修改
                -   `svn revert -R ./*`:递归撤销当前文件夹下所有修改
        -   log module
        -   tag module
        -   分支 module

### TortoiseSVN

-   安装
    -   TortoiseSVN（前面下载 svn 的地方，VisualSVN 同级）
    -   Language packs 语言包
-   win 下载安装 TortoiseSVN（Subversion ）
    -   检出:复制仓库地址，右键检出(checkout)，输入 gitee 的账号密码
-  操作
    - window del 删除可以用ctrl+z撤销，有件通过svn的delete就需要svn的revert撤销
    - 回滚
        - 右键 svn功能列表 `Update to revision...`
        - 客户方你日通回滚到指定版本，再次提交就是接下去的，回滚的版本不会消失
    - 冲突
        - 当一个文件在多个客户端同时修改，第一个客户端进行提交，没有问题，能成功提交到服务端,第二个用户在进行修改提交，就会产生冲突，
        - 具体类型
            - 异行修改
                - 两个用户修改文件内容不是同一行，svn可以进行简单的合并，双方修改都起作用
                - 第二个用户提交的时候，当前版本比服务器的低(第一个人修改提交版本加一)，会提示先更新，然后在提交，可以直接提交成功
            - 同行修改
                - 两个用户修改文件内容是同一行
                - 需要人工进行冲突内容的选择,由人工完成取舍
                - 第二位修改用户提交的时候得到提示需要先更新，这时候会出现好的个文件，和带感叹号标识的冲突文件
                    - 三个文件代表：自己修改的，修改之前版本和前一个人提交之后的版本(我修改之前版本的下一版本)
                    ```shell
                    1111111111
                    <<<<<<< .mine
                    我修改的内容
                    ||||||| .r7
                    我修改之前,的内容
                    =======
                    第一人修改的内容
                    >>>>>> .r8
                    1111111111
                    ```
                - 人工删除不需要的，在删除多余的文件，提交解决冲突
                - 冲突感叹号文件右键 Edit conflict 使用svn提供的窗口合并
                    - 黄色代表冲突的行
                    - 红色代表冲突的内容 
                    - 一个窗格是第一个人提交的内容及版本，一个窗口是自己的修改
                    - 在？？？？的窗格中选择行，右键选择用谁的
### 对比 git

-   集中式
-   修改不需要 add,新文件才要 add
    -   git 修改也要 add 或者 commit -am
-   commit 后不需要 push，直接提交到远程

### vscode
```shell
"svn.path": "C:\\Program Files\\TortoiseSVN\\bin\\TortoiseSVN.exe",
"TortoiseSVN.tortoiseSVNProcExePath": "C:\\Program Files\\TortoiseSVN\\bin\\TortoiseProc.exe",
```
## 注意事项

[资料](https://gitee.com/help/articles/4131#article-header0)
