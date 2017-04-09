/**
 * 作品マスター抽出の例
 *
 * @ignore
 */
import * as COA from '../lib/index';

COA.MasterService.title({
    theater_code: '118'
}).then((films) => {
    // tslint:disable-next-line:no-console
    console.log(films);
}).catch((err) => {
    console.error(err.message);
});
