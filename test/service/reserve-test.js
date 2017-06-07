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
const ReserveService = require("../../lib/services/reserve");
describe('座席予約状態抽出', () => {
    it('存在しない予約', () => __awaiter(this, void 0, void 0, function* () {
        const stateReserveResult = yield ReserveService.stateReserve({
            theater_code: '118',
            reserve_num: 123,
            tel_num: '09000000000'
        });
        assert.equal(stateReserveResult, null);
    }));
});
describe('座席本予約', () => {
    it('存在しない座席本予約', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield ReserveService.updReserve({
                theater_code: '',
                date_jouei: '',
                title_code: '',
                title_branch_num: '',
                time_begin: '',
                tmp_reserve_num: 0,
                reserve_name: '',
                reserve_name_jkana: '',
                tel_num: '',
                mail_addr: '',
                reserve_amount: 0,
                list_ticket: [
                    {
                        ticket_code: '',
                        std_price: 0,
                        add_price: 0,
                        dis_price: 0,
                        sale_price: 0,
                        mvtk_app_price: 0,
                        ticket_count: 1,
                        seat_num: '',
                        add_glasses: 0,
                        kbn_eisyahousiki: '00',
                        mvtk_num: '',
                        mvtk_kbn_denshiken: '00',
                        mvtk_kbn_maeuriken: '00',
                        mvtk_kbn_kensyu: '00',
                        mvtk_sales_price: 0
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
