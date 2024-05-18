// reducers/registerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const chatOppositPersonDataSlice = createSlice({
  name: 'chat',
  initialState: {
    chatOppositPersonData: {},
    chatDependencies:""
  },
  
  reducers: {
    setchatOppositPersonData: (state, action) => {
      state.chatOppositPersonData = action.payload;
    },
    setChatDependecies:(state,action)=>{
       state.chatDependencies = action.payload
    }
    }
  });

export const {
    setchatOppositPersonData,
    setChatDependecies
 
} = chatOppositPersonDataSlice.actions;

export default chatOppositPersonDataSlice.reducer;