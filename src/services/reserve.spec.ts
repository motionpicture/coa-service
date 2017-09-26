/**
 * 予約サービステスト
 * @ignore
 */

import * as assert from 'assert';
import { OK } from 'http-status';
import * as nock from 'nock';
import * as sinon from 'sinon';

import * as util from '../utils/util';
import * as reserveService from './reserve';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

before(() => {
    sandbox = sinon.sandbox.create();
});

describe('購入チケット内容抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
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
            list_ticket: []
        };

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/state_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.stateReserve(params);
        assert.equal(typeof result, 'object');
        assert.equal(true, scope.isDone());
        sandbox.verify();
    });
});

describe('座席本予約', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
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

        sandbox.mock(util).expects('publishAccessToken').once().resolves('access_token');
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/upd_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.updReserve(params);
        assert.equal(result.reserveNum, body.reserve_num);
        assert.equal(true, scope.isDone());
        sandbox.verify();
    });
});

describe('空席状況', () => {
    it('存在する空席状況', async () => {
        const date = new Date();
        // tslint:disable-next-line:prefer-template no-magic-numbers max-line-length
        const today = `${date.getFullYear()}${('00' + String(date.getMonth() + 1)).slice(-2)}${('0' + String(date.getDate())).slice(-2)}`;
        const theaterCode = '118';
        const countFreeSeat = await reserveService.countFreeSeat({
            theaterCode: theaterCode,
            begin: today,
            end: today
        });
        assert(countFreeSeat.theaterCode === theaterCode);
        assert(countFreeSeat.listDate.length === 1);
        assert(countFreeSeat.listDate[0].dateJouei === today);
    });
});

describe('販売可能チケット情報', () => {
    it('存在しない', async () => {
        const salesTicketResults = await reserveService.salesTicket({
            theaterCode: '118',
            dateJouei: '20170706',
            titleCode: '00000',
            titleBranchNum: '0',
            timeBegin: '1750',
            flgMember: reserveService.FlgMember.NonMember
        });

        assert(salesTicketResults.length === 0);
    });
    it('存在する 非会員', async () => {
        const salesTicketResults = await reserveService.salesTicket({
            theaterCode: '118',
            dateJouei: '20170706',
            titleCode: '99500',
            titleBranchNum: '0',
            timeBegin: '1750',
            flgMember: reserveService.FlgMember.NonMember
        });

        assert(salesTicketResults.length > 0);
    });
    it('存在する 会員', async () => {
        const salesTicketResults = await reserveService.salesTicket({
            theaterCode: '118',
            dateJouei: '20170706',
            titleCode: '99500',
            titleBranchNum: '0',
            timeBegin: '1750',
            flgMember: reserveService.FlgMember.Member
        });

        assert(salesTicketResults.length > 0);
    });
});

describe('座席予約状態抽出', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
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
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/state_reserve_seat/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.stateReserveSeat(params);
        assert.equal(result.cntReserveFree, body.cnt_reserve_free);
        assert.equal(true, scope.isDone());
        sandbox.verify();
    });
});

describe('座席仮予約', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
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
            listSeat: []
        };
        const body = {
            tmp_reserve_num: 123,
            list_tmp_reserve: [{}]
        };
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/upd_tmp_reserve_seat/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.updTmpReserveSeat(params);
        assert.deepEqual(result.tmpReserveNum, body.tmp_reserve_num);
        assert.equal(true, scope.isDone());
        sandbox.verify();
    });
});

describe('座席仮予約削除', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
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
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/del_tmp_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.delTmpReserve(params);
        assert.deepEqual(result, undefined);
        assert.equal(true, scope.isDone());
        sandbox.verify();
    });
});

describe('購入チケット取り消し', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
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
            listSeat: []
        };
        const body = {
        };
        scope = nock(process.env.COA_ENDPOINT)
            .get(`/api/v1/theater/${params.theaterCode}/del_reserve/`)
            .query(true)
            .reply(OK, body);

        const result = await reserveService.delReserve(params);
        assert.deepEqual(result, undefined);
        assert.equal(true, scope.isDone());
        sandbox.verify();
    });
});
