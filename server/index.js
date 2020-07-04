const { app, init } = require('./api')
const { docker } = require('./libs/docker')
const { controllers } = require('./controllers')
const config = require('../configs/server.config')
const { connect, ...routers } = require('./routers')
const { checkCall, setLogs } = require('@ltipton/jsutils')

setLogs(process.env.LOG, 'log', '[ HOGS-HEAD ]')
app.__config = config

checkCall(() => {

  // Add the docker api to the express app
  app.dockerAPI = docker.init(app)

  // connect the app to routers and controllers
  connect(app, routers, controllers)

  // Start the server
  const server = init(config.api || {})

})