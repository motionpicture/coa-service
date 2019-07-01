/**
 * 予約サービス
 */
import { OK } from 'http-status';

import service from '../service';

/**
 * 空席状況in
 */
export interface ICountFreeSeatArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
    /**
     * 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
     */
    begin: string;
    /**
     * 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
     */
    end: string;
}
/**
 * パフォーマンス
 */
export interface ICountFreeSeatPerformance {
    /**
     * 作品コード(5桁)
     */
    titleCode: string;
    /**
     * 作品枝番(2桁)
     */
    titleBranchNum: string;
    /**
     * 上映開始時刻(4桁 'hhmm')
     */
    timeBegin: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * 予約可能数(パフォーマンスの予約可能座席数)
     */
    cntReserveMax: number;
    /**
     * 予約可能残席数(予約可能座席数から仮予約を含む予約数を引いた残席数)
     */
    cntReserveFree: number;

}
/**
 * 日程
 */
export interface ICountFreeSeatDate {
    /**
     * 上映日(日付は西暦8桁 'YYYYMMDD')
     */
    dateJouei: string;
    /**
     * パフォーマンスリスト
     */
    listPerformance: ICountFreeSeatPerformance[];
    /**
     * パフォーマンス数
     */
    cntPerformance: number;
}
/**
 * 空席状況out
 */
export interface ICountFreeSeatResult {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 日程リスト
     */
    listDate: ICountFreeSeatDate[];
}
/**
 * 空席状況
 * @param args.theaterCode 施設コード
 * @param args.begin 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
 * @param args.end 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
 */
export async function countFreeSeat(args: ICountFreeSeatArgs): Promise<ICountFreeSeatResult> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/count_free_seat/`,
            method: 'GET',
            qs: {
                begin: args.begin,
                end: args.end
            }
        },
        [OK]
    );

    return {
        theaterCode: body.theater_code,
        listDate: body.list_date.map((date: any) => {
            return {
                dateJouei: date.date_jouei,
                listPerformance: date.list_performance.map((performance: any) => {
                    return {
                        titleCode: performance.title_code,
                        titleBranchNum: performance.title_branch_num,
                        timeBegin: performance.time_begin,
                        screenCode: performance.screen_code,
                        cntReserveMax: performance.cnt_reserve_max,
                        cntReserveFree: performance.cnt_reserve_free
                    };
                }),
                cntPerformance: date.cnt_performance
            };
        })
    };
}

/**
 * 座席予約状態抽出in
 */
export interface IStateReserveSeatArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
}
/**
 * 空席リスト
 */
export interface IStateReserveSeatFreeSeat {
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 特別席区分
     * 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
     */
    spseatKbn: string;
    /**
     * 特別席加算額１
     * 特別席加算額の興行収入部分
     */
    spseatAdd1: number;
    /**
     * 特別席加算額２
     * 特別席加算額のミールクーポン部分
     */
    spseatAdd2: number;
}
/**
 * 座席リスト
 */
export interface IStateReserveSeatSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 空席リスト
     */
    listFreeSeat: IStateReserveSeatFreeSeat[];
}
/**
 * 座席予約状態抽出out
 */
export interface IStateReserveSeatResult {
    /**
     * 予約可能残席数
     */
    cntReserveFree: number;
    /**
     * 座席列数
     */
    cntSeatLine: number;
    /**
     * 座席リスト
     */
    listSeat: IStateReserveSeatSeat[];
}
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
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/state_reserve_seat/`,
            method: 'GET',
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                screen_code: args.screenCode
            }
        },
        [OK]
    );

    return {
        cntReserveFree: body.cnt_reserve_free,
        cntSeatLine: body.cnt_seat_line,
        listSeat: body.list_seat.map((seat: {
            seat_section: string;
            list_free_seat: {
                seat_num: string;
                spseat_kbn: string;
                spseat_add1: number;
                spseat_add2: number;
            }[];
        }) => {
            return {
                seatSection: seat.seat_section,
                listFreeSeat: seat.list_free_seat.map((freeSeat) => {
                    return {
                        seatNum: freeSeat.seat_num,
                        spseatKbn: freeSeat.spseat_kbn,
                        spseatAdd1: freeSeat.spseat_add1,
                        spseatAdd2: freeSeat.spseat_add2
                    };
                })
            };
        })
    };
}

/**
 * 予約座席
 */
export interface IUpdTmpReserveSeatSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
}
/**
 * 仮予約結果リスト
 */
export interface IUpdTmpReserveSeatTmpReserve {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 仮予約ステータス
     */
    stsTmpReserve: string;
}

/**
 * 座席仮予約in
 */
export interface IUpdTmpReserveSeatArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 予約座席数
     */
    // cntReserveSeat: number,
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * 予約座席リスト
     */
    listSeat: IUpdTmpReserveSeatSeat[];
}
/**
 * 座席仮予約out
 */
export interface IUpdTmpReserveSeatResult {
    /**
     * 座席チケット仮予約番号
     */
    tmpReserveNum: number;
    /**
     * 仮予約結果リスト(仮予約失敗時の座席毎の仮予約状況)
     */
    listTmpReserve: IUpdTmpReserveSeatTmpReserve[];
}
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
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/upd_tmp_reserve_seat/`,
            method: 'GET',
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                cnt_reserve_seat: args.listSeat.length,
                seat_section: args.listSeat.map((value) => value.seatSection),
                seat_num: args.listSeat.map((value) => value.seatNum),
                screen_code: args.screenCode
            }
        },
        [OK]
    );

    return {
        tmpReserveNum: body.tmp_reserve_num,
        listTmpReserve: body.list_tmp_reserve.map((tmpReserve: any) => {
            return {
                seatSection: tmpReserve.seat_section,
                seatNum: tmpReserve.seat_num
            };
        })
    };
}

/**
 * 座席仮予約削除in
 */
export interface IDelTmpReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 座席チケット仮予約番号
     */
    tmpReserveNum: number;
}

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
    await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/del_tmp_reserve/`,
            method: 'GET',
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                tmp_reserve_num: args.tmpReserveNum
            }
        },
        [OK]
    );
}

/**
 * 座席本予約in
 */
export interface IUpdReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 座席チケット仮予約番号
     */
    tmpReserveNum: number;
    /**
     * 予約者名
     */
    reserveName: string;
    /**
     * 予約者名（かな）
     */
    reserveNameJkana: string;
    /**
     * 電話番号
     */
    telNum: string;
    /**
     * メールアドレス
     */
    mailAddr: string;
    /**
     * 予約金額
     */
    reserveAmount: number;
    /**
     * 価格情報リスト
     */
    listTicket: IUpdReserveTicket[];
}
/**
 * 価格情報
 */
export interface IUpdReserveTicket {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * 標準単価
     */
    stdPrice: number;
    /**
     * 加算単価
     */
    addPrice: number;
    /**
     * 特別席加算額１
     * 特別席加算額の興行収入部分
     */
    spseatAdd1: number;
    /**
     * 特別席加算額２
     * 特別席加算額のミールクーポン部分
     */
    spseatAdd2: number;
    /**
     * 割引額
     */
    disPrice: number;
    /**
     * 金額
     * 価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）
     * ※標準単価+加算単価-割引額
     */
    salePrice: number;
    /**
     * ムビチケ計上単価
     * ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
     */
    mvtkAppPrice: number;
    /**
     * 枚数
     */
    ticketCount: number;
    /**
     * 特別席区分
     * 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
     */
    spseatKbn: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * メガネ単価
     * メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
     */
    addGlasses: number;
    /**
     * ムビチケ映写方式区分
     * ムビチケ連携情報より
     */
    kbnEisyahousiki: string;
    /**
     * ムビチケ購入管理番号
     * ムビチケ連携情報より（ムビチケ以外は""）
     */
    mvtkNum: string;
    /**
     * ムビチケ電子券区分
     * ムビチケ連携情報より(01：電子、02：紙)
     * ※ムビチケ以外は"00"をセット
     */
    mvtkKbnDenshiken: string;
    /**
     * ムビチケ前売券区分
     * ムビチケ連携情報より(01：全国券、02：劇場券)
     * ※ムビチケ以外は"00"をセット
     */
    mvtkKbnMaeuriken: string;
    /**
     * ムビチケ券種区分
     * ムビチケ連携情報より(01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ)
     * ※ムビチケ以外は"00"をセット
     */
    mvtkKbnKensyu: string;
    /**
     * ムビチケ販売単価
     * ムビチケ連携情報より（ムビチケ以外は0をセット）
     */
    mvtkSalesPrice: number;
}
/**
 * 座席本予約out
 */
