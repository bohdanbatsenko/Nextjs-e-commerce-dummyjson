import { gql } from '@apollo/client';


export const ADD_PRODUCTS_TO_CART = gql`
  mutation AddProductsToCart(
    $cartId: String!, 
    $quantity: Float!, 
    $sku: String!,
    $parent_sku: String) {
    addProductsToCart(cartId: $cartId, cartItems: [{ quantity: $quantity, sku: $sku, parent_sku: $parent_sku }]) {
      cart {
        items {
          id
          product {
            name
            sku
          }
          quantity
      }
    }
    user_errors {
      message
    }
    }
  }
`;

export type AddProductsToCartResponseType = {
  addProductsToCart: {
    cart: {
      items: {
        id: string,
        product: {
          id: string,
          name: string,
          sku: string,
        }
        quantity: number
      }
    }
    user_errors: Array<{
      message: string;
    }>;
  }

}
// export const ADD_PRODUCTS_TO_CART = gql`
//   mutation AddProductsToCart(
//     $cartId: String!
//     $quantity: Float!
//     $sku: String!
//   ){
//     addProductsToCart(
//       cartId: $cartId
//       cartItems: [
//         {
//           quantity: $quantity
//           sku: $sku
//         }
//       ]
//     ) {
//       cart {
//         items {
//           product {
//             name
//             sku
//           }
//           quantity
//         }
//       }
//     }
//   }
// `

