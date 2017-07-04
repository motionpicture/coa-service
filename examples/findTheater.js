"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 劇場抽出の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.services.master.theater({
    theater_code: '118'
}).then((result) => {
    console.log(result); // tslint:disable-line:no-console
}).catch((err) => {
    console.error(err.message);
});
