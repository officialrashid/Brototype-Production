import { createSlice } from "@reduxjs/toolkit";


const counsellorSlice=createSlice({
    name:'counsellorData',
    initialState:{
        counsellorData:[]
    },
    reducers:{
        getCounsellorData:(state,action)=>{
            state.counsellorData=action.payload.map(data=>{
                return {}
            })
        },
        editCounsellorData:(state,action)=>{

        },
        deleteCounsellorData:(state,action)=>{

        }
    }
})

export const {getCounsellorData} =counsellorSlice.actions
export default counsellorSlice.reducer