const express = require('express')
const router = express.Router()

const pollRoutes = require('./routes/pollRoutes')
const userRoutes = require('./routes/userRoutes')

pollRoutes.setup(router)
userRoutes.setup(router)

module.exports = router
