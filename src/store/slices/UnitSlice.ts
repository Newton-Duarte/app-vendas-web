import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

export interface UnitFormData {
  id: string;
  name: string;
  abbreviation: string;
  quanity: number;
  is_fraction: boolean; // Change on backend
}

export interface UnitState {
  units: UnitFormData[]
}

const initialState: UnitState = {
  units: []
}

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    addUnit: (state, action) => {
      state.units.push(action.payload)
    },
    updateUnit: (state, action: PayloadAction<UnitFormData>) => {
      const index = state.units.findIndex(unit => unit.id === action.payload.id);

      if (index !== -1) state.units.splice(index, 1, action.payload);
    },
    removeUnit: (state, action: PayloadAction<string>) => {
      state.units = state.units.filter(unit => unit.id !== action.payload);
    },
    removeUnits: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.units = state.units.filter(unit => !idsToRemove.includes(unit.id));
    }
  }
});

const Selectors = {
  units: (state: RootState) => state.unit.units
}

// const Async = {};

export const { addUnit, updateUnit, removeUnit, removeUnits } = unitSlice.actions;

export { Selectors };

export default unitSlice.reducer;