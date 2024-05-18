// reducers/registerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    studentData: {}
  },
  
  reducers: {
    setStudentData: (state, action) => {
        console.log(action.payload,"[][][[][]]]]");
        
      state.studentData = action.payload;
    },
 
    }
  });

export const {
    setStudentData,
 
} = studentSlice.actions;

export default studentSlice.reducer;