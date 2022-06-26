---
title: vimscript
---

[学习文档](https://static.kancloud.cn/kancloud/learn-vimscript-the-hard-way/49333)

### 配置概念
---
选项(set)


映射
> 当我按下这个键时，我需要你放弃默认操作，按我的想法做
> 映射可以是同一个按键在不同模式下拥有不同的功能

特殊键
    空格 <space> 、Ctrl <c-key> 、Alt <a-key>、Shift <s-key>、 <ESC> 、回车 <cr>
---

-   map (map => normal、visual、insert)

```shell

# 用自定义按键代替默认功能键
map <new-key> <old-key>

# 用横杆代替x功能，按 - 就会删除一个字符
map - x

# 特殊按键映射
map <space> viw

# 取消映射
numap -  
```

-   nmap、vmap、imap

```shell
nmap (normal 模式下生效)
vmap (visual 模式下生效)
imap (insert 模式下生效)

# 但是执行会出现递归映射
# 映射dd时，他的结果也存在dd，但执行到后面dd后，又开执行O了

:nmap dd O<esc>jddk 

```
-   用 (n|v|i)noremap 代替 (n|v|i)map 


```shell
# 当你按下\时，Vim忽略了x的映射，仅按照x的默认操作执行。即删除当前光标下的字符 而不是删除整行。
:nmap x dd
:nnoremap \ x

```

### Operator-Pending映射

> Operator（操作）就是一个命令，你可以在这个命令的后面输入一个Movement（移动）命令

```shell
# 创建Operator 映射
onoremap ih :<c-u>execute "normal! ?^==\\+$\r:nohlsearch\rkvg_"<cr>
1              2     3     3-1  3-2           3-3 

1、映射ih
2、<c-u> 你只需要相信我这个东西可以让这个映射在任何情况下都能正常工作
3、:execute 命令后面会跟着一个Vim脚本字符，然后把这个字符串当作一个命令执行(用它是因为他可以处理特殊字符)
3-1、normal 模式执行后面符号，就跟平常敲那些字符一样
3-3、通过\r 分割，先向前查找==开头的行，:nohlsearch 清除查找高亮向上，kvg_ 向上k 选择v 到最后一个非空字符（g_）

cih 就会删除选择的这些
```

-   Operator
    -   d
    -   c
    -   y
    -   v
-   Movement映射
    -   iw、i(、i"、  操作 单词内、所在括号内、所在引号内
    -   t<chart> 操作到指定字符
    -   <number>w

### 前缀 Leader
> 让你映射的键不会覆盖掉原因的功能

```shell
# 这样normal模式下dd删除一行的功能就没有了
nnoremap dd x

# 改进,定一个自己顺手的前缀，",dd"实现x的功能，系统的dd功能不变
let mapleader=','
nnoremap <leader>dd x
```

#### Local Leader

> 为特定类型文件创建前缀

```shell
:let maplocalleader = "任意前缀"
```

### abbreviations

插入模式的 (iabbrev 替换或缩写)

```shell
# 设置好后，插入模式下按出a + 空格 ，直接将 a 替换成后面的一串
iabbrev a 很长的一串字符
iabbrev c const
```
### 自动命令

-   autocmd 指令
-   事件
    -   BufNewFile事件
    -   BufWritePre 保存任何字符到文件时触发
    -   BufRead 读取文件时触发
-   用于事件过滤的“模式（pattern）”
-   要执行的命令

```shell

:autocmd BufNewFile *.txt :write

# 在指定类型文件在保存和读取是执行格式化操作utocmd BufWritePre,BufRead *.html :normal gg=G3
:autocmd BufWritePre,BufRead *.html :normal gg=G

# 给指定文件添加指定属性
autocmd BufNewFile,BufRead *.html setlocal nowrap
autocmd BufNewFile,BufRead *.html set nonumber

```

自动命令组

```shell
# vimrc 中确保每次清除原有的
augroup filetype_html
    autocmd!
    autocmd BufWritePre,BufRead *.html :normal gg=G
augroup END
```

### 语法
---
注释：`"` 引号 ()
    

### 小技巧

-   `:echo $MYVIMRC` :任意系统找到vim 配置文件的位置与名称
-   `:inoremap <esc> <nop>`:强行取消esc默认功能
-   `Ctrl+s`无法输入后 `Ctrl+q` 解决

### 要加到配置中的
```shell
# 按 ctrl+d 让编辑器到normal模式下按两个d的,在回到insert模式
inoremap <c-d> <esc>ddi

# 插入模式单词转大写
inoremap <c-u> <esc>viwUei

# 编辑/刷新我的vimrc
nnoremap <leader>ev :vsplit $MYVIMRC<cr>
nnoremap <leader>sv :source $MYVIMRC<cr>

# 给所在单词添加双引号,并定位到单词最后面
nnoremap <leader>" viw<esc>a"<esc>hbi"<esc>lel

```
