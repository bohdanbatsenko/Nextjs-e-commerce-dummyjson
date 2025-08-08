import { useEffect, useState } from 'react';
import { ApolloError, useMutation, FetchResult } from '@apollo/client';
import { CreateCartResponseType, CREATE_CART } from '@/lib/queries/cart/createCart';
import { ADD_PRODUCTS_TO_CART, AddProductsToCartResponseType } from '@/lib/queries/cart/addProductsToCart';
import { useDispatch, useSelector } from 'react-redux';
//import { getCartId, setCartId, addItemToCart } from '@/redux/cart';
import { getCartId, setCartId } from '@/redux/cart';

type CartPayloadType = {
  sku: string;
  quantity: number;
  parent_sku?: string;
};

type Result = {
  cartId: string | null;
  addToCart: (payload: CartPayloadType, name: string) => Promise<void>;
  addProductLoading: boolean;
  openMiniCart?: () => void;
  closeMiniCart?: () => void;
  isMiniCartOpen?: boolean;
};

export const useCart = (): Result => {
  //const [cartId, setCartId] = useState<String | null>(null);
  const cartId = useSelector(getCartId);
  const dispatch = useDispatch();

  const [fetchCartId] = useMutation<CreateCartResponseType>(CREATE_CART);
  // const [AddProductsToCart, {loading: addProductLoading}] = useMutation<CreateCartResponseType>(ADD_PRODUCTS_TO_CART);

  // const [fetchCartId] = useMutation<CreateCartResponseType>(CREATE_CART,
  //   {
  //   onCompleted: (data) => {
  //     if (data && data.createCart) {
  //       dispatch(setCartId(data.createCart.cartId));
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Error creating cart:', error);
  //   }
  // }
  // );
  
  const [addProductsToCart, { loading: addProductLoading }] = useMutation<
    AddProductsToCartResponseType
  >(ADD_PRODUCTS_TO_CART, {
        onError: (error) => {
          console.error('Error adding product to cart:', error);
        }
    });
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);


  const openMiniCart = () => {
    setIsMiniCartOpen(true);
  };

  const closeMiniCart = () => {
    setIsMiniCartOpen(false);
  };

  const createCart = async() => {
    // console.log('useCart createCart');
    try {
      const { data, errors } = await fetchCartId();
      
      dispatch(setCartId(data?.cartId));
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = async (payload: CartPayloadType, name: string) => {
 
    try {
      if (!cartId) {
        await fetchCartId();
      }
      const { data, errors } = await addProductsToCart({
        variables: {
           cartId,
          // sku: payload.sku,
          // quantity: payload.quantity,
          // parent_sku: payload.parent_sku,
          ...payload,
        },
      });
      // console.log('data', data);
      //dispatch(addItemToCart(payload));
      if (errors) {
        console.error('GraphQL errors:', errors);
      }
      if (errors || (data && data.addProductsToCart.user_errors.length > 0)) {
        console.error('Failed to add products to cart:', errors || data.addProductsToCart.user_errors);
      } else {
        console.log('Product added to cart successfully');
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cartId) {
      createCart()
    }
  }, [])

  return {
    cartId,
    addProductLoading,
    addToCart,
    openMiniCart,
    closeMiniCart,
    isMiniCartOpen
  }
}






// import { useEffect, useState } from "react";
// import { fetchGraphQL } from "./FetchHandler";
// import { useQuery } from '@apollo/client';

// import {
//   APPLY_COUPON_MUTATION,
//   CREATE_EMPTY_CART_MUTATION,
//   DELETE_CART_MUTATION,
//   GET_CART,
//   REMOVE_COUPON_MUTATION,
//   UPDATE_CART_MUTATION,
// } from '@/lib/queries/getCart';

// interface CreateCartResponse {
//   createEmptyCart: string;
// }

// export default function useCheckoutQuoteFetch() {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const savedItems = localStorage.getItem("cartItems");
//   const [items, setItems] = useState<any>(() => {
//     return savedItems ? JSON.parse(savedItems) : [];
//   });

//   const createCart = async () => {
//     fetchGraphQL<CreateCartResponse>(CREATE_EMPTY_CART_MUTATION)
//       .then((data) => {
//         if (data.createEmptyCart) {
//           localStorage.setItem("cartId", data.createEmptyCart);
//           setCartId(data.createEmptyCart);
//         }
//       })
//       .catch((error) => {
//         console.error("Error creating cart:", error.message);
//       });
//   };
//   useEffect(() => {
//     if (!cartId) {
//       createCart();
//     }
//   });

//   const getCart = async () => {
//     const variables = {
//       cartId: cartId,
//     };

//     fetchGraphQL<{ cart: { id: string; items: Array<{ id: string; quantity: number }> } }>(GET_CART, variables)
//       .then((response) => {
//         const cart = response?.cart;
//         console.log(cart);
//         if (cart) {
//           localStorage.setItem("cartItems", JSON.stringify(cart));
//           setItems(cart);
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding item to cart:", error.message);
//       });
//   };
//   useEffect(() => {
//     getCart();
//   }, []);
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(items));
//   }, [items]);

//   return { cartId, items, getCart };
// }
// export const useUpdateCartItem = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });

//   const updateCartItem = async (itemId: string, quantity: string) => {
//     const variables = {
//       cartId,
//       cartItems: [{ cart_item_uid: itemId, quantity: quantity }],
//     };

//     return fetchGraphQL<{ updateCartItem: { cart: any } }>(UPDATE_CART_MUTATION, variables)
//       .then((data) => {
//         return data.updateCartItem.cart;
//       })
//       .catch((err) => {
//         console.error("Error updating cart item:", (err as Error).message);
//       });
//   };

