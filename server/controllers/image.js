// const {Docker} = require('node-docker-api')
const docker = { image: { get: () => {} }}
const getContainer = docker.image.get

const list = (app, router, config) => router.get(`/list`, (req, res) => {
  
})

const get = (app, router, config) => router.get(`/:id`, getContainer, (req, res) => {
  
})

const start = (app, router, config) => router.post(`/:id/start`, getContainer, (req, res) => {
  
})

const stop = (app, router, config) => router.post(`/:id/stop`, getContainer, (req, res) => {
  
})

const remove = (app, router, config) => router.delete(`/:id`, getContainer, (req, res) => {
  
})

const routes = (app, router, config) => {

  list(app, router, config)

  get(app, router, config)

  start(app, router, config)

  stop(app, router, config)

  remove(app, router, config)

}

module.exports = {
  image: routes
}