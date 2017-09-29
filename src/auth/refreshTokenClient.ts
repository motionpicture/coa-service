import * as createDebug from 'debug';
import { FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import * as request from 'request';

import { COAServiceError, DefaultTransporter } from '../transporters';
import ICredentials from './credentials';

const debug = createDebug('coa-service:auth:refreshTokenClient');

export interface IOptions {
    endpoint: string;
    refreshToken?: string;
}

/**
 * リフレッシュトークン認証クライアント
 * @class
 */
export default class RefreshTokenClient {
    /**
     * アクセストークンの有効期限までの猶予時間初期値
     * @static
     * @memberof RefreshTokenClient
     */
    public static DEFAULT_SPARE_TIME_IN_MILLISECONDS: number = 60000;

    public credentials: ICredentials;
    public options: IOptions;

    constructor(options: IOptions) {
        this.options = options;

        this.credentials = {};
    }

    /**
     * クライアント認証でアクセストークンを取得します。
     * @public
     * @memberof RefreshTokenClient
     */
    public async getToken(): Promise<ICredentials> {
        return new Promise<ICredentials>((resolve, reject) => {
            debug('requesting an access token...');
            request.post(
                {
                    baseUrl: this.options.endpoint,
                    uri: '/token/access_token',
                    form: {
                        refresh_token: this.options.refreshToken
                    },
                    json: true
                },
                (error, response, body) => {
                    if (error instanceof Error) {
                        reject(new Error(error.message));

                        return;
                    }

                    if (response.statusCode !== OK) {
                        let err = new Error('Unexpected error occurred.');

                        if (typeof body === 'string') {
                            err = new Error(body);
                        } else if (typeof body.message === 'string' && (<string>body.message).length > 0) {
                            // エラーレスポンスにメッセージがあった場合
                            err = new Error(body.message);
                        } else if (body.status !== undefined && body.status !== 0) {
                            // エラーレスポンスにステータスがあった場合
                            err = new Error(body.status);
                        }

                        reject(new Error(body.status));
                    } else {
                        this.credentials = body;
                        resolve(this.credentials);
                    }
                }
            );
        });
    }

    /**
     * 認証情報を手動でセットする
     * @public
     * @memberof RefreshTokenClient
     */
    public setCredentials(credentials: ICredentials) {
        this.credentials = credentials;
    }

    /**
     * アクセストークンを更新する
     * @public
     * @memberof RefreshTokenClient
     */
    public async refreshAccessToken(): Promise<ICredentials> {
        if (this.options.refreshToken === undefined) {
            throw new Error('No refresh token is set.');
        }

        return await this.refreshToken(this.options.refreshToken);
    }

    /**
     * 期限の切れていないアクセストークンを取得します。
     * 必要であれば更新してから取得します。
     * @public
     * @memberof RefreshTokenClient
     */
    public async getAccessToken(): Promise<string> {
        const expiredAt = this.credentials.expired_at;
        const spareTimeInMilliseconds = RefreshTokenClient.DEFAULT_SPARE_TIME_IN_MILLISECONDS;

        let isTokenExpired = true;

        if (expiredAt !== undefined) {
            // 認証情報があれば期限をチェック
            debug('validating existing credentials...', this.credentials, spareTimeInMilliseconds);
            const dateExpiredAtOfCredentials = new Date(expiredAt);
            const dateExpiredAtActually = new Date();
            dateExpiredAtActually.setMilliseconds(dateExpiredAtActually.getMilliseconds() + spareTimeInMilliseconds);
            if (dateExpiredAtOfCredentials.getTime() > dateExpiredAtActually.getTime()) {
                isTokenExpired = false;
            }
        }

        if (this.credentials.access_token === undefined && this.options.refreshToken === undefined) {
            throw new Error('No access or refresh token is set.');
        }

        const shouldRefresh = (this.credentials.access_token === undefined) || isTokenExpired;
        if (shouldRefresh && this.options.refreshToken !== undefined) {
            await this.refreshAccessToken();
        }

        return <string>this.credentials.access_token;
    }

    /**
     * APIリクエストを投げる
     * 認証エラー(401,403)であれば自動的に一度だけアクセストークンをリフレッシュします。
     * @public
     * @memberof RefreshTokenClient
     */
    public async request(options: request.OptionsWithUri, expectedStatusCodes: number[]) {
        let retry = true;

        const accessToken = await this.getAccessToken();
        options.auth = { bearer: accessToken };

        let result: any;
        let numberOfTry = 0;
        // tslint:disable-next-line:no-magic-numbers
        while (numberOfTry >= 0) {
            try {
                numberOfTry += 1;
                if (numberOfTry > 1) {
                    retry = false;
                }

                result = await this.makeRequest(options, expectedStatusCodes);

                break;
            } catch (error) {
                if (error instanceof Error) {
                    const statusCode = (<COAServiceError>error).code;

                    if (retry && (statusCode === UNAUTHORIZED || statusCode === FORBIDDEN)) {
                        // 多くの場合、認証エラーは、トークンの期限が原因なので、一度だけリフレッシュするのは有効なはず。
                        // リフレッシュしても同様に認証エラーの場合は、それ以外の原因で起きているのであきらめる。
                        await this.refreshAccessToken();
                        continue;
                    }
                }

                throw error;
            }
        }

        return result;
    }

    /**
     * 認証情報が適切である前提でAPIリクエストを投げる
     * @protected
     * @memberof RefreshTokenClient
     */
    // tslint:disable-next-line:prefer-function-over-method
    protected async makeRequest(options: request.OptionsWithUri, expectedStatusCodes: number[]) {
        const transporter = new DefaultTransporter(expectedStatusCodes);

        return await transporter.request(options);
    }

    /**
     * 認証情報を更新する
     * @protected
     * @memberof RefreshTokenClient
     */
    protected async refreshToken(__: string): Promise<ICredentials> {
        debug('refreshing an access token...');

        return this.getToken();
    }
}
