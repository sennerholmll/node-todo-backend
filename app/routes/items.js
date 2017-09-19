const express = require('express')
const { createTodoItem } = require('../models/todoitem.js')

/**
 * Fetches a request todo item from the incoming request. This should be validated
 * against the todo item constraints by calling createTodoItem which will return an
 * object that can be persisted.
 *
 * @param {*} req The HTTP request
 * @param {*} requestItem The item as sent with the request
 */
function getRequestItem(request) {
  const item = request.body
  if (item && request.user) {
    item.user = request.user.id || null
  }
  return item
}

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
      .catch(error => next(error))
  )

  router.post('/', (req, res, next) =>
    Promise.resolve(getRequestItem(req))
      .then(requestItem => createTodoItem(requestItem))
      .then(item => req.items.save(item))
      .then(item => res.status(201).json(item))
      .catch(error => next(error))
  )

  router.delete('/:key', (req, res, next) =>
    req.items.findOne(req.params.key)
      .then(item => req.items.delete(item.key))
      .then(() => res.status(200).send())
      .catch(error => next(error))
      .then()
  )

  return router
}

module.exports = {
  createRouter
}
