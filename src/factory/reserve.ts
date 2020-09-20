/**
 * 空席状況in
 */
export interface ICountFreeSeatArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
    /**
     * 空席情報を抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
     */
    begin: string;
    /**
     * 空席情報を抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
     */
    end: string;
}
/**
 * パフォーマンス
 */
export interface ICountFreeSeatPerformance {
    /**
     * 作品コード(5桁)
     */
    titleCode: string;
    /**
     * 作品枝番(2桁)
     */
    titleBranchNum: string;
    /**
     * 上映開始時刻(4桁 'hhmm')
     */
    timeBegin: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * 予約可能数(パフォーマンスの予約可能座席数)
     */
    cntReserveMax: number;
    /**
     * 予約可能残席数(予約可能座席数から仮予約を含む予約数を引いた残席数)
     */
    cntReserveFree: number;

}
/**
 * 日程
 */
export interface ICountFreeSeatDate {
    /**
     * 上映日(日付は西暦8桁 'YYYYMMDD')
     */
    dateJouei: string;
    /**
     * パフォーマンスリスト
     */
    listPerformance: ICountFreeSeatPerformance[];
    /**
     * パフォーマンス数
     */
    cntPerformance: number;
}
/**
 * 空席状況out
 */
export interface ICountFreeSeatResult {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 日程リスト
     */
    listDate: ICountFreeSeatDate[];
}

/**
 * 座席予約状態抽出in
 */
export interface IStateReserveSeatArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
}
/**
 * 空席リスト
 */
export interface IStateReserveSeatFreeSeat {
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 特別席区分
     * 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
     */
    spseatKbn: string;
    /**
     * 特別席加算額１
     * 特別席加算額の興行収入部分
     */
    spseatAdd1: number;
    /**
     * 特別席加算額２
     * 特別席加算額のミールクーポン部分
     */
    spseatAdd2: number;
}
/**
 * 座席リスト
 */
export interface IStateReserveSeatSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 空席リスト
     */
    listFreeSeat: IStateReserveSeatFreeSeat[];
}
/**
 * 座席予約状態抽出out
 */
export interface IStateReserveSeatResult {
    /**
     * 予約可能残席数
     */
    cntReserveFree: number;
    /**
     * 座席列数
     */
    cntSeatLine: number;
    /**
     * 座席リスト
     */
    listSeat: IStateReserveSeatSeat[];
}

/**
 * 予約座席
 */
export interface IUpdTmpReserveSeatSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
}
/**
 * 仮予約結果リスト
 */
export interface IUpdTmpReserveSeatTmpReserve {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 仮予約ステータス
     */
    stsTmpReserve: string;
}

/**
 * 座席仮予約in
 */
export interface IUpdTmpReserveSeatArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 予約座席数
     */
    // cntReserveSeat: number,
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * 予約座席リスト
     */
    listSeat: IUpdTmpReserveSeatSeat[];
}
/**
 * 座席仮予約out
 */
export interface IUpdTmpReserveSeatResult {
    /**
     * 座席チケット仮予約番号
     */
    tmpReserveNum: number;
    /**
     * 仮予約結果リスト(仮予約失敗時の座席毎の仮予約状況)
     */
    listTmpReserve: IUpdTmpReserveSeatTmpReserve[];
}

/**
 * 座席仮予約削除in
 */
export interface IDelTmpReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 座席チケット仮予約番号
     */
    tmpReserveNum: number;
}

/**
 * 座席本予約in
 */
export interface IUpdReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 座席チケット仮予約番号
     */
    tmpReserveNum: number;
    /**
     * 予約者名
     */
    reserveName: string;
    /**
     * 予約者名（かな）
     */
    reserveNameJkana: string;
    /**
     * 電話番号
     */
    telNum: string;
    /**
     * メールアドレス
     */
    mailAddr: string;
    /**
     * 予約金額
     */
    reserveAmount: number;
    /**
     * 価格情報リスト
     */
    listTicket: IUpdReserveTicket[];
}
/**
 * 価格情報
 */
