// tslint:disable:no-implicit-dependencies
/**
 * refreshTokenClient test
 */
import * as assert from 'assert';
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status';
import * as moment from 'moment';
import * as nock from 'nock';
import * as sinon from 'sinon';

import { COAServiceError } from '../transporters';
import RefreshTokenClient from './refreshTokenClient';

const ENDPOINT = 'https://example.com';

let scope: nock.Scope;
let sandbox: sinon.SinonSandbox;

describe('getToken()', () => {
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

    it('認可サーバーが正常であれば、認可コードとアクセストークンを交換できるはず', async () => {
        scope = nock(ENDPOINT).post('/token/access_token').once().reply(OK, { access_token: 'abc123', expired_at: 'expired_at' });

        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refresh_token'
        });

        const credentials = await auth.getToken();
        assert.equal(typeof credentials.access_token, 'string');
        assert.equal(typeof credentials.expired_at, 'string');
        assert(scope.isDone());
        sandbox.verify();
    });

    // tslint:disable-next-line:mocha-no-side-effect-code
    [BAD_REQUEST, INTERNAL_SERVER_ERROR].forEach((statusCode) => {
        it(`認可サーバーが次のステータスコードを返却されば、トークンを取得できないはず  ${statusCode}`, async () => {
            scope = nock(ENDPOINT).post('/token/access_token').reply(statusCode, {});

            const auth = new RefreshTokenClient({
                endpoint: ENDPOINT,
                refreshToken: 'refresh_token'
            });

            const result = await auth.getToken().catch((error) => error);
            assert(result instanceof Error);
            assert(scope.isDone());
            sandbox.verify();
        });

        ['body', { message: 'message' }, { status: 'status' }].forEach((body) => {
            it(`エラーレスポンスが次の形式であれば、トークンを取得できないはず  ${statusCode} ${body}`, async () => {
                scope = nock(ENDPOINT).post('/token/access_token').reply(statusCode, body);

                const auth = new RefreshTokenClient({
                    endpoint: ENDPOINT,
                    refreshToken: 'refresh_token'
                });

                const result = await auth.getToken().catch((error) => error);
                assert(result instanceof Error);
                assert(scope.isDone());
                sandbox.verify();
            });
        });
    });

    it('認可サーバーが異常であれば、トークンを取得できないはず', async () => {
        scope = nock(ENDPOINT).post('/token/access_token').once().replyWithError(new Error('error'));

        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refresh_token'
        });

        const result = await auth.getToken().catch((error) => error);
        assert(result instanceof Error);
        assert(scope.isDone());
        sandbox.verify();
    });
});

describe('setCredentials()', () => {
    it('認証情報を正しくセットできる', async () => {
        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refresh_token'
        });

        auth.setCredentials({
            access_token: 'access_token',
            expired_at: moment().add(1, 'hour').toISOString()
        });

        scope = nock(ENDPOINT).post('/token/access_token').reply(OK);

        const accessToken = await auth.getAccessToken();
        assert(!scope.isDone());
        assert.equal(accessToken, 'access_token');
    });
});

describe('refreshAccessToken()', () => {
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

    it('リフレッシュトークンが設定されていなければ、アクセストークンをリフレッシュできないはず', async () => {
        const auth = new RefreshTokenClient(<any>{
            endpoint: ENDPOINT
        });

        scope = nock(ENDPOINT).post('/token/access_token').reply(OK);

        const result = await auth.refreshAccessToken().catch((error) => error);
        assert(!scope.isDone());
        assert(result instanceof Error);
    });

    it('認可サーバーが正常であれば、アクセストークンをリフレッシュできるはず', async () => {
        scope = nock(ENDPOINT).post('/token/access_token').once().reply(OK, { access_token: 'abc123', expired_at: 'expired_at' });

        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refresh_token'
        });

        const credentials = await auth.refreshAccessToken();
        assert.equal(typeof credentials.access_token, 'string');
        assert.equal(typeof credentials.expired_at, 'string');
        assert(scope.isDone());
        sandbox.verify();
    });

    // tslint:disable-next-line:mocha-no-side-effect-code
    [BAD_REQUEST, INTERNAL_SERVER_ERROR].forEach((statusCode) => {
        it(`認可サーバーが次のステータスコードを返却されば、アクセストークンをリフレッシュできないはず  ${statusCode}`, async () => {
            scope = nock(ENDPOINT).post('/token/access_token').once().reply(statusCode, {});

            const auth = new RefreshTokenClient({
                endpoint: ENDPOINT,
                refreshToken: 'refresh_token'
            });

            const result = await auth.refreshAccessToken().catch((error) => error);
            assert(result instanceof Error);
            assert(scope.isDone());
            sandbox.verify();
        });
    });
});

