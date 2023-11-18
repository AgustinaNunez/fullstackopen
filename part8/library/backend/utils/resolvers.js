const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')

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
    authorCount: () => Author.countDocuments({}),
    allAuthors: async (root, args) => {
      const { author: authorName } = args
      const filter = {}
      if (authorName) {
        filter.name = authorName
      }
      let authors = await Author.find(filter)
      authors = await Promise.all(authors.map(async author => {
        const authorBooks = await Book.find({author: author._id})
        return {
          ...author.toJSON(),
          bookCount: authorBooks.length
        }
      }))
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const {title, published, author: authorName, genres} = args
      let author = await Author.findOne({ name: authorName })
      if (!author) {
        author = new Author({ name: authorName })
        await author.save()
      }
      if (!author?._id) throw new Error('Could not create new author')
      try {
        const newBook = new Book({
          title,
          published,
          author: author._id,
          genres,
        })
        const bookSaved = await newBook.save()
        const book = await Book
          .findOne({_id: bookSaved._id})
          .populate('author', {name: 1, born: 1})
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    editAuthor: async (root, args) => {
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
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const { username } = args
      const user = new User({ username })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
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
            code: 'BAD_USER_INPUT'
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
  }
}

module.exports = resolvers
