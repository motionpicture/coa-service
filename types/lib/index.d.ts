import * as masterService from './services/master';
import * as reserveService from './services/reserve';
import * as utilsUtil from './utils/util';
/**
 * サービスモジュール群
 *
 * @namespace
 */
export declare namespace services {
    export import master = masterService;
    export import reserve = reserveService;
}
/**
 * ユーティリティモジュール群
 *
 * @namespace
 */
export declare namespace utils {
    export import util = utilsUtil;
}
/**
 * @deprecated v4.0.0でutils.utilに移行予定
 */
export import Util = utilsUtil;
/**
 * @deprecated v4.0.0でservices.masterに移行予定
 */
export import MasterService = masterService;
/**
 * @deprecated v4.0.0でservices.reserveに移行予定
 */
export import ReserveService = reserveService;
