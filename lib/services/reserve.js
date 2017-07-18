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
 * 予約サービス
 * @namespace services.reserve
 */
const request = require("request-promise-native");
const Util = require("../utils/util");
/**
 * 空席状況
 * @memberof services.reserve
 * @function countFreeSeat
 * @param {ICountFreeSeatArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {string} args.begin 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
 * @param {string} args.end 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
 * @returns {Promise<ICountFreeSeatResult>}
 */
function countFreeSeat(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/count_free_seat/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                begin: args.begin,
                end: args.end
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return {
            theaterCode: body.theater_code,
            listDate: body.list_date
        };
    });
}
exports.countFreeSeat = countFreeSeat;
/**
 * 座席予約状態抽出
 * @memberof services.reserve
 * @function stateReserveSeat
 * @param {IStateReserveSeatArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {string} args.dateJouei 上映日
 * @param {string} args.titleCode 作品コード
 * @param {string} args.titleBranchNum 作品枝番
 * @param {string} args.timeBegin 上映時刻
 * @param {string} args.screenCode スクリーンコード
 * @returns {Promise<IStateReserveSeatResult>}
 */
function stateReserveSeat(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/state_reserve_seat/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                screen_code: args.screenCode
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return {
            cntReserveFree: body.cnt_reserve_free,
            cntSeatLine: body.cnt_seat_line,
            listSeat: body.list_seat
        };
    });
}
exports.stateReserveSeat = stateReserveSeat;
/**
 * 座席仮予約
 * @memberof services.reserve
 * @function updTmpReserveSeat
 * @param {IUpdTmpReserveSeatArgs} args
 * @param {string} args.theaterCode 劇場コード
 * @param {string} args.dateJouei 上映日
 * @param {string} args.titleCode 作品コード
 * @param {string} args.titleBranchNum 作品枝番
 * @param {string} args.timeBegin 上映時刻
 * @param {string} args.screenCode スクリーンコード
 * @param {string} args.screenCode 予約座席リスト
 * @param {string} args.screenCode.seatSection 座席セクション
 * @param {string} args.screenCode.seatNum 座席番号
 * @returns {Promise<IUpdTmpReserveSeatResult>}
 */
function updTmpReserveSeat(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/upd_tmp_reserve_seat/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                cnt_reserve_seat: args.listSeat.length,
                seat_section: args.listSeat.map((value) => value.seatSection),
                seat_num: args.listSeat.map((value) => value.seatNum),
                screen_code: args.screenCode
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return {
            tmp_reserve_num: body.tmpReserveNum,
            list_tmp_reserve: body.listTmpReserve
        };
    });
}
exports.updTmpReserveSeat = updTmpReserveSeat;
/**
 * 座席仮予約削除
 * @memberof services.reserve
 * @function delTmpReserve
 * @param {IDelTmpReserveArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {string} args.dateJouei 上映日
 * @param {string} args.titleCode 作品コード
 * @param {string} args.titleBranchNum 作品枝番
 * @param {string} args.timeBegin 上映時刻
 * @param {number} args.tmpReserveNum 座席チケット仮予約番号
 * @returns {Promise<void>}
 */
function delTmpReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/del_tmp_reserve/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                tmp_reserve_num: args.tmpReserveNum
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
    });
}
exports.delTmpReserve = delTmpReserve;
/**
 * 座席本予約
 * @memberof services.reserve
 * @function updReserve
 * @param {IUpdReserveArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {string} args.dateJouei 上映日
 * @param {string} args.titleCode 作品コード
 * @param {string} args.titleBranchNum 作品枝番
 * @param {string} args.timeBegin 上映時刻
 * @param {string} args.screenCode 座席チケット仮予約番号
 * @param {number} args.tmpReserveNum スクリーンコード
 * @param {string} args.reserveName 予約者名
 * @param {string} args.reserveNameJkana 予約者名（かな）※予約者名（かな）：（かな姓）+空白+（かな名）
 * @param {string} args.telNum 電話番号
 * @param {string} args.mailAddr メールアドレス
 * @param {string} args.reserveAmount 予約金額
 * @param {IUpdReserveTicket[]} args.listTicket 価格情報リスト
 * @param {string} args.listTicket.ticketCode チケットコード
 * @param {number} args.listTicket.stdPrice 標準単価
 * @param {number} args.listTicket.addPrice 加算単価
 * @param {number} args.listTicket.disPrice 割引額
 * @param {number} args.listTicket.salePrice 金額 ※価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）　※標準単価+加算単価-割引額
 * @param {number} args.listTicket.mvtkAppPrice ムビチケ計上単価 ※ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
 * @param {number} args.listTicket.ticketCount 枚数
 * @param {string} args.listTicket.seatNum 座席番号
 * @param {number} args.listTicket.addGlasses メガネ単価 ※メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
 * @param {string} args.listTicket.kbnEisyahousiki ムビチケ連携情報より
 * @param {string} args.listTicket.mvtkNum ムビチケ連携情報より（ムビチケ以外は""）
 * @param {string} args.listTicket.mvtkKbnDenshiken ムビチケ連携情報より（01：電子、02：紙　※ムビチケ以外は"00"をセット）
 * @param {string} args.listTicket.mvtkKbnMaeuriken ムビチケ連携情報より（01：全国券、02：劇場券　※ムビチケ以外は"00"をセット）
 * @param {string} args.listTicket.mvtkKbnKensyu ムビチケ連携情報より（01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ、…　※ムビチケ以外は"00"をセット）
 * @param {number} args.listTicket.mvtkSalesPrice ムビチケ連携情報より（ムビチケ以外は0をセット）
 * @returns {Promise<IUpdReserveResult>}
 */
function updReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/upd_reserve/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                theater_code: args.theaterCode,
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                tmp_reserve_num: args.tmpReserveNum,
                reserve_name: args.reserveName,
                reserve_name_jkana: args.reserveNameJkana,
                tel_num: args.telNum,
                mail_addr: args.mailAddr,
                reserve_amount: args.reserveAmount,
                ticket_code: args.listTicket.map((value) => value.ticketCode),
                std_price: args.listTicket.map((value) => value.stdPrice),
                add_price: args.listTicket.map((value) => value.addPrice),
                dis_price: args.listTicket.map((value) => value.disPrice),
                sale_price: args.listTicket.map((value) => value.salePrice),
                mvtk_app_price: args.listTicket.map((value) => value.mvtkAppPrice),
                ticket_count: args.listTicket.map((value) => value.ticketCount),
                seat_num: args.listTicket.map((value) => value.seatNum),
                add_glasses: args.listTicket.map((value) => value.addGlasses),
                kbn_eisyahousiki: args.listTicket.map((value) => value.kbnEisyahousiki),
                mvtk_num: args.listTicket.map((value) => value.mvtkNum),
                mvtk_kbn_denshiken: args.listTicket.map((value) => value.mvtkKbnDenshiken),
                mvtk_kbn_maeuriken: args.listTicket.map((value) => value.mvtkKbnMaeuriken),
                mvtk_kbn_kensyu: args.listTicket.map((value) => value.mvtkKbnKensyu),
                mvtk_sales_price: args.listTicket.map((value) => value.mvtkSalesPrice)
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return {
            reserveNum: body.reserve_num,
            listQr: body.list_qr
        };
    });
}
exports.updReserve = updReserve;
/**
 * 購入チケット取り消し
 * @memberof services.reserve
 * @function delReserve
 * @param {IDelReserveArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {string} args.dateJouei 上映日
 * @param {string} args.titleCode 作品コード
 * @param {string} args.titleBranchNum 作品枝番
 * @param {string} args.timeBegin 上映時刻
 * @param {number} args.reserveNum 座席チケット購入番号
 * @param {string} args.telNum 電話番号
 * @param {IDelReserveSeat[]} args.screenCode 座席単位削除リスト
 * @param {string} args.screenCode 座席単位削除リスト
 * @param {string} args.screenCode.seatSection 座席セクション
 * @param {string} args.screenCode.seatNum 座席番号
 * @returns {Promise<void>}
 */
function delReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/del_reserve/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                theater_code: args.theaterCode,
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                reserve_num: args.reserveNum,
                tel_num: args.telNum,
                seat_section: args.listSeat.map((value) => value.seatSection),
                seat_num: args.listSeat.map((value) => value.seatNum)
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
    });
}
exports.delReserve = delReserve;
/**
 * 購入チケット内容抽出
 * @memberof services.reserve
 * @function stateReserve
 * @param {StateReserveArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {number} args.reserveNum 座席チケット購入番号
 * @param {string} args.telNum 電話番号
 * @returns {Promise<StateReserveResult>}
 */
function stateReserve(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/state_reserve/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                theater_code: args.theaterCode,
                reserve_num: args.reserveNum,
                tel_num: args.telNum
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        // 該当予約がなくてもステータス0が返ってくる
        if (body.list_ticket.length === 0) {
            return null;
        }
        return {
            dateJouei: body.date_jouei,
            titleCode: body.title_code,
            titleBranchNum: body.title_branch_num,
            timeBegin: body.time_begin,
            screenCode: body.screen_code,
            listTicket: body.list_ticket
        };
    });
}
exports.stateReserve = stateReserve;
/**
 * 会員用フラグ
 * @enum FlgMember
 */
var FlgMember;
(function (FlgMember) {
    /**
     * 非会員
     */
    FlgMember["NonMember"] = "0";
    /**
     * 会員
     */
    FlgMember["Member"] = "1";
})(FlgMember = exports.FlgMember || (exports.FlgMember = {}));
/**
 * 販売可能チケット情報
 * @memberof services.reserve
 * @function salesTicket
 * @param {SalesTicketArgs} args
 * @param {string} args.theaterCode 施設コード
 * @param {string} args.dateJouei 上映日
 * @param {string} args.titleCode 作品コード
 * @param {string} args.titleBranchNum 作品枝番
 * @param {string} args.timeBegin 上映時刻
 * @param {string} args.flgMember 会員用フラグ
 */
function salesTicket(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.get({
            simple: false,
            url: `${process.env.COA_ENDPOINT}/api/v1/theater/${args.theaterCode}/sales_ticket/`,
            auth: { bearer: yield Util.publishAccessToken() },
            json: true,
            qs: {
                date_jouei: args.dateJouei,
                title_code: args.titleCode,
                title_branch_num: args.titleBranchNum,
                time_begin: args.timeBegin,
                flg_member: (args.flgMember === undefined) ? FlgMember.NonMember : args.flgMember // 念のため互換性を保つ次期アップデートでデフォルト値削除
            },
            useQuerystring: true
        }).then(Util.throwIfNot200);
        return body.list_ticket.map((value) => {
            return {
                ticketCode: value.ticket_code,
                ticketName: value.ticket_name,
                ticketNameKana: value.ticket_name_kana,
                ticketNameEng: value.ticket_name_eng,
                stdPrice: value.std_price,
                addPrice: value.add_price,
                salePrice: value.sale_price,
                limitCount: value.limit_count,
                ticketNote: value.ticket_note,
                addGlasses: value.add_glasses
            };
        });
    });
}
exports.salesTicket = salesTicket;
