"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * マスターサービス
 * @namespace services.master
 */
const request = require("request-promise-native");
const Util = require("../utils/util");
/**
 * 施設マスター抽出
 * @memberOf services.master
 * @function theater
 * @param {TheaterArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @returns {Promise<TheaterResult>}
 */
function theater(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/theater/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return {
            theaterCode: body.theater_code,
            theaterName: body.theater_name,
            theaterNameEng: body.theater_name_eng,
            theaterNameKana: body.theater_name_kana,
            theaterTelNum: body.theater_tel_num
        };
    });
}
exports.theater = theater;
/**
 * 作品マスター抽出
 * @memberOf services.master
 * @function title
 * @param {TitleArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @returns {Promise<TitleResult[]>}
 */
function title(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/title/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return body.list_title.map((value) => {
            return {
                titleCode: value.title_code,
                titleBranchNum: value.title_branch_num,
                titleName: value.titleName,
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
    });
}
exports.title = title;
/**
 * スクリーンマスター抽出
 * @memberOf services.master
 * @function screen
 * @param {ScreenArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @returns {Promise<ScreenResult[]>}
 */
function screen(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/screen/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return body.list_screen.map((value) => {
            return {
                screenCode: value.screen_code,
                screenName: value.screen_name,
                screenNameEng: value.screen_name_eng,
                listSeat: value.list_seat.map((seat) => {
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
    });
}
exports.screen = screen;
/**
 * 先行予約フラグ
 * @enum FlgEarlyBooking
 */
var FlgEarlyBooking;
(function (FlgEarlyBooking) {
    /**
     * 先行予約でない
     */
    FlgEarlyBooking["NotPreOrder"] = "0";
    /**
     * 先行予約
     */
    FlgEarlyBooking["EarlyBooking"] = "1";
})(FlgEarlyBooking = exports.FlgEarlyBooking || (exports.FlgEarlyBooking = {}));
/**
 * スケジュールマスター抽出
 * @memberOf services.master
 * @function schedule
 * @param {ScheduleArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @returns {Promise<ScheduleResult[]>}
 */
function schedule(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/schedule/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                begin: args.begin,
                end: args.end
            }
        }).then(Util.throwIfNot200);
        return body.list_schedule.map((value) => {
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
    });
}
exports.schedule = schedule;
/**
 * 券種マスター抽出
 * @memberOf services.master
 * @function ticket
 * @param {ITicketArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @returns {Promise<TicketResult[]>}
 */
function ticket(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/ticket/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {},
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return body.list_ticket.map((value) => {
            return {
                ticketCode: value.ticket_code,
                ticketName: value.ticket_name,
                ticketNameKana: value.ticket_name_kana,
                ticketNameEng: value.ticket_name_eng
            };
        });
    });
}
exports.ticket = ticket;
/**
 * 各種区分マスター抽出
 * @memberOf services.master
 * @function kubunName
 * @param {IKubunNameArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @param {string} args.kubunClass 区分種別
 * @returns {Promise<IKubunNameResult[]>}
 */
function kubunName(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/kubun_name/?kubun_class=${args.kubunClass}`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return body.list_kubun.map((value) => {
            return {
                kubunCode: value.kubun_code,
                kubunName: value.kubun_name,
                kubunNameEng: value.kubunName_eng,
                kubunAddPrice: value.kubun_add_price
            };
        });
    });
}
exports.kubunName = kubunName;
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
function mvtkTicketcode(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/mvtk_ticketcode/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
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
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return {
            ticketCode: body.ticket_code,
            ticketName: body.ticket_name,
            ticketNameKana: body.ticket_name_kana,
            ticketNameEng: body.ticket_name_eng,
            addPrice: body.add_price,
            addPriceGlasses: body.add_price_glasses
        };
    });
}
exports.mvtkTicketcode = mvtkTicketcode;
