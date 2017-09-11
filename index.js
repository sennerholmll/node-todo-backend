const {createServer} = require('./app/server')
const datastore = require('./database/datastore')
const memstore = require('./database/memstore')

const path = require('path')
const fs = require('fs')

function getConfigFile() {
  const configFile = path.join(__dirname, 'config.json')

  if (fs.existsSync(configFile)) {
    return JSON.parse(fs.readFileSync(configFile, 'utf8'))
  }

  return null
}

function isProduction(config) {
  const envSet = process.env.NODE_ENV === 'production'
  return (envSet && config !== null)
}

const config = getConfigFile()
const db = isProduction(config) ? datastore(config) : memstore()

const server = createServer(db)

server.listen(3333, () => {
  console.log('Server started on 3333')
  console.log('Running in production? ' + isProduction(config))
})