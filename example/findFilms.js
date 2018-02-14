/**
 * 作品マスター抽出の例
 *
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.master.title({
    theaterCode: '118'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/title.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
