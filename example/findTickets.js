/**
 * 券種抽出サンプル
 * @ignore
 */
const COA = require('../');
const fs = require('fs');

COA.services.master.ticket({
    theaterCode: '118'
}).then((result) => {
    fs.writeFileSync(`${__dirname}/output/ticket.json`, JSON.stringify(result, null, '    '));
    console.log(result);
}).catch((err) => {
    console.error(err);
});
