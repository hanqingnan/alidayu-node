'use strict';
const crypto = require('crypto');
const request = require('request');
const _ = require('lodash');
const util = require('util');
const Promise = require('bluebird');

/**
 * 工具
 *
 *
 * @type {{md5: Function}}
 */
module.exports = {
    /**
     * MD5加密
     *
     * @param   sourceData           String          待加密字符串
     *
     * @return  String
     *
     */
    md5 : function(sourceData){
        return crypto.createHash('md5')
            .update(sourceData, 'utf8')
            .digest('hex')
            .toUpperCase();
    },
    /**
     * 签名
     *
     * @param options
     * @param appSecret
     *
     */
    sign : function(options, appSecret){
        let keys = _.keys(options).sort();
        let preStr = [appSecret];

        _.forEach(keys, function(key){
            let value = options[key];
            if(util.isObject(value)) value = JSON.stringify(value);

            preStr.push([key, value].join(''));
        });
        preStr.push(appSecret);

        return this.md5(preStr.join(''));
    },
    /**
     * 请求
     *
     * @param url
     * @param params
     *
     * @returen {promise}
     */
    request : function(params){
        return new Promise(function(resolve,reject){
            request.post(params, function(err, httpResponse, body) {
                if (err) reject(err);

                resolve(body);
            });
        });
    }
}
