const {create_server} = require('./app/server')

const server = create_server()

server.listen(3333, () => {
  console.log('Server started on 3333')
})