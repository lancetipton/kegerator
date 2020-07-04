const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const setPublic = (app, public=[]) => {
  public.concat([ '../public' ])
    .map(location => app.use(express.static(location)))
}

const configure = (app, config) => {

  //Set which port to listen on
  app.set('port', config.port || process.env.PORT || 3000)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  setPublic(app, config.public)

}

const listen = (app, config) => {
  // Start the express server
  const server = app.listen(app.get('port'), ()  => {
    const address = server.address().address
    const host = address === '::' ? 'localhost' : address
    const port = server.address().port

    console.log(`Listening at http://${host}:${port}`);
  })

  return server
}

const init = (config={}) => {

  // Setup the server configuration
  configure(app, config)

  // Start the listening with express server
  return listen(app, config)

}

module.exports = {
  init,
  app
}