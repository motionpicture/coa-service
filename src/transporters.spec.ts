// tslint:disable:no-implicit-dependencies
/**
 * トランスポーターテスト
 */
import * as assert from 'assert';
import { INTERNAL_SERVER_ERROR, NO_CONTENT, OK } from 'http-status';
import * as nock from 'nock';
import * as sinon from 'sinon';

import { COAServiceError, DefaultTransporter } from './transporters';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

describe('リクエストコールバック', () => {
    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();

        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();

        sandbox.restore();
    });

    it('エラーレスポンスが文字列であればエラーになるはず', async () => {
        const body = 'body';

        const options = {
            baseUrl: 'https://example.com',
            uri: '/uri',
            method: 'GET'
        };

        scope = nock(options.baseUrl).get(options.uri).once().reply(INTERNAL_SERVER_ERROR, body);

        const result = await new DefaultTransporter([OK]).request(options).catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('ステータスコードがNO_CONTENTであればundefinedが返却されるはず', async () => {
        const options = {
            baseUrl: 'https://example.com',
            uri: '/uri',
            method: 'GET'
        };

        scope = nock(options.baseUrl).get(options.uri).once().reply(NO_CONTENT);

        const result = await new DefaultTransporter([NO_CONTENT]).request(options);
        assert.equal(result, undefined);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('requestモジュールがエラーを返却すれば、INTERNAL_SERVER_ERRORとなるはず', async () => {
        const error = new Error('message');
        const options = {
            baseUrl: 'https://example.com',
            uri: '/uri',
            method: 'GET'
        };

        scope = nock(options.baseUrl).get(options.uri).once().replyWithError(error.message);

        const result = await new DefaultTransporter([NO_CONTENT]).request(options).catch((err) => err);
        assert(result instanceof COAServiceError);
        assert.equal(result.message, error.message);
        sandbox.verify();
    });

    it('User-Agentヘッダーが指定されていれば、初期値を追加するはず', async () => {
        const body = 'body';

        const options = {
            baseUrl: 'https://example.com',
            uri: '/uri',
            method: 'GET',
            headers: {
                'User-Agent': 'User-Agent'
            }
        };

        scope = nock(
            options.baseUrl,
            {
                reqheaders: {
                    'User-Agent': `User-Agent ${DefaultTransporter.USER_AGENT}`
                }
            })
            .get(options.uri).once().reply(OK, body);

        const result = await new DefaultTransporter([OK]).request(options);
        assert.deepEqual(result, body);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('エラー本文にstatusがあれば、COAServiceErrorとなるはず', async () => {
        const body = { status: '1', message: 'messaga' };

        const options = {
            baseUrl: 'https://example.com',
            uri: '/uri',
            method: 'GET',
            json: true
        };

        scope = nock(options.baseUrl).get(options.uri).once().reply(INTERNAL_SERVER_ERROR, body);

        const result = await new DefaultTransporter([OK]).request(options).catch((err) => err);
        assert(result instanceof COAServiceError);
        assert.equal(result.message, body.message);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('レスポンス本文のstatusが0でなければ、COAServiceErrorとなるはず', async () => {
        const body = { status: '1' };

        const options = {
            baseUrl: 'https://example.com',
            uri: '/uri',
            method: 'GET',
            json: true
        };

        scope = nock(options.baseUrl).get(options.uri).once().reply(OK, body);

        const result = await new DefaultTransporter([OK]).request(options).catch((err) => err);
        assert(result instanceof COAServiceError);
        assert.equal(result.status, body.status);
        assert(scope.isDone());
        sandbox.verify();
    });
});
