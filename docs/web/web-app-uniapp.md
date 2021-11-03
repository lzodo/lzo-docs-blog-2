---
title: uni-app
---
> uni-app基于vue和微信小程序, 一套代码可以发布到ios、Android、h5、以及各种小程序平台

## 开启uniapp
### 环境搭建
> 安装编辑器HbuilderX [官网](https://uniapp.dcloud.io/)

### 运行
运行到小程序d -> 微信开发者工具第一次要配置安装目录,百度等也要先配置好开发者工具安装目录
配置好后，开发这者工具设置->安全->端口打开才能打开

运行到手机需要连接数据线

### 规范
页面规范一般遵守vue单文件组件格式  
标签靠近小程序规范
[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.canIUse.html)

### 条件注释跨端兼容
[条件编译](https://uniapp.dcloud.io/platform?id=%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91)
```javascript
#ifndef H5
需条件编译的代码
#endif
```
## 目录结构与项目配置
### 目录结构
```python
pages  #存放所有页面
static  #存放静态文件
unpackage  #打包h5、安卓打包成功后的文件存放位置
App.vue  #整个项目跟组件，所有页面都是在这里进行切换(生命周期在此设置)
main.js #项目的入了文件， 加载时首先走这个文件
manifest.json #配置各种打包方式的配置文件
pages.json #存放整个项目的页面路径与窗口外观
uni.scss #常用的样式全局变量
```

### 全局配置
[小程序基础配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)  
[uniapp配置文档](https://uniapp.dcloud.io/collocation/pages)

```json
//pages.json
{
	"pages": [ //=========================pages数组中第一项表示应用启动页
		{
			"path": "pages/index/index",
			"style": { //设置页面独有外观样式，属性与全局一样
                "navigationBarTitleText": "uni-app全局首页",
                "enablePullDownRefresh":true, //设置下拉刷新 uni.stopPullDownRefresh()手动关闭
                "onReachBottomDistance":"50px", //设置距离底部多少触发上拉刷新函数
                "h5":{
					"titleNView":{
						"titleText":"h5首页标题"
					}
                }
			}
		},
		{
			"path": "pages/about/new_file",
			"style": {
		        "navigationBarTitleText": "uni-app全局关于页面",
		        "h5":{
					"titleNView":{
						"titleText":"h5关于页面"
					}
		        }
			}
		}
	],
	
	"globalStyle": { //===============================配置程序全局所有页面样式
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
        "backgroundColor": "#F8F8F8",
        "enablePullDownRefresh":true //下拉刷新
	},
	
	"tabBar": { // ===================================配置底部菜单
	    "color": "#7A7E83",  //颜色
	    "selectedColor": "#3cc51f",  //选中的颜色
	    "borderStyle": "black",
	    "backgroundColor": "#ffffff",
		"position":"top", //仅微信小程序支持
	    "list": [{
	        "pagePath": "pages/index/index",
	        "iconPath": "static/logo.png", //图标路径
	        "selectedIconPath": "static/logo.png", //选中的图标路径
	        "text": "首页"
	    }, {
	        "pagePath": "pages/about/new_file",
	        "iconPath": "static/logo.png",
	        "selectedIconPath": "static/logo.png",
	        "text": "关于"
	    }]
	},
	
	"condition": { //=== 模式配置，仅开发期间生效，开发的时候直接切换开发者工具编译模式到某个页面进行开发
	    "current": 0, //当前激活的模式（list 的索引项）
	    "list": [{
	            "name": "swiper", //模式名称
	            "path": "pages/about/new_file", //启动页面，必选
	            "query": "interval=4000&autoplay=false" //启动参数，在页面的onLoad函数里面得到。
	        },
	        {
	            "name": "test",
	            "path": "pages/index/index"
	        }
	    ]
	}
}
```

### 组件
[uniapp组件](https://uniapp.dcloud.io/component/README)

#### 内置组件
```html
代替HTML标签,并加了很多参数属性
<view>
<text>
<button>
<image> 
...

<!--view新属性-->
hover-class='鼠标按下的类'
hover-stop-propagation  属性阻止事件冒泡
hover-start-time  多久延迟出现hover类效果
hover-stay-time 离开后保持多久失去效果
...
```

#### 创建组件
> 创建 ：后缀名.vue文件，视为一个组件  
> 使用 ：通过import 组件名 from "xxx"导入并通过components注册,完成之后通过标签形式使用

##### 组件通讯  

[组件通讯](https://uniapp.dcloud.io/collocation/frame/communication)
> 父传子 : 以标签形式调用组件是 :data 传到子组件, 组件中:prop['data'] 接收  
> 子传父 : this.$emit('父级自定义方法 par')， 父组件中: @par = 'xxx'  

兄弟组件传值 : 

```javascript
//组件A
//触发全局的update函数 将父子间的this换成uni
uni.$emit('update',{msg:'页面更新'})

//组件B
//监听全局的自定义事件update
uni.$on('update',function(data){
	console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
})
```

### uniapp中的样式
不同点
+ rpx  
响应式px,类似rem,根据屏幕宽度自适应的单位,以750为基准,750rex恰好为屏幕宽度,屏幕变宽,1rpx实际显示效果等比放大
750rpx相当于100%
+ style标签中 @import url("xxxx") 导入样式表
+ 不能使用 * 选择器
+ page详单与body
+ App.vue的样式为全局样式,pages下页面的样式为局部样式,覆盖全局样式 
+ 字体图标注意事项
  + 字体文件大小不能超过4kb,否则要自己手动转base64
  + 引用的时候建议使用 ~@static/fonts/xxx 开头的绝对路径引入字体
  + 字体图标放在static目录下,在App.vue中全局引入css,
+ 直接 lang="scss" 并且安装sass插件就能使用sass了,sass才能使用uni.scss里的变量

### 数据绑定事件...
与vue一样

### uni生命周期
>生命周期概念: 一个对象被创建、运行、销毁的这个过程  
>生命周期函数:生命周期每个阶段都会有相应生命周期函数自动触发

[生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle)
#### 应用的生命周期
```javascript
//App.vue
<script>
	export default {
		//应用的生命周期
		onLaunch: function() { //uniapp初始化完成触发(全程只触发一次)
			console.log('App Launch')
		},
		onShow: function() { //uniapp启动,或从后台到前台触发
			console.log('App Show')
		},
		onHide: function() { //uniapp从前台到后台触发
			console.log('App Hide')
		},
		onError: function() { //uniapp 报错触发
			console.log('App Error')
        }
        ...
	}
</script>

<style>
	/*每个页面公共css */
</style>

```

#### 页面的生命周期

```javascript
//普通页面中
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(option) {
			//监听页面加载 ，并拿到上级页面传递的参数
			//只会触发一次页面切换时不会触发
			console.log("页面加载了"+ option)
		},
		onShow() { //监听页面显示
			console.log("页面出现在屏幕上了")
		},
		onReady() { //监听页面初次渲染完成 
			console.log("监听页面初次渲染完成 ")
		},
		onHide() { //监听页面隐藏
			console.log("页面隐藏")
		},
		onUnload() { //讲台页面卸载
			console.log("页面卸载")
        },
        onPullDownRefresh(){
			console.log("用户下拉页面了")
        },
        onReachBottom(){ //向下滚动触底时触发
			console.log("用户上拉")
		},
        ...
		methods: {

		}
	}
</script>
```

#### 组件的生命周期
```javascript
//组件中
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		beforeCreate(){
			console.log("在实例初始化之后 无data数据")
		},
		created() {
			console.log("在实例创建完成后 有data数据"")
		},
		beforeMount(){
			console.log("挂载到实例上去之前调用 无dom节点")
		},
		mounted(){
			console.log("挂载到实例上去之后调用  有dom节点")
		},
		beforeUpdate 
		updated //数据更新 仅支持h5
		beforeDestroy
		destroyed //组件销毁

		......
		methods: {

		}
	}
</script>
```

## 交互
### 网络请求
[uni request](https://uniapp.dcloud.io/api/request/request?id=request)

```javascript
uni.request({
	url
	method
    data
    header
	success: (res) => {}
	...
});
```

### 数据缓存
[文档路径](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

```javascript
uni.setStorage({ //存储数据   设置的是localStorage
	key: 'storage_key',
	data: 'hello',
	success: function () {
		console.log('设置缓存success');
	}
});

uni.getStorage({ //获取数据 异步不会阻塞，有时可能获取不到
	key: 'storage_key',
	success: function (res) {
		console.log(res.data);
	}
});

uni.removeStorage({ //删除数据
	key: 'storage_key',
	success: function (res) {
		console.log('删除success');
	}
});

//加Sync的同步接口
 uni.setStorageSync('storage_key', 'hello');
 const value = uni.getStorageSync('storage_key'); //同步的一定能获取到
 uni.removeStorageSync('storage_key');
```

### 图片上传
[媒体图片](https://uniapp.dcloud.io/api/media/image?id=chooseimage)
```javascript
uni.chooseImage({
	count: 6, 
	success: function (res) {
		console.log(res.tempFilePaths); //得到路径图片路径
	}
});

//通过  uni.uploadFile 传到自己的服务器

```
### 导航跳转
#### 组件 navigator   
[navigator](https://uniapp.dcloud.io/component/navigator)
```html
<!--open-type='switchTab' 设置了才能跳转tabBar 页面-->
<!--open-type='redirect' 替换到新页面 无返回-->
<navigator url="pages/about/new_file" hover-class="navigator-hover" open-type='switchTab'>
	<button type="default">跳转到关于页面</button>
</navigator>
```

#### 路由跳转   
[uni.navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto)

```javascript
uni.navigateTo({
    url: 'pages/about/new_file'
});

//tabBar页面，并关闭其他非tabBar页面
uni.switchTab({ 
    url: 'pages/about/new_file'
});

//替换到新页面
uni.redirectTo({
    url: 'xxx'
});

//跳转通过?传的参数，通过生命周期onLoad获取参数


```

## 发行