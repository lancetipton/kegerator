const { mapObj, checkCall } = require('jsutils')

const addControllersToRouters = (app, routers, controllers, config) => {
  mapObj(routers, (name, router) => checkCall(controllers[name], app, router))
}

const addRoutersToApp = (app, { app:appRouter, ...routers}) => {
  // Map the routers to the express app by name
  mapObj(routers, (name, router) => app.use(`/${name}`, router))

  // Add a catch all through the app router
  app.use(`/*`, appRouter)

}

const connect = (app, routers={}, controllers={}) => {
  addControllersToRouters(app, routers, controllers)
  addRoutersToApp(app, routers)
}

module.exports = {
  connect
}