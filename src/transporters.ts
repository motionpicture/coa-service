// tslint:disable:max-classes-per-file

/**
 * transporters
 * @namespace transporters
 * @ignore
 */

import * as createDebug from 'debug';
import { INTERNAL_SERVER_ERROR, NO_CONTENT } from 'http-status';
import * as request from 'request';

const debug = createDebug('coa-service:transporters');
// tslint:disable-next-line
const pkg = require('../package.json');

/**
 * transporter abstract class
 * トランスポーター抽象クラス
 * @export
 * @class
 * @abstract
 * @memberof transporters
 */
export abstract class Transporter {
    public abstract async request(options: request.OptionsWithUri): Promise<any>;
}

export type IBodyResponseCallback = Promise<any>;

/**
 * COAServiceError
 * @export
 * @class
 * @memberof transporters
 */
export class COAServiceError extends Error {
    public code: number;
    public status: string;

    constructor(code: number, status: string, message?: string) {
        super(message);

        this.name = 'COAServiceError';
        this.code = code;
        this.status = status;
    }
}

/**
 * DefaultTransporter
 * @export
 * @class
 * @memberof transporters
 */
export class DefaultTransporter implements Transporter {
    /**
     * Default user agent.
     */
    public static readonly USER_AGENT: string = `coa-service/${pkg.version}`;

    public expectedStatusCodes: number[];

    constructor(expectedStatusCodes: number[]) {
        this.expectedStatusCodes = expectedStatusCodes;
    }

    /**
     * Configures request options before making a request.
     */
    public static CONFIGURE(options: request.OptionsWithUri): request.OptionsWithUri {
        // set transporter user agent
        options.headers = (options.headers !== undefined) ? options.headers : {};
        if (!options.headers['User-Agent']) {
            options.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
        } else if (options.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
            options.headers['User-Agent'] = `${options.headers['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
        }

        return options;
    }

    /**
     * Makes a request with given options and invokes callback.
     */
    public async request(options: request.OptionsWithUri): Promise<any> {
        const requestOptions = DefaultTransporter.CONFIGURE(options);

        debug('requesting...', requestOptions);

        return new Promise<any>((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                try {
                    resolve(this.wrapCallback(error, response, body));
                } catch (callbackErr) {
                    reject(callbackErr);
                }
            });
        });
    }

    // tslint:disable-next-line:no-suspicious-comment
    /**
     * Wraps the response callback.
     * TODO errorパラメータをハンドリング
     */
    private wrapCallback(error: any, response: request.RequestResponse, body: any): any {
        let err: COAServiceError = new COAServiceError(INTERNAL_SERVER_ERROR, '', 'An unexpected error occurred.');

        if (error instanceof Error) {
            throw new COAServiceError(INTERNAL_SERVER_ERROR, '', error.message);
        }

        debug('request processed', error, body);
        if (response.statusCode !== undefined) {
            if (this.expectedStatusCodes.indexOf(response.statusCode) < 0) {
                if (typeof body === 'string') {
                    // Consider all 4xx and 5xx responses errors.
                    err = new COAServiceError(response.statusCode, '', body);
                }

                // エラーレスポンスにメッセージがあった場合
                if (typeof body.message === 'string' && (<string>body.message).length > 0) {
                    err = new COAServiceError(response.statusCode, body.status, body.message);
                }

                // エラーレスポンスにステータスがあった場合
                if (body.status !== undefined && body.status !== 0) {
                    err = new COAServiceError(response.statusCode, body.status);
                }
            } else {
                if (response.statusCode === NO_CONTENT) {
                    // consider 204
                    return;
                } else {
                    // consider 200,201
                    return body;
                }
            }
        }

        throw err;
    }
}
