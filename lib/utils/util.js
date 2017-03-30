"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 共通
 * @namespace utils.util
 */
const createDebug = require("debug");
const request = require("request-promise-native");
const debug = createDebug('coa-service:utils:util');
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
 * アクセストークンの有効期限までの猶予時間初期値
 *
 * @ignore
 */
const DEFAULT_SPARE_TIME_IN_MILLISECONDS = 60000;
/**
 * 認証エラーの場合のレスポンスボディ文字列
 *
 * @ignore
 */
exports.RESPONSE_BODY_BAD_CREDENTIALS = 'Bad credentials';
/**
 * アクセストークンを発行
 * @memberOf utils.util
 * @function publishAccessToken
 * @param {number} [spareTimeInMilliseconds] アクセストークンの有効期限までの猶予時間
 * @returns {Promise<string>}
 */
function publishAccessToken(spareTimeInMilliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        // アクセストークン有効期限チェック
        // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
        if (spareTimeInMilliseconds === undefined) {
            spareTimeInMilliseconds = DEFAULT_SPARE_TIME_IN_MILLISECONDS;
        }
        debug('credentials is', credentials);
        if (credentials.access_token === '' || Date.parse(credentials.expired_at) < Date.now() - spareTimeInMilliseconds) {
            debug('refreshing access_token...');
            credentials = yield request.post({
                simple: false,
                url: process.env.COA_ENDPOINT + '/token/access_token',
                form: {
                    refresh_token: process.env.COA_REFRESH_TOKEN
                },
                json: true
            }).then(throwIfNot200);
        }
        debug('credentials is', credentials);
        return credentials.access_token;
    });
}
exports.publishAccessToken = publishAccessToken;
/**
 * アクセストークンをリセットする
 *
 * @ignore
 */
function resetAccessToken() {
    credentials = {
        access_token: '',
        expired_at: ''
    };
}
exports.resetAccessToken = resetAccessToken;
/**
 * レスポンスステータス200チェック
 * @memberOf utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
function throwIfNot200(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof body === 'string') {
            // 本来認証エラーは出ないはずだが、原因不明で出ることがあるので、その場合に備えて
            if (body === exports.RESPONSE_BODY_BAD_CREDENTIALS) {
                resetAccessToken();
            }
            throw new Error(body);
        }
        if (typeof body.message === 'string' && body.message.length > 0)
            throw new Error(body.message);
        if (body.status !== undefined && body.status !== 0)
            throw new Error(body.status);
        return body;
    });
}
exports.throwIfNot200 = throwIfNot200;
