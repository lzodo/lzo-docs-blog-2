---
title: 微信支付 
---
小程序前期设置
1、企业小程序才有支付相关功能，个人的不支持(企业小程序需要300认证)

微信商务号前期设置
1、微信支付平台注册收款账号，需要营业执照
2、小程序关联商户号(登录商务账号，绑定小程序的APPID)
3、小程序需要进入小程序后台 或 云开发控制台 -> 设置 -> 其他设置 -> 关联商务号进行授权

开发设置 
通过 云函数 cloudPay.unifiedOrder() 生成预支付交易单 得到res返回到web端
web端接口得到 正确的预支付交易后 通过wx.requestPayment调起支付
```javascript
// 调用云函数 得到res ，success回调内 
wx.requestPayment({
    ...res.result.payment,
    sucess(res){
        console.log('支付成功')
    }
})
```
