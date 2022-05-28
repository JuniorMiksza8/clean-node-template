import Webserver from './src/infrastructure/webserver/server'

function start() {
  const webserver = new Webserver()
  webserver.start()
}

export default start()
