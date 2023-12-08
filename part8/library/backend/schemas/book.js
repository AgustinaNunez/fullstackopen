const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('../models/Book')
const Author = require('../models/Author')
const { GRAPHQL_ERROR, SUBSCRIPTION } = require('../utils/constants')

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }
  extend type Query {
    bookCount: Int!
    allBooks(genre: String, author: String): [Book!]!
  }
  extend type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
  }
  extend type Subscription {
    bookAdded: Book!
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    allBooks: async (root, args) => {
      const { genre, author } = args
      const filter = {}
      if (genre?.length) {
        filter.genres = { $in: genre }
      }
      if (author) {
        const bookAuthor = await Author.findOne({ name: author })
        if (bookAuthor) {
          filter.author = bookAuthor._id
        }
      }
      const books = await Book.find(filter).populate('author', {name: 1, born: 1})
      return books.map(book => book.toJSON())
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: GRAPHQL_ERROR.BAD_USER_INPUT,
          }
        })
      }

      const {title, published, author: authorName, genres} = args
      const author = await Author.findOneAndUpdate(
        { name: authorName },
        { $setOnInsert: { name: authorName } },
        { new: true, upsert: true }
      )
      if (!author?._id) throw new Error('Could not create new author')
      try {
        const newBook = new Book({
          title,
          published,
          author: author._id,
          genres,
        })
        const bookSaved = await newBook.save()
        author.books.push(bookSaved._id)
        await author.save()
        
        const book = await Book
          .findOne({_id: bookSaved._id})
          .populate('author', {name: 1, born: 1})

        pubsub.publish(SUBSCRIPTION.BOOK_ADDED, { bookAdded: book })
        
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: GRAPHQL_ERROR.BAD_USER_INPUT,
            invalidArgs: args.name,
            error
          }
        })
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(SUBSCRIPTION.BOOK_ADDED)
    },
  },
}

module.exports = {
  typeDefs,
  resolvers
}