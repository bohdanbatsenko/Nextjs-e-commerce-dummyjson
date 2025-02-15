import { gql } from '@apollo/client';

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: Int!) {
    category(id: $id) {
      name
      products {
        items {
          id
          name
          sku
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
          image {
            url
          }
        }
      }
    }
  }
`;