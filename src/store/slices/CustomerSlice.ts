import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

export interface CustomerFormData {
  id: string;
  type: string;
  name: string;
  cpf_cnpj: string;
  rg_ie: string;
  birthdate: string;
  phone: string;
  email: string;
  note: string;
}

export interface CustomerState {
  customers: CustomerFormData[]
}

const initialState: CustomerState = {
  customers: []
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload)
    },
    updateCustomer: (state, action: PayloadAction<CustomerFormData>) => {
      const index = state.customers.findIndex(customer => customer.id === action.payload.id);

      if (index !== -1) state.customers.splice(index, 1, action.payload);
    },
    removeCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
    removeCustomers: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.customers = state.customers.filter(customer => !idsToRemove.includes(customer.id));
    }
  }
});

const Selectors = {
  customers: (state: RootState) => state.customer.customers
}

// const Async = {};

export const { addCustomer, updateCustomer, removeCustomer, removeCustomers } = customerSlice.actions;

export { Selectors };

export default customerSlice.reducer;