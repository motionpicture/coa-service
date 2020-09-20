# COA client library for Node.js

[![npm (scoped)](https://img.shields.io/npm/v/@motionpicture/coa-service.svg)](https://www.npmjs.com/package/@motionpicture/coa-service)
[![CircleCI](https://circleci.com/gh/motionpicture/coa-service.svg?style=shield)](https://circleci.com/gh/motionpicture/coa-service)
[![Coverage Status](https://coveralls.io/repos/github/motionpicture/coa-service/badge.svg?branch=master)](https://coveralls.io/github/motionpicture/coa-service?branch=master)
[![Dependency Status](https://img.shields.io/david/motionpicture/coa-service.svg)](https://david-dm.org/motionpicture/coa-service)
[![Known Vulnerabilities](https://snyk.io/test/github/motionpicture/coa-service/badge.svg)](https://snyk.io/test/github/motionpicture/coa-service)
[![npm](https://img.shields.io/npm/dm/@motionpicture/coa-service.svg)](https://nodei.co/npm/@motionpicture/coa-service/)

Node.jsでCOAサービスを使うためのライブラリです。

## Table of contents

- [COA client library for Node.js](#coa-client-library-for-nodejs)
  - [Table of contents](#table-of-contents)
  - [Specification](#specification)
  - [Usage](#usage)
    - [Environment variables](#environment-variables)
    - [劇場情報を取得する](#劇場情報を取得する)
  - [Code Samples](#code-samples)
  - [Documentation](#documentation)
  - [License](#license)

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

| Name    | Required | Value         | Purpose |
| ------- | -------- | ------------- | ------- |
| `DEBUG` | false    | coa-service:* | Debug   |

### 劇場情報を取得する

```js
const COA = require('@motionpicture/coa-service');

const masterService = new COA.service.Master({
    endpoint: '',
    auth: new COA.auth.RefreshTokenClient({
        endpoint: '',
        refreshToken: ''
    })
});

masterService.theater({
    theaterCode: '123'
})
    .then(console.log)
    .catch(console.error);
```

## Code Samples

Code sample are [here](https://github.com/motionpicture/coa-service/tree/master/example).

## Documentation

`npm run doc` emits typedoc to ./docs.

## License

ISC
