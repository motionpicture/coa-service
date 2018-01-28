/**
 * 座席予約状態抽出サンプル
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.reserve.stateReserveSeat({
    theaterCode: '118',
    dateJouei: '20171206',
    titleCode: '16421',
    titleBranchNum: '0',
    timeBegin: '2045',
    screenCode: '50'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/stateReserveSeat.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
