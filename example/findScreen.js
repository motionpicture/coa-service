/**
 * スクリーン抽出サンプル
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.master.screen({
    theaterCode: '118'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/screen.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
