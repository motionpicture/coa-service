/**
 * 空席状況in
 * @interface ICountFreeSeatArgs
 */
export interface ICountFreeSeatArgs {
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
 * @interface ICountFreeSeatPerformance
 */
export interface ICountFreeSeatPerformance {
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
 * @interface ICountFreeSeatDate
 */
export interface ICountFreeSeatDate {
    /**
     * 上映日(日付は西暦8桁 'YYYYMMDD')
     */
    date_jouei: string;
    /**
     * パフォーマンスリスト
     */
    list_performance: ICountFreeSeatPerformance[];
    /**
     * パフォーマンス数
     */
    cnt_performance: number;
}
/**
 * 空席状況out
 * @interface ICountFreeSeatResult
 */
export interface ICountFreeSeatResult {
    /**
     * 施設コード
     */
    theater_code: string;
    /**
     * 日程リスト
     */
    list_date: ICountFreeSeatDate[];
}
/**
 * 空席状況
 * @memberof services.reserve
 * @function countFreeSeat
 * @param {CountFreeSeatArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.begin 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
 * @param {string} args.end 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
 * @returns {Promise<CountFreeSeatResult>}
 */
export declare function countFreeSeat(args: ICountFreeSeatArgs): Promise<ICountFreeSeatResult>;
/**
 * 座席予約状態抽出in
 * @interface IStateReserveSeatArgs
 */
export interface IStateReserveSeatArgs {
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
 * @interface IStateReserveSeatFreeSeat
 */
export interface IStateReserveSeatFreeSeat {
    /**
     * 座席番号
     */
    seat_num: string;
}
/**
 * 座席リスト
 * @interface IStateReserveSeatSeat
 */
export interface IStateReserveSeatSeat {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 空席リスト
     */
    list_free_seat: IStateReserveSeatFreeSeat[];
}
/**
 * 座席予約状態抽出out
 * @interface IStateReserveSeatResult
 */
export interface IStateReserveSeatResult {
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
    list_seat: IStateReserveSeatSeat[];
}
/**
 * 座席予約状態抽出
 * @memberof services.reserve
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
export declare function stateReserveSeat(args: IStateReserveSeatArgs): Promise<IStateReserveSeatResult>;
/**
 * 予約座席
 * @interface ISeat
 */
export interface IUpdTmpReserveSeatSeat {
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
 * @interface ITmpReserve
 */
export interface IUpdTmpReserveSeatTmpReserve {
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
 * @interface IUpdTmpReserveSeatArgs
 */
export interface IUpdTmpReserveSeatArgs {
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
    list_seat: IUpdTmpReserveSeatSeat[];
}
/**
 * 座席仮予約out
 * @interface IUpdTmpReserveSeatResult
 */
export interface IUpdTmpReserveSeatResult {
    /**
     * 座席チケット仮予約番号
     */
    tmp_reserve_num: number;
    /**
     * 仮予約結果リスト(仮予約失敗時の座席毎の仮予約状況)
     */
    list_tmp_reserve: IUpdTmpReserveSeatTmpReserve[];
}
/**
 * 座席仮予約
 * @memberof services.reserve
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
export declare function updTmpReserveSeat(args: IUpdTmpReserveSeatArgs): Promise<IUpdTmpReserveSeatResult>;
/**
 * 座席仮予約削除in
 * @interface IDelTmpReserveArgs
 */
export interface IDelTmpReserveArgs {
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
 * @memberof services.reserve
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
export declare function delTmpReserve(args: IDelTmpReserveArgs): Promise<void>;
/**
 * 座席本予約in
 * @interface IUpdReserveArgs
 */
export interface IUpdReserveArgs {
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
    list_ticket: IUpdReserveTicket[];
}
/**
 * 価格情報
 * @interface IUpdReserveTicket
 */
export interface IUpdReserveTicket {
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
     * 価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）　※標準単価+加算単価-割引額
     */
    sale_price: number;
    /**
     * ムビチケ計上単価
     * ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
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
    /**
     * メガネ単価
     * メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
     */
    add_glasses: number;
    /**
     * ムビチケ映写方式区分
     * ムビチケ連携情報より
     */
    kbn_eisyahousiki: string;
    /**
     * ムビチケ購入管理番号
     * ムビチケ連携情報より（ムビチケ以外は""）
     */
    mvtk_num: string;
    /**
     * ムビチケ電子券区分
     * ムビチケ連携情報より（01：電子、02：紙　※ムビチケ以外は"00"をセット）
     */
    mvtk_kbn_denshiken: string;
    /**
     * ムビチケ前売券区分
     * ムビチケ連携情報より（01：全国券、02：劇場券　※ムビチケ以外は"00"をセット）
     */
    mvtk_kbn_maeuriken: string;
    /**
     * ムビチケ券種区分
     * ムビチケ連携情報より（01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ、…　※ムビチケ以外は"00"をセット）
     */
    mvtk_kbn_kensyu: string;
    /**
     * ムビチケ販売単価
     * ムビチケ連携情報より（ムビチケ以外は0をセット）
     */
    mvtk_sales_price: number;
}
/**
 * 座席本予約out
 * @interface IUpdReserveResult
 */
export interface IUpdReserveResult {
    /**
     * 座席チケット購入番号
     */
    reserve_num: number;
    /**
     * 入場QRリスト
     */
    list_qr: IUpdReserveQR[];
}
/**
 * 入場QR
 * @interface IUpdReserveQR
 */
export interface IUpdReserveQR {
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
 * @memberof services.reserve
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
 * @param {string} args.reserve_name_jkana 予約者名（かな）※予約者名（かな）：（かな姓）+空白+（かな名）
 * @param {string} args.tel_num 電話番号
 * @param {string} args.mail_addr メールアドレス
 * @param {string} args.reserve_amount 予約金額
 * @param {UpdReserveTicket[]} args.list_ticket 価格情報リスト
 * @param {string} args.list_ticket.ticket_code チケットコード
 * @param {number} args.list_ticket.std_price 標準単価
 * @param {number} args.list_ticket.add_price 加算単価
 * @param {number} args.list_ticket.dis_price 割引額
 * @param {number} args.list_ticket.sale_price 金額 ※価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）　※標準単価+加算単価-割引額
 * @param {number} args.list_ticket.mvtk_app_price ムビチケ計上単価 ※ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
 * @param {number} args.list_ticket.ticket_count 枚数
 * @param {string} args.list_ticket.seat_num 座席番号
 * @param {number} args.list_ticket.add_glasses メガネ単価 ※メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
 * @param {string} args.list_ticket.kbn_eisyahousiki ムビチケ連携情報より
 * @param {string} args.list_ticket.mvtk_num ムビチケ連携情報より（ムビチケ以外は""）
 * @param {string} args.list_ticket.mvtk_kbn_denshiken ムビチケ連携情報より（01：電子、02：紙　※ムビチケ以外は"00"をセット）
 * @param {string} args.list_ticket.mvtk_kbn_maeuriken ムビチケ連携情報より（01：全国券、02：劇場券　※ムビチケ以外は"00"をセット）
 * @param {string} args.list_ticket.mvtk_kbn_kensyu ムビチケ連携情報より（01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ、…　※ムビチケ以外は"00"をセット）
 * @param {number} args.list_ticket.mvtk_sales_price ムビチケ連携情報より（ムビチケ以外は0をセット）
 * @returns {Promise<UpdReserveResult>}
 */
export declare function updReserve(args: IUpdReserveArgs): Promise<IUpdReserveResult>;
/**
 * 購入チケット取り消しin
 * @interface IDelReserveArgs
 */
export interface IDelReserveArgs {
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
    list_seat: IDelReserveSeat[];
}
/**
 * 座席単位削除
 * @interface IDelReserveSeat
 */
export interface IDelReserveSeat {
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
 * @memberof services.reserve
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
export declare function delReserve(args: IDelReserveArgs): Promise<void>;
/**
 * 購入チケット内容抽出in
 */
export interface IStateReserveArgs {
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
export interface IStateReserveTicket {
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
    /**
     * メガネ単価
     */
    add_glasses: number;
}
/**
 * 購入チケット内容抽出out
 */
export interface IStateReserveResult {
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
    list_ticket: IStateReserveTicket[];
}
/**
 * 購入チケット内容抽出
 * @memberof services.reserve
 * @function stateReserve
 * @param {StateReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {number} args.reserve_num 座席チケット購入番号
 * @param {string} args.tel_num 電話番号
 * @returns {Promise<StateReserveResult>}
 */
export declare function stateReserve(args: IStateReserveArgs): Promise<IStateReserveResult | null>;
/**
 * 非会員
 * @memberof services.reserve
 * @const {string} NON_MEMBER
 */
export declare const NON_MEMBER = "0";
/**
 * 会員
 * @memberof services.reserve
 * @const {string} MEMBER
 */
export declare const MEMBER = "1";
/**
 * 販売可能チケット情報in
 * @interface ISalesTicketArgs
 */
export interface ISalesTicketArgs {
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
     * 会員用フラグ（1：会員専用チケットも表示する。会員以外の場合は0をセット）
     */
    flg_member: string;
}
/**
 * 販売可能チケット情報out
 * @interface IsalesTicketResult
 */
export interface ISalesTicketResult {
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
    /**
     * メガネ単価
     */
    add_glasses: number;
}
/**
 * 販売可能チケット情報
 * @memberof services.reserve
 * @function salesTicket
 * @param {SalesTicketArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {string} args.flg_member 会員用フラグ
 */
export declare function salesTicket(args: ISalesTicketArgs): Promise<ISalesTicketResult[]>;
