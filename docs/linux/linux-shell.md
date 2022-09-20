---
title: shell
---

## shell 脚本

### 概述
- ls(命令) -> shell(bash、zsh) -> 内核(kemel) -> 硬件
    - `ls`:用户使用文字或图形界面操作操作系统
    - `shell`:接受与来自用户的命令与内核进行沟通，是`用户`与`内核沟通`的接口程序
    - `内核`:控制硬件进行工作，进程管理储存管理等
- shell对本质是`对内核进行保护`，只有`shell能识别`的命令才能用了操控硬件
- 脚本语言`不需要` 编译,把命令写在文件中就是shell脚本了
- `shell脚本`是shell命令的`有序集合`
- `系统编程`:主要为了让用户更好更方便的操作硬件设备，并且对硬件也起到保护作用，我们所写的程序，本质就是对硬件进行操作，所以操作系统提供的接口本来就能对硬件进行操作的
- `系统调用`: 
    - 步骤: shell、library rou(库函数)、applications(应用层接口) -> system calls(系统调用，提供直接操作内核的特殊接口) -> kernel(内核) -> 操作硬件设备
-   shell优势，处理操作系统底层的业务（大量命令为他做支持，grep awk sed 等）
### 开启 shell

```shell
#!/bin/bash   指定使用bash解释器,必须顶格,linux 默认bash

指定脚本的执行方式
1、开头 #！
2、执行文件的时候 bash install.sh
3、/bin/bash 终端默认使用 bash

shell 脚本的执行
1、调用相关环境变量文件，脚本里可以随意使用里面的数据
    /home/xx/.bashrc (3)
    /home/xx/.bash_profile 
    /etc/bashrc (4)
    /etc/profile (2)
    /etc/profile.d (优先级最高 1)

2、执行shell的方式
    bash shellfile | sh shellfile (脚本头没指定解释器)
    path/shellfile | ./shellfile (没有x权限不能执行)
    source shellfile | . shellfile（读入或加载指定shell脚本，可以将脚本中的变量传到当前shell里）

3、基本规范
    开头添加 #!/bin/bash 解释器
    # Date 日期
    # Author 作者
    # Mail 联系方式
    # Func 功能
    # Version 版本 。。。

    尽量不要用中文
    扩展名以.sh结尾
    成对的符号先敲好，不要一个个敲
    [] 两端必须有空格($[]不算)

cat /etc/passwd
echo "hello word"

# ==================定义一个变量
num=10 #等号左右不能有空格
readonly age=20 #age不能被改变
export name="name" #name会被导出为环境变量,其他shell都能使用
declare -i sum # sum是一个整数变量

echo $num # 使用变量加$
echo ${num}Addstring # 使用变量加${}
# --- "" 弱引用 里面可以读取变量
# --- ``|$() 把里面的内容当中命令执行，得到执行返回的结果
oa="this is $num ，`date`,$(date)"
# --- '' 强引用 把动态的操作当成字符，

unset num #清除变量



# ==================if语句
#用do 和 down 表示其他语言的{}

if [ 表达式 ]
then
    echo "yes"
elif [ 表达式 ];then
    echo "noyes nono"
else
    echo "no"
fi  # 结束语句


if $num
then
    echo "num is true"
elif ${num1};then
    echo "num1 is true"
else
    echo "no"
fi  # 结束语句

# ================== case
read -p "请输入任意字符" key
case "$key" in
    [a-z]|[A-Z])
        echo "这是英文字母"
        ;;
    [0-9])
        echo "这是一个数字"
        ;;
    *)
        echo "这是一个其他字符"
esac


# ================== for 循环
for(( i=1; i<=100; i++ ))
do
    echo $i
done
# ================== for in
for i in 1 2 3 4 5
do
    echo $i
done

for i in 1 2 3 4 5
do
     echo $i &  #相当于多进程并发执行 ，适合耗时长，后面程序不依赖当前结果，且计算机资源足够的时候
     # 线程是进程的一部分，shell只能多进程，多线程需要Python的高级语言
     # 这边只适合一条语句，如果复杂可以放到函数里 funcName 12 &
done
wait # 等待循环体全部执行完再做后面事情
xxx
# 列表
# {1..5} 1-5
# $(ls /etc)

# ================================= while
i=1
while [ $i -le 100 ]
do
    echo $i
    i=$[$i + 1]
    或 i=`expr $i+1`
    或 i=$(( $i+1 ))
done

# 操作文件
while read line
do
    echo "${line}-change"
done < /etc/passwd

# until
# 与while循环相反，测试成立才退出循环
i=1
until [ $i -le 100 ]
do
    echo $i
    i=$[$i + 1]
done
# ================================== 函数
function name { xxx }
name(){ 
   SUM=$[$1+$2]
   return SUM
}

name 1 2  # 通过位置变量接收参数
echo "$?" #获取返回值方式最大255
# 在shell中处理()中定义的变量，只要不做任何修饰，都能看做是全局变量


# ==================总结
# 指定解释器的地方
# 1、shell文件顶端；2、bash shell.sh；3、通过路径执行脚本的终端；
# 2、分号可以合并多行，或者一行执行多条命令
```

