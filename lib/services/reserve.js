"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 予約サービス
 * @namespace services.reserve
 */
const request = require("request-promise-native");
const Util = require("../utils/util");
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
function reserveSeatsTemporarily(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_tmp_reserve_seat/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.reserveSeatsTemporarily = reserveSeatsTemporarily;
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
function deleteTmpReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_tmp_reserve/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.deleteTmpReserve = deleteTmpReserve;
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
function getStateReserveSeat(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve_seat/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.getStateReserveSeat = getStateReserveSeat;
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
function countFreeSeat(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/count_free_seat/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.countFreeSeat = countFreeSeat;
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
function salesTicket(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/sales_ticket/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.salesTicket = salesTicket;
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
function updateReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_reserve/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.updateReserve = updateReserve;
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
function deleteReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_reserve/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.deleteReserve = deleteReserve;
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
function stateReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.stateReserve = stateReserve;
