/**
 * 劇場抽出の例
 *
 * @ignore
 */
import * as COA from '../lib/index';

COA.services.master.theater({
    theaterCode: '118'
}).then((result) => {
    console.log(result); // tslint:disable-line:no-console
}).catch((err) => {
    console.error(err.message);
});
