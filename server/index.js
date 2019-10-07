const express = require('express')
const http = require('http')
const app = express()
const WebSocket = require('ws')
const ApiRouter = require('./apiRouter')

const port = process.env.PORT || 3000

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// setup middleware to inject wss object in req object
app.use(function (req, res, next) {
  req.wss = wss
  return next()
})

// setup JSON middleware
app.use(express.json())

// add default ping endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// add api endpoints
app.use('/api', ApiRouter)

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.send('Hi there, I am a WebSocket server')
})

// start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

