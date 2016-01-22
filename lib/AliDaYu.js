'use strict';
const utils = require('../utils/utils');
const moment = require('moment');
const _ = require('underscore');

class AliDaYu {
    /**
     *
     */
    constructor(appKey, appSecret) {
        this.alidayuUrl = 'http://gw.api.taobao.com/router/rest';

        //TOP分配给应用的AppKey。
        this.appKey = appKey;
        this.appSecret = appSecret;

        this.pubParams = {
            app_key : this.appKey,
            method : "", //alidayu 发送短信接口名称
            timestamp : moment().format('YYYY-MM-DD HH:mm:ss'),//时间戳，格式为yyyy-MM-dd HH:mm:ss
            format : "json",//响应格式 此module中默认用json
            v : "2.0",
            sign_method : "md5"
        };
    }

    /**
     * 发送短信
     *
     * api ：http://open.taobao.com/doc2/apiDetail.htm?spm=0.0.0.0.uyWK3Z&apiId=25450&docType=
     *
     * @param options          Ojbect       请求参数（参考：api请求参数部分）
     *
     */
    smsSend (options) {
        options = _.extend(options, this.pubParams, {method : "alibaba.aliqin.fc.sms.num.send"});
        let sign = utils.sign(options, this.appSecret);
        options = _.extend(options, {sign : sign});

        //请求接口
        var postData = {
            url: this.alidayuUrl,
            form: options,
            json: true,
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        };
        return utils.request(postData)
            .then(function(response){
                return response;
            })
    }
}

module.exports = AliDaYu;