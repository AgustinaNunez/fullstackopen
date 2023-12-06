const { ApolloServer } = require('apollo-server-express')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
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

console.log('Connecting to MongoDB')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connection to MongoDB: ', error.message)
  })

const startServer = async () => {
  const app = express()
  app.use(cors())
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  const wsServerCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
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

  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })

  const port = process.env.PORT
  httpServer.listen(port, () =>
    console.log(`GraphQL server running on http://localhost:${port}/graphql`)
  )
}

startServer()
