import { gql } from "@apollo/client";

const GET_CART = gql`
  query GET_CART {
    cart {
      contents(first: 100) {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
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
            }
          }
          variation {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
            attributes {
              id
              name
              value
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons {
        nodes {
          id
          discountType
          amount
          dateExpiry
          products {
            nodes {
              id
            }
          }
          productCategories {
            nodes {
              id
            }
          }
        }
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

export default GET_CART;
