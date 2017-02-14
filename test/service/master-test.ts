// tslint:disable-next-line:missing-jsdoc
import * as assert from 'assert';
import * as COA from '../../index';

// tslint:disable-next-line:no-http-string
process.env.COA_ENDPOINT = 'http://coacinema.aa0.netvolante.jp';
// tslint:disable-next-line:max-line-length
process.env.COA_REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNDc5MjYwODQ4LCJhdXRoX2lkIjoiMzMxNSJ9.jx-w7D3YLP7UbY4mzJYC9xr368FiKWcpR2_L9mZfehQ';

describe('マスター抽出サービス', () => {
    it('存在しない劇場抽出', (done) => {
        COA.findTheaterInterface.call({
            theater_code: '000'
        }).then(() => {
            done(new Error('劇場は存在しないはず'));
        }).catch(() => {
            done();
        });
    });

    it('存在する劇場抽出', (done) => {
        const theaterCode = '118';
        COA.findTheaterInterface.call({
            theater_code: theaterCode
        }).then((result) => {
            assert.equal(result.theater_code, theaterCode);

            done();
        }).catch((err) => {
            done(err);
        });
    });
});
