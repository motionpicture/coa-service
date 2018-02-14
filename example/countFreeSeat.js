/**
 * 空席検索サンプル
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

const date = new Date();
// tslint:disable-next-line:prefer-template no-magic-numbers
const today = `${date.getFullYear()}${('00' + String(date.getMonth() + 1)).slice(-2)}${('0' + String(date.getDate())).slice(-2)}`;

COA.services.reserve.countFreeSeat({
    theaterCode: '118',
    begin: today,
    end: today
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/countFreeSeat.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
