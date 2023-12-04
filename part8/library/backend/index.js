const { ApolloServer } = require('@apollo/server')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const typeDefs = require('./utils/schema')
const resolvers = require('./utils/resolvers')
const config = require('./utils/config')
const User = require('./models/User')

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const wsServerCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose()
            },
          }
        },
      },
    ]
  })

  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error trying to connect to MongoDB. ', error.message)
  }

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
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
  )

  const port = config.PORT
  app.listen({ port }, () => {
    console.log(`Servidor GraphQL en http://localhost:${port}`)
  })
}

startServer()
