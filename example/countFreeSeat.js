/**
 * 空席検索サンプル
 */
const COA = require('../');
const fs = require('fs');

const date = new Date();
// tslint:disable-next-line:prefer-template no-magic-numbers
const today = `${date.getFullYear()}${('00' + String(date.getMonth() + 1)).slice(-2)}${('0' + String(date.getDate())).slice(-2)}`;

const service = new COA.service.Reserve(
    {
        endpoint: process.env.COA_ENDPOINT,
        auth: new COA.auth.RefreshToken({
            endpoint: process.env.COA_ENDPOINT,
            refreshToken: process.env.COA_REFRESH_TOKEN
        })
    }
);

service.countFreeSeat({
    theaterCode: '118',
    begin: today,
    end: today
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/countFreeSeat.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
