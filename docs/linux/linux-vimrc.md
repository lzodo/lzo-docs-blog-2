---
title: vimrc
---

## 配置文件 and 插件管理

### 第三方配置

## vimplus

### 安装

-   插件管理器`vimplus`
    -   `~/.vimrc为vimplus`的默认配置，一般不做修改
    -   `~/.vimrc.custom.plugins`为用户自定义插件列表，用户增加、卸载插件请修改该文件
    -   `~/.vimrc.custom.config`为用户自定义配置文件，一般性配置请放入该文件，可覆盖~/.vimrc 里的配置
-   插件存放在 `~/.vim/plugged`下
-   新插件可以直接复制进去或 vim 中执行`:PlugInstall`进行安装
-   [github](https://github.com/chxuan/vimplus)

### 插件

#### scrooloose/nerdtree

> 当于常用的 IDE 中的工程栏可以帮助我们管理和管理切换文件

```shell
Plug 'scrooloose/nerdtree'
":NERDTreeToggle<cr>   "打开或关闭nerdtree，可自定义映射热键
autocmd vimenter * NERDTree     "默认为打开nerdtree
let NERDTreeShowLineNumbers=1                   "显示行号
let NERDTreeShowHidden=1                        "宽度为1
let NERDTreeIgnore=['\.pyc','\~$','\.swp']      "忽略以下文件

//文件操作
m
    d:删除
    a:添加文件/文件夹（加斜杠）
    m:移动或改名
    o:打开gui
C:设置当前目录为项目根目录
//常用操作
h j k l移动光标定位
ctrl+w+w 光标在左右窗口切换
ctrl+w+r 切换当前窗口左右布局
ctrl+p 模糊搜索文件

gT 切换到前一个tab
g t 切换到后一个tab
u 打开上层目录
o|O打开关闭文件或者目录，如果是文件的话，光标出现在打开的文件中
x 合拢当前结点的父目录
I:显示/隐藏,隐藏文件文件
i和s将光标指向文件以水平分割或纵向分割窗口打开
```

#### vim-airline(状态栏)

#### auto-pairs("成对符号自动匹配输入")

#### vimplus-startify(启动界面美化)

### 我的插件【https://vim.hizdm.cn/language/coc-vetur.html】

-   [emmet-vim](https://github.com/mattn/emmet-vim)
    -   `ctrl-y 加 ,`:生成规则标签，相当于 tab
    -   `ctrl-y 加 d`:插入模式下，选中整个标签
    -   `ctrl-y 加 /`:插入模式下，注释整个标签
    -   `ctrl-y 加 k`:插入模式下，删除整个标签
-   格式化

    -   通用格式化

        -   vim-autoformat [参考](https://www.cnblogs.com/liuzhaoting/articles/13794745.html)

    -   vue 相关
        -   [参考](https://blog.csdn.net/weixin_34342578/article/details/89567263)

```shell
1. 语法高亮：posva/vim-vue
2. 语法检查：vim-syntastic/syntastic  + eslint-plugin-vue
3. 代码格式化：MaraniMatias/vue-formatter

npm install -g prettier -> https://zhuanlan.zhihu.com/p/34428176
npm install -g vue-formatter
```

### 快捷键(默认)

[参考](https://github.com/chxuan/vimplus)

|       快捷键        |                  说明                  |
| :-----------------: | :------------------------------------: |
|          ,          |               leader key               |
|     leader + n      |            菜单,资源管理器             |
|     leader + f      |             查找目录下文件             |
|     leader + F      |           查找当前目录下文件           |
|     leader + g      |           显示 git 提交记录            |
|     leader + G      |          显示当前文件提交记录          |
|       F9/F10        |              上下切换主题              |
|     leader + G      |          显示当前文件提交记录          |
|         f+a         |       查找字母 a,继续 f，下一个        |
|     gcc/gc/gcap     | 注释一行代码/注释选中所在行的代码/段落 |
|     leader + e      |              打开 .vimrc               |
|     leader + vc     |          .vimrc.custom.config          |
|     leader + vp     |         .vimrc.custom.plugins          |
|     leader + s      |            重新加载 .vimrc             |
| leader + leader + i |                安装插件                |
| leader + leader + u |                更新插件                |
| leader + leader + c |                删除插件                |
|     leader + F      |     全局搜索目录或文件下的单词     |

### 异常i

-   `The ycmd server SHUT DOWN (restart with ':YcmRestartServer'). YCM core library not detected; you need to compile YCM before using it. Follow the instructions in the documentation.`
    -   解决: 进入`.vim`插件下找到`YcmRestartServer`插件,执行里面的`install.py`

## vim 配置文件

```python
set nu "行号
set clipboard=unnamed "vim与外界相互复制,vim --version | grep clipboard 查看是否支持，不支持可以安装gvim
set hlsearch "搜索匹配的高亮
set cursorline "行下划线
set noswapfile "意外关闭不需要wap文件

set softtabstop=4 "tab的步长
set shiftwidth=4 ">><<缩进的步长
set expandtab "设置可把tab转成空格 :retab 可以直接重置
set showtabline=1 "tabe的标签页 0:不会出现页签、1:大于1页出现、2:只有1页也出现
set splitbelow "new分屏时，新页面在下
set splitright "vnew分屏时，新页面在右
set ignorecase "搜索无视大小写
set incsearch "搜索时匹配到的直接高亮,不要的回车
set ruler "行列位置标注
set warp "可折行
set showcmd "查看按键
set showmode "状态栏查看模式
set scrolloff=3 "距离上下多少开始滚动
set list "显示一下隐藏符号
autocmd 一个事件 *文件 :set xxx "符合某个条件做什么事情
":set all 查看所以可以用的设定
set autoread vim内文件内容变化自动更新
set autowriteall 切换文件自动保存

" color
syntax on "开启语法高亮
"colorscheme default
colorscheme darkxxxx "指定主题

" filetype 读取文件类型，o新增行时自动缩进
filetype on
filetype indent on
filetype plugin on

":h key-notation  查看自定义键位表示方法
":map  查看map的相关定义
" map|unmap  一般模式、选择模式键位设置
" nmap|nunmap 一般模式
" vmap|vunmap 选择模式
" imap|iunmap 插入模式
nmap <C-v> p "一般模式下 ctrl+v 的功能设置成粘贴
nmap <Tab> >> "一般模式下 Tab 的功能设置成缩进

" noremap 与 map作用类似但是避免死循环问题

" try
try
  error
catch
  xxx
endtry

" 引入外部文件
source  $HOME/xxxx.vim "将配置模块话到一个个vim文件中
```

### vscodevim

```javascript
{

    //设置 leader键
    "vim.leader": ",",
    //取消vim插件某些功能使用vscode自带功能
    "vim.handleKeys": {
        "<C-a>": false,
        "<C-f>": false,
        "<C-n>": false
    },
    //普通模式下非递归键位绑定，在原生vim中是noremap
    "vim.normalModeKeyBindingsNonRecursive":[
        {
            "before":["<Enter>"],
            "after":["o"]
        },
        {
            "before": ["<Leader>", "t", "t"],
            "commands": [":tabnew"]
        },
        {
            "before":["<Tab>"],
            "after":["<Shift>",">",">"]
        },
        {
            "before":["<S-Tab>"],
            "after":["<Shift>","<","<"]
        },
    ],
    //命令行模式非递归键位绑定，在原生vim中等同于norecmap
    "vim.commandLineModeKeyBindingsNonRecursive": [


    ],
    //指的是插入模式下键位绑定，在原生vim里面指的是imap
    "vim.insertModeKeyBindings":[
        {
            "before":["<C-h>"],
            "after":["<Left>"]
        },
        {
            "before":["<C-l>"],
            "after":["<Right>"]
        },
        {
            "before":["<C-j>"],
            "after":["<Down>"]
        },
        {
            "before":["<C-k>"],
            "after":["<Up>"]
        },
        {
            "before":["j","j"],
            "after":["<Esc>"]
        },
        {
            "before":["<S-j>"],
            "after":["<BS>"]
        },
    ],
    "vim.commandLineModeKeyBindings": [

    ]
}
```