export interface IUpdReserveResult {
    /**
     * 座席チケット購入番号
     */
    reserveNum: number;
    /**
     * 入場qrリスト
     */
    listQr: IUpdReserveQR[];
}

/**
 * 入場QR
 */
export interface IUpdReserveQR {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 座席入場qrコード
     */
    seatQrcode: string;

}
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
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/upd_reserve/`,
            method: 'GET',
            qs: {
                theater_code: args.theaterCode,
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                tmp_reserve_num: args.tmpReserveNum,
                reserve_name: args.reserveName,
                reserve_name_jkana: args.reserveNameJkana,
                tel_num: args.telNum,
                mail_addr: args.mailAddr,
                reserve_amount: args.reserveAmount,
                ticket_code: args.listTicket.map((value) => value.ticketCode),
                std_price: args.listTicket.map((value) => value.stdPrice),
                add_price: args.listTicket.map((value) => value.addPrice),
                spseat_add1: args.listTicket.map((value) => value.spseatAdd1),
                spseat_add2: args.listTicket.map((value) => value.spseatAdd2),
                dis_price: args.listTicket.map((value) => value.disPrice),
                sale_price: args.listTicket.map((value) => value.salePrice),
                mvtk_app_price: args.listTicket.map((value) => value.mvtkAppPrice),
                ticket_count: args.listTicket.map((value) => value.ticketCount),
                spseat_kbn: args.listTicket.map((value) => value.spseatKbn),
                seat_num: args.listTicket.map((value) => value.seatNum),
                add_glasses: args.listTicket.map((value) => value.addGlasses),
                kbn_eisyahousiki: args.listTicket.map((value) => value.kbnEisyahousiki),
                mvtk_num: args.listTicket.map((value) => value.mvtkNum),
                mvtk_kbn_denshiken: args.listTicket.map((value) => value.mvtkKbnDenshiken),
                mvtk_kbn_maeuriken: args.listTicket.map((value) => value.mvtkKbnMaeuriken),
                mvtk_kbn_kensyu: args.listTicket.map((value) => value.mvtkKbnKensyu),
                mvtk_sales_price: args.listTicket.map((value) => value.mvtkSalesPrice)
            }
        },
        [OK]
    );

    return {
        reserveNum: body.reserve_num,
        listQr: body.list_qr.map((qr: any) => {
            return {
                seatSection: qr.seat_section,
                seatNum: qr.seat_num,
                seatQrcode: qr.seat_qrcode
            };
        })
    };
}

/**
 * 購入チケット取り消しin
 */
export interface IDelReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 座席チケット購入番号
     */
    reserveNum: number;
    /**
     * 電話番号
     */
    telNum: string;
    /**
     * 座席単位削除リスト
     */
    listSeat: IDelReserveSeat[];
}
/**
 * 座席単位削除
 */
export interface IDelReserveSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
}
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
    await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/del_reserve/`,
            method: 'GET',
            qs: {
                theater_code: args.theaterCode,
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                reserve_num: args.reserveNum,
                tel_num: args.telNum,
                seat_section: args.listSeat.map((value) => value.seatSection),
                seat_num: args.listSeat.map((value) => value.seatNum)
            }
        },
        [OK]
    );
}

/**
 * 購入チケット内容抽出in
 */
