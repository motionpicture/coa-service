import * as COA from "../../index";

COA.initialize({
    endpoint: "http://coacinema.aa0.netvolante.jp",
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:ter-max-len
    refresh_token: "eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNDc5MjYwODQ4LCJhdXRoX2lkIjoiMzMxNSJ9.jx-w7D3YLP7UbY4mzJYC9xr368FiKWcpR2_L9mZfehQ"
});

COA.stateReserveInterface.call({
    theater_code: "001",
    reserve_num: 11586,
    tel_num: "09012345678"
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});