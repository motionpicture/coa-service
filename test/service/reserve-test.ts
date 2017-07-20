/**
 * 予約サービステスト
 *
 * @ignore
 */
import * as assert from 'assert';

import * as reserveService from '../../lib/services/reserve';

describe('座席予約状態抽出', () => {
    it('存在しない予約', async () => {
        const stateReserveResult = await reserveService.stateReserve({
            theaterCode: '118',
            reserveNum: 123,
            telNum: '09000000000'
        });

        assert.equal(stateReserveResult, null);
    });
});

describe('座席本予約', () => {
    it('存在しない座席本予約', async () => {
        try {
            await reserveService.updReserve({
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
        } catch (error) {
            assert(error instanceof Error);

            return;
        }

        throw new Error('存在しない座席本予約のはず');
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
