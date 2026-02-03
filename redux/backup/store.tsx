import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];



// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers';

// export const store = () => {
//   return configureStore({
//     reducer: rootReducer
//   })
// }
// // export const store = configureStore({
// //   reducer: rootReducer,
// // })

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof store>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']