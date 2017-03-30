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
const Util = require("../../lib/utils/util");
describe('アクセストークン発行', () => {
    it('再発行しないはず', () => __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield Util.publishAccessToken();
        const accessToken2 = yield Util.publishAccessToken();
        assert.equal(accessToken, accessToken2);
    }));
    it('期限切れで再発行するはず', (done) => {
        Util.publishAccessToken().then((accessToken) => __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    // アクセストークンまでの猶予時間を十分に小さく設定する
                    const accessToken2 = yield Util.publishAccessToken(-3600000); // tslint:disable-line:no-magic-numbers
                    assert.notEqual(accessToken, accessToken2);
                    done();
                }
                catch (error) {
                    done(error);
                }
            }), 2000 // tslint:disable-line:no-magic-numbers
            );
        }));
    });
    it('リセット後に再発行するはず', (done) => {
        Util.publishAccessToken().then((accessToken) => __awaiter(this, void 0, void 0, function* () {
            Util.resetAccessToken();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const accessToken2 = yield Util.publishAccessToken();
                    assert.notEqual(accessToken, accessToken2);
                    done();
                }
                catch (error) {
                    done(error);
                }
            }), 2000 // tslint:disable-line:no-magic-numbers
            );
        }));
    });
});
describe('レスポンスボディチェック', () => {
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
        try {
            yield Util.throwIfNot200(body);
        }
        catch (error) {
            assert(error instanceof Error);
            assert.equal(error.message, body);
            return;
        }
        throw new Error('why does not throw?');
    }));
    it('ボディが認証エラーの場合、認証情報がリセットされる', (done) => {
        const body = Util.RESPONSE_BODY_BAD_CREDENTIALS;
        Util.publishAccessToken().then((accessToken) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Util.throwIfNot200(body);
                done(new Error('why does not throw?'));
            }
            catch (error) {
                assert(error instanceof Error);
                assert.equal(error.message, body);
                // 異なるアクセストークンが発行されるはず
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const accessToken2 = yield Util.publishAccessToken();
                        assert.notEqual(accessToken, accessToken2);
                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                }), 2000 // tslint:disable-line:no-magic-numbers
                );
            }
        }));
    });
});
