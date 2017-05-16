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
const MasterService = require("./services/master");
exports.MasterService = MasterService;
const ReserveService = require("./services/reserve");
exports.ReserveService = ReserveService;
const Util = require("./utils/util");
exports.Util = Util;
