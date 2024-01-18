import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          createdAt
          ratingAverage
          ownerAvatarUrl
          description
          stargazersCount
          language
          fullName
          reviewCount
          forksCount
        }
      }
    }
  }
`;
