// reducers/registerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const advisorSlice = createSlice({
  name: 'advisor',
  initialState: {
    advisorData: {}
  },
  
  reducers: {
    setAdvisorData: (state, action) => {
      state.advisorData = action.payload;
    },
 
    }
  });

export const {
  setAdvisorData,
 
} = advisorSlice.actions;

export default advisorSlice.reducer;