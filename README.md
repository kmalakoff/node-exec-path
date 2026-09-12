# node-exec-path

Find a Node.js executable in `PATH` that satisfies a semver range.

```sh
npm install node-exec-path
```

## Usage

```js
const { satisfiesSemverSync } = require('node-exec-path');

const execPath = satisfiesSemverSync('>=18.0');
console.log(execPath || 'No matching Node.js executable found in PATH');
```

## Documentation

[API Docs](https://kmalakoff.github.io/node-exec-path/)
