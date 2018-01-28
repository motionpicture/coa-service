/**
 * パフォーマンス抽出の例
 *
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.master.schedule({
    theaterCode: '012',
    begin: '20180126',
    end: '20180126'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/schedule.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
