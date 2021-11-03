---
title: Mockjs
---
> 模拟接口数据前后端分离开发
[Mock官网](http://mockjs.com/)

```shell
npm install mockjs -D //项目中安装
```

## vue中使用

### 定义
```js
//mock/index.js
import Mock from "mockjs"

/*
    Mock.mock(url?,type?,template|function(option))
    参数一:可选，表示要拦截的URL地址(发送一个请求,如果请求地址Mock过了,直接拦截不回去服务器请求了)
    参数二:可选，请求类型
    参数三:回调
*/ 


//Mock构造数据
var Random = Mock.Random //占位符生成随机数
//@符号只能在Mock.mock中使用
//Random的自定义随机数
Random.extend({
    selfrandom:function(data){
        let selfrandoms = ['str1','str3']
        return this.pick(selfrandoms)
    }
})

Mock.mock('/api/mockget','get',{
    status:200,
    message:'获取成功',
    'data|5-10':[{  //生成5到10条
        'id0|+1':0,  //id自增
        step1:Random.increment(2), //生成值步长2
        step2:'@increment(2)',
        text2:Random.csentence(2,8),//生成2到8个文字
        text1:'@csentence(2,8)',
        img1:Random.dataImage( '50x50', 'text 图片文字' ), //生成图片
        img2:'@dataImage("50x50")',
        self:'@selfrandom'
    }]
})

Mock.mock('/api/mockpost','post',function(option){
    console.log(option)
    return Mock.mock({
        status:200,
        message:'提交成功',
    })
})
Mock.mock(/\/api\/mockpostexp/,'post',function(option){  //只要调用的接口地址匹配正则就拦截
    //...
})
```
### 导入
```js
//mainjs
import './mock'

import axios from 'axios'
Vue.prototype.$http = axios
```

### 使用
```js
//App.vue
<template>
    <div id="app">
        Mockjs
        <button @click='getdata'>获取get数据</button>
        <button @click='postdata'>获取post数据</button>
    </div>
</template>
<script>
export default {
    name: 'app',
    methods:{
        async getdata(){
            const {data:res} = await this.$http.get('/api/mockget');
            console.log(res)
        },
        async postdata(){
            const {data:res} = await this.$http.post('/api/mockpost',{'name':'post提交参数'});
            console.log(res)
        }
    },
}
</script>
```