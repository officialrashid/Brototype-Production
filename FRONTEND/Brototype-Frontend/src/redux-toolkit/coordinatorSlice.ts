import { createSlice } from "@reduxjs/toolkit";

const coordinatorSlice=createSlice({
    name:"coordinators",
    initialState:{
       coordinatorData:{},
       topCoordinators:[],
        sideNav : 1

    },
    reducers:{
        getCoordinatorData:(state,action)=>{
            state.coordinatorData={events:action.payload.events,id:action.payload._id,fullName:action.payload.fullName,emailId:action.payload.emailId,mobileNumber:action.payload.mobileNumber, shared:action.payload.sharedReviews,totalReviews:action.payload.totalReviews,weeklyTask:action.payload.weeklyReviews,todaysReview:action.payload.todaysReview,image:action.payload.profileImageUrl
            }    
        
        },
        getTopCoordinators:(state,action)=>{
            state.topCoordinators=action.payload.map((coordinator:any)=>{
                return {id:coordinator._id,fullName:coordinator.fullName,totalReviews:coordinator.totalReviews,dailyReviews:coordinator.todaysReview,image:coordinator.profileImageUrl}
            })
        },   
        
        editEvents:(state,action)=>{

            console.log(action.payload,'edittt eventssssss');
            
            state.coordinatorData.events= action.payload
        },
        deleteEvents:(state,action)=>{


 state.coordinatorData.events=state.coordinatorData?.events?.filter(event=>{
               
                console.log('action called',action.payload,event._id);
                return event._id!==action.payload
            })
            
            
           //return action.payload
        },
        activeSideNav:(state,action)=>{
            console.log(action.payload,'acccc');
            
            state.sideNav=action.payload
       
            
        }

    }


})

export const {getCoordinatorData,getTopCoordinators,deleteEvents,editEvents,activeSideNav}=coordinatorSlice.actions
export default coordinatorSlice.reducer