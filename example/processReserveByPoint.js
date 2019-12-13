/**
 * 無料鑑賞券による座席予約プロセスサンプル
 * @ignore
 */
const COA = require('../');
const moment = require('moment');

async function main() {
    const theaterCode = '112';

    const schedules = await COA.services.master.schedule({
        theaterCode: theaterCode,
        begin: moment().add(1, 'day').format('YYYYMMDD'),
        end: moment().add(1, 'day').format('YYYYMMDD'),
    });
    const selectedSchedule = schedules[0];
    console.log('スケジュールを選択しました。', selectedSchedule.titleCode);

    // 空席確認
    const stateReserveSeatResult = await COA.services.reserve.stateReserveSeat({
        theaterCode: theaterCode,
        dateJouei: selectedSchedule.dateJouei,
        titleCode: selectedSchedule.titleCode,
        titleBranchNum: selectedSchedule.titleBranchNum,
        timeBegin: selectedSchedule.timeBegin,
        screenCode: selectedSchedule.screenCode
    });
    console.log('空席数は', stateReserveSeatResult.cntReserveFree);
    const selectedSeatSection = stateReserveSeatResult.listSeat[0].seatSection;
    const selectedSeat = stateReserveSeatResult.listSeat[0].listFreeSeat[0];

    // 仮予約
    console.log('仮予約します...', selectedSeat.seatNum);
    const updTmpReserveSeatResult = await COA.services.reserve.updTmpReserveSeat({
        theaterCode: theaterCode,
        dateJouei: selectedSchedule.dateJouei,
        titleCode: selectedSchedule.titleCode,
        titleBranchNum: selectedSchedule.titleBranchNum,
        timeBegin: selectedSchedule.timeBegin,
        screenCode: selectedSchedule.screenCode,
        listSeat: [{
            seatSection: selectedSeatSection,
            seatNum: selectedSeat.seatNum
        }]
    });
    console.log('仮予約番号が発行されました。', updTmpReserveSeatResult.tmpReserveNum);

    // 無料鑑賞券取得
    const tickets = await COA.services.master.ticket({
        theaterCode: theaterCode
    });
    const freeTickets = tickets.filter((t) => t.usePoint > 0 && t.flgMember === COA.services.master.FlgMember.Member);
    if (freeTickets.length === 0) {
        throw new Error('無料鑑賞券が見つかりませんでした。');
    }
    const selectedTicket = freeTickets[0];
    console.log('無料鑑賞券が見つかりました。', selectedTicket.ticketCode);

    // 本予約
    const updReserveResult = await COA.services.reserve.updReserve({
        theaterCode: theaterCode,
        dateJouei: selectedSchedule.dateJouei,
        titleCode: selectedSchedule.titleCode,
        titleBranchNum: selectedSchedule.titleBranchNum,
        timeBegin: selectedSchedule.timeBegin,
        tmpReserveNum: updTmpReserveSeatResult.tmpReserveNum,
        reserveName: 'もーしょん　たろう',
        reserveNameJkana: 'もーしょん　たろう',
        telNum: '09012345678',
        mailAddr: 'test@example.com',
        reserveAmount: 0,
        listTicket: [{
            ticketCode: selectedTicket.ticketCode,
            stdPrice: 0,
            addPrice: 0,
            spseatAdd1: selectedSeat.spseatAdd1,
            spseatAdd2: selectedSeat.spseatAdd2,
            disPrice: 0,
            salePrice: 0,
            mvtkAppPrice: 0,
            ticketCount: 1,
            spseatKbn: selectedSeat.spseatKbn,
            seatNum: selectedSeat.seatNum,
            addGlasses: 0,
            kbnEisyahousiki: '',
            mvtkNum: '',
            mvtkKbnDenshiken: '00',
            mvtkKbnMaeuriken: '00',
            mvtkKbnKensyu: '00',
            mvtkSalesPrice: 0
        }]
    });
    console.log('QRコードが発行されました。', updReserveResult.listQr[0].seatQrcode);
}

main().then(() => {
    console.log('success!');
}).catch(console.error);
