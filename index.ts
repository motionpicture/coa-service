import * as request from 'request-promise-native';

/**
 * COAAPIの設定値をセットする
 *
 * @method
 */
export function initialize(args: {
    /**
     * APIエンドポイント
     */
    endpoint: string,
    /**
     * リフレッシュトークン
     */
    refresh_token: string
}) {
    process.env.COA_ENDPOINT = args.endpoint;
    process.env.COA_REFRESH_TOKEN = args.refresh_token;
}

/**
 * API認証情報
 *
 * @ignore
 */
let credentials = {
    access_token: '',
    expired_at: ''
};

/**
 * アクセストークンを発行する
 *
 * @ignore
 */
async function publishAccessToken() {
    if (!process.env.COA_ENDPOINT || !process.env.COA_REFRESH_TOKEN) {
        throw new Error('coa-service requires initialization.');
    }

    // アクセストークン有効期限チェック
    // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
    const SPARE_TIME = 60000;
    if (!credentials.access_token || Date.parse(credentials.expired_at) < Date.now() - SPARE_TIME) {
        const body = await request.post({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/token/access_token',
            form: {
                refresh_token: process.env.COA_REFRESH_TOKEN
            },
            json: true
        }).then(throwIfNot200);

        credentials = body;
    }

    return credentials.access_token;
}

async function throwIfNot200(body: any): Promise<any> {
    if (typeof body === 'string') throw new Error(body);
    if (body.message) throw new Error(body.message);
    if (body.status !== undefined && body.status !== 0) throw new Error(body.status);

    return body;
}

/**
 * 施設マスター抽出
 *
 * @namespace
 */
export namespace findTheaterInterface {
    export interface Args {
        /**
         * 劇場コード
         */
        theater_code: string;
    }
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/theater/',
            auth: { bearer: await publishAccessToken() },
            json: true
        }).then(throwIfNot200);

        return {
            theater_code: body.theater_code,
            theater_name: body.theater_name,
            theater_name_eng: body.theater_name_eng,
            theater_name_kana: body.theater_name_kana
        };
    }
}

/**
 * 作品マスター抽出
 *
 * @namespace
 */
export namespace findFilmsByTheaterCodeInterface {
    export interface Args {
        /**
         * 劇場コード
         */
        theater_code: string;
    }
    export interface Result {
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
    export async function call(args: Args): Promise<Result[]> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/title/',
            auth: { bearer: await publishAccessToken() },
            json: true
        }).then(throwIfNot200);

        return body.list_title;
    }
}

/**
 * スクリーンマスター抽出
 *
 * @namespace
 */
export namespace findScreensByTheaterCodeInterface {
    export interface Args {
        /**
         * 劇場コード
         */
        theater_code: string;
    }
    export interface Seat {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result[]> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/screen/',
            auth: { bearer: await publishAccessToken() },
            json: true
        }).then(throwIfNot200);

        return body.list_screen;
    }
}

/**
 * スケジュールマスター抽出
 *
 * @namespace
 */
export namespace findPerformancesByTheaterCodeInterface {
    export interface Args {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result[]> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/schedule/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
                begin: args.begin,
                end: args.end
            }
        }).then(throwIfNot200);

        return body.list_schedule;
    }
}

/**
 * 座席仮予約
 *
 * @namespace
 */
export namespace reserveSeatsTemporarilyInterface {
    export interface Seat {
        /**
         * 座席セクション
         */
        seat_section: string;
        /**
         * 座席番号
         */
        seat_num: string;
    }
    export interface Args {
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
        list_seat: Seat[];
    }
    export interface TmpReserve {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_tmp_reserve_seat/',
            auth: { bearer: await publishAccessToken() },
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
        }).then(throwIfNot200);

        return {
            tmp_reserve_num: body.tmp_reserve_num,
            list_tmp_reserve: body.list_tmp_reserve
        };
    }
}

/**
 * 座席仮予約削除
 *
 * @namespace
 */
export namespace deleteTmpReserveInterface {
    export interface Args {
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
    // export interface Result {
    // }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf deleteTmpReserveInterface
     */
    export async function call(args: Args): Promise<void> {
        await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_tmp_reserve/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.date_jouei,
                title_code: args.title_code,
                title_branch_num: args.title_branch_num,
                time_begin: args.time_begin,
                tmp_reserve_num: args.tmp_reserve_num
            },
            useQuerystring: true
        }).then(throwIfNot200);
    }
}

