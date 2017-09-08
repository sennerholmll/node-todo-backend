const express = require('express')
const { validate_entry } = require('../models/entry.js')

function create_router(db) {
  const router = express.Router()

  router.use(function(req, res, next) {
    req.entries = db.collection('Entry')
    next()
  })

  router.get('/', async function(req, res, next) {
    result = Array.from(await req.entries.find())
    res.json(result)
  })

  router.post('/', async function (req, res) {
    try {
      const entry = req.body
      const validation_result = validate_entry(entry)
      if (validation_result) {
        res.status(422).json(validation_result)
      } else {
        const entry = await req.entries.save(entry)
        res.status(201).json({ id: entryId.key })
      }
   } catch(error) {
     res.status(500).json({ error: error })
    }
  })

  return router
}

module.exports = {
  create_router
}