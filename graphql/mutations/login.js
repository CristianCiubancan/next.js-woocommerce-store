import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation LOGIN($input: LoginInput!) {
    login(input: $input) {
      user {
        databaseId
        id
        username
        name
        email
        firstName
        lastName
        jwtAuthToken
        jwtRefreshToken
        jwtAuthExpiration
      }
    }
  }
`;

export default LOGIN;
