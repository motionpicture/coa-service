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
