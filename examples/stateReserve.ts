/**
 * 購入チケット内容取得の例
 *
 * @ignore
 */
import * as COA from '../lib/index';

COA.services.reserve.stateReserve({
    theater_code: '118',
    reserve_num: 1339,
    tel_num: '09012345678'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
