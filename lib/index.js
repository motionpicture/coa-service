/**
 * coa-service
 *
 * @ignore
 */
"use strict";
if (!process.env.COA_ENDPOINT) {
    throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
}
if (!process.env.COA_REFRESH_TOKEN) {
    throw new Error('NPM warnings. The environment variable "COA_REFRESH_TOKEN" is required for using @motionpicture/coa-service.');
}
const MasterService = require("./services/master");
exports.MasterService = MasterService;
const ReserveService = require("./services/reserve");
exports.ReserveService = ReserveService;
const Util = require("./utils/util");
exports.Util = Util;
