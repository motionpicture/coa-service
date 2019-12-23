/**
 * 座席予約状態抽出サンプル
 */
const COA = require('../');
const fs = require('fs');

const service = new COA.service.Reserve(
    {
        endpoint: process.env.COA_ENDPOINT,
        auth: new COA.auth.RefreshToken({
            endpoint: process.env.COA_ENDPOINT,
            refreshToken: process.env.COA_REFRESH_TOKEN
        })
    }
);

service.stateReserveSeat({
    theaterCode: '118',
    dateJouei: '20190605',
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
