"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 座席仮予約削除の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.services.reserve.delTmpReserve({
    tmpReserveNum: 985,
    theaterCode: '118',
    dateJouei: '20170403',
    titleCode: '16344',
    titleBranchNum: '0',
    timeBegin: '1000'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
