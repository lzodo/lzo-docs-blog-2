---
title: vscode配置C/C++环境
---
### Linux
- 安装gcc，gdb
- 建立一个文件叫作为工作区如xxx/cpp(随意)
- vscode打开上面建立的文件夹
- 安装C/C++、runcode 等 vscode插件
- 调试虫子按钮，创建launch.json -> 选择GDB/LLDB ->选择编译器-> 自动生成lunch配置文件
- 如果没有自动生成.vscode/tasks.json文件,C+S+P输入`preLaunchTask`的值,生成tasks.json
- lunch.json 的`preLaunchTask` 与tasks.json的`label`对应
- tasks.json 的args可以通过`-std`指定语言标准
- C/C++插件设置中 `C Standard`,`Cpp Standard`:设置最新语言标准
- 给std行添加断电`f5`调试，并生成可执行文件(lunch:"internalConsoleOptions": "neverOpen"关闭输入输出)

```C++

#include <iostream>
#include <string>

int main(int argc, char const *argv[])
{
	std::cout << "hello" << std::endl;
	return 0;
}
```
