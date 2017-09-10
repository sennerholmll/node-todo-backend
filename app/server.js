const express = require('express')
const bodyParser = require('body-parser')

const base = require('./routes/base')
const entries = require('./routes/entries')

function applicationErrorHandler(err, req, res, next) {
  const status = err.errorCode || 500
  res.status(status).send(JSON.stringify(err.message))
}

function create_server(db) {
  const app = express()

  // Install middleware
  app.use(bodyParser.json())

  // Install application
  app.use('/', base.create_router())
  app.use('/entries', entries.create_router(db))

  app.use(applicationErrorHandler)

  return app
}

module.exports = {
  create_server
}