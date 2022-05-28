import Server from './src/main/server'

const server = new Server()
server.setupRoutes()
server.start()
