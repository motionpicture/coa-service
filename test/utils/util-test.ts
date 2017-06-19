/**
 * ユーティリティテスト
 *
 * @ignore
 */

import * as assert from 'assert';

import * as Util from '../../lib/utils/util';
import wait from '../wait';

describe('アクセストークン発行', () => {
    beforeEach(() => {
        // 毎回認証情報をリセットしてからテスト
        Util.resetCredentials();
    });

    it('再発行しないはず', async () => {
        const accessToken = await Util.publishAccessToken();

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await Util.publishAccessToken();

        assert.equal(accessToken, accessToken2);
    });

    it('期限切れで再発行するはず', async () => {
        const SPARE_TIME = 3600000;

        const accessToken = await Util.publishAccessToken();

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        // アクセストークンまでの猶予時間を十分に小さく設定する
        const accessToken2 = await Util.publishAccessToken(SPARE_TIME);

        assert.notEqual(accessToken, accessToken2);
    });

    it('リセット後に再発行するはず', async () => {
        const accessToken = await Util.publishAccessToken();
        Util.resetCredentials();

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await Util.publishAccessToken();

        assert.notEqual(accessToken, accessToken2);
    });
});

describe('レスポンスボディチェック', () => {
    beforeEach(() => {
        // 毎回認証情報をリセットしてからテスト
        Util.resetCredentials();
    });

    it('スルーする', async () => {
        const body = {
            message: '',
            status: 0
        };
        const passedBody = await Util.throwIfNot200(body);
        assert.equal(passedBody, body);
    });

    it('ボディが文字列の場合', async () => {
        const body = 'error message';

        const thrownError = await Util.throwIfNot200(body).catch((error) => error);
        assert(thrownError instanceof Error);
        assert.equal((<Error>thrownError).message, body);
    });

    it('ボディが認証エラーの場合、認証情報がリセットされる', async () => {
        const body = Util.RESPONSE_BODY_BAD_CREDENTIALS;

        const accessToken = await Util.publishAccessToken();
        const thrownError = await Util.throwIfNot200(body).catch((error) => error);
        assert(thrownError instanceof Error);
        assert.equal((<Error>thrownError).message, body);

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await Util.publishAccessToken();
        assert.notEqual(accessToken, accessToken2);
    });
});
