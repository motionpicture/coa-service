/**
 * マスターサービス
 */
import { OK } from 'http-status';

import service from '../service';

/**
 * 施設マスター抽出in
 */
export interface ITheaterArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
}
/**
 * 施設マスター抽出out
 */
export interface ITheaterResult {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 施設名称
     */
    theaterName: string;
    /**
     * 施設名称（カナ）
     */
    theaterNameEng: string;
    /**
     * 施設名称（英）
     */
    theaterNameKana: string;
    /**
     * 電話番号
     */
    theaterTelNum: string;
}
/**
 * 施設マスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function theater(args: ITheaterArgs): Promise<ITheaterResult> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/theater/`,
            method: 'GET'
        },
        [OK]
    );

    return {
        theaterCode: body.theater_code,
        theaterName: body.theater_name,
        theaterNameEng: body.theater_name_eng,
        theaterNameKana: body.theater_name_kana,
        theaterTelNum: body.theater_tel_num
    };
}

/**
 * 作品マスター抽出in
 */
export interface ITitleArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
}
/**
 * 作品マスター抽出out
 */
export interface ITitleResult {
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 作品タイトル名
     */
    titleName: string;
    /**
     * 作品タイトル名（カナ）
     */
    titleNameKana: string;
    /**
     * 作品タイトル名（英）
     */
    titleNameEng: string;
    /**
     * 作品タイトル名省略
     */
    titleNameShort: string;
    /**
     * 原題
     */
    titleNameOrig: string;
    /**
     * 映倫区分
     */
    kbnEirin: string;
    /**
     * 映像区分
     */
    kbnEizou: string;
    /**
     * 上映方式区分
     */
    kbnJoueihousiki: string;
    /**
     * 字幕吹替区分
     */
    kbnJimakufukikae: string;
    /**
     * 上映時間
     */
    showTime: number;
    /**
     * 公演開始予定日
     */
    dateBegin: string;
    /**
     * 公演終了予定日
     */
    dateEnd: string;
    /**
     * ムビチケ使用フラグ
     */
    flgMvtkUse: string;
    /**
     * ムビチケ利用開始日
     */
    dateMvtkBegin: string;
}
/**
 * 作品マスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function title(args: ITitleArgs): Promise<ITitleResult[]> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/title/`,
            method: 'GET'
        },
        [OK]
    );

    return body.list_title.map((value: any): ITitleResult => {
        return {
            titleCode: value.title_code,
            titleBranchNum: value.title_branch_num,
            titleName: value.title_name,
            titleNameKana: value.title_name_kana,
            titleNameEng: value.title_name_eng,
            titleNameShort: value.title_name_short,
            titleNameOrig: value.title_name_orig,
            kbnEirin: value.kbn_eirin,
            kbnEizou: value.kbn_eizou,
            kbnJoueihousiki: value.kbn_joueihousiki,
            kbnJimakufukikae: value.kbn_jimakufukikae,
            showTime: value.show_time,
            dateBegin: value.date_begin,
            dateEnd: value.date_end,
            flgMvtkUse: value.flg_mvtk_use,
            dateMvtkBegin: value.date_mvtk_begin
        };
    });
}

/**
 * スクリーンマスター抽出in
 */
export interface IScreenArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
}
/**
 * 座席
 */
export interface IScreenSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 特別席フラグ
     */
    flgSpecial: string;
    /**
     * 車椅子席フラグ
     */
    flgHc: string;
    /**
     * ペア席フラグ
     */
    flgPair: string;
    /**
     * 自由席フラグ
     */
    flgFree: string;
    /**
     * 予備席フラグ
     */
    flgSpare: string;
}
/**
 * スクリーンマスター抽出out
 */
