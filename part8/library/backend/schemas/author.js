const { GraphQLError } = require('graphql')

const Author = require('../models/Author')
const Book = require('../models/Book')
const { GRAPHQL_ERROR } = require('../utils/constants')

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  extend type Query {
    authorCount: Int!
    allAuthors(author: String): [Author!]!
  }
  extend type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`
const resolvers = {
  Query: {
    authorCount: () => Author.countDocuments({}),
    allAuthors: async (root, args) => {
      const { author: authorName } = args
      const filter = {}
      if (authorName) {
        filter.name = authorName
      }
      const authors = await Author
        .find(filter)
        .populate('books')
      return authors.map(author => ({
        ...author.toJSON(),
        bookCount: author.books.length,
      }))
    },
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: GRAPHQL_ERROR.BAD_USER_INPUT,
          }
        })
      }

      const { name, setBornTo } = args
      try {
        const authorUpdated = await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        )
        return authorUpdated
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: GRAPHQL_ERROR.BAD_USER_INPUT,
            invalidArgs: args.name,
            error
          }
        })
      }
    },
  }
}

module.exports = {
  typeDefs,
  resolvers
}