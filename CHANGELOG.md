# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

### Added

- マスターサービスにＭＧチケットコード確認を追加

### Changed

- update typescript
- update tslint
- .npmignoreを削除
- update packages
- 本予約にMG関連インターフェースを追加

### Deprecated

### Removed

- COA XMLに対する処理を削除

### Fixed

### Security

## v8.0.1 - 2020-02-13

### Fixed

- XMLスケジュール抽出を、screener.timeが配列でない場合に対応

## v8.0.0 - 2019-12-23

### Changed

- マスターサービスインスタンスを必要に応じて生成できるように調整
- 予約サービスインスタンスを必要に応じて生成できるように調整
- 環境変数への依存を削除

### Removed

- プロセスにつき1インスタンスのサービスを削除

## v7.0.0 - 2019-07-01

### Added

- 座席予約状態抽出OUTへ特別席区分(spseatKbn)、特別席加算額１(spseatAdd1)、特別席加算額２(spseatAdd2)追加
- 座席本予約INへ特別席区分(spseatKbn)、特別席加算額１(spseatAdd1)、特別席加算額２(spseatAdd2)追加

## v6.0.1 - 2018-12-05

### Fixed

- スケジュールXMLのschedule属性が未定義の場合にスケジュールの読み込みをスルーするように対応

## v6.0.0 - 2018-11-08

### Added

- ムビチケチケットコード取得に上映日(dateJouei)追加

## v5.0.01 - 2018-10-10

### Added

- XML先行販売追加、大和郡山追加

## v5.0.0 - 2018-08-23

### Added

- スケジュール取得をXMLと同期する

## v4.1.0 - 2018-06-01

### Added

- typedocをdocsに追加。

### Changed

- 券種マスター抽出結果に消費ポイント属性を追加。

## v4.0.11 - 2018-05-18

### Changed

- パブリックパッケージ化。

## v4.0.10 - 2018-05-18

### Changed

- 依存パッケージを最新化。
- tslintの新ルールに従いコメント調整。

## v4.0.9 - 2018-02-14

### Fixed
- 作品抽出のレスポンスにtitle_nameをセットできていないバグを修正。

## v4.0.8 - 2017-11-14
### Fixed
- 認証エラーでリトライした際にアクセストークンが再セットされないバグを修正。

## v4.0.7 - 2017-10-11
### Fixed
- HTTPステータスコードが2xxでもレスポンス本文のstatusが0でない場合をエラーとしてハンドリング。

## v4.0.6 - 2017-09-29
### Added
- リフレッシュトークン認証クライアントを新規で作成。

### Changed
- 認証エラーの場合一度だけトークンを自動的にリフレッシュするように対応。

### Removed
- typesディレクトリを削除。

### Security
- 依存パッケージを最新に更新。

## v4.0.5 - 2017-09-28
### Fixed
- 販売可能チケット情報の戻り値へ制限単位(limitUnit)追加

### Security
- nsp除外リスト追加 [debug](https://nodesecurity.io/advisories/534)

## v4.0.4 - 2017-09-26
### Added
- COAServiceErrorクラスを追加。

### Changed
- request-promise-nativeをアンインストールして、transporterクラスを追加。
- exampleを修正。

## v4.0.3 - 2017-09-24
### Changed
- READMEを更新。

## v4.0.2 - 2017-09-23
### Added
- [circleci](https://circleci.com/)設定を追加。

### Security
- install [debug]@3.0.1(https://www.npmjs.com/package/debug).
- install [request@2.82.0](https://www.npmjs.com/package/request).
- install [request-promise-native@1.0.5](https://www.npmjs.com/package/request-promise-native).
- [.nsprc](https://github.com/nodesecurity/nsp)を追加。
- [snyk wizard](https://snyk.io/docs/using-snyk/)スクリプトを追加。
- coverageスクリプトをテストフローに追加。

## v4.0.1 - 2017-08-23
### Fixed
 - moment依存部分をネイティブ化
 - reserve.countFreeSeatの戻り値をスネークケースからキャメルケースへ変更

## v4.0.0 - 2017-07-20
### Changed
 - 引数、戻り値をスネークケースからキャメルケースへ変更
 
### Removed
 - Utilネームスペース削除
 - MasterServiceネームスペース削除
 - ReserveServiceネームスペース削除

## v3.4.0 - 2017-07-07
### Changed
 - 会員フラグ定数をenumへ変更

### Security
- 依存パッケージを最新に更新。
- [nyc@^11.0.3](https://github.com/istanbuljs/nyc)に対応。
- [snyk@^1.36.2](https://github.com/snyk/snyk)に対応。
- [tslint@^5.4.3](https://github.com/palantir/tslint)に対応。
- [tslint-microsoft-contrib@^5.0.1](https://github.com/Microsoft/tslint-microsoft-contrib)に対応。

## v3.3.1 - 2017-07-06
### Fixed
 - 販売可能チケット情報（services.reserve.salesTicket）引数型修正

## v3.3.0 - 2017-07-05
### Changed
 - 販売可能チケット情報（services.reserve.salesTicket）へ会員フラグ追加

## v3.2.0 - 2017-07-04
### Added
- servicesネームスペースを追加。
- utilsネームスペースを追加。

### Deprecated
- ルートオブジェクトのUtil,MasterService,ReserveServiceを非推奨に変更。

## v3.1.2 - 2017-06-19

### Fixed
- 変更履歴調整。

## v3.1.1 - 2017-06-19
### Fixed
- アクセストークンの有効期限バリデーションを調整。

### Security
- 依存パッケージを最新に更新。
- [tslint@^5.4.3](https://github.com/palantir/tslint)に対応。
- [typescript@^2.4.0](https://github.com/Microsoft/TypeScript)に対応。

## v3.1.0 - 2017-06-07
### Added
- 変更履歴を追加。
