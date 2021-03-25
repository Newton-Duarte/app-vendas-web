import { configureStore, combineReducers } from '@reduxjs/toolkit';
import unitSlice from './slices/UnitSlice';
import groupSlice from './slices/GroupSlice';
import divisionSlice from './slices/DivisionSlice';
import productSlice from './slices/ProductSlice';
import customerSlice from './slices/CustomerSlice';

const reducer = combineReducers({
  unit: unitSlice,
  group: groupSlice,
  division: divisionSlice,
  product: productSlice,
  customer: customerSlice,
});

const store = configureStore({
  reducer
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch