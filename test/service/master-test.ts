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
