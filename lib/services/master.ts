/**
 * マスターサービス
 * @namespace services.master
 */
import * as request from 'request-promise-native';
import * as Util from '../utils/util';

/**
 * 施設マスター抽出in
 * @interface TheaterArgs
 */
export interface ITheaterArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
}
/**
 * 施設マスター抽出out
 * @interface TheaterResult
 */
export interface ITheaterResult {
    /**
     * 施設コード
     */
    theater_code: string;
    /**
     * 施設名称
     */
    theater_name: string;
    /**
     * 施設名称（カナ）
     */
    theater_name_eng: string;
    /**
     * 施設名称（英）
     */
    theater_name_kana: string;
    /**
     * 電話番号
     */
    theater_tel_num: string;
}
/**
 * 施設マスター抽出
 * @memberOf services.master
 * @function theater
 * @param {TheaterArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<TheaterResult>}
 */
export async function theater(args: ITheaterArgs): Promise<ITheaterResult> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/theater/`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true
    }).then(Util.throwIfNot200);

    return {
        theater_code: body.theater_code,
        theater_name: body.theater_name,
        theater_name_eng: body.theater_name_eng,
        theater_name_kana: body.theater_name_kana,
        theater_tel_num: body.theater_tel_num
    };
}

/**
 * 作品マスター抽出in
 * @interface TitleArgs
 */
export interface ITitleArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
}
/**
 * 作品マスター抽出out
 * @interface TitleResult
 */
export interface ITitleResult {
    /**
     * 作品コード
     */
    title_code: string;
    /**
     * 作品枝番
     */
    title_branch_num: string;
    /**
     * 作品タイトル名
     */
    title_name: string;
    /**
     * 作品タイトル名（カナ）
     */
    title_name_kana: string;
    /**
     * 作品タイトル名（英）
     */
    title_name_eng: string;
    /**
     * 作品タイトル名省略
     */
    title_name_short: string;
    /**
     * 原題
     */
    title_name_orig: string;
    /**
     * 映倫区分
     */
    kbn_eirin: string;
    /**
     * 映像区分
     */
    kbn_eizou: string;
    /**
     * 上映方式区分
     */
    kbn_joueihousiki: string;
    /**
     * 字幕吹替区分
     */
    kbn_jimakufukikae: string;
    /**
     * 上映時間
     */
    show_time: number;
    /**
     * 公演開始予定日
     */
    date_begin: string;
    /**
     * 公演終了予定日
     */
    date_end: string;
    /**
     * ムビチケ使用フラグ
     */
    flg_mvtk_use: string;
    /**
     * ムビチケ利用開始日
     */
    date_mvtk_begin: string;
}
/**
 * 作品マスター抽出
 * @memberOf services.master
 * @function title
 * @param {TitleArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<TitleResult[]>}
 */
export async function title(args: ITitleArgs): Promise<ITitleResult[]> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/title/`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true
    }).then(Util.throwIfNot200);

    return body.list_title;
}

/**
 * スクリーンマスター抽出in
 * @interface ScreenArgs
 */
export interface IScreenArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
}
/**
 * 座席
 * @interface ScreenSeat
 */
export interface IScreenSeat {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 座席番号
     */
    seat_num: string;
    /**
     * 特別席フラグ
     */
    flg_special: string;
    /**
     * 車椅子席フラグ
     */
    flg_hc: string;
    /**
     * ペア席フラグ
     */
    flg_pair: string;
    /**
     * 自由席フラグ
     */
    flg_free: string;
    /**
     * 予備席フラグ
     */
    flg_spare: string;
}
/**
 * スクリーンマスター抽出out
 * @interface ScreenResult
 */
export interface IScreenResult {
    /**
     * スクリーンコード
     */
    screen_code: string;
    /**
     * スクリーン名
     */
    screen_name: string;
    /**
     * スクリーン名（英）
     */
    screen_name_eng: string;
    /**
     * 座席リスト
     */
    list_seat: IScreenSeat[];
}
/**
 * スクリーンマスター抽出
 * @memberOf services.master
 * @function screen
 * @param {ScreenArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<ScreenResult[]>}
 */
export async function screen(args: IScreenArgs): Promise<IScreenResult[]> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/screen/`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true
    }).then(Util.throwIfNot200);

    return body.list_screen;
}

/**
 * スケジュールマスター抽出in
 * @interface ScheduleArgs
 */
export interface IScheduleArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
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
 * スケジュールマスター抽出out
 * @interface ScheduleResult
 */
export interface IScheduleResult {
    /**
     * 上映日
     */
    date_jouei: string;
    /**
     * 作品コード
     */
    title_code: string;
    /**
     * 作品枝番
     */
    title_branch_num: string;
    /**
     * 上映開始時刻
     */
    time_begin: string;
    /**
     * 上映終了時刻
     */
    time_end: string;
    /**
     * スクリーンコード
     */
    screen_code: string;
    /**
     * トレーラー時間
     */
    trailer_time: number;
    /**
     * サービス区分
     */
    kbn_service: string;
    /**
     * 音響区分
     */
    kbn_acoustic: string;
    /**
     * サービスデイ名称
     */
    name_service_day: string;
    /**
     * 購入可能枚数
     */
    available_num: number;
    /**
     * 予約開始日
     * 予約可能になる日付(YYYYMMDD)
     */
    rsv_start_date: string;
    /**
     * 予約終了日
     * 予約終了になる日付(YYYYMMDD)　通常は上映日、先行販売の場合は販売終了日
     */
    rsv_end_date: string;
    /**
     * 先行予約フラグ
     * 先行予約の場合は'1'、それ以外は'0'
     */
    flg_early_booking: string;
}
/**
 * スケジュールマスター抽出
 * @memberOf services.master
 * @function schedule
 * @param {ScheduleArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<ScheduleResult[]>}
 */
export async function schedule(
    args: IScheduleArgs
): Promise<IScheduleResult[]> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/schedule/`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            begin: args.begin,
            end: args.end
        }
    }).then(Util.throwIfNot200);

    return body.list_schedule;
}

