const { makeExecutableSchema } = require('@graphql-tools/schema')
const { merge } = require('lodash')

const author = require('./schemas/author')
const book = require('./schemas/book')
const user = require('./schemas/user')

const rootTypeDefs = `
  type Query
  type Mutation
  type Subscription
`

const typeDefs = [
  rootTypeDefs,
  author.typeDefs,
  book.typeDefs,
  user.typeDefs,
].join('')

const resolvers = merge(
  author.resolvers,
  book.resolvers,
  user.resolvers
)

module.exports = makeExecutableSchema({
  typeDefs, 
  resolvers
})
