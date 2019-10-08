const express = require('express')
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./setupSwagger')
const ApiRouter = require('./apiRouter')
const webSocket = require('./websocket')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

// setup websocket
const wss = webSocket.createServer(server)

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

// add api and docs endpoints
app.use('/api', ApiRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

