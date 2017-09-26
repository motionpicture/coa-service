/**
 * 劇場抽出の例
 *
 * @ignore
 */

const COA = require('../');

COA.services.master.theater({
    theaterCode: '118'
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
