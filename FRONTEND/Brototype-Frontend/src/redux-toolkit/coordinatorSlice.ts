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
            state.coordinatorData={events:action.payload.events,id:action.payload._id,fullName:action.payload.fullName,emailId:action.payload.emailId,mobileNumber:action.payload.mobileNumber, shared:0,totalReviews:'',pendingReviews:'',todaysReview:'',image:action.payload.profileImageUrl
            }    
        
        },
        getTopCoordinators:(state,action)=>{
            console.log(action.payload.length,'payloadddded dataaaaa');
            
            state.topCoordinators=action.payload.map((coordinatorDetail:any)=>{

                
                console.log(coordinatorDetail,'coordinatorDetaillsssddads')
                return {firstName:coordinatorDetail?.coordinatorData[0]?.firstName,lastName:coordinatorDetail?.coordinatorData[0]?.lastName,profileUrl:coordinatorDetail?.coordinatorData[0]?.profileUrl,reviewCount:coordinatorDetail?.coordinator?.count}
                
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
       
            
        },
        updateCoordinatorData:(state,action)=>{
console.log(action.payload[0].scheduledTodayCount[0].count,'==================');

            
            
            state.coordinatorData={totalReviews:action.payload[0].reviewStatusCounts[1].count,pendingReviews:action.payload[0].reviewStatusCounts[0].count,todaysReview:action.payload[0].scheduledTodayCount[0].count}


        }

    },
   


})

export const {getCoordinatorData,getTopCoordinators,deleteEvents,editEvents,activeSideNav,updateCoordinatorData}=coordinatorSlice.actions
export default coordinatorSlice.reducer