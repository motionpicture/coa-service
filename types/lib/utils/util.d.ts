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
 * 認証エラーの場合のレスポンスボディ文字列
 *
 * @ignore
 */
export declare const RESPONSE_BODY_BAD_CREDENTIALS = "Bad credentials";
/**
 * アクセストークンを発行
 * @memberof utils.util
 * @function publishAccessToken
 * @param {number} [spareTimeInMilliseconds] アクセストークンの有効期限までの猶予時間
 * @returns {Promise<string>}
 */
export declare function publishAccessToken(spareTimeInMilliseconds?: number): Promise<string>;
/**
 * アクセストークンをリセットする
 *
 * @ignore
 */
export declare function resetCredentials(): void;
/**
 * レスポンスステータス200チェック
 * @memberof utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
export declare function throwIfNot200(body: any): Promise<any>;
