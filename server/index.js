require('module-alias/register')
require('dotenv').config()

const { app, init } = require('./api')
const { docker } = require('./libs/docker')
const { getKegTasks } = require('./libs/keg')
const { controllers } = require('./controllers')
const config = require('KegConfigs/server.config')
const { connect, ...routers } = require('./routers')
const { checkCall, setLogs } = require('@ltipton/jsutils')
const { websocket } = require('KegSSocket')


setLogs(process.env.LOG, 'log', '[ KEGERATOR ]')
app.__config = config

checkCall(async () => {

  // Add the docker api to the express app
  app.dockerAPI = docker.init(app)

  // connect the app to routers and controllers
  connect(app, routers, controllers)

  // Start the server
  const server = init(config.api || {})
  const kegTasks = await getKegTasks()

  websocket(server, kegTasks)

})