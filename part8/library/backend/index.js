const { ApolloServer } = require('@apollo/server')
const { v1: uuid } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: String!
    genres: [String]
  }
  type Query {
    bookCount: Int!
  }
  type Query {
    allBooks(genre: String, author: String): [Book!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Query {
    authorCount: Int!
  }
  type Query {
    allAuthors(author: String): [Author!]!
  }
  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      const { genre, author } = args
      return books
        .filter(book => genre ? book.genres.includes(genre) : true)
        .filter(book => author ? book.author === author : true)
    },
    authorCount: () => authors.length,
    allAuthors: (root, args) => {
      const { author: authorArg } = args
      return authors
        .filter(author => authorArg ? author.name === authorArg : true)
        .map(author => {
          return {
            ...author,
            bookCount: books.filter(book => book.author === author.name).length
          }
        })
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = {
        ...args,
        id: uuid()
      }
      books.push(book)
      const authorExists = authors.includes(args.author)
      if (!authorExists) authors.push({
        name: args.author,
        id: uuid()
      })
      return book
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args
      const authorFounded = authors.find(author => author.name === name) || null
      if (authorFounded) {
        authorFounded.born = setBornTo
      }
      return { name, born: setBornTo }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
