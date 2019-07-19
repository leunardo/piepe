## Piepe 🥧 [![Build Status](https://travis-ci.org/leunardo/piepe.svg?branch=master)](https://travis-ci.org/leunardo/piepe) [![Coverage Status](https://coveralls.io/repos/github/leunardo/piepe/badge.svg?branch=master)](https://coveralls.io/github/leunardo/piepe?branch=master)

Pipe your data in a stream-like API

### Instalation
> npm i piepe

### How to use

```js
import { pipe, pipeValue, pipeBind } from 'piepe';
// or
import * as piepe from 'piepe';
// or
const piepe = require('piepe');

// here I have some functions
function sumWith(value) {
    return arg => arg + value;
}

function multiplyWith(value) {
    return arg => arg * value;
}

function log(arg) {
    console.log('Received: ' + arg);
    return arg;
}

function doInternalStuff(arg) {
    return this.importantNumber + arg;
}

const arg = 0;
const sumWith4 = sumWith(4);
const multiplyWith12 = multiplyWith(12);
const myContext = {
    importantNumber: 1
};

let result = pipe(
    sumWith4,
    multiplyWith12,
    log
)(arg)
// 48

result = pipeValue(arg).to(
    sumWith4,
    multiplyWith12,
    log
);
// 48

// if we don't pass the this, the doInternalStuff will fail, so we need to use pipeBind here
result = pipeBind([
    sumWith4,
    multiplyWith12,
    doInternalStuff,
    log
], myContext)(arg)
// 49


// we can pass the context using pipeValue too
result = pipeValue(arg, myContext).to(
    sumWith4,
    multiplyWith12,
    doInternalStuff,
    log
);
// 49
```