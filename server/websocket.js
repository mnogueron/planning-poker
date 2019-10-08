const WebSocket = require('ws')
const uuid = require('uuid/v4')

module.exports.createServer = (server) => {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    // give unique id for a client
    ws.id = uuid()

    ws.on('message', (message) => {
      // link the userId to the websocket
      // in a real world the link between the client and the
      // socket would be done with something more secured than the userId
      // such as an auth token
      if (message.startsWith('[Link userId]')) {
        ws.userId = message.replace('[Link userId]', '')
      }
    })

    console.log(`Client connected with id: [${ws.id}]`)
  })

  return wss
}
