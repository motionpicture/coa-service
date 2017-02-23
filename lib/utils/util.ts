/**
 * 共通
 * @namespace utils.util
 */
import * as request from 'request-promise-native';

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
export async function publishAccessToken(): Promise<string> {
    if (!process.env.COA_ENDPOINT || !process.env.COA_REFRESH_TOKEN) {
        throw new Error('coa-service requires initialization.');
    }

    // アクセストークン有効期限チェック
    // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
    const SPARE_TIME = 60000;
    if (!credentials.access_token || Date.parse(credentials.expired_at) < Date.now() - SPARE_TIME) {
        const body = await request.post({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/token/access_token',
            form: {
                refresh_token: process.env.COA_REFRESH_TOKEN
            },
            json: true
        }).then(throwIfNot200);

        credentials = body;
    }

    return credentials.access_token;
}

/**
 * レスポンスステータス200チェック
 * @memberOf utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
export async function throwIfNot200(body: any): Promise<any> {
    if (typeof body === 'string') throw new Error(body);
    if (body.message) throw new Error(body.message);
    if (body.status !== undefined && body.status !== 0) throw new Error(body.status);

    return body;
}
