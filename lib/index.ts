/**
 * coa-service
 *
 * @ignore
 */

if (!process.env.COA_ENDPOINT) {
    throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
}

if (!process.env.COA_REFRESH_TOKEN) {
    throw new Error('NPM warnings. The environment variable "COA_REFRESH_TOKEN" is required for using @motionpicture/coa-service.');
}

import * as MasterService from './services/master';
import * as ReserveService from './services/reserve';
import * as Util from './utils/util';
export {
    Util,
    MasterService,
    ReserveService
}
