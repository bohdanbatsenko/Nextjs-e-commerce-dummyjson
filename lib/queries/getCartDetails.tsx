import { gql } from '@apollo/client';
import { 
  CartDetailItemType,
  // CartDetailItemsV2Type,
  CART_DETAIL_ITEMS_FRAGMENT,
  CartDetailTotals,
 } from './cartItemsFragment';

export const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartDetailItems 
      # itemsV2 {
      #   total_count
      #   ...CartDetailItems 
      # }
    }
  }
  ${CART_DETAIL_ITEMS_FRAGMENT}
`

export type GetCartDetailsResponse = {
  cart: {
  // itemsV2: CartDetailItemsV2Type[];
  items: CartDetailItemType[];
  prices: CartDetailTotals;
  };
}