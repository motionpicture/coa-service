/**
 * マスターサービステスト
 *
 * @ignore
 */
import * as assert from 'assert';
import * as _ from 'underscore';

import * as MasterService from '../../lib/services/master';

describe('劇場抽出', () => {
    it('存在しない劇場', async () => {
        try {
            await MasterService.theater({
                theater_code: '000'
            });
        } catch (error) {
            assert(error instanceof Error);
            return;
        }

        throw new Error('劇場は存在しないはず');
    });

    it('存在する劇場', async () => {
        const theaterCode = '118';
        const result = await MasterService.theater({
            theater_code: theaterCode
        });

        assert.equal(result.theater_code, theaterCode);
    });
});

describe('作品抽出', () => {
    it('存在しない', async () => {
        try {
            await MasterService.title({
                theater_code: '000'
            });
        } catch (error) {
            assert(error instanceof Error);
            return;
        }

        throw new Error('作品は存在しないはず');
    });

    it('存在する', async () => {
        const result = await MasterService.title({
            theater_code: '118'
        });

        assert(!_.isEmpty(result[0].title_code));
    });
});

describe('スケジュール抽出', () => {
    it('存在しない', async () => {
        try {
            await MasterService.schedule({
                theater_code: '000',
                begin: '20170401',
                end: '20170401'
            });
        } catch (error) {
            assert(error instanceof Error);
            return;
        }

        throw new Error('スケジュールは存在しないはず');
    });

    it('存在する', async () => {
        const result = await MasterService.schedule({
            theater_code: '118',
            begin: '20170401',
            end: '20170401'
        });

        assert(!_.isEmpty(result[0].title_code));
    });
});

describe('ムビチケチケットコード取得', () => {
    it('存在しないムビチケチケットコード取得', (done) => {
        MasterService.mvtkTicketcode({
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

    it('存在するムビチケチケットコード取得', (done) => {
        MasterService.mvtkTicketcode({
            theater_code: '018',
            kbn_denshiken: '01',
            kbn_maeuriken: '01',
            kbn_kensyu: '01',
            sales_price: 1400,
            app_price: 1200,
            kbn_eisyahousiki: '01',
            title_code: '16227',
            title_branch_num: '0'
        }).then(() => {
            done();
        }).catch(() => {
            done(new Error('存在するムビチケチケットコードのはず'));
        });
    });
});
