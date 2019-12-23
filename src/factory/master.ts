/**
 * 施設マスター抽出in
 */
export interface ITheaterArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
}
/**
 * 施設マスター抽出out
 */
export interface ITheaterResult {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 施設名称
     */
    theaterName: string;
    /**
     * 施設名称（カナ）
     */
    theaterNameEng: string;
    /**
     * 施設名称（英）
     */
    theaterNameKana: string;
    /**
     * 電話番号
     */
    theaterTelNum: string;
}

/**
 * 作品マスター抽出in
 */
export interface ITitleArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
}
/**
 * 作品マスター抽出out
 */
export interface ITitleResult {
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 作品タイトル名
     */
    titleName: string;
    /**
     * 作品タイトル名（カナ）
     */
    titleNameKana: string;
    /**
     * 作品タイトル名（英）
     */
    titleNameEng: string;
    /**
     * 作品タイトル名省略
     */
    titleNameShort: string;
    /**
     * 原題
     */
    titleNameOrig: string;
    /**
     * 映倫区分
     */
    kbnEirin: string;
    /**
     * 映像区分
     */
    kbnEizou: string;
    /**
     * 上映方式区分
     */
    kbnJoueihousiki: string;
    /**
     * 字幕吹替区分
     */
    kbnJimakufukikae: string;
    /**
     * 上映時間
     */
    showTime: number;
    /**
     * 公演開始予定日
     */
    dateBegin: string;
    /**
     * 公演終了予定日
     */
    dateEnd: string;
    /**
     * ムビチケ使用フラグ
     */
    flgMvtkUse: string;
    /**
     * ムビチケ利用開始日
     */
    dateMvtkBegin: string;
}

/**
 * スクリーンマスター抽出in
 */
export interface IScreenArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
}
/**
 * 座席
 */
export interface IScreenSeat {
    /**
     * 座席セクション
     */
    seatSection: string;
    /**
     * 座席番号
     */
    seatNum: string;
    /**
     * 特別席フラグ
     */
    flgSpecial: string;
    /**
     * 車椅子席フラグ
     */
    flgHc: string;
    /**
     * ペア席フラグ
     */
    flgPair: string;
    /**
     * 自由席フラグ
     */
    flgFree: string;
    /**
     * 予備席フラグ
     */
    flgSpare: string;
}
/**
 * スクリーンマスター抽出out
 */
export interface IScreenResult {
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * スクリーン名
     */
    screenName: string;
    /**
     * スクリーン名（英）
     */
    screenNameEng: string;
    /**
     * 座席リスト
     */
    listSeat: IScreenSeat[];
}

/**
 * スケジュールマスター抽出in
 */
export interface IScheduleArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
    /**
     * スケジュールを抽出する上映日の開始日 ※日付は西暦8桁 'YYYYMMDD'
     */
    begin: string;
    /**
     * スケジュールを抽出する上映日の終了日 ※日付は西暦8桁 'YYYYMMDD'
     */
    end: string;
}

/**
 * 先行予約フラグ
 */
export enum FlgEarlyBooking {
    /**
     * 先行予約でない
     */
    NotPreOrder = '0',
    /**
     * 先行予約
     */
    EarlyBooking = '1'
}

/**
 * スケジュールマスター抽出out
 */
export interface IScheduleResult {
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
     * 上映開始時刻
     */
    timeBegin: string;
    /**
     * 上映終了時刻
     */
    timeEnd: string;
    /**
     * スクリーンコード
     */
    screenCode: string;
    /**
     * トレーラー時間
     */
    trailerTime: number;
    /**
     * サービス区分
     */
    kbnService: string;
    /**
     * 音響区分
     */
    kbnAcoustic: string;
    /**
     * サービスデイ名称
     */
    nameServiceDay: string;
    /**
     * 購入可能枚数
     */
    availableNum: number;
    /**
     * 予約開始日
     * 予約可能になる日付(yyyymmdd)
     */
    rsvStartDate: string;
    /**
     * 予約終了日
     * 予約終了になる日付(yyyymmdd)
     * 通常は上映日、先行販売の場合は販売終了日
     */
    rsvEndDate: string;
    /**
     * 先行予約フラグ
     * 先行予約の場合は'1'、それ以外は'0'
     */
    flgEarlyBooking: FlgEarlyBooking;
}

