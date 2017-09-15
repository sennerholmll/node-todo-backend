const express = require('express')
const bodyParser = require('body-parser')

const base = require('./routes/base')
const items = require('./routes/items')
const cors = require('cors')

// Fake auth to set a user-object on incoming requests until proper session/auth is in place
function fakeAuth(req, res, next) {
  req.user = { id: '123123', name: 'John Doe', email: 'john@doe.com' }
  next()
}

// Install Express middleware
function installMiddlware(app) {
  app.use(bodyParser.json())
  app.use(fakeAuth)
  app.use(cors({origin: 'http://localhost:8080'}))
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