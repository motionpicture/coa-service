/**
 * マスターサービス
 */
import * as MasterFactory from '../factory/master';

import { MasterService } from '../service/master';

import RefreshTokenClient from '../auth/refreshTokenClient';

const service = new MasterService(
    {
        endpoint: process.env.COA_ENDPOINT,
        auth: new RefreshTokenClient({
            endpoint: process.env.COA_ENDPOINT,
            refreshToken: process.env.COA_REFRESH_TOKEN
        })
    },
    {
        timeout: 60000
    }
);

/**
 * 施設マスター抽出in
 */
export import ITheaterArgs = MasterFactory.ITheaterArgs;
/**
 * 施設マスター抽出out
 */
export import ITheaterResult = MasterFactory.ITheaterResult;
/**
 * 施設マスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function theater(args: ITheaterArgs): Promise<ITheaterResult> {
    return service.theater(args);
}

/**
 * 作品マスター抽出in
 */
export import ITitleArgs = MasterFactory.ITitleArgs;
/**
 * 作品マスター抽出out
 */
export import ITitleResult = MasterFactory.ITitleResult;
/**
 * 作品マスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function title(args: ITitleArgs): Promise<ITitleResult[]> {
    return service.title(args);
}

/**
 * スクリーンマスター抽出in
 */
export import IScreenArgs = MasterFactory.IScreenArgs;
/**
 * 座席
 */
export import IScreenSeat = MasterFactory.IScreenSeat;
/**
 * スクリーンマスター抽出out
 */
export import IScreenResult = MasterFactory.IScreenResult;
/**
 * スクリーンマスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function screen(args: IScreenArgs): Promise<IScreenResult[]> {
    return service.screen(args);
}

/**
 * スケジュールマスター抽出in
 */
export import IScheduleArgs = MasterFactory.IScheduleArgs;

/**
 * 先行予約フラグ
 */
export import FlgEarlyBooking = MasterFactory.FlgEarlyBooking;

/**
 * スケジュールマスター抽出out
 */
export import IScheduleResult = MasterFactory.IScheduleResult;
/**
 * スケジュールマスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function schedule(
    args: IScheduleArgs
): Promise<IScheduleResult[]> {
    return service.schedule(args);
}

export import IXMLScheduleArgs = MasterFactory.IXMLScheduleArgs;

export import XMLErrorCode = MasterFactory.XMLErrorCode;

export import XMLAvailableCode = MasterFactory.XMLAvailableCode;

export import XMLLateCode = MasterFactory.XMLLateCode;

export import IXMLScheduleOriginal = MasterFactory.IXMLScheduleOriginal;

export import IXMLMovieOriginal = MasterFactory.IXMLMovieOriginal;

export import IXMLScreenOriginal = MasterFactory.IXMLScreenOriginal;

export import IXMLTimeOriginal = MasterFactory.IXMLTimeOriginal;

export import IXMLScheduleResult = MasterFactory.IXMLScheduleResult;

export import IXMLMovie = MasterFactory.IXMLMovie;

export import IXMLScreen = MasterFactory.IXMLScreen;

export import IXMLTime = MasterFactory.IXMLTime;

/**
 * スケジュールマスター抽出(XMLからスケジュールデータを取得)
 * @param args.endpoint XMLのエンドポイント
 * @param args.theaterCodeName 劇場のコード名
 */
export async function xmlSchedule(args: IXMLScheduleArgs): Promise<IXMLScheduleResult[][]> {
    return service.xmlSchedule(args);
}

/**
 * 会員用フラグ
 */
export import FlgMember = MasterFactory.FlgMember;

/**
 * 券種マスター抽出in
 */
export import ITicketArgs = MasterFactory.ITicketArgs;
/**
 * 券種マスター抽出out
 */
export import ITicketResult = MasterFactory.ITicketResult;
/**
 * 券種マスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function ticket(args: ITicketArgs): Promise<ITicketResult[]> {
    return service.ticket(args);
}

/**
 * 各種区分マスター抽出in
 */
export import IKubunNameArgs = MasterFactory.IKubunNameArgs;
/**
 * 各種区分マスター抽出out
 */
export import IKubunNameResult = MasterFactory.IKubunNameResult;
/**
 * 各種区分マスター抽出
 * @memberOf services.master
 * @param args.theaterCode 劇場コード
 * @param args.kubunClass 区分種別
 */
export async function kubunName(args: IKubunNameArgs): Promise<IKubunNameResult[]> {
    return service.kubunName(args);
}

/**
 * ムビチケチケットコード取得in
 */
export import IMvtkTicketcodeArgs = MasterFactory.IMvtkTicketcodeArgs;

/**
 * ムビチケチケットコード取得out
 */
export import IMvtkTicketcodeResult = MasterFactory.IMvtkTicketcodeResult;
/**
 * ムビチケチケットコード取得
 * @param args.theaterCode 劇場コード
 * @param args.kbnDenshiken 電子券区分
 * @param args.kbnMaeuriken 前売券区分
 * @param args.kbnKensyu 券種区分
 * @param args.salesPrice 販売単価
 * @param args.appPrice 計上単価
 * @param args.kbnEisyahousiki 映写方式区分
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.dateJouei 上映日
 */
export async function mvtkTicketcode(args: IMvtkTicketcodeArgs): Promise<IMvtkTicketcodeResult> {
    return service.mvtkTicketcode(args);
}
