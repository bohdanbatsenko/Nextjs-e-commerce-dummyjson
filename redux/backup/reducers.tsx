// import { combineReducers } from "redux";
// import cartReducer, { CartReducerState } from './cart';


// export type StoreState = {
//   cart: CartReducerState;
// };

// const rootReducer = combineReducers({
//   cart: cartReducer,
// });

// export default rootReducer;

import { combineReducers } from 'redux';
import cartReducer, { CartReducerState } from './cart';

export type StoreState = {
  cart: CartReducerState;
};

export default combineReducers({
  cart: cartReducer,
});




// export default combineReducers({
//   cart: cartReducer
// })
