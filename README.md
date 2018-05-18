<img src="https://motionpicture.jp/images/common/logo_01.svg" alt="motionpicture" title="motionpicture" align="right" height="56" width="98"/>

# COA client library for Node.js

[![CircleCI](https://circleci.com/gh/motionpicture/coa-service.svg?style=svg&circle-token=e29e443f67a815be67d500d478ae3b8e413e7bab)](https://circleci.com/gh/motionpicture/coa-service)

Node.jsでCOAサービスを使うためのライブラリです。

## Table of contents

* [Specification](#specification)
* [Usage](#usage)
* [Example](#code-samples)
* [Jsdoc](#jsdoc)
* [License](#license)

## Specification

COA APIの仕様で注意すべき点は以下の通りです。

* 正常時レスポンスにはstatusが含まれるが、0以外のステータスはない。
* カタカナは全角統一(半角はありえない)
* 仮予約番号と購入番号の型はnumberで統一。
* 座席番号は半角と全角を区別する、
* 購入番号は劇場内でユニーク、劇場コード合わせれば全体でユニーク。
* 購入番号は連番かどうか
  * 仮予約番号は連番だが、購入番号は仮予約番号と同じ番号。よって、仮予約で止めたり、仮予約のキャンセルが発生すると、空き番号が発生しうる。
* 購入番号は最大8桁。 最大番号(99999999)を超える時点で１に戻る。
* 劇場コードは、基本的に3桁(001、018等)だが、場合によっては1桁や2桁（1、18等）の表示になっていることはあるかもしれない、とのこと。
* 座席の解放については、基幹システム側では何も行っていない。

## Usage

```shell
npm install @motionpicture/coa-service
```

```js
const COA = require('@motionpicture/coa-service');
```

### Environment variables

| Name                | Required | Value         | Purpose             |
|---------------------|----------|---------------|---------------------|
| `DEBUG`             | false    | coa-service:* | Debug               |
| `COA_ENDPOINT`      | true     |               | APIのエンドポイント         |
| `COA_REFRESH_TOKEN` | true     |               | リクエストに必要なリフレッシュトークン |

### 劇場情報を取得する

```js
const COA = require('@motionpicture/coa-service');

COA.services.master.theater({
    theaterCode: '123'
})
    .then(console.log)
    .catch(console.error);
```

### 作品情報を取得する

```js
const COA = require('@motionpicture/coa-service');

COA.services.master.title({
    theaterCode: '123'
})
    .then(console.log)
    .catch(console.error);
```

## Code Samples

Code sample are [here](https://github.com/motionpicture/coa-service/tree/master/example).

## Jsdoc

`npm run doc` emits jsdoc to ./doc.

## License

UNLICENSED
