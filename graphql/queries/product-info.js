import { gql } from "@apollo/client";

const PRODUCT_INFO = gql`
  query PRODUCT_INFO {
    products(first: 2000) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          name
          databaseId
          description(format: RAW)
          type
          slug
          onSale
          shortDescription
          galleryImages {
            nodes {
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
          image {
            mediaItemUrl
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
              }
            }
          }
          ... on VariableProduct {
            name
            price
            regularPrice
            variations {
              nodes {
                name
                databaseId
                price
                regularPrice
              }
            }
          }
          ... on ExternalProduct {
            name
            price
            regularPrice
          }
          ... on SimpleProduct {
            name
            price
            regularPrice
          }
          ... on GroupProduct {
            name
            price
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  price(format: RAW)
                  regularPrice
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default PRODUCT_INFO;
