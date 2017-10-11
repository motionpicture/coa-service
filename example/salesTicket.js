/**
 * 販売可能チケット抽出の例
 *
 * @ignore
 */

const COA = require('../');

COA.services.reserve.salesTicket({
    theaterCode: '118',
    dateJouei: '20170411',
    titleCode: '99600',
    titleBranchNum: '0',
    timeBegin: '2130'
}).then((results) => {
    console.log(results);
}).catch((err) => {
    console.error(err);
});
