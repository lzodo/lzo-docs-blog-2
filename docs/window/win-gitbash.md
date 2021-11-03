---
title: git bash
---

['参考'](https://juejin.cn/post/6844903700775845895)

## 配置文件

### git-prompt.sh

> E:\install\Git\etc\profile.d\git-prompt.sh

```shell
if test -f /etc/profile.d/git-sdk.sh
then
	TITLEPREFIX=SDK-${MSYSTEM#MINGW}
else
	TITLEPREFIX=$MSYSTEM
fi

if test -f ~/.config/git/git-prompt.sh
then
	. ~/.config/git/git-prompt.sh
else
	PS1='\[\033]0;Bash\007\]'      # 窗口标题
	PS1="$PS1"'\n'                 # 换行
	PS1="$PS1"'\[\033[32;1m\]'     # 高亮绿色
	#PS1="$PS1"'➜  '               # unicode 字符，右箭头
	PS1="$PS1"'# '               # unicode 字符，右箭头
	PS1="$PS1"'\[\e[33;36m\]lzo \[\033[31m\]@ \[\e[0m\]\[\e[32;1m\]\h\[\e[0m\]\[\e[31;1m\]'
	#PS1="$PS1"'\[\e[34;1m\]\u@\[\e[0m\]\[\e[32;1m\]\h\[\e[0m\]\[\e[31;1m\]'
	#PS1="$PS1"'\[\e[0m\]\[\e[32;1m\]\h\[\e[0m\]\[\e[31;1m\]'
	PS1="$PS1"' ~'
	PS1="$PS1"'\[\033[36m\]'       # 青色
	PS1="$PS1"' in '
	PS1="$PS1"'\[\033[33;1m\]'     # 高亮黄色
	PS1="$PS1"'\W'                 # 当前目录

	if test -z "$WINELOADERNOEXEC"
	then
		GIT_EXEC_PATH="$(git --exec-path 2>/dev/null)"
		COMPLETION_PATH="${GIT_EXEC_PATH%/libexec/git-core}"
		COMPLETION_PATH="${COMPLETION_PATH%/lib/git-core}"
		COMPLETION_PATH="$COMPLETION_PATH/share/git/completion"
		if test -f "$COMPLETION_PATH/git-prompt.sh"
		then
			. "$COMPLETION_PATH/git-completion.bash"
			. "$COMPLETION_PATH/git-prompt.sh"
			PS1="$PS1"'\[\033[31m\]'   # 红色
			PS1="$PS1"'`__git_ps1`'    # git 插件
		fi
	fi
	PS1="$PS1"'\[\033[30m\]'
	PS1="$PS1"' [\t]'

	PS1="$PS1"'\n'                 # 换行
	PS1="$PS1"'$'
	PS1="$PS1"'\[\033[37m\] '      # 青色
fi

MSYS2_PS1="$PS1"
```

### .minttyrc

-   `~/.minttyrc`

```shell
Font=DejaVu Sans Mono for Powerline
FontHeight=12
Transparency=low
FontSmoothing=default
Locale=C
Charset=UTF-8
Columns=88
Rows=26
OpaqueWhenFocused=no
Scrollbar=none
Language=zh_CN

ForegroundColour=131,148,150
BackgroundColour=30,30,30
CursorColour=220,130,71

BoldBlack=128,128,128
Red=255,64,40
BoldRed=255,128,64
Green=64,200,64
BoldGreen=64,255,64
Yellow=190,190,0
BoldYellow=255,255,64
Blue=0,128,255
BoldBlue=128,160,255
Magenta=211,54,130
BoldMagenta=255,128,255
Cyan=64,190,190
BoldCyan=128,255,255
White=200,200,200
BoldWhite=255,255,255

BellTaskbar=no
Term=xterm
FontWeight=400
FontIsBold=no
```

### .bash_profile

> 强化 ~/.bash_profile

```shell
alias .='cd ~'
alias ..='cd ..'
alias ...='cd ../..'

alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gP='git push'
alias gp='git pull'
alias g-p='git add . && git commit -m "auto deploy" && git push'

alias oe="exit"
alias oq="quit"
alias c-host='code /mnt/c/Windows/System32/drivers/etc/hosts'

# debain 类系统
alias apt="sudo apt"

.....

```

### tmux

```shell
$ git clone https://github.com/liaozhongxun/my-git-bash.git
$ cd bash
$ cp tmux/bin/* /usr/bin
$ cp tmux/share/* /usr/share -r
$ cp tools/* /usr/bin
```

[tmux 配置文件插件](https://github.com/gpakosz/.tmux)

### vscode

```json
{
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "terminal.integrated.shellArgs.windows": ["--login", "-i"]
}
```

### 终端输入 set -o vi 开启 vim 模式
