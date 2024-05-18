import { createSlice } from "@reduxjs/toolkit";



const enquirySlice=createSlice({
       name:"invigilator",
       initialState:{
        invigilatorData:[]
       },

       reducers:{
        getInvigilatorData:(state,action)=>{
            console.log("dispatched data everywhere");
            
            console.log(action.payload);
            
            state.invigilatorData=action.payload.map((invigilator: { _id: any; name: any; email: any; phone: any; batch: any; })=>{
                return {id:invigilator._id,name:invigilator.name,email:invigilator.email,phone:invigilator.phone,batch:invigilator.batch}
            }
                )
        },
        removeInvigilator:(state,action)=>{
            console.log(action.payload,'sliceeeeeeeeee');
            
            state.invigilatorData=state.invigilatorData.filter(invigilator=>{
                return invigilator?.id !== action.payload
            })

           


            
        }
       }
})


export const{getInvigilatorData,removeInvigilator}=enquirySlice.actions

export default enquirySlice.reducer