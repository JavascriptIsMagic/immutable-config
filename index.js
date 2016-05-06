var Immutable = require('seamless-immutable')
var unflatten = require('flat').unflatten
var argv = require('yargs').argv

var ImmutableConfig = {
  config: {},
  env: process.env,
  unflattenedEnv: unflatten(process.env),
  argv: argv,
  unflattenedArgv: unflatten(argv)
}

if (ImmutableConfig.argv.config != null) {
  try {
    ImmutableConfig.argvConfig = require(ImmutableConfig.argv.config)
  } catch (error) {
    console.warn('Config file from commandline --config ' + ImmutableConfig.argv.config + ' could not be loaded.')
    throw error
  }
}

if (ImmutableConfig.env.config != null) {
  try {
    ImmutableConfig.envConfig = require(ImmutableConfig.env.config)
  } catch (error) {
    console.warn('Config file from environment veriable CONFIG=' + ImmutableConfig.argv.config + ' could not be loaded.')
    throw error
  }
}

ImmutableConfig.empty = Immutable.from({})

ImmutableConfig.config = ImmutableConfig.empty.merge(
  ImmutableConfig.env,
  ImmutableConfig.unflattenedEnv,
  ImmutableConfig.argvConfig || ImmutableConfig.envConfig || {},
  ImmutableConfig.argv,
  ImmutableConfig.unflattenedArgv
)

module.exports = Immutable.from(ImmutableConfig)
