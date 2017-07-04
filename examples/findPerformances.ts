/**
 * パフォーマンス抽出の例
 *
 * @ignore
 */
import * as COA from '../lib/index';

COA.services.master.schedule({
    theater_code: '118',
    begin: '20170411',
    end: '20170411'
}).then((performances) => {
    // tslint:disable-next-line:no-console
    console.log(performances);
}).catch((err) => {
    console.error(err.message);
});
