const path = require('path')
const { uuid, isArr } = require('jsutils')
const rootDir = require('KegRoot')
const kegScript = path.join(rootDir, `./scripts/keg_commands.sh`)
const { commandTypes } = require('./loadCommands')

const isKegCLICommand = (cmd, params) => {
  if(isArr(commandTypes) && commandTypes.indexOf(cmd) === -1 ) return [ cmd, params ]

  params.unshift(cmd)
  params.unshift(kegScript)

  return [ 'bash', params ]

}

const kegCLIMessage = '[ Keg-CLI ]'


module.exports = {
  isKegCLICommand,
  kegCLIMessage
}