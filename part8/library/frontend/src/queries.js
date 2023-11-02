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