"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:missing-jsdoc
const COA = require("../lib/index");
COA.ReserveService.delTmpReserve({
    tmp_reserve_num: 985,
    theater_code: '118',
    date_jouei: '20170403',
    title_code: '16344',
    title_branch_num: '0',
    time_begin: '1000'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