export interface IXMLScheduleArgs {
    /*
     * XMLのエンドポイントのベースURL
     */
    baseUrl: string;
    /*
     * 劇場のコード名
     */
    theaterCodeName: string;
}

export enum XMLErrorCode {
    /*
     * 正常
     */
    NoError = '000000',
    /*
     * 指定データーなし
     */
    NoData = '111111',
    /*
     * 上記以外のエラー
     */
    Error = '222222'
}

export enum XMLAvailableCode {
    /*
     * 空席あり・予約可能
     */
    EmptySeatAvailableCanPreOrder = 0,
    /*
     * 空席あり・予約不可（窓口）
     */
    EmptySeatAvailableCantPreOrder = 1,
    /*
     * 残りわずか・予約可能
     */
    FewSeatLeftCanPreOrder = 2,
    /*
     * 残りわずか・予約不可（窓口）
     */
    FewSeatLeftCantPreOrder = 4,
    /*
     * 満席
     */
    EmptySeatNotAvailable = 5,
    /*
     * 予約不可
     */
    CantPreOrder = 6
}

export enum XMLLateCode {
    /*
     * 普通上映
     */
    NormalShow = 0,
    /*
     * モーニングショー
     */
    MorningShow = 1,
    /*
     * レイトショー
     */
    LateShow = 2
}

export interface IXMLScheduleOriginal {
    /*
    * root要素
    */
    schedules: {
        /*
        * エラーコード
        */
        error: string[];
        /*
        * 劇場コード
        */
        theater_code: string[];
        /*
        * 注意文
        */
        attention: string[];
        /*
        * スケジュール要素
        */
        schedule: {
            /*
            * 日付
            */
            date: string[];
            /*
            * 予約可能日flg
            */
            usable: string[];
            /*
            * 作品要素
            */
            movie: IXMLMovieOriginal[];
        }[];
    };
}

export interface IXMLMovieOriginal {
    /*
     * 作品コード
     */
    movie_code: string[];
    /*
     * 作品コード(5桁)
     */
    movie_short_code: string[];
    /*
     * 作品枝番(1桁)
     */
    movie_branch_code: string[];
    /*
     * 作品名
     */
    name: string[];
    /*
     * 作品名（英語）
     */
    ename: string[];
    /*
     * 作品名（携帯）
     */
    cname: string[];
    /*
     * コメント
     */
    comment: string[];
    /*
     * 上映時間
     */
    running_time: string[];
    /*
     * 予告時間
     */
    cm_time: string[];
    /*
     * 公式サイトなどへリンクする際のURL
     */
    official_site: string[];
    /*
     * あらすじ
     */
    summary: string[];
    /*
     * スクリーン要素
     */
    screen: IXMLScreenOriginal[];
}

export interface IXMLScreenOriginal {
    /*
     * スクリーンコード
     */
    name: string[];
    /*
     * スクリーン名
     */
    screen_code: string[];
    /*
     * 時間要素
     */
    time: IXMLTimeOriginal[];
}

export interface IXMLTimeOriginal {
    /*
     * 予約可能flg
     */
    available: string[];
    /*
     * 終了時間
     */
    end_time: string[];
    /*
     * レイト区分
     */
    late: string[];
    /*
     * 開始時間
     */
    start_time: string[];
    /*
     * 予約詳細ページ（規約ページ）
     */
    url: string[];
}

export interface IXMLScheduleResult {
    /*
     * 日付
     */
    date: string;
    /*
     * 予約可能日flg
     */
    usable: boolean;
    /*
     * 作品要素
     */
    movie: IXMLMovie[];
}

