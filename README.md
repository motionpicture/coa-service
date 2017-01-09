# COA Client Library for Node.js

This project provides a Node.js package that makes it easy to use COA Services.

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

Some samples are available.

* [How to use the findTheater Service from Node.js](/examples/samples/findTheater.js)
