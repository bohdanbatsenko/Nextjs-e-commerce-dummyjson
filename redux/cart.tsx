import { createSlice, createSelector } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CartState {
  cartId: string
}

// Define the initial state using that type
const initialState: CartState = {
  cartId: null,
}

export const cartSlice = createSlice({
  name: 'cartSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload
    }
  },
})

export const { setCartId } = cartSlice.actions

export const getCartId = createSelector(
  state => state.cart,
  cart => cart.cartId
)
export default cartSlice.reducer