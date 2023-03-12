const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.name === 'Error') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')?.replace(/^'|'$/g, '')
  const authClean = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null
  const decodedToken = jwt.verify(authClean, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.token = decodedToken
  next()
}

const userExtractor = async (request, _response, next) => {
  const user = await User.findById(request.token.id)
  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}