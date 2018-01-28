/**
 * 購入チケット内容取得の例
 *
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.reserve.stateReserve({
    theaterCode: '118',
    reserveNum: 99150,
    telNum: '09012345678'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/stateReserve.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
