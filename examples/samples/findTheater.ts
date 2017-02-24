// tslint:disable-next-line:missing-jsdoc
import * as COA from '../../lib/coa-service';

COA.MasterService.theater({
    theater_code: '118'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
