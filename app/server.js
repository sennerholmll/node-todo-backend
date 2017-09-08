const express = require('express')


function create_server() {
  const app = express()

  // Setup middleware

  app.use((req, res, next) => {
    req.foo = 'haha'
    console.log('Adding foo')
    return next()
  })

  // Setup routes

  app.get('/', (req, res) => {
    console.log('Got a request')
    res.send('Got foo ' + req.foo)
  })

  app.use((req, res, next) => {
    req.foo = 'sloff'
    return next()
  })

  app.get('/sliff', (req, res) => {
    res.send('Sliff: ' + req.foo)
  })

  app.use((req, res, next) => {
    req.foo = 'gnh!'
    return next()
  })

 

  return app
}

module.exports = { 
  create_server
}