"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 予約サービステスト
 *
 * @ignore
 */
const assert = require("assert");
const reserveService = require("../../lib/services/reserve");
describe('座席予約状態抽出', () => {
    it('存在しない予約', () => __awaiter(this, void 0, void 0, function* () {
        const stateReserveResult = yield reserveService.stateReserve({
            theaterCode: '118',
            reserveNum: 123,
            telNum: '09000000000'
        });
        assert.equal(stateReserveResult, null);
    }));
});
describe('座席本予約', () => {
    it('存在しない座席本予約', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield reserveService.updReserve({
                theaterCode: '',
                dateJouei: '',
                titleCode: '',
                titleBranchNum: '',
                timeBegin: '',
                tmpReserveNum: 0,
                reserveName: '',
                reserveNameJkana: '',
                telNum: '',
                mailAddr: '',
                reserveAmount: 0,
                listTicket: [
                    {
                        ticketCode: '',
                        stdPrice: 0,
                        addPrice: 0,
                        disPrice: 0,
                        salePrice: 0,
                        mvtkAppPrice: 0,
                        ticketCount: 1,
                        seatNum: '',
                        addGlasses: 0,
                        kbnEisyahousiki: '00',
                        mvtkNum: '',
                        mvtkKbnDenshiken: '00',
                        mvtkKbnMaeuriken: '00',
                        mvtkKbnKensyu: '00',
                        mvtkSalesPrice: 0
                    }
                ]
            });
        }
        catch (error) {
            assert(error instanceof Error);
            return;
        }
        throw new Error('存在しない座席本予約のはず');
    }));
});
describe('空席状況', () => {
    it('存在する空席状況', () => __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        // tslint:disable-next-line:prefer-template no-magic-numbers max-line-length
        const today = `${date.getFullYear()}${('00' + String(date.getMonth() + 1)).slice(-2)}${('0' + String(date.getDate())).slice(-2)}`;
        const theaterCode = '118';
        const countFreeSeat = yield reserveService.countFreeSeat({
            theaterCode: theaterCode,
            begin: today,
            end: today
        });
        assert(countFreeSeat.theaterCode === theaterCode);
        assert(countFreeSeat.listDate.length === 1);
        assert(countFreeSeat.listDate[0].dateJouei === today);
    }));
});
describe('販売可能チケット情報', () => {
    it('存在しない', () => __awaiter(this, void 0, void 0, function* () {
        const salesTicketResults = yield reserveService.salesTicket({
            theaterCode: '118',
            dateJouei: '20170706',
            titleCode: '00000',
            titleBranchNum: '0',
            timeBegin: '1750',
            flgMember: reserveService.FlgMember.NonMember
        });
        assert(salesTicketResults.length === 0);
    }));
    it('存在する 非会員', () => __awaiter(this, void 0, void 0, function* () {
        const salesTicketResults = yield reserveService.salesTicket({
            theaterCode: '118',
            dateJouei: '20170706',
            titleCode: '99500',
            titleBranchNum: '0',
            timeBegin: '1750',
            flgMember: reserveService.FlgMember.NonMember
        });
        assert(salesTicketResults.length > 0);
    }));
    it('存在する 会員', () => __awaiter(this, void 0, void 0, function* () {
        const salesTicketResults = yield reserveService.salesTicket({
            theaterCode: '118',
            dateJouei: '20170706',
            titleCode: '99500',
            titleBranchNum: '0',
            timeBegin: '1750',
            flgMember: reserveService.FlgMember.Member
        });
        assert(salesTicketResults.length > 0);
    }));
});
