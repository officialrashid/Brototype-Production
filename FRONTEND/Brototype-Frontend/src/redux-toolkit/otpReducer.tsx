// reducers/registerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    otpData: {}
  },
  
  reducers: {
    setOtpData: (state, action) => {
        console.log(action.payload,"[][][[][]]]]");
        
      state.otpData = action.payload;
    },
 
    }
  });

export const {
setOtpData,
 
} = otpSlice.actions;

export default otpSlice.reducer;