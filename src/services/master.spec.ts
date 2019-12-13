// tslint:disable:no-implicit-dependencies
/**
 * マスターサービステスト
 */
import * as assert from 'assert';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import * as nock from 'nock';
import * as sinon from 'sinon';
import * as xml2js from 'xml2js';

import RefreshTokenClient from '../auth/refreshTokenClient';
import * as masterService from './master';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

describe('劇場抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.createSandbox();
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

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
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
        sandbox = sinon.createSandbox();
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

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
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
        sandbox = sinon.createSandbox();
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

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
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

describe('XMLスケジュール抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('XMLエンドポイントが異常であれば、エラーとなるはず', async () => {
        const params = {
            theaterCodeName: 'theaterCodeName',
            // tslint:disable-next-line:no-http-string
            baseUrl: 'http://baseUrl'
        };

        const error = new Error('error');
        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .once()
            .replyWithError(error)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .once()
            .replyWithError(error);

        const result = await masterService.xmlSchedule(params).catch((err) => (err));
        assert.deepEqual(result, error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('XMLエンドポイントを繋がる時、エラーをもらえばエラーとなるはず', async () => {
        const params = {
            theaterCodeName: 'theaterCodeName',
            // tslint:disable-next-line:no-http-string
            baseUrl: 'http://baseUrl'
        };

        const errorBody1 = 'this is an error';

        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .reply(INTERNAL_SERVER_ERROR, errorBody1)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .reply(INTERNAL_SERVER_ERROR, errorBody1);

        let result = await masterService.xmlSchedule(params).catch((err) => (err));
        assert.deepEqual(result, new Error(errorBody1));
        assert(scope.isDone());

        const errorBody2 = '';

        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .reply(INTERNAL_SERVER_ERROR, errorBody2)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .reply(INTERNAL_SERVER_ERROR, errorBody2);

        result = await masterService.xmlSchedule(params).catch((err) => (err));
        assert.deepEqual(result, new Error('Unexpected error occurred.'));
        assert(scope.isDone());
        sandbox.verify();
    });

    it('XMLエンドポイントで、エラーが発生する場合、エラーとなるはず', async () => {
        const params = {
            theaterCodeName: 'theaterCodeName',
            // tslint:disable-next-line:no-http-string
            baseUrl: 'http://baseUrl'
        };

        const builder = new xml2js.Builder();
        const xmlBody = builder.buildObject({
            schedules: {
                error: '222222'
            }
        });

        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .reply(OK, xmlBody)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .reply(OK, xmlBody);

        const result = await masterService.xmlSchedule(params).catch((err) => (err));
        const error = new Error('XMLエンドポイントからエラーが発生しました。');
        assert.deepEqual(result, error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('XMLエンドポイントから111111のエラーコードをもらえば空の配列が出るはず', async () => {
        const params = {
            theaterCodeName: 'theaterCodeName',
            // tslint:disable-next-line:no-http-string
            baseUrl: 'http://baseUrl'
        };

        const builder = new xml2js.Builder();
        const xmlBody = builder.buildObject({
            schedules: {
                error: '111111'
            }
        });

        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .reply(OK, xmlBody)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .reply(OK, xmlBody);

        const result = await masterService.xmlSchedule(params);
        assert.deepEqual(result, [[], []]);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('XMLエンドポイントで処理が正常完了すれば正しいスケジュールが出るはず', async () => {
        const params = {
            theaterCodeName: 'theaterCodeName',
            // tslint:disable-next-line:no-http-string
            baseUrl: 'http://baseUrl'
        };

        const builder = new xml2js.Builder();
        const xmlObject: masterService.IXMLScheduleOriginal = {
            schedules: {
                error: ['000000'],
                theater_code: ['theater code'],
                attention: ['attention'],
                schedule: [{
                    date: ['date'],
                    usable: ['0'],
                    movie: [{
                        cname: ['cname'],
                        comment: ['comment'],
                        cm_time: ['10'],
                        running_time: ['100'],
                        official_site: ['official site'],
                        name: ['name'],
                        ename: ['ename'],
                        summary: ['summary'],
                        movie_code: ['movie code'],
                        movie_branch_code: ['movie branch code'],
                        movie_short_code: ['movie short code'],
                        screen: [{
                            screen_code: ['screen code'],
                            name: ['name'],
                            time: [{
                                available: ['0'],
                                start_time: ['start time'],
                                end_time: ['end time'],
                                late: ['0'],
                                url: ['url']
                            }]
                        }]
                    }]
                }]
            }
        };
        const xmlBody = builder.buildObject(xmlObject);

        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .reply(OK, xmlBody)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .reply(OK, xmlBody);

        const result = await masterService.xmlSchedule(params);
        const expectedResult: masterService.IXMLScheduleResult[] = [{
            date: 'date',
            usable: false,
            movie: [{
                cName: 'cname',
                comment: 'comment',
                cmTime: 10,
                runningTime: 100,
                officialSite: 'official site',
                name: 'name',
                eName: 'ename',
                summary: 'summary',
                movieCode: 'movie code',
                movieBranchCode: 'movie branch code',
                movieShortCode: 'movie short code',
                screen: [{
                    screenCode: 'screen code',
                    name: 'name',
                    time: [{
                        available: 0,
                        startTime: 'start time',
                        endTime: 'end time',
                        late: 0,
                        url: 'url'
                    }]
                }]
            }]
        }];
        assert.deepEqual(result, [expectedResult, expectedResult]);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('XMLエンドポイントからもらえるデータはXMLではない場合、エラーとなるはず', async () => {
        const params = {
            theaterCodeName: 'theaterCodeName',
            // tslint:disable-next-line:no-http-string
            baseUrl: 'http://baseUrl'
        };
        const body = '{ "json": "this isn\'t xml data" }';

        scope = nock(params.baseUrl)
            .get(`/${params.theaterCodeName}/schedule/xml/schedule.xml`)
            .reply(OK, body)
            .get(`/${params.theaterCodeName}/schedule/xml/preSchedule.xml`)
            .reply(OK, body);

        const result = await masterService.xmlSchedule(params).catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('ムビチケチケットコード取得', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.createSandbox();
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
            titleBranchNum: 'xx',
            dateJouei: '20181107'
        };
        const body = {
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
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
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('区分が存在すれば抽出できるはず', async () => {
        const params = {
            theaterCode: '118',
            kubunClass: 'kubunClass'
        };
        const body = {
            list_kubun: [{}]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/kubun_name/`)
            .query(true)
            .reply(OK, body);

        const result = await masterService.kubunName(params);
        assert(typeof result, 'object');
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('スクリーンマスター抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
        sandbox = sinon.createSandbox();
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

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
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
        sandbox = sinon.createSandbox();
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
                ticket_code: '',
                ticket_name: '',
                ticket_name_kana: '',
                ticket_name_eng: '',
                use_point: 0,
                flg_member: masterService.FlgMember.NonMember
            }]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
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
