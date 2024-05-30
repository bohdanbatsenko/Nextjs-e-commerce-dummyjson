'use client';

import { createContext, useReducer, useEffect } from "react";
import { Product } from '@/types/product';

interface State {
  cart: Product[]
 }

 interface CartContextType {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void 
 }

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

const cartReducer = (state: {items: Product[]}, action: any) => {

  if (action.type === 'LOAD_CART') {
    return { ...state, items: action.items };
  }

  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items]

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      }
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.item, quantity: 1})
    }

    return {...state, items: updatedItems}
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (!existingCartItem) {
      return state;
    }

    const updatedItems = [...state.items]

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      }
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {...state, items: updatedItems}
  }

  if (action.type == 'CLEAR_CART') {
    return {...state, items: []}
  }

  return state;
}

export const CartContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [ cart, dispatchCartAction ] = useReducer(cartReducer, {items: []});

  useEffect(() => {
    const localStorageCart = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('cart')) || [] 
      : [];

    dispatchCartAction({ type: 'LOAD_CART', items: localStorageCart });
  }, []);
  
  useEffect(()=> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart.items))
    }
  },[cart.items]);

  const addItem = (item: Product) => {
    dispatchCartAction({ type: 'ADD_ITEM', item })
  }
  const removeItem = (id: number) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id })
  }
  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' })
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  }

  return <CartContext.Provider value={cartContext}>
    {children}
    </CartContext.Provider>
}

export default CartContext;