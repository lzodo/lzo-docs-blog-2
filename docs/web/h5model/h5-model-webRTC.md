---
title: webRTC 直播功能
---
[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)
## webRTC 链接
1. 呼叫者通过navigator.mediaDevices.getUserMedia()  捕获本地媒体
2. 呼叫者创建一个RTCPeerConnection 并调用 RTCPeerConnection.addTrack() (注： addStream 已经过时。)
3. 呼叫者调用 ("RTCPeerConnection.createOffer()")来创建一个提议(offer).
4. 呼叫者调用 ("RTCPeerConnection.setLocalDescription()") 将提议(Offer)   设置为本地描述 (即，连接的本地描述).
5. setLocalDescription()之后, 呼叫者请求 STUN 服务创建ice候选(ice candidates)
6. 呼叫者通过信令服务器将提议(offer)传递至 本次呼叫的预期的接受者.
7. 接受者收到了提议(offer) 并调用 ("RTCPeerConnection.setRemoteDescription()") 将其记录为远程描述 (也就是连接的另一端的描述).
8. 接受者做一些可能需要的步骤结束本次呼叫：捕获本地媒体，然后通过RTCPeerConnection.addTrack()添加到连接中。
9. 接受者通过("RTCPeerConnection.createAnswer()")创建一个应答。
10. 接受者调用 ("RTCPeerConnection.setLocalDescription()") 将应答(answer)   设置为本地描述. 此时，接受者已经获知连接双方的配置了.
11. 接受者通过信令服务器将应答传递到呼叫者.
12. 呼叫者接受到应答.
13. 呼叫者调用 ("RTCPeerConnection.setRemoteDescription()") 将应答设定为远程描述. 如此，呼叫者已经获知连接双方的配置了.