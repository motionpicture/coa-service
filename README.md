<img src="https://motionpicture.jp/images/common/logo_01.svg" alt="motionpicture" title="motionpicture" align="right" height="56" width="98"/>

# COA client library for Node.js

[![CircleCI](https://circleci.com/gh/motionpicture/coa-service.svg?style=svg&circle-token=e29e443f67a815be67d500d478ae3b8e413e7bab)](https://circleci.com/gh/motionpicture/coa-service)

node.jsでCOAサービスを使うためのライブラリです。


## Table of contents

* [Usage](#usage)
* [Example](#code-samples)
* [Jsdoc](#jsdoc)
* [License](#license)


## Usage

```shell
npm install @motionpicture/coa-service
```

```js
const COA = require('@motionpicture/coa-service');
```

### 以下環境変数の設定が必須です。

```shell
set COA_ENDPOINT=*****APIのエンドポイント*****
set COA_REFRESH_TOKEN=**********リクエストに必要なリフレッシュトークン*****
```

### 劇場情報を取得する
```js
const COA = require('@motionpicture/coa-service');

COA.services.master.theater({
    theaterCode: '123'
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});
```

### 作品情報を取得する
```js
const COA = require('@motionpicture/coa-service');

COA.services.master.title({
    theaterCode: '123'
}).then((films) => {
    console.log(films);
}).catch((err) => {
    console.error(err);
});
```

## Code Samples

コードサンプルは [example](https://github.com/motionpicture/coa-service/tree/master/example) にあります。


## Jsdoc

`npm run doc`でjsdocを作成できます。./docに出力されます。

## License

ISC
