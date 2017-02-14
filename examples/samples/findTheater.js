"use strict";
// tslint:disable-next-line:missing-jsdoc
const COA = require("../../index");
// tslint:disable-next-line:no-http-string
const ENDPOINT = 'http://coacinema.aa0.netvolante.jp';
COA.initialize({
    endpoint: ENDPOINT,
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:ter-max-len
    refresh_token: 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNDc5MjYwODQ4LCJhdXRoX2lkIjoiMzMxNSJ9.jx-w7D3YLP7UbY4mzJYC9xr368FiKWcpR2_L9mZfehQ'
});
COA.findTheaterInterface.call({
    theater_code: '118'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
