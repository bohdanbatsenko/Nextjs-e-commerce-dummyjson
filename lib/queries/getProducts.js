import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProductsQuery {
      products(search: "", pageSize: 50) {
        items {
          __typename
          id
          name
          url_key
          categories {
            id
            name
            url_key
          }
          description {
            html
          }
          sku
          price_range {
            minimum_price {
              final_price {
                value
              }
            }
          }
          image {
            url
          }
          small_image {
            url
          }
          thumbnail {
            label
            url
          }
          media_gallery {
            url
            label
          }
          rating_summary
        }
      }
    }
`;