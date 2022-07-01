import Server from './src/main/server'

import { config } from 'dotenv'

config()

const { HTTP_SERVER_PORT } = process.env

const server = new Server()

server.start(Number(HTTP_SERVER_PORT))

server.setupRoutes()