/**
 * 座席予約状態抽出
 *
 * @namespace
 */
export namespace getStateReserveSeatInterface {
    export interface Args {
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
    export interface FreeSeat {
        /**
         * 座席番号
         */
        seat_num: string;
    }
    export interface Seat {
        /**
         * 座席セクション
         */
        seat_section: string;
        /**
         * 空席リスト
         */
        list_free_seat: FreeSeat[];
    }
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve_seat/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.date_jouei,
                title_code: args.title_code,
                title_branch_num: args.title_branch_num,
                time_begin: args.time_begin,
                screen_code: args.screen_code
            },
            useQuerystring: true
        }).then(throwIfNot200);

        return {
            cnt_reserve_free: body.cnt_reserve_free,
            cnt_seat_line: body.cnt_seat_line,
            list_seat: body.list_seat
        };
    }
}

/**
 * 空席状況
 *
 * @namespace
 */
export namespace countFreeSeatInterface {
    export interface Args {
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
    export interface Performance {
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
    export interface Date {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/count_free_seat/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
                begin: args.begin,
                end: args.end
            },
            useQuerystring: true
        }).then(throwIfNot200);

        return {
            theater_code: body.theater_code,
            list_date: body.list_date
        };
    }
}

/**
 * 販売可能チケット情報
 *
 * @namespace
 */
export namespace salesTicketInterface {
    export interface Args {
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
    export interface Ticket {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/sales_ticket/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.date_jouei,
                title_code: args.title_code,
                title_branch_num: args.title_branch_num,
                time_begin: args.time_begin
            },
            useQuerystring: true
        }).then(throwIfNot200);

        return {
            list_ticket: body.list_ticket
        };
    }
}

/**
 * 券種マスター抽出
 *
 * @namespace
 */
export namespace ticketInterface {
    export interface Args {
        /**
         * 施設コード
         */
        theater_code: string;
    }
    export interface Ticket {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/ticket/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
            },
            useQuerystring: true
        }).then(throwIfNot200);

        return {
            list_ticket: body.list_ticket
        };
    }
}

/**
 * 座席本予約
 *
 * @namespace
 */
export namespace updateReserveInterface {
    export interface Ticket {
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
         * 枚数
         */
        ticket_count: number;
        /**
         * 座席番号
         */
        seat_num: string;
    }
    export interface Args {
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
    export interface QR {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_reserve/',
            auth: { bearer: await publishAccessToken() },
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
                ticket_count: args.list_ticket.map((value) => value.ticket_count),
                seat_num: args.list_ticket.map((value) => value.seat_num)
            },
            useQuerystring: true
        }).then(throwIfNot200);

        return {
            reserve_num: body.reserve_num,
            list_qr: body.list_qr
        };
    }
}

/**
 * 購入チケット取り消し
 *
 * @namespace
 */
export namespace deleteReserveInterface {
    export interface Seat {
        /**
         * 座席セクション
         */
        seat_section: string;
        /**
         * 座席番号
         */
        seat_num: string;
    }
    export interface Args {
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
    // export interface Result {
    // }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf deleteReserveInterface
     */
    export async function call(args: Args): Promise<void> {
        await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_reserve/',
            auth: { bearer: await publishAccessToken() },
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
        }).then(throwIfNot200);
    }
}

/**
 * 購入チケット内容抽出
 *
 * @namespace
 */
export namespace stateReserveInterface {
    export interface Args {
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
    export interface Ticket {
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
    export interface Result {
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
    export async function call(args: Args): Promise<Result> {
        const body = await request.get({
            simple: false,
            url: <string>process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve/',
            auth: { bearer: await publishAccessToken() },
            json: true,
            qs: {
                theater_code: args.theater_code,
                reserve_num: args.reserve_num,
                tel_num: args.tel_num
            },
            useQuerystring: true
        }).then(throwIfNot200);

        return {
            date_jouei: body.date_jouei,
            title_code: body.title_code,
            title_branch_num: body.title_branch_num,
            time_begin: body.time_begin,
            screen_code: body.screen_code,
            list_ticket: body.list_ticket
        };
    }
}
