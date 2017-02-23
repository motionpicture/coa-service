"use strict";
// tslint:disable-next-line:missing-jsdoc
const COA = require("../../lib/coa-service");
COA.MasterService.findFilmsByTheaterCode({
    theater_code: '118'
}).then((films) => {
    // tslint:disable-next-line:no-console
    console.log(films);
}).catch((err) => {
    console.error(err.message);
});
