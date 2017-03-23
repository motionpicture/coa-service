/**
 * マスターサービステスト
 *
 * @ignore
 */
import * as assert from 'assert';
import * as COA from '../../lib/index';

describe('マスター抽出サービス', () => {
    it('存在しない劇場抽出', (done) => {
        COA.MasterService.theater({
            theater_code: '000'
        }).then(() => {
            done(new Error('劇場は存在しないはず'));
        }).catch((err) => {
            assert(err instanceof Error);
            done();
        });
    });

    it('存在する劇場抽出', (done) => {
        const theaterCode = '118';
        COA.MasterService.theater({
            theater_code: theaterCode
        }).then((result) => {
            assert.equal(result.theater_code, theaterCode);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});

describe('座席本予約', () => {
    it('存在しない座席本予約', (done) => {
        COA.ReserveService.updReserve({
            theater_code: '',
            date_jouei: '',
            title_code: '',
            title_branch_num: '',
            time_begin: '',
            tmp_reserve_num: 0,
            reserve_name: '',
            reserve_name_jkana: '',
            tel_num: '',
            mail_addr: '',
            reserve_amount: 0,
            list_ticket: [
                {
                    ticket_code: '',
                    std_price: 0,
                    add_price: 0,
                    dis_price: 0,
                    sale_price: 0,
                    mvtk_app_price: 0,
                    ticket_count: 1,
                    seat_num: '',
                    add_glasses: 0
                }
            ]
        }).then(() => {
            done(new Error('存在しない座席本予約のはず'));
        }).catch((err) => {
            assert(err instanceof Error);
            done();
        });
    });
});

describe('ムビチケチケットコード取得', () => {
    it('存在しないムビチケチケットコード取得', (done) => {
        COA.MasterService.mvtkTicketcode({
            theater_code: '118',
            kbn_denshiken: '01',
            kbn_maeuriken: '01',
            kbn_kensyu: '01',
            sales_price: 1400,
            app_price: 1200,
            kbn_eisyahousiki: '01',
            title_code: 'xxxxx',
            title_branch_num: 'xx'
        }).then(() => {
            done(new Error('存在しないムビチケチケットコードのはず'));
        }).catch(() => {
            done();
        });
    });
});
