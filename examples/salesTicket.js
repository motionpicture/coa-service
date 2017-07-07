"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 販売可能チケット抽出の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.services.reserve.salesTicket({
    theater_code: '118',
    date_jouei: '20170411',
    title_code: '99600',
    title_branch_num: '0',
    time_begin: '2130'
}).then((results) => {
    // tslint:disable-next-line:no-console
    console.log(results);
}).catch((err) => {
    console.error(err.message);
});
