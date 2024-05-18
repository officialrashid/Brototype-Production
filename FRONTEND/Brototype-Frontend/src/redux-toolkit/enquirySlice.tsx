import { createSlice } from "@reduxjs/toolkit";



const enquirySlice=createSlice({
       name:"enquiries",
       initialState:{
        enquiryData:[]
       },

       reducers:{
        getEnquiryData:(state,action)=>{
            console.log("dispatched data");
            
            console.log(action.payload);
            
            state.enquiryData=action.payload.map(enquiryList=>{
                return {id:enquiryList.id,name:enquiryList.name,email:enquiryList.email,phone:enquiryList.phone}
            }
                )
        },
        addBatch:(state,action)=>{

            

            
        }
       }
})


export const{getEnquiryData,addBatch}=enquirySlice.actions

export default enquirySlice.reducer