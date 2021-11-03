---
title: 工具
---

### music-dl

-   音乐下载工具[github](https://github.com/0xHJK/music-dl)
-   下载 pip,使用 pip3 下载安装
-   使用
    -   `music-dl -k "xxx"`:通过关键字搜索
    -   `-s, --source TEXT`:指定平台 source: qq netease kugou baidu
    -   `-o, --outdir TEXT`:指定下载位置(默认单曲位置)
    -   `--lyrics`:同时下载歌词
    -   `--cover`:同时下载封面

### 视频 youtube、哔哩哔哩视频下载

youtube-dl

```python
pip install youtube-dl
```

you-get  
 [github](https://github.com/soimort/you-get)

```python
pip install you-get

# cmd
you-get url

# 分析url信息,选择下载方式
you-get -i url

# 路径-o设置路径 -O设置保存名字
you-get -o 路径 -O 名字 url
```

### w3m

#### w3m 浏览网页
-   输入框[________]
    - 关闭定义到输入框 -> 回车 ->内容

-   快捷键
    -   常用
        -   H 显示帮助
        -   q 退出，会有提示的
        -   B 后退
        -   U 输入新的网址
        -   v 查看源代码
        -   R 刷新
        -   T 打开一个新标签页
        -   Ctrl+q 关闭当前标签页
        -   Esc-t 打开所有标签页，供你选择，使用 jk 来上下移动
        -   { } 在标签页中切换
        -   j,k,l,h 移动光标，就像 vim 中一样

    -   分类  
        -   s 选择缓存
        -   E 编辑缓存代码
        -   C-l 重画屏幕
        -   S 页面另存为
        -   ESC s 源码另存为
        -   ESC e 编辑图片
        -   J/K 向下/向上滚屏
        -   < > 左右滚屏
    -   缓存择模式（也就是了s以后）
        -   k, C-p 上一缓存
        -   j, C-n 下一缓存
        -   D 删除当前缓存
        -   RET 转至选择的缓存

    -   5）书签操作
        -   ESC b 打开书签
        -   ESC a 添加当前页到书签

    -   6）搜索
        -   /,C-s 向前搜索
        -   ?,C-r 向后搜索
        -   n 下一个
        -   N 上一个
        -   C-w 打开/关闭 循环搜索

    -   7）标记
        -   C-SPC 设定/取消 标记（这个键一般被输入法占用了）
        -   ESC p 转至上一标记
        -   ESC n 转至下一标记
        -   ” 使用正则表达式标记

    -   8）杂项
        -   ! 执行外部命令
        -   H 帮助
        -   o 设置选项
        -   C-k 显示接受到的cookie
        -   C-c 停止
        -   C-z 挂起（退出）
        -   q 退出（需确认）
        -   Q 退出而不确认

    -   9)行编辑模式
        -   也就是输入”U”之后，开始输入url时候的状态。
        -   C-f 光标向后
        -   C-b 光标向前
        -   C-h 删除前一字符
        -   C-d 删除当前字符
        -   C-k 删除光标后所有内容
        -   C-u 删除光标前所有内容
        -   C-a 光标到行首
        -   C-e 光标到行尾
        -   C-p 取得历史记录中的前一个词
        -   C-n 取得历史记录中的后一个词
        -   TAB,SPC 自动完成文件名
        -   RETURN 确定

### CMUS
> 终端音乐播放

-   `cmus`:进入播放界面
    -   `:add dir`:打开音乐文件夹
    -   `:clear`:清除记录
    -   `J、k、空格、回车、tab`:基本移动
    -   `c`:播放/暂停
    -   `v`:停止
    -   `s|f|r`:随机播放、顺序、循环
    -   `z|b`:上下一首
    -   `x`:重新播放
    -   `-/=`:音量-/+
    -   `e`:添加到播放列队
    -   `shift+d`:从列表删除
    -   `h|l`:快进退
    -   `1、2、3、4、5、6、7`
        -   `1.Library view`：默认播放列表
        -   `2.Sorted library view`:所有歌曲列表
        -   `3.Playlist view`:类似歌单
        -   `4.Play Queue`：播放列队
        -   7：帮助
        
-   配置
    -   rm ~/.config/cmus/cache:清除缓存
    -   `歌词插件`：直接运行cmus-lyric