export interface IUpdReserveTicket {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * 標準単価
     */
    stdPrice: number;
    /**
     * 加算単価
     */
    addPrice: number;
    /**
     * 特別席加算額１
     * 特別席加算額の興行収入部分
     */
    spseatAdd1: number;
    /**
     * 特別席加算額２
     * 特別席加算額のミールクーポン部分
     */
    spseatAdd2: number;
    /**
     * 割引額
     */
    disPrice: number;
    /**
     * 金額
     * 価格情報毎の１枚当たりの金額（ムビチケの場合も金額をセット）
     * ※標準単価+加算単価-割引額
     */
    salePrice: number;
    /**
     * ムビチケ計上単価
     * ムビチケの場合、計上単価（興収報告単価）をセット（ムビチケ以外は0をセット）
     */
    mvtkAppPrice: number;
    /**
     * 枚数
     */
    ticketCount: number;
    /**
     * 特別席区分
     * 000：通常席、001：コンフォート、002：グラントクラス、003：プレミアクラス
     */
    spseatKbn: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * メガネ単価
     * メガネ代が別途発生した場合は、メガネ代をセット。それ以外は０をセット（ムビチケの場合も同様）
     */
    addGlasses: number;
    /**
     * ムビチケ・ＭＧ映写方式区分
     * ムビチケ・ＭＧ連携情報より
     */
    kbnEisyahousiki: string;
    /**
     * ムビチケ・ＭＧ購入管理番号
     * ムビチケ・ＭＧ連携情報より（ムビチケ・ＭＧ以外は""）
     */
    mvtkNum: string;
    /**
     * ムビチケ・ＭＧ電子券区分
     * ムビチケ・ＭＧ連携情報より（01：電子、02：紙）
     * ※ムビチケ・ＭＧ以外は"00"をセット
     * ※ＭＧはチケット媒体区分
     */
    mvtkKbnDenshiken: string;
    /**
     * ムビチケ・ＭＧ前売券区分
     * ムビチケ・ＭＧ連携情報より（01：全国券、02：劇場券）
     * ※ムビチケ・ＭＧ以外は"00"をセット
     * ※ＭＧはスコープ区分
     */
    mvtkKbnMaeuriken: string;
    /**
     * ムビチケ・ＭＧ券種区分
     * ムビチケ・ＭＧ連携情報より（01：一般2Ｄ、02：小人2Ｄ、03：一般3Ｄ、…）
     * ※ムビチケ・ＭＧ以外は"00"をセット
     */
    mvtkKbnKensyu: string;
    /**
     * ムビチケ・ＭＧ販売単価
     * ムビチケ・ＭＧ連携情報より（ムビチケ・ＭＧ以外は0をセット）
     */
    mvtkSalesPrice: number;
    /**
     * ＭＧチケット区分
     * ＭＧチケットの場合は"MG"（ＭＧ以外は""をセット）
     */
    kbnMgtk: string;
}
/**
 * 座席本予約out
 */
export interface IUpdReserveResult {
    /**
     * 座席チケット購入番号
     */
    reserveNum: number;
    /**
     * 入場qrリスト
     */
    listQr: IUpdReserveQR[];
}

/**
 * 入場情報
 */
export interface IUpdReserveQR {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 座席入場qrコード
     */
    seatQrcode: string;

}

/**
 * 購入チケット取り消しin
 */
export interface IDelReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 座席チケット購入番号
     */
    reserveNum: number;
    /**
     * 電話番号
     */
    telNum: string;
    /**
     * 座席単位削除リスト
     */
    listSeat: IDelReserveSeat[];
}
/**
 * 座席単位削除
 */
export interface IDelReserveSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
}

/**
 * 購入チケット内容抽出in
 */
export interface IStateReserveArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 座席チケット購入番号
     */
    reserveNum: number;
    /**
     * 電話番号
     */
    telNum: string;
}
export interface IStateReserveTicket {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * 金額
     */
    ticketPrice: number;
    /**
     * 枚数
     */
    ticketCount: number;
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 座席入場qrコード
     */
    seatQrcode: string;
    /**
     * メガネ単価
     */
    addGlasses: number;
}
/**
 * 購入チケット内容抽出out
 */
export interface IStateReserveResult {
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * 価格情報リスト
     */
    listTicket: IStateReserveTicket[];
}

/**
 * 会員用フラグ
 */
export enum FlgMember {
    /**
     * 非会員
     */
    NonMember = '0',
    /**
     * 会員
     */
    Member = '1'
}

/**
 * 販売可能チケット情報in
 */
export interface ISalesTicketArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 上映日
     */
    dateJouei: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映時刻
     */
    timeBegin: string;
    /**
     * 会員用フラグ（1：会員専用チケットも表示する。会員以外の場合は0をセット）
     */
    flgMember?: FlgMember;
}
/**
 * 販売可能チケット情報out
 */
export interface ISalesTicketResult {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名（カナ）
     */
    ticketNameKana: string;
    /**
     * チケット名（英）
     */
    ticketNameEng: string;
    /**
     * 標準単価
     */
    stdPrice: number;
    /**
     * 加算単価(３Ｄ，ＩＭＡＸ、４ＤＸ等の加算料金)
     */
    addPrice: number;
    /**
     * 販売単価(標準単価＋加算単価)
     */
    salePrice: number;
    /**
     * 人数制限(制限が無い場合は１)
     */
    limitCount: number;
    /**
     * 制限単位(１：ｎ人単位、２：ｎ人以上)
     */
    limitUnit: string;
    /**
     * チケット備考(注意事項等)
     */
    ticketNote: string;
    /**
     * メガネ単価
     */
    addGlasses: number;
}
