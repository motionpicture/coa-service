<img src="https://motionpicture.jp/images/common/logo_01.svg" alt="motionpicture" title="motionpicture" align="right" height="56" width="98"/>

# COA Client Library for Node.js

[![Build status](https://circleci.com/gh/ilovegadd/coa-service.png?style=shield&circle-token=e29e443f67a815be67d500d478ae3b8e413e7bab)](https://circleci.com/gh/ilovegadd/coa-service)

node.jsでCOAサービスを使うためのライブラリです。


# Getting Started

## Install

```shell
npm install @motionpicture/coa-service
```

## Usage

```Javascript
var COA = require('@motionpicture/coa-service');
```

When using the COA Service SDK, you must provide connection information. This can be provided using:

* set environment variables - For example,
```shell
set COA_ENDPOINT=*****
set COA_REFRESH_TOKEN=*****
```

* 劇場情報を取得する

``` js
const COA = require('@motionpicture/coa-service');

COA.services.master.theater({
    theaterCode: '118'
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err.message);
});
```

## Code Samples

コードサンプルは./exampleにあります。


# Tests

単体テストは以下で実行できます。

```shell
npm test
```


# Jsdoc

`npm run doc`でjsdocを作成できます。./docに出力されます。
