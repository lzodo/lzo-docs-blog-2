---
title: 接口文档
---
安装
```shell
npm install apidoc -g
```

根目录配置文件 `apidoc.json`
```json
{
  "name": "example",
  "version": "0.1.0",
  "description": "apiDoc basic example",
  "title": "Custom apiDoc browser title",
  "url" : "https://api.github.com/v1"
}
```

项目标记
```javascript
/**
 *   @api {GET} logistics/policys 请求 + 接口地址
 */

/**
 * @api 标签是必填的，只有使用 @api 标签的注释块才会被解析生成文档内容   
 *     格式  @api {method} path [title]    选填
 *      
 * @apiDescription 对 API 接口进行描述
 *     格式  @apiDescription text
 * 
 * 
 * @apiGroup 表示分组名称，它会被解析成一级导航栏菜单。
 *     格式 @apiGroup name
 * 
 * @apiName 表示接口名称
 *     格式 @apiName name
 *
 * @apiVersion 表示接口的版本，和 @apiName 一起使用。
 *     格式 @apiVersion version
 *
 * @apiParam 定义 API 接口需要的请求参数。
 *
 *
 * @apiPermission 定义 API 接口需要的权限点。
 *     格式 @apiPermission name
 *
 *
 *
 */
 
```

