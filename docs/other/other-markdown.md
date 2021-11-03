---
title: Markdown
date: 2016-12-10 14:00:57
tags: 
    - 标记语言
---
#### 1~6个#分别代表 1~6级标题

#### 前后 ``` 创建代码编辑区
```javascript
var a = 10;
```

#### 一个 > 标注行头, 两个则嵌套
>> 尖括号嵌套

---
#### 缩进、换行
缩进
```
&emsp;或&#8195; //全角
&ensp;或&#8194; //半角
&nbsp;或&#160;  //半角之半角
```
&emsp;这是缩进的一句话  
这是一句话

换行
+ 连个空格加回车
+ 一个回车加回车

---
#### 段落
加粗 

```
**Cmd Markdown**
__Cmd Markdown__
```

+ 加粗 **Cmd Markdown**
+ 加粗 __Cmd Markdown__

倾斜 
```
  *倾斜* 
  _倾斜_
```

+ *倾斜*
+ _倾斜_

斜粗 
```
  ***斜粗***
  ___斜粗___
```

+ ***斜粗***
+ ___斜粗___

删除线
```
  ~~删除线~~
```

+ ~~删除线~~



脚注

创建脚注格式类似这样 [^RUNOOB]。

[^RUNOOB]: 定义好的脚注文字


①、②、③、④、⑤、⑥、⑦、⑧、⑨、⑩
⑪、⑫、⑬、⑭、⑮、⑯、⑰、⑱、⑲、⑳


分隔线
```
  ---
```
---


#### * 创建列表

```
 * List1
 * List2
 * List3
 + List1
 + List2
 + List3
 - List1
 - List2
 - List3
```
 * List1
 * List2
 * List3
 + List1
 + List2
 + List3
 - List1
 - List2
 - List3

#### ! [ alt属性值 ] (图片路径)   //创建一个图片

> ![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

#### [连接内容] (连接地址 "title")    创建一个连接
> [百度](https://www.baidu.com "TITLE")  

```
多链接[Google][1]、[Leanote][2]。

[1]:http://www.google.com 
[2]:http://www.leanote.com
```
多链接[Google][1]、[Leanote][2]。
[1]:http://www.google.com
[2]:http://www.leanote.com



#### < i class="icon-file " > < /i >   引用ico小图标
> <i class="icon-file"></i>

#### 前后一个 ` ,添加背景
> `Ctrl+Alt+N` 

#### - [x] 复选框  前后必须是空行(没有叉叉代表没选中)

- [ ] 任务一 未做任务 `- 加 空格 加 [ ]`
- [x] 任务二 已做任务 `- 加 空格 加 [x]`

#### 绘制表格  | ---: | :--- |:---:| 控制方向 有这种线的上行代表表头

```
| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |
```


| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |

### 流程图

```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```

---

特性:
+ 未包含的标签, 可以直接使用 HTML标签，例如用 HTML &lt;a>标签替代 Markdown 的链接语法
+ 也支持HTML注释
+ [//]:#zhushi


---
编辑软件推荐
+ [typora](https://typora.io/)
