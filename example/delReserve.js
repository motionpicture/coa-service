/**
 * 購入チケット取消の例
 *
 * @ignore
 */

const COA = require('../');

COA.services.reserve.delReserve({
    reserveNum: 985,
    theaterCode: '118',
    dateJouei: '20170403',
    titleCode: '16344',
    titleBranchNum: '0',
    timeBegin: '1000',
    telNum: '09012345678',
    listSeat: [
        {
            seatSection: '0',
            seatNum: 'Ｂ－４'
        },
        {
            seatSection: '0',
            seatNum: 'Ｂ－５'
        }
    ]
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});
