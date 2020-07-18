const { get, uuid, deepMerge, reduceObj } = require('jsutils')
const { NODE_ENV, COMMANDS_PATH } = process.env
const COMMANDS = process.env.COMMANDS || 'kegerator'
const commandConfig = require(COMMANDS_PATH || 'KegConfigs/cmds.config.json')
const typeCommands = get(commandConfig, `${ COMMANDS }.commands`)
const filters = get(commandConfig, `${ COMMANDS }.filters`, {})
const commandTypes = get(commandConfig, `${ COMMANDS }.types`, [])

// const { mapTasks } = require('KegSUtils/keg/mapTasks')
// const mapped = mapTasks()
// console.log(`---------- mapped ----------`)
// console.log(mapped)

if(!typeCommands)
  throw new Error(
    `No commands exist for type => ${ COMMANDS }. Add commands by editing configs/cmds.config.json`
  )

const activeCommands = NODE_ENV === 'production'
  ? typeCommands.production
  : deepMerge(
      typeCommands.production,
      typeCommands.development,
    )

module.exports = {
  filters,
  commandTypes,
  commands: reduceObj(activeCommands, (key, value, groups) => {
    groups[key] = reduceObj(groups[key], (command, options, commands) => {
      commands[command].id = uuid()
      return commands
    }, groups[key])

    return groups
  }, activeCommands)
}
