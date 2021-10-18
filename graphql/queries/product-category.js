import { gql } from "@apollo/client";

const PRODUCT_CATEGORY = gql`
  query PRODUCT_CATEGORIES($id: ID!, $idType: ProductCategoryIdType) {
    productCategory(id: $id, idType: $idType) {
      name
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
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default PRODUCT_CATEGORY;
