import * as request from 'request';

import RefreshTokenClient from './auth/refreshTokenClient';

/**
 * service constructor options
 * @export
 */
export interface IOptions {
    endpoint: string;
    auth: RefreshTokenClient;
}

/**
 * base service class
 * @export
 */
export class Service {
    public options: IOptions;

    constructor(options: IOptions) {
        this.options = options;
    }

    /**
     * Create and send request to API
     */
    public async request(options: request.OptionsWithUri, expectedStatusCodes: number[]) {
        const defaultOptions = {
            baseUrl: this.options.endpoint,
            // simple: false,
            // resolveWithFullResponse: true,
            json: true,
            method: 'GET',
            useQuerystring: true
        };

        return this.options.auth.request({ ...defaultOptions, ...options }, expectedStatusCodes);
    }
}

// 1プロセスにつき1サービスインスタンスで動かす
export default new Service({
    endpoint: process.env.COA_ENDPOINT,
    auth: new RefreshTokenClient({
        endpoint: process.env.COA_ENDPOINT,
        refreshToken: process.env.COA_REFRESH_TOKEN
    })
});