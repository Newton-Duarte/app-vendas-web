import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

export interface GroupFormData {
  id: string;
  name: string;
}

export interface GroupState {
  groups: GroupFormData[]
}

const initialState: GroupState = {
  groups: []
}

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload)
    },
    updateGroup: (state, action: PayloadAction<GroupFormData>) => {
      const index = state.groups.findIndex(group => group.id === action.payload.id);

      if (index !== -1) state.groups.splice(index, 1, action.payload);
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    removeGroups: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.groups = state.groups.filter(group => !idsToRemove.includes(group.id));
    }
  }
});

const Selectors = {
  groups: (state: RootState) => state.group.groups
}

// const Async = {};

export const { addGroup, updateGroup, removeGroup, removeGroups } = groupSlice.actions;

export { Selectors };

export default groupSlice.reducer;