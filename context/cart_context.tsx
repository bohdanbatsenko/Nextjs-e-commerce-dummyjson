'use client';

import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { cart_reducer as reducer } from "./cart_reducer";

import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  CHECKOUT,
} from "./actions";

type CartContextType = {
  cart: any[] | undefined;
  total_price: number;
  total_items: number;
  isCheckout: boolean;
  isMiniCartOpen: boolean;
  addToCart: (product: any, amount: number) => void;
  toggleAmount: (id: string, value: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: () => void;
  openMiniCart: () => void;
  closeMiniCart: () => void;
};

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    let cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    } else {
      return [];
    }    
  }
};

const setLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

const initialState = {
  //cart: getLocalStorage(),
  cart: getLocalStorage() || [],
  total_price: 0,
  total_items: 0,
  isCheckout: false,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }) => {
  const [ isClient, setIsClient ] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  
  const openMiniCart = () => {
    setIsMiniCartOpen(true);
  };

  const closeMiniCart = () => {
    setIsMiniCartOpen(false);
  };

  useEffect(() => {
    setIsClient(true)
    dispatch({ type: COUNT_CART_TOTALS });
    setLocalStorage(state.cart)
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // }
  }, [state.cart]);

  const addToCart = (product, amount) => {
    dispatch({ type: ADD_TO_CART, payload: { product, amount } });
  };

  const toggleAmount = (id:string, value:string) => {
    dispatch({ type: TOGGLE_CART_ITEM, payload: { id, value } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const checkout = () => {
    dispatch({ type: CHECKOUT });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        toggleAmount,
        removeItem,
        clearCart,
        checkout,
        isMiniCartOpen,
        openMiniCart,
        closeMiniCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};