var Immutable = require('seamless-immutable')
var unflatten = require('flat').unflatten
var argv = require('yargs').argv

var Config = module.exports = {
  config: {},
  env: process.env,
  unflattenedEnv: unflatten(process.env),
  argv: argv,
  unflattenedArgv: unflatten(argv)
}

if (Config.argv.config != null) {
  try {
    Config.argvConfig = require(Config.argv.config)
  } catch (error) {
    console.warn('Config file from commandline --config ' + Config.argv.config + ' could not be loaded.')
    throw error
  }
}

if (Config.env.config != null) {
  try {
    Config.envConfig = require(Config.env.config)
  } catch (error) {
    console.warn('Config file from environment veriable CONFIG=' + Config.argv.config + ' could not be loaded.')
    throw error
  }
}

Config.empty = Immutable.from({})

Config.config = Config.empty.merge([
  Config.env,
  Config.unflattenedEnv,
  Config.argvConfig || Config.envConfig || {},
  Config.argv,
  Config.unflattenedArgv
], {deep: true})

module.exports = Immutable.from(Config)
