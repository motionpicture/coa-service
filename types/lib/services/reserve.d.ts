/**
 * 空席状況in
 * @interface CountFreeSeatArgs
 */
export interface CountFreeSeatArgs {
    /**
     * 劇場コード
     */
    theater_code: string;
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
 * @interface CountFreeSeatPerformance
 */
export interface CountFreeSeatPerformance {
    /**
     * 作品コード(5桁)
     */
    title_code: string;
    /**
     * 作品枝番(2桁)
     */
    title_branch_num: string;
    /**
     * 上映開始時刻(4桁 'HHMM')
     */
    time_begin: string;
    /**
     * スクリーンコード
     */
    screen_code: string;
    /**
     * 予約可能数(パフォーマンスの予約可能座席数)
     */
    cnt_reserve_max: number;
    /**
     * 予約可能残席数(予約可能座席数から仮予約を含む予約数を引いた残席数)
     */
    cnt_reserve_free: number;
}
/**
 * 日程
 * @interface CountFreeSeatDate
 */
export interface CountFreeSeatDate {
    /**
     * 上映日(日付は西暦8桁 'YYYYMMDD')
     */
    date_jouei: string;
    /**
     * パフォーマンスリスト
     */
    list_performance: CountFreeSeatPerformance[];
    /**
     * パフォーマンス数
     */
    cnt_performance: number;
}
/**
 * 空席状況out
 * @interface CountFreeSeatResult
 */
export interface CountFreeSeatResult {
    /**
     * 施設コード
     */
    theater_code: string;
    /**
     * 日程リスト
     */
    list_date: CountFreeSeatDate[];
}
/**
 * 空席状況
 * @memberOf services.reserve
 * @function countFreeSeat
 * @param {CountFreeSeatArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.begin 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
 * @param {string} args.end 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
 * @returns {Promise<CountFreeSeatResult>}
 */
export declare function countFreeSeat(args: CountFreeSeatArgs): Promise<CountFreeSeatResult>;
/**
 * 座席予約状態抽出in
 * @interface StateReserveSeatArgs
 */
export interface StateReserveSeatArgs {
    /**
     * 施設コード
     */
    theater_code: string;
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
     * 上映時刻
     */
    time_begin: string;
    /**
     * スクリーンコード
     */
    screen_code: string;
}
/**
 * 空席リスト
 * @interface StateReserveSeatFreeSeat
 */
export interface StateReserveSeatFreeSeat {
    /**
     * 座席番号
     */
    seat_num: string;
}
/**
 * 座席リスト
 * @interface StateReserveSeatSeat
 */
export interface StateReserveSeatSeat {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 空席リスト
     */
    list_free_seat: StateReserveSeatFreeSeat[];
}
/**
 * 座席予約状態抽出out
 * @interface StateReserveSeatResult
 */
export interface StateReserveSeatResult {
    /**
     * 予約可能残席数
     */
    cnt_reserve_free: number;
    /**
     * 座席列数
     */
    cnt_seat_line: number;
    /**
     * 座席リスト
     */
    list_seat: StateReserveSeatSeat[];
}
/**
 * 座席予約状態抽出
 * @memberOf services.reserve
 * @function stateReserveSeat
 * @param {StateReserveSeatArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {string} args.screen_code スクリーンコード
 * @returns {Promise<StateReserveSeatResult>}
 */
export declare function stateReserveSeat(args: StateReserveSeatArgs): Promise<StateReserveSeatResult>;
/**
 * 予約座席
 * @interface Seat
 */
export interface UpdTmpReserveSeatSeat {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 座席番号
     */
    seat_num: string;
}
/**
 * 仮予約結果リスト
 * @interface TmpReserve
 */
export interface UpdTmpReserveSeatTmpReserve {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 座席番号
     */
    seat_num: string;
    /**
     * 仮予約ステータス
     */
    sts_tmp_reserve: string;
}
/**
 * 座席仮予約in
 * @interface UpdTmpReserveSeatArgs
 */
export interface UpdTmpReserveSeatArgs {
    /**
     * 施設コード
     */
    theater_code: string;
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
     * 上映時刻
     */
    time_begin: string;
    /**
     * 予約座席数
     */
    /**
     * スクリーンコード
     */
    screen_code: string;
    /**
     * 予約座席リスト
     */
    list_seat: UpdTmpReserveSeatSeat[];
}
/**
 * 座席仮予約out
 * @interface UpdTmpReserveSeatResult
 */
export interface UpdTmpReserveSeatResult {
    /**
     * 座席チケット仮予約番号
     */
    tmp_reserve_num: number;
    /**
     * 仮予約結果リスト(仮予約失敗時の座席毎の仮予約状況)
     */
    list_tmp_reserve: UpdTmpReserveSeatTmpReserve[];
}
/**
 * 座席仮予約
 * @memberOf services.reserve
 * @function updTmpReserveSeat
 * @param {UpdTmpReserveSeatArgs} args
 * @param {string} args.theater_code 劇場コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {string} args.screen_code スクリーンコード
 * @param {string} args.screen_code 予約座席リスト
 * @param {string} args.screen_code.seat_section 座席セクション
 * @param {string} args.screen_code.seat_num 座席番号
 * @returns {Promise<UpdTmpReserveSeatResult>}
 */
export declare function updTmpReserveSeat(args: UpdTmpReserveSeatArgs): Promise<UpdTmpReserveSeatResult>;
/**
 * 座席仮予約削除in
 * @interface DelTmpReserveArgs
 */
export interface DelTmpReserveArgs {
    /**
     * 施設コード
     */
    theater_code: string;
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
     * 上映時刻
     */
    time_begin: string;
    /**
     * 座席チケット仮予約番号
     */
    tmp_reserve_num: number;
}
/**
 * 座席仮予約削除
 * @memberOf services.reserve
 * @function delTmpReserve
 * @param {DelTmpReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {number} args.tmp_reserve_num 座席チケット仮予約番号
 * @returns {Promise<void>}
 */
export declare function delTmpReserve(args: DelTmpReserveArgs): Promise<void>;
/**
 * 座席本予約in
 * @interface UpdReserveArgs
 */
export interface UpdReserveArgs {
    /**
     * 施設コード
     */
    theater_code: string;
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
     * 上映時刻
     */
    time_begin: string;
    /**
     * 座席チケット仮予約番号
     */
    tmp_reserve_num: number;
    /**
     * 予約者名
     */
    reserve_name: string;
    /**
     * 予約者名（かな）
     */
    reserve_name_jkana: string;
    /**
     * 電話番号
     */
    tel_num: string;
    /**
     * メールアドレス
     */
    mail_addr: string;
    /**
     * 予約金額
     */
    reserve_amount: number;
    /**
     * 価格情報リスト
     */
    list_ticket: UpdReserveTicket[];
}
/**
 * 価格情報
 * @interface UpdReserveTicket
 */
export interface UpdReserveTicket {
    /**
     * チケットコード
     */
    ticket_code: string;
    /**
     * 標準単価
     */
    std_price: number;
    /**
     * 加算単価
     */
    add_price: number;
    /**
     * 割引額
     */
    dis_price: number;
    /**
     * 金額
     */
    sale_price: number;
    /**
     * ムビチケ計上単価
     */
    mvtk_app_price: number;
    /**
     * 枚数
     */
    ticket_count: number;
    /**
     * 座席番号
     */
    seat_num: string;
}
/**
 * 座席本予約out
 * @interface UpdReserveResult
 */
export interface UpdReserveResult {
    /**
     * 座席チケット購入番号
     */
    reserve_num: number;
    /**
     * 入場QRリスト
     */
    list_qr: UpdReserveQR[];
}
/**
 * 入場QR
 * @interface UpdReserveQR
 */
export interface UpdReserveQR {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 座席番号
     */
    seat_num: string;
    /**
     * 座席入場QRコード
     */
    seat_qrcode: string;
}
/**
 * 座席本予約
 * @memberOf services.reserve
 * @function updReserve
 * @param {UpdReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {string} args.screen_code 座席チケット仮予約番号
 * @param {number} args.tmp_reserve_num スクリーンコード
 * @param {string} args.reserve_name 予約者名
 * @param {string} args.reserve_name_jkana 予約者名（かな）
 * @param {string} args.tel_num 電話番号
 * @param {string} args.mail_addr メールアドレス
 * @param {string} args.reserve_amount 予約金額
 * @param {UpdReserveTicket[]} args.list_ticket 価格情報リスト
 * @param {string} args.list_ticket.ticket_code チケットコード
 * @param {number} args.list_ticket.std_price 標準単価
 * @param {number} args.list_ticket.add_price 加算単価
 * @param {number} args.list_ticket.dis_price 割引額
 * @param {number} args.list_ticket.sale_price 金額
 * @param {number} args.list_ticket.mvtk_app_price ムビチケ計上単価
 * @param {number} args.list_ticket.ticket_count 枚数
 * @param {string} args.list_ticket.seat_num 座席番号
 * @returns {Promise<UpdReserveResult>}
 */
export declare function updReserve(args: UpdReserveArgs): Promise<UpdReserveResult>;
/**
 * 購入チケット取り消しin
 * @interface DelReserveArgs
 */
export interface DelReserveArgs {
    /**
     * 施設コード
     */
    theater_code: string;
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
     * 上映時刻
     */
    time_begin: string;
    /**
     * 座席チケット購入番号
     */
    reserve_num: number;
    /**
     * 電話番号
     */
    tel_num: string;
    /**
     * 座席単位削除リスト
     */
    list_seat: DelReserveSeat[];
}
/**
 * 座席単位削除
 * @interface DelReserveSeat
 */
export interface DelReserveSeat {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 座席番号
     */
    seat_num: string;
}
/**
 * 購入チケット取り消し
 * @memberOf services.reserve
 * @function delReserve
 * @param {DelReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {number} args.reserve_num 座席チケット購入番号
 * @param {string} args.tel_num 電話番号
 * @param {DelReserveSeat[]} args.screen_code 座席単位削除リスト
 * @param {string} args.screen_code 座席単位削除リスト
 * @param {string} args.screen_code.seat_section 座席セクション
 * @param {string} args.screen_code.seat_num 座席番号
 * @returns {Promise<void>}
 */
export declare function delReserve(args: DelReserveArgs): Promise<void>;
/**
 * 購入チケット内容抽出in
 */
export interface StateReserveArgs {
    /**
     * 施設コード
     */
    theater_code: string;
    /**
     * 座席チケット購入番号
     */
    reserve_num: number;
    /**
     * 電話番号
     */
    tel_num: string;
}
export interface StateReserveTicket {
    /**
     * チケットコード
     */
    ticket_code: string;
    /**
     * チケット名
     */
    ticket_name: string;
    /**
     * 金額
     */
    ticket_price: number;
    /**
     * 枚数
     */
    ticket_count: number;
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 座席番号
     */
    seat_num: string;
    /**
     * 座席入場QRコード
     */
    seat_qrcode: string;
}
/**
 * 購入チケット内容抽出out
 */
export interface StateReserveResult {
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
     * 上映時刻
     */
    time_begin: string;
    /**
     * スクリーンコード
     */
    screen_code: string;
    /**
     * 価格情報リスト
     */
    list_ticket: StateReserveTicket[];
}
/**
 * 購入チケット内容抽出
 * @memberOf services.reserve
 * @function stateReserve
 * @param {StateReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {number} args.reserve_num 座席チケット購入番号
 * @param {string} args.tel_num 電話番号
 * @returns {Promise<StateReserveResult>}
 */
export declare function stateReserve(args: StateReserveArgs): Promise<StateReserveResult>;
/**
 * 販売可能チケット情報in
 * @interface SalesTicketArgs
 */
export interface SalesTicketArgs {
    /**
     * 施設コード
     */
    theater_code: string;
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
     * 上映時刻
     */
    time_begin: string;
}
/**
 * 販売可能チケット情報out
 * @interface salesTicketResult
 */
export interface SalesTicketResult {
    /**
     * チケットコード
     */
    ticket_code: string;
    /**
     * チケット名
     */
    ticket_name: string;
    /**
     * チケット名（カナ）
     */
    ticket_name_kana: string;
    /**
     * チケット名（英）
     */
    ticket_name_eng: string;
    /**
     * 標準単価
     */
    std_price: number;
    /**
     * 加算単価(３Ｄ，ＩＭＡＸ、４ＤＸ等の加算料金)
     */
    add_price: number;
    /**
     * 販売単価(標準単価＋加算単価)
     */
    sale_price: number;
    /**
     * 人数制限(制限が無い場合は１)
     */
    limit_count: number;
    /**
     * 制限単位(１：ｎ人単位、２：ｎ人以上)
     */
    limit_unit: string;
    /**
     * チケット備考(注意事項等)
     */
    ticket_note: string;
}
/**
 * 販売可能チケット情報
 * @memberOf services.reserve
 * @function salesTicket
 * @param {SalesTicketArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @memberOf salesTicket
 */
export declare function salesTicket(args: SalesTicketArgs): Promise<SalesTicketResult[]>;
