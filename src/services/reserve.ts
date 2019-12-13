/**
 * 予約サービス
 */
import * as ReserveFactory from '../factory/reserve';

import { ReserveService } from '../service/reserve';

import RefreshTokenClient from '../auth/refreshTokenClient';

const service = new ReserveService(
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
 * 空席状況in
 */
export import ICountFreeSeatArgs = ReserveFactory.ICountFreeSeatArgs;
/**
 * パフォーマンス
 */
export import ICountFreeSeatPerformance = ReserveFactory.ICountFreeSeatPerformance;
/**
 * 日程
 */
export import ICountFreeSeatDate = ReserveFactory.ICountFreeSeatDate;
/**
 * 空席状況out
 */
export import ICountFreeSeatResult = ReserveFactory.ICountFreeSeatResult;
/**
 * 空席状況
 * @param args.theaterCode 施設コード
 * @param args.begin 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
 * @param args.end 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
 */
export async function countFreeSeat(args: ICountFreeSeatArgs): Promise<ICountFreeSeatResult> {
    return service.countFreeSeat(args);
}

/**
 * 座席予約状態抽出in
 */
export import IStateReserveSeatArgs = ReserveFactory.IStateReserveSeatArgs;
/**
 * 空席リスト
 */
export import IStateReserveSeatFreeSeat = ReserveFactory.IStateReserveSeatFreeSeat;
/**
 * 座席リスト
 */
export import IStateReserveSeatSeat = ReserveFactory.IStateReserveSeatSeat;
/**
 * 座席予約状態抽出out
 */
export import IStateReserveSeatResult = ReserveFactory.IStateReserveSeatResult;
/**
 * 座席予約状態抽出
 * @param args.theaterCode 施設コード
 * @param args.dateJouei 上映日
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.timeBegin 上映時刻
 * @param args.screenCode スクリーンコード
 */
export async function stateReserveSeat(args: IStateReserveSeatArgs): Promise<IStateReserveSeatResult> {
    return service.stateReserveSeat(args);
}

/**
 * 予約座席
 */
export import IUpdTmpReserveSeatSeat = ReserveFactory.IUpdTmpReserveSeatSeat;
/**
 * 仮予約結果リスト
 */
export import IUpdTmpReserveSeatTmpReserve = ReserveFactory.IUpdTmpReserveSeatTmpReserve;

/**
 * 座席仮予約in
 */
export import IUpdTmpReserveSeatArgs = ReserveFactory.IUpdTmpReserveSeatArgs;
/**
 * 座席仮予約out
 */
export import IUpdTmpReserveSeatResult = ReserveFactory.IUpdTmpReserveSeatResult;
/**
 * 座席仮予約
 * @param args.theaterCode 劇場コード
 * @param args.dateJouei 上映日
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.timeBegin 上映時刻
 * @param args.screenCode スクリーンコード
 * @param args.screenCode 予約座席リスト
 * @param args.screenCode.seatSection 座席セクション
 * @param args.screenCode.seatNum 座席番号
 */
export async function updTmpReserveSeat(args: IUpdTmpReserveSeatArgs): Promise<IUpdTmpReserveSeatResult> {
    return service.updTmpReserveSeat(args);
}

/**
 * 座席仮予約削除in
 */
export import IDelTmpReserveArgs = ReserveFactory.IDelTmpReserveArgs;

/**
 * 座席仮予約削除
 * @param args.theaterCode 施設コード
 * @param args.dateJouei 上映日
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.timeBegin 上映時刻
 * @param args.tmpReserveNum 座席チケット仮予約番号
 */
export async function delTmpReserve(args: IDelTmpReserveArgs): Promise<void> {
    return service.delTmpReserve(args);
}

/**
 * 座席本予約in
 */
export import IUpdReserveArgs = ReserveFactory.IUpdReserveArgs;
/**
 * 価格情報
 */
export import IUpdReserveTicket = ReserveFactory.IUpdReserveTicket;
/**
 * 座席本予約out
 */
export import IUpdReserveResult = ReserveFactory.IUpdReserveResult;

/**
 * 入場QR
 */
export import IUpdReserveQR = ReserveFactory.IUpdReserveQR;
/**
 * 座席本予約
 * @param args.theaterCode 施設コード
 * @param args.dateJouei 上映日
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.timeBegin 上映時刻
 * @param args.screenCode 座席チケット仮予約番号
 * @param args.tmpReserveNum スクリーンコード
 * @param args.reserveName 予約者名
 * @param args.reserveNameJkana 予約者名（かな）※予約者名（かな）：（かな姓）+空白+（かな名）
 * @param args.telNum 電話番号
 * @param args.mailAddr メールアドレス
 * @param args.reserveAmount 予約金額
 * @param args.listTicket 価格情報リスト
 * @param args.listTicket.ticketCode チケットコード
 * @param args.listTicket.stdPrice 標準単価
 * @param args.listTicket.addPrice 加算単価
 * @param args.listTicket.spseatAdd1 特別席加算額１ 特別席加算額の興行収入部分
 * @param args.listTicket.spseatAdd2 特別席加算額２ 特別席加算額のミールクーポン部分
 * @param args.listTicket.disPrice 割引額
 * @param args.listTicket.salePrice 金額 ※価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）※標準単価+加算単価-割引額
 * @param args.listTicket.mvtkAppPrice ムビチケ計上単価 ※ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
 * @param args.listTicket.ticketCount 枚数
 * @param args.listTicket.spseatKbn 特別席区分 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
 * @param args.listTicket.seatNum 座席番号
 * @param args.listTicket.addGlasses メガネ単価 ※メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
 * @param args.listTicket.kbnEisyahousiki ムビチケ連携情報より
 * @param args.listTicket.mvtkNum ムビチケ連携情報より（ムビチケ以外は""）
 * @param args.listTicket.mvtkKbnDenshiken ムビチケ連携情報より（01：電子、02：紙 ※ムビチケ以外は"00"をセット）
 * @param args.listTicket.mvtkKbnMaeuriken ムビチケ連携情報より（01：全国券、02：劇場券 ※ムビチケ以外は"00"をセット）
 * @param args.listTicket.mvtkKbnKensyu ムビチケ連携情報より（01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ ※ムビチケ以外は"00"をセット）
 * @param args.listTicket.mvtkSalesPrice ムビチケ連携情報より（ムビチケ以外は0をセット）
 */
export async function updReserve(args: IUpdReserveArgs): Promise<IUpdReserveResult> {
    return service.updReserve(args);
}

/**
 * 購入チケット取り消しin
 */
export import IDelReserveArgs = ReserveFactory.IDelReserveArgs;
/**
 * 座席単位削除
 */
export import IDelReserveSeat = ReserveFactory.IDelReserveSeat;
/**
 * 購入チケット取り消し
 * @param args.theaterCode 施設コード
 * @param args.dateJouei 上映日
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.timeBegin 上映時刻
 * @param args.reserveNum 座席チケット購入番号
 * @param args.telNum 電話番号
 * @param args.screenCode 座席単位削除リスト
 * @param args.screenCode 座席単位削除リスト
 * @param args.screenCode.seatSection 座席セクション
 * @param args.screenCode.seatNum 座席番号
 */
export async function delReserve(args: IDelReserveArgs): Promise<void> {
    return service.delReserve(args);
}

/**
 * 購入チケット内容抽出in
 */
export import IStateReserveArgs = ReserveFactory.IStateReserveArgs;
export import IStateReserveTicket = ReserveFactory.IStateReserveTicket;
/**
 * 購入チケット内容抽出out
 */
export import IStateReserveResult = ReserveFactory.IStateReserveResult;
/**
 * 購入チケット内容抽出
 * @param args.theaterCode 施設コード
 * @param args.reserveNum 座席チケット購入番号
 * @param args.telNum 電話番号
 */
export async function stateReserve(args: IStateReserveArgs): Promise<IStateReserveResult | null> {
    return service.stateReserve(args);
}

/**
 * 会員用フラグ
 */
export import FlgMember = ReserveFactory.FlgMember;

/**
 * 販売可能チケット情報in
 */
export import ISalesTicketArgs = ReserveFactory.ISalesTicketArgs;
/**
 * 販売可能チケット情報out
 */
export import ISalesTicketResult = ReserveFactory.ISalesTicketResult;

/**
 * 販売可能チケット情報
 * @param args.theaterCode 施設コード
 * @param args.dateJouei 上映日
 * @param args.titleCode 作品コード
 * @param args.titleBranchNum 作品枝番
 * @param args.timeBegin 上映時刻
 * @param args.flgMember 会員用フラグ
 */
export async function salesTicket(args: ISalesTicketArgs): Promise<ISalesTicketResult[]> {
    return service.salesTicket(args);
}
