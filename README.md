# COA Client Library for Node.js

node.jsでCOAサービスを使うためのパッケージです。

# Features

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

* initializing - For example, `COA.inititalize({endpoint: "", refresh_token: ""}});`
or
* set environment variables - For example,
```shell
set COA_ENDPOINT=*****
set COA_REFRESH_TOKEN=*****
```


## Code Samples

コードサンプルは以下にあります。

* [node.jsで劇場情報を取得する](https://m-p.backlog.jp/git/SSKTS/src_coa_service/tree/master/examples/samples/findTheater.js)

# JsDoc

`grunt jsdoc`でjsdocを作成できます。./docsに出力されます。
