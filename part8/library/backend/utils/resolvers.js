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

module.exports = resolvers
