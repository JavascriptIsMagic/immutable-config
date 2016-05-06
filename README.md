# immutable-config
Simple immutable config library for node.js modules for servers, CLI utilities, and while using tools like `gulp`.

Immutablity and merging of config objects is done by [Seamless-Immutable](https://www.npmjs.com/package/seamless-immutable).

Unflattening is done by [Flat](https://www.npmjs.com/package/flat)'s `unflatten` function.

[Yargs](https://www.npmjs.com/package/yargs) is used to parse argv.

Explicitly define your ./config.js file:
--
```js
var ImmutableConfig = require('immutable-config')
module.exports = ImmutableConfig.empty.merge(
  ImmutableConfig.env,
  ImmutableConfig.unflattenedEnv,
  ImmutableConfig.argvConfig || ImmutableConfig.envConfig || {},
  ImmutableConfig.argv,
  ImmutableConfig.unflattenedArgv
)
```
Or use the default merge (shown in the above example)
--
```js
var config = require('immutable-config').config
```

`ImmutableConfig.argvConfig` is the `require` of the `--config "some/filename.config.js"` from the commandline argv.

`ImmutableConfig.unflattenedArgv` is the `require` of the `CONFIG=some/filename.config.js` environment variable.

Security:
--
`ImmutableConfig` automatically uses the `require` statement on the commandline argument `--config` filename as well as environment veriable `CONFIG` filename if they are present.
