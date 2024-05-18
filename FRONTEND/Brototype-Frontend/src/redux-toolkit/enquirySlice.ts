import { createSlice } from "@reduxjs/toolkit";


const enquirySlice=createSlice({
    name:'enquiryData',
    initialState:{
        enquiryData:[]
    },
    reducers:{
        getEnquiryData:(state,action)=>{
            state.enquiryData=action.payload.map(data=>{
                return {}
            })
        }
    }
})

export const {getEnquiryData} =enquirySlice.actions
export default enquirySlice.reducer