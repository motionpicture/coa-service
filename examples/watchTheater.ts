/**
 * 劇場抽出監視コード
 *
 * @ignore
 */
import * as COA from '../lib/index';

let countRetry = 0;

const MAX_NUBMER_OF_PARALLEL_TASKS = 10;
const INTERVAL_MILLISECONDS = 1000;

setInterval(
    async () => {
        if (countRetry > MAX_NUBMER_OF_PARALLEL_TASKS) {
            return;
        }

        countRetry += 1;

        try {
            await COA.services.master.theater({
                theaterCode: '118'
            });
        } catch (error) {
            console.error(error.message);
        }

        countRetry -= 1;
    },
    INTERVAL_MILLISECONDS
);
