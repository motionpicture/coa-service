/**
 * COAAPIの設定値をセットする
 *
 * @method
 */
export declare function initialize(args: {
    /**
     * APIエンドポイント
     */
    endpoint: string;
    /**
     * リフレッシュトークン
     */
    refresh_token: string;
}): void;
/**
 * 施設マスター抽出
 *
 * @namespace
 */
export declare namespace findTheaterInterface {
    interface Args {
        /**
         * 劇場コード
         */
        theater_code: string;
    }
    interface Result {
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
     * 呼出
     *
     * @param {Args} args
     * @memberOf findTheaterInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 作品マスター抽出
 *
 * @namespace
 */
export declare namespace findFilmsByTheaterCodeInterface {
    interface Args {
        /**
         * 劇場コード
         */
        theater_code: string;
    }
    interface Result {
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
     * 呼出
     *
     * @param {Args} args
     * @memberOf findFilmsByTheaterCodeInterface
     */
    function call(args: Args): Promise<Result[]>;
}
/**
 * スクリーンマスター抽出
 *
 * @namespace
 */
export declare namespace findScreensByTheaterCodeInterface {
    interface Args {
        /**
         * 劇場コード
         */
        theater_code: string;
    }
    interface Seat {
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
    interface Result {
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
        list_seat: Seat[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf findScreensByTheaterCodeInterface
     */
    function call(args: Args): Promise<Result[]>;
}
/**
 * スケジュールマスター抽出
 *
 * @namespace
 */
export declare namespace findPerformancesByTheaterCodeInterface {
    interface Args {
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
    interface Result {
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
     * 呼出
     *
     * @param {Args} args
     * @memberOf findPerformancesByTheaterCodeInterface
     */
    function call(args: Args): Promise<Result[]>;
}
/**
 * 座席仮予約
 *
 * @namespace
 */
export declare namespace reserveSeatsTemporarilyInterface {
    interface Seat {
        /**
         * 座席セクション
         */
        seat_section: string;
        /**
         * 座席番号
         */
        seat_num: string;
    }
    interface Args {
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
        list_seat: Seat[];
    }
    interface TmpReserve {
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
    interface Result {
        /**
         * 座席チケット仮予約番号
         */
        tmp_reserve_num: number;
        /**
         * 仮予約結果リスト(仮予約失敗時の座席毎の仮予約状況)
         */
        list_tmp_reserve: TmpReserve[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf reserveSeatsTemporarilyInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 座席仮予約削除
 *
 * @namespace
 */
export declare namespace deleteTmpReserveInterface {
    interface Args {
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
     * 呼出
     *
     * @param {Args} args
     * @memberOf deleteTmpReserveInterface
     */
    function call(args: Args): Promise<void>;
}
/**
 * 座席予約状態抽出
 *
 * @namespace
 */
export declare namespace getStateReserveSeatInterface {
    interface Args {
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
    interface FreeSeat {
        /**
         * 座席番号
         */
        seat_num: string;
    }
    interface Seat {
        /**
         * 座席セクション
         */
        seat_section: string;
        /**
         * 空席リスト
         */
        list_free_seat: FreeSeat[];
    }
    interface Result {
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
        list_seat: Seat[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf getStateReserveSeatInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 空席状況
 *
 * @namespace
 */
export declare namespace countFreeSeatInterface {
    interface Args {
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
    interface Performance {
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
    interface Date {
        /**
         * 上映日(日付は西暦8桁 'YYYYMMDD')
         */
        date_jouei: string;
        /**
         * パフォーマンスリスト
         */
        list_performance: Performance[];
        /**
         * パフォーマンス数
         */
        cnt_performance: number;
    }
    interface Result {
        /**
         * 施設コード
         */
        theater_code: string;
        /**
         * 日程リスト
         */
        list_date: Date[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf countFreeSeatInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 販売可能チケット情報
 *
 * @namespace
 */
export declare namespace salesTicketInterface {
    interface Args {
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
    interface Ticket {
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
    interface Result {
        /**
         * 購入可能チケット情報リスト
         */
        list_ticket: Ticket[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf salesTicketInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 券種マスター抽出
 *
 * @namespace
 */
export declare namespace ticketInterface {
    interface Args {
        /**
         * 施設コード
         */
        theater_code: string;
    }
    interface Ticket {
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
    interface Result {
        /**
         * 券種リスト
         */
        list_ticket: Ticket[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf ticketInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 座席本予約
 *
 * @namespace
 */
export declare namespace updateReserveInterface {
    interface Ticket {
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
    interface Args {
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
        list_ticket: Ticket[];
    }
    interface QR {
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
    interface Result {
        /**
         * 座席チケット購入番号
         */
        reserve_num: number;
        /**
         * 入場QRリスト
         */
        list_qr: QR[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf updateReserveInterface
     */
    function call(args: Args): Promise<Result>;
}
/**
 * 購入チケット取り消し
 *
 * @namespace
 */
export declare namespace deleteReserveInterface {
    interface Seat {
        /**
         * 座席セクション
         */
        seat_section: string;
        /**
         * 座席番号
         */
        seat_num: string;
    }
    interface Args {
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
        list_seat: Seat[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf deleteReserveInterface
     */
    function call(args: Args): Promise<void>;
}
/**
 * 購入チケット内容抽出
 *
 * @namespace
 */
export declare namespace stateReserveInterface {
    interface Args {
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
    interface Ticket {
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
    interface Result {
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
        list_ticket: Ticket[];
    }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf stateReserveInterface
     */
    function call(args: Args): Promise<Result>;
}
