/**
 * 座席仮予約削除の例
 */
const COA = require('../');

const service = new COA.service.Reserve(
    {
        endpoint: process.env.COA_ENDPOINT,
        auth: new COA.auth.RefreshToken({
            endpoint: process.env.COA_ENDPOINT,
            refreshToken: process.env.COA_REFRESH_TOKEN
        })
    }
);

service.delTmpReserve({
    tmpReserveNum: 985,
    theaterCode: '118',
    dateJouei: '20170403',
    titleCode: '16344',
    titleBranchNum: '0',
    timeBegin: '1000'
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});
