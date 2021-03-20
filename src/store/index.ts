import { configureStore, combineReducers } from '@reduxjs/toolkit';
import groupSlice from './slices/GroupSlice';

const reducer = combineReducers({
  group: groupSlice
});

const store = configureStore({
  reducer
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch