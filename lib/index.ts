/**
 * coa-service
 *
 * @ignore
 */
// import * as createDebug from 'debug';

// const debug = createDebug('coa-service:index');

if (typeof process.env.COA_ENDPOINT !== 'string' || (<string>process.env.COA_ENDPOINT).length === 0) {
    throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
}

if (typeof process.env.COA_REFRESH_TOKEN !== 'string' || (<string>process.env.COA_REFRESH_TOKEN).length === 0) {
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
