const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const typeDefs = require('./utils/schema')
const resolvers = require('./utils/resolvers')
const config = require('./utils/config')

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers })

  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error trying to connect to MongoDB. ', error.message)
  }

  const app = express()
  await server.start()
  server.applyMiddleware({ app })

  const port = config.PORT
  app.listen({ port }, () => {
    console.log(`Servidor GraphQL en http://localhost:${port}${server.graphqlPath}`)
  })
}

startServer()
