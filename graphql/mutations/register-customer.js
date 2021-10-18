import { gql } from "@apollo/client";

/**
 * Register customer mutation query.
 */
const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        id
        username
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

export default REGISTER_CUSTOMER;
