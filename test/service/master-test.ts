/**
 * マスターサービステスト
 *
 * @ignore
 */
import * as assert from 'assert';
import * as _ from 'underscore';

import * as masterService from '../../lib/services/master';

describe('劇場抽出', () => {
    it('存在しない劇場', async () => {
        try {
            await masterService.theater({
                theaterCode: '000'
            });
        } catch (error) {
            assert(error instanceof Error);

            return;
        }

        throw new Error('劇場は存在しないはず');
    });

    it('存在する劇場', async () => {
        const theaterCode = '118';
        const result = await masterService.theater({
            theaterCode: theaterCode
        });

        assert.equal(result.theaterCode, theaterCode);
    });
});

describe('作品抽出', () => {
    it('存在しない', async () => {
        try {
            await masterService.title({
                theaterCode: '000'
            });
        } catch (error) {
            assert(error instanceof Error);

            return;
        }

        throw new Error('作品は存在しないはず');
    });

    it('存在する', async () => {
        const result = await masterService.title({
            theaterCode: '118'
        });

        assert(!_.isEmpty(result[0].titleCode));
    });
});

describe('スケジュール抽出', () => {
    it('存在しない', async () => {
        try {
            await masterService.schedule({
                theaterCode: '000',
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
        const result = await masterService.schedule({
            theaterCode: '118',
            begin: '20170401',
            end: '20170401'
        });

        assert(!_.isEmpty(result[0].titleCode));
    });
});

describe('ムビチケチケットコード取得', () => {
    it('存在しないムビチケチケットコード取得', (done) => {
        masterService.mvtkTicketcode({
            theaterCode: '118',
            kbnDenshiken: '01',
            kbnMaeuriken: '01',
            kbnKensyu: '01',
            salesPrice: 1400,
            appPrice: 1200,
            kbnEisyahousiki: '01',
            titleCode: 'xxxxx',
            titleBranchNum: 'xx'
        }).then(() => {
            done(new Error('存在しないムビチケチケットコードのはず'));
        }).catch(() => {
            done();
        });
    });
});

describe('各種区分マスター抽出', () => {
    it('存在しない', (done) => {
        masterService.kubunName({
            theaterCode: '118',
            kubunClass: '0'
        }).then(() => {
            done(new Error('存在しない区分'));
        }).catch(() => {
            done();
        });
    });
    it('存在する', (done) => {
        masterService.kubunName({
            theaterCode: '118',
            kubunClass: '001'
        }).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
});
