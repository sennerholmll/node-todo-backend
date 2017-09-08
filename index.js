const {create_server} = require('./app/server')
const datastore = require('./database/datastore')
const memstore = require('./database/memstore')

const db = process.env.NODE_ENV === 'production' ? datastore() : memstore()

const server = create_server(db)

server.listen(3333, () => {
  console.log('Server started on 3333')
})