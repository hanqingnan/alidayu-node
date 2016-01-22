'use strict';
const utils = require('../utils/utils');
const moment = require('moment');
const assert = require('assert');
const _ = require('lodash');

const options = {
    app_key : this.appKey,
    method : "alibaba.aliqin.fc.sms.num.send", //alidayu 发送短信接口名称
    timestamp : "YYYY-MM-DD HH:mm:ss",//时间戳，格式为yyyy-MM-dd HH:mm:ss
    format : "json",//响应格式 此module中默认用json
    v : "2.0",
    sign_method : "md5",
    sms_type : "normal",
    sms_free_sign_name: "短信签名",
    rec_num: '13599999999',
    sms_template_code: "SMS_640004",
    sms_param: {code: "123456"}
};

describe('alidayu module util', function() {
    it('sign',function(done){
        let sign = utils.sign(options,'xxxxx');

        done(assert.equal(sign,'262F691176B4E1F0D3E381D58EC8FF02'));
    });

    it('POST : request alidayu api ',function(done){
        let sign = utils.sign(options,'xxxxx');
        let params = _.merge(options, {sign : sign});
        var postData = {
            url: 'http://gw.api.taobao.com/router/rest',
            form: params,
            json: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        utils.request(postData)
            .catch(function(err){
                console.log(err);
                done();
            })
            .then(function(response){
                console.log(response);
                done();
        });
    });
});

