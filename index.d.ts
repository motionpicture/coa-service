export declare function initialize(args: {
    endpoint: string;
    refresh_token: string;
}): void;
export declare namespace findTheaterInterface {
    interface Args {
        theater_code: string;
    }
    interface Result {
        theater_code: string;
        theater_name: string;
        theater_name_eng: string;
        theater_name_kana: string;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace findFilmsByTheaterCodeInterface {
    interface Args {
        theater_code: string;
    }
    interface Result {
        title_code: string;
        title_branch_num: string;
        title_name: string;
        title_name_kana: string;
        title_name_eng: string;
        title_name_short: string;
        title_name_orig: string;
        kbn_eirin: string;
        kbn_eizou: string;
        kbn_joueihousiki: string;
        kbn_jimakufukikae: string;
        show_time: number;
        date_begin: string;
        date_end: string;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace findScreensByTheaterCodeInterface {
    interface Args {
        theater_code: string;
    }
    interface Result {
        screen_code: string;
        screen_name: string;
        screen_name_eng: string;
        list_seat: Array<{
            seat_section: string;
            seat_num: string;
            flg_special: string;
            flg_hc: string;
            flg_pair: string;
            flg_free: string;
            flg_spare: string;
        }>;
    }
    function call(args: Args): Promise<Array<Result>>;
}
export declare namespace findPerformancesByTheaterCodeInterface {
    interface Args {
        theater_code: string;
        begin: string;
        end: string;
    }
    interface Result {
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        time_end: string;
        screen_code: string;
        trailer_time: number;
        kbn_service: string;
        kbn_acoustic: string;
        name_service_day: string;
    }
    function call(args: Args): Promise<Array<Result>>;
}
export declare namespace reserveSeatsTemporarilyInterface {
    interface Args {
        theater_code: string;
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        screen_code: string;
        list_seat: Array<{
            seat_section: string;
            seat_num: string;
        }>;
    }
    interface Result {
        tmp_reserve_num: number;
        list_tmp_reserve: Array<{
            seat_section: string;
            seat_num: string;
            sts_tmp_reserve: string;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace deleteTmpReserveInterface {
    interface Args {
        theater_code: string;
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        tmp_reserve_num: string;
    }
    interface Result {
    }
    function call(args: Args): Promise<void>;
}
export declare namespace getStateReserveSeatInterface {
    interface Args {
        theater_code: string;
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        screen_code: string;
    }
    interface Result {
        cnt_reserve_free: number;
        cnt_seat_line: number;
        list_seat: Array<{
            seat_section: string;
            list_free_seat: Array<{
                seat_num: string;
            }>;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace countFreeSeatInterface {
    interface Args {
        theater_code: string;
        begin: string;
        end: string;
    }
    interface Result {
        theater_code: string;
        list_date: Array<{
            date_jouei: string;
            list_performance: Array<{
                title_code: string;
                title_branch_num: string;
                time_begin: string;
                screen_code: string;
                cnt_reserve_max: number;
                cnt_reserve_free: number;
            }>;
            cnt_performance: number;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace salesTicketInterface {
    interface Args {
        theater_code: string;
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
    }
    interface Result {
        list_ticket: Array<{
            ticket_code: string;
            ticket_name: string;
            ticket_name_kana: string;
            ticket_name_eng: string;
            std_price: number;
            add_price: number;
            sale_price: number;
            limit_count: number;
            limit_unit: string;
            ticket_note: string;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace ticketInterface {
    interface Args {
        theater_code: string;
    }
    interface Result {
        list_ticket: Array<{
            ticket_code: string;
            ticket_name: string;
            ticket_name_kana: string;
            ticket_name_eng: string;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace updateReserveInterface {
    interface Args {
        theater_code: string;
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        tmp_reserve_num: string;
        reserve_name: string;
        reserve_name_jkana: string;
        tel_num: string;
        mail_addr: string;
        reserve_amount: number;
        list_ticket: Array<{
            ticket_code: string;
            std_price: number;
            add_price: number;
            dis_price: number;
            sale_price: number;
            ticket_count: number;
            seat_num: string;
        }>;
    }
    interface Result {
        reserve_num: string;
        list_qr: Array<{
            seat_section: string;
            seat_num: string;
            seat_qrcode: string;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
export declare namespace deleteReserveInterface {
    interface Args {
        theater_code: string;
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        reserve_num: string;
        tel_num: string;
        list_seat: Array<{
            seat_section: string;
            seat_num: string;
        }>;
    }
    interface Result {
    }
    function call(args: Args): Promise<void>;
}
export declare namespace stateReserveInterface {
    interface Args {
        theater_code: string;
        reserve_num: string;
        tel_num: string;
    }
    interface Result {
        date_jouei: string;
        title_code: string;
        title_branch_num: string;
        time_begin: string;
        list_reserve_seat: Array<{
            seat_num: string;
        }>;
        list_ticket: Array<{
            ticket_code: string;
            ticket_name: string;
            ticket_price: number;
            ticket_count: number;
        }>;
    }
    function call(args: Args): Promise<Result>;
}