/**
 * 券種マスター抽出in
 * @interface TicketArgs
 */
export interface ITicketArgs {
    /**
     * 施設コード
     */
    theater_code: string;
}
/**
 * 券種マスター抽出out
 * @interface TicketResult
 */
export interface ITicketResult {
    /**
     * チケットコード
     */
    ticket_code: string;
    /**
     * チケット名
     */
    ticket_name: string;
    /**
     * チケット名(カナ)
     */
    ticket_name_kana: string;
    /**
     * チケット名(英)
     */
    ticket_name_eng: string;
}
/**
 * 券種マスター抽出
 * @memberOf services.master
 * @function ticket
 * @param {ITicketArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<TicketResult[]>}
 */
export async function ticket(args: ITicketArgs): Promise<ITicketResult[]> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/ticket/`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return body.list_ticket;
}

/**
 * 各種区分マスター抽出in
 * @interface IKubunNameArgs
 */
export interface IKubunNameArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
    /**
     * 区分種別
     */
    kubun_class: string;
}
/**
 * 各種区分マスター抽出out
 * @interface IKubunNameResult
 */
export interface IKubunNameResult {
    /**
     * 区分コード
     */
    kubun_code: string;
    /**
     * 区分名
     */
    kubun_name: string;
    /**
     * 区分名（英）
     */
    kubun_name_eng: string;
    /**
     * 加算料金（上映方式、音響等の１枚当たりの追加料金）
     */
    kubun_add_price: number;
}
/**
 * 各種区分マスター抽出
 * @memberOf services.master
 * @function kubunName
 * @param {IKubunNameArgs} args
 * @param {string} args.theater_code 劇場コード
 * @param {string} args.kubun_class 区分種別
 * @returns {Promise<IKubunNameResult[]>}
 */
export async function kubunName(args: IKubunNameArgs): Promise<IKubunNameResult[]> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/kubun_name/?kubun_class=${args.kubun_class}`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true
    }).then(Util.throwIfNot200);

    return body.list_kubun;
}

/**
 * ムビチケチケットコード取得in
 * @interface MvtkTicketcodeArgs
 */
export interface IMvtkTicketcodeArgs {
    /**
     * 施設コード
     */
    theater_code: string;
    /**
     * 電子券区分
     */
    kbn_denshiken: string;
    /**
     * 前売券区分
     */
    kbn_maeuriken: string;
    /**
     * 券種区分
     */
    kbn_kensyu: string;
    /**
     * 販売単価
     */
    sales_price: number;
    /**
     * 計上単価
     */
    app_price: number;
    /**
     * 映写方式区分
     */
    kbn_eisyahousiki: string;
    /**
     * 作品コード
     */
    title_code: string;
    /**
     * 作品枝番
     */
    title_branch_num: string;
}

/**
 * ムビチケチケットコード取得out
 * @interface MvtkTicketcodeResult
 */
export interface IMvtkTicketcodeResult {
    /**
     * チケットコード
     */
    ticket_code: string;
    /**
     * チケット名
     */
    ticket_name: string;
    /**
     * チケット名(カナ)
     */
    ticket_name_kana: string;
    /**
     * チケット名(英)
     */
    ticket_name_eng: string;
    /**
     * 加算単価 ※３Ｄ、ＩＭＡＸ、４ＤＸ等の加算料金（メガネ抜き）
     */
    add_price: number;
    /**
     * メガネ単価 ※３Ｄメガネの加算料金
     */
    add_price_glasses: number;
}
/**
 * ムビチケチケットコード取得
 * @memberOf services.master
 * @function mvtkTicketcode
 * @param {IMvtkTicketcodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @param {string} args.kbn_denshiken 電子券区分
 * @param {string} args.kbn_maeuriken 前売券区分
 * @param {string} args.kbn_kensyu 券種区分
 * @param {number} args.sales_price 販売単価
 * @param {number} args.app_price 計上単価
 * @param {number} args.kbn_eisyahousiki 映写方式区分
 * @param {number} args.title_code 作品コード
 * @param {number} args.title_branch_num 作品枝番
 * @returns {Promise<IMvtkTicketcodeResult>}
 */
export async function mvtkTicketcode(args: IMvtkTicketcodeArgs): Promise<IMvtkTicketcodeResult> {
    const body = await request.get({
        simple: false,
        url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theater_code}/mvtk_ticketcode/`,
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            theater_code: args.theater_code,
            kbn_denshiken: args.kbn_denshiken,
            kbn_maeuriken: args.kbn_maeuriken,
            kbn_kensyu: args.kbn_kensyu,
            sales_price: args.sales_price,
            app_price: args.app_price,
            kbn_eisyahousiki: args.kbn_eisyahousiki,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return {
        ticket_code: body.ticket_code,
        ticket_name: body.ticket_name,
        ticket_name_kana: body.ticket_name_kana,
        ticket_name_eng: body.ticket_name_eng,
        add_price: body.add_price,
        add_price_glasses: body.add_price_glasses
    };
}
