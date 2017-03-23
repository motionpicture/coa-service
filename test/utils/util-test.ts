/**
 * ユーティリティテスト
 *
 * @ignore
 */
import * as assert from 'assert';
import * as COA from '../../lib/index';

describe('アクセストークン発行', () => {
    it('再発行しないはず', async () => {
        const accessToken = await COA.Util.publishAccessToken();
        const accessToken2 = await COA.Util.publishAccessToken();
        assert.equal(accessToken, accessToken2);
    });

    it('期限切れで再発行するはず', async () => {
        const accessToken = await COA.Util.publishAccessToken();
        // アクセストークンまでの猶予時間を十分に小さく設定する
        const accessToken2 = await COA.Util.publishAccessToken(-3600000);
        assert(accessToken !== accessToken2);
    });

    it('リセット後に再発行するはず', async () => {
        const accessToken = await COA.Util.publishAccessToken();
        COA.Util.resetAccessToken();
        const accessToken2 = await COA.Util.publishAccessToken();
        assert(accessToken !== accessToken2);
    });
});
