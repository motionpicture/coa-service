/**
 * 劇場抽出コード
 *
 * @ignore
 */
import * as COA from '../lib/index';

COA.MasterService.theater({
    theater_code: '118'
}).then((result) => {
    console.log(result); // tslint:disable-line:no-console
}).catch((err) => {
    console.error(err.message);
});
