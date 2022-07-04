---
title: 问题
---

### 短信服务
> - 验证码发送功能需要腾讯云，阿里云等平台提供
> - 去他们官网找云通信模块，里面用短信、语音、邮件等通信服务
> - [腾讯云 node sdk 包与接入方式](https://github.com/qcloudsms/qcloudsms_js)
> - 对接数据
>   - 需要去申请短信那里，创建应用找到应用ID （AppId）
>   - 进入应用找到（AppKey） 
>   - 选择模板ID(给与短信不同提示，发送不同内容)

```javascript
var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400009099;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "9ff91d87c2cd7cd0ea762f141975d1df37481d48700d70ac37470aefc60f9bad";

// 需要发送短信的手机号码
var phoneNumbers = ["21212313123", "12345678902", "12345678903"];

// 短信模板ID，需要在短信应用中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

// 签名
var smsSign = "腾讯云";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, cres, resData) {
    if (err) {
        console.log("err: ", err);
        res.send({
            code: -1,
            message:"发送失败"
        })
    } else {
        console.log("request data: ", cres.req);
        console.log("response data: ", resData);

        res.send({
            code:0,
            data:{
                viscode:cres.req.body.params[0]   // 找到验证码所在位置，前端拿到，用户登录时与这个加密对比
            }
        })
    }
}

// 指定发送方式(群发或单发)
var ssender = qcloudsms.SmsSingleSender();
var params = [Math.floor(Math.random()*8999) + 1000];
ssender.sendWithParam(86, phoneNumbers[0], templateId,
  params, smsSign, "", "", callback);  // 签名参数不能为空串
```