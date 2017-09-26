/**
 * トランスポーターテスト
 * @ignore
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
            uri: '/uri',
            method: 'GET'
        };

        scope = nock(process.env.COA_ENDPOINT)
            .get(options.uri)
            .reply(INTERNAL_SERVER_ERROR, body);

        const result = await new DefaultTransporter([OK]).request(options).catch((err) => err);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('ステータスコードがNO_CONTENTであればundefinedが返却されるはず', async () => {
        const body = undefined;

        const options = {
            uri: '/uri',
            method: 'GET'
        };

        scope = nock(process.env.COA_ENDPOINT)
            .get(options.uri)
            .reply(NO_CONTENT, body);

        const result = await new DefaultTransporter([NO_CONTENT]).request(options);
        assert.equal(result, body);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('requestモジュールがエラーを返却すれば、INTERNAL_SERVER_ERRORとなるはず', async () => {
        const error = new Error('message');
        const options = {
            uri: '/uri',
            method: 'GET'
        };

        scope = nock(process.env.COA_ENDPOINT)
            .get(options.uri)
            .replyWithError(error.message);

        const result = await new DefaultTransporter([NO_CONTENT]).request(options).catch((err) => err);
        assert(result instanceof COAServiceError);
        assert.equal(result.message, error.message);
        sandbox.verify();
    });

    it('User-Agentヘッダーが指定されていれば、初期値を追加するはず', async () => {
        const body = 'body';

        const options = {
            uri: '/uri',
            method: 'GET',
            headers: {
                'User-Agent': 'User-Agent'
            }
        };

        scope = nock(
            process.env.COA_ENDPOINT,
            {
                reqheaders: {
                    'User-Agent': `User-Agent ${DefaultTransporter.USER_AGENT}`
                }
            })
            .get(options.uri)
            .reply(OK, body);

        const result = await new DefaultTransporter([OK]).request(options);
        assert.deepEqual(result, body);
        assert(scope.isDone());
        sandbox.verify();
    });
});
