import { gql } from '@apollo/client';

export const PRODUCT_PRICE_FRAGMENT = gql`
  fragment ProductPrice on ProductInterface {
    price_range {
      minimum_price {
        final_price {
          currency
          value
        }
      }
    }
  }
`;