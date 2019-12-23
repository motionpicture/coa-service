import { OK } from 'http-status';

import * as ReserveFactory from '../factory/reserve';

import { Service } from '../service';

/**
 * 予約サービス
 */
export class ReserveService extends Service {

    /**
     * 空席状況
     * @param args.theaterCode 施設コード
     * @param args.begin 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
     * @param args.end 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
     */
    public async countFreeSeat(args: ReserveFactory.ICountFreeSeatArgs): Promise<ReserveFactory.ICountFreeSeatResult> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/count_free_seat/`,
                method: 'GET',
                qs: {
                    begin: args.begin,
                    end: args.end
                }
            },
            [OK]
        );

        return {
            theaterCode: body.theater_code,
            listDate: body.list_date.map((date: any) => {
                return {
                    dateJouei: date.date_jouei,
                    listPerformance: date.list_performance.map((performance: any) => {
                        return {
                            titleCode: performance.title_code,
                            titleBranchNum: performance.title_branch_num,
                            timeBegin: performance.time_begin,
                            screenCode: performance.screen_code,
                            cntReserveMax: performance.cnt_reserve_max,
                            cntReserveFree: performance.cnt_reserve_free
                        };
                    }),
                    cntPerformance: date.cnt_performance
                };
            })
        };
    }

    /**
     * 座席予約状態抽出
     * @param args.theaterCode 施設コード
     * @param args.dateJouei 上映日
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.timeBegin 上映時刻
     * @param args.screenCode スクリーンコード
     */
    public async stateReserveSeat(args: ReserveFactory.IStateReserveSeatArgs): Promise<ReserveFactory.IStateReserveSeatResult> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/state_reserve_seat/`,
                method: 'GET',
                qs: {
                    date_jouei: args.dateJouei,
                    title_code: args.titleCode,
                    title_branch_num: args.titleBranchNum,
                    time_begin: args.timeBegin,
                    screen_code: args.screenCode
                }
            },
            [OK]
        );

        return {
            cntReserveFree: body.cnt_reserve_free,
            cntSeatLine: body.cnt_seat_line,
            listSeat: body.list_seat.map((seat: {
                seat_section: string;
                list_free_seat: {
                    seat_num: string;
                    spseat_kbn: string;
                    spseat_add1: number;
                    spseat_add2: number;
                }[];
            }) => {
                return {
                    seatSection: seat.seat_section,
                    listFreeSeat: seat.list_free_seat.map((freeSeat) => {
                        return {
                            seatNum: freeSeat.seat_num,
                            spseatKbn: freeSeat.spseat_kbn,
                            spseatAdd1: freeSeat.spseat_add1,
                            spseatAdd2: freeSeat.spseat_add2
                        };
                    })
                };
            })
        };
    }

    /**
     * 座席仮予約
     * @param args.theaterCode 劇場コード
     * @param args.dateJouei 上映日
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.timeBegin 上映時刻
     * @param args.screenCode スクリーンコード
     * @param args.screenCode 予約座席リスト
     * @param args.screenCode.seatSection 座席セクション
     * @param args.screenCode.seatNum 座席番号
     */
    public async updTmpReserveSeat(args: ReserveFactory.IUpdTmpReserveSeatArgs): Promise<ReserveFactory.IUpdTmpReserveSeatResult> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/upd_tmp_reserve_seat/`,
                method: 'GET',
                qs: {
                    date_jouei: args.dateJouei,
                    title_code: args.titleCode,
                    title_branch_num: args.titleBranchNum,
                    time_begin: args.timeBegin,
                    cnt_reserve_seat: args.listSeat.length,
                    seat_section: args.listSeat.map((value) => value.seatSection),
                    seat_num: args.listSeat.map((value) => value.seatNum),
                    screen_code: args.screenCode
                }
            },
            [OK]
        );

        return {
            tmpReserveNum: body.tmp_reserve_num,
            listTmpReserve: body.list_tmp_reserve.map((tmpReserve: any) => {
                return {
                    seatSection: tmpReserve.seat_section,
                    seatNum: tmpReserve.seat_num
                };
            })
        };
    }

    /**
     * 座席仮予約削除
     * @param args.theaterCode 施設コード
     * @param args.dateJouei 上映日
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.timeBegin 上映時刻
     * @param args.tmpReserveNum 座席チケット仮予約番号
     */
    public async delTmpReserve(args: ReserveFactory.IDelTmpReserveArgs): Promise<void> {
        await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/del_tmp_reserve/`,
                method: 'GET',
                qs: {
                    date_jouei: args.dateJouei,
                    title_code: args.titleCode,
                    title_branch_num: args.titleBranchNum,
                    time_begin: args.timeBegin,
                    tmp_reserve_num: args.tmpReserveNum
                }
            },
            [OK]
        );
    }

    /**
     * 座席本予約
     * @param args.theaterCode 施設コード
     * @param args.dateJouei 上映日
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.timeBegin 上映時刻
     * @param args.screenCode 座席チケット仮予約番号
     * @param args.tmpReserveNum スクリーンコード
     * @param args.reserveName 予約者名
     * @param args.reserveNameJkana 予約者名（かな）※予約者名（かな）：（かな姓）+空白+（かな名）
     * @param args.telNum 電話番号
     * @param args.mailAddr メールアドレス
     * @param args.reserveAmount 予約金額
     * @param args.listTicket 価格情報リスト
     * @param args.listTicket.ticketCode チケットコード
     * @param args.listTicket.stdPrice 標準単価
     * @param args.listTicket.addPrice 加算単価
     * @param args.listTicket.spseatAdd1 特別席加算額１ 特別席加算額の興行収入部分
     * @param args.listTicket.spseatAdd2 特別席加算額２ 特別席加算額のミールクーポン部分
     * @param args.listTicket.disPrice 割引額
     * @param args.listTicket.salePrice 金額 ※価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）※標準単価+加算単価-割引額
     * @param args.listTicket.mvtkAppPrice ムビチケ計上単価 ※ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
     * @param args.listTicket.ticketCount 枚数
     * @param args.listTicket.spseatKbn 特別席区分 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
     * @param args.listTicket.seatNum 座席番号
     * @param args.listTicket.addGlasses メガネ単価 ※メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
     * @param args.listTicket.kbnEisyahousiki ムビチケ連携情報より
     * @param args.listTicket.mvtkNum ムビチケ連携情報より（ムビチケ以外は""）
     * @param args.listTicket.mvtkKbnDenshiken ムビチケ連携情報より（01：電子、02：紙 ※ムビチケ以外は"00"をセット）
     * @param args.listTicket.mvtkKbnMaeuriken ムビチケ連携情報より（01：全国券、02：劇場券 ※ムビチケ以外は"00"をセット）
     * @param args.listTicket.mvtkKbnKensyu ムビチケ連携情報より（01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ ※ムビチケ以外は"00"をセット）
     * @param args.listTicket.mvtkSalesPrice ムビチケ連携情報より（ムビチケ以外は0をセット）
     */
    public async updReserve(args: ReserveFactory.IUpdReserveArgs): Promise<ReserveFactory.IUpdReserveResult> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/upd_reserve/`,
                method: 'GET',
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
                    spseat_add1: args.listTicket.map((value) => value.spseatAdd1),
                    spseat_add2: args.listTicket.map((value) => value.spseatAdd2),
                    dis_price: args.listTicket.map((value) => value.disPrice),
                    sale_price: args.listTicket.map((value) => value.salePrice),
                    mvtk_app_price: args.listTicket.map((value) => value.mvtkAppPrice),
                    ticket_count: args.listTicket.map((value) => value.ticketCount),
                    spseat_kbn: args.listTicket.map((value) => value.spseatKbn),
                    seat_num: args.listTicket.map((value) => value.seatNum),
                    add_glasses: args.listTicket.map((value) => value.addGlasses),
                    kbn_eisyahousiki: args.listTicket.map((value) => value.kbnEisyahousiki),
                    mvtk_num: args.listTicket.map((value) => value.mvtkNum),
                    mvtk_kbn_denshiken: args.listTicket.map((value) => value.mvtkKbnDenshiken),
                    mvtk_kbn_maeuriken: args.listTicket.map((value) => value.mvtkKbnMaeuriken),
                    mvtk_kbn_kensyu: args.listTicket.map((value) => value.mvtkKbnKensyu),
                    mvtk_sales_price: args.listTicket.map((value) => value.mvtkSalesPrice)
                }
            },
            [OK]
        );

        return {
            reserveNum: body.reserve_num,
            listQr: body.list_qr.map((qr: any) => {
                return {
                    seatSection: qr.seat_section,
                    seatNum: qr.seat_num,
                    seatQrcode: qr.seat_qrcode
                };
            })
        };
    }

    /**
     * 購入チケット取り消し
     * @param args.theaterCode 施設コード
     * @param args.dateJouei 上映日
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.timeBegin 上映時刻
     * @param args.reserveNum 座席チケット購入番号
     * @param args.telNum 電話番号
     * @param args.screenCode 座席単位削除リスト
     * @param args.screenCode 座席単位削除リスト
     * @param args.screenCode.seatSection 座席セクション
     * @param args.screenCode.seatNum 座席番号
     */
    public async delReserve(args: ReserveFactory.IDelReserveArgs): Promise<void> {
        await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/del_reserve/`,
                method: 'GET',
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
                }
            },
            [OK]
        );
    }

    /**
     * 購入チケット内容抽出
     * @param args.theaterCode 施設コード
     * @param args.reserveNum 座席チケット購入番号
     * @param args.telNum 電話番号
     */
    public async stateReserve(args: ReserveFactory.IStateReserveArgs): Promise<ReserveFactory.IStateReserveResult | null> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/state_reserve/`,
                method: 'GET',
                qs: {
                    theater_code: args.theaterCode,
                    reserve_num: args.reserveNum,
                    tel_num: args.telNum
                }
            },
            [OK]
        );

        // 該当予約がなくてもステータス0が返ってくる
        if ((<ReserveFactory.IStateReserveTicket[]>body.list_ticket).length === 0) {
            return null;
        }

        return {
            dateJouei: body.date_jouei,
            titleCode: body.title_code,
            titleBranchNum: body.title_branch_num,
            timeBegin: body.time_begin,
            screenCode: body.screen_code,
            listTicket: body.list_ticket.map((ticket: any) => {
                return {
                    ticketCode: ticket.ticket_code,
                    ticketName: ticket.ticket_name,
                    ticketPrice: ticket.ticket_price,
                    ticketCount: ticket.ticket_count,
                    seatSection: ticket.seat_section,
                    seatNum: ticket.seat_num,
                    seatQrcode: ticket.seat_qrcode,
                    addGlasses: ticket.add_glasses
                };
            })
        };
    }

    /**
     * 販売可能チケット情報
     * @param args.theaterCode 施設コード
     * @param args.dateJouei 上映日
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.timeBegin 上映時刻
     * @param args.flgMember 会員用フラグ
     */
    public async salesTicket(args: ReserveFactory.ISalesTicketArgs): Promise<ReserveFactory.ISalesTicketResult[]> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/sales_ticket/`,
                method: 'GET',
                qs: {
                    date_jouei: args.dateJouei,
                    title_code: args.titleCode,
                    title_branch_num: args.titleBranchNum,
                    time_begin: args.timeBegin,
                    // 念のため互換性を保つ次期アップデートでデフォルト値削除
                    flg_member: (args.flgMember === undefined) ? ReserveFactory.FlgMember.NonMember : args.flgMember
                }
            },
            [OK]
        );

        return body.list_ticket.map((value: any): ReserveFactory.ISalesTicketResult => {
            return {
                ticketCode: value.ticket_code,
                ticketName: value.ticket_name,
                ticketNameKana: value.ticket_name_kana,
                ticketNameEng: value.ticket_name_eng,
                stdPrice: value.std_price,
                addPrice: value.add_price,
                salePrice: value.sale_price,
                limitCount: value.limit_count,
                limitUnit: value.limit_unit,
                ticketNote: value.ticket_note,
                addGlasses: value.add_glasses
            };
        });
    }
}
