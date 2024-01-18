import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          ratingAverage
          ownerAvatarUrl
          description
          stargazersCount
        }
      }
    }
  }
`;
