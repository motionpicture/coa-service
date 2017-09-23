/**
 * ユーティリティテスト
 *
 * @ignore
 */

import * as assert from 'assert';
import * as request from 'request-promise-native';
import * as sinon from 'sinon';

import wait from '../wait.spec';
import * as util from './util';

let sandbox: sinon.SinonSandbox;

describe('アクセストークン発行', () => {
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        // 毎回認証情報をリセットしてからテスト
        util.resetCredentials();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('再発行しないはず', async () => {
        const accessToken = await util.publishAccessToken();

        sandbox.mock(request).expects('post').never()
            .withArgs(sinon.match({ url: `${process.env.COA_ENDPOINT}/token/access_token` }));

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await util.publishAccessToken();

        assert.equal(accessToken, accessToken2);
        sandbox.verify();
    });

    it('期限切れで再発行するはず', async () => {
        const SPARE_TIME = 36000000;
        const newCredentials = {
            access_token: 'access_token',
            expired_at: 'expired_at'
        };

        await util.publishAccessToken();

        sandbox.mock(request).expects('post').once()
            .withArgs(sinon.match({ url: `${process.env.COA_ENDPOINT}/token/access_token` }))
            .resolves(newCredentials);

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);

        // アクセストークンまでの猶予時間を十分に小さく設定する
        const accessToken2 = await util.publishAccessToken(SPARE_TIME);
        assert.equal(accessToken2, newCredentials.access_token);
        sandbox.verify();
    });

    it('リセット後に再発行するはず', async () => {
        const newCredentials = {
            access_token: 'access_token',
            expired_at: 'expired_at'
        };

        const accessToken = await util.publishAccessToken();
        util.resetCredentials();

        sandbox.mock(request).expects('post').once()
            .withArgs(sinon.match({ url: `${process.env.COA_ENDPOINT}/token/access_token` }))
            .resolves(newCredentials);

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await util.publishAccessToken();

        assert.notEqual(accessToken, accessToken2);
        sandbox.verify();
    });
});

describe('レスポンスボディチェック', () => {
    beforeEach(() => {
        // 毎回認証情報をリセットしてからテスト
        util.resetCredentials();
    });

    it('スルーする', async () => {
        const body = {
            message: '',
            status: 0
        };
        const passedBody = await util.throwIfNot200(body);
        assert.equal(passedBody, body);
    });

    it('ボディが文字列の場合', async () => {
        const body = 'error message';

        const thrownError = await util.throwIfNot200(body).catch((error) => error);
        assert(thrownError instanceof Error);
        assert.equal((<Error>thrownError).message, body);
    });

    it('ボディが認証エラーの場合、認証情報がリセットされる', async () => {
        const body = util.RESPONSE_BODY_BAD_CREDENTIALS;

        const accessToken = await util.publishAccessToken();
        const thrownError = await util.throwIfNot200(body).catch((error) => error);
        assert(thrownError instanceof Error);
        assert.equal((<Error>thrownError).message, body);

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await util.publishAccessToken();
        assert.notEqual(accessToken, accessToken2);
    });
});
