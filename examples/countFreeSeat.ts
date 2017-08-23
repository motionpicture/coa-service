/**
 * 購入チケット取消の例
 *
 * @ignore
 */
import * as COA from '../lib/index';

const date = new Date();
// tslint:disable-next-line:prefer-template no-magic-numbers
const today = `${date.getFullYear()}${('00' + String(date.getMonth() + 1)).slice(-2)}${('0' + String(date.getDate())).slice(-2)}`;

COA.services.reserve.countFreeSeat({
    theaterCode: '118',
    begin: today,
    end: today
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
