/**
 * 購入チケット内容取得の例
 */
const COA = require('../');
const fs = require('fs');

const service = new COA.service.Reserve({
    endpoint: process.env.COA_ENDPOINT,
    auth: new COA.auth.RefreshToken({
        endpoint: process.env.COA_ENDPOINT,
        refreshToken: process.env.COA_REFRESH_TOKEN
    })
});

service.stateReserve({
    theaterCode: '118',
    reserveNum: 99150,
    telNum: '09012345678'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/stateReserve.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
