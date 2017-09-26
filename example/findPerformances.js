/**
 * パフォーマンス抽出の例
 *
 * @ignore
 */

const COA = require('../');

COA.services.master.schedule({
    theaterCode: '118',
    begin: '20170411',
    end: '20170411'
}).then((performances) => {
    console.log(performances);
}).catch((err) => {
    console.error(err.message);
});
