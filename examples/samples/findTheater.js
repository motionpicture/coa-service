"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 劇場抽出コード
 *
 * @ignore
 */
const COA = require("../../lib/index");
COA.MasterService.theater({
    theater_code: '118'
}).then((result) => {
    console.log(result); // tslint:disable-line:no-console
}).catch((err) => {
    console.error(err.message);
});
