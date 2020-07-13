const { commands } = require('./commands')
const { docker } = require('./docker')
const { websocket } = require('./websocket')


module.exports = {
  commands,
  docker,
  websocket,
}
