/**
 * アクセストークンを発行
 * @memberOf utils.util
 * @function publishAccessToken
 * @param {number} [spareTimeInMilliseconds] アクセストークンの有効期限までの猶予時間
 * @returns {Promise<string>}
 */
export declare function publishAccessToken(spareTimeInMilliseconds?: number): Promise<string>;
/**
 * アクセストークンをリセットする
 * この関数はテストコードのために作成
 * おそらく運用中は使われないと思われる
 */
export declare function resetAccessToken(): void;
/**
 * レスポンスステータス200チェック
 * @memberOf utils.util
 * @function throwIfNot200
 * @param {any} body
 * @returns {Promise<any>}
 */
export declare function throwIfNot200(body: any): Promise<any>;
