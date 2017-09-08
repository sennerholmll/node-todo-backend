const express = require('express')

function create_router(db) {
  const router = express.Router()

  router.use(function(req, res, next) {
    req.entries = db.collection('Entry')
    next()
  })

  router.get('/', (req, res, next) => {
    res.send('Go entries go! ' + req.entries.find())
  })

  return router
}

module.exports = {
  create_router
}