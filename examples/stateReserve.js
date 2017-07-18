"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 購入チケット内容取得の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.services.reserve.stateReserve({
    theaterCode: '118',
    reserveNum: 1339,
    telNum: '09012345678'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
