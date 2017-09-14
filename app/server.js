const express = require('express')
const bodyParser = require('body-parser')

const base = require('./routes/base')
const items = require('./routes/items')

// Install Express middleware
function installMiddlware(app) {
  app.use(bodyParser.json())
}

// Install the application routers
function installApplication(app, db) {
  app.use('/', base.createRouter())
  app.use('/items', items.createRouter(db))
}

// Install the error handlers
function installErrorHandlers(app) {
  app.use((err, req, res, next) => {
    console.log('WOAH HOLD ON!')
    const status = err.errorCode || 500
    res.status(status).send(err.message)
  })
}

/**
 * Craetes an express server and populates it with the application routes and middle ware.
 *
 * @param {Object} db The database (see /database)
 */
function createServer(db) {
  const app = express()

  installMiddlware(app)
  installApplication(app, db)
  installErrorHandlers(app)

  return app
}

module.exports = {
  createServer
}