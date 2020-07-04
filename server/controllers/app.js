const get = (app, router, config) => router.get(`/`, (req, res) => {

  // The request created a new resource object
  res.statusCode = 200
  res.json({ status: 'Running' })

})

const routes = (app, router, name, config) => {

  // Catch all get route
  get(app, router, config)

}

module.exports = {
  app: routes
}