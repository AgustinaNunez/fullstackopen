const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const typeDefs = require('./utils/schema')
const resolvers = require('./utils/resolvers')
const config = require('./utils/config')
const User = require('./models/User')

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })

  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error trying to connect to MongoDB. ', error.message)
  }

  const app = express()
  app.use(cors())
  await server.start()
  server.applyMiddleware({ app })

  const port = config.PORT
  app.listen({ port }, () => {
    console.log(`Servidor GraphQL en http://localhost:${port}${server.graphqlPath}`)
  })
}

startServer()
