const express = require('express')

const base = require('./routes/base')
const entries = require('./routes/entries')

function create_server() {
  const app = express()
  const db = {
    find: function() {
      return 'these are all entries'
    }
  }

  // Install application
  app.use('/', base.create_router())
  app.use('/entries', entries.create_router(db))

  return app
}

module.exports = {
  create_server
}