// tslint:disable-next-line:missing-jsdoc
import * as COA from '../../lib/coa-service';

COA.ReserveService.deleteReserve({
    theater_code: '001',
    date_jouei: '20170210',
    title_code: '8513',
    title_branch_num: '0',
    time_begin: '1010',
    reserve_num: 11586,
    tel_num: '09012345678',
    list_seat: [
        {
            seat_section: '0',
            seat_num: 'Ｅ－１'
        },
        {
            seat_section: '0',
            seat_num: 'Ｅ－２'
        }
    ]
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
