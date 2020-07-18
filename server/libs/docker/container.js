
const create = docker => {
  return opts => {
    return new Promise((res, rej) => {
      docker.createContainer((err, containers) => err ? rej(err) : res(containers))
    })
  }
}

const get = docker => {
  return id => {
    return new Promise((res, rej) => {
      const container = docker.getContainer(id)
      return !container
        ? rej(`Container with id ${id} not found!`)
        : container.inspect((err, data) => {
            err
              ? rej(`Error getting information for container ${id}!`)
              : res({ api: container, data })
          })
    })
  }
}

const list = docker => {
  return () => {
    return new Promise((res, rej) => {
      docker.listContainers((err, containers) => err ? rej(err) : res(containers))
    })
  }
}

const remove = docker => {
  return (container, opts) => {
    return new Promise((res, rej) => {
      container.kill(opts, (err, resp) => err ? rej(err) : res(resp))
    })
  }
}

const start = docker => {
  return (container, opts) => {
    return new Promise((res, rej) => {
      container.start(opts, (err, resp) => err ? rej(err) : res(resp))
    })
  }
}

const stop = docker => {
  return (container, opts) => {
    return new Promise((res, rej) => {
      container.stop(opts, (err, resp) => err ? rej(err) : res(resp))
    })
  }
}

module.exports = docker => {
  return {
    container: {
      create: create(docker),
      get: get(docker),
      kill: remove(docker),
      list: list(docker),
      remove: remove(docker),
      start: start(docker),
      stop: stop(docker),
    }
  }
}