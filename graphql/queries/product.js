import { gql } from "@apollo/client";

const PRODUCT = gql`
  query PRODUCT($id: ID!, $idType: ProductIdTypeEnum) {
    product(id: $id, idType: $idType) {
      databaseId
      slug
      description
      type
      galleryImages {
        nodes {
          id
          title
          altText
          mediaItemUrl
          mediaDetails {
            sizes {
              height
              width
              name
              sourceUrl
            }
          }
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl
        mediaDetails {
          sizes {
            height
            width
            name
            sourceUrl
          }
        }
      }
      name
      ... on SimpleProduct {
        price
        regularPrice
        id
      }
      ... on VariableProduct {
        price
        id
        regularPrice
        variations {
          nodes {
            name
            databaseId
            price
          }
        }
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
        regularPrice
      }
      ... on GroupProduct {
        id
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
`;

export default PRODUCT;
