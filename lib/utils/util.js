"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 共通
 * @namespace utils.util
 */
const request = require("request-promise-native");
/**
 * API認証情報
 *
 * @ignore
 */
let credentials = {
    access_token: '',
    expired_at: ''
};
/**
 * アクセストークンを発行
 * @memberOf utils.util
 * @function publishAccessToken
 * @returns {Promise<string>}
 */
function publishAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.COA_ENDPOINT || !process.env.COA_REFRESH_TOKEN) {
            throw new Error('coa-service requires initialization.');
        }
        // アクセストークン有効期限チェック
        // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
        const SPARE_TIME = 60000;
        if (!credentials.access_token || Date.parse(credentials.expired_at) < Date.now() - SPARE_TIME) {
            const body = yield request.post({
                simple: false,
                url: process.env.COA_ENDPOINT + '/token/access_token',
                form: {
                    refresh_token: process.env.COA_REFRESH_TOKEN
                },
                json: true
            }).then(throwIfNot200);
            credentials = body;
        }
        return credentials.access_token;
    });
}
exports.publishAccessToken = publishAccessToken;
/**
 * レスポンスステータス200チェック
 * @memberOf utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
function throwIfNot200(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof body === 'string')
            throw new Error(body);
        if (body.message)
            throw new Error(body.message);
        if (body.status !== undefined && body.status !== 0)
            throw new Error(body.status);
        return body;
    });
}
exports.throwIfNot200 = throwIfNot200;
