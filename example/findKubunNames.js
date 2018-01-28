/**
 * 区分抽出サンプル
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.master.kubunName({
    theaterCode: '118',
    kubunClass: '000'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/kubunName.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
