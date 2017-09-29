/**
 * coa-service
 * @ignore
 */

if (typeof process.env.COA_ENDPOINT !== 'string' || (<string>process.env.COA_ENDPOINT).length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
}

if (typeof process.env.COA_REFRESH_TOKEN !== 'string' || (<string>process.env.COA_REFRESH_TOKEN).length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_REFRESH_TOKEN" is required for using @motionpicture/coa-service.');
}

import * as masterService from './services/master';
import * as reserveService from './services/reserve';

/**
 * サービスモジュール群
 * @namespace
 */
export namespace services {
    export import master = masterService;
    export import reserve = reserveService;
}
