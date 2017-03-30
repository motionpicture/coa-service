/**
 * ユーティリティテスト
 *
 * @ignore
 */
import * as assert from 'assert';
import * as Util from '../../lib/utils/util';

describe('アクセストークン発行', () => {
    it('再発行しないはず', async () => {
        const accessToken = await Util.publishAccessToken();
        const accessToken2 = await Util.publishAccessToken();
        assert.equal(accessToken, accessToken2);
    });

    it('期限切れで再発行するはず', (done) => {
        Util.publishAccessToken().then(async (accessToken) => {
            setTimeout(
                async () => {
                    try {
                        // アクセストークンまでの猶予時間を十分に小さく設定する
                        const accessToken2 = await Util.publishAccessToken(-3600000); // tslint:disable-line:no-magic-numbers
                        assert.notEqual(accessToken, accessToken2);
                        done();
                    } catch (error) {
                        done(error);
                    }
                },
                2000 // tslint:disable-line:no-magic-numbers
            );
        });
    });

    it('リセット後に再発行するはず', (done) => {
        Util.publishAccessToken().then(async (accessToken) => {
            Util.resetAccessToken();

            setTimeout(
                async () => {
                    try {
                        const accessToken2 = await Util.publishAccessToken();
                        assert.notEqual(accessToken, accessToken2);
                        done();
                    } catch (error) {
                        done(error);
                    }
                },
                2000 // tslint:disable-line:no-magic-numbers
            );
        });
    });
});

describe('レスポンスボディチェック', () => {
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

        try {
            await Util.throwIfNot200(body);
        } catch (error) {
            assert(error instanceof Error);
            assert.equal((<Error>error).message, body);
            return;
        }

        throw new Error('why does not throw?');
    });

    it('ボディが認証エラーの場合、認証情報がリセットされる', (done) => {
        const body = Util.RESPONSE_BODY_BAD_CREDENTIALS;

        Util.publishAccessToken().then(async (accessToken) => {
            try {
                await Util.throwIfNot200(body);
                done(new Error('why does not throw?'));
            } catch (error) {
                assert(error instanceof Error);
                assert.equal((<Error>error).message, body);

                // 異なるアクセストークンが発行されるはず
                setTimeout(
                    async () => {
                        try {
                            const accessToken2 = await Util.publishAccessToken();
                            assert.notEqual(accessToken, accessToken2);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    },
                    2000 // tslint:disable-line:no-magic-numbers
                );
            }
        });
    });
});
