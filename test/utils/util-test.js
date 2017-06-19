"use strict";
/**
 * ユーティリティテスト
 *
 * @ignore
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Util = require("../../lib/utils/util");
const wait_1 = require("../wait");
describe('アクセストークン発行', () => {
    beforeEach(() => {
        // 毎回認証情報をリセットしてからテスト
        Util.resetCredentials();
    });
    it('再発行しないはず', () => __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield Util.publishAccessToken();
        // tslint:disable-next-line:no-magic-numbers
        yield wait_1.default(1000);
        const accessToken2 = yield Util.publishAccessToken();
        assert.equal(accessToken, accessToken2);
    }));
    it('期限切れで再発行するはず', () => __awaiter(this, void 0, void 0, function* () {
        const SPARE_TIME = 3600000;
        const accessToken = yield Util.publishAccessToken();
        // tslint:disable-next-line:no-magic-numbers
        yield wait_1.default(1000);
        // アクセストークンまでの猶予時間を十分に小さく設定する
        const accessToken2 = yield Util.publishAccessToken(SPARE_TIME);
        assert.notEqual(accessToken, accessToken2);
    }));
    it('リセット後に再発行するはず', () => __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield Util.publishAccessToken();
        Util.resetCredentials();
        // tslint:disable-next-line:no-magic-numbers
        yield wait_1.default(1000);
        const accessToken2 = yield Util.publishAccessToken();
        assert.notEqual(accessToken, accessToken2);
    }));
});
describe('レスポンスボディチェック', () => {
    beforeEach(() => {
        // 毎回認証情報をリセットしてからテスト
        Util.resetCredentials();
    });
    it('スルーする', () => __awaiter(this, void 0, void 0, function* () {
        const body = {
            message: '',
            status: 0
        };
        const passedBody = yield Util.throwIfNot200(body);
        assert.equal(passedBody, body);
    }));
    it('ボディが文字列の場合', () => __awaiter(this, void 0, void 0, function* () {
        const body = 'error message';
        const thrownError = yield Util.throwIfNot200(body).catch((error) => error);
        assert(thrownError instanceof Error);
        assert.equal(thrownError.message, body);
    }));
    it('ボディが認証エラーの場合、認証情報がリセットされる', () => __awaiter(this, void 0, void 0, function* () {
        const body = Util.RESPONSE_BODY_BAD_CREDENTIALS;
        const accessToken = yield Util.publishAccessToken();
        const thrownError = yield Util.throwIfNot200(body).catch((error) => error);
        assert(thrownError instanceof Error);
        assert.equal(thrownError.message, body);
        // tslint:disable-next-line:no-magic-numbers
        yield wait_1.default(1000);
        const accessToken2 = yield Util.publishAccessToken();
        assert.notEqual(accessToken, accessToken2);
    }));
});