### 执行

-   echp $PATH
-   存放外部命令的路径
-   访问命令就可以省去前面的路径直接写名字
-   一个`shell脚本`可以看做一个命令
-   如果没在`$PATH`里的路径下,就需要`加上绝对路径`或`相对路径执行`才能执行,
-   或直接通过`/etc/shells`下的解释器直接执行脚本
-   `bash shells.sh` -`-n`:检查错误 -`-x`:将脚本中执行的命令也打印出来

### 常用的 bash 语句
-   shift 从前面删除一个位置变量
-   export 定义环境变量

### 语法
-  特殊符号
    - `\`:`echo -e "this \n towline"` 配合 -e 生效 
    - `(xxx)`:小括号会创建一个子shell，里面操作不会影响当前shell
    - `{xxx}`:大括号里的操作会音响当前shell
-   算术运算符(`+、-、*、/、%、**`)
    -   `$[$a+$b]`:运算+不能直接用,`$[]`或`$(())`或`expr 1 + 2`里的东西当做运算处理'
-   变量
    -   `普通变量(只能在函数或脚本中用)`
        -   num=1
        -   命令定义成变量 xxx=`date +%F`| xxx=$(date +%F)   echo $xxx
    -   `环境变量(全局变量，能在创建他们的shell和他们的子shell中用)`
        -   一般大写表示
        -   常用环境变量
            -   `$PATH`:用户命令路径
            -   `$SHELL`:用户使用的 shell
            -   `$HISTSIZE`:history 查看历史命令，这个可以查看 history 上限
            -   `$USER`:获取当前用户的名称
            -   `$HOME`:获取当前用户加
            -   `$PWD`:获取当前用户工作目录
            -   `$UID`:获取当前用户的 ID
            -   `$LANG`:语言
            
            -   `$SHLVL`:bash实例个数
            -   `$TMOUT`:多少秒没操作就自动退出
            -   `$PS1`:定义终端用户信息格式
        -   临时更改: PATH = xxxx
        -   取消环境变量：unset 变量名
        -   定义环境变量
            -   `export NAME="name"`:NAM 只有当前 shell 和子 shell 生效
            -   添加扩展PATH:export PATH="/home/tuotu/bin:$PATH"
            -   永久设置
                -   `bashrc`：用户登录、打开 shell、开子 shell 都会执行
                    -   `/etc/bashrc`
                    -   `~/.bashrc`
                -   `profile`:只在用户登录时执行一次
                    -   `/etc/profile`:全局
                    -   `/etc/profile.d/*.sh`:优先级高，所有符合条件的文件开机都会执行一次
                    -   `~/.bash_profile`:局部的
                -   `source|. filename`:都能重新加载文件
        - `env|set|export|printenv` 查看系统所有环境变量

        -  大概顺序 etc/profile → /etc/profile.d/*.sh → ~/.bash_profile → ~/.bashrc → [/etc/bashrc]
    -   `位置变量$1-$9`:接收用户执行脚本的传参，超过9 `${10,...}`
    -   `预定于变量`
        -   `$?`:0:上一条命令执行结果为真,否则执行为假[ -z $1 ]
            -   0 上条执行成功
            -   2 权限拒绝
            -   1-125 运行失败，命令错误 参数错误等
            -   126 找到该命令，但是无法执行
            -   127 未找到运行的命令
        -   `$#`:表示位置参数数量
        -   `$0`:当前脚本的名称
            -   dirname $0 :获取整个路径
            -   basename $0 :只获取文件名
        -  `$@`:保存除$0外的所有参数
            -   每个参数都是单独的(数组形式)
        -  `$*`:打印除了$0所有具体的参数
            -   所有参数视为一个参数
        -  `$$`:获取当前进程的进程号
        -  `$!`:上一个指令的PID
-   条件测试与比较 `[ 条件表达式 ]` | `test -d $1`
    -   解释
        -   `[ 条件表达式 ]`
        -   `[[ 条件表达式 ]]`:这种支持传统的大于小于号
        -   中括号两边必须存在空格
    -   检测
        -   `[ -d $1 ]`:检测参数一是否为目录
        -   `[ -f $1 ]`:检测参数一是否为文件
        -   `[ -e $1 ]`:检测母乳或文件是否存在
        -   `[ -r $1 ]`:
        -   `[ -x $1 ]`:
        -   `[ -w $1 ]`:检测用户是否有写入权限
        -   `[ -s $1 ]`:检测文件是否为空
        -  文件类型按ll第一位的文件类型检测    
    -   数值比较
        -   `-eq`:等于
        -   `-ne`:不等于
        -   `-gt`:大于
        -   `-lt`:小于
        -   `-le`:小于等于
        -   `-ge`:大于等于
    -   字符串比较
        -   `=`:等于
        -   `!=`:不等于
        -   `-z`:[ -z $1 ]检测字符串是否为空,如果为空，那么结果为真
        -   `-n`:[ -n $1 ]检测字符串是否不为空
        
        -   `在进行字符串比较时，最好为字符串加上引号，并且等号两侧留有空格`
    -   文件比较
        - `file1 -nt file2`:判断文件1修改时间是否比文件2新
        - `file1 -ot file2`:判断文件1修改时间是否比文件2旧
    -   逻辑运算
        -   `-a、-o、!`:类 1 
        -   `&&、||`:类 2 `链接两个命令` 有断路功能
-   循环控制语句
    -   `break`:结束退出循环
    -   `continue`:跳出本次循，不执行 continue 本次循环内后面的代码
-   其他
    -   `shift`:删除第一格位置参数,后面如果有全部往左移动一格
    -   `exit`:直接退出程序
        `exit 1-255`:程序结束后返回值，通过`$?`获取，程序正常结束值为 0

### 字符串

-   获取字符串长度 ${#STR}

### 数组
> shell只支持一维数组`括号表示` 和`空格隔开`

```shell
list=(1 2 3 4)
${list[0]} # 获取下标为0的数组元素
${list[*]} # @和*表示数组的所有元素
${#list[@]} # 获取数组长度
```
### 命令

-   `read num` : 暂停获取用户输入信息
    -   `-p 请输入一个数字`:增加提示
-   `seq`:构造列表
    -   数量
        -   `seq 5`:尾数
        -   `seq 5 6`:首数 尾数
        -   `seq 1 2 10`:首数 增量 尾数
    -   选项
        `-w`:补 0 到最大位数
-   `cut`:取列值（类似数组切割 splic）
    -   `-d':' -f3`:将一行通过:分割，并获取第三段
    -   `-f1,5`:选取多列
    -   `-f1-5`:选取多列
-   `bash`: 执行脚本
    -   `-n`:测试语法错误
-   `sort`:对文本`输出结果`进行排序，不影响源文件
    -   默认以首字母 ASCII 进行排序
    -   `man ascii`:查看 ASCII 表
    -   选项
        -   `-r`:降序
        -   `-t":" -k3`:指定分割符号，并安装指定`列`进行排序
        -   `-n`:按照数值大小排序，需明确对象是数字
        -   `f`:忽略大小写
        -   `u`:去除重复
-   `uniq -c`:统计`连续`相同的个数，配合 sort 使用
-   `tr`:单字符对应替换

    -   `tr ab 12`:将文本所以 a 替换成 1，所以 b 替换成 2
    -   `tr -d " "`:不指定目标字符，删除操作

-   文本处理三剑客
    -   `grep`:(文本过滤工具)查找
        -   grep [option] [pattern] file
        -   option: 参数
            -   `-i`:忽略字符大小写
            -   `-o`:仅显示匹配到的字符本身
            -   `-v`:显示不能匹配到的行
            -   `-E`:使用扩展正则元字符(扩展元字符不需要加`\`了,或egrep)
            -   `-q`:静默匹配 即不输出任何内容
            -   `-n`:显示匹配内容的行号
            -   `-c`:显示匹配数据的行数

            -   `-d、-r`:查找文件是一个目录必须加这个参数
            -   `-l`:列出目录下匹配到内容所在的文件
        -   pattern:匹配模式 内容
        -   查找文件夹下所有文件总行数目
            -   grep . -rl --exclude-dir={node_modules,dist} --exclude={yarn.lock} ./|xargs grep -v "^$"|wc -l
            -   grep 找到当前文件夹下所有文件||
    -   `sed`:(流编辑器 文本编辑工具)查找、替换
        -   格式: `sed [选项] 'sed脚本' 文本文件`
            -   多选项 -i -E 分开
        -   选项
            -   `-r`:使用扩展正则
            -   `-i`:直接编辑文本
            -   `-e`:多点编辑
                -   多点操作 sed -e "1,2a aaaa" -e 3,4a bbb file
            -   `-n`:不输出模式空间内容,配合`p`使用
            -   `-f` ：直接将 sed 的动作写在一个文件内， -f filename 则可以运行 filename 内的 sed 动作；
        -   脚本（在`哪个位置`做`某个事情`）
            -   /可以用#代替,都行
            -   地址定界
                -   1、不指定地址,默认全文编辑
                -   2、单地址:`num`表示第几行,`$`表示最后一行
                -   3、`/PATTERN/`:表示被次模式匹配到的行，可以是正则
                -   4、地址范围:`num,num`表示从第几行`到`第几行，`num,+num`表示从第几行`向下`几行
                -   5、步进:`num~num`从地几行开始，每几行
            -   编辑命令(一次只能一个动作，-e，;可以多次操作)
                -   `a`:新增 表示在指定行之后追加内容
                -   `i`:插入 在指定行之前插入 (和a添加的位置相反)
                -   `d`:删除
                -   `c`:取代|修改 表示将指定行替换成新的内容
                -   `p`:打印 输出模式空间被匹配到的内容
                    -   sed -n "1,2p" file-name 只会输出1，2行，没-n全部输出
                -   `w filename`:将指定内容另存为新的文件
                -   `r filename`:读取某文件内容到指定行之后
                -   `!`:取反

                -   `s`:取代 替换
                    -   格式：`s/旧内容/新内容/替换选项`,替换指定字符(存在/的内容可以用\转意或使用s#old#new#option)
                    -   旧内容:配合-r选项可以用正则
                        -   多次正则匹配：sed '2s/aa/bb/;s/cc/dd/p' -n file
                    -   替换选项
                        - `g`:全局，每行所有匹配都替换
                        - `p`:只输出操作的内容，与`-n`配合，控制台只能看懂操作过的行
                        - `n`:（1-512），每行第n个匹配替换
                        - `w <file-name>`: 将匹配修改的结果写入指定文件中
                    - `&`:将`规则匹配到`的字符`拼接上`指定字符，&符号代表匹配到的字符串
                      - `sed 's/r..t/bf&er/g' /etc/passwd` :将r两字符d的，前面加上bf后面加上er
        -   示范
            -   `sed '10d' /etc/fstab`:删除 fstab 文件`输出内容`的第十行
                -   `10!d`:不删除第十行
                -   `1,3d`:删除 1 到 3 行
                -   `d`:删除所以输出内容
                -   `/^UUID/d`:删除一 UUID 开头的`行`,两个`/`是地址定界符
                -   `5r filename`:文件内容读取到 fstab 第五行后面
            -  多点编辑
                - 删除文件第三行后面的数据，并将bash替换成aaa
                - `sed -e '3,$d' -e 's/bash/aaa/' /etc/fstab`
            - s替换
                - 1到十行开头添加#
                - `sed '1,10s/^/#/g' /etc/fstab`

            - 操作管道内容
                - `cat /etc/fstab| sed xxxx`
            - 不要默认输出，只要有操作的行输出
                -   `sed -r -n '5s/[a-w]+/&_addstr/p' filename`
            -   批量替换文件内容
                -   `sed`:[sed -i "s#https#http#g" `grep http -rl VERO`] 将 VERO 下所有子目录所有文件里的 http 替换成 https
    -   `awk`:(文本报告生成器 格式化文本)是GNU的开源awk，实际叫做`gawk`
        -   概念
            -   awk是一种进程的轻量级语言，他有自己的变量，自己的一些语句，`不是shell`的语法
            -   NR 横行(number record) 横行数量       (从上到下行的数量)
            -   NF 竖行(number field)，竖行分段数量  （从左到右通过选项切割的总字段数）
        - 格式: `awk [选项] 'pattern|范围 {action动作}' file1 file2`
        - 选项：
            - `-F":"`:指定pring分隔符，默认空格或制表符，符号可以是正则表达式
            - `-v` :修改awk内部变量
                - `-v FS=":" '{xxxx}'`：通过改变awk内部变量方式，将默认的空格改成冒号
                - `-v OFS="===" '{xxxx}'`：将默认输出从空格改为 ===
                - `-v name="lzo"` 定义变量
                - `-v name="$PATH"` 使用系统环境变量
        - 范围:（条件筛选）
            - `'/^reg/{action}'`:可以是正则
            - `'/^reg/,/^toreg/{action}'`:匹配从reg开头的到从toreg开头的记录
            - `'$3>=500{action}'`
            - `'NR==3{action}'`
            - `'NR==3,NR==6{action}'` :三到六行
            -   算数运算符 >= <= == != > <
        - 模式(pattern)：定义变量等

        - 动作：
            -  `print`:输出
                -   默认分割付空格，`{print $1,$2}`：指定逗号，打印的结果就跟通过空格分开kk
                -   $n第n列，
                -   $0输出所有
            -   `printf`:格式化输出，默认没有换行符
                -   格式
                    -   {printf "%s%s%s\n","a","b","c"} 每行添加换行
                    -   {printf "%s\t%s\t%s\t\n","a","b","c"} 每行三个字段添加制表符距离再换行
                    -   {printf "%-30s%s\t%s\t\n","a","b","c"} 第一个距离30长度距离，其他段添加制表符距离再换行

        - 变量 
            - `NF`:分割符分隔之后的字段数量, {print $NF}代表获取最后一个字段
                -   `print $NF`:打印最后一段(NR NF 这种是不需要加$的)
                -   $NF 意思是 $n， n用NF替换，而NF代表列的数目，比如5列，$NF == $5 
            - `NR`:行号
                - `awk 'NR==3{print $1}' file`
                - `awk 'NR>=3&&NR<=5{print $1}' file`
            - `FNR`:多文件操作时，分别统计各个文件的行号
            - `FILENAME`:文件名称
            - `OFS="#"{}`:指定输出字段的分割付
                -   本来默认输出是可空格，输出前还需要通过，隔开每一列
            - `RS`:指定换行符号(awk 认为只要遇到这个符号，后面的就是下一行了)
            - `ORS`:输出时用指定符号代替换行符
            - `ARGV`:数组形式储存当前操作的参数列表
            - 全局变设置 awk 'BEGIN{xxx;xxx2} {动作}' 文件  在动作之前，先做一件事
                -  `FS`:`BEGIN{FS=":"}`,通过全局变量设置默认输入分割付为分号
                -  `OFS`:设置默认输出分隔符

        - 功能
            - 截取字段
                -  `awk '{print $1,"拼接格式",$2}'`:以空格或制表符切割，`$1-$n`代表每一个分段，`$0`整行,外单引 内双引
            - 运算
                - `echo "2 3 4"|awk '{print $1*$2-$3}'`:2
            - BEGIN 和 END
                - `awk 'BEGIN{print "所有行正文之前插入"}{print $0,"正文"}END{print "所有处理结束"}'`
                -   通过begin制作表头
                    -   awk -F":" 'BEGIN{printf "%s\t%s\t%s\t\n","用户名","用户id","bash"}{printf  "%s\t%s\t%s\t\n",$1,$3,$NF}' passwd
        
        -   使用
            -   awk '{print $1 "\t" $2} filename':打印每行第2，3个段，默认空白符号分割,\t对齐
            -   awk -F":" '$3==102&&$4=="bold"&&NF==7{print $0}' filename:
                -   输出第三列是102,并且第四列为bold,并且是七列的行
            -   awk -F":" '$3==102{$5="***";print $0}' filename
                -   隐藏第五列的内容
            
            -   awk -F":" '/^abc/{print $0}' filename:通过正则验证    
            -   awk -F":" '/\/sbin\/nologin$/{print $1}' passwd :找到nologin的用户
    -   ag(the_silver_searcher)
        -   `ag -l 关键字 dir`：查找dir文件夹下所以包含指定关键字的文件名

## 系统调用
### IO操作

- 文件描述符
    - 文件描述符是非负整数,打开现存文件或新建文件时，系统内核会返回一个描述符来指以打开的文件
    - 在系统调用(文件IO)中,文件描述符起到标识作用，操作文件，就是对描述符号的操作
    - 程序运行或进程开启，系统自动创建三个描述符
        - `0 标准输入` -> 标准IO `stdin`
        - `1 标准输出` -> 标准IO `stdout`
        - `2 标准错误` -> 标准IO `stderr`
    - 创建文件描述符
        - int open('filename.txt',文件标志)
        - int open('filename.txt',文件标志(存在O_CREAT),权限)
