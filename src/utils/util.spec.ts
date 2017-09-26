/**
 * ユーティリティテスト
 *
 * @ignore
 */

import * as assert from 'assert';
import { OK } from 'http-status';
import * as moment from 'moment';
import * as nock from 'nock';
import * as sinon from 'sinon';

import wait from '../wait.spec';
import * as util from './util';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

describe('アクセストークン発行', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();

        sandbox = sinon.sandbox.create();
        // 毎回認証情報をリセットしてからテスト
        util.resetCredentials();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('エラーレスポンスが文字列であればエラーになるはず', async () => {
        const spareTime = 123;
        const body = 'body';

        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        const result = await util.publishAccessToken(spareTime)
            .catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('BAD_CREDENTIALSであれば認証情報がリセットされるはず', async () => {
        const spareTime = 123;
        const body = util.RESPONSE_BODY_BAD_CREDENTIALS;

        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        const result = await util.publishAccessToken(spareTime)
            .catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('エラーレスポンスにメッセージがあればエラーになるはず', async () => {
        const spareTime = 123;
        const body = {
            message: 'message'
        };

        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        const result = await util.publishAccessToken(spareTime)
            .catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('エラーレスポンスにステータスがあればエラーになるはず', async () => {
        const spareTime = 123;
        const body = {
            status: 'status'
        };

        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        const result = await util.publishAccessToken(spareTime)
            .catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('再発行しないはず', async () => {
        const body = {
            access_token: 'access_token',
            expired_at: moment().add(1, 'hour').toISOString()
        };

        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        const accessToken = await util.publishAccessToken();
        assert(scope.isDone());

        body.access_token = 'another access_token';
        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);
        const accessToken2 = await util.publishAccessToken();

        assert.equal(accessToken, accessToken2);
        assert(!scope.isDone());
        sandbox.verify();
    });

    it('期限切れで再発行するはず', async () => {
        const SPARE_TIME = 36000000;
        const body = {
            access_token: 'access_token',
            expired_at: moment().toISOString()
        };

        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        await util.publishAccessToken();

        body.access_token = 'another access_token';
        scope = nock(process.env.COA_ENDPOINT)
            .post('/token/access_token')
            .reply(OK, body);

        // tslint:disable-next-line:no-magic-numbers
        await wait(1000);

        // アクセストークンまでの猶予時間を十分に小さく設定する
        const accessToken2 = await util.publishAccessToken(SPARE_TIME);
        assert.equal(accessToken2, body.access_token);
        assert(scope.isDone());
        sandbox.verify();
    });

    // it('リセット後に再発行するはず', async () => {
    //     const newCredentials = {
    //         access_token: 'access_token',
    //         expired_at: 'expired_at'
    //     };

    //     const accessToken = await util.publishAccessToken();
    //     util.resetCredentials();

    //     sandbox.mock(request).expects('post').once()
    //         .withArgs(sinon.match({ url: `${process.env.COA_ENDPOINT}/token/access_token` }))
    //         .resolves(newCredentials);

    //     // tslint:disable-next-line:no-magic-numbers
    //     await wait(1000);
    //     const accessToken2 = await util.publishAccessToken();

    //     assert.notEqual(accessToken, accessToken2);
    //     sandbox.verify();
    // });
});
