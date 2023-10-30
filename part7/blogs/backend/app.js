require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to MongoDB...')
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error trying to connect to MongoDB. ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', require('./controllers/login'))
app.use('/api/users', require('./controllers/users'))
if (process.env.NODE_ENV === 'testing') {
  app.use('/api/testing', require('./controllers/testing'))
}
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, require('./controllers/blogs'))


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app