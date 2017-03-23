/**
 * 共通
 * @namespace utils.util
 */
import * as createDebug from 'debug';
import * as request from 'request-promise-native';

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

const DEFAULT_SPARE_TIME_IN_MILLISECONDS = 60000;

/**
 * アクセストークンを発行
 * @memberOf utils.util
 * @function publishAccessToken
 * @param {number} [spareTimeInMilliseconds] アクセストークンの有効期限までの猶予時間
 * @returns {Promise<string>}
 */
export async function publishAccessToken(spareTimeInMilliseconds?: number) {
    // アクセストークン有効期限チェック
    // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
    if (spareTimeInMilliseconds === undefined) {
        spareTimeInMilliseconds = DEFAULT_SPARE_TIME_IN_MILLISECONDS;
    }

    debug('credentials is', credentials);
    if (credentials.access_token === '' || Date.parse(credentials.expired_at) < Date.now() - spareTimeInMilliseconds) {
        debug('refreshing access_token...');
        credentials = await request.post({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/token/access_token',
            form: {
                refresh_token: process.env.COA_REFRESH_TOKEN
            },
            json: true
        }).then(throwIfNot200);
    }
    debug('credentials is', credentials);

    return credentials.access_token;
}

/**
 * アクセストークンをリセットする
 * この関数はテストコードのために作成
 * おそらく運用中は使われないと思われる
 */
export function resetAccessToken() {
    credentials = {
        access_token: '',
        expired_at: ''
    };
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
    if (typeof body.message === 'string' && (<string>body.message).length > 0) throw new Error(body.message);
    if (body.status !== undefined && body.status !== 0) throw new Error(body.status);

    return body;
}