export interface IStateReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 座席チケット購入番号
     */
    reserveNum: number;
    /**
     * 電話番号
     */
    telNum: string;
}
export interface IStateReserveTicket {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * 金額
     */
    ticketPrice: number;
    /**
     * 枚数
     */
    ticketCount: number;
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 座席入場qrコード
     */
    seatQrcode: string;
    /**
     * メガネ単価
     */
    addGlasses: number;
}
/**
 * 購入チケット内容抽出out
 */
export interface IStateReserveResult {
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * 価格情報リスト
     */
    listTicket: IStateReserveTicket[];
}
/**
 * 購入チケット内容抽出
 * @param args.theaterCode 施設コード
 * @param args.reserveNum 座席チケット購入番号
 * @param args.telNum 電話番号
 */
export async function stateReserve(args: IStateReserveArgs): Promise<IStateReserveResult | null> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/state_reserve/`,
            method: 'GET',
            qs: {
                theater_code: args.theaterCode,
                reserve_num: args.reserveNum,
                tel_num: args.telNum
            }
        },
        [OK]
    );

    // 該当予約がなくてもステータス0が返ってくる
    if ((<IStateReserveTicket[]>body.list_ticket).length === 0) {
        return null;
    }

    return {
        dateJouei: body.date_jouei,
        titleCode: body.title_code,
        titleBranchNum: body.title_branch_num,
        timeBegin: body.time_begin,
        screenCode: body.screen_code,
        listTicket: body.list_ticket.map((ticket: any) => {
            return {
                ticketCode: ticket.ticket_code,
                ticketName: ticket.ticket_name,
                ticketPrice: ticket.ticket_price,
                ticketCount: ticket.ticket_count,
                seatSection: ticket.seat_section,
                seatNum: ticket.seat_num,
                seatQrcode: ticket.seat_qrcode,
                addGlasses: ticket.add_glasses
            };
        })
    };
}

/**
 * 会員用フラグ
 */
export enum FlgMember {
    /**
     * 非会員
     */
    NonMember = '0',
    /**
     * 会員
     */
    Member = '1'
}

/**
 * 販売可能チケット情報in
 */
export interface ISalesTicketArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 会員用フラグ（1：会員専用チケットも表示する。会員以外の場合は0をセット）
     */
    flgMember?: FlgMember;
}
/**
 * 販売可能チケット情報out
 */
export interface ISalesTicketResult {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名（カナ）
     */
    ticketNameKana: string;
    /**
     * チケット名（英）
     */
    ticketNameEng: string;
    /**
     * 標準単価
     */
    stdPrice: number;
    /**
     * 加算単価(３Ｄ，ＩＭＡＸ、４ＤＸ等の加算料金)
     */
    addPrice: number;
    /**
     * 販売単価(標準単価＋加算単価)
     */
    salePrice: number;
    /**
     * 人数制限(制限が無い場合は１)
     */
    limitCount: number;
    /**
     * 制限単位(１：ｎ人単位、２：ｎ人以上)
     */
    limitUnit: string;
    /**
     * チケット備考(注意事項等)
     */
    ticketNote: string;
    /**
     * メガネ単価
     */
    addGlasses: number;
}

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
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/sales_ticket/`,
            method: 'GET',
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                // 念のため互換性を保つ次期アップデートでデフォルト値削除
                flg_member: (args.flgMember === undefined) ? FlgMember.NonMember : args.flgMember
            }
        },
        [OK]
    );

    return body.list_ticket.map((value: any): ISalesTicketResult => {
        return {
            ticketCode: value.ticket_code,
            ticketName: value.ticket_name,
            ticketNameKana: value.ticket_name_kana,
            ticketNameEng: value.ticket_name_eng,
            stdPrice: value.std_price,
            addPrice: value.add_price,
            salePrice: value.sale_price,
            limitCount: value.limit_count,
            limitUnit: value.limit_unit,
            ticketNote: value.ticket_note,
            addGlasses: value.add_glasses
        };
    });
}
