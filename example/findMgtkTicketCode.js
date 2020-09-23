/**
 * MGチケットコード確認サンプル
 */
const COA = require('../');
const fs = require('fs');

const service = new COA.service.Master(
    {
        endpoint: process.env.COA_ENDPOINT,
        auth: new COA.auth.RefreshToken({
            endpoint: process.env.COA_ENDPOINT,
            refreshToken: process.env.COA_REFRESH_TOKEN
        })
    }
);

service.mgtkTicketcode({
    theaterCode: '120',
    mgtkTicketcode: '8200002',
    titleCode: '16221',
    titleBranchNum: '00',
    dateJouei: '20200630'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/mgtkTicketcode.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
