---
title: makefile
---
- 编辑控制脚本将`.c、.h` 转`bin`

### 单文件编译流程演示
```c
# 1、预编译

gcc -E index.c -o index.i  

# 将index.c 预编译成index.i
# 展开共定义，引入头文件

# 2、编译到汇编

gcc -S index.i -o index.s 

# 将.i文件汇编输出到.s文件中，将C转汇编代码(有助记符的机器码)
# .s文件里是汇编代码,去除了很多c语言的语法


# 3、对汇编文件进行汇编

gcc -C index.s -o hello.o

# 将汇编转机器码
# 通过file index.o 查看编码就是LBS


# 4、链接-产生可执行文件
gcc index.o -o index
多个.o文件的一下操作


gcc其他参数:
    - -g  编译输出应该产生调试信息
    - -D  可以走共定义(-DXXXXX)
    - -I  系统的头文件配置了环境变量，有时自动定义的头文件，需要通过-I指定
    - -l  如果用到环境变量下的库，用l指定编译需要用到的库(qt库 -lqt)
    - -L  编译用到的库库没加入环境变量(-L/usr/src/xxx, -L./xxxxxx)
        - 静态库.a , gcc --static限制只能用静态库
        - 动态库.os
        kk
    - -o  输出优化选项
    - Wall 输出警告
        
"==================================================
"以上是编译流程不加参数可以一步到位直接生成机器码

gcc index.c index.o

```
### Makefile批量编译

- `make`指令
    -   make 声明 项目的编译过程与依赖关系
    -   作用:在当前文件夹查找`Makefile`或`makefile(默认)`文件,按照Makefile设计方式编译当前文件夹下的文件
    -   `make clean`:解除编译文件恢复到编译前的样子


### Makefile显示规则
```makefile
target:dep "目标(编译成的文件):依赖(被编译文件)
    cmd    "指令
    
"例-- 如果index.i不存在，会先走下面的，如果后面有生成index.i,那么会继续执行,生成.s文件
index.s:index.i
    gcc -S index.i -o index.s
index.i:index.c
    gcc -E index.c -o index.i
index.o:index.s
    gcc -C index.s -o index.o

"例------------------------------------------ 多文件
"如果目录下拥有index1.c、index2.c、index3.c 三个文件

TARGET=targetFileName
OBJ:=index1.o index2.o
OBJ+=index3.o

"CC=gcc 那么下面的gcc就能替换层$(CC) "
$(TARGET):$(OBJ) "将多个.o文件输出到一个对象文件中
    gcc $(OBJ) -o $(TARGET)

index1.o:index1.c
    gcc -C index1.c -o index1.o
index2.o:index2.c
    gcc -C index2.c -o index2.o
index1.o:index1.c
    gcc -C index3.c -o index3.o


.PHONY: "这个的是为对象，make clean 就会执行指定命令
clean(随机):
    rm -rf $(OBJ) $(TARGET)  "删除所有OBJ里和汇总文件


"例---------------------------------  多文件(通配符)
"如果目录下拥有index1.c、index2.c、index3.c 三个文件

TARGET=targetFileName
OBJ:=index1.o index2.o
OBJ+=index3.o

$(TARGET):$(OBJ) "将多个.o文件输出到一个对象文件中
    gcc -C $^ -o $@

index1.o:index1.c
    gcc -C $^ -o $@
index2.o:?ndex2.c
    gcc -C $^ -o $@
index1.o:index1.c
    gcc -C $^ -o $@

# 遵循xx.o是由xx.c生成用%通配符代替，gcc自动检索，这种可以隐藏不写
%.o:%.c
    gcc $^ -o $@

.PHONY: "这个的是为对象，make clean 就会执行指定命令
clean(随机):
    rm -rf *.o $(TARGET)  "删除所有OBJ里和汇总文件
```

### Makefile语法
#### 变量
- OBJ= 写死无法改变
- OBJ:= 后期可以通过 OBJ+= 追加数据
#### 伪目标
.PHONY: "这个的是为对象，make clean 就会执行指定命令
clean(随机):
    rm -rf xxxx

#### 通配符
- `*`:所有
- `%`:任意一个
- `?`:index1eeeeee.c 可以用 index1e?.c代替

- `$@`:代表目标文件
- `$^`:代表依赖文件
- `$<`:代表第一个依赖文件


### linux软件发布流程
- 生成二进制文件telnet
- readelf 
    - `-s telnet`:查看符号表
    - `-h telnet`:查看头信息
- `objcopy --only-keep-debug telnet telnet.symbol.v1.0`:生成telnet的符号表(自己或别人都能通过符号表调试)
- `objcopy --strip-debug telnet telnet-release`:生成发布程序-比telnet少了一些符号表
- `strip telnet-release`:深度清除，防逆向,符号表减少
- `gdb -q --symbol=telnet.symbol.v1.0 --exec=telnet-release strip telnet-release`:使用自己生成的symbol符号表调试release程序
- `symbol-file ./telnet.symbol.v1.0`




termmap库
