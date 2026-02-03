// import { createSlice, createSelector } from '@reduxjs/toolkit'
// import { StoreState } from './reducers';

// export type CartItem = {
//   sku: string;
//   quantity: number;
//   name: string;
// };

// export type CartReducerState = {
//   cartId: string | null;
//   items: CartItem[];
// };

// const initialState: CartReducerState = {
//   cartId: null,
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setCartId(state, action) {
//       state.cartId = action.payload;
//     },
//     addItemToCart(state, action) {
//       console.log('Adding item to cart:', action.payload);
//       const item = action.payload;
//       const currentItem = state.items.find(i => i.sku === item.sku);
//       if (currentItem) {
//         currentItem.quantity += item.quantity;
//       } else {
//         state.items.push(item);
//         console.log('cart state items pushed')
//       }
//     },
//   },
// });

// export const { setCartId, addItemToCart } = cartSlice.actions;

// export const getCartId = createSelector(
//   (state: StoreState) => state.cart,
//   cart => cart.cartId,
// );

// export const getCartItems = createSelector(
//   (state: StoreState) => state.cart,
//   cart => cart.items,
// );

// export default cartSlice.reducer;


import { createSlice, createSelector } from '@reduxjs/toolkit';
import { StoreState } from './reducers';

export type CartReducerState = {
  cartId: string | null;
};


const initialState: CartReducerState = {
  cartId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId(state, action?) {
      state.cartId = action.payload;
    },
  },
});

export const { setCartId } = cartSlice.actions;

export const getCartId = createSelector(
  (state: StoreState) => state.cart,
  cart => cart.cartId,
);

export default cartSlice.reducer;


// // Define a type for the slice state
// interface CartState {
//   cartId: string
// }

// // Define the initial state using that type
// const initialState: CartState = {
//   cartId: null,
// }

// export const cartSlice = createSlice({
//   name: 'cartSlice',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     setCartId: (state, action) => {
//       state.cartId = action.payload
//     }
//   },
// })

// export const { setCartId } = cartSlice.actions

// export const getCartId = createSelector(
//   state => state.cart,
//   cart => cart.cartId
// )
// export default cartSlice.reducer