//   return { cartId, setCartId, updateCartItem };
// };

// export const useDeleteCartItem = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const { getCart } = useCheckoutQuoteFetch();

//   const deleteCartItem = (itemId: string) => {
//     const variables = {
//       cartId,
//       itemId,
//     };

//     return fetchGraphQL<{ removeItemFromCart: { cart: any } }>(DELETE_CART_MUTATION, variables)
//       .then((data) => {
//         getCart();
//         return data.removeItemFromCart.cart;
//       })
//       .catch((err) => {
//         console.error("Error deleting cart item:", (err as Error).message);
//       });
//   };

//   return { cartId, setCartId, deleteCartItem };
// };

// export const useApplyCoupon = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const { getCart } = useCheckoutQuoteFetch();

//   const applyCoupon = (couponCode: string) => {
//     const variables = {
//       cartId,
//       couponCode,
//     };

//     return fetchGraphQL<{ applyCouponToCart: { cart: any } }>(APPLY_COUPON_MUTATION, variables)
//       .then((data) => {
//         getCart();
//         return data.applyCouponToCart.cart;
//       })
//       .catch((err) => {
//         console.error("Error applying coupon:", (err as Error).message);
//       });
//   };

//   return { cartId, setCartId, applyCoupon };
// };
// export const useRemoveCoupon = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const { getCart } = useCheckoutQuoteFetch();

//   const removeCoupon = () => {

//     const variables = {
//       cartId,
//     };

//     return fetchGraphQL<{ removeCouponFromCart: { cart: any } }>(REMOVE_COUPON_MUTATION, variables)
//       .then((data) => {
//         getCart();
//         return data.removeCouponFromCart.cart;
//       })
//       .catch((err) => {
//         console.error("Error removing coupon:", (err as Error).message);
//       });
//   };

//   return { cartId, setCartId, removeCoupon };
// };





// import { useEffect, useState } from "react";
// import { useQuery } from '@apollo/client';

// import {
//   APPLY_COUPON_MUTATION,
//   CREATE_EMPTY_CART_MUTATION,
//   DELETE_CART_MUTATION,
//   GET_CART,
//   REMOVE_COUPON_MUTATION,
//   UPDATE_CART_MUTATION,
// } from '@/lib/queries/getCart';

// interface CreateCartResponse {
//   createEmptyCart: string;
// }

// export default function useCheckoutQuoteFetch() {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem("cartId") || null;
//     }
//     return null
//   });

//   const savedItems = typeof window !== 'undefined' ? localStorage.getItem("cartItems") : null;
//   const [items, setItems] = useState<any>(() => {
//     return savedItems ? JSON.parse(savedItems) : [];
//   });

//   const createCart = async () => {
//     const {data, loading, error} = useQuery(CREATE_EMPTY_CART_MUTATION);
//     if (data.createEmptyCart) {
//       if (typeof window !== 'undefined') {
//         localStorage.setItem("cartId", data.createEmptyCart);
//       }
//       setCartId(data.createEmptyCart);
//     }
//   };

//   useEffect(() => {
//     if (!cartId) {
//       createCart();
//     }
//   });

//   const getCart = async () => {
//     const { data, loading, error } = useQuery(GET_CART, {
//       variables: { cartId: cartId }
//     });
//       const cart = data?.cart;
//       console.log(cart);
//       if (cart) {
//         if (typeof window !== 'undefined') {
//           localStorage.setItem("cartItems", JSON.stringify(cart));
//         }
//         setItems(cart);
//       }

//   };
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       getCart();
//     }
//   }, []);
//   useEffect(() => {

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("cartItems", JSON.stringify(items));
//     }
//   }, [items]);

//   return { cartId, items, getCart };
// }


// export const useUpdateCartItem = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });

//   const updateCartItem = async (itemId: string, quantity: string) => {

//     const { data, loading, error } = useQuery(UPDATE_CART_MUTATION, {
//       variables: {
//           cartId: cartId,
//           cartItems: [{ cart_item_uid: itemId, quantity: quantity }],
//         }
//       });
//       return data.updateCartItem.cart;
//   };

//   return { cartId, setCartId, updateCartItem };
// };


// export const useDeleteCartItem = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const { getCart } = useCheckoutQuoteFetch();

//   const deleteCartItem = (itemId: string) => {
//     const variables = {
//       cartId,
//       itemId,
//     };

//     const { data, loading, error } = useQuery(DELETE_CART_MUTATION, {
//       variables: {
//         cartId,
//         itemId,
//         }
//       });
//       return data.removeItemFromCart.cart;
//   };

//   return { cartId, setCartId, deleteCartItem };
// };


// export const useApplyCoupon = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const { getCart } = useCheckoutQuoteFetch();

//   const applyCoupon = (couponCode: string) => {

//     const { data, loading, error } = useQuery(APPLY_COUPON_MUTATION, {
//       variables: {
//         cartId,
//         couponCode,
//         }
//       });
//       return data.applyCouponToCart.cart;
//   };

//   return { cartId, setCartId, applyCoupon };
// };


// export const useRemoveCoupon = () => {
//   const [cartId, setCartId] = useState<string | null>(() => {
//     return localStorage.getItem("cartId") || null;
//   });
//   const { getCart } = useCheckoutQuoteFetch();

//   const removeCoupon = () => {

//     const variables = {
//       cartId,
//     };

//     const { data, loading, error } = useQuery(REMOVE_COUPON_MUTATION, {
//       variables: {
//         cartId
//         }
//       });
//       return data.removeCouponFromCart.cart;
//   };

//   return { cartId, setCartId, removeCoupon };
// };