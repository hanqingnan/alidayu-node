'use strict';
const aliDaYu = require('../index');
const app = new aliDaYu('', '');

describe('alidayu module', function() {
        it('sendSms',function(done){
            app.smsSend({
                sms_type : "normal",
                sms_free_sign_name: "爱有味",
                rec_num: '13810708420',
                sms_template_code: "SMS_4810002",
                sms_param: {code: "123456"}
            }).then(function(result){
                console.log(result);
            });
        });
});