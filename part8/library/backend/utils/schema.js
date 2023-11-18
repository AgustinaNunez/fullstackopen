const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    allBooks(genre: String, author: String): [Book!]!
    authorCount: Int!
    allAuthors(author: String): [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
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

module.exports = typeDefs
