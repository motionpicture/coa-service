"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:missing-jsdoc
const COA = require("../lib/index");
COA.ReserveService.stateReserve({
    theater_code: '118',
    reserve_num: 1061,
    tel_num: '09012345678'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
