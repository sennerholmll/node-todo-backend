const express = require('express')
const { createTodoItem } = require('../models/todoitem.js')

function createRouter(db) {
  const router = express.Router()

  router.use((req, res, next) => {
    req.items = db.collection('TodoItem')
    next()
  })

  router.get('/', (req, res, next) =>
    req.items.find()
      .then(result => Array.from(result.entities))
      .then(items => res.status(200).json(items))
      .catch(err => next(err))
  )

  router.post('/', (req, res, next) =>
    Promise.resolve(createTodoItem(req.body))
      .then(item => req.items.save(item))
      .then(item => res.status(201).json(item))
      .catch(err => next(error))
  )

  return router
}

module.exports = {
  createRouter
}
