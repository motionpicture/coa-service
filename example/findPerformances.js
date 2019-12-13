/**
 * パフォーマンス抽出の例
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
    },
    { timeout: 1000 }
);

service.schedule({
    theaterCode: '118',
    begin: '20180126',
    end: '20180126'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/schedule.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
