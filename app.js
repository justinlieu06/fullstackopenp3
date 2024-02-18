const config = require('./utils/config')
const express = require('express')
const app = express()
// cors mechanism is necessary to communicate w/ apps running on a different port/url
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint)
// this has to be the last loaded middleware.
app.use(middleware.errorHandler)

module.exports = app