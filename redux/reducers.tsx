import { combineReducers } from 'redux';
import cartReducer, { CartReducerState } from './cart';

export type StoreState = {
  cart: CartReducerState;
};

export default combineReducers({
  cart: cartReducer,
});
