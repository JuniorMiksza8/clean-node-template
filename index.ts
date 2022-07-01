import Server from './src/main/server'
import { config } from 'dotenv'

config()

const { HTTP_SERVER_PORT, SENTRY_DSN = '' } = process.env

const server = new Server()

server.setupSentry(SENTRY_DSN)

server.setupRoutes()

server.start(Number(HTTP_SERVER_PORT))
