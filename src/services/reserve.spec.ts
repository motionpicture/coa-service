// tslint:disable:no-implicit-dependencies
/**
 * 予約サービステスト
 * @ignore
 */
import * as assert from 'assert';
import { OK } from 'http-status';
import * as nock from 'nock';
import * as sinon from 'sinon';

import RefreshTokenClient from '../auth/refreshTokenClient';
import * as reserveService from './reserve';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

describe('購入チケット内容抽出', () => {
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

    it('パラメーターが適切であれば抽出できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            reserveNum: 123,
            telNum: 'telNum'
        };
        const body = {
            list_ticket: [{}]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/state_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.stateReserve(params);
        assert.equal(typeof result, 'object');
        assert(scope.isDone());
        sandbox.verify();
    });

    it('該当予約なければnullが返却されるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            reserveNum: 123,
            telNum: 'telNum'
        };
        const body = {
            list_ticket: []
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/state_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.stateReserve(params);
        assert.deepEqual(result, null);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('座席本予約', () => {
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

    it('パラメーターが適切であれば本予約できるはず', async () => {
        const params = {
            theaterCode: '',
            dateJouei: '',
            titleCode: '',
            titleBranchNum: '',
            timeBegin: '',
            tmpReserveNum: 123,
            reserveName: '',
            reserveNameJkana: '',
            telNum: '',
            mailAddr: '',
            reserveAmount: 123,
            listTicket: [{
                ticketCode: '',
                stdPrice: 123,
                addPrice: 123,
                disPrice: 123,
                salePrice: 123,
                mvtkAppPrice: 123,
                ticketCount: 123,
                seatNum: '',
                addGlasses: 123,
                kbnEisyahousiki: '',
                mvtkNum: '',
                mvtkKbnDenshiken: '',
                mvtkKbnMaeuriken: '',
                mvtkKbnKensyu: '',
                mvtkSalesPrice: 123
            }]
        };
        const body = {
            reserve_num: 123,
            list_qr: [{}]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/upd_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.updReserve(params);
        assert.equal(result.reserveNum, body.reserve_num);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('空席状況', () => {
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

    it('存在する空席状況', async () => {
        const params = {
            theaterCode: 'theaterCode',
            begin: 'begin',
            end: 'end'
        };
        const body = {
            theater_code: 'theater_code',
            list_date: [{
                list_performance: [{}]
            }]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/count_free_seat/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.countFreeSeat(params);
        assert.equal(result.theaterCode, body.theater_code);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('販売可能チケット情報', () => {
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

    it('会員用フラグが未指定であれば非会員がセットされるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin'
            // flgMember?: FlgMember;
        };
        const body = {
            list_ticket: [{}]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/sales_ticket/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.salesTicket(params);
        assert(Array.isArray(result));
        assert(scope.isDone());
        sandbox.verify();
    });

    it('パラメーターが適切であれば抽出できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin',
            flgMember: reserveService.FlgMember.Member
        };
        const body = {
            list_ticket: [{}]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/sales_ticket/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.salesTicket(params);
        assert(Array.isArray(result));
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('座席予約状態抽出', () => {
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

    it('パラメーターが適切であれば抽出できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin',
            screenCode: 'screenCode'
        };
        const body = {
            cnt_reserve_free: 'cnt_reserve_free',
            list_seat: [{
                list_free_seat: [{}]
            }]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/state_reserve_seat/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.stateReserveSeat(params);
        assert.equal(result.cntReserveFree, body.cnt_reserve_free);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('座席仮予約', () => {
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

    it('パラメーターが適切であれば仮予約できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin',
            screenCode: 'screenCode',
            listSeat: [{
                seatSection: '',
                seatNum: ''
            }]
        };
        const body = {
            tmp_reserve_num: 123,
            list_tmp_reserve: [{}]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/upd_tmp_reserve_seat/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.updTmpReserveSeat(params);
        assert.deepEqual(result.tmpReserveNum, body.tmp_reserve_num);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('statusが0であればエラーのなるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin',
            screenCode: 'screenCode',
            listSeat: [{
                seatSection: 'seat_section',
                seatNum: 'seat_num'
            }]
        };
        const body = {
            status: '1',
            message: 'message',
            tmp_reserve_num: 0,
            list_tmp_reserve: [{
                seat_section: 'seat_section',
                seat_num: 'seat_num',
                sts_tmp_reserve: 'NG'
            }]
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/upd_tmp_reserve_seat/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.updTmpReserveSeat(params).catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('座席仮予約削除', () => {
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

    it('パラメーターが適切であれば仮予約削除できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin',
            screenCode: 'screenCode',
            tmpReserveNum: 123
        };
        const body = {
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/del_tmp_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.delTmpReserve(params);
        assert.deepEqual(result, undefined);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('購入チケット取り消し', () => {
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

    it('パラメーターが適切であれば取消できるはず', async () => {
        const params = {
            theaterCode: 'theaterCode',
            dateJouei: 'dateJouei',
            titleCode: 'titleCode',
            titleBranchNum: 'titleBranchNum',
            timeBegin: 'timeBegin',
            screenCode: 'screenCode',
            reserveNum: 123,
            telNum: 'telNum',
            listSeat: [{
                seatSection: '',
                seatNum: ''
            }]
        };
        const body = {
        };

        sandbox.mock(RefreshTokenClient.prototype).expects('getAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/del_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.delReserve(params);
        assert.deepEqual(result, undefined);
        assert(scope.isDone());
        sandbox.verify();
    });
});
