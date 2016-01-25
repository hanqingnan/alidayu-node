'use strict';
const utils = require('../utils/utils');
const moment = require('moment');
const _ = require('underscore');

const alidayuUrl = 'http://gw.api.taobao.com/router/rest';

class AliDaYu {
    /**
     *
     */
    constructor(appKey, appSecret) {
        this.appKey = appKey;
        this.appSecret = appSecret;

        this.pubParams = {
            app_key : this.appKey,
            method : "", //alidayu 发送短信接口名称
            timestamp : "",//时间戳，格式为yyyy-MM-dd HH:mm:ss
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
     * @return {Promise}
     */
    smsSend (options) {
        options = _.extend(options,
            this.pubParams,
            {
                method : "alibaba.aliqin.fc.sms.num.send",
                timestamp : moment().format('YYYY-MM-DD HH:mm:ss'),
                sms_type : "normal"
            });
        options.sign = utils.sign(options, this.appSecret);

        let postData = formatPostData(options);
        return utils.request(postData)
            .then(function(response){
                return response;
            })
    }

    /**
     * 短信发送记录查询
     *
     * api : http://open.taobao.com/doc2/apiDetail.htm?spm=0.0.0.0.MarhXq&apiId=26039
     *
     * @param options          Ojbect       请求参数（参考：api请求参数部分
     *
     * @return {Promise}
     *
     */
    smsQuery (options) {
        options = _.extend(options,
            this.pubParams,
            {
                method : "alibaba.aliqin.fc.sms.num.query",
                timestamp : moment().format('YYYY-MM-DD HH:mm:ss')
            });
        options.sign = utils.sign(options, this.appSecret);

        let postData = formatPostData(options);
        return utils.request(postData)
            .then(function(response){
                return response;
            })
    }
}

function formatPostData(params){
    _.each(params, function(value, key){
        if(typeof params[key] === 'object')  params[key] = JSON.stringify(params[key]);
    });
    return {
        url: alidayuUrl,
        form: params,
        json: true,
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
        }
    };
}

module.exports = AliDaYu;