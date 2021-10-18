import { gql } from "@apollo/client";
const GET_CATEGORIES_WITH_PRODUCTS = gql`
  query PRODUCT_CATEGORIES {
    productCategories(first: 200) {
      nodes {
        id
        databaseId
        name
        slug
        parentId
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
              id
              featured
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
        children {
          nodes {
            databaseId
            name
            slug
            parentId
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
                  featured
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
            children {
              nodes {
                databaseId
                name
                slug
                parentId
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
                      featured
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
            }
          }
        }
      }
    }
  }
`;

export default GET_CATEGORIES_WITH_PRODUCTS;
