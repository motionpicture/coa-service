"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 作品マスター抽出の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.services.master.title({
    theater_code: '118'
}).then((films) => {
    // tslint:disable-next-line:no-console
    console.log(films);
}).catch((err) => {
    console.error(err.message);
});
