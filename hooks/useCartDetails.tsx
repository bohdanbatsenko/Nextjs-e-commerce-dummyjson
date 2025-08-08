import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CART_DETAILS, GetCartDetailsResponse } from '@/lib/queries/getCartDetails';
import { useSelector } from 'react-redux';
import { getCartId } from '@/redux/cart';
import { useState } from 'react';
import { CartDetailItemType, CartDetailTotals } from '@/lib/queries/cartItemsFragment';
import {
  ADD_PRODUCTS_TO_CART,
  AddProductsToCartResponseType,
} from '@/lib/queries/cart/addProductsToCart';
import {
  REMOVE_ITEM_FROM_CART,
  RemoveItemFromCartResponse,
} from '@/lib/queries/cart/removeItemFromCart';

interface Props {};

type RemoveFromCartFunc = (itemUid: string) => Promise<void>;

interface Result {
  getCartDetails(): void;
  cartItems: CartDetailItemType[];
  loading: boolean;
  removeItemLoading: boolean;
  totals: CartDetailTotals | null;
  removeFromCart: RemoveFromCartFunc;
}

export const useCartDetails = (): Result => {
  const cartId = useSelector(getCartId);
  const [cartItems, setCartItems] = useState<CartDetailItemType[]>([]);
  const [totals, setTotals] = useState<CartDetailTotals | null>(null);

  
  const [getCartDetails, responseObject] = useLazyQuery<GetCartDetailsResponse>(GET_CART_DETAILS, {
    fetchPolicy: 'cache-and-network',
  });
  console.log('cartId', cartId)
  // const [getCartDetails, responseObject] = useLazyQuery<GetCartDetailsResponse>(GET_CART_DETAILS, {
  //   variables: { cartId },
  //   fetchPolicy: 'cache-and-network',
  // });

  const [removeItemFromCart, { loading: removeItemLoading }] = useMutation<
    RemoveItemFromCartResponse
  >(REMOVE_ITEM_FROM_CART);

  const { data, loading, error } = responseObject;

  useEffect(() => {
    setTimeout(() => {
      if (cartId) {
        getCartDetails({ variables: { cartId } });
      } else {
        console.warn('Cart ID is null or undefined');
      }
    }, 1000)
  }, [cartId, getCartDetails]);

  useEffect(() => {
    if (data) {
      setCartItems(data?.cart.items);
      setTotals(data?.cart.prices);
    }
    // console.log('cart details data', data);
    // console.log('cart details error', error);
    
  }, [data, error]);

  const removeFromCart: RemoveFromCartFunc = async (itemUid: string) => {
    try {
      const response = await removeItemFromCart({
        variables: {
          cartId,
          cart_item_uid: itemUid,
        },
      });

      if (response.data) {
        setCartItems(response.data?.removeItemFromCart.cart.items);
        setTotals(response.data?.removeItemFromCart.cart.prices);
      }

      if (response.errors) {
        console.warn('error')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCartDetails,
    cartItems,
    loading,
    removeItemLoading,
    totals,
    removeFromCart,
  };
};