export interface IScreenResult {
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * スクリーン名
     */
    screenName: string;
    /**
     * スクリーン名（英）
     */
    screenNameEng: string;
    /**
     * 座席リスト
     */
    listSeat: IScreenSeat[];
}
/**
 * スクリーンマスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function screen(args: IScreenArgs): Promise<IScreenResult[]> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/screen/`,
            method: 'GET'
        },
        [OK]
    );

    return body.list_screen.map((value: any): IScreenResult => {
        return {
            screenCode: value.screen_code,
            screenName: value.screen_name,
            screenNameEng: value.screen_name_eng,
            listSeat: value.list_seat.map((seat: any): IScreenSeat => {
                return {
                    seatSection: seat.seat_section,
                    seatNum: seat.seat_num,
                    flgSpecial: seat.flg_special,
                    flgHc: seat.flg_hc,
                    flgPair: seat.flg_pair,
                    flgFree: seat.flg_free,
                    flgSpare: seat.flg_spare
                };
            })
        };
    });
}

/**
 * スケジュールマスター抽出in
 */
export interface IScheduleArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
    /**
     * スケジュールを抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
     */
    begin: string;
    /**
     * スケジュールを抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
     */
    end: string;
}

/**
 * 先行予約フラグ
 */
export enum FlgEarlyBooking {
    /**
     * 先行予約でない
     */
    NotPreOrder = '0',
    /**
     * 先行予約
     */
    EarlyBooking = '1'
}

/**
 * スケジュールマスター抽出out
 */
export interface IScheduleResult {
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
     * 上映開始時刻
     */
    timeBegin: string;
    /**
     * 上映終了時刻
     */
    timeEnd: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * トレーラー時間
     */
    trailerTime: number;
    /**
     * サービス区分
     */
    kbnService: string;
    /**
     * 音響区分
     */
    kbnAcoustic: string;
    /**
     * サービスデイ名称
     */
    nameServiceDay: string;
    /**
     * 購入可能枚数
     */
    availableNum: number;
    /**
     * 予約開始日
     * 予約可能になる日付(yyyymmdd)
     */
    rsvStartDate: string;
    /**
     * 予約終了日
     * 予約終了になる日付(yyyymmdd)
     * 通常は上映日、先行販売の場合は販売終了日
     */
    rsvEndDate: string;
    /**
     * 先行予約フラグ
     * 先行予約の場合は'1'、それ以外は'0'
     */
    flgEarlyBooking: FlgEarlyBooking;
}
/**
 * スケジュールマスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function schedule(
    args: IScheduleArgs
): Promise<IScheduleResult[]> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/schedule/`,
            method: 'GET',
            qs: {
                begin: args.begin,
                end: args.end
            }
        },
        [OK]
    );

    return body.list_schedule.map((value: any): IScheduleResult => {
        return {
            dateJouei: value.date_jouei,
            titleCode: value.title_code,
            titleBranchNum: value.title_branch_num,
            timeBegin: value.time_begin,
            timeEnd: value.time_end,
            screenCode: value.screen_code,
            trailerTime: value.trailer_time,
            kbnService: value.kbn_service,
            kbnAcoustic: value.kbn_acoustic,
            nameServiceDay: value.name_service_day,
            availableNum: value.available_num,
            rsvStartDate: value.rsv_start_date,
            rsvEndDate: value.rsv_end_date,
            flgEarlyBooking: value.flg_early_booking
        };
    });
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
 * 券種マスター抽出in
 */
export interface ITicketArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
}
/**
 * 券種マスター抽出out
 */
export interface ITicketResult {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名(カナ)
     */
    ticketNameKana: string;
    /**
     * チケット名(英)
     */
    ticketNameEng: string;
    /**
     * ポイント購入の場合の消費ポイント
     */
    usePoint: number;
    /**
     * 会員用フラグ
     */
    flgMember?: FlgMember;
}
/**
 * 券種マスター抽出
 * @param args.theaterCode 劇場コード
 */
