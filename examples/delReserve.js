"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 購入チケット取消の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.ReserveService.delReserve({
    reserve_num: 985,
    theater_code: '118',
    date_jouei: '20170403',
    title_code: '16344',
    title_branch_num: '0',
    time_begin: '1000',
    tel_num: '09012345678',
    list_seat: [
        {
            seat_section: '0',
            seat_num: 'Ｂ－４'
        },
        {
            seat_section: '0',
            seat_num: 'Ｂ－５'
        }
    ]
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
