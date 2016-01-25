# 阿里大鱼nodejs版

## 更新日志
### 1.0.2
* 增加短信发送记录查询。
* 完善文档及错误信息。
* 增加短信发送记录查询。

## 安装
   		npm install --save alidayu-node-sdk

## 使用
		var AliDaYu = require('alidayu-node-sdk');
		var app = new AliDaYu('App Key', 'App Secret');


## 方法列表
### 短信发送 [ali API](http://open.taobao.com/doc2/apiDetail.htm?spm=0.0.0.0.irwnJD&apiId=25450)
* smsSend -> Promise

		app.smsSend(options);
#### options 
* extend : 公共回传参数，在“消息返回”中会透传回该参数；举例：用户可以传入自己下级的会员ID，在消息返回时，该会员ID会包含在内，用户可以根据该会员ID识别是哪位会员使用了你的应用 `String (可选)`

* sms_type : 短信类型，传入值请填写normal `String 必选`

* sms_free_sign_name : 短信签名，传入的短信签名必须是在阿里大鱼“管理中心-短信签名管理”中的可用签名。如“阿里大鱼”已在短信签名管理中通过审核，则可传入”阿里大鱼“（传参时去掉引号）作为短信签名。短信效果示例：【阿里大鱼】欢迎使用阿里大鱼服务 `String 必选`

* rec_num : 短信接收号码。支持单个或多个手机号码，传入号码为11位手机号码，不能加0或+86。群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码。示例：18600000000,13911111111,1332222222 `String 必选`

* sms_template_code : 短信接收号码。支持单个或多个手机号码，传入号码为11位手机号码，不能加0或+86。群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码。示例：18600000000,13911111111,13322222222 `String 必选`

* sms_param : 短信模板变量，传参规则{"key":"value"}，key的名字须和申请模板中的变量名一致，多个变量之间以逗号隔开。示例：针对模板“验证码${code}，您正在进行${product}身份验证，打死不要告诉别人哦！”，传参时需传入{"code":"1234","product":"alidayu"}  `Json 必选`
#### 示例
		app.smsSend({
            sms_free_sign_name: "ccccc",
            rec_num: '13810000000',
            sms_template_code: "SMS_4810002",
            sms_param: {code: "123456"}
        }).then(function(result){
            //handle
        });

#### 响应参数
* resutl.err_code ： 错误码 `String` 
* resutl.model ： 返回结果 `String`
* resutl.success ： true表示成功，false表示失败 `Boolean`
* resutl.msg ：返回信息描述 `String`
##### 示例
		{
    		"alibaba_aliqin_fc_sms_num_send_response":{
        		"result":{
            		"err_code":"0",
            		"model":"134523^4351232",
            		"success":false,
            		"msg":"成功"
        		}
    		}
		}
#### 异常示例
		{
    		"error_response":{
        		"code":50,
        		"msg":"Remote service error",
        		"sub_code":"isv.invalid-parameter",
        		"sub_msg":"非法参数"
    		}
		}
#### 错误代码解释
* isv.OUT_OF_SERVICE	                 业务停机	登陆www.alidayu.com充值
* isv.PRODUCT_UNSUBSCRIBE	             产品服务未开通	登陆www.alidayu.com开通相应的产品服务
* isv.ACCOUNT_NOT_EXISTS	             账户信息不存在	登陆www.alidayu.com完成入驻
* isv.ACCOUNT_ABNORMAL	                 账户信息异常	联系技术支持
* isv.SMS_TEMPLATE_ILLEGAL	             模板不合法	登陆www.alidayu.com查询审核通过短信模板使用
* isv.SMS_SIGNATURE_ILLEGAL	             签名不合法	登陆www.alidayu.com查询审核通过的签名使用
* isv.MOBILE_NUMBER_ILLEGAL	             手机号码格式错误	使用合法的手机号码
* isv.MOBILE_COUNT_OVER_LIMIT	         手机号码数量超过限制	批量发送，手机号码以英文逗号分隔，不超过200个号码
* isv.TEMPLATE_MISSING_PARAMETERS	     短信模板变量缺少参数	确认短信模板中变量个数，变量名，检查传参是否遗漏
* isv.INVALID_PARAMETERS	             参数异常	检查参数是否合法
* isv.BUSINESS_LIMIT_CONTROL	         触发业务流控限制	短信验证码，使用同一个签名，对同一个手机号码发送短信验证码，允许每分钟1条，累计每小时7条。 短信通知，使用同一签名、同一模板，对同一手机号发送短信通知，允许每天50条（自然日）。

### 短信发送记录查询 [ali API](http://open.taobao.com/doc2/apiDetail.htm?spm=0.0.0.0.MarhXq&apiId=26039)
* smsQuery -> Promise
#### options 
biz_id : 短信发送流水  `String (可选)`
rec_num : 短信接收号码  `String 必选`
query_date: 短信发送日期，支持近30天记录查询，格式yyyyMMdd `String 必选`
current_page: 分页参数,页码 `Number 必选`
page_size : 分页参数，每页数量。最大值100  `Number 必选`
#### 示例
		app.smsQuery({
            rec_num: "13811111111",
            query_date: '20160122',
            current_page: 1,
            page_size : 9
        }).then(function(result){
            console.log(result);
            done();
        });
#### 响应参数
* current_page	: 当前页码 `Number`
* page_size	: 每页数量 `Number`
* total_count : 总量 `	Number`
* total_page : 总页数 `	Number`
* values.extend : 公共回传参数 `String`
* values.rec_num : 短信接收号码 `String`
* values.result_code : 短信错误码 `String`
* values.sms_code : 模板编码 `String`
* values.sms_content : 短信内容短信发送内容 `String`
* values.sms_receiver_time : 短信接收时间 `Date 2015-12-12 12:12:12`
* values.sms_send_time : 短信发送时间 `Date 2015-12-12 12:12:12`
* values.sms_status : 发送状态 `Number 1：等待回执，2：发送失败，3：发送成功`
##### 示例
		{
            "alibaba_aliqin_fc_sms_num_query_response":{
                "current_page":1,
                "page_size":10,
                "total_count":100,
                "total_page":5,
                "values":{
                    "fc_partner_sms_detail_dto":[
                        {
                            "extend":"1234",
                            "rec_num":"13000000000",
                            "result_code":"000",
                            "sms_code":"SMS_10000",
                            "sms_content":"短信内容",
                            "sms_receiver_time":"2015-12-12 12:12:12",
                            "sms_send_time":"2015-12-12 12:12:12",
                            "sms_status":1
                        }
                    ]
                }
            }
        }
#### 异常示例
		{
            "error_response":{
                "code":50,
                "msg":"Remote service error",
                "sub_code":"isv.invalid-parameter",
                "sub_msg":"非法参数"
            }
        }
#### 错误代码解释
* isv.OUT_OF_SERVICE					业务停机	登陆www.alidayu.com 进入管理中心充值
* isv.MOBILE_NUMBER_ILLEGAL				手机号码格式非法	使用合法的手机号码
* isv.QUERY_DATE_ILLEGAL				查询时间非法	支持近30天记录查询。
* isv.SPLIT_PAGE_ILLEGAL				分页参数不合法	每页最大显示50条记录
* isv.INVALID_PARAMETERS				参数异常	检查参数合法性
* isv.ACCOUNT_NOT_EXISTS				账户信息不存在	入驻阿里大鱼