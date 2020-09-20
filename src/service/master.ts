import { OK } from 'http-status';

import * as MasterFactory from '../factory/master';

import { Service } from '../service';

/**
 * マスターサービス
 */
export class MasterService extends Service {
    /**
     * 施設マスター抽出
     * @param args.theaterCode 劇場コード
     */
    public async theater(args: MasterFactory.ITheaterArgs): Promise<MasterFactory.ITheaterResult> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/theater/`,
                method: 'GET'
            },
            [OK]
        );

        return {
            theaterCode: body.theater_code,
            theaterName: body.theater_name,
            theaterNameEng: body.theater_name_eng,
            theaterNameKana: body.theater_name_kana,
            theaterTelNum: body.theater_tel_num
        };
    }

    /**
     * 作品マスター抽出
     * @param args.theaterCode 劇場コード
     */
    public async title(args: MasterFactory.ITitleArgs): Promise<MasterFactory.ITitleResult[]> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/title/`,
                method: 'GET'
            },
            [OK]
        );

        return body.list_title.map((value: any): MasterFactory.ITitleResult => {
            return {
                titleCode: value.title_code,
                titleBranchNum: value.title_branch_num,
                titleName: value.title_name,
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
    }

    /**
     * スクリーンマスター抽出
     * @param args.theaterCode 劇場コード
     */
    public async screen(args: MasterFactory.IScreenArgs): Promise<MasterFactory.IScreenResult[]> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/screen/`,
                method: 'GET'
            },
            [OK]
        );

        return body.list_screen.map((value: any): MasterFactory.IScreenResult => {
            return {
                screenCode: value.screen_code,
                screenName: value.screen_name,
                screenNameEng: value.screen_name_eng,
                listSeat: value.list_seat.map((seat: any): MasterFactory.IScreenSeat => {
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
    }

    /**
     * スケジュールマスター抽出
     * @param args.theaterCode 劇場コード
     */
    public async schedule(
        args: MasterFactory.IScheduleArgs
    ): Promise<MasterFactory.IScheduleResult[]> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/schedule/`,
                method: 'GET',
                qs: {
                    begin: args.begin,
                    end: args.end
                }
            },
            [OK]
        );

        return body.list_schedule.map((value: any): MasterFactory.IScheduleResult => {
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
    }

    /**
     * 券種マスター抽出
     * @param args.theaterCode 劇場コード
     */
    public async ticket(args: MasterFactory.ITicketArgs): Promise<MasterFactory.ITicketResult[]> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/ticket/`,
                method: 'GET'
            },
            [OK]
        );

        return body.list_ticket.map((value: any): MasterFactory.ITicketResult => {
            return {
                ticketCode: value.ticket_code,
                ticketName: value.ticket_name,
                ticketNameKana: value.ticket_name_kana,
                ticketNameEng: value.ticket_name_eng,
                // tslint:disable-next-line:no-single-line-block-comment
                usePoint: (value.use_point !== undefined) ? value.use_point : /* istanbul ignore next */0,
                // tslint:disable-next-line:no-single-line-block-comment
                flgMember: (value.flg_member !== undefined) ? value.flg_member : /* istanbul ignore next */MasterFactory.FlgMember.NonMember
            };
        });
    }

    /**
     * 各種区分マスター抽出
     * @memberOf services.master
     * @param args.theaterCode 劇場コード
     * @param args.kubunClass 区分種別
     */
    public async kubunName(args: MasterFactory.IKubunNameArgs): Promise<MasterFactory.IKubunNameResult[]> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/kubun_name/`,
                method: 'GET',
                qs: {
                    kubun_class: args.kubunClass
                }
            },
            [OK]
        );

        return body.list_kubun.map((value: any): MasterFactory.IKubunNameResult => {
            return {
                kubunCode: value.kubun_code,
                kubunName: value.kubun_name,
                kubunNameEng: value.kubunName_eng,
                kubunAddPrice: value.kubun_add_price
            };
        });
    }

    /**
     * ムビチケチケットコード取得
     * @param args.theaterCode 劇場コード
     * @param args.kbnDenshiken 電子券区分
     * @param args.kbnMaeuriken 前売券区分
     * @param args.kbnKensyu 券種区分
     * @param args.salesPrice 販売単価
     * @param args.appPrice 計上単価
     * @param args.kbnEisyahousiki 映写方式区分
     * @param args.titleCode 作品コード
     * @param args.titleBranchNum 作品枝番
     * @param args.dateJouei 上映日
     */
    public async mvtkTicketcode(args: MasterFactory.IMvtkTicketcodeArgs): Promise<MasterFactory.IMvtkTicketcodeResult> {
        const body = await this.request(
            {
                uri: `/api/v1/theater/${args.theaterCode}/mvtk_ticketcode/`,
                method: 'GET',
                qs: {
                    theater_code: args.theaterCode,
                    kbn_denshiken: args.kbnDenshiken,
                    kbn_maeuriken: args.kbnMaeuriken,
                    kbn_kensyu: args.kbnKensyu,
                    sales_price: args.salesPrice,
                    app_price: args.appPrice,
                    kbn_eisyahousiki: args.kbnEisyahousiki,
                    title_code: args.titleCode,
                    title_branch_num: args.titleBranchNum,
                    date_jouei: args.dateJouei
                }
            },
            [OK]
        );

        return {
            ticketCode: body.ticket_code,
            ticketName: body.ticket_name,
            ticketNameKana: body.ticket_name_kana,
            ticketNameEng: body.ticket_name_eng,
            addPrice: body.add_price,
            addPriceGlasses: body.add_price_glasses
        };
    }

}
