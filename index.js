"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require("request-promise-native");
/**
 * COAAPIの設定値をセットする
 *
 * @method
 */
function initialize(args) {
    process.env.COA_ENDPOINT = args.endpoint;
    process.env.COA_REFRESH_TOKEN = args.refresh_token;
}
exports.initialize = initialize;
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
function publishAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.COA_ENDPOINT || !process.env.COA_REFRESH_TOKEN) {
            throw new Error('coa-service requires initialization.');
        }
        // アクセストークン有効期限チェック
        // ギリギリだと実際呼び出したサービス実行時に間に合わない可能性があるので、余裕を持ってチェック
        const SPARE_TIME = 60000;
        if (!credentials.access_token || Date.parse(credentials.expired_at) < Date.now() - SPARE_TIME) {
            const body = yield request.post({
                simple: false,
                url: process.env.COA_ENDPOINT + '/token/access_token',
                form: {
                    refresh_token: process.env.COA_REFRESH_TOKEN
                },
                json: true
            }).then(throwIfNot200);
            credentials = body;
        }
        return credentials.access_token;
    });
}
function throwIfNot200(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof body === 'string')
            throw new Error(body);
        if (body.message)
            throw new Error(body.message);
        if (body.status !== undefined && body.status !== 0)
            throw new Error(body.status);
        return body;
    });
}
/**
 * 施設マスター抽出
 *
 * @namespace
 */
var findTheaterInterface;
(function (findTheaterInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf findTheaterInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/theater/',
                auth: { bearer: yield publishAccessToken() },
                json: true
            }).then(throwIfNot200);
            return {
                theater_code: body.theater_code,
                theater_name: body.theater_name,
                theater_name_eng: body.theater_name_eng,
                theater_name_kana: body.theater_name_kana
            };
        });
    }
    findTheaterInterface.call = call;
})(findTheaterInterface = exports.findTheaterInterface || (exports.findTheaterInterface = {}));
/**
 * 作品マスター抽出
 *
 * @namespace
 */
var findFilmsByTheaterCodeInterface;
(function (findFilmsByTheaterCodeInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf findFilmsByTheaterCodeInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/title/',
                auth: { bearer: yield publishAccessToken() },
                json: true
            }).then(throwIfNot200);
            return body.list_title;
        });
    }
    findFilmsByTheaterCodeInterface.call = call;
})(findFilmsByTheaterCodeInterface = exports.findFilmsByTheaterCodeInterface || (exports.findFilmsByTheaterCodeInterface = {}));
/**
 * スクリーンマスター抽出
 *
 * @namespace
 */
var findScreensByTheaterCodeInterface;
(function (findScreensByTheaterCodeInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf findScreensByTheaterCodeInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/screen/',
                auth: { bearer: yield publishAccessToken() },
                json: true
            }).then(throwIfNot200);
            return body.list_screen;
        });
    }
    findScreensByTheaterCodeInterface.call = call;
})(findScreensByTheaterCodeInterface = exports.findScreensByTheaterCodeInterface || (exports.findScreensByTheaterCodeInterface = {}));
/**
 * スケジュールマスター抽出
 *
 * @namespace
 */
var findPerformancesByTheaterCodeInterface;
(function (findPerformancesByTheaterCodeInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf findPerformancesByTheaterCodeInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/schedule/',
                auth: { bearer: yield publishAccessToken() },
                json: true,
                qs: {
                    begin: args.begin,
                    end: args.end
                }
            }).then(throwIfNot200);
            return body.list_schedule;
        });
    }
    findPerformancesByTheaterCodeInterface.call = call;
})(findPerformancesByTheaterCodeInterface = exports.findPerformancesByTheaterCodeInterface || (exports.findPerformancesByTheaterCodeInterface = {}));
/**
 * 座席仮予約
 *
 * @namespace
 */
var reserveSeatsTemporarilyInterface;
(function (reserveSeatsTemporarilyInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf reserveSeatsTemporarilyInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_tmp_reserve_seat/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    reserveSeatsTemporarilyInterface.call = call;
})(reserveSeatsTemporarilyInterface = exports.reserveSeatsTemporarilyInterface || (exports.reserveSeatsTemporarilyInterface = {}));
/**
 * 座席仮予約削除
 *
 * @namespace
 */
var deleteTmpReserveInterface;
(function (deleteTmpReserveInterface) {
    // export interface Result {
    // }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf deleteTmpReserveInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_tmp_reserve/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    deleteTmpReserveInterface.call = call;
})(deleteTmpReserveInterface = exports.deleteTmpReserveInterface || (exports.deleteTmpReserveInterface = {}));
/**
 * 座席予約状態抽出
 *
 * @namespace
 */
var getStateReserveSeatInterface;
(function (getStateReserveSeatInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf getStateReserveSeatInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve_seat/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    getStateReserveSeatInterface.call = call;
})(getStateReserveSeatInterface = exports.getStateReserveSeatInterface || (exports.getStateReserveSeatInterface = {}));
/**
 * 空席状況
 *
 * @namespace
 */
var countFreeSeatInterface;
(function (countFreeSeatInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf countFreeSeatInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/count_free_seat/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    countFreeSeatInterface.call = call;
})(countFreeSeatInterface = exports.countFreeSeatInterface || (exports.countFreeSeatInterface = {}));
/**
 * 販売可能チケット情報
 *
 * @namespace
 */
var salesTicketInterface;
(function (salesTicketInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf salesTicketInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/sales_ticket/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    salesTicketInterface.call = call;
})(salesTicketInterface = exports.salesTicketInterface || (exports.salesTicketInterface = {}));
/**
 * 券種マスター抽出
 *
 * @namespace
 */
var ticketInterface;
(function (ticketInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf ticketInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/ticket/',
                auth: { bearer: yield publishAccessToken() },
                json: true,
                qs: {},
                useQuerystring: true
            }).then(throwIfNot200);
            return {
                list_ticket: body.list_ticket
            };
        });
    }
    ticketInterface.call = call;
})(ticketInterface = exports.ticketInterface || (exports.ticketInterface = {}));
/**
 * 座席本予約
 *
 * @namespace
 */
var updateReserveInterface;
(function (updateReserveInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf updateReserveInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/upd_reserve/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    updateReserveInterface.call = call;
})(updateReserveInterface = exports.updateReserveInterface || (exports.updateReserveInterface = {}));
/**
 * 購入チケット取り消し
 *
 * @namespace
 */
var deleteReserveInterface;
(function (deleteReserveInterface) {
    // export interface Result {
    // }
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf deleteReserveInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/del_reserve/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    deleteReserveInterface.call = call;
})(deleteReserveInterface = exports.deleteReserveInterface || (exports.deleteReserveInterface = {}));
/**
 * 購入チケット内容抽出
 *
 * @namespace
 */
var stateReserveInterface;
(function (stateReserveInterface) {
    /**
     * 呼出
     *
     * @param {Args} args
     * @memberOf stateReserveInterface
     */
    function call(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield request.get({
                simple: false,
                url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve/',
                auth: { bearer: yield publishAccessToken() },
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
        });
    }
    stateReserveInterface.call = call;
})(stateReserveInterface = exports.stateReserveInterface || (exports.stateReserveInterface = {}));
