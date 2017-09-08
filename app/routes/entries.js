const express = require('express')

function create_router(db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    res.send('Go entries go! ' + db.find())
  })

  return router
}

module.exports = {
  create_router
}