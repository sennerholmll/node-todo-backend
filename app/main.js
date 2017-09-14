const {createServer} = require('./server')
const datastore = require('./database/datastore')
const memstore = require('./database/memstore')

const path = require('path')
const fs = require('fs')

function getDatastoreConfig(path) {
  const config = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : {}

  if (process.env.GOOGLE_DATASTORE_NAMESPACE) {
    config.namespace = process.env.GOOGLE_DATASTORE_NAMESPACE
  }

  return config
}

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

const config = getDatastoreConfig(path.join(__dirname, '..', 'config/datastore.json'))
const db = isProduction() ? datastore(config) : memstore()

const server = createServer(db)

server.listen(3333, () => {
  console.log('Server started on 3333')
  console.log('Running in production? ' + isProduction(config))
})