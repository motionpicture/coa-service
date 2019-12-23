/**
 * coa-service
 */
import * as factory from './factory';

import { MasterService } from './service/master';
import { ReserveService } from './service/reserve';

import RefreshTokenClient from './auth/refreshTokenClient';

export import factory = factory;

export namespace auth {
    /**
     * リフレッシュトークン認証クライアント
     */
    export class RefreshToken extends RefreshTokenClient { }
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
