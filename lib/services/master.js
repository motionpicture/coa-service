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
 * マスターサービス
 * @namespace services.master
 */
const request = require("request-promise-native");
const Util = require("../utils/util");
/**
 * 施設マスター抽出
 * @memberOf services.master
 * @function findTheater
 * @param {FindTheaterArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindTheaterResult>}
 */
function findTheater(args) {
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
exports.findTheater = findTheater;
/**
 * 作品マスター抽出
 * @memberOf services.master
 * @function findFilmsByTheaterCode
 * @param {FindFilmsByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindFilmsByTheaterCodeResult[]>}
 */
function findFilmsByTheaterCode(args) {
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
exports.findFilmsByTheaterCode = findFilmsByTheaterCode;
/**
 * スクリーンマスター抽出
 * @memberOf services.master
 * @function findScreensByTheaterCode
 * @param {FindScreensByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindScreensByTheaterCodeResult[]>}
 */
function findScreensByTheaterCode(args) {
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
exports.findScreensByTheaterCode = findScreensByTheaterCode;
/**
 * スケジュールマスター抽出
 * @memberOf services.master
 * @function findPerformancesByTheaterCode
 * @param {FindPerformancesByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindPerformancesByTheaterCodeResult[]>}
 */
function findPerformancesByTheaterCode(args) {
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
exports.findPerformancesByTheaterCode = findPerformancesByTheaterCode;
/**
 * 券種マスター抽出
 * @memberOf services.master
 * @function findTicketsByTheaterCode
 * @param {FindTicketsByTheaterCodeArgs} args
 * @param {string} args.theater_code 劇場コード
 * @returns {Promise<FindTicketsByTheaterCodeResult[]>}
 */
function findTicketsByTheaterCode(args) {
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
exports.findTicketsByTheaterCode = findTicketsByTheaterCode;
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
function mvtkTicketcode(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: process.env.COA_ENDPOINT + '/api/v1/theater/' + args.theater_code + '/state_reserve/',
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                theater_code: args.theater_code,
                nshiken: args.kbn_denshiken,
                kbn_maeuriken: args.kbn_maeuriken,
                kbn_kensyu: args.kbn_kensyu,
                sales_price: args.sales_price,
                app_price: args.app_price
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return body.ticket_code;
    });
}
exports.mvtkTicketcode = mvtkTicketcode;
