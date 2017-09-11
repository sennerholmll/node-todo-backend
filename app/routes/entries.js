const express = require('express')
const { createEntry } = require('../models/entry.js')

function createRouter(db) {
  const router = express.Router()

  router.use((req, res, next) => {
    req.entries = db.collection('Entry')
    next()
  })

  router.get('/', (req, res, next) =>
    req.entries.find()
      .then(result => Array.from(result.entities))
      .then(entries => res.status(200).json(entries))
      .catch(err => next(err))
  )

  router.post('/', (req, res) =>
    Promise.resolve(createEntry(req.body))
      .then(entry => req.entries.save(entry))
      .then(entry => res.status(201).json(entry))
      .catch(err => next(error))
  )

  return router
}

module.exports = {
  createRouter
}
