import * as COA from "../../index";

COA.initialize({
    endpoint: "http://coacinema.aa0.netvolante.jp",
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:ter-max-len
    refresh_token: "eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNDc5MjYwODQ4LCJhdXRoX2lkIjoiMzMxNSJ9.jx-w7D3YLP7UbY4mzJYC9xr368FiKWcpR2_L9mZfehQ"
});

COA.findTheaterInterface.call({
    theater_code: "118"
}).then((films) => {
    // tslint:disable-next-line:no-console
    console.log(films);
}).catch((err) => {
    console.error(err.message);
});
