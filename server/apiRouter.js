const express = require('express')
const router = express.Router()

const pollRoutes = require('./routes/pollRoutes')

pollRoutes.setup(router)

module.exports = router
