// tslint:disable-next-line:missing-jsdoc
import * as COA from '../../lib/coa-service';

COA.MasterService.title({
    theater_code: '118'
}).then((films) => {
    // tslint:disable-next-line:no-console
    console.log(films);
}).catch((err) => {
    console.error(err.message);
});
