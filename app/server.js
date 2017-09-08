const express = require('express')
const bodyParser = require('body-parser')

const base = require('./routes/base')
const entries = require('./routes/entries')

function create_server(db) {
  const app = express()

  // Install middleware
  app.use(bodyParser.json())

  // Install application
  app.use('/', base.create_router())
  app.use('/entries', entries.create_router(db))

  return app
}

module.exports = {
  create_server
}