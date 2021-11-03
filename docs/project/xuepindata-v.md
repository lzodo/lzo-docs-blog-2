---
title: 垃圾屋大屏项目
---

### 项目背景(S)

-   公司关系帮忙获取的大屏项目

### 任务目标(T)

-   rem 适配项目页面
-   完成 UI 提供 PSD 页面布局，已经通过代理调用接口获取动态数据

### 采取的行动(A)

-   通过 vue-cli3 创建 vue2 项目
-   通过 `postcss-px2rem px2rem-loader` 是 echarts 与 elementUi 等第三方插件适配 rem

### 产生的结果(R)

-   顺利完成任务，正常交接

### 学习

-   第三方插件在 rem 环境的适配方案
-   elementUi 皮肤修改
    -   `npm i element-theme -g`
    -   `npm i element-theme-chalk -D`
    -   `et -i`:生成 element-variables.scss 文件，修改配色
    -   `et`重新编译,生成 theme 文件夹，醒目引入 theme/index.css

- [项目地址](https://gitee.com/lzo-gitee/xuepindata-v)
- [部署地址](http://rs_screen.snowpa.cn)
