"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * パフォーマンス抽出の例
 *
 * @ignore
 */
const COA = require("../lib/index");
COA.services.master.schedule({
    theater_code: '118',
    begin: '20170411',
    end: '20170411'
}).then((performances) => {
    // tslint:disable-next-line:no-console
    console.log(performances);
}).catch((err) => {
    console.error(err.message);
});
