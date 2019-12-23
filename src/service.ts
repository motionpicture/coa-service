import * as request from 'request';

import RefreshTokenClient from './auth/refreshTokenClient';

/**
 * service constructor options
 */
export interface IOptions {
    endpoint: string;
    auth: RefreshTokenClient;
}

/**
 * base service class
 */
export class Service {
    public options: IOptions;
    public requestOptions: request.CoreOptions;

    constructor(options: IOptions, requestOptions?: request.CoreOptions) {
        this.options = options;

        this.requestOptions = {};
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        if (requestOptions !== undefined) {
            this.requestOptions = { ...this.requestOptions, ...requestOptions };
        }
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

        const requestOptions = {
            ...defaultOptions,
            ...this.requestOptions,
            ...options
        };

        return this.options.auth.request(requestOptions, expectedStatusCodes);
    }
}
