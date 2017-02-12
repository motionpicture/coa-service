"use strict";
const COA = require("../../index");
COA.initialize({
    endpoint: "http://coacinema.aa0.netvolante.jp",
    refresh_token: "eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNDc5MjYwODQ4LCJhdXRoX2lkIjoiMzMxNSJ9.jx-w7D3YLP7UbY4mzJYC9xr368FiKWcpR2_L9mZfehQ"
});
COA.deleteReserveInterface.call({
    theater_code: "001",
    date_jouei: "20170210",
    title_code: "8513",
    title_branch_num: "0",
    time_begin: "1010",
    reserve_num: 11586,
    tel_num: "09012345678",
    list_seat: [
        {
            seat_section: "0",
            seat_num: "Ｅ－１"
        },
        {
            seat_section: "0",
            seat_num: "Ｅ－２"
        }
    ]
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
