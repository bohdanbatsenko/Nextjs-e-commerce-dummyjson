'use client'
//custom-hooks to manage cart functionalities


 import { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import {
  APPLY_COUPON_MUTATION,
  CREATE_EMPTY_CART_MUTATION,
  DELETE_CART_MUTATION,
  GET_CART,
  REMOVE_COUPON_MUTATION,
  UPDATE_CART_MUTATION,
} from  '@/lib/queries/cart/cartQueries';

export default function useCheckoutQuoteFetch() {
  const [cartId, setCartId] = useState<string | null>(() => {
    return localStorage.getItem("cartId") || null;
  });

  const { data, loading, error, refetch } = useQuery(GET_CART, {
    variables: { cartId },
    skip: !cartId,
  });

  const [createCart] = useMutation(CREATE_EMPTY_CART_MUTATION, {
    onCompleted: (data) => {
      if (data.createEmptyCart) {
        localStorage.setItem("cartId", data.createEmptyCart);
        setCartId(data.createEmptyCart);
      }
    },
    onError: (error) => {
      console.error("Error creating cart:", error.message);
    },
  });

  useEffect(() => {
    if (!cartId) {
      createCart();
    }
  }, [cartId, createCart]);

  useEffect(() => {
    if (data?.cart) {
      localStorage.setItem("cartItems", JSON.stringify(data.cart.items));
    }
  }, [data]);

  return {
    cartId,
    items: data?.cart?.items || [],
    loading,
    error,
    refetchCart: refetch,
  };
}

export const useUpdateCartItem = () => {
  const [cartId, setCartId] = useState<string | null>(() => {
    return localStorage.getItem("cartId") || null;
  });

  const [updateCartItemMutation] = useMutation(UPDATE_CART_MUTATION);

  const updateCartItem = async (itemId: string, quantity: string) => {
    const variables = {
      cartId,
      cartItems: [{ cart_item_uid: itemId, quantity: parseInt(quantity, 10) }],
    };

    try {
      const { data } = await updateCartItemMutation({ variables });
      return data.updateCartItem.cart;
    } catch (err) {
      console.error("Error updating cart item:", err.message);
    }
  };

  return { cartId, setCartId, updateCartItem };
};

export const useDeleteCartItem = () => {
  const [cartId, setCartId] = useState<string | null>(() => {
    return localStorage.getItem("cartId") || null;
  });
  const { refetchCart } = useCheckoutQuoteFetch();

  const [deleteCartItemMutation] = useMutation(DELETE_CART_MUTATION);

  const deleteCartItem = async (itemId: string) => {
    const variables = {
      cartId,
      itemId,
    };

    try {
      const { data } = await deleteCartItemMutation({ variables });
      refetchCart();
      return data.removeItemFromCart.cart;
    } catch (err) {
      console.error("Error deleting cart item:", err.message);
    }
  };

  return { cartId, setCartId, deleteCartItem };
};

export const useApplyCoupon = () => {
  const [cartId, setCartId] = useState<string | null>(() => {
    return localStorage.getItem("cartId") || null;
  });
  const { refetchCart } = useCheckoutQuoteFetch();

  const [applyCouponMutation] = useMutation(APPLY_COUPON_MUTATION);

  const applyCoupon = async (couponCode: string) => {
    const variables = {
      cartId,
      couponCode,
    };

    try {
      const { data } = await applyCouponMutation({ variables });
      refetchCart();
      return data.applyCouponToCart.cart;
    } catch (err) {
      console.error("Error applying coupon:", err.message);
    }
  };

  return { cartId, setCartId, applyCoupon };
};

export const useRemoveCoupon = () => {
  const [cartId, setCartId] = useState<string | null>(() => {
    return localStorage.getItem("cartId") || null;
  });
  const { refetchCart } = useCheckoutQuoteFetch();

  const [removeCouponMutation] = useMutation(REMOVE_COUPON_MUTATION);

  const removeCoupon = async () => {
    const variables = {
      cartId,
    };

    try {
      const { data } = await removeCouponMutation({ variables });
      refetchCart();
      return data.removeCouponFromCart.cart;
    } catch (err) {
      console.error("Error removing coupon:", err.message);
    }
  };

  return { cartId, setCartId, removeCoupon };
};



// import { useEffect, useState } from "react";
// import { fetchGraphQL } from '@/app/api/cart/FetchHandler';
// import {
//   APPLY_COUPON_MUTATION,
//   CREATE_EMPTY_CART_MUTATION,
//   DELETE_CART_MUTATION,
//   GET_CART,
//   REMOVE_COUPON_MUTATION,
//   UPDATE_CART_MUTATION,
// } from '@/lib/queries/cart/cartQueries';
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
//   }, [cartId]);

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
//   }, [cartId]);

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