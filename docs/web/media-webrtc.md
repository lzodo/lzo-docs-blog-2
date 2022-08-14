---
title: webrtc
---

**getUserMedia**
该方法提醒用户是否允许使用音视频设备（摄像头、屏幕共享、麦克风等）
如果允许则返回数据流，拒绝返回错误对象，不选择也是无法调用成功

```javascript

// constraints 指定请求媒体类型
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    console.log(stream)
})

```

=================================================================
**getUserMedia**
描述

```javascript

```
