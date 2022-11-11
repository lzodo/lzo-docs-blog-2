---
title: 微信开发者工具
---

### 与VSCODE
集成vscode,可以使用vscode插件

微信开发者工具插件位置：编辑 -> 打开编辑器扩展目录
vscode 插件位置：~/.vscode/extensions 如 `C:\Users\Administrator\.vscode\extensions`

#### 小程序 scss
1、vscode下载 easy-sass 插件，源码包复制到微信开发者工具的扩展目录下，重启微信编辑器
2、编辑 spook.easysass-0.0.6/package.json
2-1、微信工具找到easy-sass ，编辑扩展设置，`Easysass:Formats 的在 settings.json`
```javascript
"easysass.formats": [
    {
    "format": "expanded",
    "extension": ".css"
    },
    {
    "format": "compressed",
    "extension": ".min.css"
    }
]

// 改成

"easysass.formats": [
    {
    "format": "expanded", // 修改scss文件保存，生成name.wxss 不压缩
    "extension": ".wxss"
    },
    {
    "format": "compressed",// 修改scss文件保存，生成name.wxss 并压缩
    "extension": ".wxss"  
    }
]
```
3.`xxxx.wxss 改名 xxxx.scss`,修改scss,自动生成对应的wxss文件