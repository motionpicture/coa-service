/**
 * マスターサービステスト
 * @ignore
 */

import * as assert from 'assert';
import { OK } from 'http-status';
import * as nock from 'nock';
import * as sinon from 'sinon';

import * as util from '../utils/util';
import * as masterService from './master';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

describe('劇場抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode'
        };
        const body = {
        };

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/theater/`)
            .query(true)
            .reply(OK, body);

        const result = await masterService.theater(params);
        assert(typeof result, 'object');
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('作品抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode'
        };
        const body = {
            list_title: [{}]
        };

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/title/`)
            .query(true)
            .reply(OK, body);

        const result = await masterService.title(params);
        assert(Array.isArray(result));
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('スケジュール抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            begin: 'begin',
            end: 'end'
        };
        const body = {
            list_schedule: [{}]
        };

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/schedule/`)
            .query(true)
            .reply(OK, body);

        const result = await masterService.schedule(params);
        assert(Array.isArray(result));
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('ムビチケチケットコード取得', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
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

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/mvtk_ticketcode/`)
            .query(true)
            .reply(OK, body);

        const result = await masterService.mvtkTicketcode(params);
        assert(typeof result, 'object');
        assert(scope.isDone());
        sandbox.verify();
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
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const theaterCode = '123';
        const body = {
            list_screen: [{
                list_seat: [{}]
            }]
        };

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${theaterCode}/screen/`)
            .reply(OK, body);

        const result = await masterService.screen({
            theaterCode: theaterCode
        });
        assert(Array.isArray(result));
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('券種マスター抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('劇場が存在すれば抽出できるはず', async () => {
        const theaterCode = '123';
        const body = {
            list_ticket: [{
            }]
        };

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${theaterCode}/ticket/`)
            .reply(OK, body);

        const result = await masterService.ticket({
            theaterCode: theaterCode
        });
        assert(Array.isArray(result));
        assert(scope.isDone());
        sandbox.verify();
    });
});
