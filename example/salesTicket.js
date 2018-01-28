/**
 * 販売可能チケット抽出の例
 *
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.reserve.salesTicket({
    theaterCode: '118',
    dateJouei: '20170411',
    titleCode: '99600',
    titleBranchNum: '0',
    timeBegin: '2130'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/salesTicket.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
