import { createSlice } from "@reduxjs/toolkit";


const controlSlice=createSlice({
    name:'controlData',
    initialState:{
        controlData:1
    },
    reducers:{
        navigationData:(state,action)=>{
            state.controlData=action.payload
        },
        
    }
})

export const {navigationData} =controlSlice.actions
export default controlSlice.reducer