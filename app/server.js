const express = require('express')
const bodyParser = require('body-parser')

const base = require('./routes/base')
const items = require('./routes/items')

function applicationErrorHandler(err, req, res, next) {
  const status = err.errorCode || 500
  res.status(status).send(err.message)
}

function createServer(db) {
  const app = express()

  // Install middleware
  app.use(bodyParser.json())

  // Install application
  app.use('/', base.createRouter())
  app.use('/items', items.createRouter(db))

  app.use(applicationErrorHandler)

  return app
}

module.exports = {
  createServer
}