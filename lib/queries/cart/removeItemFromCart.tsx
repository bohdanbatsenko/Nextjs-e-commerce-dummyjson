import { gql } from '@apollo/client';
import { CART_DETAIL_ITEMS_FRAGMENT } from '@/lib/queries/cartItemsFragment';
import { GetCartDetailsResponse } from '@/lib/queries/getCartDetails';

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cartId: String!, $cart_item_uid: ID) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $cart_item_uid }) {
      cart {
        ...CartDetailItems
      }
    }
  }
  ${CART_DETAIL_ITEMS_FRAGMENT}
`;

export type RemoveItemFromCartResponse = {
  removeItemFromCart: GetCartDetailsResponse;
};