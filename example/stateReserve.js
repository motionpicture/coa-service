/**
 * 購入チケット内容取得の例
 *
 * @ignore
 */

const COA = require('../');

COA.services.reserve.stateReserve({
    theaterCode: '118',
    reserveNum: 1339,
    telNum: '09012345678'
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
