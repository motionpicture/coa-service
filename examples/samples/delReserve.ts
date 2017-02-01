import COA = require("../../index");

COA.initialize({
    endpoint: "http://coacinema.aa0.netvolante.jp",
    refresh_token: "eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNDc5MjYwODQ4LCJhdXRoX2lkIjoiMzMxNSJ9.jx-w7D3YLP7UbY4mzJYC9xr368FiKWcpR2_L9mZfehQ"
});

COA.deleteReserveInterface.call({
    /** 施設コード */
    theater_code: "001",
    /** 上映日 */
    date_jouei: "20170210",
    /** 作品コード */
    title_code: "8513",
    /** 作品枝番 */
    title_branch_num: "0",
    /** 上映時刻 */
    time_begin: "1010",
    /** 座席チケット購入番号 */
    reserve_num: 11586,
    /** 電話番号 */
    tel_num: "09012345678",
    /** 座席単位削除リスト */
    list_seat: [
        {
            seat_section: "0",
            seat_num: "Ｅ－１",
        },
        {
            seat_section: "0",
            seat_num: "Ｅ－２",
        }
    ]
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});