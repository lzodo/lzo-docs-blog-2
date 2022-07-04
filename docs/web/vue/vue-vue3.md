---
title: vue3
---
## 基础信息
### 对比vue2
- vue3源码采用typescript开发,对typescript支持友好
- 源码体积优化，移除部分api,采用tree-shaking
- 数据劫持优化:vue3采用proxy,大大提升性能(vue2数据采用 Object.defineProperty)
- 编译优化:vue3采用静态模板分析、重写diff算法
- CompositionAPI:整合业务代码逻辑，提取公共算法
- 自定义渲染器:可以用来创建自定义渲染器改写vue底层渲染逻辑
- 新增  Fragment、Teleport、Suspense组件
- Fragment 作用 不再限制模板中的单个根节点(template 下可以有多个标签)
- Suspens 作用 可在嵌套层级中等待嵌套的异步依赖项目

https://www.bilibili.com/video/BV1qK41137XX?p=3
manjaro
### Composition API代替 Options API
将data、methods、watch、filter => 以 setup(){} 入口

## 变化
### setup
> setup是一个新的组件选项，做为在组件内使用Composition API的入口  

特点
+ 初始化在porps和beforeCreate之间处理
+ 可以接收porps和context两个参数
+ setup中无this

## 构建响应式数据
### ref(基于 Object.defineProperty) 
> `用于简单值`
+ 接受一个参数并返回一个可改变的响应式ref对象
+ ref对象有一个指向内部值的单一属性value

ref 单个
```javascript
let count = ref(0);
count.value++;
//数据返回
return{
    count
}
//模板
{{count}}
```

```javascript
let state = ref({
    count: 0
});
state.value.count++;
//数据返回
return{
    state
}
//模板
{{state.count}}
```
### reactive(基于Proxy)  
> reactive构建,基于proxy对数据进行深度监听,`用于复杂值`  

```javascript
let state = reactive({
    count:0
});
state.count++ 
//数据返回
return{
    state
}
//模板
{{state.count}}
```

