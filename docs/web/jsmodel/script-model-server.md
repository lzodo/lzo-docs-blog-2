---
title: 服务器请求
---
## AJAX
- AJAX 是特殊的http请求(对于服务器来说没有什么区别)
<!-- - 浏览器端只用XHR与fetch发出的才是AJAX请求 -->
## XMLHttpRequest
> AJAX :Asynchronous JavaScript and XML(异步的 JavaScript 和 XML);    

特点:
+ 无刷新获取数据
+ 可通过事件更新部分页面
缺点:
+ 无浏览历史，不能回退
+ 默认存在跨域问题
+ seo不友好，因为数据是后面js动态创建到页面上的，爬虫抓取不到

### 原生Ajax

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>ajax</title>
    </head>
    <body>
        <button onclick="getData()">get data</button>
    </body>
    <script>
        function getData() {
            var xhr = new XMLHttpRequest(); //创建
            // xhr.abort() 外部手动停止xhr请求，添加一个标志可以禁止重复发送请求

            // 设置响应数据类型
            xhr.responseType = "json"; //如果返回的是json字符串直接解析
            // 超时设置
            xhr.timeout = 2000; //两秒数据没回来就算超时
            xhr.ontimeout = function () {
                console.log("请求超时,请稍后重试");
            };

            //网络异常回调
            xhr.onerror = function () {
                console.log("网络异常");
            };

            // 初始化
            // 参数t用于IE调用接口缓存
            // xhr.open('GET','http://127.0.0.1:8000/geturl?params=100&age=30&t='+new Date(),async);
            // async 默认true异步,设置false 同步
            // async代表异步,去掉a变成sync就是同步
            xhr.open("POST", "http://127.0.0.1:8000/posturl");

            //设置请求头
            xhr.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );

            //发送
            //xhr.send();
            xhr.send("{param:100,age:30}"); //post传参 格式不固定

            /*
				当状态发生改变的时候 处理服务端返回结果
				xhr.readyState:0  没发请求(初始)
				               1  open()之后
							   2  send()之后
							   3  请求中
							   4  所有结果全部返回
			*/
            //当readyState发生改变时触发
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        //状态码
                        //响应行
                        console.log(xhr.status);
                        console.log(xhr.statusText); //状态字符串
                        console.log(xhr.getResponseHeaders("name")); //指定名称的响应头
                        console.log(xhr.getAllResponseHeaders()); //响应头
                        console.log(xhr.response); //响应体
                    }
                }
            };
        }
    </script>
</html>


```
### Axios请求
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Axios请求</title>
		<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.js"></script>
	</head>
	<body>
		<button onclick="getData()">get data</button>
	</body>
	<script>
		function getData(){
			//对原生axios的封装
			axios({
				url:'http://127.0.0.1:8000/posturl',
				//url参数
				params:{a:1,b:2},
				//请求体参数
			    data:{name:'ab',age:20},
				method:'POST',
				headers:{
					'key':'val'
				}
			}).then(res=>{
				console.log(res)
			})
		}

        //封装
        functioFn myAxios({
            url,
            method="GET",
            params={},
            body={}
        }){
            return new Promise((resolve,reject) => {
                //1.通过xhr 创建 ajax
                //创建xhr
                const request = new XMLHttpRequest();
                //打开连接
                request.open(method,url,true)
                //发送请求
                request.send()
                //2.1 成功了调用resolve
                //2.2 失败了调用 reject
            })
        }
	</script>
</html>

```

### Jquery Ajax
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Jquery Ajax</title>
		<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
	</head>
	<body>
		<button onclick="getData()">get data</button>
	</body>
	<script>
		function getData(){
			//对原生ajax的封装
			$.ajax({
				url:'http://127.0.0.1:8000/posturl',
				data:{a:1,b:2},
				type:'POST',
				dataType:'json',//自动解析json数据,如果不是json会报错
				timoout:2000, //设置超时
                cache:false,//不需要缓存 默认true
                processData:true,//默认对数据做格式化处理,图片上传不需要则要手动设置false
				success:function(res){
					console.log(res)
				},
				error:function(){
					console.log('失败回调')
				},
				headers:{
					'key':'val'
				}
			})
		}
	</script>
</html>

```

### XML
> 可扩展标记语言,外观与HTML类似，主要作用是用来传输存储数据的，并且全部标签都是自定义的(后期基本用json很少用XML了)

---
## Fetch
> Fetch API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分,这种功能以前是使用 XMLHttpRequest实现的。Fetch提供了一个更好的替代方法

[参考文档](https://zh.javascript.info/fetch)
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Fetch</title>
    </head>
    <body>
        <button onclick="getData()">get data</button>
    </body>
    <script>
        function getData(){
            fetch('http://127.0.0.1:8888/posturl',{
                body:'name=ab&age=20',
                method:'POST',
                headers:{ //这些 header 保证了 HTTP 的正确性和安全性，所以它们仅由浏览器控制
                    'key':'val'
                }
            }).then(res=>{ //Response 提供了多种基于 promise 的方法，来以不同的格式访问 body,每次只能用一种

                // res.text() —— 读取 res，并以文本形式返回 res
				// res.json() —— 将 res 解析为 JSON
				// res.formData() —— 以 FormData 对象（在 下一章 有解释）的形式返回 res
				// res.blob() —— 以 Blob（具有类型的二进制数据）形式返回 res
				// res.arrayBuffer() —— 以 ArrayBuffer（低级别的二进制数据）形式返回 res
                console.log(res.headers.get('Content-Type')); //获取响应头
                return res.json()
            }).then(res=>{
                console.log(res);
            })
        }
    </script>
</html>


```
---
## Express服务
```javascript
//1、引入express
const express = require('express');

//2、创建应用
const app = express();

//3、创建路由规则
// req 请求报文
// res 响应报文
app.get('/geturl',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.send('get成功');
})
app.all('/posturl',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*'); //允许跨域
	res.setHeader('Access-Control-Allow-Headers','*'); //接收客户端设置任何请求头
	
	const data = {
		name:'lzo-xun'
	}
	res.send(JSON.stringify(data));  //只能是字符串或二进制
})

//4、监听
app.listen(8000,()=>{
	console.log('服务 8000 已启动')
})
```

## Axios源码与封装
...
[链接](https://www.bilibili.com/video/BV1H5411L7FU?p=2)