import { createSlice } from "@reduxjs/toolkit";

const taskSlice=createSlice({
    name:"reviewers",
    initialState:{
        taskData:[],
        viewtaskData:[]
    },
    reducers:{
        getTaskData:(state,action)=>{
           
                  console.log(action.payload,'payload');
                  
            state.taskData=action.payload.map((data:any)=>{
                return {personal:data.personalWorkout,technical:data.technicalWorkout,miscellaneous:data.miscellaneousWorkout}
            })
          
            
        },
        createTask:(state,action)=>{

        },
        deleteTask:(state,action)=>{


        },
        viewPersonalTask:(state,action)=>{


 state.viewtaskData=action.payload.map((data:any)=>{
    console.log(data.personalWorkoutNestedQuestions,'Personalllldaaa');
    
                
                    return {_id:data._id,mainQuestion:data.personalWorkouts,subQuestion:data.personalWorkoutNestedQuestions}
             
                
            })

        },
        viewTechnicalTask:(state,action)=>{

         
            state.viewtaskData=action.payload.map((data:any)=>{
                // console.log({_id:data._id,mainQuestion:data.personalWorkouts,subQuestion:data.personalWorkoutNestedQuestions}
                //     ,'technicaklllldaaa');
                           
                               return {_id:data._id,mainQuestion:'hell'
                                ,subQuestion:'js'}
                        
                           
                       })
           
                   },
                   viewMiscellaneousTask:(state,action)=>{


                    state.viewtaskData=action.payload.map((data:any)=>{
                        console.log(data,'miscellaklllldaaa');
                                       return {_id:data._id,mainQuestion:data.miscellaneousWorkouts,subQuestion:data.miscellaneousWorkoutNestedQuestions}
                                
                                   
                               })
                   
                           }
    }


})

export const {getTaskData,createTask,deleteTask,viewPersonalTask,viewTechnicalTask,viewMiscellaneousTask}=taskSlice.actions
export default taskSlice.reducer