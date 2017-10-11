/**
 * 作品マスター抽出の例
 *
 * @ignore
 */

const COA = require('../');

COA.services.master.title({
    theaterCode: '118'
}).then((films) => {
    console.log(films);
}).catch((err) => {
    console.error(err);
});
