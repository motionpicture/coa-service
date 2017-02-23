/**
 * 予約サービス
 * @namespace services.reserve
 */
import * as request from 'request-promise-native';
import * as Util from '../utils/util';

/**
 * 予約座席
 * @interface Seat
 */
export interface ReserveSeatsTemporarilySeat {
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
export interface ReserveSeatsTemporarilyTmpReserve {
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
 * @interface ReserveSeatsTemporarilyArgs
 */
export interface ReserveSeatsTemporarilyArgs {
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
    // cnt_reserve_seat: number,
    /**
     * スクリーンコード
     */
    screen_code: string;
    /**
     * 予約座席リスト
     */
    list_seat: ReserveSeatsTemporarilySeat[];
}
/**
 * 座席仮予約out
 * @interface ReserveSeatsTemporarilyResult
 */
export interface ReserveSeatsTemporarilyResult {
    /**
     * 座席チケット仮予約番号
     */
    tmp_reserve_num: number;
    /**
     * 仮予約結果リスト(仮予約失敗時の座席毎の仮予約状況)
     */
    list_tmp_reserve: ReserveSeatsTemporarilyTmpReserve[];
}
/**
 * 座席仮予約
 * @memberOf services.reserve
 * @function reserveSeatsTemporarily
 * @param {ReserveSeatsTemporarilyArgs} args
 * @param {string} args.theater_code 劇場コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {string} args.screen_code スクリーンコード
 * @param {string} args.screen_code 予約座席リスト
 * @param {string} args.screen_code.seat_section 座席セクション
 * @param {string} args.screen_code.seat_num 座席番号
 * @returns {Promise<ReserveSeatsTemporarilyResult>}
 */
export async function reserveSeatsTemporarily(args: ReserveSeatsTemporarilyArgs): Promise<ReserveSeatsTemporarilyResult> {
    const body = await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_tmp_reserve_seat/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            date_jouei: args.date_jouei,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num,
            time_begin: args.time_begin,
            cnt_reserve_seat: args.list_seat.length,
            seat_section: args.list_seat.map((value) => value.seat_section),
            seat_num: args.list_seat.map((value) => value.seat_num),
            screen_code: args.screen_code
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return {
        tmp_reserve_num: body.tmp_reserve_num,
        list_tmp_reserve: body.list_tmp_reserve
    };
}

/**
 * 座席仮予約削除in
 * @interface DeleteTmpReserveArgs
 */
export interface DeleteTmpReserveArgs {
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
 * @function deleteTmpReserve
 * @param {DeleteTmpReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {number} args.tmp_reserve_num 座席チケット仮予約番号
 * @returns {Promise<void>}
 */
export async function deleteTmpReserve(args: DeleteTmpReserveArgs): Promise<void> {
    await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_tmp_reserve/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            date_jouei: args.date_jouei,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num,
            time_begin: args.time_begin,
            tmp_reserve_num: args.tmp_reserve_num
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);
}

/**
 * 座席予約状態抽出in
 * @interface GetStateReserveSeatArgs
 */
export interface GetStateReserveSeatArgs {
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
 * @interface GetStateReserveSeatFreeSeat
 */
export interface GetStateReserveSeatFreeSeat {
    /**
     * 座席番号
     */
    seat_num: string;
}
/**
 * 座席リスト
 * @interface GetStateReserveSeatSeat
 */
export interface GetStateReserveSeatSeat {
    /**
     * 座席セクション
     */
    seat_section: string;
    /**
     * 空席リスト
     */
    list_free_seat: GetStateReserveSeatFreeSeat[];
}
/**
 * 座席予約状態抽出out
 * @interface GetStateReserveSeatResult
 */
export interface GetStateReserveSeatResult {
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
    list_seat: GetStateReserveSeatSeat[];
}
/**
 * 座席予約状態抽出
 * @memberOf services.reserve
 * @function getStateReserveSeat
 * @param {GetStateReserveSeatArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {string} args.screen_code スクリーンコード
 * @returns {Promise<GetStateReserveSeatResult>}
 */
export async function getStateReserveSeat(args: GetStateReserveSeatArgs): Promise<GetStateReserveSeatResult> {
    const body = await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve_seat/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            date_jouei: args.date_jouei,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num,
            time_begin: args.time_begin,
            screen_code: args.screen_code
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return {
        cnt_reserve_free: body.cnt_reserve_free,
        cnt_seat_line: body.cnt_seat_line,
        list_seat: body.list_seat
    };
}

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
export async function countFreeSeat(args: CountFreeSeatArgs): Promise<CountFreeSeatResult> {
    const body = await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/count_free_seat/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            begin: args.begin,
            end: args.end
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return {
        theater_code: body.theater_code,
        list_date: body.list_date
    };
}

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
export async function salesTicket(args: SalesTicketArgs): Promise<SalesTicketResult[]> {
    const body = await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/sales_ticket/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            date_jouei: args.date_jouei,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num,
            time_begin: args.time_begin
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return body.list_ticket;
}

/**
 * 価格情報
 * @interface UpdateReserveTicket
 */
export interface UpdateReserveTicket {
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
 * 座席本予約in
 * @interface UpdateReserveArgs
 */
export interface UpdateReserveArgs {
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
    list_ticket: UpdateReserveTicket[];
}
/**
 * 入場QR
 * @interface UpdateReserveQR
 */
export interface UpdateReserveQR {
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
 * 座席本予約out
 * @interface UpdateReserveResult
 */
export interface UpdateReserveResult {
    /**
     * 座席チケット購入番号
     */
    reserve_num: number;
    /**
     * 入場QRリスト
     */
    list_qr: UpdateReserveQR[];
}
/**
 * 座席本予約
 * @memberOf services.reserve
 * @function updateReserve
 * @param {UpdateReserveArgs} args
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
 * @param {UpdateReserveTicket[]} args.list_ticket 価格情報リスト
 * @param {string} args.list_ticket.ticket_code チケットコード
 * @param {number} args.list_ticket.std_price 標準単価
 * @param {number} args.list_ticket.add_price 加算単価
 * @param {number} args.list_ticket.dis_price 割引額
 * @param {number} args.list_ticket.sale_price 金額
 * @param {number} args.list_ticket.mvtk_app_price ムビチケ計上単価
 * @param {number} args.list_ticket.ticket_count 枚数
 * @param {string} args.list_ticket.seat_num 座席番号
 * @returns {Promise<UpdateReserveResult>}
 */
export async function updateReserve(args: UpdateReserveArgs): Promise<UpdateReserveResult> {
    const body = await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_reserve/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            theater_code: args.theater_code,
            date_jouei: args.date_jouei,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num,
            time_begin: args.time_begin,
            tmp_reserve_num: args.tmp_reserve_num,
            reserve_name: args.reserve_name,
            reserve_name_jkana: args.reserve_name_jkana,
            tel_num: args.tel_num,
            mail_addr: args.mail_addr,
            reserve_amount: args.reserve_amount,
            ticket_code: args.list_ticket.map((value) => value.ticket_code),
            std_price: args.list_ticket.map((value) => value.std_price),
            add_price: args.list_ticket.map((value) => value.add_price),
            dis_price: args.list_ticket.map((value) => value.dis_price),
            sale_price: args.list_ticket.map((value) => value.sale_price),
            mvtk_app_price: args.list_ticket.map((value) => value.mvtk_app_price),
            ticket_count: args.list_ticket.map((value) => value.ticket_count),
            seat_num: args.list_ticket.map((value) => value.seat_num)
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return {
        reserve_num: body.reserve_num,
        list_qr: body.list_qr
    };
}

/**
 * 座席単位削除
 * @interface DeleteReserveSeat
 */
export interface DeleteReserveSeat {
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
 * 購入チケット取り消しin
 * @interface DeleteReserveArgs
 */
export interface DeleteReserveArgs {
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
    list_seat: DeleteReserveSeat[];
}
/**
 * 購入チケット取り消し
 * @memberOf services.reserve
 * @function deleteReserve
 * @param {DeleteReserveArgs} args
 * @param {string} args.theater_code 施設コード
 * @param {string} args.date_jouei 上映日
 * @param {string} args.title_code 作品コード
 * @param {string} args.title_branch_num 作品枝番
 * @param {string} args.time_begin 上映時刻
 * @param {number} args.reserve_num 座席チケット購入番号
 * @param {string} args.tel_num 電話番号
 * @param {DeleteReserveSeat[]} args.screen_code 座席単位削除リスト
 * @param {string} args.screen_code 座席単位削除リスト
 * @param {string} args.screen_code.seat_section 座席セクション
 * @param {string} args.screen_code.seat_num 座席番号
 * @returns {Promise<void>}
 */
export async function deleteReserve(args: DeleteReserveArgs): Promise<void> {
    await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_reserve/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            theater_code: args.theater_code,
            date_jouei: args.date_jouei,
            title_code: args.title_code,
            title_branch_num: args.title_branch_num,
            time_begin: args.time_begin,
            reserve_num: args.reserve_num,
            tel_num: args.tel_num,
            seat_section: args.list_seat.map((value) => value.seat_section),
            seat_num: args.list_seat.map((value) => value.seat_num)
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);
}

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
export async function stateReserve(args: StateReserveArgs): Promise<StateReserveResult> {
    const body = await request.get({
        simple: false,
        url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve/',
        auth: { bearer: await Util.publishAccessToken() },
        json: true,
        qs: {
            theater_code: args.theater_code,
            reserve_num: args.reserve_num,
            tel_num: args.tel_num
        },
        useQuerystring: true
    }).then(Util.throwIfNot200);

    return {
        date_jouei: body.date_jouei,
        title_code: body.title_code,
        title_branch_num: body.title_branch_num,
        time_begin: body.time_begin,
        screen_code: body.screen_code,
        list_ticket: body.list_ticket
    };
}
