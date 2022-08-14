---
title: webrtc
---
[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)

**getUserMedia**
该方法提醒用户是否允许使用音视频设备（摄像头、屏幕共享、麦克风等）
如果允许则返回数据流，拒绝返回错误对象，不选择也是无法调用成功

```javascript

// 如果需要兼容其他或老的浏览器
navigator.mediaDevices = navigator.mediaDevices|| navigator.webkitGetUserMedia|| navigator.mozGetUserMedia;

// constraints 指定请求媒体类型
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    // 成功获取视频流 直接播放
    video.srcObject = stream;
}).catch((err)=>{
    // PermissionDeniedError: 被用户或系统拒绝
    // NotFoundError: 找不到 constraints 类型
})

```

=================================================================
**getUserMedia**
描述

```javascript

```
