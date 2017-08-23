# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased
### Added

### Changed
 - moment依存部分をネイティブ化

### Deprecated

### Removed

### Fixed
 - reserve.countFreeSeatの戻り値をスネークケースからキャメルケースへ変更

### Security

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
