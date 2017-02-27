// tslint:disable-next-line:missing-jsdoc
import * as COA from '../../lib/index';

COA.ReserveService.stateReserve({
    theater_code: '001',
    reserve_num: 11586,
    tel_num: '09012345678'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
