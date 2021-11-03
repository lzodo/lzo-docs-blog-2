---
title: rtsp视频流播放方案(直播、摄像头)
---

## 无插件(FFmpeg+NGINX+nginx-rtmp-module)

[参考](https://www.cnblogs.com/warcraft/p/11216228.html)
[海康摄像头解析格式](https://www.cnblogs.com/still-smile/p/13702292.html)

> 要求:linux 系统、rtsp 视频流地址

> 思路:通过FFmpeg将rtsp转trmp,或转m3u8,服务器生成.m3u8地址给前端，web端之间通过video.js或腾讯视频插件直接播放视频

-   linux 安装 FFmpeg
-   安装[nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module#example-nginxconf)
    -   备用地址[nginx-rtmp-module](https://github.com/liaozhongxun/nginx-rtmp-module.git)
    -   `cp -rf xxx/nginx-rtmp-module/ /home/user/`:将插件复制到`家目录`下
-   安装 nginx
    -   `./configure --prefix=/usr/local/nginx --add-module=/home/user/nginx-rtmp-module --with-http_ssl_module`：配置带上`nginx-rtmp-module`路径
    -   make&&make install
    -   配置文件添加 rtmp 配置
    -   重启 nginx
-   解析转trmp
    -   普通 rtsp:`ffmpeg -i rtsp://admin:12345@172.27.35.56 -acodec aac -strict experimental -ar 44100 -ac 2 -b:a 96k -r 25 -b:v 500k -f flv rtmp://127.0.0.1:1935/myapp/test1`
    -   海康摄像头:`ffmpeg -re -rtsp_transport tcp -i "rtsp://admin:Aa123456@192.168.3.111:554/Streaming/Channels/1" -f flv "rtmp://127.0.0.1:1935/myapp/test1"`

- 解析转m3u8(海康摄像头需要 加`-re -rtsp_transport tcp`)
    - `ffmpeg -re -rtsp_transport tcp -i "rtsp://admin:Aa123456@192.168.3.111:554/Streaming/Channels/1" -vcodec copy -acodec aac -ar 44100 -strict -2 -ac 1 -f flv -q 10 -f flv "rtmp://127.0.0.1:1935/hls/test2"`

    -   成功的话终端会不断接收数据
    -   浏览器输入`rtmp://127.0.0.1:1935/myapp/test1`或者或者本地支持的播放器正常播放则转rtmp码成功
    -   播放器使用`http://127.0.0.1:80/hls/test2.m3u8`或者web页面通过video.js 等支持码m3u8的播放插件播放
- 

### nginx 配置文件

```shell
worker_processes  1;


events {
    worker_connections  1024;
}

# 主要是这个
rtmp {
    server {
        listen 1935;

        application myapp {
            live on;
        }
        application hls {
            live on;
            hls on;
            hls_path /tmp/hls;
        }
    }
}


http {
    include       mime.types;
    default_type  application/octet-stream;


    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }
        # .m3u8需要的配置
        location /hls {  
            types {  
                application/vnd.apple.mpegurl m3u8;  
                video/mp2t ts;  
            }  
            root /tmp;  
            add_header Cache-Control no-cache;  
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```
