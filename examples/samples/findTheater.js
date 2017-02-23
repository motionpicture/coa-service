"use strict";
// tslint:disable-next-line:missing-jsdoc
const COA = require("../../lib/coa-service");
COA.MasterService.findTheater({
    theater_code: '118'
}).then((result) => {
    // tslint:disable-next-line:no-console
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
