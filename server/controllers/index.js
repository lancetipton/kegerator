module.exports = {
  controllers: {
    ...require('./app'),
    ...require('./container'),
    ...require('./image'),
    ...require('./volume'),
  }
}