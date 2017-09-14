const {createServer} = require('./server')
const datastore = require('./database/datastore')
const memstore = require('./database/memstore')
const path = require('path')

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

const config = datastore.getConfig(path.join(__dirname, '..', 'config/datastore.json'),
                                   process.env)
const db = isProduction() ? datastore.create(config) : memstore()

const server = createServer(db)

server.listen(3333, () => {
  console.log('Server started on 3333')
  console.log('Running in production? ' + isProduction(config))
})