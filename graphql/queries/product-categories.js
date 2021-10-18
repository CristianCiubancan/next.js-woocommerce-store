import { gql } from "@apollo/client";

const PRODUCT_CATEGORIES = gql`
  query PRODUCT_CATEGORIES {
    productCategories(first: 200) {
      nodes {
        databaseId
        name
        slug
        parentId
        products {
          nodes {
            name
          }
        }
        children {
          nodes {
            databaseId
            name
            slug
            parentId
            products {
              nodes {
                name
              }
            }
            children {
              nodes {
                databaseId
                name
                slug
                parentId
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
  }
`;

export default PRODUCT_CATEGORIES;
