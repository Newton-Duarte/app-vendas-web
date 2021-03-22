import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

export interface DivisionFormData {
  id: string;
  name: string;
}

export interface DivisionState {
  divisions: DivisionFormData[]
}

const initialState: DivisionState = {
  divisions: []
}

const divisionSlice = createSlice({
  name: 'division',
  initialState,
  reducers: {
    addDivision: (state, action) => {
      state.divisions.push(action.payload)
    },
    updateDivision: (state, action: PayloadAction<DivisionFormData>) => {
      const index = state.divisions.findIndex(division => division.id === action.payload.id);

      if (index !== -1) state.divisions.splice(index, 1, action.payload);
    },
    removeDivision: (state, action: PayloadAction<string>) => {
      state.divisions = state.divisions.filter(division => division.id !== action.payload);
    },
    removeDivisions: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.divisions = state.divisions.filter(division => !idsToRemove.includes(division.id));
    }
  }
});

const Selectors = {
  divisions: (state: RootState) => state.division.divisions
}

// const Async = {};

export const { addDivision, updateDivision, removeDivision, removeDivisions } = divisionSlice.actions;

export { Selectors };

export default divisionSlice.reducer;