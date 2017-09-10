const express = require('express')
const bodyParser = require('body-parser')

const base = require('./routes/base')
const entries = require('./routes/entries')

function applicationErrorHandler(err, req, res, next) {
  const status = err.errorCode || 500
  res.status(status).send(JSON.stringify(err.message))
}

function createServer(db) {
  const app = express()

  // Install middleware
  app.use(bodyParser.json())

  // Install application
  app.use('/', base.createRouter())
  app.use('/entries', entries.createRouter(db))

  app.use(applicationErrorHandler)

  return app
}

module.exports = {
  createServer
}