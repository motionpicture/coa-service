"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * coa-service
 *
 * @ignore
 */
// import * as createDebug from 'debug';
const globalUtil = require("util");
// const debug = createDebug('coa-service:index');
if (typeof process.env.COA_ENDPOINT !== 'string' || process.env.COA_ENDPOINT.length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
}
if (typeof process.env.COA_REFRESH_TOKEN !== 'string' || process.env.COA_REFRESH_TOKEN.length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_REFRESH_TOKEN" is required for using @motionpicture/coa-service.');
}
const masterService = require("./services/master");
const reserveService = require("./services/reserve");
const utilsUtil = require("./utils/util");
/**
 * サービスモジュール群
 *
 * @namespace
 */
var services;
(function (services) {
    services.master = masterService;
    services.reserve = reserveService;
})(services = exports.services || (exports.services = {}));
/**
 * ユーティリティモジュール群
 *
 * @namespace
 */
var utils;
(function (utils) {
    utils.util = utilsUtil;
})(utils = exports.utils || (exports.utils = {}));
/**
 * @deprecated v4.0.0でutils.utilに移行予定
 */
exports.Util = utilsUtil;
exports.Util = globalUtil.deprecate(() => utilsUtil, '@motionpicture/coa-service:Util is deprecated, use utils.util')();
/**
 * @deprecated v4.0.0でservices.masterに移行予定
 */
exports.MasterService = masterService;
exports.MasterService = globalUtil.deprecate(() => masterService, '@motionpicture/coa-service:MasterService is deprecated, use services.master')();
/**
 * @deprecated v4.0.0でservices.reserveに移行予定
 */
exports.ReserveService = reserveService;
exports.ReserveService = globalUtil.deprecate(() => reserveService, '@motionpicture/coa-service:ReserveService is deprecated, use services.reserve')();
