'use strict';
const aliDaYu = require('../index');
const app = new aliDaYu('appKey', 'appSecret');

describe('alidayu module', function() {
    it('sendSms',function(done){
        app.smsSend({
            sms_free_sign_name: "注册验证",
            rec_num: "13810000000",
            sms_template_code: "SMS_4410774",
            sms_param: {"code" : "123456","product" : "ss"}
        }).then(function(result){
            console.log(result);
            done();
        });
    });

    it('smsQuery',function(done){
        app.smsQuery({
            rec_num: "13810000000",
            query_date: "20160122",
            current_page: 1,
            page_size : 9
        }).then(function(result){
            console.log(result);
            done();
        });
    });
});