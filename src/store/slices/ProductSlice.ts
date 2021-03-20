import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

export interface ProductFormData {
  id: string;
  name: string;
  unit: string;
  sale_price: string;
  buy_price: string;
  group: string;
  division: string
}

export interface ProductState {
  products: ProductFormData[]
}

const initialState: ProductState = {
  products: []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action: PayloadAction<ProductFormData>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);

      if (index !== -1) state.products.splice(index, 1, action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    removeProducts: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.products = state.products.filter(product => !idsToRemove.includes(product.id));
    }
  }
});

const Selectors = {
  products: (state: RootState) => state.product.products
}

// const Async = {};

export const { addProduct, updateProduct, removeProduct, removeProducts } = productSlice.actions;

export { Selectors };

export default productSlice.reducer;