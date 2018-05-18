/**
 * 認証情報インターフェース
 */
interface ICredentials {
    /**
     * アクセストークン
     */
    access_token?: string;
    /**
     * 期限UNIXタイムスタンプ
     */
    expired_at?: string;
}

export default ICredentials;
