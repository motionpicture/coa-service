"use strict";
/**
 * 共通
 * @namespace utils.util
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createDebug = require("debug");
const moment = require("moment");
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
 * @memberof utils.util
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
        if (credentials.access_token !== '' && credentials.expired_at !== '') {
            // 認証情報があれば期限をチェック
            debug('validating existing credentials...', credentials, spareTimeInMilliseconds);
            const dateExpiredAtOfCredentials = moment(credentials.expired_at, 'YYYY-MM-DD HH:mm:ss', 'ja');
            const dateExpiredAtActually = moment().add(spareTimeInMilliseconds, 'milliseconds');
            if (dateExpiredAtOfCredentials.valueOf() > dateExpiredAtActually.valueOf()) {
                return credentials.access_token;
            }
        }
        debug('refreshing access_token...');
        credentials = yield request.post({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/token/access_token`,
            form: {
                refresh_token: process.env.COA_REFRESH_TOKEN
            },
            json: true
        }).then(throwIfNot200);
        debug('credentials refreshed', credentials);
        return credentials.access_token;
    });
}
exports.publishAccessToken = publishAccessToken;
/**
 * アクセストークンをリセットする
 *
 * @ignore
 */
function resetCredentials() {
    credentials = {
        access_token: '',
        expired_at: ''
    };
}
exports.resetCredentials = resetCredentials;
/**
 * レスポンスステータス200チェック
 * @memberof utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
function throwIfNot200(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof body === 'string') {
            // 本来認証エラーは出ないはずだが、原因不明で出ることがあるので、その場合に備えて
            if (body === exports.RESPONSE_BODY_BAD_CREDENTIALS) {
                console.error(body, 'now:', moment(), 'credentials:', credentials);
                debug('reseting credentials...');
                resetCredentials();
            }
            throw new Error(body);
        }
        // エラーレスポンスにメッセージがあった場合
        if (typeof body.message === 'string' && body.message.length > 0) {
            throw new Error(body.message);
        }
        // エラーレスポンスにステータスがあった場合
        if (body.status !== undefined && body.status !== 0) {
            throw new Error(body.status);
        }
        return body;
    });
}
exports.throwIfNot200 = throwIfNot200;
