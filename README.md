Modernizr/RequireJS Plugin
===

A Require.js plugin for Modernizr tests. Based on [stucox's idea](https://github.com/stucox/require-modernizr/blob/master/README.md).

**This plugin is not production ready.**

## Use

This plugin can be used to return the result of a test from Modernizr, or to load a script conditionally on the outcome of a test.

### Get the Result of a Test

To get the result of a test, simply use `'modernizr:testName'` as a dependency, where `testName` is the name of a test property on the `Modernizr` object.

```js
require(['modernizr!touch'], function (touchSupport) {
  if (touchSupport) {
    // touchSupport is the result of Modernizr.touch
    // ...
  }
});
```

### Load a Script based on Result

If you want to load a different script based on whether a Modernizr test passed or failed, you can use `'modernizr:testName?passed:failed'` where `passed` and `failed` are AMD modules that require.js can load.

```js
require(['modernizr!video?normal-player:fallback-player'], function (player) {
  // ...
});
```

### Only load one script

You may only need to load one script, for instance, a polyfill if the test fails, or only loading a feature if it's supported. Just leave the other part blank: `'modernizr:testName?passed'` or `'modernizr:testName?:failed'`.

```js
require(['modernizr!classList?:classlist-polyfill'], function () {
  // ...
});
```

## Configuration

Tests can be overridden with `require.config()`.

```js
require.config({
  modernizr: {
    testName: true
  }
});
```

## TODO

1. Tests
2. Support for nested properties
3. Optimizer support
4. Asynchronous test support
5. Lots more

## License

MIT License
