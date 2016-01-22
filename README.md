# 阿里大鱼nodejs版
## 安装
   npm install --save alidayu-node-sdk

## 使用
	var AliDaYu = require('alidayu-node-sdk');
   	var app = new AliDaYu('App Key', 'App Secret');

   	app.smsSend({
       	sms_type : "normal",
       	sms_free_sign_name: "短信签名", 
       	rec_num: '13599999999', 
       	sms_template_code: "SMS_640004", 
       	sms_param: {"code": "123456", "product": "测试网站"}
   	});

## 方法列表
### 发送短信

