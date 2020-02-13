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
    // { timeout: 1000 }
);

service.schedule({
    theaterCode: '012',
    begin: '20200213',
    end: '20200218'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/schedule.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