export interface IXMLMovie {
    /*
     * 作品コード
     */
    movieCode: string;
    /*
     * 作品コード(5桁)
     */
    movieShortCode: string;
    /*
     * 作品枝番(1桁)
     */
    movieBranchCode: string;
    /*
     * 作品名
     */
    name: string;
    /*
     * 作品名（英語）
     */
    eName: string;
    /*
     * 作品名（携帯）
     */
    cName: string;
    /*
     * コメント
     */
    comment: string;
    /*
     * 上映時間
     */
    runningTime: number;
    /*
     * 予告時間
     */
    cmTime: number;
    /*
     * 公式サイトなどへリンクする際のURL
     */
    officialSite: string;
    /*
     * あらすじ
     */
    summary: string;
    /*
     * スクリーン要素
     */
    screen: IXMLScreen[];
}

export interface IXMLScreen {
    /*
     * スクリーンコード
     */
    name: string;
    /*
     * スクリーン名
     */
    screenCode: string;
    /*
     * 時間要素
     */
    time: IXMLTime[];
}

export interface IXMLTime {
    /*
     * 予約可能flg
     */
    available: XMLAvailableCode;
    /*
     * 終了時間
     */
    endTime: string;
    /*
     * レイト区分
     */
    late: XMLLateCode;
    /*
     * 開始時間
     */
    startTime: string;
    /*
     * 予約詳細ページ（規約ページ）
     */
    url: string;
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
 * 券種マスター抽出in
 */
export interface ITicketArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
}
/**
 * 券種マスター抽出out
 */
export interface ITicketResult {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名(カナ)
     */
    ticketNameKana: string;
    /**
     * チケット名(英)
     */
    ticketNameEng: string;
    /**
     * ポイント購入の場合の消費ポイント
     */
    usePoint: number;
    /**
     * 会員用フラグ
     */
    flgMember?: FlgMember;
}

/**
 * 各種区分マスター抽出in
 */
export interface IKubunNameArgs {
    /**
     * 劇場コード
     */
    theaterCode: string;
    /**
     * 区分種別
     */
    kubunClass: string;
}
/**
 * 各種区分マスター抽出out
 */
export interface IKubunNameResult {
    /**
     * 区分コード
     */
    kubunCode: string;
    /**
     * 区分名
     */
    kubunName: string;
    /**
     * 区分名（英）
     */
    kubunNameEng: string;
    /**
     * 加算料金（上映方式、音響等の１枚当たりの追加料金）
     */
    kubunAddPrice: number;
}

/**
 * ムビチケチケットコード取得in
 */
export interface IMvtkTicketcodeArgs {
    /**
     * 施設コード
     */
    theaterCode: string;
    /**
     * 電子券区分
     */
    kbnDenshiken: string;
    /**
     * 前売券区分
     */
    kbnMaeuriken: string;
    /**
     * 券種区分
     */
    kbnKensyu: string;
    /**
     * 販売単価
     */
    salesPrice: number;
    /**
     * 計上単価
     */
    appPrice: number;
    /**
     * 映写方式区分
     */
    kbnEisyahousiki: string;
    /**
     * 作品コード
     */
    titleCode: string;
    /**
     * 作品枝番
     */
    titleBranchNum: string;
    /**
     * 上映日
     */
    dateJouei: string;
}

/**
 * ムビチケチケットコード取得out
 */
export interface IMvtkTicketcodeResult {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名(カナ)
     */
    ticketNameKana: string;
    /**
     * チケット名(英)
     */
    ticketNameEng: string;
    /**
     * 加算単価 ※３Ｄ、ＩＭＡＸ、４ＤＸ等の加算料金（メガネ抜き）
     */
    addPrice: number;
    /**
     * メガネ単価 ※３Ｄメガネの加算料金
     */
    addPriceGlasses: number;
}
