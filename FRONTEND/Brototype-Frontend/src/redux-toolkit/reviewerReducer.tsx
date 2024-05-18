// reducers/registerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const reviewerSlice = createSlice({
  name: 'reviewer',
  initialState: {
    reviewerData: {}
  },
  
  reducers: {
    setReviewerData: (state, action) => {
      state.reviewerData = action.payload;
    },
 
    }
  });

export const {
    setReviewerData,
 
} = reviewerSlice.actions;

export default reviewerSlice.reducer;