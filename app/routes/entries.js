const express = require('express')
const { create_entry } = require('../models/entry.js')

function create_router(db) {
  const router = express.Router()

  router.use(function(req, res, next) {
    req.entries = db.collection('Entry')
    next()
  })

  router.get('/', (req, res, next) =>
    req.entries.find()
      .then(entries => Array.from(entries))
      .then(entries => res.status(200).json(entries))
  )

  router.post('/', (req, res) =>
    Promise.resolve(create_entry(req.body))
      .then(entry => req.entries.save(entry))
      .then(entry => res.status(201).json(entry))
  )

  return router
}

module.exports = {
  create_router
}