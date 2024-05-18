import { createSlice } from "@reduxjs/toolkit";

const reviewerSlice=createSlice({
    name:"reviewers",
    initialState:{
        reviewerData:[]
    },
    reducers:{
        getReviewerData:(state,action)=>{
            console.log(action.payload,'actioooooo');      
            state.reviewerData=action.payload.map((data:any)=>{
                return {id:data.reviewerId,name:data.name}
            })
            console.log(state.reviewerData,'stateeeeee');
            
        }
    }


})

export const {getReviewerData}=reviewerSlice.actions
export default reviewerSlice.reducer