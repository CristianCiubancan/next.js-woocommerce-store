import { gql } from "@apollo/client";
const GET_CUSTOMER_ORDER = gql`
  query GET_CUSTOMER_ORDER($customerId: Int) {
    customer(customerId: $customerId) {
      id
      orders {
        edges {
          node {
            id
            date
            status
            total
            customerNote
            paymentMethodTitle
            lineItems {
              edges {
                node {
                  product {
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_CUSTOMER_ORDER;
