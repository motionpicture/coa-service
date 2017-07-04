/**
 * coa-service
 *
 * @ignore
 */
// import * as createDebug from 'debug';
import * as util from 'util';

// const debug = createDebug('coa-service:index');

if (typeof process.env.COA_ENDPOINT !== 'string' || (<string>process.env.COA_ENDPOINT).length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
}

if (typeof process.env.COA_REFRESH_TOKEN !== 'string' || (<string>process.env.COA_REFRESH_TOKEN).length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_REFRESH_TOKEN" is required for using @motionpicture/coa-service.');
}

import * as masterService from './services/master';
import * as reserveService from './services/reserve';
import * as coaUtil from './utils/util';

/**
 * サービスモジュール群
 *
 * @namespace
 */
export namespace services {
    export import master = masterService;
    export import reserve = reserveService;
}

/**
 * ユーティリティモジュール群
 *
 * @namespace
 */
export namespace utils {
    export import util = coaUtil;
}

/**
 * @deprecated v4.0.0でutils.utilに移行予定
 */
export import Util = coaUtil;
exports.Util = util.deprecate(
    () => coaUtil,
    '@motionpicture/coa-service:Util is deprecated, use utils.util'
)();

/**
 * @deprecated v4.0.0でservices.masterに移行予定
 */
export import MasterService = masterService;
exports.MasterService = util.deprecate(
    () => masterService,
    '@motionpicture/coa-service:MasterService is deprecated, use services.master'
)();

/**
 * @deprecated v4.0.0でservices.reserveに移行予定
 */
export import ReserveService = reserveService;
exports.ReserveService = util.deprecate(
    () => reserveService,
    '@motionpicture/coa-service:ReserveService is deprecated, use services.reserve'
)();
