---
title: VsCode 编辑器
---

## 基础运用

```javascript
/**  快速注释
光标定义到变量 -> 右键重命名符号(F2) -> 改名回车 全部引用都会一起改变
```

## 插件

### 格式化插件

- Prettier - Code formatter (vue 中可能需要安装**vetur**配合才能生效)

> 首选项->设置 搜索 formmat On Save 勾选 保存代码自动格式化(如果格式化插件可用的话); 快捷键：**alt+shift+p**

### 找括号

- Bracket Pair Colorizer 2

> 可以清楚看到多层括号层级关系，并行 js 中对层级划分

### tab缩进上色
>   shell python 这些无括号的

-   rainbow indent
### 自动更改 HTML 配对标签 1

- Auto Rename Tag

### 自动补全

- Path Intellisense

### 通过类找到样式定义地址

- CSS Peek

> 选择 class **F12**显示（vue 中无法找到组件内的类）

### 美化

- vscode-icon (设置文件夹与文件的图标)

### Emmet 快速生成 html 代码

- Mithril Emmet

语法：

```javascript
(div.headev>div.tags$.tags{tag$}*3)+(div.main>div.center>div.left{left}+div.right{right}>div.top{top}+div.bottom{bottom})+(dev.footer>a[href="javascript:"]{连接$}*10)
```

### 基础常用
- Chinese (Simplified) Language Pack for Visual Studio Code   (中文汉化包)
- Vetur (vue必装)
- EditorConfig (是一种被各种编辑器广泛支持的配置 .editorconfig)
- live server (可运行的静态文件右键直接开启服务 电脑上也要全局安装)
- Better Comments (! * todo //美化注释)
- Autoprefixer  2.2.0 (前缀 shift+ctrl+p 选择 autoprefixer CSS,电脑上也要全局安装)
- Code Runner (右键运行各种服务端代码)
- Image Preview (鼠标移入img路径显示图片)
- [codelf 右键变量命名](https://unbug.github.io/codelf/)
- power mode (输入效果)[^①]
- Polacode (代码图片生成 ctrl+shilt+p 输入 Polacode -> 选择需要的代码-生成)
- Turbo Console Log(C+A+l、S+A+c、S+A+u、S+A+d)
- vim(Bracket Pairs Colorizer 2 ,  rainbow indent，关闭缓解卡顿问题)
[^①]:Powermode: Enabled 开启插件  
Powermode: Presets 设置效果  
Powermode: Enable Shake 去除代码抖动  

## 快捷键

常用

-   ctrl+shift+` 或 5 (打开终端或多个终端)
-   ctrl+k0,ctrl+kj (折叠展开代码)
-   ctrl+alt+F (格式化)
-   ctrl+w (关闭页面)
-   alt+上下键 (移动一行)
-   shift+alt+上下键 (复制一行)
-   ctrl+/,ctrl+shift+A (单，多行注释)
-   ctrl+shift+L(选中所有相同内容)
-   
-   alt+鼠标左键(同时选择多个焦点)
-   Ctrl + Alt+上下键(上下行出现多个光标)
-   shift+alt，再使用鼠标拖动，也可以出现竖直的列光标，同时可以选中多列。
  
-   ctrl+shift+回车,往上换行 
-   ctrl+shift+K, 删除行
-   ctrl + 回车 ,往下换行
-   Home/End 行头行尾
-   ctrl+Home/End 页头页尾
-   shift + (ctrl?) + Home/End/上下左右 选择行头到行尾或页头到页尾
-   
[参考资料](https://www.cnblogs.com/jpfss/p/10956650.html)

## editorconfig 配置

[参考资料](https://juejin.cn/post/6860440041039069191#heading-10)

## Markdown
- Markdown All in One (快捷键自动不全编写markdown文档)
- Markdown Preview Enhanced (预览)
- Paste Image (快速插入图片，网站随便找图片，复制图片，ctrl+alt+v)

## 终端使用cmder
```json
{
    // "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "terminal.external.windowsExec": "C:\\WINDOWS\\System32\\cmd.exe",
    // "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
    "terminal.integrated.shell.windows": "cmd.exe",
    "terminal.integrated.env.windows": {"CMDER_ROOT": "[D:\\install\\cmder\\Cmder]"},
    "terminal.integrated.shellArgs.windows": ["/k", "[D:\\install\\cmder\\Cmder]\\vendor\\init.bat"],
}
```
- 配置默认终端
    - `ctrl+shift+P`:输入 `>terminal:select default profile`
