import { createSlice } from "@reduxjs/toolkit";



const batchSlice=createSlice({
    name:"batch",
    initialState:{
        batchData:[],
        batchStudents:[],
        studentMark:[]

    },

    reducers:{
        getBatchData:(state,action)=>{

            state.batchData=action.payload.map(batch=>{
                return {id:batch._id,name:batch.batchName}
            })

        },
        getBatchStudent:(state,action)=>{

            state.batchStudents=action.payload?.map(student=>{
                return {id:student.studentId,name:student.name,email:student.email,qualification:student.qualification,phone:student.phone,mark:student.mark}
            })
            
        },

        getIndividualMark:(state,action)=>{

            state.studentMark=action?.payload.map(record=>{
                return {examType:record.examType,startTime:record.startTime,endTime:record.endTime,mark:record.mark}
            })

        },
        removeStudents:(state,action)=>{
            state.batchStudents=state.batchStudents.filter(student=>{
                return student.id !== action.payload
            })
        }





    }
   
})



export const{getBatchData,getBatchStudent,getIndividualMark,removeStudents  }=batchSlice.actions
export default batchSlice.reducer