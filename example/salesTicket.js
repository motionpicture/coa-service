/**
 * 販売可能チケット抽出の例
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

service.salesTicket({
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
