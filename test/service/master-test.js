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
 * マスターサービステスト
 *
 * @ignore
 */
const assert = require("assert");
const _ = require("underscore");
const MasterService = require("../../lib/services/master");
describe('劇場抽出', () => {
    it('存在しない劇場', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield MasterService.theater({
                theater_code: '000'
            });
        }
        catch (error) {
            assert(error instanceof Error);
            return;
        }
        throw new Error('劇場は存在しないはず');
    }));
    it('存在する劇場', () => __awaiter(this, void 0, void 0, function* () {
        const theaterCode = '118';
        const result = yield MasterService.theater({
            theater_code: theaterCode
        });
        assert.equal(result.theater_code, theaterCode);
    }));
});
describe('作品抽出', () => {
    it('存在しない', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield MasterService.title({
                theater_code: '000'
            });
        }
        catch (error) {
            assert(error instanceof Error);
            return;
        }
        throw new Error('作品は存在しないはず');
    }));
    it('存在する', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield MasterService.title({
            theater_code: '118'
        });
        assert(!_.isEmpty(result[0].title_code));
    }));
});
describe('スケジュール抽出', () => {
    it('存在しない', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield MasterService.schedule({
                theater_code: '000',
                begin: '20170401',
                end: '20170401'
            });
        }
        catch (error) {
            assert(error instanceof Error);
            return;
        }
        throw new Error('スケジュールは存在しないはず');
    }));
    it('存在する', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield MasterService.schedule({
            theater_code: '118',
            begin: '20170401',
            end: '20170401'
        });
        assert(!_.isEmpty(result[0].title_code));
    }));
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