export async function ticket(args: ITicketArgs): Promise<ITicketResult[]> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/ticket/`,
            method: 'GET'
        },
        [OK]
    );

    return body.list_ticket.map((value: any): ITicketResult => {
        return {
            ticketCode: value.ticket_code,
            ticketName: value.ticket_name,
            ticketNameKana: value.ticket_name_kana,
            ticketNameEng: value.ticket_name_eng,
            // tslint:disable-next-line:no-single-line-block-comment
            usePoint: (value.use_point !== undefined) ? value.use_point : /* istanbul ignore next */0,
            // tslint:disable-next-line:no-single-line-block-comment
            flgMember: (value.flg_member !== undefined) ? value.flg_member : /* istanbul ignore next */FlgMember.NonMember
        };
    });
}

/**
 * 各種区分マスター抽出in
 */
export interface IKubunNameArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
    /**
     * 区分種別
     */
    kubunClass: string;
}
/**
 * 各種区分マスター抽出out
 */
export interface IKubunNameResult {
    /**
     * 区分コード
     */
    kubunCode: string;
    /**
     * 区分名
     */
    kubunName: string;
    /**
     * 区分名（英）
     */
    kubunNameEng: string;
    /**
     * 加算料金（上映方式、音響等の１枚当たりの追加料金）
     */
    kubunAddPrice: number;
}
/**
 * 各種区分マスター抽出
 * @memberOf services.master
 * @param args.theaterCode 劇場コード
 * @param args.kubunClass 区分種別
 */
export async function kubunName(args: IKubunNameArgs): Promise<IKubunNameResult[]> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/kubun_name/`,
            method: 'GET',
            qs: {
                kubun_class: args.kubunClass
            }
        },
        [OK]
    );

    return body.list_kubun.map((value: any): IKubunNameResult => {
        return {
            kubunCode: value.kubun_code,
            kubunName: value.kubun_name,
            kubunNameEng: value.kubunName_eng,
            kubunAddPrice: value.kubun_add_price
        };
    });
}

/**
 * ムビチケチケットコード取得in
 */
export interface IMvtkTicketcodeArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 電子券区分
     */
    kbnDenshiken: string;
    /**
     * 前売券区分
     */
    kbnMaeuriken: string;
    /**
     * 券種区分
     */
    kbnKensyu: string;
    /**
     * 販売単価
     */
    salesPrice: number;
    /**
     * 計上単価
     */
    appPrice: number;
    /**
     * 映写方式区分
     */
    kbnEisyahousiki: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
}

/**
 * ムビチケチケットコード取得out
 */
export interface IMvtkTicketcodeResult {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名(カナ)
     */
    ticketNameKana: string;
    /**
     * チケット名(英)
     */
    ticketNameEng: string;
    /**
     * 加算単価 ※３Ｄ、ＩＭＡＸ、４ＤＸ等の加算料金（メガネ抜き）
     */
    addPrice: number;
    /**
     * メガネ単価 ※３Ｄメガネの加算料金
     */
    addPriceGlasses: number;
}
/**
 * ムビチケチケットコード取得
 * @param args.theater_code 劇場コード
 * @param args.kbn_denshiken 電子券区分
 * @param args.kbn_maeuriken 前売券区分
 * @param args.kbn_kensyu 券種区分
 * @param args.sales_price 販売単価
 * @param args.app_price 計上単価
 * @param args.kbn_eisyahousiki 映写方式区分
 * @param args.title_code 作品コード
 * @param args.title_branch_num 作品枝番
 */
export async function mvtkTicketcode(args: IMvtkTicketcodeArgs): Promise<IMvtkTicketcodeResult> {
    const body = await service.request(
        {
            uri: `/api/v1/theater/${args.theaterCode}/mvtk_ticketcode/`,
            method: 'GET',
            qs: {
                theater_code: args.theaterCode,
                kbn_denshiken: args.kbnDenshiken,
                kbn_maeuriken: args.kbnMaeuriken,
                kbn_kensyu: args.kbnKensyu,
                sales_price: args.salesPrice,
                app_price: args.appPrice,
                kbn_eisyahousiki: args.kbnEisyahousiki,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum
            }
        },
        [OK]
    );

    return {
        ticketCode: body.ticket_code,
        ticketName: body.ticket_name,
        ticketNameKana: body.ticket_name_kana,
        ticketNameEng: body.ticket_name_eng,
        addPrice: body.add_price,
        addPriceGlasses: body.add_price_glasses
    };
}
