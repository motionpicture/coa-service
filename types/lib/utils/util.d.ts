/**
 * アクセストークンを発行
 * @memberOf utils.util
 * @function publishAccessToken
 * @returns {Promise<string>}
 */
export declare function publishAccessToken(): Promise<string>;
/**
 * レスポンスステータス200チェック
 * @memberOf utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
export declare function throwIfNot200(body: any): Promise<any>;
