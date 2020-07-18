const { isArr, limbo, checkCall } = require('jsutils')
const { errorResponse } = require('../utils/error')

const getContainerData = app => {
  return async (req, res, next) => {
    const { id } = req.params
    const [ listErr, containers ] = await limbo(app.dockerAPI.container.list())

    if(listErr) return errorResponse(res, 404, listErr.stack)

    res.containers = containers
    const [ getErr, container ] = id
      ? await limbo(app.dockerAPI.container.get(id))
      : []
    
    if(getErr) return errorResponse(res, 404, getErr.stack)

    res.container = container

    next()
  }
}

const list = (app, router, dockerData, loc) => router.get(loc || `/list`, dockerData, (req, res) => {
  res.statusCode = 200
  res.json({ status: 200, data: res.containers })
})

const get = (app, router, dockerData) => router.get(`/:id`, dockerData, (req, res) => {
  res.statusCode = 200
  res.json({ status: 200, data: res.container.data })
})

const start = (app, router, dockerData) => router.post(`/:id/start`, dockerData, async (req, res) => {

  const [ err, stated ] = await limbo(app.dockerAPI.container.start(res.container.api))
  if(err) return errorResponse(res, 501, err.stack)

  res.statusCode = 200
  res.json({
    status: 200,
    data: res.container,
    message: `Starting container with id ${res.container.id}`
  })

})

const stop = (app, router, dockerData) => router.post(`/:id/stop`, dockerData, async (req, res) => {

  const [ err, stated ] = await limbo(app.dockerAPI.container.stop(res.container.api))
  if(err) return errorResponse(res, 501, err.stack)

  res.statusCode = 200
  res.json({
    status: 200,
    data: res.container,
    message: `Stopping container with id ${res.container.id}`
  })

})

const remove = (app, router, dockerData) => router.delete(`/:id`, dockerData, async (req, res) => {

  const [ err, stated ] = await limbo(app.dockerAPI.container.remove(res.container.api))
  if(err) return errorResponse(res, 501, err.stack)

  res.statusCode = 200
  res.json({
    status: 200,
    data: res.container,
    message: `Removing container with id ${res.container.id}`
  })

})

const routes = (app, router) => {

  const dockerData = getContainerData(app)

  // Add the base route
  list(app, router, dockerData, '/')

  // List all docker containers
  list(app, router, dockerData)

  // Get a docker container by id
  get(app, router, dockerData)

  // Start a stopped docker container
  start(app, router, dockerData)

  // Stop a running docker container
  stop(app, router, dockerData)

  // Remove / Kill a docker container
  remove(app, router, dockerData)

}

module.exports = {
  container: routes
}