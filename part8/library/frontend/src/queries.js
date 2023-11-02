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