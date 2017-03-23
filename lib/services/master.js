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
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<TheaterResult>}
 */
function theater(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/theater/',
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return {
            theater_code: body.theater_code,
            theater_name: body.theater_name,
            theater_name_eng: body.theater_name_eng,
            theater_name_kana: body.theater_name_kana
        };
    });
}
exports.theater = theater;
/**
 * 作品マスター抽出
 * @memberOf services.master
 * @function title
 * @param {TitleArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<TitleResult[]>}
 */
function title(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/title/',
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return body.list_title;
    });
}
exports.title = title;
/**
 * スクリーンマスター抽出
 * @memberOf services.master
 * @function screen
 * @param {ScreenArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<ScreenResult[]>}
 */
function screen(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/screen/',
            auth: { bearer: yield Util.publishAccessToken() },
            json: true
        }).then(Util.throwIfNot200);
        return body.list_screen;
    });
}
exports.screen = screen;
/**
 * スケジュールマスター抽出
 * @memberOf services.master
 * @function schedule
 * @param {ScheduleArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<ScheduleResult[]>}
 */
function schedule(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/schedule/',
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                begin: args.begin,
                end: args.end
            }
        }).then(Util.throwIfNot200);
        return body.list_schedule;
    });
}
exports.schedule = schedule;
/**
 * 券種マスター抽出
 * @memberOf services.master
 * @function ticket
 * @param {ITicketArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<TicketResult[]>}
 */
function ticket(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/ticket/',
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {},
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return body.list_ticket;
    });
}
exports.ticket = ticket;
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
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/mvtk_ticketcode/',
            auth: { bearer: yield Util.publishAccessToken() },
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
    });
}
exports.mvtkTicketcode = mvtkTicketcode;
