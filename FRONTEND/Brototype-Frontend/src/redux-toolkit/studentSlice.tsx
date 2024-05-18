import { createSlice } from "@reduxjs/toolkit";

const studentSlice=createSlice({
    name:"students",
    initialState:{
        studentData:[]
    },
    reducers:{
        getStudentData:(state,action)=>{
            state.studentData=action.payload
        }
    }


})

export const {getStudentData}=studentSlice.actions
export default studentSlice.reducer