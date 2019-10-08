const express = require('express')
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const WebSocket = require('ws')
const swaggerSpecs = require('./setupSwagger')
const ApiRouter = require('./apiRouter')

const PORT = process.env.PORT || 3000

const app = express()

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.send('Hi there, I am a WebSocket server')
})

// start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

