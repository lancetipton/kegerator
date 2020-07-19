const { isStr, get } = require('@ltipton/jsutils')

const build = docker => {
  return ({ tags, ...opts }) => {
    return new Promise((res, rej) => {
      docker.buildImage(opts, { ...tags }, (err, imageName) => err ? rej(err) : res(imageName))
    })
  }
}

const get = docker => {
  return id => {
    return new Promise((res, rej) => {
      const image = docker.getImage(id)
      return !image
        ? rej(`Image with id ${id} not found!`)
        : image.inspect((err, data) => {
            err
              ? rej(`Error getting information for image ${id}!`)
              : res({ api: image, data })
          })
    })
  }
}

const list = docker => {
  return () => {
    return new Promise((res, rej) => {
      docker.listImages((err, images) => err ? rej(err) : res(images))
    })
  }
}

const remove = docker => {
  return (imageId, opts) => {
    return new Promise((res, rej) => {
      imageId = imageId.indexOf(":") != -1
        ? imageId.split(":")[1]
        : imageId

      docker.getImage(imageId)
        .remove(opts, (err, resp) => err ? rej(err) : res(resp))

    })
  }
}

const run = docker => {
  return (image, opts) => {
    return new Promise((res, rej) => {
      image.start(opts, (err, resp) => err ? rej(err) : res(resp))
    })
  }
}


module.exports = docker => {
  return {
    image: {
      build: build(docker),
      get: get(docker),
      kill: remove(docker),
      list: list(docker),
      remove: remove(docker),
      start: start(docker),
      stop: stop(docker),
    }
  }
}