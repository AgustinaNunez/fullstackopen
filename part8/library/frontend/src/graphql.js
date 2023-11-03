import { gql } from '@apollo/client'

export const QUERY_ALL_AUTHORS = gql`
  query($authorName: String) {
    allAuthors(author: $authorName) {
      id
      name
      born
      bookCount
    }
  }
`
export const QUERY_ALL_BOOKS = gql`
  query($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      id
      title
      published
      author
      genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`