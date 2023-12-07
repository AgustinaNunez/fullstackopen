const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { GRAPHQL_ERROR } = require('../utils/constants')

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username } = args
      const user = new User({ username })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: GRAPHQL_ERROR.BAD_USER_INPUT,
              invalidArgs: username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })
      if (!user || password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: GRAPHQL_ERROR.BAD_USER_INPUT
          }
        })
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET)
      }
    },
  },
}

module.exports = {
  typeDefs,
  resolvers
}