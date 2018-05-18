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
 * リクエスト成功の場合のレスポンス本文のstatus属性の値
 * 失敗の場合はstring型だが、成功の場合のみnumber型が返却されるので注意すること。
 * @const
 */
const RESPONSE_BODY_STAUS_SUCCESS = 0;

/**
 * transporter abstract class
 * トランスポーター抽象クラス
 * @export
 */
export abstract class Transporter {
    public abstract async request(options: request.OptionsWithUri): Promise<any>;
}

export type IBodyResponseCallback = Promise<any>;

/**
 * COAServiceError
 * @export
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
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        if (!options.headers['User-Agent']) {
            options.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
        } else if (options.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
            options.headers['User-Agent'] = `${options.headers['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
        } else {
            // no operation
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

    /**
     * Wraps the response callback.
     */
    private wrapCallback(error: any, response: request.RequestResponse, body: any): any {
        let err: COAServiceError = new COAServiceError(INTERNAL_SERVER_ERROR, '', 'An unexpected error occurred.');

        if (error instanceof Error) {
            throw new COAServiceError(INTERNAL_SERVER_ERROR, '', error.message);
        }

        debug('request processed', error, body);
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        if (response.statusCode !== undefined) {
            if (this.expectedStatusCodes.indexOf(response.statusCode) < 0) {
                if (typeof body === 'string') {
                    // Consider all 4xx and 5xx responses errors.
                    err = new COAServiceError(response.statusCode, '', body);
                } else {
                    // エラーレスポンスにステータスがあった場合
                    // tslint:disable-next-line:no-single-line-block-comment
                    /* istanbul ignore else */
                    if (body.status !== undefined) {
                        err = new COAServiceError(response.statusCode, body.status, body.message);
                    } else {
                        // no operation
                    }
                }
            } else {
                // HTTPステータスコード2xxでも、レスポンス本文のステータスが0でなければBadRequest
                if (body.status !== undefined && body.status !== RESPONSE_BODY_STAUS_SUCCESS) {
                    err = new COAServiceError(response.statusCode, body.status, body.message);
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
        } else {
            // no operation
        }

        throw err;
    }
}
