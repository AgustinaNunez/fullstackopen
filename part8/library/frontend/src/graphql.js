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
      author {
        name
        born
      }
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
      author {
        name
        born
      }
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`