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
const masterService = require("../../lib/services/master");
describe('劇場抽出', () => {
    it('存在しない劇場', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield masterService.theater({
                theaterCode: '000'
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
        const result = yield masterService.theater({
            theaterCode: theaterCode
        });
        assert.equal(result.theaterCode, theaterCode);
    }));
});
describe('作品抽出', () => {
    it('存在しない', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield masterService.title({
                theaterCode: '000'
            });
        }
        catch (error) {
            assert(error instanceof Error);
            return;
        }
        throw new Error('作品は存在しないはず');
    }));
    it('存在する', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield masterService.title({
            theaterCode: '118'
        });
        assert(!_.isEmpty(result[0].titleCode));
    }));
});
describe('スケジュール抽出', () => {
    it('存在しない', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield masterService.schedule({
                theaterCode: '000',
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
        const result = yield masterService.schedule({
            theaterCode: '118',
            begin: '20170401',
            end: '20170401'
        });
        assert(!_.isEmpty(result[0].titleCode));
    }));
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
