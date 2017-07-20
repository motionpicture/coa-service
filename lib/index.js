"use strict";
/**
 * coa-service
 *
 * @ignore
 */
// import * as createDebug from 'debug';
Object.defineProperty(exports, "__esModule", { value: true });
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