describe('getAccessToken()', () => {
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

    it('リフレッシュトークンもアクセストークンもなければ、アクセストークンを取得できないはず', async () => {
        const auth = new RefreshTokenClient(<any>{
            endpoint: ENDPOINT
        });

        scope = nock(ENDPOINT).post('/token/access_token').once().reply(OK, {});

        const result = await auth.getAccessToken().catch((error) => error);
        assert(!scope.isDone());
        assert(result instanceof Error);
    });
});

describe('request()', () => {
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

    it('アクセストークンがなければリフレッシュするはず', async () => {
        const credentials = {
            access_token: 'access_token',
            expired_at: moment().add(1, 'hour').toISOString()
        };
        const requestOption = {
            baseurl: 'https://example.com',
            uri: '/'
        };

        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refreshToken'
        });

        scope = nock(ENDPOINT).post('/token/access_token').once().reply(OK, credentials);
        sandbox.mock(auth).expects('makeRequest').once().resolves({});

        await auth.request(requestOption, [OK]);
        assert.equal(auth.credentials.access_token, credentials.access_token);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('アクセストークンの期限が切れていればリフレッシュされるはず', async () => {
        const credentials = {
            access_token: 'new access_token',
            expired_at: moment().add(1, 'hour').toISOString()
        };
        const requestOption = {
            baseurl: 'https://example.com',
            uri: '/'
        };

        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refreshToken'
        });
        auth.credentials = {
            access_token: 'access_token',
            expired_at: moment().toISOString()
        };

        scope = nock(ENDPOINT).post('/token/access_token').once().reply(OK, credentials);
        sandbox.mock(auth).expects('makeRequest').once().resolves({});

        await auth.request(requestOption, [OK]);
        assert.equal(auth.credentials.access_token, credentials.access_token);
        assert(scope.isDone());
        sandbox.verify();
    });

    it('アクセストークンの期限が切れていなければリフレッシュされないはず', async () => {
        const credentials = {
            access_token: 'new access_token',
            expired_at: moment().add(1, 'hour').toISOString()
        };
        const requestOption = {
            baseurl: 'https://example.com',
            uri: '/'
        };

        const auth = new RefreshTokenClient({
            endpoint: ENDPOINT,
            refreshToken: 'refreshToken'
        });
        auth.credentials = {
            access_token: 'access_token',
            expired_at: moment().add(1, 'hour').toISOString()
        };

        scope = nock(ENDPOINT).post('/token/access_token').once().reply(OK, credentials);
        sandbox.mock(auth).expects('makeRequest').once().resolves({});

        await auth.request(requestOption, [OK]);
        assert.notEqual(auth.credentials.access_token, credentials.access_token);
        assert(!scope.isDone());
        sandbox.verify();
    });

    // tslint:disable-next-line:mocha-no-side-effect-code
    [UNAUTHORIZED, FORBIDDEN].forEach((statusCode) => {
        it(`リソースサーバーが次のステータスコードを返却されば、アクセストークンはリフレッシュされるはず  ${statusCode}`, async () => {
            const oldCredentilas = {
                access_token: 'accessToken',
                expired_at: moment().add(1, 'hour').toISOString()
            };
            const newCredentials = {
                access_token: 'newAccessToken',
                expired_at: moment().add(1, 'hour').toISOString()
            };
            const requestOption = {
                baseurl: 'https://example.com',
                uri: '/'
            };
            const requestResult = new COAServiceError(statusCode, '');

            const auth = new RefreshTokenClient({
                endpoint: ENDPOINT,
                refreshToken: 'refreshToken'
            });

            scope = nock(ENDPOINT)
                .post('/token/access_token').once().reply(OK, oldCredentilas)
                .post('/token/access_token').once().reply(OK, newCredentials);
            sandbox.mock(auth).expects('makeRequest').twice().rejects(requestResult);

            await auth.request(requestOption, [OK]).catch((err) => err);
            assert.equal(auth.credentials.access_token, newCredentials.access_token);
            assert(scope.isDone());
            sandbox.verify();
        });
    });
});
