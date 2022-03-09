---
title: websocket
---
## 简介
> websocket是一个能主动向前端发送消息的长链接,实时更新数据
> 长短连接指的是客户端和服务端建立和保持TCP连接的机制。
### 分类
前端得到数据的方式一般有两类
- 长链接（可以复用TCP连接）(h5 websocket,socket.io...)
  - 链接周期长，服务端主动推送消息,实时更新数据
  - socket.io 兼容性较好
- 短连接（不可以复用TCP连接）
  http1.0 获取一次数据，建立一条TCP链接，得到数据，断开


### websocket
### SSE
> SSE 支持短轮询、长轮询和HTTP 流，而且能在断开连接时自动确定何时重新连接。


https://juejin.cn/post/7036317857239695373