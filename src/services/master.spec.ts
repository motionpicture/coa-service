/**
 * マスターサービステスト
 * @ignore
 */

import * as assert from 'assert';
import { OK } from 'http-status';
import * as nock from 'nock';
import * as _ from 'underscore';

import * as masterService from './master';

let scope: nock.Scope;

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
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    it('ムビチケが存在すれば抽出できるはず', async () => {
        const params = {
            theaterCode: '118',
            kbnDenshiken: '01',
            kbnMaeuriken: '01',
            kbnKensyu: '01',
            salesPrice: 1400,
            appPrice: 1200,
            kbnEisyahousiki: '01',
            titleCode: 'xxxxx',
            titleBranchNum: 'xx'
        };
        const body = {
        };
        scope = nock(process.env.COA_ENDPOINT)
            .get(new RegExp(`\/api\/v1\/theater\/${params.theaterCode}\/mvtk_ticketcode\/\?.+`))
            .reply(OK, body);

        const result = await masterService.mvtkTicketcode(params);
        assert(typeof result, 'object');
        assert.equal(true, scope.isDone());
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

describe('スクリーンマスター抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const theaterCode = '123';
        const body = {
            list_screen: [{
                list_seat: [{}]
            }]
        };
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${theaterCode}/screen/`)
            .reply(OK, body);

        const result = await masterService.screen({
            theaterCode: theaterCode
        });
        assert(Array.isArray(result));
        assert.equal(true, scope.isDone());
    });
});

describe('券種マスター抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const theaterCode = '123';
        const body = {
            list_ticket: [{
            }]
        };
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${theaterCode}/ticket/`)
            .reply(OK, body);

        const result = await masterService.ticket({
            theaterCode: theaterCode
        });
        assert(Array.isArray(result));
        assert.equal(true, scope.isDone());
    });
});
