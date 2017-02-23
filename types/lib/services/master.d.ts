/**
 * 施設マスター抽出in
 * @interface FindTheaterArgs
 */
export interface FindTheaterArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
}
/**
 * 施設マスター抽出out
 * @interface FindTheaterResult
 */
export interface FindTheaterResult {
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
}
/**
 * 施設マスター抽出
 * @memberOf services.master
 * @function findTheater
 * @param {FindTheaterArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindTheaterResult>}
 */
export declare function findTheater(args: FindTheaterArgs): Promise<FindTheaterResult>;
/**
 * 作品マスター抽出in
 * @interface FindFilmsByTheaterCodeArgs
 */
export interface FindFilmsByTheaterCodeArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
}
/**
 * 作品マスター抽出out
 * @interface FindFilmsByTheaterCodeResult
 */
export interface FindFilmsByTheaterCodeResult {
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
}
/**
 * 作品マスター抽出
 * @memberOf services.master
 * @function findFilmsByTheaterCode
 * @param {FindFilmsByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindFilmsByTheaterCodeResult[]>}
 */
export declare function findFilmsByTheaterCode(args: FindFilmsByTheaterCodeArgs): Promise<FindFilmsByTheaterCodeResult[]>;
/**
 * スクリーンマスター抽出in
 * @interface FindScreensByTheaterCodeArgs
 */
export interface FindScreensByTheaterCodeArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
}
/**
 * 座席
 * @interface FindScreensByTheaterCodeSeat
 */
export interface FindScreensByTheaterCodeSeat {
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
 * @interface FindScreensByTheaterCodeResult
 */
export interface FindScreensByTheaterCodeResult {
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
    list_seat: FindScreensByTheaterCodeSeat[];
}
/**
 * スクリーンマスター抽出
 * @memberOf services.master
 * @function findScreensByTheaterCode
 * @param {FindScreensByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindScreensByTheaterCodeResult[]>}
 */
export declare function findScreensByTheaterCode(args: FindScreensByTheaterCodeArgs): Promise<FindScreensByTheaterCodeResult[]>;
/**
 * スケジュールマスター抽出in
 * @interface FindPerformancesByTheaterCodeArgs
 */
export interface FindPerformancesByTheaterCodeArgs {
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
 * @interface FindPerformancesByTheaterCodeResult
 */
export interface FindPerformancesByTheaterCodeResult {
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
}
/**
 * スケジュールマスター抽出
 * @memberOf services.master
 * @function findPerformancesByTheaterCode
 * @param {FindPerformancesByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindPerformancesByTheaterCodeResult[]>}
 */
export declare function findPerformancesByTheaterCode(args: FindPerformancesByTheaterCodeArgs): Promise<FindPerformancesByTheaterCodeResult[]>;
/**
 * 券種マスター抽出in
 * @interface FindTicketsByTheaterCodeArgs
 */
export interface FindTicketsByTheaterCodeArgs {
    /**
     * 施設コード
     */
    theater_code: string;
}
/**
 * 券種マスター抽出out
 * @interface FindTicketsByTheaterCodeResult
 */
export interface FindTicketsByTheaterCodeResult {
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
 * @function findTicketsByTheaterCode
 * @param {FindTicketsByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindTicketsByTheaterCodeResult[]>}
 */
export declare function findTicketsByTheaterCode(args: FindTicketsByTheaterCodeArgs): Promise<FindTicketsByTheaterCodeResult[]>;
/**
 * ムビチケチケットコード取得in
 * @interface MvtkTicketcodeArgs
 */
export interface MvtkTicketcodeArgs {
    /**
     * 施設コード
     */
    theater_code: string;
    /**
     * 電子券区分
     */
    kbn_denshiken: number;
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
    app_price: string;
}
/**
 * ムビチケチケットコード取得
 * @memberOf services.master
 * @function mvtkTicketcode
 * @param {MvtkTicketcodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @param {string} args.kbn_denshiken 電子券区分
 * @param {string} args.kbn_maeuriken 前売券区分
 * @param {string} args.kbn_kensyu 券種区分
 * @param {string} args.sales_price 販売単価
 * @param {string} args.app_price 計上単価
 * @returns {Promise<string>}
 */
export declare function mvtkTicketcode(args: MvtkTicketcodeArgs): Promise<string>;
