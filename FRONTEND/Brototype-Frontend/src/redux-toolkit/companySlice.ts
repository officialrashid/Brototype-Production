import { createSlice } from "@reduxjs/toolkit";


const companySlice=createSlice({
    name:'companyData',
    initialState:{
        companyData:[]
    },
    reducers:{
        getCompanyData:(state,action)=>{
            console.log(action.payload,'payyy')
            
            state.companyData=action.payload.map(data=>{
               
                return {placementCount:data.placementCount,studentCount:data.studentCount,courseCount:data.courseCount,counsellorsCount:data.academicCounsellorCount,id:data._id}
            })
        }
        ,
        editCompanyData:(state,action)=>{
            console.log(action.payload,';payLoad');
            
            state.companyData[0]={
                id:action.payload.id,
                placementCount:action.payload.placementCount,
                studentCount:action.payload.studentCount,
                courseCount:action.payload.courseCount,
                counsellorsCount:action.payload.academicCounsellorCount

            }
        }
    }
})

export const {getCompanyData,editCompanyData} =companySlice.actions
export default companySlice.reducer