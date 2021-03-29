import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { RootState } from '../';
import api from '../../services/api';

export interface UnitFormData {
  id: string;
  name: string;
  abbreviation: string;
  quantity: number;
  // is_fraction: boolean; // Change on backend
}

export interface UnitState {
  loading: boolean;
  units: UnitFormData[];
  error: string | null;
}

const initialState: UnitState = {
  loading: false,
  units: [],
  error: null
}

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    addUnit: (state, action) => {
      state.units.push(action.payload)
    },
    updateUnitOnList: (state, action: PayloadAction<UnitFormData>) => {
      const index = state.units.findIndex(unit => unit.id === action.payload.id);

      if (index !== -1) state.units.splice(index, 1, action.payload);
    },
    removeUnit: (state, action: PayloadAction<string>) => {
      state.units = state.units.filter(unit => unit.id !== action.payload);
    },
    removeUnits: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.units = state.units.filter(unit => !idsToRemove.includes(unit.id));
    },
    fetchStarted: state => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.units = action.payload;
      state.error = null;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

const Actions = unitSlice.actions;

const Selectors = {
  units: (state: RootState) => state.unit.units
}

interface ICreateUpdateUnit {
  data: UnitFormData;
  onSuccess(response: AxiosResponse): void;
  onError(error: AxiosError): void;
}

interface IDeleteUnit {
  unit_id: string;
  onSuccess(response: AxiosResponse): void;
  onError(error: AxiosError): void;
}

interface IDeleteUnits {
  units_ids: string[];
  onSuccess(response: AxiosResponse): void;
  onError(error: AxiosError): void;
}

const Async = {
  fetchUnits: () => async (dispatch: any) => {
    try {
      const response = await api.get('units');
      dispatch(Actions.fetchSuccess(response.data));
    } catch (e) {
      dispatch(Actions.fetchError(e.message));
      console.log('Error fetching units', e);
    }
  },
  createUnit: ({ data, onSuccess, onError }: ICreateUpdateUnit) => async (dispatch: any) => {
    try {
      const response = await api.post('units', data);
      onSuccess(response);
    } catch (e) {
      console.log('Error creating unit', e);
      onError(e);
    }
  },
  updateUnit: ({ data, onSuccess, onError }: ICreateUpdateUnit) => async (dispatch: any) => {
    const unit_id = data.id;

    try {
      const response = await api.put(`units/${unit_id}`, data);
      onSuccess(response);
    } catch (e) {
      console.log('Error updating unit', e);
      onError(e);
    }
  },
  deleteUnit: ({ unit_id, onSuccess, onError }: IDeleteUnit) => async (dispatch: any) => {
    try {
      const response = await api.delete(`units/${unit_id}`);
      onSuccess(response);
    } catch (e) {
      console.log('Error deleting unit', e);
      onError(e)
    }
  },
  deleteUnits: ({ units_ids, onSuccess, onError }: IDeleteUnits) => async (dispatch: any) => {
    const promises: any = [];

    units_ids.forEach(id => promises.push(api.delete(`units/${id}`)));

    try {
      const response = await Promise.all(promises);
      console.log(response);
      onSuccess(response as any);
    } catch (e) {
      console.log('Error deleting units', e);
      onError(e);
    }
  }
};

export const { addUnit, updateUnitOnList, removeUnit, removeUnits } = unitSlice.actions;

export { Async, Selectors };

export default unitSlice.reducer;