/**
 * 共通
 * @namespace utils.util
 */

import * as createDebug from 'debug';
import * as request from 'request';

const debug = createDebug('coa-service:utils:util');

/**
 * 認証情報インターフェース
 *
 * @interface ICredentials
 */
export interface ICredentials {
    access_token: string;
    expired_at: string;
}

/**
 * API認証情報
 *
 * @ignore
 */
let credentials: ICredentials = {
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
export const RESPONSE_BODY_BAD_CREDENTIALS = 'Bad credentials';

/**
 * アクセストークンを発行
 * @memberof utils.util
 * @function publishAccessToken
 * @param {number} [spareTimeInMilliseconds] アクセストークンの有効期限までの猶予時間
 * @returns {Promise<string>}
 */
export async function publishAccessToken(spareTimeInMilliseconds?: number): Promise<string> {
    // アクセストークン有効期限チェック
    // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
    if (spareTimeInMilliseconds === undefined) {
        spareTimeInMilliseconds = DEFAULT_SPARE_TIME_IN_MILLISECONDS;
    }

    if (credentials.access_token !== '' && credentials.expired_at !== '') {
        // 認証情報があれば期限をチェック
        debug('validating existing credentials...', credentials, spareTimeInMilliseconds);
        const dateExpiredAtOfCredentials = new Date(credentials.expired_at);
        const dateExpiredAtActually = new Date();
        dateExpiredAtActually.setMilliseconds(dateExpiredAtActually.getMilliseconds() + spareTimeInMilliseconds);
        if (dateExpiredAtOfCredentials.getTime() > dateExpiredAtActually.getTime()) {
            return credentials.access_token;
        }
    }

    debug('refreshing access_token...');

    return new Promise<string>((resolve, reject) => {
        request.post(
            {
                url: `${process.env.COA_ENDPOINT}/token/access_token`,
                form: {
                    refresh_token: process.env.COA_REFRESH_TOKEN
                },
                json: true
            },
            (__1, __2, body) => {
                if (typeof body === 'string') {
                    // 本来認証エラーは出ないはずだが、原因不明で出ることがあるので、その場合に備えて
                    if (body === RESPONSE_BODY_BAD_CREDENTIALS) {
                        console.error(body, 'now:', new Date().toISOString(), 'credentials:', credentials);
                        debug('reseting credentials...');
                        resetCredentials();
                    }

                    reject(new Error(body));

                    return;
                }

                // エラーレスポンスにメッセージがあった場合
                if (typeof body.message === 'string' && (<string>body.message).length > 0) {
                    reject(new Error(body.message));

                    return;
                }

                // エラーレスポンスにステータスがあった場合
                if (body.status !== undefined && body.status !== 0) {
                    reject(new Error(body.status));

                    return;
                }

                credentials = body;
                debug('credentials refreshed', credentials);

                resolve(credentials.access_token);
            }
        );
    });
}

/**
 * アクセストークンをリセットする
 *
 * @ignore
 */
export function resetCredentials() {
    credentials = {
        access_token: '',
        expired_at: ''
    };
}
