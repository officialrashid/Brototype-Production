import { createSlice } from '@reduxjs/toolkit';

const superleadSlice = createSlice({
  name: 'superlead',
  initialState: {
    superleadData: {},
    superleadProfileImage:null
  },
  
  reducers: {
    setSuperleadData: (state, action) => {
      state.superleadData = action.payload;
    },
    setSuperleadProfileImage: (state, action) => { // Corrected action name
      state.superleadProfileImage = action.payload;
    }
  }
});

export const {
  setSuperleadData,
  setSuperleadProfileImage // Corrected export name
} = superleadSlice.actions;

export default superleadSlice.reducer;
