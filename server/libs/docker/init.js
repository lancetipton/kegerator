const Docker = require('dockerode')
const buildContainer = require('./container')

const init = (app) => {
  const { socketPath } = app.__config
  const docker = new Docker({ socketPath });
  docker.__app = app
  const dockerAPI = {
    docker,
    ...buildContainer(docker),
  }

  return dockerAPI
}

module.exports = {
  init,
}