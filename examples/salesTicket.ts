/**
 * 販売可能チケット抽出の例
 *
 * @ignore
 */
import * as COA from '../lib/index';

COA.services.reserve.salesTicket({
    theaterCode: '118',
    dateJouei: '20170411',
    titleCode: '99600',
    titleBranchNum: '0',
    timeBegin: '2130'
}).then((results) => {
    // tslint:disable-next-line:no-console
    console.log(results);
}).catch((err) => {
    console.error(err.message);
});
