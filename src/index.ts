/**
 * coa-service
 */
// if (typeof process.env.COA_ENDPOINT !== 'string' || (<string>process.env.COA_ENDPOINT).length === 0) {
//     throw new Error('NPM warnings. The environment variable "COA_ENDPOINT" is required for using @motionpicture/coa-service.');
// }

// if (typeof process.env.COA_REFRESH_TOKEN !== 'string' || (<string>process.env.COA_REFRESH_TOKEN).length === 0) {
//     throw new Error('NPM warnings. The environment variable "COA_REFRESH_TOKEN" is required for using @motionpicture/coa-service.');
// }

import * as factory from './factory';

import { MasterService } from './service/master';
import { ReserveService } from './service/reserve';

import * as masterService from './services/master';
import * as reserveService from './services/reserve';

import RefreshTokenClient from './auth/refreshTokenClient';

export import factory = factory;

export namespace auth {
    /**
     * リフレッシュトークン認証クライアント
     */
    export class RefreshToken extends RefreshTokenClient { }
}

/**
 * サービスモジュール群
 * @deprecated since version 8.0.0. Use service.
 */
export namespace services {
    /**
     * マスターサービス
     * @deprecated since version 8.0.0. Use new service.Master()
     */
    export import master = masterService;
    /**
     * 予約サービス
     * @deprecated since version 8.0.0. Use new service.Reserve()
     */
    export import reserve = reserveService;
}

/**
 * recommended
 */
export namespace service {
    /**
     * マスターサービス
     */
    export class Master extends MasterService { }
    /**
     * 予約サービス
     */
    export class Reserve extends ReserveService { }
}
