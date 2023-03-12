require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app