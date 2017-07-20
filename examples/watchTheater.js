"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 劇場抽出監視コード
 *
 * @ignore
 */
const COA = require("../lib/index");
let countRetry = 0;
const MAX_NUBMER_OF_PARALLEL_TASKS = 10;
const INTERVAL_MILLISECONDS = 1000;
setInterval(() => __awaiter(this, void 0, void 0, function* () {
    if (countRetry > MAX_NUBMER_OF_PARALLEL_TASKS) {
        return;
    }
    countRetry += 1;
    try {
        yield COA.services.master.theater({
            theaterCode: '118'
        });
    }
    catch (error) {
        console.error(error.message);
    }
    countRetry -= 1;
}), INTERVAL_MILLISECONDS);
