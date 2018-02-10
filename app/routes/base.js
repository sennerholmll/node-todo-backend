const express = require('express')

function createRouter() {
  const router = new express.Router()

  router.route('/').get((req, res) => {
    res.send('Welcome to the Node Todo backend')
  })

  return router
}

module.exports = {
  createRouter
}