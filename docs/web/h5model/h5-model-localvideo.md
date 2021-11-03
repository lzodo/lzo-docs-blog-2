---
title: h5 本地摄像头视频采集
---

## 获取本地视频流
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>

	<body>
		<video id="video" width="300px" height="300px"></video>
	</body>
	<script>
		/*
            获取本地视频流
            1. 需要一个接口提供当前方法调用的一些功能
                navigation:提供视频流注册的一些活动
            2. 获取相机权限、开启摄像头
                mediaDevices:提供访问链接媒体输入的设备(相机、麦克风、视频等)
            3. 得到用户设备,使用户同意开启摄像头权限
                getUserMedia
			4. 得到用户的视频媒体流,输出到video
			注意:http协议无法通过ip形式获取getUserMedia,只能通过localhost或改https
        */
		var constraints = { video: true ,audio:false}; //video: true 使用户可以同意开启
		navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
			//调用设备成功后执行的回调
			var video = document.querySelector("video");
			//输出到video
			video.srcObject = mediaStream;
			//视频流加载成功后播放
			video.onloadedmetadata = () => {
				video.play();
			};
		});
	</script>
</html>

```