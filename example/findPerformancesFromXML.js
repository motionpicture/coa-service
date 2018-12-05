/**
 * パフォーマンス抽出の例
 *
 * @ignore
 */

const COA = require('../');
const fs = require('fs');

COA.services.master.xmlSchedule({
    baseUrl: "http://cinema.coasystems.net",
    theaterCodeName: "aira"
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/xmlSchedule.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
