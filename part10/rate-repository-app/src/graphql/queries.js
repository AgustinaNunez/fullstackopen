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

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
