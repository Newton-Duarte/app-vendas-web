import { configureStore, combineReducers } from '@reduxjs/toolkit';
import groupSlice from './slices/GroupSlice';
import productSlice from './slices/ProductSlice';

const reducer = combineReducers({
  group: groupSlice,
  product: productSlice,
});

const store = configureStore({
  reducer
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch