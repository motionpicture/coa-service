/**
 * スクリーン抽出サンプル
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

service.screen({
    theaterCode: '118'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/screen.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
