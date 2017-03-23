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
 * ユーティリティテスト
 *
 * @ignore
 */
const assert = require("assert");
const COA = require("../../lib/index");
describe('アクセストークン発行', () => {
    it('再発行しないはず', () => __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield COA.Util.publishAccessToken();
        const accessToken2 = yield COA.Util.publishAccessToken();
        assert.equal(accessToken, accessToken2);
    }));
    it('期限切れで再発行するはず', () => __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield COA.Util.publishAccessToken();
        // アクセストークンまでの猶予時間を十分に小さく設定する
        const accessToken2 = yield COA.Util.publishAccessToken(-3600000);
        assert(accessToken !== accessToken2);
    }));
    it('リセット後に再発行するはず', () => __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield COA.Util.publishAccessToken();
        COA.Util.resetAccessToken();
        const accessToken2 = yield COA.Util.publishAccessToken();
        assert(accessToken !== accessToken2);
    }));
});
