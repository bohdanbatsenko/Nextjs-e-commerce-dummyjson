
import { gql } from '@apollo/client';

export const GET_CART = gql`
  query GetCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      total_quantity
      applied_coupons {
        code
      }
      items {
        cartItemId: uid
        quantity
        product {
          name
          sku
          stock_status
          description {
            html
          }
          url_key
          name
          thumbnail {
            id: url
            url
            label
          }
        }
        prices {
          price {
            currency
            value
          }
          row_total {
            currency
            value
          }
          row_total_including_tax {
            currency
            value
          }
          total_item_discount {
            currency
            value
          }
          discounts {
            label
            amount {
              currency
              value
            }
          }
        }
      }
      shipping_addresses {
        country {
          code
          label
        }
        region {
          code
          region_id
          label
        }
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
        }
        selected_shipping_method {
          amount {
            currency
            value
          }
          carrier_title
          carrier_code
          method_code
        }
      }
      prices {
        applied_taxes {
          amount {
            currency
            value
          }
          label
        }
        discounts {
          amount {
            currency
            value
          }
          label
        }
        grand_total {
          currency
          value
        }
        subtotal_excluding_tax {
          currency
          value
        }
      }
    }
  }
`;

export const CREATE_EMPTY_CART_MUTATION = gql`
  mutation {
    createEmptyCart
  }
`;

export const UPDATE_CART_MUTATION = gql`
  mutation UpdateCartItem($cartId: String!, $cartItems: [CartItemUpdateInput]!) {
    updateCartItems(input: { cart_id: $cartId, cart_items: $cartItems }) {
      cart {
        id
        items {
          id
          quantity
        }
      }
    }
  }
`;

export const DELETE_CART_MUTATION = gql`
  mutation DeleteCartItem($cartId: String!, $itemId: ID!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $itemId }) {
      cart {
        id
        items {
          id
          quantity
        }
      }
    }
  }
`;

export const APPLY_COUPON_MUTATION = gql`
  mutation ApplyCoupon($cartId: String!, $couponCode: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $couponCode }) {
      cart {
        id
        applied_coupons {
          code
        }
      }
    }
  }
`;

export const REMOVE_COUPON_MUTATION = gql`
  mutation RemoveCoupon($cartId: String!) {
    removeCouponFromCart(input: { cart_id: $cartId }) {
      cart {
        id
        applied_coupons {
          code
        }
      }
    }
  }
`;
